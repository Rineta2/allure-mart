"use client"

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import Signup from "@/components/assets/accounts/register/Signup.gif";

import { FcGoogle } from "react-icons/fc";

import { FaFacebookF } from "react-icons/fa";

import { IoIosArrowBack } from "react-icons/io";

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { registerSchema, RegisterFormData } from '@/components/accounts/register/schema/registerSchema';

import { auth, db } from '@/utils/firebase';

import { createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { Role } from '@/components/router/auth/schema/auth';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

export default function RegisterContent() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            // Create authentication user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            // Create user document in Firestore
            await setDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: data.email,
                displayName: data.name,
                role: Role.USER,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isActive: true
            });

            toast.success('Registration successful!');

            // Tambahkan delay 2 detik sebelum redirect
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Create/Update user document in Firestore
            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: Role.USER,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isActive: true
            }, { merge: true });

            toast.success('Successfully signed in with Google!');

            // Tambahkan delay 2 detik sebelum redirect
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Google sign-in error:', error);
            toast.error('Failed to sign in with Google. Please try again.');
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Create/Update user document in Firestore
            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: Role.USER,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isActive: true
            }, { merge: true });

            toast.success('Successfully signed in with Facebook!');

            // Tambahkan delay 2 detik sebelum redirect
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Facebook sign-in error:', error);
            toast.error('Failed to sign in with Facebook. Please try again.');
        }
    };

    return (
        <section className='min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-6'>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:gap-8 max-w-6xl mx-auto bg-white/10 border border-white/20 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-md place-items-center shadow-xl">
                    <div className="hidden lg:block w-full">
                        <Image
                            src={Signup}
                            alt="Signup"
                            width={500}
                            height={500}
                            className="w-full h-auto max-w-[400px] mx-auto"
                        />
                    </div>

                    <div className="form w-full max-w-md mx-auto px-2 sm:px-4">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold'>Create your account</h1>
                            <p className='text-xs sm:text-sm text-text'>Already have an account? <Link href="/auth/login" className='text-blue-500'>Login</Link></p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 w-full'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="name" className='text-sm text-text flex gap-2 flex-col'>
                                    Name
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                                    <input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        placeholder='Name'
                                        className='w-full p-2 rounded-md border text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary py-2'
                                    />
                                </label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='text-sm text-text flex gap-2 flex-col'>
                                    Email
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                    <input
                                        {...register('email')}
                                        type="email"
                                        id="email"
                                        placeholder='Email'
                                        className='w-full p-2 rounded-md border text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary py-2'
                                    />
                                </label>
                            </div>

                            <div className='flex flex-col gap-2 w-full'>
                                <label htmlFor="password" className='text-sm text-text flex gap-2 flex-col'>
                                    Password
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                                    <input
                                        {...register('password')}
                                        type="password"
                                        id="password"
                                        placeholder='Password'
                                        className='w-full p-2 rounded-md border border-gray-300 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary py-2'
                                    />
                                </label>
                            </div>

                            <div className='flex flex-col gap-2 w-full'>
                                <label htmlFor="confirmPassword" className='text-sm text-text flex gap-2 flex-col'>
                                    Confirm Password
                                    {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                                    <input
                                        {...register('confirmPassword')}
                                        type="password"
                                        id="confirmPassword"
                                        placeholder='Confirm Password'
                                        className='w-full p-2 rounded-md border border-gray-300 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary py-2'
                                    />
                                </label>
                            </div>

                            <button type='submit' className='bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-all duration-300 text-[16px]'>Daftar</button>

                            <div className="flex justify-center items-center mt-2">
                                <div className="row w-full h-[1px] bg-text opacity-50"></div>
                                <span className='text-text w-full text-center'>Or Register With</span>
                                <div className="row w-full h-[1px] bg-text opacity-50"></div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
                                <button
                                    onClick={handleGoogleSignIn}
                                    type="button"
                                    className='flex items-center justify-center border border-gray-300 rounded-md transition-all duration-300 text-[14px] sm:text-[15px] gap-2 w-full py-2.5 sm:py-3 hover:bg-primary hover:text-white hover:border-primary'
                                >
                                    <FcGoogle size={18} className="sm:size-[20px]" /> Google
                                </button>

                                <button
                                    onClick={handleFacebookSignIn}
                                    type="button"
                                    className='flex items-center justify-center border border-gray-300 rounded-md transition-all duration-300 text-[14px] sm:text-[15px] gap-2 w-full py-2.5 sm:py-3 hover:bg-primary hover:text-white hover:border-primary'
                                >
                                    <FaFacebookF size={18} className="sm:size-[20px]" /> Facebook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="btn absolute top-4 right-4 sm:top-6 sm:right-8 lg:top-10 lg:right-20 bg-primary hover:bg-primary/90 transition-all duration-300 text-white p-2 rounded-md hover:text-title hover:shadow-md">
                <Link href={"/"} className='flex items-center gap-1 text-sm sm:text-base'>
                    <IoIosArrowBack size={20} className="sm:size-[24px]" /> Back To Home
                </Link>
            </div>
        </section>
    )
}
