import React from 'react'

export default function CheckoutSkelaton() {
    return (
        <>
            {/* Hero Checkout Skeleton */}
            <div className="relative h-[40vh] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-72 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Main checkout section skeleton */}
            <section className='px-4 py-12 bg-gray-50'>
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Billing Details Skeleton */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>

                                {/* Contact Fields */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Location Fields */}
                                <div className="space-y-6">
                                    {/* Street Address */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>

                                    {/* Detail Address */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>

                                    {/* City & Province */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* ZIP & District */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-[200px] bg-gray-200 rounded-xl animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Address Type */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>

                                {/* Submit Button */}
                                <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse mt-8"></div>
                            </div>
                        </div>

                        {/* Order Summary Skeleton */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
                            <div className="space-y-6">
                                {/* Order items skeleton */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 py-4 border-b border-gray-100">
                                        <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                                {/* Total section skeleton */}
                                <div className="pt-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features section skeleton */}
            <section className='py-16 bg-primary'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className='flex items-center gap-4 p-4'>
                                <div className='w-12 h-12 bg-white/10 rounded-lg animate-pulse'></div>
                                <div className='space-y-2'>
                                    <div className='h-5 w-32 bg-white/10 rounded animate-pulse'></div>
                                    <div className='h-4 w-24 bg-white/10 rounded animate-pulse'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}