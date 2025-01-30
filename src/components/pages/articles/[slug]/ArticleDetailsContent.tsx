import React from 'react'

import { useParams } from 'next/navigation'

import { useFetchArticles } from '@/utils/section/article/useFetch'

import ArticleDetailsSkeleton from '@/components/pages/articles/articleDetailsSkelaton'

export default function ArticleDetailsContent() {
    const params = useParams()

    const { articles, loading } = useFetchArticles()

    if (loading) {
        return <ArticleDetailsSkeleton />
    }

    const article = articles.data.find((article) => article.slug === params.slug)

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Article not found</h1>
            </div>
        )
    }
    return (
        <div>{article.title}</div>
    )
}
