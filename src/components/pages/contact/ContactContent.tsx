"use client"

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import Image from 'next/image'

import banner from "@/components/assets/shop/bg.png"

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

import { IoTimeSharp, IoLocationSharp } from "react-icons/io5";

import { FaPhoneAlt } from "react-icons/fa";

import { db } from '@/utils/firebase'

import { collection, addDoc } from 'firebase/firestore'

import toast from 'react-hot-toast'

import { GiTrophy } from "react-icons/gi";

import { MdOutlineSecurity, MdOutlineSupportAgent } from "react-icons/md";

import { CiDeliveryTruck } from 'react-icons/ci'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Please enter a valid email').optional(),
    subject: z.string().min(5, 'Subject must be at least 5 characters').optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactContent() {
    // Add loading state
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true)
        try {
            await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS as string), {
                ...data,
                createdAt: new Date(),
            })
            toast.success('Message sent successfully!')
        } catch (error) {
            console.error('Error details:', error)
            toast.error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="relative h-[50vh] sm:h-[60vh]">
                <div className="absolute inset-0">
                    <Image
                        src={banner}
                        alt="banner"
                        className='w-full h-full object-cover brightness-75'
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                        <h3 className='text-4xl md:text-6xl font-bold text-white tracking-tight'>Contact</h3>
                        <div className="flex items-center gap-3 bg-white/20 px-6 py-2.5 rounded-full backdrop-blur-md">
                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90'>Contact</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className='py-20 min-h-full relative'>
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col gap-6 items-center justify-center mb-16">
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Get In Touch With Us</h1>
                        <p className='text-center text-sm md:text-base text-gray-600 max-w-2xl'>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                    </div>

                    <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex items-start gap-4 p-6 rounded-lg'>
                                <IoLocationSharp className='text-primary w-8 h-8 mt-1 flex-shrink-0' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='font-semibold text-lg text-gray-900'>Address</h3>
                                    <Link href="https://maps.app.goo.gl/1234567890" target='_blank' className='text-gray-600 hover:text-primary transition-all duration-300'>
                                        <p>1234 Main St, Anytown, USA</p>
                                    </Link>
                                </div>
                            </div>

                            <div className='flex items-start gap-4 p-6 rounded-lg'>
                                <FaPhoneAlt className='text-primary w-6 h-6 mt-1 flex-shrink-0' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='font-semibold text-lg text-gray-900'>Phone</h3>
                                    <Link href="tel:+1234567890" className='text-gray-600 hover:text-primary transition-all duration-300'>
                                        <p>+1 (234) 567-890</p>
                                    </Link>
                                </div>
                            </div>

                            <div className='flex items-start gap-4 p-6 rounded-lg'>
                                <IoTimeSharp className='text-primary w-6 h-6 mt-1 flex-shrink-0' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='font-semibold text-lg text-gray-900'>Working Hours</h3>
                                    <div className='text-gray-600 space-y-1'>
                                        <p>Monday-Friday: 9:00 - 22:00</p>
                                        <p>Saturday-Sunday: 9:00 - 21:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-lg rounded-2xl p-8 space-y-6'>
                            <div className="space-y-4">
                                <label className='block'>
                                    <span className='text-gray-700 text-sm font-medium mb-1 block'>Name</span>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder='Your name'
                                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200'
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                                    )}
                                </label>

                                <label className='block'>
                                    <span className='text-gray-700 text-sm font-medium mb-1 block'>Email</span>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder='your@email.com'
                                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200'
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                                    )}
                                </label>

                                <label className='block'>
                                    <span className='text-gray-700 text-sm font-medium mb-1 block'>Subject</span>
                                    <input
                                        {...register('subject')}
                                        type="text"
                                        placeholder='What is this about?'
                                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200'
                                    />
                                    {errors.subject && (
                                        <span className="text-red-500 text-sm mt-1">{errors.subject.message}</span>
                                    )}
                                </label>

                                <label className='block'>
                                    <span className='text-gray-700 text-sm font-medium mb-1 block'>Message</span>
                                    <textarea
                                        {...register('message')}
                                        placeholder='Your message here...'
                                        rows={4}
                                        className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 resize-none'
                                    />
                                    {errors.message && (
                                        <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
                                    )}
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <div className='relative py-16 bg-primary'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {/* High Quality */}
                        <div className='flex items-center gap-4 p-4'>
                            <GiTrophy className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>High Quality</h3>
                                <p className='text-white/80 text-sm'>crafted from top materials</p>
                            </div>
                        </div>

                        {/* Warranty Protection */}
                        <div className='flex items-center gap-4 p-4'>
                            <MdOutlineSecurity className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>Warranty Protection</h3>
                                <p className='text-white/80 text-sm'>Over 2 years</p>
                            </div>
                        </div>

                        {/* Free Shipping */}
                        <div className='flex items-center gap-4 p-4'>
                            <CiDeliveryTruck className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>Free Shipping</h3>
                                <p className='text-white/80 text-sm'>Order over 150 $</p>
                            </div>
                        </div>

                        {/* 24/7 Support */}
                        <div className='flex items-center gap-4 p-4'>
                            <MdOutlineSupportAgent className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>24 / 7 Support</h3>
                                <p className='text-white/80 text-sm'>Dedicated support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}