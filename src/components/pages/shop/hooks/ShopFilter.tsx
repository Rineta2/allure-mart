import React from 'react';
import { GiSettingsKnobs } from "react-icons/gi";

interface ShopFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    filteredProductsCount: number;
    itemsPerPage: number;
    setItemsPerPage: (size: number) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    totalProducts: number;
}

export default function ShopFilter({
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProductsCount,
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy,
    totalProducts
}: ShopFilterProps) {
    return (
        <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl py-8 px-6 md:px-10 bg-primary rounded-xl shadow-xl transform -translate-y-1/2 z-10'>
            <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4">
                {/* Filter Section */}
                <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
                    <div className="dropdown relative">
                        <button className="flex items-center gap-2.5 hover:opacity-90 transition-all duration-300">
                            <GiSettingsKnobs className='text-2xl text-background' />
                            <span className='text-sm md:text-base font-medium text-background'>Filter</span>
                        </button>
                        <div className="dropdown-content absolute z-50 mt-3 bg-white rounded-xl shadow-lg p-3 min-w-[220px]">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${selectedCategory === category
                                            ? 'bg-primary text-white font-medium'
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='hidden md:block text-background'>|</div>

                    <div className='text-sm md:text-base font-medium text-background'>
                        <p>Showing {filteredProductsCount} Products</p>
                    </div>
                </div>

                {/* Sort Section */}
                <div className="flex flex-wrap md:flex-row items-center justify-center md:justify-start gap-6">
                    <label className='flex items-center gap-3 text-background'>
                        <span className='text-sm md:text-base'>Show</span>
                        <select
                            className='select bg-white/10 text-background'
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option className='text-title bg-white' value={totalProducts}>All</option>
                            {[2, 4, 6, 12, 18, 24, 30, 36, 42, 48].map(size => (
                                size <= totalProducts && (
                                    <option key={size} className='text-title bg-white' value={size}>
                                        {size}
                                    </option>
                                )
                            ))}
                        </select>
                    </label>

                    <label className='flex items-center gap-3 text-background'>
                        <span className='text-sm md:text-base'>Sort By</span>
                        <select
                            className='select bg-white/10 border-white/20 text-background'
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option className='text-title bg-white' value="latest">Latest</option>
                            <option className='text-title bg-white' value="price-low">Price: Low to High</option>
                            <option className='text-title bg-white' value="price-high">Price: High to Low</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}