"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/router/auth/AuthContext";
import Image from 'next/image';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface OrderDetails {
    orderId: string;
    orderStatus: string;
    transactionStatus: string;
    totalAmount: number;
    items: OrderItem[];
    createdAt: Date | null;
    fullName: string;
    email: string;
    phone: string;
    paymentMethod?: string;
}

export default function OrderSuccessClient({ orderId }: { orderId: string }) {
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!user) {
                router.push('/auth/login');
                return;
            }

            try {
                const ordersRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string);
                const q = query(ordersRef, where("orderId", "==", orderId));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError("Order not found");
                    setLoading(false);
                    return;
                }

                const orderData = querySnapshot.docs[0].data() as OrderDetails;
                setOrder(orderData);

                // Check transaction status and redirect accordingly
                if (orderData.transactionStatus === "confirmed") {
                    // Redirect to success page
                    router.push('/order/success/' + orderId);
                }
            } catch (err) {
                setError("Failed to fetch order details");
                console.error("Error fetching order:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, router, user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <section className="min-h-screen bg-gray-50/50 py-8 px-4 sm:py-12 relative overflow-hidden">
            {/* Modern Line Pattern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50"></div>

            {/* Diagonal Lines */}
            <div className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        #4F46E5 0px,
                        #4F46E5 1px,
                        transparent 1px,
                        transparent 30px
                    )`
                }}
            ></div>

            {/* Vertical Lines */}
            <div className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        90deg,
                        #4F46E5 0px,
                        #4F46E5 1px,
                        transparent 1px,
                        transparent 30px
                    )`
                }}
            ></div>

            {/* Blur effect around the modal */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/30 blur-3xl rounded-full"></div>

            <div className="container max-w-4xl mx-auto relative z-10">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/70 overflow-hidden">
                    <div className="grid lg:grid-cols-2 min-h-[600px]">
                        {/* Left Side - Order Summary */}
                        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 sm:p-8 text-white relative overflow-hidden">
                            {/* Modern gradient overlay */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_60%)] mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%)] bg-[length:15px_15px]"></div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                                <p className="text-blue-300 text-sm mb-8">Order ID: #{order.orderId}</p>

                                {/* Items List */}
                                <div className="space-y-4 mb-8">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.thumbnail}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium truncate">{item.name}</h3>
                                                    <p className="text-blue-300 text-sm">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold whitespace-nowrap">
                                                    Rp {item.price.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-300">Total Amount</span>
                                            <span className="text-xl font-bold">
                                                Rp {order.totalAmount.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="border-t border-white/20 pt-6 space-y-4">
                                    <h3 className="text-lg font-semibold">Customer Details</h3>
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-2">
                                        <p className="font-medium">{order.fullName}</p>
                                        <p className="text-blue-300">{order.email}</p>
                                        <p className="text-blue-300">{order.phone}</p>
                                    </div>
                                </div>

                                {/* Support Button */}
                                <button className="w-full mt-6 py-3 px-4 bg-white/15 hover:bg-white/25 rounded-xl transition-all duration-300 backdrop-blur-md text-sm">
                                    Need help with your order? Contact Support
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Success Message */}
                        <div className="p-6 sm:p-8 flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-50 to-gray-100">
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.05)_0%,transparent_60%)]"></div>
                            </div>

                            <div className="relative text-center">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                                <p className="text-gray-600 mb-8">
                                    Thank you for your purchase. Your order has been successfully processed.
                                </p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25"
                                >
                                    Return to Homepage
                                </button>

                                {/* Footer */}
                                <div className="p-6 flex flex-col sm:flex-row justify-center items-center text-gray-400 text-sm gap-2">
                                    <p>© 2025 SPACE DIGITALIA</p>
                                    <span className="hidden sm:inline">•</span>
                                    <p>ALL RIGHTS RESERVED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 