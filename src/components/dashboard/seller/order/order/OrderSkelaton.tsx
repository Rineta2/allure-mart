import React from 'react'

export default function OrderSkelaton() {
    return (
        <section className='min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-12'>
            <div className="container">
                <div className="flex flex-col gap-12">
                    {/* Search Bar Skeleton */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <div className="w-full h-[60px] rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    {/* Cards Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100">
                                {/* Card Content */}
                                <div className="p-6">
                                    {/* Order Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                                    </div>

                                    {/* Customer Preview */}
                                    <div className="mb-4 space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                    </div>

                                    {/* Order Summary */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                                    <div className="flex gap-3">
                                        <div className="flex-1 h-9 bg-gray-200 rounded-lg animate-pulse" />
                                        <div className="flex-1 h-9 bg-gray-200 rounded-lg animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}