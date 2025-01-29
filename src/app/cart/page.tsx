import React from 'react'

import CartContent from '@/components/pages/cart/CartContent'

export async function generateMetadata() {
    return {
        title: 'Cart | ALLURE MART',
        description: 'Cart | ALLURE MART',
    }
}

export default function Cart() {
    return (
        <CartContent />
    )
}

