import React from 'react'

export default function CategorySkeleton() {
    return (
        <section className="py-8 lg:py-20 sm:px-6">
            <div className="container mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-[20px] lg:rounded-[32px] shadow-2xl p-4 sm:p-6 lg:p-14 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left side content */}
                        <div className="max-w-xl space-y-6 lg:space-y-8">
                            <div className="space-y-3 lg:space-y-4">
                                {/* Discover badge skeleton */}
                                <div className="relative w-24 h-8 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                {/* Title skeleton */}
                                <div className="relative h-16 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                {/* Description skeleton */}
                                <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                            </div>
                            {/* Button skeleton */}
                            <div className="relative h-12 w-40 bg-gray-200 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                        </div>

                        {/* Right side content */}
                        <div className="w-full relative mt-8 lg:mt-0">
                            <div className="flex gap-4 lg:gap-6 overflow-hidden p-2">
                                {/* Image cards skeleton */}
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
                                    >
                                        <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom info skeleton */}
                            <div className="mt-6 lg:mt-8 space-y-2 lg:space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-8 h-6 bg-gray-200 rounded overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="relative w-16 h-0.5 bg-gray-200 overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                </div>
                                <div className="relative h-10 w-48 bg-gray-200 rounded overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}