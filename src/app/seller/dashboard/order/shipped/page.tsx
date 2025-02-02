import React from 'react'

import { Metadata } from 'next'

import ShippedContent from "@/components/dashboard/user/order/shipped/ShippedContent"

export const metadata: Metadata = {
    title: 'ALLURE MART | Dikirim Dashboard',
    description: 'Shipped Orders',
}

export default function Shipped() {
    return (
        <ShippedContent />
    )
}
