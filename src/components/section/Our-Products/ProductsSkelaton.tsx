import React from 'react'

export default function ProductsSkeleton() {
    return (
        <section>
            <div className="container px-0 sm:px-4 mx-auto">
                {/* Header Skeleton */}
                <div className="mb-16 text-center">
                    <div className="relative h-6 w-32 mx-auto bg-gray-200 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                    <div className="relative h-8 w-64 mx-auto mt-3 bg-gray-200 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                    <div className="relative h-4 w-96 mx-auto mt-4 bg-gray-200 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="group col-span-1 flex flex-col gap-3 xs:gap-4 w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                            {/* Image Skeleton */}
                            <div className="relative w-full aspect-square rounded-t-2xl bg-gray-200 overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="flex flex-col gap-2 xs:gap-3 p-2 xs:p-4 sm:p-5">
                                <div className="relative h-4 w-full bg-gray-200 rounded overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>

                                {/* Tags Skeleton */}
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((tag) => (
                                        <div key={tag} className="relative h-3 w-16 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Skeleton */}
                                <div className="relative h-6 w-24 mt-2 bg-gray-200 rounded overflow-hidden">
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