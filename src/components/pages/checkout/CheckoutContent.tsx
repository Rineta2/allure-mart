"use client"

import React from 'react'

import { useCart } from '@/components/router/auth/CartContext'

import Image from 'next/image'

import Link from "next/link"

import banner from '@/components/assets/shop/bg.png'

import { IoIosArrowForward } from 'react-icons/io'

import { GiTrophy } from 'react-icons/gi'

import { MdOutlineSecurity, MdOutlineSupportAgent } from 'react-icons/md'

import { CiDeliveryTruck } from 'react-icons/ci'

import { db } from '@/utils/firebase'
import { collection, addDoc, updateDoc } from 'firebase/firestore'

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

// Define Zod schema
const checkoutSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    company: z.string().optional(),
    country: z.string(),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    province: z.string(),
    zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
    email: z.string().email('Invalid email address'),
    additionalInfo: z.string().optional(),
    paymentMethod: z.enum(['bank-transfer', 'cod'])
});

// Type inference
type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutContent() {
    const { cartItems, totalItems } = useCart();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            country: 'sri-lanka',
            province: 'western',
            paymentMethod: 'bank-transfer'
        }
    });

    const onSubmit = async (data: CheckoutFormData) => {
        try {
            const docRef = await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string), {});

            // Format order ID with padding zeros
            const formattedOrderId = `ORD${docRef.id.slice(-6).padStart(6, '0')}`;

            // Menyimpan data transaksi ke Firebase dengan orderId
            const orderData = {
                orderId: formattedOrderId,
                ...data,
                items: cartItems,
                totalAmount: total,
                orderDate: new Date(),
                status: 'pending'
            };

            // Update document dengan semua data termasuk orderId
            await updateDoc(docRef, orderData);

            // Membuat pesan WhatsApp
            const message = `*New Order ${formattedOrderId}*\n\n` +
                `*Customer Details:*\n` +
                `Name: ${data.firstName} ${data.lastName}\n` +
                `Phone: ${data.phone}\n` +
                `Email: ${data.email}\n\n` +
                `*Order Summary:*\n` +
                cartItems.map(item => `- ${item.name} (${item.quantity}x) : $${(item.price * item.quantity).toLocaleString()}`).join('\n') +
                `\n\nTotal Amount: $${total.toLocaleString()}`;

            // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
            const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE as string; // Format: country code tanpa +

            // Reset form
            reset();

            // Redirect ke WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

        } catch (error) {
            console.error("Error processing order:", error);
            alert("Terjadi kesalahan saat memproses pesanan");
        }
    };

    return (
        <>
            <div className="relative h-[40vh] lg:h-[50vh]">
                <div className="absolute inset-0">
                    <Image
                        src={banner}
                        alt="banner"
                        className='w-full h-full object-cover brightness-50'
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                        <h3 className='text-4xl md:text-6xl font-bold text-white tracking-tight'>Checkout</h3>
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90'>Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className='px-4 py-12 bg-gray-50'>
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Billing Details Form */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
                            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-border/40'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
                                            placeholder="John"
                                            {...register('firstName')}
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-border/40'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200`}
                                            placeholder="Doe"
                                            {...register('lastName')}
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-border/40 rounded-xl"
                                        {...register('company')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <select
                                        className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('country')}
                                    >
                                        <option value="sri-lanka">Sri Lanka</option>
                                    </select>
                                    {errors.country && (
                                        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('address')}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Town / City</label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('city')}
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Province</label>
                                    <select
                                        className={`w-full p-3 border ${errors.province ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('province')}
                                    >
                                        <option value="western">Western Province</option>
                                    </select>
                                    {errors.province && (
                                        <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border ${errors.zipCode ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('zipCode')}
                                    />
                                    {errors.zipCode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('phone')}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-border/40'} rounded-xl`}
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                                    <textarea
                                        className="w-full p-3 border border-border/40 rounded-xl"
                                        rows={3}
                                        {...register('additionalInfo')}
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="font-medium text-lg">Payment Method</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                value="bank-transfer"
                                                className="w-4 h-4 text-primary"
                                                {...register('paymentMethod')}
                                            />
                                            <div>
                                                <span className="font-medium">Direct Bank Transfer</span>
                                                <p className="text-sm text-gray-500 mt-1">Make your payment directly into our bank account.</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                value="cod"
                                                className="w-4 h-4 text-primary"
                                                {...register('paymentMethod')}
                                            />
                                            <div>
                                                <span className="font-medium">Cash On Delivery</span>
                                                <p className="text-sm text-gray-500 mt-1">Pay with cash upon delivery.</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium text-lg shadow-lg shadow-primary/30"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm lg:sticky lg:top-20 h-fit">
                            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b border-border/40 group">
                                        <div className="relative overflow-hidden rounded-xl">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                width={100}
                                                height={100}
                                                className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-lg font-semibold mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span>${total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-xl pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='relative py-16 bg-primary'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {/* High Quality */}
                        <div className='flex items-center gap-4 p-4'>
                            <GiTrophy className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>High Quality</h3>
                                <p className='text-white/80 text-sm'>crafted from top materials</p>
                            </div>
                        </div>

                        {/* Warranty Protection */}
                        <div className='flex items-center gap-4 p-4'>
                            <MdOutlineSecurity className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>Warranty Protection</h3>
                                <p className='text-white/80 text-sm'>Over 2 years</p>
                            </div>
                        </div>

                        {/* Free Shipping */}
                        <div className='flex items-center gap-4 p-4'>
                            <CiDeliveryTruck className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>Free Shipping</h3>
                                <p className='text-white/80 text-sm'>Order over 150 $</p>
                            </div>
                        </div>

                        {/* 24/7 Support */}
                        <div className='flex items-center gap-4 p-4'>
                            <MdOutlineSupportAgent className='text-white w-12 h-12 flex-shrink-0' />
                            <div className='flex flex-col'>
                                <h3 className='text-white text-xl lg:text-2xl font-bold'>24 / 7 Support</h3>
                                <p className='text-white/80 text-sm'>Dedicated support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
