import React from 'react';

import { ProductHeaderProps } from '@/components/dashboard/super-admins/products/product/schema/schema';

export const ProductHeader: React.FC<ProductHeaderProps> = ({
    searchTerm,
    setSearchTerm,
    openAddModal
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className='text-2xl font-bold text-gray-900'>Products List</h1>
                    <p className='text-sm text-gray-500'>Manage your products inventory</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10 bg-white border-gray-200 rounded-lg"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <button
                        className="btn bg-primary hover:bg-text text-white rounded-lg px-6 py-2"
                        onClick={openAddModal}
                    >
                        Add New Product
                    </button>
                </div>
            </div>
        </div>
    );
};