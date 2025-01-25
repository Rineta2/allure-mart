import React from 'react';

import { useAuth } from '@/components/router/auth/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from "@/components/layout/Header/super-admins/data/Header"

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        if (onSidebarToggle) {
            onSidebarToggle(false);
        }
        // Also close any open dropdowns
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        // Exact match for root path
        if (href === '/') {
            return pathname === href;
        }
        // Exact match for dashboard
        if (href === '/super-admins/dashboard') {
            return pathname === href;
        }
        // For other routes, check if pathname starts with href but not for root path
        return href !== '/' && pathname.startsWith(href);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <header className="h-full flex flex-col">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-0 right-0 flex justify-end p-4 lg:hidden">
                <button
                    onClick={() => onSidebarToggle?.(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                >
                    <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-3 md:p-4 mt-1 md:mt-2 mb-1 md:mb-2 border-b">
                <div className="flex items-center gap-2 md:gap-3">
                    <Image
                        src={user?.photoURL || '/images/default-profile.png'}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10 md:w-14 md:h-14"
                    />
                    <div>
                        <p className="text-[14px] md:text-[16px] font-medium text-gray-900">{user?.displayName}</p>
                        <p className="text-[11px] md:text-[12px] text-gray-500">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 md:px-4 py-1 md:py-2 overflow-y-auto">
                <ul className="space-y-4 md:space-y-3">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-2 py-2 sm:py-3 px-2 sm:px-3 rounded-lg transition-colors ${isLinkActive(item.href)
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    <span className="text-[12px] sm:text-[14px] font-medium mt-1">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                            ? 'bg-primary text-white hover:bg-primary/90'
                                            : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                                            <span className="text-[12px] md:text-[14px] font-medium mt-1">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-200 ${activeDropdown === index ? 'max-h-40' : 'max-h-0'}`}>
                                        <ul className="mt-0.5 md:mt-1 space-y-0.5 md:space-y-1 px-8 md:px-10">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block py-1.5 md:py-2 text-[12px] md:text-[14px] rounded-md transition-colors ${isLinkActive(subItem.href)
                                                            ? 'text-primary font-medium bg-primary/5'
                                                            : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-2 md:p-4 border-t">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick();
                    }}
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-full p-2 md:p-2.5 rounded-lg text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
                >
                    <FiLogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}