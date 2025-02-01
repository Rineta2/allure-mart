import React from 'react'

export default function OrderSkelaton() {
    return (
        <section className='min-h-screen bg-gradient-to-b from-gray-50/50 to-white py-12'>
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex flex-col gap-10">
                    {/* Search Bar Skeleton */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <div className="w-full h-14 rounded-2xl bg-gray-200 animate-pulse" />
                    </div>

                    {/* Orders Grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8'>
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100/80">
                                {/* Order Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="space-y-2">
                                        <div className="h-7 w-36 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                    <div className="h-8 w-28 bg-gray-200 rounded-full animate-pulse" />
                                </div>

                                {/* Customer Details */}
                                <div className="grid gap-2">
                                    <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100">
                                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100">
                                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t border-gray-100 pt-6 mt-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-4">
                                        {[1, 2].map((item) => (
                                            <div key={item} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100/80">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
                                                    <div className="space-y-2">
                                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                                    </div>
                                                </div>
                                                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total Amount */}
                                    <div className="border-t border-gray-100 mt-6 pt-6">
                                        <div className="flex justify-between items-center">
                                            <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
                                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Payment Information */}
                                    <div className="mt-8 p-6 rounded-2xl bg-gray-50/70 border border-gray-100">
                                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                                        <div className="flex flex-wrap gap-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                                            ))}
                                        </div>
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