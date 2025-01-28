import React from 'react'

export default function ArticleSkeleton() {
    return (
        <section>
            <div className="container">
                {/* Featured Article Skeleton */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative h-[400px] bg-gray-200 overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                        </div>
                        <div className="p-8 lg:p-12">
                            <div className="relative h-8 w-32 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                            <div className="relative h-12 w-full bg-gray-200 rounded mt-4 mb-6 overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                            <div className="relative h-20 w-full bg-gray-200 rounded overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter Skeleton */}
                <div className="flex flex-wrap gap-3 w-full mb-12">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative h-12 w-32 bg-gray-200 rounded-full overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                        </div>
                    ))}
                </div>

                {/* Regular Articles Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="relative h-56 bg-gray-200 overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                            <div className="p-6">
                                <div className="relative h-6 w-24 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="relative h-8 w-full bg-gray-200 rounded mt-4 mb-3 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="relative h-16 w-full bg-gray-200 rounded overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}