"use client"

import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import CategorySkeleton from "@/components/section/category/CategorySkelaton"

import { useFetchProducts } from '@/utils/section/products/useFetch'

import Image from 'next/image'

import { GroupedBrands } from '@/utils/section/products/schema/category'

export default function Category() {
    const { products, loading } = useFetchProducts();
    const [currentSlide, setCurrentSlide] = useState(0);

    if (loading) {
        return <CategorySkeleton />
    }

    const groupedByBrand = products.data.reduce<GroupedBrands>((acc, product) => {
        const brandName = product.merek.name;
        if (!acc[brandName]) {
            acc[brandName] = {
                count: 1,
                product: product
            };
        } else {
            acc[brandName].count += 1;
        }
        return acc;
    }, {});

    const brandProducts = Object.entries(groupedByBrand).map(([, data]) => ({
        ...data.product,
        brandCount: data.count
    }));

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            const newIndex = prev + 1;
            return newIndex >= brandProducts.length ? 0 : newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            const newIndex = prev - 1;
            return newIndex < 0 ? brandProducts.length - 1 : newIndex;
        });
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    return (
        <section>
            <div className="container">
                <div className="mb-16 text-center">
                    <span className="text-sm md:text-base text-primary font-semibold uppercase tracking-wider">
                        Merek Terbaru
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Temukan Merek Terbaru Kami
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-[20px] lg:rounded-[32px] shadow-2xl p-4 sm:p-6 lg:p-14 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="max-w-xl space-y-6 lg:space-y-8">
                            <div className="space-y-3 lg:space-y-4">
                                <span className="inline-block px-3 py-1.5 lg:px-4 lg:py-2 bg-[#AD8E70]/10 text-[#AD8E70] rounded-full text-xs lg:text-sm font-medium">
                                    Discover
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                                    Merek Terbaru Kami
                                </h1>
                                <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                                    Kami telah menyediakan koleksi produk terbaru kami yang paling diminati! Kualitas terjamin dengan harga terbaik untuk Anda.
                                </p>
                            </div>
                            <button className="group w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#AD8E70] to-[#97785C] text-white rounded-xl lg:rounded-2xl hover:shadow-xl hover:shadow-[#AD8E70]/20 transform hover:-translate-y-1 transition-all duration-300 font-medium">
                                Explore More
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 lg:w-5 lg:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-full relative mt-8 lg:mt-0">
                            <div className="flex gap-4 lg:gap-6 overflow-hidden p-2">
                                <AnimatePresence mode="wait">
                                    {[...Array(3)].map((_, index) => {
                                        const slideIndex = (currentSlide + index) % brandProducts.length;
                                        const product = brandProducts[slideIndex];
                                        return (
                                            <motion.div
                                                key={`slide-${slideIndex}-${product.id}`}
                                                className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 30,
                                                    duration: 0.5
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="relative aspect-[4/3]">
                                                    <Image
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                        priority={index === 0}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                                        {product.merek.name} ({product.brandCount})
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>

                            <div className="absolute top-1/2 -translate-y-1/2 -left-3 lg:-left-6 z-10">
                                {currentSlide > 0 && (
                                    <button
                                        onClick={prevSlide}
                                        className="bg-white/90 backdrop-blur p-2 lg:p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transform hover:-translate-x-1 transition-all duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div className="absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-6 z-10">
                                <button
                                    onClick={nextSlide}
                                    className="bg-white/90 backdrop-blur p-2 lg:p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transform hover:translate-x-1 transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-6 lg:mt-8 space-y-2 lg:space-y-3">
                                <motion.div
                                    className="flex items-center space-x-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={`info-${currentSlide}`}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-lg font-semibold text-[#AD8E70]">0{currentSlide + 1}</span>
                                    <span className="w-16 h-0.5 bg-gradient-to-r from-[#AD8E70] to-[#97785C]"></span>
                                    <span className="text-sm font-medium text-gray-600">Bed Room</span>
                                </motion.div>
                                <motion.h3
                                    className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={`title-${currentSlide}`}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    Inner Peace
                                </motion.h3>
                            </div>

                            <div className="flex justify-center mt-6 lg:mt-8">
                                {brandProducts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-500 mx-1.5 ${currentSlide === index
                                            ? 'bg-gradient-to-r from-[#AD8E70] to-[#97785C] w-12'
                                            : 'bg-gray-200 w-2 hover:bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
