import { Order } from '@/components/dashboard/seller/order/order/utils/getOrders'

import { OrderStatus, getStatusColor } from '@/components/dashboard/seller/order/order/hooks/lib'

import Image from 'next/image'

import { MobileOrderViewProps } from '@/components/dashboard/seller/order/order/hooks/lib/schema'

export const MobileOrderView = ({ orders, handleStatusChange, setSelectedOrder }: MobileOrderViewProps) => {
    const renderMobileStatus = (order: Order) => (
        <div className='flex flex-col gap-3 items-end w-fit'>
            <label className='text-sm text-gray-500'>Order Status</label>
            <div className="flex flex-col items-end">
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
    );

    return (
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

                            {renderMobileStatus(order)}
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
                                        <div className='flex flex-col gap-4 items-start'>
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.name}
                                                width={56}
                                                height={56}
                                                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                            />

                                            {order.items.length > 1 && (
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="btn btn-ghost btn-xs text-xs"
                                                >
                                                    +{order.items.length - 1} more items
                                                </button>
                                            )}
                                        </div>

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
    );
};