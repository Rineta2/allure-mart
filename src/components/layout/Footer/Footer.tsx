"use client"

import React, { useState } from 'react'
import { z } from 'zod';

import Logo from "@/components/assets/logo/logo.png";

import Image from "next/image";

import Link from 'next/link';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const emailSchema = z.string().email('Please enter a valid email address');

    const handleSubscribe = () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        const result = emailSchema.safeParse(email);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        setError('');
        setEmail('');
    };

    return (
        <footer className="bg-gray-50 py-6 sm:py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Logo and Address Section */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/3">
                        <div className="w-full max-w-[160px] sm:max-w-[200px]">
                            <Image src={Logo} alt="Logo" width={500} height={500} className="w-full h-auto" />
                        </div>
                        <div className="text-gray-600 text-sm">
                            <p>Jl. Babakan, RT.05/RW.06, Leuwiliang, Kec. Leuwiliang, Kabupaten Bogor, Jawa Barat 16640</p>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex gap-8 w-full lg:w-1/3">
                        <div className="flex flex-col gap-6 sm:gap-10 w-full">
                            <h4 className="font-semibold text-lg">Links</h4>
                            <ol className="space-y-4 sm:space-y-6 text-gray-600">
                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/">Home</Link>
                                </li>

                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/shop">Shop</Link>
                                </li>

                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/about">About</Link>
                                </li>

                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ol>
                        </div>

                        <div className="flex flex-col gap-6 sm:gap-10 w-full">
                            <h4 className="font-semibold text-lg">Help</h4>
                            <ol className="space-y-4 sm:space-y-6 text-gray-600">
                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/payment-options">Payment Options</Link>
                                </li>
                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/return-refund">Return & Refund</Link>
                                </li>
                                <li className="hover:text-gray-900 cursor-pointer transition-colors">
                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full lg:w-1/3">
                        <h4 className="font-semibold text-lg mb-3 sm:mb-4">Newsletter</h4>
                        <p className="text-gray-600 mb-3 sm:mb-4">Subscribe to our newsletter to get the latest updates and news.</p>
                        {error && <span className="text-red-500 text-sm">{error}</span>}
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <div className="flex-1 flex flex-col">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(''); // Clear error when user starts typing
                                    }}
                                    className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                                />
                            </div>
                            <button
                                onClick={handleSubscribe}
                                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-end mt-10">
                    <p className="text-gray-600 text-sm">© 2025 All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
