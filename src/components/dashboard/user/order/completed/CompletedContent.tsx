"use client"

import React, { useState, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import Image from 'next/image'

import { IoEyeSharp } from "react-icons/io5";

import OrderSkelaton from '@/components/dashboard/user/order/completed/CompletedSkelaton'

import { useFetchOrder } from '@/utils/section/order/useFetch'

import { Order } from '@/utils/section/order/schema/schema'

import Pagination from '@/components/helper/Pagination'

import { OrderProgress } from '@/components/dashboard/user/order/shipped/hooks/OrderProgress'

export default function OrderContent() {
    const { order, loading }: { order: Order, loading: boolean } = useFetchOrder()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10
    const [selectedOrder, setSelectedOrder] = useState<Order['data'][0] | null>(null)

    if (loading && order.data && order.data.length > 0) return <OrderSkelaton />

    const filteredOrders = order.data
        .filter(item => item.orderStatus === "completed")
        .filter((item) =>
            item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            // Sort by transaction time in descending order (newest first)
            const timeA = new Date(a.transactionTime || 0).getTime();
            const timeB = new Date(b.transactionTime || 0).getTime();
            return timeB - timeA;
        });

    // Calculate pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentOrders = filteredOrders.slice(startIndex, endIndex)

    return (
        <section className='min-h-full py-12'>
            <div className="container">
                <div className="flex flex-col gap-8">
                    {order.data.filter(item => item.orderStatus === "completed").length > 0 ? (
                        <>
                            {/* Search Bar */}
                            <div className="search relative max-w-2xl mx-auto w-full">
                                <input
                                    type="text"
                                    placeholder='Search by order ID, name, email, or phone'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                    bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400
                                    shadow-lg shadow-gray-200/20 transition-all duration-200"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔍
                                </span>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8'>
                                {currentOrders.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/40 
                                        overflow-hidden relative border border-gray-100 hover:shadow-2xl 
                                        hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Card Content */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        Order #{item.orderId}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date(item.transactionTime || '').toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100/80 
                                                    text-green-700 backdrop-blur-sm flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                    {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                                                </span>
                                            </div>

                                            {/* Basic Info */}
                                            <div className="space-y-3 mb-6">
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
                                                    <span className="font-medium">Rp {item.totalAmount?.toLocaleString()}</span>
                                                </p>
                                            </div>

                                            {/* View Details Button */}
                                            <button
                                                onClick={() => setSelectedOrder(item)}
                                                className="absolute top-4 right-4 p-2.5 rounded-xl bg-blue-50/80 
                                                text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                                            >
                                                <IoEyeSharp size={18} />
                                            </button>

                                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                                <button
                                                    className="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-700 
                                                    rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 
                                                    hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/20"
                                                    onClick={() => {/* Add contact seller logic */ }}
                                                >
                                                    Hubungi Penjual
                                                </button>
                                                <button
                                                    className="flex-1 px-6 py-3 bg-blue-500 text-white border border-blue-500 
                                                    rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 
                                                    hover:shadow-lg hover:shadow-blue-200/30"
                                                    onClick={() => {/* Add show ratings logic */ }}
                                                >
                                                    Tampilkan Penilaian
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className='absolute bottom-2 left-2 right-2'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.max(1, totalPages)}
                                    onPageChange={(page) => {
                                        setCurrentPage(page)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg
                                className="w-48 h-48 text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 647.63626 632.17383"
                            >
                                <path
                                    d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                                    transform="translate(-276.18187 -133.91309)"
                                    fill="#f2f2f2"
                                />
                                <path
                                    d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                                    transform="translate(-276.18187 -133.91309)"
                                    fill="#3f3d56"
                                />
                                <path
                                    d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                                    transform="translate(-276.18187 -133.91309)"
                                    fill="#6c63ff"
                                />
                                <circle cx="190.15351" cy="24.95465" r="20" fill="#6c63ff" />
                            </svg>
                            <h3 className="mt-8 text-xl font-semibold text-gray-700">
                                No Orders Found
                            </h3>
                            <p className="mt-2 text-gray-500">
                                There are no completed orders to display at the moment.
                            </p>
                        </div>
                    )}

                    {/* Replace the existing modal with this new Dialog component */}
                    <Transition appear show={!!selectedOrder} as={Fragment}>
                        <Dialog as="div" className="relative z-50" onClose={() => setSelectedOrder(null)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                                        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl 
                                            bg-white/95 shadow-2xl transition-all border border-gray-100">
                                            {selectedOrder && (
                                                <>
                                                    {/* Modal Header */}
                                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center 
                                                        justify-between sticky top-0 bg-white/90 backdrop-blur-xl z-10">
                                                        <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
                                                            Order Details #{selectedOrder.orderId}
                                                        </Dialog.Title>
                                                        <button
                                                            onClick={() => setSelectedOrder(null)}
                                                            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 
                                                            hover:bg-gray-100/80 transition-all duration-200"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Modal Content */}
                                                    <div className="px-6 py-6 overflow-y-auto max-h-[80vh] scrollbar-thin 
                                                        scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                                        {/* Progress Bar Section */}
                                                        <div className="overflow-x-auto -mx-6 mb-8">
                                                            <div className="min-w-[600px] px-6">
                                                                <OrderProgress status={selectedOrder.orderStatus} />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            {/* Customer Information */}
                                                            <div className="bg-gray-50/50 rounded-2xl p-6 backdrop-blur-sm 
                                                                border border-gray-100/80 shadow-sm">
                                                                <h4 className="text-lg font-semibold mb-4 text-gray-900 
                                                                    flex items-center gap-2">
                                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                    Customer Information
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Name:</span>
                                                                        <span className="flex-1 font-medium">{selectedOrder.fullName}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Email:</span>
                                                                        <span className="flex-1 font-medium break-all">{selectedOrder.email}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Phone:</span>
                                                                        <span className="flex-1 font-medium">{selectedOrder.phone}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Order Items */}
                                                            <div className="bg-gray-50/50 rounded-2xl p-6 backdrop-blur-sm 
                                                                border border-gray-100/80 shadow-sm">
                                                                <h4 className="text-lg font-semibold mb-4 text-gray-900 
                                                                    flex items-center gap-2">
                                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                                    </svg>
                                                                    Order Items
                                                                </h4>
                                                                <div className="space-y-4">
                                                                    {selectedOrder.items?.map((product, index) => (
                                                                        <div key={index} className="flex items-center justify-between p-4 
                                                                            bg-white rounded-xl border border-gray-100/80 shadow-sm">
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="relative w-20 h-20 flex-shrink-0">
                                                                                    <Image
                                                                                        src={product.thumbnail}
                                                                                        alt={product.name}
                                                                                        fill
                                                                                        className="rounded-lg object-cover"
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="font-medium">{product.name}</p>
                                                                                    <p className="text-sm text-gray-600 mt-1">
                                                                                        Qty: {product.quantity}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <span className="font-medium text-blue-600">
                                                                                Rp {(product.price * product.quantity).toLocaleString()}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Payment Information */}
                                                            <div className="bg-gray-50/50 rounded-2xl p-6 backdrop-blur-sm 
                                                                border border-gray-100/80 shadow-sm">
                                                                <h4 className="text-lg font-semibold mb-4 text-gray-900 
                                                                    flex items-center gap-2">
                                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                    </svg>
                                                                    Payment Information
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Status:</span>
                                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                                                            ${selectedOrder.transactionStatus === 'success'
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : 'bg-yellow-100 text-yellow-800'}`}>
                                                                            {selectedOrder.transactionStatus}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Total Amount:</span>
                                                                        <span className="font-medium text-blue-600">
                                                                            Rp {selectedOrder.totalAmount?.toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Transaction ID:</span>
                                                                        <span className="font-mono text-sm break-all">
                                                                            {selectedOrder.transactionId}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="w-32 text-gray-600">Date:</span>
                                                                        <span>
                                                                            {new Date(selectedOrder.transactionTime || '').toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </section>
    )
}
