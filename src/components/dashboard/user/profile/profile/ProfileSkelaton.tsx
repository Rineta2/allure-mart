import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className="py-8 sm:py-12 min-h-full">
            <div className="container max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-full sm:w-32 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 p-6 sm:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center space-y-6 order-1 lg:order-2">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded-3xl animate-pulse"></div>
                            <div className="text-center w-full space-y-3">
                                <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse mx-auto"></div>
                                <div className="space-y-1">
                                    <div className="h-3 w-36 bg-gray-200 rounded animate-pulse mx-auto"></div>
                                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
                                </div>
                            </div>
                        </div>

                        {/* Form Fields Section */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:items-center p-4 
                                    rounded-2xl bg-gray-50">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="sm:col-span-2">
                                            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}