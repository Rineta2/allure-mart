"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import { Toaster } from "react-hot-toast";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Check for all dashboard/admin routes
    const isAdminRoute = pathname.includes("/super-admin") ||
        pathname.includes("/seller") ||
        pathname.includes("/users") ||
        pathname.includes("/auth");

    return (
        <main>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#22c55e',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                        },
                    },
                }}
            />
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <Footer />}
        </main>
    );
};

export default Pathname;