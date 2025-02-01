"use client";

import React from 'react';

import { OrderStatus } from '@/components/pages/checkout/hooks/schema/order';

interface OrderStatusUpdateProps {
    orderId: string;
    currentStatus: OrderStatus;
}

export default function OrderStatusUpdate({ orderId, currentStatus }: OrderStatusUpdateProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [trackingNumber, setTrackingNumber] = React.useState('');
    const [courier, setCourier] = React.useState('');

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        try {
            setIsLoading(true);

            const updateData: {
                orderId: string;
                orderStatus: OrderStatus;
                trackingNumber?: string;
                courier?: string;
            } = {
                orderId,
                orderStatus: newStatus,
            };

            // Jika status berubah menjadi shipped, tambahkan informasi pengiriman
            if (newStatus === 'shipped') {
                if (!trackingNumber || !courier) {
                    alert('Please enter tracking number and courier information');
                    return;
                }
                updateData.trackingNumber = trackingNumber;
                updateData.courier = courier;
            }

            const response = await fetch('/api/seller/update-order-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            // Refresh halaman atau update state sesuai kebutuhan
            window.location.reload();
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <select
                    className="p-2 border rounded-lg"
                    value={currentStatus}
                    onChange={(e) => handleStatusUpdate(e.target.value as OrderStatus)}
                    disabled={isLoading}
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="packaging">Packaging</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Form pengiriman muncul jika status saat ini adalah processing atau packaging */}
            {(currentStatus === 'processing' || currentStatus === 'packaging') && (
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Tracking Number"
                        className="w-full p-2 border rounded-lg"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Courier"
                        className="w-full p-2 border rounded-lg"
                        value={courier}
                        onChange={(e) => setCourier(e.target.value)}
                    />
                </div>
            )}

            {isLoading && <p>Updating status...</p>}
        </div>
    );
} 