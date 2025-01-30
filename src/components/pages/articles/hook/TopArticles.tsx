import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { TopArticlesProps } from '@/components/pages/articles/hook/schema/schema'

import ArticleAuthor from '@/components/pages/articles/hook/ArticleAuthor'

import ArticleMetadata from '@/components/pages/articles/hook/ArticleMetadata'

export default function TopArticles({ articles }: TopArticlesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {articles.map((item) => (
                <Link href={`/article/${item.slug}`} key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    {item.imageUrl && (
                        <div className="relative">
                            <div className="overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                                <span className="text-sm font-semibold text-blue-600">{item.categoryName}</span>
                            </div>
                        </div>
                    )}
                    <div className="p-8">
                        <ArticleMetadata date={item.createdAt} category={item.categoryName} />
                        <h2 className="text-2xl font-bold mt-4 mb-4 hover:text-blue-600 transition-colors duration-200">{item.title}</h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">{item.description}</p>
                        <ArticleAuthor
                            photo={item.authorPhoto}
                            name={item.authorName}
                            role={item.authorRole}
                        />
                    </div>
                </Link>
            ))}
        </div>
    )
}