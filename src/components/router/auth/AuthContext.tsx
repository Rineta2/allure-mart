import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { Role, UserAccount } from '@/components/router/auth/schema/auth';

import { auth, db } from '@/utils/firebase';

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

type AuthContextType = {
    user: UserAccount | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserAccount>;
    loginWithGoogle: () => Promise<UserAccount>;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<void>;
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
        // Check if there's a saved redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin'); // Clear the saved URL
            router.push(redirectUrl);
            return;
        }

        // Default redirect based on role if no saved redirect URL
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

    const deleteAccount = async () => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }

            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                throw new Error('Failed to get authentication token');
            }

            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }

            setUser(null);
            toast.success('Akun berhasil dihapus');
            router.push('/');
        } catch (error) {
            console.error('Delete account error:', error);
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus akun');
            throw error;
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
        logout,
        deleteAccount,
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