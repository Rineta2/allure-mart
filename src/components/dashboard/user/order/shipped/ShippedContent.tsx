"use client"

import React, { useState } from 'react';

import { useFetchOrder } from '@/utils/section/order/useFetch';

import { Order } from '@/utils/section/order/schema/schema';

import OrderSkelaton from '@/components/dashboard/user/order/shipped/ShippedSkelaton';

import { EmptyOrderState } from '@/components/dashboard/user/order/shipped/hooks/EmptyOrderState';

import { OrderCard } from '@/components/dashboard/user/order/shipped/hooks/OrderCard';

import { OrderDetailsModal } from '@/components/dashboard/user/order/shipped/hooks/OrderDetailsModal';

import Pagination from '@/components/helper/Pagination';

export default function ShippedContent() {
    const orderData = useFetchOrder();
    const { data: orders, loading } = orderData;
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order['data'][0] | null>(null);
    const itemsPerPage = 10;

    if (loading && orders && orders.length > 0) return <OrderSkelaton />;

    const filteredOrders = orders
        .filter((item) => item.orderStatus === 'shipped')
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

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const currentOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleViewDetails = (order: Order['data'][0]) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-2 sm:py-12'>
            <div className="container">
                <div className="flex flex-col gap-8 sm:gap-12">
                    {filteredOrders.length === 0 ? (
                        <EmptyOrderState />
                    ) : (
                        <>
                            <div className="search relative max-w-2xl mx-auto w-full px-2 sm:px-0">
                                <input
                                    type="text"
                                    placeholder='Search by order ID, name, email, or phone'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200/80 
                                    focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                                    bg-white/95 backdrop-blur-xl text-gray-700 placeholder-gray-400 text-sm sm:text-base
                                    shadow-lg shadow-gray-200/20 hover:border-gray-300 transition-all duration-300"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                                {currentOrders.map((item) => (
                                    <OrderCard
                                        key={item.id}
                                        item={item}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.max(1, totalPages)}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        </>
                    )}
                </div>
            </div>

            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </section>
    );
}
