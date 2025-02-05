import React from 'react'

import ProductContent from "@/components/dashboard/super-admins/products/product/ProductContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Product Dashboard',
        description: 'Daftar Produk',
    }
}

export default function ProductDashboard() {
    return (
        <ProductContent />
    )
}

