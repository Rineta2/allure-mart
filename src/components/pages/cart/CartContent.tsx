"use client"

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import banner from '@/components/assets/shop/bg.png'

import { IoIosArrowForward } from 'react-icons/io'

import { useCart } from '@/components/router/auth/CartContext'

export default function CartContent() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <div className="relative h-[50vh] sm:h-[60vh]">
                <div className="absolute inset-0">
                    <Image
                        src={banner}
                        alt="banner"
                        className='w-full h-full object-cover brightness-75'
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                        <h3 className='text-4xl md:text-6xl font-bold text-white tracking-tight'>Shopping Cart</h3>
                        <div className="flex items-center gap-3 bg-white/20 px-6 py-2.5 rounded-full backdrop-blur-md">

                            <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                                Home
                            </Link>
                            <IoIosArrowForward className="text-white text-sm" />
                            <span className='text-sm md:text-base text-white/90'>Shopping Cart</span>

                        </div>
                    </div>
                </div>
            </div>

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
        </>

    )
}
