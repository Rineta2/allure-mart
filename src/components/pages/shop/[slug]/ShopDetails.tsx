"use client"

import React from 'react'

import { useParams } from 'next/navigation'

import { useFetchProducts } from '@/utils/section/products/useFetch'

import ShopDetailsSkeleton from '@/components/pages/shop/[slug]/ShopDetailsSkelaton'

import HeroSection from '@/components/pages/shop/[slug]/hooks/HeroSection'

import ProductGallery from '@/components/pages/shop/[slug]/hooks/ProductGallery'

import ProductDetails from '@/components/pages/shop/[slug]/hooks/ProductDetails'

import ProductTabs from '@/components/pages/shop/[slug]/hooks/ProductTabs'

import RelatedProducts from '@/components/pages/shop/[slug]/hooks/RelatedProducts'

export default function ShopDetails() {
    const params = useParams()
    const { products, loading } = useFetchProducts()
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
    const [activeTab, setActiveTab] = React.useState('description')

    if (loading) {
        return <ShopDetailsSkeleton />
    }

    const product = products.data.find((p) => p.slug === params.slug)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        )
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_URL}/shop/${product?.slug}`

    return (
        <>
            <HeroSection product={product} />

            <section className="py-16 md:py-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        <ProductGallery
                            images={product.imageSlider}
                            title={product.title}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                        />

                        <ProductDetails product={product} shareUrl={shareUrl} />

                        <ProductTabs
                            product={product}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </div>
            </section>

            <RelatedProducts currentProduct={product} products={products.data} />
        </>
    )
}
