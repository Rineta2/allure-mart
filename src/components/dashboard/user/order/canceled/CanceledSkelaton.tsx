import React from 'react'

export default function CanceledSkelaton() {
    return (
        <section className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/50 py-8 md:py-12'>
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:gap-12">
                    {/* Search Bar Skeleton */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <div className="w-full px-5 py-3.5 md:px-6 md:py-4 rounded-2xl border border-gray-200 
                            bg-white/80 backdrop-blur-xl animate-pulse">
                        </div>
                    </div>

                    {/* Orders Grid Skeleton */}
                    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="bg-white/90 p-5 md:p-6 rounded-2xl shadow-lg shadow-gray-200/40
                                border border-gray-100 backdrop-blur-xl"
                            >
                                {/* Order Header Skeleton */}
                                <div className="flex justify-between items-start gap-3 mb-5">
                                    <div className="space-y-2">
                                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-7 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>

                                {/* Basic Info Skeleton */}
                                <div className="space-y-2.5 mb-5">
                                    {[1, 2, 3].map((line) => (
                                        <div key={line} className="flex justify-between items-center">
                                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Button Skeleton */}
                                <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}