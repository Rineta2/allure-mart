"use client"

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { useCart } from '@/components/router/auth/CartContext'

import { GiTrophy } from 'react-icons/gi'

import { MdOutlineSecurity, MdOutlineSupportAgent } from 'react-icons/md'

import { CiDeliveryTruck } from "react-icons/ci";

import HeroCart from '@/components/pages/cart/HeroCart'

export default function CartContent() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <HeroCart />

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-grow">
                        {/* Header */}
                        <div className="grid grid-cols-5 bg-[#FDF6F0] p-4 rounded-t-lg font-medium">
                            <div className="col-span-2">Product</div>
                            <div>Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Subtotal</div>
                        </div>

                        {/* Cart Items */}
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-b-lg border">
                                <p className="text-gray-500 text-lg">Your cart is empty</p>
                                <Link href="/shop" className="text-primary hover:underline mt-4 inline-block font-medium">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y bg-white p-4 rounded-b-lg border">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-5 items-center gap-4 py-4">
                                        <div className="col-span-2 flex gap-4">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="rounded-lg object-cover"
                                            />
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-medium text-lg">{item.name}</h4>
                                            </div>
                                        </div>

                                        <div className="text-gray-800">
                                            Rs. {item.price.toLocaleString()}
                                        </div>

                                        <div className="flex justify-center items-center">
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-14 text-center border-x py-2"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-right flex-grow font-medium">
                                                Rs. {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-600 ml-4 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Totals Section */}
                    <div className="w-[50%]">
                        <div className="bg-[#FDF6F0] p-6 rounded-lg border">
                            <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-lg">
                                    <span>Subtotal</span>
                                    <span>Rs. {total.toLocaleString()}</span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#2A2A2A] text-white py-3.5 rounded-lg hover:bg-black transition-all duration-300 font-medium text-lg mt-4">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
