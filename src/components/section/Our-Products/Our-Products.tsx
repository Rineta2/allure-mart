"use client";

import { useFetchProducts } from "@/utils/section/products/useFetch";

import ProductsSkeleton from "@/components/section/Our-Products/ProductsSkelaton";

import Image from "next/image";

export default function OurProducts() {
    const { products, loading } = useFetchProducts();

    if (loading) {
        return <ProductsSkeleton />;
    }

    if (products.status !== 200) {
        return <div>Error: {products.message}</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    return (
        <section className='py-16 md:py-24'>
            <div className="container px-4 mx-auto">

                <div className="mb-16 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our collection of high-quality products
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                    {Array.isArray(products.data) && products.data.map((item, index) => {
                        return (
                            <div key={item.id || index}
                                className="group col-span-1 flex flex-col gap-3 xs:gap-4 w-full bg-white rounded-2xl 
                                    shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                                    border border-gray-100"
                            >
                                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
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
                                </div>

                                <div className="flex flex-col gap-2 xs:gap-3 p-3 xs:p-4 sm:p-5">
                                    <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-800 
                                        line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {item.title || 'No Title'}
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
                                        <p className="text-base xs:text-lg sm:text-xl font-bold text-blue-600">
                                            {formatPrice(item.price)}
                                        </p>
                                        <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500">
                                            Stok: {item.stock || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
