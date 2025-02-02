"use client"

import React, { useEffect } from 'react'

import { toast } from 'react-hot-toast'

import OrderSkelaton from '@/components/dashboard/user/order/order/OrderSkelaton'

import { useFetchOrder } from '@/utils/section/order/useFetch'

import Pagination from '@/components/helper/Pagination'

import { usePayment } from '@/components/dashboard/user/order/unpaid/hooks/utils/usePayment'

import { OrderDetailsModal } from '@/components/dashboard/user/order/unpaid/hooks/OrderDetailsModal'

import { CancelConfirmationModal } from '@/components/dashboard/user/order/unpaid/hooks/CancelConfrimationModal'

import { OrderData } from '@/components/dashboard/user/order/unpaid/hooks/utils/order'

export default function UnpaidContent() {
    const orderData = useFetchOrder();
    const { data: orders, loading } = orderData;
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 10

    // Add new state for modal
    const [selectedOrder, setSelectedOrder] = React.useState<OrderData | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    // Add new state for cancel confirmation modal
    const [showCancelModal, setShowCancelModal] = React.useState(false)
    const [orderToCancel, setOrderToCancel] = React.useState<string | null>(null)

    const { handleContinuePayment } = usePayment()

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '')
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    // Add useEffect for handling body scroll
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    // Hanya tampilkan skeleton jika loading=true DAN order.data ada/tidak kosong
    if (loading && orders && orders.length > 0) return <OrderSkelaton />

    // Tampilkan pesan "no orders" jika tidak ada data
    if (!orders || orders.length === 0) {
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
                            <h3 className="text-2xl font-bold text-gray-800">No Unpaid Orders</h3>
                            <p className="text-gray-500 leading-relaxed">
                                You don&apos;t have any pending payments at the moment. All your orders have been paid!
                            </p>
                        </div>

                        <button
                            onClick={() => window.location.href = '/shop'}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl
                            font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300
                            shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                            hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    const filteredOrders = orders
        .filter(item => item.transactionStatus === "pending")
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

    const handleCancelOrder = async (orderId: string) => {
        setOrderToCancel(orderId)
        setShowCancelModal(true)
    }

    const confirmCancelOrder = async () => {
        if (!orderToCancel) return

        const loadingToast = toast.loading('Cancelling order...');

        try {
            const response = await fetch('/api/cancel-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderToCancel,
                }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                toast.dismiss(loadingToast);
                toast.success('Order cancelled successfully');
            } else {
                toast.dismiss(loadingToast);
                toast.error(data.message || 'Failed to cancel order');
            }
        } catch (error) {
            console.error('Cancel order error:', error);
            toast.dismiss(loadingToast);
            toast.error('An error occurred while cancelling the order');
        } finally {
            setShowCancelModal(false);
            setOrderToCancel(null);
        }
    }

    return (
        <section className='min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-12'>
            <div className="container">
                <div className="flex flex-col gap-12">
                    {/* Enhanced Search Bar */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <input
                            type="text"
                            placeholder='Search by order ID, name, email, or phone'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200/80 
                            focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                            bg-white/95 backdrop-blur-xl text-gray-700 placeholder-gray-400
                            shadow-lg shadow-gray-200/20 hover:border-gray-300 transition-all duration-300"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>

                    {/* Modernized Card Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {currentOrders.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white/95 p-6 rounded-2xl shadow-sm border border-gray-100/80 
                                backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                                hover:border-blue-500/20"
                            >
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            #{item.orderId}
                                        </h3>
                                        {item.transactionTime && (
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(item.transactionTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(item)
                                            setIsModalOpen(true)
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Status Badge */}
                                <div className="mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                        ${item.transactionStatus === 'success' ? 'bg-green-100 text-green-700' :
                                            item.transactionStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        <span className={`w-2 h-2 rounded-full mr-2 
                                            ${item.transactionStatus === 'success' ? 'bg-green-500' :
                                                item.transactionStatus === 'pending' ? 'bg-amber-500' :
                                                    'bg-red-500'}`}>
                                        </span>
                                        {item.transactionStatus.toUpperCase()}
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                    <p className="text-xl font-bold text-blue-600">
                                        Rp {item.totalAmount?.toLocaleString()}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => handleContinuePayment(item)}
                                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl 
                                        font-medium hover:bg-blue-700 active:bg-blue-800 
                                        transition-all duration-200 shadow-lg shadow-blue-500/20"
                                    >
                                        Pay Now
                                    </button>
                                    <button
                                        onClick={() => handleCancelOrder(item.orderId)}
                                        className="px-4 py-2.5 border border-gray-200 rounded-xl 
                                        font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 
                                        active:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedOrder && (
                        <OrderDetailsModal
                            order={selectedOrder}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onContinuePayment={handleContinuePayment}
                            onCancelOrder={handleCancelOrder}
                        />
                    )}

                    <CancelConfirmationModal
                        isOpen={showCancelModal}
                        onConfirm={confirmCancelOrder}
                        onCancel={() => {
                            setShowCancelModal(false);
                            setOrderToCancel(null);
                        }}
                    />

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
