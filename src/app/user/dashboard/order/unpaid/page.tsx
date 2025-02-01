import React from 'react'

import { Metadata } from 'next'

import UnpaidContent from "@/components/dashboard/user/order/unpaid/UnpaidContent"

export const metadata: Metadata = {
    title: 'ALLURE MART | Belum Dibayar Dashboard',
    description: 'Belum Dibayar',
}

export default function Unpaid() {
    return (
        <UnpaidContent />
    )
}
