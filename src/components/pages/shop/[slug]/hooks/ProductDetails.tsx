import React, { useEffect, useState } from 'react'

import { IoIosStar } from "react-icons/io"

import { ProductData } from '@/utils/section/products/schema/schema'

import ShareButtons from '@/components/pages/shop/[slug]/hooks/ShareButtons'

import { useCart } from '@/components/router/auth/CartContext'

interface ProductDetailsProps {
    product: ProductData;
    shareUrl: string;
}

function AddToCartSection({ product }: { product: ProductData }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    useEffect(() => {
        console.log(product)
    }, [product])

    return (
        <>
            <div className="flex items-center gap-3 sm:gap-4 flex-col sm:flex-row">
                <div className="flex items-center border-2 border-gray-200 rounded-xl w-full sm:w-auto overflow-hidden">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-4 md:px-5 py-3 text-gray-600 bg-transparent hover:bg-gray-50 transition-colors font-medium text-lg"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-x border-gray-200 py-3 focus:outline-none text-gray-700 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-4 md:px-5 py-3 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-lg"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 font-medium"
                >
                    Add to Cart
                </button>

                <button
                    className="bg-black hover:bg-black/90 text-white px-6 md:px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-lg font-medium"
                >
                    Buy Now
                </button>
            </div>
        </>
    );
}

export default function ProductDetails({ product, shareUrl }: ProductDetailsProps) {
    return (
        <div className="space-y-6 md:space-y-8 relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title">
                {product.title}
            </h1>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                Rp {product.price.toLocaleString('id-ID')}
            </h3>

            <div className="flex items-center gap-4 md:gap-6 text-sm flex-wrap">
                <span className="flex items-center gap-1 text-[#FFC107]">
                    {[...Array(5)].map((_, i) => (
                        <IoIosStar key={i} className="w-5 h-5" />
                    ))}
                </span>
                <span className="hidden md:inline text-gray-200">|</span>
                <span className="text-gray-500 hover:text-primary transition-colors duration-300 cursor-pointer">
                    100 Reviews
                </span>
                <span className="hidden md:inline text-gray-200">|</span>
                <span className="text-gray-500">
                    Stock: <span className="font-semibold text-primary">{product.stock}</span>
                </span>
            </div>

            <p className="text-gray-600 leading-relaxed line-clamp-3 text-base md:text-lg">
                {product.description}
            </p>

            <AddToCartSection product={product} />

            <div className="flex flex-col gap-6 pt-12">
                <div className="flex gap-2 items-center">
                    <h3 className="text-xl md:text-[16px] font-bold text-title">Category:</h3>
                    <span className="text-gray-500 text-[16px]">{product.category.name}</span>
                </div>

                <ShareButtons shareUrl={shareUrl} title={product.title} />
            </div>
        </div>
    )
}