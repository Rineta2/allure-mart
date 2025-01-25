import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { Role, UserAccount } from '@/components/router/auth/schema/auth';

import { auth, db } from '@/utils/firebase';

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

type AuthContextType = {
    user: UserAccount | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserAccount>;
    loginWithGoogle: () => Promise<UserAccount>;
    loginWithFacebook: () => Promise<UserAccount>;
    logout: () => Promise<void>;
    hasRole: (roles: string | string[]) => boolean;
    getDashboardUrl: (userRole: string) => string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface FirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const getDashboardUrl = (userRole: string) => {
        switch (userRole) {
            case Role.SUPER_ADMIN:
                return `/super-admins/dashboard`;
            case Role.SELLER:
                return `/seller/dashboard`;
            case Role.USER:
                return '/';
            default:
                return '/';
        }
    };

    const handleRedirect = (userData: UserAccount) => {
        const dashboardUrl = getDashboardUrl(userData.role);
        router.push(dashboardUrl);
    };

    const login = async (email: string, password: string): Promise<UserAccount> => {
        try {
            if (!email || !password) {
                throw new Error('Email dan password harus diisi');
            }

            const emailString = String(email).trim();
            const userCredential = await signInWithEmailAndPassword(auth, emailString, password);

            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, userCredential.user.uid));
            const userData = userDoc.data() as UserAccount;

            if (!userData) {
                throw new Error('User account not found');
            }

            setUser(userData);
            const welcomeMessage = getWelcomeMessage(userData.role);
            toast.success(welcomeMessage);
            handleRedirect(userData);

            return userData;
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Login gagal: ' + error.message);
                throw new Error('Login gagal: ' + error.message);
            }
            toast.error('Terjadi kesalahan saat login');
            throw new Error('Terjadi kesalahan saat login');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            // Hapus semua cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            toast.success('Anda berhasil logout');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Terjadi kesalahan saat logout');
        }
    };

    const hasRole = (roles: string | string[]): boolean => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const getWelcomeMessage = (role: string): string => {
        switch (role) {
            case Role.SUPER_ADMIN:
                return 'Selamat datang, Super Admin!';
            case Role.SELLER:
                return 'Selamat datang, Seller!';
            case Role.USER:
                return 'Selamat datang, User!';
            default:
                return 'Selamat datang!';
        }
    };

    const createSocialUser = async (firebaseUser: FirebaseUser): Promise<UserAccount> => {
        const userDocRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid);
        const userData: UserAccount = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
            role: Role.USER,
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        };

        await setDoc(userDocRef, userData, { merge: true });
        return userData;
    };

    const loginWithGoogle = async (): Promise<UserAccount> => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, result.user.uid));
            let userData: UserAccount;

            if (!userDoc.exists()) {
                userData = await createSocialUser({
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                });
            } else {
                userData = userDoc.data() as UserAccount;
            }

            setUser(userData);
            const welcomeMessage = getWelcomeMessage(userData.role);
            toast.success(welcomeMessage);
            handleRedirect(userData);

            return userData;
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Gagal login dengan Google');
            throw error;
        }
    };

    const loginWithFacebook = async (): Promise<UserAccount> => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, result.user.uid));
            let userData: UserAccount;

            if (!userDoc.exists()) {
                userData = await createSocialUser({
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                });
            } else {
                userData = userDoc.data() as UserAccount;
            }

            setUser(userData);
            const welcomeMessage = getWelcomeMessage(userData.role);
            toast.success(welcomeMessage);
            handleRedirect(userData);

            return userData;
        } catch (error) {
            console.error('Facebook login error:', error);
            toast.error('Gagal login dengan Facebook');
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid));
                const userData = userDoc.data() as UserAccount;
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        hasRole,
        getDashboardUrl
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};