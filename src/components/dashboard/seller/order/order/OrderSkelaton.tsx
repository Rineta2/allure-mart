import React from 'react'

export default function OrderSkelaton() {
    return (
        <section className='min-h-full py-8 bg-white'>
            <div className="container">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8 gap-4">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="relative w-full sm:w-64">
                        <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Desktop View Skeleton */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="min-w-full">
                        {/* Table Header */}
                        <div className="bg-gray-50 border-b border-gray-200 p-4">
                            <div className="grid grid-cols-6 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>

                        {/* Table Body */}
                        {[1, 2, 3].map((row) => (
                            <div key={row} className="border-b border-gray-200 p-4">
                                <div className="grid grid-cols-6 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((cell) => (
                                        <div key={cell} className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile View Skeleton */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {[1, 2, 3].map((card) => (
                        <div key={card} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                            {/* Header Section */}
                            <div className="p-5 border-b border-gray-100">
                                <div className="flex gap-2 items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="divide-y divide-gray-100">
                                {/* Customer Info */}
                                <div className="p-5 space-y-3">
                                    <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((line) => (
                                            <div key={line} className="h-4 bg-gray-200 rounded animate-pulse" />
                                        ))}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-5 space-y-3">
                                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                                    <div className="rounded-xl bg-gray-50/50 p-3">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 bg-gray-200 rounded-lg animate-pulse" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="p-5 bg-gray-50/50">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}