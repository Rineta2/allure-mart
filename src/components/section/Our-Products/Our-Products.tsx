"use client";

import { useFetchProducts } from "@/utils/section/products/useFetch";

import { useCart } from '@/components/router/auth/CartContext';

import Link from "next/link";

import ProductsSkeleton from "@/components/section/Our-Products/ProductsSkelaton";

import Image from "next/image";

import { createSlug } from "@/components/helper/stringSlug"

export default function OurProducts() {
    const { addToCart } = useCart();
    const { products, loading } = useFetchProducts();

    const visibleProducts = 8;

    if (loading) {
        return <ProductsSkeleton />;
    }

    const sortedProducts = Array.isArray(products.data)
        ? products.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    return (
        <section>
            <div className="container px-0 sm:px-4 mx-auto">

                <div className="mb-16 text-center">
                    <span className="text-sm md:text-base text-primary font-semibold uppercase tracking-wider">
                        Stock Terbaru
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Temukan Produk Terbaru Kami
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Kami telah menyediakan koleksi produk terbaru kami yang paling diminati! Kualitas terjamin dengan harga terbaik untuk Anda.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                    {sortedProducts
                        .slice(0, visibleProducts)
                        .map((item, index) => {
                            return (
                                <div key={item.id || index}
                                    className="group col-span-1 flex flex-col gap-3 xs:gap-4 w-full bg-white rounded-2xl 
                                    shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                                    border border-gray-100"
                                >
                                    <div className="relative w-full max-h-[100%] md:max-h-[250px] xl:max-h-[350px] aspect-square overflow-hidden rounded-t-2xl">
                                        {item.thumbnail && (
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title || 'Product image'}
                                                width={500}
                                                height={500}
                                                className="w-full h-full object-cover group-hover:scale-105 
                                                transition-transform duration-500"
                                                priority
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(item);
                                                    }}
                                                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium
                                                    hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0
                                                    transition-transform duration-300 flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                </button>

                                                <Link href={`/shop/${createSlug(item.category.name)}/${item.slug}`}
                                                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium
                                                    hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0
                                                    transition-transform duration-300 flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 xs:gap-3 p-2 xs:p-4 sm:p-5">
                                        <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-800 
                                        line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                                            {[
                                                { label: item.category?.name },
                                                { label: item.merek?.name },
                                                { label: item.gender?.name }
                                            ].map((tag, idx) => (
                                                tag.label && (
                                                    <span key={idx}
                                                        className="px-2 py-0.5 xs:px-2.5 xs:py-1 text-[10px] xs:text-[11px] 
                                                        sm:text-xs font-medium bg-gray-100 text-gray-700 rounded-full 
                                                        hover:bg-gray-200 transition-colors"
                                                    >
                                                        {tag.label}
                                                    </span>
                                                )
                                            ))}
                                        </div>

                                        <div className="mt-1.5 xs:mt-2 sm:mt-3 space-y-0.5 xs:space-y-1">
                                            <p className="text-base xs:text-lg sm:text-xl font-bold text-title">
                                                Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {sortedProducts.length >= 8 && (
                    <div className="text-center mt-10">
                        <Link
                            href="/shop"
                            className="inline-block px-10 py-2 bg-transparent text-title border border-text rounded-lg hover:bg-primary hover:text-white  hover:border-primary
                            transition-colors duration-300"
                        >
                            Show More
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
