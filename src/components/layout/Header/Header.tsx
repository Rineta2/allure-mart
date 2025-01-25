"use client"

import React, { useState, useEffect, useRef } from 'react'

import Image from "next/image"

import profile from "@/components/assets/logo/logo.png"

import Link from "next/link"

import { FaShoppingBag, FaUserCircle } from "react-icons/fa";

import { PiSignIn } from "react-icons/pi";

import { RiMenu5Fill } from "react-icons/ri";

import { navLink } from "@/components/layout/Header/data/Header";

import gsap from "gsap";

import { useAuth } from '@/components/router/auth/AuthContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            // Animasi untuk container menu
            gsap.fromTo(".mobile-menu-container",
                {
                    opacity: 0,
                    y: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );

            // Animasi untuk item menu
            gsap.fromTo(".menu-item",
                {
                    opacity: 0,
                    y: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out"
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

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 w-full py-2 sm:py-3 bg-background/95 backdrop-blur-sm transition-shadow duration-200 ${isScrolled ? 'shadow-lg' : ''
            }`}>
            <nav className='container flex items-center justify-between h-12 sm:h-14 md:h-16 px-4 sm:px-6 lg:px-8'>
                <div className="relative w-24 sm:w-28 md:w-32 lg:w-40">
                    <Image
                        src={profile}
                        alt="profile"
                        width={500}
                        height={500}
                        className='w-full h-auto object-contain'
                        loading="eager"
                        priority
                    />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-4 lg:gap-10">
                    {navLink.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={item.href}
                                className="relative py-2 text-[14px] lg:text-[16px] font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <RiMenu5Fill className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <Link
                        href="/cart"
                        className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200"
                        aria-label="Shopping cart"
                    >
                        <FaShoppingBag className="w-4 h-4 sm:w-6 sm:h-6" />
                    </Link>

                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={toggleProfile}
                                className="focus:outline-none mt-1"
                                aria-label="Toggle profile menu"
                            >
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        width={500}
                                        height={500}
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-200" />
                                )}
                            </button>

                            {/* Dropdown menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-background border border-border/40 rounded-md shadow-lg">
                                    <div className="px-4 py-2 border-b border-border/40">
                                        <p className="text-sm font-medium truncate">{user.displayName}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href={user.role === 'user' ? '/profile' : `/${user.role}/dashboard`}
                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        {user.role === 'user' ? 'Profile' : 'Dashboard'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="p-1.5 sm:p-2 hover:bg-accent rounded-md transition-colors duration-200"
                            aria-label="Login"
                        >
                            <PiSignIn className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu-container md:hidden absolute top-full left-0 right-0 w-full bg-background/95 backdrop-blur-sm border-b border-border/40">
                    <ul className="container py-4 px-4 space-y-3 flex justify-center items-center flex-col gap-4">
                        {navLink.map((item) => (
                            <li
                                key={item.id}
                                className="menu-item w-full text-center"
                            >
                                <Link
                                    href={item.href}
                                    className="block py-2 text-[14px] sm:text-[16px] font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}
