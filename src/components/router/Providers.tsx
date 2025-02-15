"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/components/router/auth/AuthContext";

import { CartProvider } from "@/components/router/auth/CartContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </CartProvider>
        </QueryClientProvider>
    );
}