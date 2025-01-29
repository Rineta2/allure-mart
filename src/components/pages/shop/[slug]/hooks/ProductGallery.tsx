import React from 'react'

import Image from 'next/image'

interface ProductGalleryProps {
    images: string[];
    title: string;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
}

export default function ProductGallery({
    images,
    title,
    currentImageIndex,
    setCurrentImageIndex
}: ProductGalleryProps) {
    return (
        <div className="flex flex-row-reverse gap-4 md:gap-6">
            <div className="flex-1 aspect-square relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                />
            </div>

            <div className="flex flex-col gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 md:w-24 h-16 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 ${currentImageIndex === index
                            ? 'ring-2 ring-primary scale-95 shadow-lg'
                            : 'ring-1 ring-gray-200 hover:ring-primary/50 hover:scale-95'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`${title} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}