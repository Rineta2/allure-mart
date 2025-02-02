import React from 'react'

export default function ShippedSkelaton() {
    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-2 sm:py-12'>
            <div className="container">
                <div className="flex flex-col gap-8 sm:gap-12">
                    {/* Search Bar Skeleton */}
                    <div className="search relative max-w-2xl mx-auto w-full px-2 sm:px-0">
                        <div className="w-full h-12 sm:h-14 rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    {/* Orders Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4 sm:p-6"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
                                    <div className="space-y-2">
                                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                                </div>

                                {/* Order Details */}
                                <div className="space-y-3 mb-6">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex justify-between">
                                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}