import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { ProductData } from '@/utils/section/products/schema/schema'

interface RelatedProductsProps {
    currentProduct: ProductData;
    products: ProductData[];
}

export default function RelatedProducts({ currentProduct, products }: RelatedProductsProps) {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-12">Related Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                        .filter((p: ProductData) => p.slug !== currentProduct.slug)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 4)
                        .map((relatedProduct: ProductData) => (
                            <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                </div>
            </div>
        </section>
    )
}

function RelatedProductCard({ product }: { product: ProductData }) {
    const isNew = new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

    return (
        <Link href={`/shop/${product.slug}`} className="group">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
                {isNew && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white text-sm px-2 py-1 rounded-full z-10">
                        New
                    </span>
                )}

                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="mt-4 space-y-2">
                <h3 className="font-medium text-title group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500">
                    {product.category.name}
                </p>

                <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
                </div>
            </div>
        </Link>
    )
}