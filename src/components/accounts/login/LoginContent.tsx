"use client"

import React from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginFormData } from '@/components/accounts/login/schema/loginShema'

import Link from 'next/link'

import Image from 'next/image'

import Login from "@/components/assets/accounts/login/Login.gif";

import { FcGoogle } from "react-icons/fc";

import { IoIosArrowBack } from "react-icons/io";

import { useAuth } from '@/components/router/auth/AuthContext';

export default function LoginContent() {
    const { login, loginWithGoogle } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    return (
        <section className='min-h-screen flex justify-center items-center relative overflow-hidden p-4 sm:p-6'>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:gap-8 max-w-5xl mx-auto bg-white/10 border border-white/20 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-md place-items-center shadow-xl">
                    <div className="hidden lg:block w-full">
                        <Image
                            src={Login}
                            alt="Login"
                            width={500}
                            height={500}
                            className="w-full h-auto max-w-[400px] mx-auto"
                        />
                    </div>

                    <div className="form w-full max-w-md mx-auto px-2 sm:px-4">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold'>Login to your account</h1>
                            <p className='text-xs sm:text-sm text-text'>Don&apos;t have an account? <Link href="/auth/register" className='text-blue-500'>Register</Link></p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 w-full'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='text-sm text-text flex gap-2 flex-col'>
                                    Email
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email")}
                                        placeholder='Email'
                                        className='w-full p-2 rounded-md border text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary py-3'
                                    />
                                </label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password" className='text-sm text-text flex gap-2 flex-col'>
                                    Password
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password")}
                                        placeholder='Password'
                                        className='w-full p-2 rounded-md border border-gray-300 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary py-3'
                                    />
                                </label>
                            </div>

                            <div className='flex items-center justify-between mb-2'>
                                <label className='relative flex items-center gap-2 cursor-pointer select-none'>
                                    <input
                                        type="checkbox"
                                        {...register("rememberMe")}
                                        className='appearance-none w-4 h-4 border-2 border-gray-300 rounded-md 
                                        checked:bg-primary checked:border-primary
                                        transition-all duration-200
                                        cursor-pointer
                                        focus:outline-none focus:ring-2 focus:ring-primary/50
                                        after:content-[""] after:absolute 
                                        after:text-white after:text-sm
                                        after:top-1/2 after:left-1/2
                                        after:-translate-y-1/2 after:-translate-x-1/2
                                        after:opacity-0 checked:after:opacity-100
                                        after:pointer-events-none'
                                    />
                                    <span className='text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200'>
                                        Remember me
                                    </span>
                                </label>
                                <Link href="/auth/forgot-password" className='text-sm text-primary hover:text-primary/80 transition-colors duration-200'>
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type='submit' className='bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-all duration-300 text-[16px]'>Login</button>

                            <div className="flex justify-center items-center mt-2">
                                <div className="row w-full h-[1px] bg-text opacity-50"></div>
                                <span className='text-text w-full text-center'>Or Login With</span>
                                <div className="row w-full h-[1px] bg-text opacity-50"></div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
                                <button
                                    onClick={handleGoogleLogin}
                                    type="button"
                                    className='flex items-center justify-center border border-gray-300 rounded-md transition-all duration-300 text-[14px] sm:text-[15px] gap-2 w-full py-2.5 sm:py-3 hover:bg-primary hover:text-white hover:border-primary'
                                >
                                    <FcGoogle size={18} className="sm:size-[20px]" /> Google
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
