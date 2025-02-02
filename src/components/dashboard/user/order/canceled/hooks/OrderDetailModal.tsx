import React from 'react'
import Image from 'next/image'
import { Order } from '@/utils/section/order/schema/schema'

interface OrderDetailsModalProps {
    order: Order['data'][0]
    onClose: () => void
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl border border-gray-100">
                <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                            Order Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="space-y-6">
                        {/* Order ID and Status */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                <p className="font-semibold text-gray-800">{order.orderId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2
                                    ${order.transactionStatus === 'success' ? 'bg-green-100/80 text-green-700' :
                                        order.transactionStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700' :
                                            'bg-red-100/80 text-red-700'}`}>
                                    <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
                                    {order.transactionStatus.charAt(0).toUpperCase() + order.transactionStatus.slice(1)}
                                </span>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Name</span>
                                        <span className="font-medium text-gray-800">{order.fullName}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Phone</span>
                                        <span className="font-medium text-gray-800">{order.phone}</span>
                                    </p>
                                </div>
                                <p className="text-sm">
                                    <span className="text-gray-500 block mb-1">Email</span>
                                    <span className="font-medium text-gray-800">{order.email}</span>
                                </p>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-3">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Type</span>
                                        <span className="font-medium text-gray-800 capitalize">{order.type}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">City</span>
                                        <span className="font-medium text-gray-800">{order.city}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Province</span>
                                        <span className="font-medium text-gray-800">{order.province}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Zip Code</span>
                                        <span className="font-medium text-gray-800">{order.zipCode}</span>
                                    </p>
                                </div>
                                <p className="text-sm col-span-2">
                                    <span className="text-gray-500 block mb-1">Complete Address</span>
                                    <span className="font-medium text-gray-800">{order.address}</span>
                                </p>
                                {order.addressDetail && (
                                    <p className="text-sm col-span-2">
                                        <span className="text-gray-500 block mb-1">Additional Details</span>
                                        <span className="font-medium text-gray-800">{order.addressDetail}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex gap-4">
                                        <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-2">
                                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity} x Rp {item.price.toLocaleString()}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800">
                                                Subtotal: Rp {(item.quantity * item.price).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Total Items</span>
                                        <span className="font-medium text-gray-800">{order.totalItems}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Total Amount</span>
                                        <span className="font-medium text-gray-800">Rp {order.totalAmount?.toLocaleString() || '0'}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Order Status</span>
                                        <span className="font-medium text-gray-800 capitalize">{order.orderStatus}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Transaction ID</span>
                                        <span className="font-medium text-gray-800">{order.transactionId}</span>
                                    </p>
                                </div>
                                <p className="text-sm">
                                    <span className="text-gray-500 block mb-1">Transaction Time</span>
                                    <span className="font-medium text-gray-800">{order.transactionTime}</span>
                                </p>
                                {order.message && (
                                    <p className="text-sm">
                                        <span className="text-gray-500 block mb-1">Message</span>
                                        <span className="font-medium text-gray-800">{order.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium
                            hover:bg-gray-200 transition-all duration-300 active:scale-[0.98]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}