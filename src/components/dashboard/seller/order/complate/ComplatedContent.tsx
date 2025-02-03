"use client"

import React, { useEffect, useState } from 'react'
import { getOrders, Order } from '../order/utils/getOrders'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function ComplatedContent() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders()
                const activeOrders = data.filter(order => order.orderStatus === 'completed')
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

    return (
        <section className="py-12">
            <div className="container">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Pesanan Selesai</h1>
                        <p className="text-sm text-gray-500">Daftar pesanan yang telah selesai</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                                        <span className="text-green-600 font-medium">{order.orderStatus}</span>
                                    </div>

                                    <div className="border-t pt-4 flex flex-col gap-2 space-y-2">
                                        <p className="font-medium">Informasi Pembeli:</p>
                                        <div className="flex items-center gap-2 ">
                                            <Image src={order.photoURL} alt={order.displayName} width={100} height={100} className="rounded-full" />
                                            <div>
                                                <p>Nama: {order.displayName}</p>
                                                <p>Email: {order.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="font-medium">Informasi Penerima:</p>
                                        <p>Nama: {order.fullName}</p>
                                        <p>Email: {order.email}</p>
                                        <p>No. Telepon: {order.phone}</p>
                                        <p>Alamat: {order.address}, {order.addressDetail}, {order.city}, {order.province}, {order.zipCode}</p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="font-medium">Detail Produk:</p>
                                        {order.items.map((item, index) => (
                                            <div key={index} className="mt-2">
                                                <p>Jumlah: {item.quantity}</p>
                                                <p>Harga: Rp {item.price.toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-4">
                                        <p className="font-medium">Total Pembayaran:</p>
                                        <p className="text-lg font-semibold">Rp {order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
