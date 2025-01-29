import React from 'react'

import { ProductData } from '@/utils/section/products/schema/schema'

interface ProductTabsProps {
    product: ProductData;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function ProductTabs({ product, activeTab, setActiveTab }: ProductTabsProps) {
    return (
        <div className="flex justify-center items-center flex-col col-span-2 mt-10">
            <div className="flex border-b border-gray-200">
                <TabButton
                    label="Description"
                    isActive={activeTab === 'description'}
                    onClick={() => setActiveTab('description')}
                />
                <TabButton
                    label="Additional Information"
                    isActive={activeTab === 'additional'}
                    onClick={() => setActiveTab('additional')}
                />
                <TabButton
                    label="Reviews (5)"
                    isActive={activeTab === 'reviews'}
                    onClick={() => setActiveTab('reviews')}
                />
            </div>

            <div className="py-8">
                {activeTab === 'description' && (
                    <div
                        dangerouslySetInnerHTML={{ __html: product.content }}
                        className="content__article prose prose-lg
                            prose-headings:text-title prose-p:text-gray-600 prose-p:leading-relaxed
                            prose-strong:text-primary prose-strong:font-semibold
                            prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-600 prose-li:leading-relaxed
                            space-y-6 rounded-2xl p-8"
                    />
                )}

                {activeTab === 'additional' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                        {/* Add your additional information content here */}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                        {/* Add your reviews content here */}
                    </div>
                )}
            </div>
        </div>
    )
}

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-8 py-4 text-sm font-medium transition-colors duration-300
                ${isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
        >
            {label}
        </button>
    )
}