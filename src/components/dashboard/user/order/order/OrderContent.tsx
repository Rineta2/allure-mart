"use client"

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import OrderSkelaton from '@/components/dashboard/user/order/order/OrderSkelaton'
import { useFetchOrder } from '@/utils/section/order/useFetch'
import { Order, OrderData, OrderItem } from '@/utils/section/order/schema/schema'
import Image from 'next/image'
import Pagination from '@/components/helper/Pagination'
import { OrderProgress } from '@/components/dashboard/user/order/order/OrderProgress'

export default function OrderContent() {
    const { order, loading }: { order: Order, loading: boolean } = useFetchOrder()

    const [searchQuery, setSearchQuery] = React.useState('')

    const [currentPage, setCurrentPage] = React.useState(1)

    const itemsPerPage = 12

    const [isOpen, setIsOpen] = React.useState(false)

    const [selectedOrder, setSelectedOrder] = React.useState<OrderData | null>(null)

    if (loading && order.data && order.data.length > 0) return <OrderSkelaton />

    if (!order.data || order.data.length === 0) {
        return (
            <section className='min-h-full bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-12'>
                <div className="container">
                    <div className="flex flex-col items-center justify-center gap-8 max-w-md mx-auto text-center">
                        <div className="relative">
                            {/* Background decorative elements */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-100/40 rounded-full blur-3xl"></div>
                            </div>

                            {/* Main illustration */}
                            <svg
                                className="w-56 h-56 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.5 6.5L9 4M9 4L14.5 6.5M9 4V15.5M14.5 6.5L19.5 4M14.5 6.5V15.5M19.5 4V13.5M19.5 13.5L14.5 15.5M19.5 13.5L9 15.5M14.5 15.5L9 15.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-draw"
                                />
                                <path
                                    d="M7 8L11 6.5M16.5 8L12.5 6.5M7 11L11 9.5M16.5 11L12.5 9.5M7 14L11 12.5M16.5 14L12.5 12.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity="0.5"
                                />
                            </svg>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-gray-800">No Orders Yet</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Your order history is empty. Discover our amazing products and start your shopping journey today!
                            </p>
                        </div>

                        <button
                            onClick={() => window.location.href = '/shop'}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl
                            font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300
                            shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                            hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </section>
        )
    }

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

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(order: OrderData) {
        setSelectedOrder(order)
        setIsOpen(true)
    }

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

                    {/* Cards Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {currentOrders.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100">
                                {/* Card Content - Clickable Area */}
                                <div
                                    onClick={() => openModal(item)}
                                    className="p-6 cursor-pointer hover:bg-gray-50/50 transition-all duration-300"
                                >
                                    {/* Order Status Badge */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-semibold text-gray-800">#{item.orderId}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${item.orderStatus === 'completed' ? 'bg-green-100 text-green-700' :
                                                item.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                                        </span>
                                    </div>

                                    {/* Customer Preview */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">{item.fullName}</p>
                                        <p className="text-sm text-gray-500">{item.email}</p>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">{item.totalItems} items</span>
                                        <span className="font-medium text-blue-600">
                                            Rp {item.totalAmount?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons - Outside Clickable Area */}
                                <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                                    <div className="flex gap-3">
                                        <button
                                            className="flex-1 px-4 py-2 text-sm border border-gray-200 bg-white text-gray-700 rounded-lg
                                            font-medium hover:bg-gray-50 transition-all duration-300
                                            hover:border-gray-300 shadow-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Add contact seller logic
                                            }}
                                        >
                                            Hubungi Penjual
                                        </button>
                                        <button
                                            className="flex-1 px-4 py-2 text-sm border border-gray-200 bg-white text-gray-700 rounded-lg
                                            font-medium hover:bg-gray-50 transition-all duration-300
                                            hover:border-gray-300 shadow-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Add show ratings logic
                                            }}
                                        >
                                            Tampilkan Penilaian
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-50" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0">
                                <div className="flex min-h-full items-center justify-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-4xl transform rounded-2xl bg-white shadow-xl transition-all max-h-[90vh] flex flex-col">
                                            {selectedOrder && (
                                                <>
                                                    {/* Fixed Header */}
                                                    <div className="px-8 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <Dialog.Title className="text-xl font-bold text-gray-800">
                                                                    Order #{selectedOrder.orderId}
                                                                </Dialog.Title>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {new Date(selectedOrder.transactionTime).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2
                                                                ${selectedOrder.orderStatus === 'completed' ? 'bg-green-100/80 text-green-700 ring-1 ring-green-600/20' :
                                                                    selectedOrder.orderStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                                        selectedOrder.orderStatus === 'cancelled' ? 'bg-red-100/80 text-red-700 ring-1 ring-red-600/20' :
                                                                            'bg-blue-100/80 text-blue-700 ring-1 ring-blue-600/20'}`}>
                                                                <span className="h-2.5 w-2.5 rounded-full bg-current animate-pulse"></span>
                                                                {selectedOrder.orderStatus.charAt(0).toUpperCase() + selectedOrder.orderStatus.slice(1)}
                                                            </span>
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="mb-2">
                                                            {selectedOrder.transactionStatus !== 'cancelled' && selectedOrder.orderStatus !== 'cancelled' && (
                                                                <OrderProgress status={selectedOrder.orderStatus} />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Scrollable Content */}
                                                    <div
                                                        className="flex-1 overflow-y-auto px-8 py-6"
                                                        style={{
                                                            scrollbarWidth: 'thin',
                                                            scrollbarColor: '#888888 #f0f0f0',
                                                            overflowY: 'auto',
                                                            overscrollBehavior: 'contain'
                                                        }}
                                                    >
                                                        <div className="space-y-6">
                                                            {/* Customer Details */}
                                                            <div className="grid gap-3">
                                                                <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100">
                                                                    <h4 className="font-medium text-gray-800 mb-4">Customer Information</h4>
                                                                    <div className="space-y-3">
                                                                        <p className="text-sm text-gray-600 flex items-center gap-3">
                                                                            <span className="w-20 text-gray-500">Name:</span>
                                                                            <span className="font-medium">{selectedOrder.fullName}</span>
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 flex items-center gap-3">
                                                                            <span className="w-20 text-gray-500">Email:</span>
                                                                            <span className="font-medium">{selectedOrder.email}</span>
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 flex items-center gap-3">
                                                                            <span className="w-20 text-gray-500">Phone:</span>
                                                                            <span className="font-medium">{selectedOrder.phone}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100">
                                                                    <h4 className="font-medium text-gray-800 mb-4">Shipping Address</h4>
                                                                    <div className="space-y-3 text-sm text-gray-600">
                                                                        <p>{selectedOrder.address}</p>
                                                                        <p>{selectedOrder.addressDetail}</p>
                                                                        <p>{selectedOrder.city}, {selectedOrder.province} {selectedOrder.zipCode}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Order Items */}
                                                            <div className="border-t border-gray-100 pt-6">
                                                                <div className="flex justify-between items-center mb-6">
                                                                    <h4 className="font-medium text-gray-800">Order Summary</h4>
                                                                    <p className="text-sm font-medium px-4 py-1.5 bg-gray-100 rounded-full text-gray-700">
                                                                        {selectedOrder.totalItems} items
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    {selectedOrder.items?.map((product: OrderItem, index: number) => (
                                                                        <div
                                                                            key={index}
                                                                            className="flex items-center justify-between p-4 rounded-2xl
                                                                            bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100/80 group"
                                                                        >
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="relative overflow-hidden rounded-xl w-16 h-16">
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
                                                                            Rp {selectedOrder.totalAmount?.toLocaleString() || '0'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Payment Details */}
                                                            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50/95 to-white/90 border border-gray-100">
                                                                <h4 className="font-medium text-gray-800 mb-4">Payment Information</h4>
                                                                <div className="flex flex-wrap gap-4 text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-mono text-gray-600">
                                                                            {selectedOrder.transactionId}
                                                                        </span>
                                                                    </div>

                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                                                            ${selectedOrder.transactionStatus === 'success' ? 'bg-green-100/80 text-green-700 ring-1 ring-green-600/20' :
                                                                                selectedOrder.transactionStatus === 'pending' ? 'bg-yellow-100/80 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                                                    'bg-red-100/80 text-red-700 ring-1 ring-red-600/20'}`}>
                                                                            {selectedOrder.transactionStatus.charAt(0).toUpperCase() + selectedOrder.transactionStatus.slice(1)}
                                                                        </span>
                                                                    </div>

                                                                    {selectedOrder.transactionTime && (
                                                                        <div className="flex items-center gap-2 text-gray-500">
                                                                            <span>🕒</span>
                                                                            {selectedOrder.transactionTime}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Fixed Footer */}
                                                    <div className="px-8 py-6 border-t border-gray-100 bg-white rounded-b-2xl flex-shrink-0">
                                                        <div className="flex justify-end">
                                                            <button
                                                                className="px-6 py-3 bg-blue-600 text-white rounded-xl 
                                                                font-semibold hover:bg-blue-700 transition-all duration-300"
                                                                onClick={closeModal}
                                                            >
                                                                Close
                                                            </button>
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
