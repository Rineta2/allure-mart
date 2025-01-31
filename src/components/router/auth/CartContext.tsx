"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

import { ProductData } from '@/utils/section/products/schema/schema';

import { database, auth } from '@/utils/firebase';

import { ref, set, onValue, remove } from 'firebase/database';

import { onAuthStateChanged } from 'firebase/auth';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

// Define simplified cart item structure
interface CartItem {
    id: string;
    title: string;
    name: string;
    stock: number;
    thumbnail: string;
    category: { name: string };
    gender: { name: string };
    merek: { name: string };
    price: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: ProductData, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to transform product data for cart
const transformProductForCart = (product: ProductData): Omit<CartItem, 'quantity'> => {
    return {
        id: product.id,
        title: product.title,
        name: product.name,
        stock: product.stock,
        thumbnail: product.thumbnail,
        category: { name: product.category.name },
        gender: { name: product.gender.name },
        merek: { name: product.merek.name },
        price: product.price
    };
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                setCartItems([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Subscribe to cart changes in Firebase
    useEffect(() => {
        if (!userId) return;

        const cartRef = ref(database, `${process.env.NEXT_PUBLIC_DATABASE_CART}/${userId}`);
        const unsubscribe = onValue(cartRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCartItems(Object.values(data));
            } else {
                setCartItems([]);
            }
        });

        return () => unsubscribe();
    }, [userId]);

    const saveCartToFirebase = async (newCartItems: CartItem[]) => {
        if (!userId) return;

        const cartRef = ref(database, `${process.env.NEXT_PUBLIC_DATABASE_CART}/${userId}`);
        if (newCartItems.length === 0) {
            await remove(cartRef);
        } else {
            const cartObject = Object.fromEntries(
                newCartItems.map(item => [item.id, item])
            );
            await set(cartRef, cartObject);
        }
    };

    const addToCart = async (product: ProductData, quantity: number = 1) => {
        if (!userId) {
            toast.error('Harap Login Terlebih Dahulu', {
                duration: 2000,
                position: 'top-center',
                icon: '🔒',
            });
            router.push('/auth/login');
            return;
        }

        const newCartItems = [...cartItems];
        const existingItemIndex = newCartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            newCartItems[existingItemIndex] = {
                ...newCartItems[existingItemIndex],
                quantity: newCartItems[existingItemIndex].quantity + quantity
            };
            toast.success('Item quantity berhasil diupdate!', {
                duration: 2000,
                position: 'top-center',
                icon: '🛒',
            });
        } else {
            const cartItem: CartItem = {
                ...transformProductForCart(product),
                quantity: quantity
            };
            newCartItems.push(cartItem);
            toast.success('Item berhasil ditambahkan ke keranjang!', {
                duration: 2000,
                position: 'top-center',
                icon: '🛍️',
            });
        }

        setCartItems(newCartItems);
        await saveCartToFirebase(newCartItems);
    };

    const removeFromCart = async (productId: string) => {
        if (!userId) return;

        const newCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(newCartItems);
        await saveCartToFirebase(newCartItems);
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!userId || quantity < 1) return;

        const newCartItems = cartItems.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.min(quantity, item.stock) }
                : item
        );

        setCartItems(newCartItems);
        await saveCartToFirebase(newCartItems);
    };

    const clearCart = async () => {
        if (!userId) return;

        setCartItems([]);
        await saveCartToFirebase([]);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart harus digunakan dalam CartProvider');
    }
    return context;
}