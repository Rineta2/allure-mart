import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

interface ProductCardProps {
    product: {
        id: string;
        slug: string;
        thumbnail: string;
        title: string;
        merek: {
            name: string;
        };
        description: string;
        price: number;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/shop/${product.slug}`}
            className="group bg-white rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                      hover:-translate-y-1 transition-all duration-500 cursor-pointer border border-gray-100"
        >
            <div className="aspect-square relative overflow-hidden">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <span className="px-4 py-1.5 text-xs font-medium text-white bg-primary/90 backdrop-blur-sm rounded-full">
                        {product.merek.name}
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between pt-3">
                    <h3 className="text-xl font-bold text-primary">
                        Rp {product.price.toLocaleString('id-ID')}
                    </h3>
                </div>
            </div>
        </Link>
    );
}