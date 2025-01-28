import React from 'react'

import ShopContent from '@/components/pages/shop/ShopContent'

export async function generateMetadata() {
    return {
        title: 'Shop | ALLURE MART',
        description: 'Shop | ALLURE MART',
    }
}

export default function Shop() {
    return (
        <ShopContent />
    )
}
