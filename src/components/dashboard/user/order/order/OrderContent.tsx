"use client"

import React from 'react'

import OrderSkelaton from '@/components/dashboard/user/order/order/OrderSkelaton'

import { useFetchOrder } from '@/utils/section/order/useFetch'

import { Order } from '@/utils/section/order/schema/schema'

import Image from 'next/image'

import Pagination from '@/components/helper/Pagination'

export default function OrderContent() {
    const { order, loading }: { order: Order, loading: boolean } = useFetchOrder()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    if (loading) return <OrderSkelaton />

    const filteredOrders = order.data
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
        <section className='min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-12'>
            <div className="container">
                <div className="flex flex-col gap-12">
                    {/* Search Bar with enhanced styling */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <input
                            type="text"
                            placeholder='Search by order ID, name, email, or phone'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border border-gray-200/80 
                            focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                            bg-white/95 backdrop-blur-xl text-gray-700 placeholder-gray-400
                            shadow-lg shadow-gray-200/20 hover:border-gray-300 transition-all duration-300"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8'>
                        {currentOrders.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white/95 p-6 lg:p-8 rounded-[2rem] shadow-xl shadow-gray-200/40
                                border border-gray-100/80 backdrop-blur-xl transition-all duration-300
                                hover:border-gray-200/80 hover:shadow-2xl hover:shadow-gray-200/60
                                hover:translate-y-[-2px]"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                                            Order #{item.orderId}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1.5 font-medium">
                                            {new Date().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2
                                    transition-all duration-300 hover:scale-105
                                    ${item.orderStatus === 'completed' ? 'bg-green-100/80 text-green-700 ring-1 ring-green-600/20' :
                                            item.orderStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                item.orderStatus === 'cancelled' ? 'bg-red-100/80 text-red-700 ring-1 ring-red-600/20' :
                                                    'bg-blue-100/80 text-blue-700 ring-1 ring-blue-600/20'}`}>
                                        <span className="h-2.5 w-2.5 rounded-full bg-current animate-pulse"></span>
                                        {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                                    </span>
                                </div>

                                {/* Customer Details */}
                                <div className="grid gap-3">
                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100 
                                        backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/40">
                                        <h4 className="font-medium text-gray-800 mb-4">Customer Information</h4>
                                        <div className="space-y-3">
                                            <p className="text-sm text-gray-600 flex items-center gap-3">
                                                <span className="w-20 text-gray-500">Name:</span>
                                                <span className="font-medium">{item.fullName}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 flex items-center gap-3">
                                                <span className="w-20 text-gray-500">Email:</span>
                                                <span className="font-medium">{item.email}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 flex items-center gap-3">
                                                <span className="w-20 text-gray-500">Phone:</span>
                                                <span className="font-medium">{item.phone}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100 
                                        backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/40">
                                        <h4 className="font-medium text-gray-800 mb-4">Shipping Address</h4>
                                        <div className="space-y-3 text-sm text-gray-600">
                                            <p>{item.address}</p>
                                            <p>{item.addressDetail}</p>
                                            <p>{item.city}, {item.province} {item.zipCode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="border-t border-gray-100 pt-6 mt-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-medium text-gray-800">Order Summary</h4>
                                        <p className="text-sm font-medium px-4 py-1.5 bg-gray-100 rounded-full text-gray-700">
                                            {item.totalItems} items
                                        </p>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-4">
                                        {item.items?.map((product, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 rounded-2xl
                                                bg-gradient-to-br from-gray-50/95 to-white/90 transition-all duration-300 
                                                border border-gray-100/80 hover:border-gray-200/80 hover:shadow-lg
                                                hover:shadow-gray-200/40 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="relative overflow-hidden rounded-xl w-16 h-16 
                                                        group-hover:scale-105 transition-transform duration-300">
                                                        <Image
                                                            src={product.thumbnail}
                                                            alt={product.name}
                                                            width={500}
                                                            height={500}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{product.name}</p>
                                                        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="font-medium text-gray-800">
                                                    Rp {(product.price * product.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total Amount */}
                                    <div className="border-t border-gray-100 mt-6 pt-6">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-800">Total Amount</span>
                                            <span className="font-semibold text-xl text-blue-600">
                                                Rp {item.totalAmount?.toLocaleString() || '0'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100
                                        backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/40">
                                        <h4 className="font-medium text-gray-800 mb-4">Payment Information</h4>
                                        <div className="flex flex-wrap gap-4 text-sm">

                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-gray-600">
                                                    {item.transactionId}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                                    ${item.transactionStatus === 'success' ? 'bg-green-100/80 text-green-700 ring-1 ring-green-600/20' :
                                                        item.transactionStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                            'bg-red-100/80 text-red-700 ring-1 ring-red-600/20'}`}>
                                                    {item.transactionStatus.charAt(0).toUpperCase() + item.transactionStatus.slice(1)}
                                                </span>
                                            </div>

                                            {item.transactionTime && (
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <span>🕒</span>
                                                    {item.transactionTime}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <button
                                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl 
                                            font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 
                                            hover:border-gray-300 shadow-lg shadow-gray-200/20"
                                            onClick={() => {/* Add contact seller logic */ }}
                                        >
                                            Hubungi Penjual
                                        </button>
                                        <button
                                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl 
                                            font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 
                                            hover:border-gray-300 shadow-lg shadow-gray-200/20"
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.max(1, totalPages)}
                        onPageChange={(page) => {
                            setCurrentPage(page)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
