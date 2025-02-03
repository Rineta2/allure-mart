"use client"

import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import OrderSkelaton from '@/components/dashboard/seller/order/order/OrderSkelaton'

import { Order, getOrders } from '@/components/dashboard/seller/order/order/utils/getOrders'

import { updateOrderStatus } from '@/components/dashboard/seller/order/order/utils/updateOrderStatus'

import { OrderStatus } from '@/components/dashboard/seller/order/order/hooks/lib'

import { ItemsModal } from '@/components/dashboard/seller/order/order/hooks/ItemsModal'

import { DesktopOrderView } from '@/components/dashboard/seller/order/order/hooks/DesktopOrderView'

import { MobileOrderView } from '@/components/dashboard/seller/order/order/hooks/MobileOrderView'

export default function OrderContent() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [completedOrderTimers, setCompletedOrderTimers] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders()
                const activeOrders = data.filter(order =>
                    order.orderStatus !== 'cancel' &&
                    (order.orderStatus !== 'completed' || completedOrderTimers[order.id] !== undefined)
                )
                setOrders(activeOrders)
            } catch (error) {
                console.error("Error fetching orders:", error)
                toast.error("Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [completedOrderTimers])

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            const updatedOrders = await getOrders();
            const activeOrders = updatedOrders.filter(order =>
                order.orderStatus !== 'cancel' &&
                (order.orderStatus !== 'completed' || completedOrderTimers[order.id] !== undefined)
            );
            setOrders(activeOrders);

            if (newStatus === 'completed') {
                let timeLeft = 30;
                setCompletedOrderTimers(prev => ({ ...prev, [orderId]: timeLeft }));

                const toastId = toast.loading(`Pesanan akan dihapus dalam ${timeLeft} detik`);

                const timer = setInterval(() => {
                    timeLeft -= 1;
                    setCompletedOrderTimers(prev => ({ ...prev, [orderId]: timeLeft }));

                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        setOrders(prev => prev.filter(order => order.id !== orderId));
                        setCompletedOrderTimers(prev => {
                            const newTimers = { ...prev };
                            delete newTimers[orderId];
                            return newTimers;
                        });
                        toast.success('Pesanan telah dipindahkan ke daftar pesanan selesai', { id: toastId });
                    } else {
                        toast.loading(`Pesanan akan dihapus dalam ${timeLeft} detik`, { id: toastId });
                    }
                }, 1000);
            } else {
                toast.success('Status pesanan berhasil diperbarui');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Gagal memperbarui status pesanan');
        }
    };

    if (loading) return <OrderSkelaton />

    return (
        <section className='min-h-full py-8 bg-white'>
            <div className="container">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8 gap-4">
                    <h1 className='text-2xl font-bold text-gray-900'>Daftar Pesanan</h1>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="search"
                            placeholder='Cari Pesanan'
                            className='w-full py-2.5 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder:text-gray-400'
                        />
                    </div>
                </div>

                <DesktopOrderView
                    orders={orders}
                    handleStatusChange={handleStatusChange}
                    setSelectedOrder={setSelectedOrder}
                />

                <MobileOrderView
                    orders={orders}
                    handleStatusChange={handleStatusChange}
                    setSelectedOrder={setSelectedOrder}
                />

                {selectedOrder && (
                    <ItemsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </div>
        </section>
    );
}