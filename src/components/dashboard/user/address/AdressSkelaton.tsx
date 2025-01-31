import React from 'react'

export default function AddressSkelaton() {
    return (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
                    </div>
                    <div className="w-full sm:w-40 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>

                {/* Address Cards */}
                <div className="grid gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-4 w-full sm:w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                    <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}