import Image from 'next/image'

import { OrderCardProps } from '@/components/dashboard/seller/order/unpaid/hooks/schema/schema'

export default function OrderCard({ order, onViewAllProducts }: OrderCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {order.orderStatus}
                    </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
                    <p className="font-medium text-gray-900">Informasi Pembeli</p>
                    <div className="flex items-center gap-4">
                        <Image
                            src={order.photoURL}
                            alt={order.displayName}
                            width={60}
                            height={60}
                            className="rounded-full ring-2 ring-gray-100"
                        />
                        <div className="space-y-1">
                            <p className="text-gray-900">{order.displayName}</p>
                            <p className="text-gray-600 text-sm">{order.email}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <p className="font-medium text-gray-900">Informasi Penerima</p>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Nama:</span> {order.fullName}</p>
                        <p><span className="font-medium">Email:</span> {order.email}</p>
                        <p><span className="font-medium">No. Telepon:</span> {order.phone}</p>
                        <p><span className="font-medium">Alamat:</span> {order.address}, {order.addressDetail}, {order.city}, {order.province}, {order.zipCode}</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <p className="font-medium text-gray-900 mb-4">Detail Produk</p>
                    <div className="space-y-4">
                        {order.items.length > 0 && (
                            <div className="relative">
                                <div className="flex gap-4">
                                    <Image
                                        src={order.items[0].thumbnail}
                                        alt={order.items[0].name}
                                        width={120}
                                        height={120}
                                        className="rounded-lg object-cover"
                                    />
                                    <div className="text-sm space-y-1 text-gray-600">
                                        <p className="font-medium text-gray-900">{order.items[0].name}</p>
                                        <p>Jumlah: {order.items[0].quantity}</p>
                                        <p>Harga: Rp {order.items[0].price.toLocaleString()}</p>
                                    </div>
                                </div>
                                {order.items.length > 1 && (
                                    <button
                                        onClick={() => onViewAllProducts(order.items)}
                                        className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                                    >
                                        Lihat Semua ({order.items.length - 1} produk lainnya)
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <p className="font-medium text-gray-600">Total Pembayaran</p>
                    <p className="text-xl font-bold text-gray-900">Rp {order.totalAmount.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}