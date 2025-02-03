"use client"

import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import OrderSkelaton from '@/components/dashboard/seller/order/order/OrderSkelaton'

import { Order, getOrders } from '@/components/dashboard/seller/order/order/utils/getOrders'

import Image from 'next/image'

import { updateOrderStatus } from '@/components/dashboard/seller/order/order/utils/updateOrderStatus'

type OrderStatus = 'pending' | 'processing' | 'packaging' | 'shipped' | 'delivered' | 'completed' | 'cancel';

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800'
        case 'processing':
            return 'bg-blue-100 text-blue-800'
        case 'packaging':
            return 'bg-purple-100 text-purple-800'
        case 'shipped':
            return 'bg-green-100 text-green-800'
        case 'delivered':
            return 'bg-teal-100 text-teal-800'
        case 'completed':
            return 'bg-indigo-100 text-indigo-800'
        case 'cancel':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export default function OrderContent() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders()
                const activeOrders = data.filter(order => order.orderStatus !== 'cancel')
                setOrders(activeOrders)
            } catch (error) {
                console.error("Error fetching orders:", error)
                toast.error("Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            const updatedOrders = await getOrders();
            const activeOrders = updatedOrders.filter(order => order.orderStatus !== 'cancel')
            setOrders(activeOrders);
            toast.success('Status pesanan berhasil diperbarui');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Gagal memperbarui status pesanan');
        }
    };

    const ItemsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
        if (!order) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Order Items Details</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
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

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Account & Order Details</th>
                                <th>Customer Information</th>
                                <th>Items & Total</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <Image
                                                        src={order.photoURL}
                                                        alt={order.displayName}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{order.displayName}</div>
                                                <div className="text-sm opacity-50">#{order.orderId}</div>
                                                <div className="text-sm opacity-50">
                                                    {order.createdAt.toDate().toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {order.fullName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{order.email}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{order.phone}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{order.address}, {order.addressDetail}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{order.city}, {order.province}</span>
                                    </td>
                                    <td>
                                        <div className="space-y-2">
                                            {order.items.slice(0, 1).map((item) => (
                                                <div key={item.id} className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <Image
                                                                src={item.thumbnail}
                                                                alt={item.name}
                                                                width={48}
                                                                height={48}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item.name}</div>
                                                        <div className="text-sm opacity-50">
                                                            {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                                                        </div>
                                                        <div className="text-sm font-semibold">
                                                            Total: Rp {order.totalAmount.toLocaleString('id-ID')}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items.length > 1 && (
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="btn btn-ghost btn-xs"
                                                >
                                                    +{order.items.length - 1} more items
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className="select select-bordered select-sm w-full max-w-xs"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="packaging">Packaging</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancel">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Header Section */}
                            <div className="p-5 border-b border-gray-100">
                                <div className="flex gap-2 items-center mb-4">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <Image
                                            src={order.photoURL}
                                            alt={order.displayName}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="profile-info">
                                        <div className="font-bold">{order.displayName}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1 w-fit">
                                        <div className="flex flex-col gap-3">
                                            <label className='flex items-start gap-2 flex-col w-fit text-sm text-gray-500'> Payment Status
                                                <span className={`px-2.5 py-1 w-fit text-xs rounded-full font-medium ${order.transactionStatus === 'success'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.transactionStatus}
                                                </span>
                                            </label>

                                            <h3 className="text-base font-semibold text-gray-900">#{order.orderId}</h3>

                                            <p className="text-xs text-gray-500">
                                                {order.createdAt.toDate().toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3 items-end w-fit'>
                                        <label className='text-sm text-gray-500'>Order Status</label>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className={`px-3.5 py-2 text-sm rounded-full font-medium border-0 
                                            focus:ring-2 focus:ring-blue-500/20 cursor-pointer
                                            ${getStatusColor(order.orderStatus)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="packaging">Packaging</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancel">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="divide-y divide-gray-100">
                                {/* Customer Info */}
                                <div className="p-5">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-3">Customer Information</h4>
                                    <div className="space-y-1.5">
                                        <p className="text-base font-medium text-gray-900">{order.fullName}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>{order.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>{order.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{order.city}, {order.province}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-5">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-3">Order Items</h4>
                                    <div className="space-y-3">
                                        {order.items.slice(0, 1).map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 rounded-xl bg-gray-50/50 p-3">
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    width={56}
                                                    height={56}
                                                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                    <p className="text-sm text-gray-600 mt-0.5">
                                                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="p-5 bg-gray-50/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total ({order.totalItems} items)</p>
                                            <p className="text-lg font-semibold text-gray-900 mt-0.5">
                                                Rp {order.totalAmount.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedOrder && (
                <ItemsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </section>
    );
}
