import React from 'react'

export default function ProfileSkelaton() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow p-6">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Description Skeleton */}
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Details Skeleton */}
                    <div className="md:col-span-2">
                        <div className="space-y-4">
                            {/* Name, Email, Role, Member Since fields */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="grid grid-cols-3 items-center">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="col-span-2">
                                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Image Skeleton */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-32 h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="text-center">
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            <div className="mt-2 space-y-1">
                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}