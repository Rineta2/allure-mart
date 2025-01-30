import React from 'react'

export default function ArticleSkeleton() {
    return (
        <>
            {/* Banner Skeleton */}
            <div className="relative h-[50vh] sm:h-[60vh] bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <div className="relative w-48 h-12 bg-gray-300 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-white to-gray-300"></div>
                    </div>
                    <div className="relative w-64 h-10 bg-gray-300 rounded-full overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-white to-gray-300"></div>
                    </div>
                </div>
            </div>

            <section>
                <div className="container">
                    {/* Top 2 Articles Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                                <div className="relative h-[400px] bg-gray-200 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="p-8 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-32 h-4 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <span className="mx-2">•</span>
                                        <div className="relative w-24 h-4 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    </div>
                                    <div className="relative h-8 w-3/4 bg-gray-200 rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="space-y-2">
                                        {[1, 2].map((j) => (
                                            <div key={j} className="relative h-4 w-full bg-gray-200 rounded overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative w-32 h-4 bg-gray-200 rounded overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                            <div className="relative w-24 h-3 bg-gray-200 rounded overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search and Filter Skeleton */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div className="relative w-full md:w-96 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="relative w-24 h-10 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Remaining Articles Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                                <div className="relative h-64 bg-gray-200 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-24 h-4 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <span className="mx-2">•</span>
                                        <div className="relative w-20 h-4 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    </div>
                                    <div className="relative h-6 w-3/4 bg-gray-200 rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="relative h-4 w-full bg-gray-200 rounded overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative w-24 h-4 bg-gray-200 rounded overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                            <div className="relative w-20 h-3 bg-gray-200 rounded overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}