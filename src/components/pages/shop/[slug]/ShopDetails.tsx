"use client"

import React from 'react'

import { useParams } from 'next/navigation'

import { useFetchProducts } from '@/utils/section/products/useFetch'

import ProductsSkeleton from '@/components/section/Our-Products/ProductsSkelaton'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io"

export default function ShopDetails() {
    const params = useParams()
    const { products, loading } = useFetchProducts()

    if (loading) {
        return <ProductsSkeleton />
    }

    const product = products.data.find(p => p.slug === params.slug)

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
    }

    return (
        <>
            <div className="relative h-[40vh]">
                <div className="absolute inset-0">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className='w-full h-full object-cover brightness-75'
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                        <h3 className='text-4xl md:text-6xl font-bold text-white tracking-tight'>{product.title}</h3>
                        <div className="flex items-center gap-3 bg-white/20 px-6 py-2.5 rounded-full backdrop-blur-md">
                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <Link href="/shop" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Shop
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90'>{product.title}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="aspect-square relative rounded-2xl overflow-hidden">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="px-4 py-1.5 text-sm font-medium text-white bg-primary rounded-full">
                                    {product.merek.name}
                                </span>
                                <h1 className="text-3xl font-bold">{product.title}</h1>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="pt-4">
                                <h3 className="text-3xl font-bold text-primary">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
