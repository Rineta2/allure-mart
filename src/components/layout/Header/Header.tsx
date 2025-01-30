"use client"

import React, { useState, useEffect, useRef } from 'react'

import Image from "next/image"

import profile from "@/components/assets/logo/logo.png"

import Link from "next/link"

import { FaShoppingBag, FaUserCircle } from "react-icons/fa";

import { PiSignIn } from "react-icons/pi";

import { RiMenu5Fill } from "react-icons/ri";

import { IoClose } from "react-icons/io5";

import { navLink } from "@/components/layout/Header/data/Header";

import gsap from "gsap";

import { useAuth } from '@/components/router/auth/AuthContext';

import { useCart } from '@/components/router/auth/CartContext';

const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user, logout } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const { totalItems, cartItems, removeFromCart, updateQuantity } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(".mobile-menu",
                {
                    opacity: 0,
                    x: "100%"
                },
                {
                    opacity: 1,
                    x: "0%",
                    duration: 0.4,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(".menu-item",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );
        }
    }, [isMenuOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header
            ref={headerRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-background shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav className="container px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="relative w-24 md:w-32 transition-all duration-300">
                        <Image
                            src={profile}
                            alt="logo"
                            width={500}
                            height={500}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </Link>

                    <ul className="hidden md:flex items-center gap-8">
                        {navLink.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className="relative text-[15px] font-medium text-muted-foreground hover:text-primary transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        <div className="relative" ref={cartRef}>
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="p-2 hover:bg-accent rounded-full transition-colors duration-200 relative"
                            >
                                <FaShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            </button>

                            {isCartOpen && (
                                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-background border border-border/40 shadow-lg">
                                    <div className="p-4">
                                        <h3 className="font-medium text-lg mb-3">Shopping Cart</h3>
                                        {cartItems.length === 0 ? (
                                            <div className="text-center text-muted-foreground py-8">
                                                Your cart is empty
                                            </div>
                                        ) : (
                                            <>
                                                <div className="max-h-[300px] overflow-y-auto">
                                                    {cartItems.map((item) => (
                                                        <div key={item.id} className="flex gap-3 py-3 border-b border-border/40">
                                                            <Image
                                                                src={item.thumbnail}
                                                                alt={item.title}
                                                                width={500}
                                                                height={500}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="font-medium">{item.name}</h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    ${item.price.toLocaleString()}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="p-1 hover:bg-accent rounded"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span>{item.quantity}</span>

                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="p-1 hover:bg-accent rounded"
                                                                    >
                                                                        +
                                                                    </button>

                                                                    <button
                                                                        onClick={() => removeFromCart(item.id)}
                                                                        className="ml-auto text-red-500 hover:text-red-600"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-border/40">
                                                    <div className="flex justify-between mb-4">
                                                        <span className="font-medium">Total:</span>
                                                        <span className="font-medium">
                                                            ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Link href="/cart" className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center" onClick={() => {
                                                            setIsCartOpen(false);
                                                        }}>
                                                            Cart
                                                        </Link>

                                                        <Link
                                                            href="/checkout"
                                                            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 grid place-items-center"
                                                            onClick={() => {
                                                                setIsCartOpen(false);
                                                            }}
                                                        >
                                                            Checkout
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>

                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="focus:outline-none"
                                >
                                    {user.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            width={32}
                                            height={32}
                                            className="rounded-full ring-2 ring-background"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                                    )}
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-background border border-border/40 shadow-lg overflow-hidden">
                                        <div className="p-3 border-b border-border/40">
                                            <p className="font-medium truncate">{user.displayName}</p>
                                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href={user.role === 'user' ? '/profile' : `/${user.role}/dashboard`}
                                                className="flex items-center gap-2 w-full p-2 text-sm rounded-lg hover:bg-accent transition-colors duration-200"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                {user.role === 'user' ? 'Profile' : 'Dashboard'}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full p-2 text-sm rounded-lg hover:bg-accent text-red-500 hover:text-red-600 transition-colors duration-200"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="p-2 hover:bg-accent rounded-full transition-colors duration-200"
                            >
                                <PiSignIn className="w-5 h-5" />
                            </Link>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 md:hidden hover:bg-accent rounded-full transition-colors duration-200"
                        >
                            {isMenuOpen ? (
                                <IoClose className="w-6 h-6" />
                            ) : (
                                <RiMenu5Fill className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="mobile-menu fixed left-0 right-0 top-[72px] bg-white w-full md:hidden overflow-y-auto shadow-lg">
                    <nav className="container px-4 py-8">
                        <ul className="space-y-6">
                            {navLink.map((item) => (
                                <li key={item.id} className="menu-item">
                                    <Link
                                        href={item.href}
                                        className="block text-xl font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
