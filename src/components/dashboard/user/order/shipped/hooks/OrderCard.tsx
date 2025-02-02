import React from 'react';

import { Order } from '@/utils/section/order/schema/schema';

interface OrderCardProps {
    item: Order['data'][0];
    onViewDetails: (order: Order['data'][0]) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ item, onViewDetails }) => {
    return (
        <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
            hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            Order #{item.orderId}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {new Date(item.transactionTime || '').toLocaleDateString()}
                        </p>
                    </div>
                    <span className="self-start px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100/80 text-blue-700 
                    ring-1 ring-blue-600/20">
                        {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                    </span>
                </div>

                <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-600 flex justify-between">
                        <span className="font-medium">Customer:</span>
                        <span className="text-gray-800">{item.fullName}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex justify-between">
                        <span className="font-medium">Total Items:</span>
                        <span className="text-gray-800">{item.totalItems}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex justify-between">
                        <span className="font-medium">Total Amount:</span>
                        <span className="text-gray-800">Rp {item.totalAmount?.toLocaleString()}</span>
                    </p>
                </div>

                <button
                    onClick={() => onViewDetails(item)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                    rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                    focus:ring-4 focus:ring-blue-500/20 font-medium text-sm
                    active:scale-[0.98] transform"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};