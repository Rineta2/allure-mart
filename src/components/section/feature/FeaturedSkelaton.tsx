import React from 'react'

export default function FeaturedSkeleton() {
    return (
        <section>
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-2 mb-10">
                    <div className="relative h-8 w-48 bg-gray-200 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                    <div className="relative h-4 w-96 bg-gray-200 rounded overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="group">
                            <div className="relative aspect-square mb-4 rounded-lg bg-gray-200 overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                            <div className="relative h-6 w-32 mx-auto bg-gray-200 rounded overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}