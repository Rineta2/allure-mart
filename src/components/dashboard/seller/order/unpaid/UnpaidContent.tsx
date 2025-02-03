"use client"

import React, { useEffect, useState } from 'react'

import { getOrders, Order } from '@/components/dashboard/seller/order/order/utils/getOrders'

import { toast } from 'react-hot-toast'

import UnpaidSkelaton from '@/components/dashboard/seller/order/unpaid/UnpaidSkelaton'

import Pagination from '@/components/helper/Pagination'

import OrderCard from '@/components/dashboard/seller/order/unpaid/hooks/OrderCard'

import ProductsModal from '@/components/dashboard/seller/order/unpaid/hooks/ProductModal'

import { OrderItem } from '@/components/dashboard/seller/order/unpaid/hooks/schema/schema'

export default function UnpaidContent() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImages, setSelectedImages] = useState<OrderItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 6

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders()
                const activeOrders = data.filter(order => order.transactionStatus === 'pending')
                setOrders(activeOrders)
            } catch {
                toast.error("Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order => {
        const searchLower = searchQuery.toLowerCase()
        return order.displayName.toLowerCase().includes(searchLower) ||
            order.id.toString().includes(searchQuery)
    })

    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    if (loading) {
        return <UnpaidSkelaton />
    }

    return (
        <section className="py-12 min-h-full">
            <div className="container">
                <div className="flex flex-col gap-12">
                    <div className="flex justify-start sm:justify-between sm:flex-row flex-col items-start sm:items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold text-gray-900">Belum Dibayar</h1>
                            <p className="text-base text-gray-600">Daftar pesanan yang belum dibayar</p>
                        </div>

                        <input
                            placeholder="Cari pesanan"
                            className="w-full max-w-full sm:max-w-xs p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onViewAllProducts={(items) => {
                                    setSelectedImages(items)
                                    setIsModalOpen(true)
                                }}
                            />
                        ))}
                    </div>

                    {filteredOrders.length > 0 && (
                        <div className="flex justify-center mt-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>

            <ProductsModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                items={selectedImages}
            />
        </section>
    )
}
