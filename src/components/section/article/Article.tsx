"use client"

import React, { useState } from 'react'

import { useFetchArticles } from '@/utils/section/article/useFetch';

import ArticleSkeleton from '@/components/section/article/ArticleSkelaton';

import Image from 'next/image';

import Link from 'next/link';

export default function Article() {
    const { articles, loading } = useFetchArticles();

    const [selectedCategory, setSelectedCategory] = useState('all');

    const [showAll, setShowAll] = useState(false);

    const ARTICLES_PER_PAGE = 7;

    if (loading) {
        return <ArticleSkeleton />
    }

    const sortedArticles = [...articles.data].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const categories = ['all', ...new Set(sortedArticles.map(article => article.categoryName))];

    // Filter articles based on category only
    const filteredArticles = sortedArticles.filter(article => {
        return selectedCategory === 'all' || article.categoryName === selectedCategory;
    });

    const featuredArticle = filteredArticles[0];

    const regularArticles = filteredArticles.slice(1);

    const displayedArticles = showAll ? regularArticles : regularArticles.slice(0, ARTICLES_PER_PAGE - 1);

    const hasMoreArticles = regularArticles.length > ARTICLES_PER_PAGE - 1;

    return (
        <section>
            <div className="container">
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12 text-gray-600 bg-white rounded-xl shadow-sm">
                        No articles found matching your criteria.
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16 transition-transform hover:scale-[1.02] duration-300">
                            <Link href={`/article/${featuredArticle.slug}`} className="grid md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Image
                                        src={featuredArticle.imageUrl}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover"
                                        width={800}
                                        height={800}
                                    />
                                </div>

                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                        {featuredArticle.categoryName}
                                    </span>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-6">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        {featuredArticle.description}
                                    </p>
                                    <div className="flex items-center mt-auto border-t pt-6">
                                        <Image
                                            src={featuredArticle.authorPhoto}
                                            alt={featuredArticle.authorName}
                                            width={500}
                                            height={500}
                                            className="w-14 h-14 rounded-full ring-2 ring-gray-100"
                                        />
                                        <div className="ml-4">
                                            <p className="text-base font-semibold text-gray-900">
                                                {featuredArticle.authorName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(featuredArticle.createdAt).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>

                        {/* Category Filter Controls */}
                        <div className="mb-12">
                            <div className="flex flex-wrap gap-3 w-full">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-105'
                                            : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm hover:shadow'
                                            }`}
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Regular Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedArticles.map((article) => (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                    <div className="p-6 lg:p-8">
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                            {article.categoryName}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 mt-4 mb-3 line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center pt-4 border-t">
                                            <Image
                                                src={article.authorPhoto}
                                                alt={article.authorName}
                                                width={500}
                                                height={500}
                                                className="w-10 h-10 rounded-full ring-2 ring-gray-100"
                                            />
                                            <div className="ml-3">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {article.authorName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* View More Button */}
                        {hasMoreArticles && !showAll && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
                                >
                                    View More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
