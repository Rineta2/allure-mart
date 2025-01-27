"use client"

import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import CategorySkeleton from "@/components/section/category/CategorySkelaton"

import { useFetchProducts } from '@/utils/section/products/useFetch'

import Image from 'next/image'

interface Product {
    id: string;
    category: {
        name: string;
    };
    name: string;
    content: string;
    createdAt: Date;
    description: string;
    gender: {
        name: string;
    };
    imageSlider: string[];
    merek: {
        name: string;
    };
    price: number;
    slug: string;
    stock: number;
    thumbnail: string;
    title: string;
}

interface BrandGroup {
    count: number;
    product: Product;
}

interface GroupedBrands {
    [key: string]: BrandGroup;
}

export default function Category() {
    const { products, loading } = useFetchProducts();
    const [currentSlide, setCurrentSlide] = useState(0);

    if (loading) {
        return <CategorySkeleton />
    }

    if (products.status !== 200) {
        return <div>Error: {products.message}</div>;
    }

    // Group products by brand name with proper typing
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

    // Convert to array for easier mapping with proper typing
    const brandProducts = Object.entries(groupedByBrand).map(([, data]) => ({
        ...data.product,
        brandCount: data.count
    }));

    // Update slide navigation to use brandProducts length
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
        <section className="py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl p-8 lg:p-14 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="max-w-xl space-y-8">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-2 bg-[#AD8E70]/10 text-[#AD8E70] rounded-full text-sm font-medium">
                                    Discover
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                                    50+ Beautiful rooms inspiration
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our designer already made a lot of beautiful prototipe of rooms that inspire you
                                </p>
                            </div>
                            <button className="group px-8 py-4 bg-gradient-to-r from-[#AD8E70] to-[#97785C] text-white rounded-2xl hover:shadow-xl hover:shadow-[#AD8E70]/20 transform hover:-translate-y-1 transition-all duration-300 font-medium">
                                Explore More
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-full relative">
                            <div className="flex gap-6 overflow-hidden p-2">
                                <AnimatePresence mode="wait">
                                    {[...Array(3)].map((_, index) => {
                                        const slideIndex = (currentSlide + index) % brandProducts.length;
                                        const product = brandProducts[slideIndex];
                                        return (
                                            <motion.div
                                                key={`slide-${slideIndex}-${product.id}`}
                                                className="relative rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 w-[360px]"
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

                            <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
                                {currentSlide > 0 && (
                                    <button
                                        onClick={prevSlide}
                                        className="bg-white/90 backdrop-blur p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transform hover:-translate-x-1 transition-all duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
                                <button
                                    onClick={nextSlide}
                                    className="bg-white/90 backdrop-blur p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transform hover:translate-x-1 transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-8 space-y-3">
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

                            <div className="flex justify-center mt-8">
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
