import React from 'react'

import { ArticleMetadataProps } from '@/components/pages/articles/hook/schema/schema'

export default function ArticleMetadata({ date, category }: ArticleMetadataProps) {
    return (
        <div className="text-sm text-gray-500 flex items-center">
            <span>{new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-blue-600">{category}</span>
        </div>
    )
}