import React from 'react'
import Image from 'next/image'

interface FeaturedItemProps {
    id: string | number
    imageUrl: string
    title: string
}

export default function FeaturedItem({ id, imageUrl, title }: FeaturedItemProps) {
    return (
        <div
            key={id}
            className="group cursor-pointer hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative overflow-hidden aspect-square mb-4 rounded-xl shadow-sm">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            </div>

            <h4 className="text-xl md:text-2xl font-semibold text-center group-hover:text-primary transition-colors">
                {title}
            </h4>
        </div>
    )
}