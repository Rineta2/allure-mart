import Image from 'next/image';

import { OrderData } from '@/components/dashboard/user/order/unpaid/hooks/utils/order';

interface OrderDetailsModalProps {
    order: OrderData;
    isOpen: boolean;
    onClose: () => void;
    onContinuePayment: (order: OrderData) => void;
    onCancelOrder: (orderId: string) => void;
}

export const OrderDetailsModal = ({
    order,
    isOpen,
    onClose,
    onContinuePayment,
    onCancelOrder
}: OrderDetailsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-auto shadow-2xl transform transition-all">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Order ID and Status Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-sm text-gray-500">Order ID</h4>
                            <p className="text-lg font-semibold text-gray-800">#{order.orderId}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium inline-block
                            ${order.transactionStatus === 'success' ? 'bg-green-100 text-green-700' :
                                order.transactionStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'}`}>
                            {order.transactionStatus.toUpperCase()}
                        </span>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <h4 className="font-semibold text-gray-800">Customer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-800">{order.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{order.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{order.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <h4 className="font-semibold text-gray-800">Shipping Address</h4>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Address Type</p>
                                <p className="font-medium text-gray-800 capitalize">{order.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Street Address</p>
                                <p className="font-medium text-gray-800">{order.address}</p>
                                {order.addressDetail && (
                                    <p className="text-sm text-gray-600 mt-1">{order.addressDetail}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">City</p>
                                    <p className="font-medium text-gray-800">{order.city}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Province</p>
                                    <p className="font-medium text-gray-800">{order.province}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Postal Code</p>
                                    <p className="font-medium text-gray-800">{order.zipCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Order Items</h4>
                        <div className="space-y-4">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg">
                                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                                        <Image
                                            src={item.thumbnail || '/placeholder-image.jpg'}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-medium text-gray-800 truncate">{item.name}</h5>
                                        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                                            <span>Quantity: {item.quantity}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>Rp {item.price.toLocaleString()} / item</span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <p className="font-medium text-gray-800">
                                            Rp {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <h4 className="font-semibold text-gray-800">Payment Details</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Subtotal</p>
                                <p className="font-medium text-gray-800">
                                    Rp {order.totalAmount?.toLocaleString()}
                                </p>
                            </div>
                            <div className="pt-2 border-t border-gray-200 mt-2">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-800">Total Amount</p>
                                    <p className="font-bold text-blue-600">
                                        Rp {order.totalAmount?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={() => onContinuePayment(order)}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg 
                            font-medium hover:bg-blue-700 transition-colors"
                        >
                            Continue Payment
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                onCancelOrder(order.orderId);
                            }}
                            className="px-6 py-3 border border-gray-300 rounded-lg 
                            font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};