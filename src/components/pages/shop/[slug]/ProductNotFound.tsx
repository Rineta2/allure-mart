import React from 'react'

import { motion } from 'framer-motion'

import { useRef } from 'react'

import Image from 'next/image'

import Link from 'next/link'

export default function ProductNotFound() {
    const containerRef = useRef(null)

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center p-4 relative bg-background overflow-hidden"
        >
            {/* Gradient Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        opacity: 0.3
                    }}
                />
            </div>

            <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full max-w-5xl mx-auto overflow-hidden relative z-10 border border-white/20"
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Column - Image */}
                    <motion.div
                        className="relative h-[300px] md:h-full md:min-h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                        <Image
                            src="/images/404-product.svg"
                            alt="Product Not Found Illustration"
                            fill
                            className="object-contain p-8 drop-shadow-2xl"
                            priority
                        />
                    </motion.div>

                    {/* Right Column - Content */}
                    <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-transparent to-white/5">
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-title"
                        >
                            Product Not Found
                        </h1>
                        <p
                            className="text-text mb-8 text-lg leading-relaxed"
                        >
                            Sorry, we couldn&apos;t find the product you&apos;re looking for. Please check the URL or try searching for another product.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/"
                                className="group relative px-8 py-3 w-fit inline-block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                <span className="relative text-white font-semibold">
                                    Go Back Home
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
