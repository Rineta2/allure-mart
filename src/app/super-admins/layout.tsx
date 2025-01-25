"use client";

import { useAuth } from "@/components/router/auth/AuthContext";

import { Role } from "@/components/router/auth/schema/auth";

import { Fragment, useEffect, useState } from "react";

import Header from "@/components/layout/Header/super-admins/Header"

export default function SuperAdminsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!user || !hasRole(Role.SUPER_ADMIN)) {
            window.location.href = '/';
            return;
        }
        setIsAuthorized(true);
    }, [hasRole, user]);

    // Jangan render apapun sampai authorization selesai
    if (!isAuthorized) {
        return null;
    }

    return (
        <Fragment>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div
                    className={`
                        fixed inset-0 lg:relative lg:inset-auto
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:translate-x-0 transition-all duration-300 ease-in-out
                        w-72 lg:w-[280px] bg-white shadow-lg z-30
                        border-r border-gray-100
                    `}
                >
                    <Header onSidebarToggle={setIsSidebarOpen} />
                </div>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm lg:hidden z-20 animate-fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 relative w-full lg:w-[calc(100%-280px)]">
                    {/* Top Navigation Bar */}
                    <div className="sticky top-0 z-20 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isSidebarOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-[300px] h-10 px-4 text-sm rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                                <svg
                                    className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative group">
                                <svg
                                    className="w-6 h-6 text-gray-600 group-hover:text-gray-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                                <svg
                                    className="w-6 h-6 text-gray-600 group-hover:text-gray-800"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
} 