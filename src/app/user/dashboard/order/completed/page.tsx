import React from 'react'

import CompletedContent from '@/components/dashboard/user/order/completed/CompletedContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ALLURE MART | Order Completed',
    description: 'Order Completed',
}

export default function Completed() {
    return (
        <CompletedContent />
    )
}
