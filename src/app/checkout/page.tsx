import React from 'react'

import CheckoutContent from "@/components/pages/checkout/CheckoutContent"

export async function generateMetadata() {
    return {
        title: 'Checkout | ALLURE MART',
        description: 'Checkout page',
    }
}

export default function Checkout() {
    return (
        <CheckoutContent />
    )
}
