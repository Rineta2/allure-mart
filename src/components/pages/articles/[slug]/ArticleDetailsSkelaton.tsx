import React from 'react'

export default function ArticleDetailsSkeleton() {
    return (
        <section className="py-2 md:py-10">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Main Content Skeleton */}
                    <main className="lg:col-span-8 space-y-16">
                        <section className="space-y-16">
                            {/* Article Header Skeleton */}
                            <header className="space-y-10">
                                <div className="relative w-32 h-10 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative h-12 w-full bg-gray-200 rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="relative h-12 w-4/5 bg-gray-200 rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Author Info Skeleton */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-8 p-8 bg-white rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
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
                                    <div className="relative sm:ml-auto w-40 h-4 bg-gray-200 rounded overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                </div>
                            </header>

                            {/* Article Content Skeleton */}
                            <div className="space-y-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="relative h-4 w-full bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <div className="relative h-4 w-11/12 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                        <div className="relative h-4 w-4/5 bg-gray-200 rounded overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Share Section Skeleton */}
                            <div className="pt-12 border-t border-gray-200">
                                <div className="relative w-48 h-8 bg-gray-200 rounded mb-8 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="flex gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Sidebar Skeleton */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-12">
                            {/* Related Articles Skeleton */}
                            <section className="bg-white rounded-2xl p-8 border border-gray-100">
                                <div className="relative w-40 h-8 bg-gray-200 rounded mb-8 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-6">
                                            <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="relative w-20 h-4 bg-gray-200 rounded overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                                </div>
                                                <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                                </div>
                                                <div className="relative w-32 h-3 bg-gray-200 rounded overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Author Card Skeleton */}
                            <section className="bg-white rounded-2xl p-8 border border-gray-100">
                                <div className="relative w-40 h-8 bg-gray-200 rounded mb-6 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
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
                            </section>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}