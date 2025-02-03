import React from 'react'

export default function ComplatedSkelaton() {
    return (
        <section className="py-12 min-h-full">
            <div className="container">
                <div className="flex flex-col gap-12">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
                            <div className="h-5 w-64 bg-gray-200 rounded-md animate-pulse" />
                        </div>
                        <div className="w-full max-w-xs h-10 bg-gray-200 rounded-md animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex flex-col gap-6">
                                    {/* Order Header */}
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
                                        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                                    </div>

                                    {/* Buyer Info */}
                                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
                                        <div className="h-5 w-36 bg-gray-200 rounded-md animate-pulse" />
                                        <div className="flex items-center gap-4">
                                            <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse" />
                                                <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recipient Info */}
                                    <div className="border-t border-gray-100 pt-4 space-y-3">
                                        <div className="h-5 w-36 bg-gray-200 rounded-md animate-pulse" />
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4].map((line) => (
                                                <div key={line} className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-4" />
                                        <div className="flex gap-4">
                                            <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="h-5 w-48 bg-gray-200 rounded-md animate-pulse" />
                                                <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse" />
                                                <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Payment */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="h-5 w-36 bg-gray-200 rounded-md animate-pulse mb-2" />
                                        <div className="h-7 w-48 bg-gray-200 rounded-md animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}