import React from 'react'

import CanceledContent from '@/components/dashboard/user/order/canceled/CanceledContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ALLURE MART | Canceled Dashboard',
    description: 'Canceled Orders',
}

export default function CanceledDashboard() {
    return (
        <CanceledContent />
    )
}
