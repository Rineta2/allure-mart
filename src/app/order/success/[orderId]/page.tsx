import type { Metadata } from 'next';

import OrderSuccessClient from './OrderSuccessClient';

import { db } from "@/utils/firebase";

import { collection, query, where, getDocs } from "firebase/firestore";

type Props = {
    params: Promise<{ orderId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params;
    const orderId = resolvedParams.orderId;

    try {
        const ordersRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string);
        const q = query(ordersRef, where("orderId", "==", orderId));
        const querySnapshot = await getDocs(q);
        const orderData = querySnapshot.docs[0]?.data();

        return {
            title: `Order #${orderId} - Allune Mart`,
            description: `Order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
            openGraph: {
                title: `Order #${orderId} - Allune Mart`,
                description: `Order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
                type: 'website',
                siteName: 'Allune Mart',
            },
            twitter: {
                card: 'summary_large_image',
                title: `Order #${orderId} - Allune Mart`,
                description: `Order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
            },
        };
    } catch {
        return {
            title: 'Order Details - Allune Mart',
            description: 'View your order details on Allune Mart',
        };
    }
}

export default async function OrderSuccessPage({ params }: Props) {
    const resolvedParams = await params;
    return <OrderSuccessClient orderId={resolvedParams.orderId} />;
} 