import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Order } from '@/utils/section/order/schema/schema';

import { OrderProgress } from '@/components/dashboard/user/order/shipped/hooks/OrderProgress';

import Image from 'next/image';

import { format } from 'date-fns';

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order['data'][0] | null;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white shadow-2xl transition-all overflow-hidden">
                                {/* Modal Header */}
                                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10">
                                    <Dialog.Title as="h3" className="text-lg sm:text-xl font-bold text-gray-900 break-all">
                                        Order Details #{order.orderId}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100/80 transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="px-4 sm:px-6 py-6 overflow-y-auto max-h-[calc(85vh-4rem)]" style={{ scrollbarWidth: 'thin' }}>
                                    {/* Progress Bar */}
                                    <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
                                        <div className="min-w-[600px] px-4 sm:px-0">
                                            <OrderProgress status={order.orderStatus} />
                                        </div>
                                    </div>

                                    {/* Content Sections */}
                                    <div className="space-y-8">
                                        {/* Customer Information */}
                                        <div className="bg-gray-50/50 rounded-xl p-4 sm:p-6">
                                            <h4 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Customer Information
                                            </h4>
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Name:</span>
                                                    <span className="flex-1 text-sm sm:text-base">{order.fullName}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Email:</span>
                                                    <span className="flex-1 text-sm sm:text-base break-all">{order.email}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Phone:</span>
                                                    <span className="flex-1 text-sm sm:text-base">{order.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Information */}
                                        <div className="bg-gray-50/50 rounded-xl p-4 sm:p-6">
                                            <h4 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Shipping Information
                                            </h4>
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-start">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Address:</span>
                                                    <div className="flex-1">
                                                        <p className="text-sm sm:text-base">{order.address}</p>
                                                        <p className="text-sm sm:text-base text-gray-600 mt-1">{order.addressDetail}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Type:</span>
                                                    <span className="flex-1 text-sm sm:text-base capitalize">{order.type}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">City:</span>
                                                    <span className="flex-1 text-sm sm:text-base">{order.city}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Province:</span>
                                                    <span className="flex-1 text-sm sm:text-base">{order.province}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Postal Code:</span>
                                                    <span className="flex-1 text-sm sm:text-base">{order.zipCode}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="bg-gray-50/50 rounded-xl p-4 sm:p-6">
                                            <h4 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Order Items
                                            </h4>
                                            <div className="space-y-3 sm:space-y-4">
                                                {order.items?.map((product, index) => (
                                                    <div key={index} className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3 sm:gap-4">
                                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                                                                <Image
                                                                    src={product.thumbnail}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="rounded-lg object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm sm:text-base">{product.name}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600 mt-1">Qty: {product.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <span className="font-medium text-sm sm:text-base mt-2 sm:mt-0">
                                                            Rp {(product.price * product.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Payment Information */}
                                        <div className="bg-gray-50/50 rounded-xl p-4 sm:p-6">
                                            <h4 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                                Payment Information
                                            </h4>
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Transaction ID:</span>
                                                    <span className="font-mono text-xs sm:text-sm break-all">{order.transactionId}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Status:</span>
                                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium w-fit
                                                        ${order.transactionStatus === 'success'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {order.transactionStatus}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="w-32 text-gray-600 text-sm sm:text-base">Transaction:</span>
                                                    <span className="text-sm sm:text-base">
                                                        {format(new Date(order.transactionTime), 'dd MMM yyyy, HH:mm')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};