"use client"

import React from 'react'

import { useFetchProducts } from '@/utils/section/products/useFetch'

import ProductsSkeleton from '@/components/section/Our-Products/ProductsSkelaton'

import Image from 'next/image'

import banner from "@/components/assets/shop/bg.png"

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

import { GiSettingsKnobs } from "react-icons/gi";

export default function ShopContent() {
    const { products, loading } = useFetchProducts();

    const [selectedCategory, setSelectedCategory] = React.useState('all');

    const [itemsPerPage, setItemsPerPage] = React.useState(12);

    const [sortBy, setSortBy] = React.useState('latest');

    const [currentPage, setCurrentPage] = React.useState(1);

    if (loading) {
        return <ProductsSkeleton />;
    }

    const sortedProducts = [...products.data].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default: // 'latest'
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const filteredProducts = selectedCategory === 'all'
        ? sortedProducts
        : sortedProducts.filter(product => product.merek.name === selectedCategory);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const categories = ['all', ...new Set(products.data.map(product => product.merek.name))];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                        <h3 className='text-4xl md:text-6xl font-bold text-white tracking-tight'>Shop</h3>
                        <div className="flex items-center gap-3 bg-white/20 px-6 py-2.5 rounded-full backdrop-blur-md">
                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90'>Shop</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className='py-20 min-h-full relative'>
                <div className="container px-0 sm:px-4">
                    <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl 
                                  py-8 px-6 md:px-10 bg-primary rounded-xl shadow-xl transform -translate-y-1/2 z-10'>
                        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4">
                            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
                                <div className="dropdown relative">
                                    <button className="flex items-center gap-2.5 hover:opacity-90 transition-all duration-300">
                                        <GiSettingsKnobs className='text-2xl text-background' />
                                        <span className='text-sm md:text-base font-medium text-background'>Filter</span>
                                    </button>
                                    <div className="dropdown-content absolute z-50 mt-3 bg-white rounded-xl shadow-lg p-3 min-w-[220px]">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${selectedCategory === category
                                                    ? 'bg-primary text-white font-medium'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='hidden md:block text-background'>|</div>

                                <div className='text-sm md:text-base font-medium text-background'>
                                    <p>Showing {filteredProducts.length} Products</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap md:flex-row items-center justify-center md:justify-start gap-6">
                                <label className='flex items-center gap-3 text-background'>
                                    <span className='text-sm md:text-base'>Show</span>
                                    <select
                                        className='select bg-white/10 text-background'
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    >
                                        <option
                                            className='text-title bg-white'
                                            value={products.data.length}
                                        >
                                            All
                                        </option>
                                        {[2, 4, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000].map(size => (
                                            size <= products.data.length && (
                                                <option
                                                    key={size}
                                                    className='text-title bg-white'
                                                    value={size}
                                                >
                                                    {size}
                                                </option>
                                            )
                                        ))}
                                    </select>
                                </label>

                                <label className='flex items-center gap-3 text-background'>
                                    <span className='text-sm md:text-base'>Sort By</span>
                                    <select
                                        className='select bg-white/10 border-white/20 text-background'
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option className='text-title bg-white' value="latest">Latest</option>
                                        <option className='text-title bg-white' value="price-low">Price: Low to High</option>
                                        <option className='text-title bg-white' value="price-high">Price: High to Low</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-5 mt-14 sm:mt-10">
                        {
                            paginatedProducts.map((product) => (
                                <Link href={`/shop/${product.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                                    hover:-translate-y-1 transition-all duration-500 cursor-pointer border border-gray-100"
                                    key={product.id}
                                >
                                    <div className="aspect-square relative overflow-hidden">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                                            <span className="px-4 py-1.5 text-xs font-medium text-white bg-primary/90 backdrop-blur-sm rounded-full">
                                                {product.merek.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                            {product.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-3">
                                            <h3 className="text-xl font-bold text-primary">
                                                Rp {product.price.toLocaleString('id-ID')}
                                            </h3>
                                            <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center 
                                                group-hover:bg-primary transition-colors duration-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={2} stroke="currentColor"
                                                    className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                    {/* Remove the totalPages > 1 condition and always show pagination */}
                    <div className="flex justify-center items-center gap-2 mt-10 sm:mt-12 lg:mt-16">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        {[...Array(totalPages || 1)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`w-10 h-10 rounded-lg ${currentPage === index + 1
                                    ? 'bg-primary text-white'
                                    : 'border border-primary text-primary hover:bg-primary hover:text-white'
                                    } transition-all duration-300`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}