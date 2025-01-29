"use client"

import React from 'react'

import { useParams } from 'next/navigation'

import { useFetchProducts } from '@/utils/section/products/useFetch'

import ProductsSkeleton from '@/components/section/Our-Products/ProductsSkelaton'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io"

import { ProductData } from '@/utils/section/products/schema/schema'

import { IoIosStar } from "react-icons/io";

export default function ShopDetails() {
    const params = useParams()
    const { products, loading } = useFetchProducts()
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

    // Handle loading state
    if (loading) {
        return <ProductsSkeleton />
    }

    const product = products.data.find((p: ProductData) => p.slug === params.slug)

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
    }

    return (
        <>
            <div className="relative h-[50vh]">
                <div className="absolute inset-0">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className='w-full h-full object-cover brightness-50'
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">
                        <h3 className='hidden md:block text-4xl font-bold text-white tracking-tight drop-shadow-lg'>{product.title}</h3>

                        <div className="flex items-center flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-3 bg-white/10 px-8 py-3 rounded-full backdrop-blur-lg border border-white/20">
                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <Link href="/shop" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Shop
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90 text-center sm:text-left'>{product.title}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-16 md:py-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        <div className="flex flex-row-reverse gap-4 md:gap-6">
                            <div className="flex-1 aspect-square relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={product.imageSlider[currentImageIndex]}
                                    alt={`${product.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                {product.imageSlider.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 md:w-24 h-16 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 ${currentImageIndex === index
                                            ? 'ring-2 ring-primary scale-95 shadow-lg'
                                            : 'ring-1 ring-gray-200 hover:ring-primary/50 hover:scale-95'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.title} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 md:space-y-8 relative">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title">{product.title}</h1>

                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                                Rp {product.price.toLocaleString('id-ID')}
                            </h3>

                            <div className="flex items-center gap-4 md:gap-6 text-sm flex-wrap">
                                <span className="flex items-center gap-1 text-[#FFC107]">
                                    {[...Array(5)].map((_, i) => (
                                        <IoIosStar key={i} className="w-5 h-5" />
                                    ))}
                                </span>

                                <span className="hidden md:inline text-gray-200">|</span>

                                <span className="text-gray-500 hover:text-primary transition-colors duration-300 cursor-pointer">
                                    100 Reviews
                                </span>

                                <span className="hidden md:inline text-gray-200">|</span>

                                <span className="text-gray-500">
                                    Stock: <span className="font-semibold text-primary">{product.stock}</span>
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed line-clamp-3 text-base md:text-lg">
                                {product.description}
                            </p>

                            <div className="flex items-center gap-3 sm:gap-4 flex-col sm:flex-row">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl w-full sm:w-auto overflow-hidden">
                                    <button
                                        className="px-4 md:px-5 py-3 text-gray-600 bg-transparent hover:bg-gray-50 transition-colors font-medium text-lg"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={1}
                                        className="w-16 text-center border-x border-gray-200 py-3 focus:outline-none text-gray-700 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        className="px-4 md:px-5 py-3 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-lg"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                <button className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 font-medium">
                                    Add to Cart
                                </button>

                                <button className="bg-black hover:bg-black/90 text-white px-6 md:px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-lg font-medium">
                                    Buy Now
                                </button>
                            </div>

                            <div className="absolute bottom-16 left-0 w-full h-[1px] bg-gray-200"></div>

                            <div className="flex flex-col gap-4 pt-12">
                                <div className="flex gap-2 items-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-title">Category:</h3>
                                    <span className="text-gray-500 text-lg">{product.category.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
