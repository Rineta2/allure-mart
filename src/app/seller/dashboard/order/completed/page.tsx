import React from 'react'

import ComplatedContent from '@/components/dashboard/seller/order/complate/ComplatedContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ALLURE MART | Selesai Dashboard',
    description: 'Completed Orders',
}

export default function Completed() {
    return (
        <ComplatedContent />
    )
}
