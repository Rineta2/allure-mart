import type { Metadata } from 'next'

import ShopDetails from '@/components/pages/shop/[slug]/ShopDetails'

import { generateMetadata as getProductMetadata } from '@/components/helper/products/metadata'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProductMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <ShopDetails slug={resolvedParams.slug} />
}