import React from 'react'

import Image from 'next/image'

import { ArticleAuthorProps } from '@/components/pages/articles/hook/schema/schema'

export default function ArticleAuthor({ photo, name, role }: ArticleAuthorProps) {
    return (
        <div className="flex items-center space-x-4 mb-3">
            {photo && (
                <Image
                    src={photo}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    width={500}
                    height={500}
                />
            )}
            <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    )
}