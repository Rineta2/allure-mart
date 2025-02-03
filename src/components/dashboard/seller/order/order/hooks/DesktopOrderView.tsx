import { Order } from '@/components/dashboard/seller/order/order/utils/getOrders'

import { OrderStatus } from '@/components/dashboard/seller/order/order/hooks/lib'

import Image from 'next/image'

import { DesktopOrderViewProps } from '@/components/dashboard/seller/order/order/hooks/lib/schema'

export const DesktopOrderView = ({ orders, handleStatusChange, setSelectedOrder }: DesktopOrderViewProps) => {
    const successOrders = orders.filter(order => order.transactionStatus === 'success');

    const renderStatusCell = (order: Order) => (
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
    );

    return (
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="table">
                <thead>
                    <tr>
                        <th>Account & Order Details</th>
                        <th>Customer Information</th>
                        <th>Items & Total</th>
                        <th>Status Pembayaran</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {successOrders.map((order) => (
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
                                <div className='flex flex-col gap-3 items-end w-fit'>
                                    <span className={`px-2.5 py-1 w-fit text-xs rounded-full font-medium ${order.transactionStatus === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.transactionStatus}
                                    </span>
                                </div>
                            </td>
                            {renderStatusCell(order)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};