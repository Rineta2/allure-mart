import React from 'react'

export default function ShopSkelaton() {
    return (
        <>
            {/* Banner Skeleton */}
            <div className="relative h-[50vh] sm:h-[60vh] bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <div className="h-12 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-48 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
            </div>

            <section className='py-20 min-h-full relative'>
                {/* Filter Bar Skeleton */}
                <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl 
                               py-8 px-6 md:px-10 bg-primary rounded-xl shadow-xl transform -translate-y-1/2'>
                    <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4">
                        <div className="flex items-center gap-6 animate-pulse">
                            <div className="h-8 w-24 bg-white/20 rounded-lg"></div>
                            <div className="hidden md:block h-6 w-px bg-white/20"></div>
                            <div className="h-8 w-48 bg-white/20 rounded-lg"></div>
                        </div>
                        <div className="flex flex-wrap md:flex-row items-center gap-6 animate-pulse">
                            <div className="h-8 w-32 bg-white/20 rounded-lg"></div>
                            <div className="h-8 w-40 bg-white/20 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Products Grid Skeleton */}
                <div className="container px-0 sm:px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-5 mt-14 sm:mt-10">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                                <div className="aspect-square relative bg-gray-200"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3">
                                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center items-center gap-2 mt-10 sm:mt-12 lg:mt-16 animate-pulse">
                        <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                        ))}
                        <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </section>
        </>
    )
}