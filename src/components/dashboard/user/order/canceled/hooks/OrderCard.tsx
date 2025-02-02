import React from 'react'
import { Order } from '@/utils/section/order/schema/schema'

interface OrderCardProps {
    item: Order['data'][0]
    onViewDetails: (order: Order['data'][0]) => void
}

export default function OrderCard({ item, onViewDetails }: OrderCardProps) {
    return (
        <div className="bg-white/90 p-5 md:p-6 rounded-2xl shadow-lg shadow-gray-200/40
            border border-gray-100 backdrop-blur-xl transition-all duration-300
            hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/60
            hover:-translate-y-1">
            {/* Order Header */}
            <div className="flex justify-between items-start gap-3 mb-5">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
                        Order #{item.orderId}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                        {item.transactionTime ? new Date(item.transactionTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : 'No date available'}
                    </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold inline-flex items-center gap-1.5
                    ${item.transactionStatus === 'success' ? 'bg-green-100/80 text-green-700' :
                        item.transactionStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700' :
                            'bg-red-100/80 text-red-700'}`}>
                    <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
                    {item.transactionStatus.charAt(0).toUpperCase() + item.transactionStatus.slice(1)}
                </span>
            </div>

            {/* Basic Info */}
            <div className="space-y-2.5 mb-5">
                <p className="text-sm text-gray-600 flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">{item.fullName}</span>
                </p>
                <p className="text-sm text-gray-600 flex justify-between">
                    <span className="text-gray-500">Total Items:</span>
                    <span className="font-medium">{item.totalItems}</span>
                </p>
                <p className="text-sm text-gray-600 flex justify-between">
                    <span className="text-gray-500">Total Amount:</span>
                    <span className="font-medium">Rp {item.totalAmount?.toLocaleString() || '0'}</span>
                </p>
            </div>

            {/* View Details Button */}
            <button
                className="w-full px-4 py-2.5 md:py-3 flex items-center justify-center gap-2 
                bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium
                transition-all duration-300 hover:scale-[1.02] border border-gray-200
                active:scale-[0.98]"
                onClick={() => onViewDetails(item)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                View Details
            </button>
        </div>
    )
}