"use client"

import React from 'react'

import { useFetchFeatured } from '@/utils/section/featured/useFetch'

import FeaturedSkeleton from '@/components/section/feature/FeaturedSkelaton'

import FeaturedItem from '@/components/section/feature/FeaturedItem'

import FeaturedHeading from '@/components/section/feature/FeaturedHeading'

export default function Featured() {
    const { featured, loading } = useFetchFeatured();

    if (loading) {
        return <FeaturedSkeleton />
    }

    if (featured.status !== 200) {
        return <div>Error: {featured.message}</div>;
    }

    return (
        <section className='py-16 md:py-24' id='populer'>
            <div className="container px-4">
                <FeaturedHeading />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {featured.data.map((item) => (
                        <FeaturedItem
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
