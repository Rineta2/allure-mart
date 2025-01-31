import React from 'react'

export default function CheckoutSkelaton() {
    return (
        <>
            {/* Hero Checkout Skeleton */}
            <div className="relative h-[40vh] bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="relative w-48 h-8 bg-gray-300 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-white to-gray-300"></div>
                    </div>
                    <div className="relative w-72 h-4 bg-gray-300 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-white to-gray-300"></div>
                    </div>
                </div>
            </div>

            {/* Rest of the checkout skeleton */}
            <section className='px-4 py-12 bg-gray-50'>
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Billing Details Skeleton */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                            <div className="space-y-6">
                                {/* Form fields skeleton */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                                {/* More form fields */}
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Skeleton */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
                            <div className="space-y-4">
                                {/* Order items skeleton */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 py-4 border-b border-border/40">
                                        <div className="w-24 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                                {/* Total section skeleton */}
                                <div className="pt-4 space-y-4">
                                    <div className="flex justify-between">
                                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t">
                                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features section skeleton */}
            <div className='relative py-16 bg-primary'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className='flex items-center gap-4 p-4'>
                                {/* Icon skeleton */}
                                <div className='w-12 h-12 bg-white/20 rounded-lg animate-pulse flex-shrink-0'></div>
                                <div className='flex flex-col gap-2'>
                                    {/* Title skeleton */}
                                    <div className='h-7 w-32 bg-white/20 rounded animate-pulse'></div>
                                    {/* Subtitle skeleton */}
                                    <div className='h-4 w-24 bg-white/20 rounded animate-pulse'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}