import React from 'react'

import CategoryContent from "@/components/pages/super-admins/products/category/CategoryContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Kategori Produk',
        description: 'Daftar semua kategori produk yang sudah terdaftar',
    }
}

export default function CategoryDashboard() {
    return (
        <CategoryContent />
    )
}

