import React from 'react'

export default function ArticleDetailsSkeleton() {
    return (
        <>
            {/* Hero Section Skeleton */}
            <div className="relative h-[50vh]">
                <div className="absolute inset-0 bg-gray-200 animate-pulse">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                        <div className="h-8 w-96 bg-gray-300 rounded-lg"></div>
                        <div className="h-12 w-80 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Image Gallery Skeleton */}
                        <div className="flex flex-row-reverse gap-4 md:gap-6">
                            <div className="flex-1 aspect-square relative rounded-3xl overflow-hidden bg-gray-200 animate-pulse"></div>
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3, 4].map((index) => (
                                    <div
                                        key={index}
                                        className="w-16 md:w-24 h-16 md:h-24 rounded-2xl bg-gray-200 animate-pulse"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Skeleton */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="h-10 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-8 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>

                            <div className="flex items-center gap-4">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <div key={index} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                                <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                                <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>

                            <div className="pt-16 space-y-4">
                                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Tabs Skeleton */}
                        <div className="col-span-2 mt-10">
                            <div className="flex justify-center gap-8 border-b border-gray-200 mb-8">
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}