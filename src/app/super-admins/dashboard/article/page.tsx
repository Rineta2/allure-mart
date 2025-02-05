import React from 'react'

import ArticleContent from "@/components/dashboard/super-admins/article/ArticleContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Article Dashboard',
        description: 'Daftar Article',
    }
}

export default function Article() {
    return (
        <ArticleContent />
    )
}

