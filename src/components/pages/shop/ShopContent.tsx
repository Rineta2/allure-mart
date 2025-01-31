"use client"

import React from 'react';

import { useFetchProducts } from '@/utils/section/products/useFetch';

import ShopSkelaton from '@/components/pages/shop/ShopSkelaton';

import HeroShop from '@/components/pages/shop/HeroShop';

import ShopFilter from '@/components/pages/shop/hooks/ShopFilter';

import ProductCard from '@/components/pages/shop/hooks/ProductCard';

import Pagination from '@/components/pages/shop/hooks/Pagination';

export default function ShopContent() {
    const { products, loading } = useFetchProducts();
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [itemsPerPage, setItemsPerPage] = React.useState(12);
    const [sortBy, setSortBy] = React.useState('latest');
    const [currentPage, setCurrentPage] = React.useState(1);

    if (loading) {
        return <ShopSkelaton />;
    }

    const sortedProducts = [...products.data].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default: // 'latest'
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const filteredProducts = selectedCategory === 'all'
        ? sortedProducts
        : sortedProducts.filter(product => product.merek.name === selectedCategory);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const categories = ['all', ...new Set(products.data.map(product => product.merek.name))];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <HeroShop />
            <section className='py-20 min-h-full relative'>
                <div className="container px-0 sm:px-4">
                    <ShopFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        filteredProductsCount={filteredProducts.length}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        totalProducts={products.data.length}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-5 mt-14 sm:mt-10">
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </>
    );
}