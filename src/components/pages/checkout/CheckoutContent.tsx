"use client"

import React from 'react'

import { useCart } from '@/components/router/auth/CartContext'

import { useAuth } from '@/components/router/auth/AuthContext'

import { db } from '@/utils/firebase'

import { collection, addDoc } from 'firebase/firestore'

import toast from 'react-hot-toast';

import HeroCheckout from '@/components/pages/checkout/HeroCheckout'

import CheckoutSkelaton from '@/components/pages/checkout/CheckoutSkelaton'

import CheckoutForm from '@/components/pages/checkout/hooks/CheckoutForm'

import OrderSummary from '@/components/pages/checkout/hooks/OrderSummary'

import FeaturesSection from '@/components/pages/checkout/hooks/FeaturesSection'

import BankModal from '@/components/pages/checkout/hooks/BankModal'

import { generateOrderId, createOrderMessage, createPaymentMessage } from '@/components/pages/checkout/hooks/schema/CheckoutMessage'

import type { ProvinceOption as ImportedProvinceOption, CheckoutFormData as ImportedCheckoutFormData } from '@/components/pages/checkout/hooks/schema/Checkout'

import { useLocationSearch } from '@/components/pages/checkout/hooks/schema/useLocationSearch'

// Gunakan alias untuk type yang diimport
type ProvinceOption = ImportedProvinceOption;
type CheckoutFormData = ImportedCheckoutFormData;

export default function CheckoutContent() {
    const { cartItems, totalItems } = useCart();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const [showBankModal, setShowBankModal] = React.useState(false);
    const [formData, setFormData] = React.useState<CheckoutFormData | null>(null);

    const [provinceOptions] = React.useState<ProvinceOption[]>([
        { value: 'jawa-barat', label: 'Jawa Barat' },
        { value: 'jawa-tengah', label: 'Jawa Tengah' },
        { value: 'jawa-timur', label: 'Jawa Timur' },
    ]);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const bankAccounts = [
        {
            bankName: "Bank BCA",
            accountNumber: "1234567890",
            accountHolder: "John Doe"
        }
    ];

    // Gunakan custom hook useLocationSearch
    const { locationOptions: locationOptionsFromHook, isSearching: isSearchingFromHook, debouncedSearch } = useLocationSearch();

    // Handler untuk pencarian lokasi
    const handleLocationSearch = (inputValue: string) => {
        debouncedSearch(inputValue);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (data: CheckoutFormData) => {
        try {
            if (data.paymentMethod === 'bank-transfer') {
                setFormData(data);
                setShowBankModal(true);
                return;
            }

            if (cartItems.length === 0) {
                toast.error("Cart is empty");
                return;
            }

            const formattedOrderId = generateOrderId();
            const orderData = {
                orderId: formattedOrderId,
                customerInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email
                },
                shippingAddress: {
                    address: data.address.value,
                    addressDetail: data.addressDetail,
                    city: data.city,
                    province: data.province,
                    zipCode: data.zipCode,
                    additionalInfo: data.additionalInfo || null
                },
                orderDetails: {
                    items: cartItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        thumbnail: item.thumbnail
                    })),
                    totalAmount: total,
                    paymentMethod: data.paymentMethod
                },
                createdAt: new Date(),
                orderDate: new Date(),
                status: 'pending'
            };

            const ordersCollection = collection(db, 'orders');
            const docRef = await addDoc(ordersCollection, orderData);

            console.log('Order created successfully with ID:', docRef.id);

            const message = createOrderMessage(formattedOrderId, data, cartItems, total);
            const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

            if (!phoneNumber) {
                toast.error("WhatsApp number not configured");
                return;
            }

            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            toast.success('Order placed successfully!');

        } catch (error) {
            console.error("Error processing order:", error);
            if (error instanceof Error) {
                toast.error(`Failed to place order: ${error.message}`);
            } else {
                toast.error("An unexpected error occurred while processing your order");
            }
        }
    };

    const handlePaymentConfirmation = async () => {
        setShowBankModal(false);

        try {
            const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

            if (!phoneNumber || !formData) {
                toast.error("Configuration error");
                return;
            }

            const paymentMessage = createPaymentMessage(formData, cartItems, total);

            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(paymentMessage)}`, '_blank');
            toast.success('Payment confirmation sent successfully!');

        } catch {
            toast.error("Failed to process payment confirmation");
        }
    };

    if (isLoading) {
        return <CheckoutSkelaton />;
    }

    return (
        <>
            <HeroCheckout />

            <section className='px-4 py-12 bg-gray-50'>
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <CheckoutForm
                            user={user}
                            locationOptions={locationOptionsFromHook}
                            isSearching={isSearchingFromHook}
                            provinceOptions={provinceOptions}
                            onLocationSearch={handleLocationSearch}
                            onSubmit={handleSubmit}
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

            <BankModal
                show={showBankModal}
                onClose={() => setShowBankModal(false)}
                onConfirm={handlePaymentConfirmation}
                total={total}
                bankAccounts={bankAccounts}
            />
        </>
    )
}
