import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io"

import { ProductData } from '@/utils/section/products/schema/schema'

interface HeroSectionProps {
    product: ProductData;
}

export default function HeroSection({ product }: HeroSectionProps) {
    return (
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
    )
}