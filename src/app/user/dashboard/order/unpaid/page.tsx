import React from 'react'

import UnpaidContent from '@/components/dashboard/user/order/unpaid/UnpaidContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ALLURE MART | Order Unpaid',
    description: 'Order Unpaid',
}

export default function Unpaid() {
    return (
        <UnpaidContent />
    )
}

