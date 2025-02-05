import React from 'react'

import CategoryContent from "@/components/dashboard/super-admins/article/category/CategoryContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Kategori Artikel',
        description: 'Daftar semua kategori artikel yang sudah terdaftar',
    }
}

export default function CategoryArticle() {
    return (
        <CategoryContent />
    )
}

