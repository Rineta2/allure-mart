import type { Metadata } from 'next';

import OrderPendingClient from '@/app/order/pending/[orderId]/OrderPendingClient';

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
            title: `Pending Order #${orderId} - Allune Mart`,
            description: `Pending order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
            openGraph: {
                title: `Pending Order #${orderId} - Allune Mart`,
                description: `Pending order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
                type: 'website',
                siteName: 'Allune Mart',
            },
            twitter: {
                card: 'summary_large_image',
                title: `Pending Order #${orderId} - Allune Mart`,
                description: `Pending order details for ${orderData?.fullName || 'customer'} - Order #${orderId}`,
            },
        };
    } catch {
        return {
            title: 'Pending Order - Allune Mart',
            description: 'View your pending order details on Allune Mart',
        };
    }
}

export default async function OrderPendingPage({ params }: Props) {
    const resolvedParams = await params;
    return <OrderPendingClient orderId={resolvedParams.orderId} />;
} 