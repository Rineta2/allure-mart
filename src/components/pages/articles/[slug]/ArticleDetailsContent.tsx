"use client"

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import ArticleDetailsSkeleton from "@/components/pages/articles/[slug]/ArticleDetailsSkelaton"

import ArticleNotFound from "@/components/pages/articles/[slug]/ArticleNotFound"

import ShareButtons from "@/components/pages/articles/[slug]/ShareButtons"

import { useFetchArticles } from '@/utils/section/article/useFetch'

export default function ArticleDetailsContent({ slug }: { slug: string }) {
    const { articles, loading } = useFetchArticles()

    if (loading) return <ArticleDetailsSkeleton />

    const article = articles.data.find((p) => p.slug === slug)
    if (!article) return <ArticleNotFound />

    const shareUrl = `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`
    const relatedArticles = articles.data
        .filter(a => a.slug !== slug)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

    return (
        <section className="py-2 md:py-10">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Main Content */}
                    <main className="lg:col-span-8 space-y-16">
                        <section className="space-y-16">
                            {/* Article Header */}
                            <header className="space-y-10">
                                <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-indigo-100/80 text-indigo-700 text-sm font-medium transition-all duration-300 hover:bg-indigo-200/80 hover:scale-105 backdrop-blur-sm">
                                    {article.categoryName}
                                </span>

                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                                    {article.title}
                                </h1>

                                {/* Author Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-8 p-8 bg-white rounded-2xl backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Image
                                                src={article.authorPhoto}
                                                alt={article.authorName}
                                                width={56}
                                                height={56}
                                                className="rounded-full object-cover ring-4 ring-white shadow-md"
                                            />
                                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900">{article.authorName}</h3>
                                            <p className="text-sm text-gray-600 capitalize">{article.authorRole}</p>
                                        </div>
                                    </div>

                                    <time className="flex items-center gap-2 text-sm text-gray-600 sm:ml-auto">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </header>

                            {/* Article Content */}
                            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-a:font-medium prose-a:transition-all prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-none prose-blockquote:p-8 md:prose-blockquote:p-10 prose-blockquote:bg-gradient-to-br prose-blockquote:from-white prose-blockquote:to-indigo-50/80 prose-blockquote:rounded-2xl prose-blockquote:shadow-sm hover:prose-blockquote:shadow-md prose-blockquote:transition-all prose-blockquote:duration-300 prose-blockquote:backdrop-blur-sm prose-blockquote:border prose-blockquote:border-indigo-100">
                                <article className="space-y-16">
                                    {/* Split content into parts and render them */}
                                    {article.content.split('<ol>').map((part, partIndex) => (
                                        <React.Fragment key={`content-part-${partIndex}`}>
                                            {partIndex === 0 ? (
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: part }}
                                                    className="text-xl leading-relaxed text-gray-700 flex flex-col gap-6"
                                                />
                                            ) : (
                                                <>
                                                    <ol className="list-decimal list-outside space-y-12 pl-8">
                                                        {part
                                                            .match(/<li[^>]*>(.*?)<\/li>/g)
                                                            ?.map((item, itemIndex) => {
                                                                const content = item
                                                                    .replace(/<\/?li[^>]*>/g, '')
                                                                    .replace(/<span[^>]*>[^<]*<\/span>/g, '')
                                                                    .split('<strong>')

                                                                if (content.length < 2) return null

                                                                const [title, ...description] = content[1].split('</strong>')

                                                                return (
                                                                    <li key={`list-item-${partIndex}-${itemIndex}`} className="pl-2">
                                                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                                                            {title}
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                            {description.join('')}
                                                                        </p>
                                                                    </li>
                                                                )
                                                            })}
                                                    </ol>
                                                    {/* Render content after the ordered list */}
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: part.split('</ol>')[1] || ''
                                                        }}
                                                        className="text-xl leading-relaxed text-gray-700 flex flex-col gap-6"
                                                    />
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </article>
                            </div>

                            {/* Share Section */}
                            <div className="pt-12 border-t border-gray-200">
                                <h4 className="text-2xl font-semibold text-gray-900 mb-8 transition-colors duration-300 hover:text-indigo-600">
                                    Share this article
                                </h4>
                                <ShareButtons shareUrl={shareUrl} shareTitle={article.title} />
                            </div>
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-12">
                            {/* Related Articles */}
                            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 transition-colors duration-300 hover:text-indigo-600">
                                    Related Articles
                                </h2>
                                <div className="space-y-6">
                                    {relatedArticles.map((relatedArticle, index) => (
                                        <Link
                                            key={`related-article-${relatedArticle.slug}-${index}`}
                                            href={`/article/${relatedArticle.slug}`}
                                            className="group flex gap-6 hover:bg-gray-50 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200"
                                        >
                                            <Image
                                                src={relatedArticle.imageUrl}
                                                alt={relatedArticle.title}
                                                width={100}
                                                height={100}
                                                className="w-24 h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-sm text-indigo-600 font-medium mb-2 block group-hover:text-indigo-500 transition-colors">
                                                    {relatedArticle.categoryName}
                                                </span>
                                                <h3 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                    {relatedArticle.title}
                                                </h3>
                                                <time className="text-sm text-gray-500 mt-2 block">
                                                    {new Date(relatedArticle.createdAt).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* Author Card */}
                            <section className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 transition-colors duration-300 hover:text-indigo-600">
                                    About the Author
                                </h2>
                                <div className="flex items-center gap-6">
                                    <Image
                                        src={article.authorPhoto}
                                        alt={article.authorName}
                                        width={60}
                                        height={60}
                                        className="rounded-full ring-4 ring-white shadow-md hover:shadow-lg transition duration-300"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">{article.authorName}</h3>
                                        <p className="text-sm text-gray-600">{article.authorRole}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}
