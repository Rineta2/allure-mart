import React from 'react'

import ArticleDetailsContent from '@/components/pages/articles/ArticleContent'

export async function generateMetadata() {
    return {
        title: 'Article | ALLURE MART',
        description: 'Article | ALLURE MART',
    }
}
export default function Article() {
    return (
        <ArticleDetailsContent />
    )
}
