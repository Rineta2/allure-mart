import React from 'react'

export default function PrivacySkelaton() {
    return (
        <section className="py-8 sm:py-12 min-h-full">
            <div className="container max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="w-40 h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="grid gap-6 mb-8">
                        {/* Data Protection Card Skeleton */}
                        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-200 rounded-lg w-12 h-12 animate-pulse"></div>
                                <div>
                                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Delete Account Card Skeleton */}
                        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-gray-200 rounded-lg w-12 h-12 animate-pulse"></div>
                                    <div>
                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}