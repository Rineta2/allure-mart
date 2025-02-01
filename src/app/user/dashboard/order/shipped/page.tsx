import React from 'react'

import ShippedContent from '@/components/dashboard/user/order/shipped/ShippedContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ALLURE MART | Order Shipped',
    description: 'Order Shipped',
}

export default function Shipped() {
    return (
        <ShippedContent />
    )
}

