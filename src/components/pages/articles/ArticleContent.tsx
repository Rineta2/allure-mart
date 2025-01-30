"use client"

import React, { useState } from 'react'

import { useFetchArticles } from '@/utils/section/article/useFetch'

import ArticleSkeleton from '@/components/pages/articles/articleSkelaton'

import ArticleHero from '@/components/pages/articles/hook/ArticleHero'

import TopArticles from '@/components/pages/articles/hook/TopArticles'

import ArticleFilters from '@/components/pages/articles/hook/ArticleFilter'

import ArticleGrid from '@/components/pages/articles/hook/ArticleGrid'

export default function ArticleContent() {
    const { articles, loading } = useFetchArticles();

    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('all');

    if (loading) {
        return <ArticleSkeleton />
    }

    const topArticles = articles?.data?.slice(0, 2) || [];
    const remainingArticles = articles?.data?.slice(2) || [];

    const categories = ['all', ...new Set(articles?.data?.map(article => article.categoryName) || [])];

    const filteredRemainingArticles = remainingArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || article.categoryName === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <ArticleHero />
            <section>
                <div className="container">
                    <TopArticles articles={topArticles} />
                    <ArticleFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                    />
                    <ArticleGrid articles={filteredRemainingArticles} />
                </div>
            </section>
        </>
    )
}
