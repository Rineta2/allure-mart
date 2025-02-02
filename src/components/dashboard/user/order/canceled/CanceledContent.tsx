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

    if (loading) return <CanceledSkelaton />

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
