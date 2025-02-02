"use client"

import React from 'react'

import CanceledSkelaton from '@/components/dashboard/user/order/canceled/CanceledSkelaton'

import SearchBar from '@/components/dashboard/user/order/canceled/hooks/SearchBar'

import OrderCard from '@/components/dashboard/user/order/canceled/hooks/OrderCard'

import OrderDetailsModal from '@/components/dashboard/user/order/canceled/hooks/OrderDetailModal'

import Pagination from '@/components/helper/Pagination'

import { useFetchOrder } from '@/utils/section/order/useFetch'

import { Order } from '@/utils/section/order/schema/schema'

export default function CanceledContent() {
    const { order, loading }: { order: Order, loading: boolean } = useFetchOrder()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [selectedOrder, setSelectedOrder] = React.useState<Order['data'][0] | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const itemsPerPage = 10

    if (loading && order.data && order.data.length > 0) return <CanceledSkelaton />

    if (!order.data || order.data.length === 0) {
        return (
            <section className='min-h-full bg-gradient-to-br from-gray-50 via-white to-gray-100/50 py-8'>
                <div className="container">
                    <div className="flex flex-col items-center justify-center gap-8 max-w-md mx-auto text-center">
                        <div className="relative">
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-100/40 rounded-full blur-3xl"></div>
                            </div>

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
                            <h3 className="text-2xl font-bold text-gray-800">No Canceled Orders</h3>
                            <p className="text-gray-500 leading-relaxed">
                                You don&apos;t have any canceled orders at the moment.
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

    const filteredOrders = order.data
        .filter(item => item.transactionStatus === 'cancelled')
        .filter((item) =>
            item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const timeA = new Date(a.transactionTime || 0).getTime();
            const timeB = new Date(b.transactionTime || 0).getTime();
            return timeB - timeA;
        });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentOrders = filteredOrders.slice(startIndex, endIndex)

    return (
        <section className='min-h-full bg-gradient-to-br from-gray-50 via-white to-gray-100/50 py-8'>
            <div className="container">
                <div className="flex flex-col gap-8 md:gap-12">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                        {currentOrders.map((item) => (
                            <OrderCard
                                key={item.id}
                                item={item}
                                onViewDetails={(order) => {
                                    setSelectedOrder(order)
                                    setIsModalOpen(true)
                                }}
                            />
                        ))}
                    </div>

                    {isModalOpen && selectedOrder && (
                        <OrderDetailsModal
                            order={selectedOrder}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}

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
