"use client"

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useCart } from '@/components/router/auth/CartContext'

import { useAuth } from '@/components/router/auth/AuthContext'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs } from 'firebase/firestore'

import toast from 'react-hot-toast';

import HeroCheckout from '@/components/pages/checkout/HeroCheckout'

import CheckoutSkelaton from '@/components/pages/checkout/CheckoutSkelaton'

import CheckoutForm from '@/components/pages/checkout/hooks/CheckoutForm'

import OrderSummary from '@/components/pages/checkout/hooks/OrderSummary'

import FeaturesSection from '@/components/pages/checkout/hooks/FeaturesSection'

import type { DefaultAddress, OrderData, OrderResponse } from '@/components/pages/checkout/hooks/schema/Checkout'

export default function CheckoutContent() {
    const { cartItems, totalItems } = useCart();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [defaultAddress, setDefaultAddress] = useState<DefaultAddress | null>(null);
    const router = useRouter();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    React.useEffect(() => {
        if (!user) {
            localStorage.setItem('redirectAfterLogin', '/checkout');
            setIsLoading(false); // Set loading false jika tidak ada user
            return;
        }

        const fetchDefaultAddress = async () => {
            try {
                const accountsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string);
                const q = query(accountsRef, where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const accountDoc = querySnapshot.docs[0];
                    const addresses = accountDoc.data().addresses || [];
                    const defaultAddr = addresses.find((addr: DefaultAddress) => addr.isDefault === true);
                    if (defaultAddr) {
                        setDefaultAddress({
                            city: defaultAddr.city,
                            details: defaultAddr.details,
                            district: defaultAddr.district,
                            fullName: defaultAddr.fullName,
                            id: defaultAddr.id,
                            isDefault: defaultAddr.isDefault,
                            phone: defaultAddr.phone,
                            postalCode: defaultAddr.postalCode,
                            province: defaultAddr.province,
                            streetAddress: defaultAddr.streetAddress,
                            type: defaultAddr.type
                        });
                    }
                }
            } catch {
                setIsLoading(false);
            }
        };

        fetchDefaultAddress();
    }, [user]);

    // Tampilkan loading state hanya jika user ada dan data sedang diambil
    if (isLoading && user) {
        return <CheckoutSkelaton />;
    }

    // Update bagian validasi sebelum render
    if (!user) {
        return (
            <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden'>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                </div>

                <div className="container max-w-7xl mx-auto relative">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>

                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    Login Required
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Please sign in to your account to continue with the checkout process and complete your purchase.
                                </p>
                                <button
                                    onClick={() => router.push('/auth/login')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login to Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const handleSubmit = async (data: OrderData): Promise<OrderResponse> => {
        if (!cartItems || cartItems.length === 0) {
            toast.error("Cart is empty");
            throw new Error("Cart is empty");
        }

        try {
            console.log('Creating order with data:', data);

            // First create the order
            const orderResponse = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    items: cartItems.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        name: item.name,
                        thumbnail: item.thumbnail
                    })),
                    totalItems,
                    totalAmount: total
                })
            });

            console.log('Order response status:', orderResponse.status);

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json().catch(() => ({}));
                console.error('Order creation failed:', errorData);
                throw new Error(`Failed to create order: ${errorData.message || orderResponse.statusText}`);
            }

            const orderData = await orderResponse.json();
            console.log('Order created successfully:', orderData);

            // Then create the transaction with Midtrans
            const transactionResponse = await fetch('/api/create-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderData.orderId,
                    amount: total,
                    firstName: data.fullName.split(' ')[0],
                    lastName: data.fullName.split(' ').slice(1).join(' '),
                    email: data.email,
                    phoneNumber: data.phone,
                    items: cartItems.map(item => ({
                        id: item.id,
                        price: item.price,
                        quantity: item.quantity,
                        name: item.name
                    }))
                })
            });

            console.log('Transaction response status:', transactionResponse.status);

            if (!transactionResponse.ok) {
                const errorData = await transactionResponse.json().catch(() => ({}));
                console.error('Transaction creation failed:', errorData);
                throw new Error(`Failed to create transaction: ${errorData.message || transactionResponse.statusText}`);
            }

            const transactionData = await transactionResponse.json();
            console.log('Transaction created successfully:', transactionData);

            return {
                orderId: orderData.orderId,
                totalAmount: total,
                snapToken: transactionData.token
            };
        } catch (error) {
            console.error("Error processing order:", error);
            if (error instanceof Error) {
                toast.error(`Failed to process payment: ${error.message}`);
            } else {
                toast.error("An unexpected error occurred");
            }
            throw error;
        }
    };

    return (
        <>
            <HeroCheckout />
            <section className='px-4 py-12 bg-gray-50'>
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <CheckoutForm
                            user={{
                                id: user.uid,
                                email: user.email || '',
                                role: user.role || 'user'
                            }}
                            defaultAddress={defaultAddress!}
                            onSubmit={handleSubmit}
                            cartItems={cartItems}
                            totalItems={totalItems}
                            total={total}
                        />
                        <OrderSummary
                            cartItems={cartItems}
                            totalItems={totalItems}
                            total={total}
                        />
                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>
    );
}
