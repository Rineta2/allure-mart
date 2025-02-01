"use client";

import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import {
    CheckoutFormData,
    CheckoutFormProps,
    OrderData,
    OrderResponse,
} from '@/components/pages/checkout/hooks/schema/Checkout';

import { useAuth } from '@/components/router/auth/AuthContext';

import { useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

// Type guard untuk memvalidasi OrderResponse
function isOrderResponse(response: unknown): response is OrderResponse {
    if (!response || typeof response !== 'object') {
        return false;
    }

    const candidate = response as Record<string, unknown>;

    return (
        typeof candidate.orderId === 'string' &&
        typeof candidate.totalAmount === 'number' &&
        typeof candidate.snapToken === 'string'
    );
}

export default function CheckoutForm({
    user,
    defaultAddress,
    onSubmit,
    cartItems = [],
    totalItems = 0,
    total = 0
}: CheckoutFormProps) {
    const { user: authUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CheckoutFormData>({
        defaultValues: {
            fullName: defaultAddress?.fullName || '',
            phone: defaultAddress?.phone || '',
            email: user?.email || '',
            address: defaultAddress?.streetAddress || '',
            addressDetail: defaultAddress?.details || '',
            city: defaultAddress?.city || '',
            province: defaultAddress?.province || '',
            zipCode: defaultAddress?.postalCode || '',
            district: defaultAddress?.district || '',
            type: defaultAddress?.type || ''
        }
    });

    // Add loading state
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Pre-fill the form when defaultAddress changes
    useEffect(() => {
        if (defaultAddress) {
            setValue('fullName', defaultAddress.fullName);
            setValue('phone', defaultAddress.phone);
            setValue('address', defaultAddress.streetAddress);
            setValue('addressDetail', defaultAddress.details);
            setValue('city', defaultAddress.city);
            setValue('province', defaultAddress.province);
            setValue('zipCode', defaultAddress.postalCode);
            setValue('district', defaultAddress.district);
            setValue('type', defaultAddress.type);
        }
    }, [defaultAddress, setValue]);

    // Redirect jika user belum login
    useEffect(() => {
        if (!authUser) {
            router.push('/auth/login');
            return;
        }
    }, [authUser, router]);

    const handleFormSubmit = async (data: CheckoutFormData) => {
        if (!authUser) {
            alert('Please login to continue with checkout');
            router.push('/auth/login');
            return;
        }

        // Set loading state to true when starting submission
        setIsSubmitting(true);

        if (!defaultAddress) {
            alert('Please fill in your address details first before proceeding to payment.');
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding.');
            return;
        }

        try {
            const orderData: OrderData = {
                ...data,
                userId: authUser.uid,
                items: cartItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalItems,
                totalAmount: total,
                createdAt: new Date(),
            };

            console.log('Submitting order with data:', orderData);

            const response = await onSubmit(orderData);
            console.log('Order response:', response);

            if (!isOrderResponse(response)) {
                throw new Error('Invalid response format from server');
            }

            console.log('Processed order data:', response);

            if (typeof window.snap !== 'undefined') {
                console.log('Initializing Midtrans payment...');

                window.snap.pay(response.snapToken, {
                    onSuccess: async function (result: MidtransResult) {
                        console.log('Full Midtrans success response:', result);
                        try {
                            const updateResponse = await fetch('/api/update-transaction-status', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    orderId: response.orderId,
                                    transactionStatus: 'success',
                                    transactionId: result.transaction_id,
                                    paymentType: result.payment_type,
                                    transactionTime: result.transaction_time
                                })
                            });

                            if (!updateResponse.ok) {
                                const errorData = await updateResponse.json();
                                console.error('Failed to update transaction status:', errorData);
                                throw new Error(`Failed to update status: ${errorData.message}`);
                            }

                            const updateResult = await updateResponse.json();
                            console.log('Transaction status updated successfully:', updateResult);

                            // Tambahkan delay kecil untuk memastikan database terupdate
                            await new Promise(resolve => setTimeout(resolve, 1000));

                            // Redirect ke halaman success
                            router.push(`/order/success/${response.orderId}`);
                        } catch (error) {
                            console.error('Error updating transaction status:', error);
                            if (error instanceof Error) {
                                console.error('Error details:', error.message);
                            }
                            router.push(`/order/success/${response.orderId}`);
                        }
                    },
                    onPending: function (result: MidtransResult) {
                        console.log('Payment pending:', result);
                        router.push(`/order/pending/${response.orderId}`);
                    },
                    onError: function (result: MidtransResult) {
                        console.log('Payment error:', result);
                        toast.error('Payment failed. Please try again.');
                    },
                    onClose: function () {
                        console.log('Customer closed the popup without finishing the payment');
                        toast.error('Payment cancelled. Please try again if you wish to continue.');
                    }
                });
            } else {
                throw new Error('Midtrans Snap is not initialized');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            if (error instanceof Error) {
                alert(`Terjadi kesalahan dalam memproses pembayaran: ${error.message}`);
            } else {
                alert('Terjadi kesalahan dalam memproses pembayaran. Silakan coba lagi nanti.');
            }
        } finally {
            // Reset loading state when done
            setIsSubmitting(false);
        }
    };

    // Update the redirect URL construction
    const handleRedirect = () => {
        if (user?.role) {
            window.location.href = `/${user.role}/dashboard/profile/address`;
        }
    };

    if (!defaultAddress) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
                <div className="text-center py-12">
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">No Address Found</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        We noticed you haven&apos;t added a delivery address yet. Please add your address details to continue with checkout.
                    </p>
                    <button
                        onClick={handleRedirect}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/30"
                    >
                        <svg
                            className="mr-2 -ml-1 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Add New Address
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
            <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                        {...register('fullName')}
                        readOnly
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Contact Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            {...register('email')}
                            readOnly
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            {...register('phone')}
                            readOnly
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                {/* Location Fields */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            {...register('address')}
                            readOnly
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Detail Address</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            {...register('addressDetail')}
                            readOnly
                        />
                        {errors.addressDetail && (
                            <p className="text-red-500 text-sm mt-1">{errors.addressDetail.message}</p>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                                {...register('city')}
                                readOnly
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Province</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                                {...register('province')}
                                readOnly
                            />
                            {errors.province && (
                                <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                                {...register('zipCode')}
                                readOnly
                            />
                            {errors.zipCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            {defaultAddress?.district && (
                                <div className="w-full h-[200px] rounded-xl overflow-hidden">
                                    <iframe
                                        title="Location Map"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=106.62206172943115%2C-6.576112400000001%2C106.64206172943115%2C-6.572112400000001&layer=mapnik&marker=${defaultAddress.district}`}
                                        allowFullScreen
                                    />
                                </div>
                            )}
                            <input
                                type="hidden"
                                {...register('district')}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Address Type</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            {...register('type')}
                            readOnly
                        />
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                        )}
                    </div>
                </div>

                {/* Add this before the submit button */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                    <textarea
                        className="w-full p-3 border border-border/40 rounded-xl resize-none"
                        rows={4}
                        placeholder="Add any special notes or requests..."
                        {...register('message')}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium text-lg shadow-lg shadow-primary/30 disabled:bg-primary/70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Proceed to Payment'
                    )}
                </button>
            </form>
        </div>
    );
}