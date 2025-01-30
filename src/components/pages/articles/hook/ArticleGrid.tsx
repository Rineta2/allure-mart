import React from 'react'

import Image from 'next/image'

import { ArticleGridProps } from '@/components/pages/articles/hook/schema/schema'

import ArticleAuthor from '@/components/pages/articles/hook/ArticleAuthor'

import ArticleMetadata from '@/components/pages/articles/hook/ArticleMetadata'

export default function ArticleGrid({ articles }: ArticleGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                    {item.imageUrl && (
                        <div className="relative">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                width={500}
                                height={500}
                            />
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                                <span className="text-sm font-semibold text-blue-600">{item.categoryName}</span>
                            </div>
                        </div>
                    )}
                    <div className="p-6">
                        <ArticleMetadata date={item.createdAt} category={item.categoryName} />
                        <h2 className="text-xl mt-4 font-bold mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-2">{item.title}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        <ArticleAuthor
                            photo={item.authorPhoto}
                            name={item.authorName}
                            role={item.authorRole}
                        />
                    </div>
                </article>
            ))}
        </div>
    )
}