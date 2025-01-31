import React, { useState } from 'react'

import { IoIosStar } from "react-icons/io"

import { ProductData } from '@/utils/section/products/schema/schema'

import ShareButtons from '@/components/pages/shop/[slug]/hooks/ShareButtons'

import { useCart } from '@/components/router/auth/CartContext'

import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useAuth } from '@/components/router/auth/AuthContext';
import { toast } from 'react-hot-toast';

interface ProductDetailsProps {
    product: ProductData;
    shareUrl: string;
}

// Add Modal component
function BuyNowModal({ isOpen, onClose, product, quantity }: {
    isOpen: boolean;
    onClose: () => void;
    product: ProductData;
    quantity: number;
}) {
    const { user } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | ''>('');
    const [showBankDetails, setShowBankDetails] = useState(false);

    const generateOrderId = () => {
        const timestamp = new Date().getTime().toString().slice(-6);
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ORD${timestamp}${randomNum}`;
    };

    const bankAccounts = [
        {
            bank: 'BCA',
            accountNumber: '1234567890',
            accountName: 'John Doe'
        },
        {
            bank: 'Mandiri',
            accountNumber: '0987654321',
            accountName: 'John Doe'
        }
    ];

    const handleCheckout = async () => {
        if (!user) {
            toast.error('Please login to continue checkout');
            return;
        }

        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        try {
            // Fetch user account data from accounts collection
            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid));
            const userData = userDoc.data();

            if (!userData) {
                toast.error('User account data not found');
                return;
            }

            const orderId = generateOrderId();
            const orderData = {
                orderId,
                userId: user.uid,
                productId: product.id,
                productTitle: product.title,
                quantity: quantity,
                totalPrice: product.price * quantity,
                status: 'pending',
                createdAt: new Date(),
                customerInfo: {
                    email: userData.email || user.email,
                    firstName: userData.firstName || userData.displayName?.split(' ')[0] || '',
                    lastName: userData.lastName || userData.displayName?.split(' ').slice(1).join(' ') || '',
                    phone: userData.phone || ''
                },
                paymentMethod: paymentMethod,
            };

            // Save order to Firebase
            await addDoc(collection(db, 'orders'), orderData);

            const currentDate = new Date().toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const message = encodeURIComponent(
                `*PAYMENT CONFIRMATION*\n` +
                `______________________\n\n` +
                `  *CUSTOMER INFO*\n` +
                `Name: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}\n` +
                `Phone: ${orderData.customerInfo.phone}\n\n` +
                `ORDER ID: #${orderId}\n\n` +
                `  *ORDER DETAILS*\n` +
                `${product.title}\n` +
                `× Quantity: ${quantity}\n` +
                `× Price: Rp ${product.price.toLocaleString('id-ID')}\n` +
                `× Subtotal: Rp ${(product.price * quantity).toLocaleString('id-ID')}\n\n` +
                `  *PAYMENT SUMMARY*\n` +
                `Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}\n` +
                `Total Amount: Rp ${(product.price * quantity).toLocaleString('id-ID')}\n\n` +
                `  Order Date: ${currentDate}\n` +
                `______________________\n\n` +
                `Please confirm my payment for this order. Thank you!`
            );

            const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

            toast.success('Order placed successfully!');
            onClose();
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="font-medium">{product.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Price:</span>
                        <span className="font-medium">Rp {(product.price * quantity).toLocaleString('id-ID')}</span>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-3">Select Payment Method:</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setPaymentMethod('cod');
                                    setShowBankDetails(false);
                                }}
                                className={`w-full p-3 border rounded-lg ${paymentMethod === 'cod'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Cash on Delivery (COD)
                            </button>
                            <button
                                onClick={() => {
                                    setPaymentMethod('bank');
                                    setShowBankDetails(true);
                                }}
                                className={`w-full p-3 border rounded-lg ${paymentMethod === 'bank'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Bank Transfer
                            </button>
                        </div>
                    </div>

                    {showBankDetails && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3">Bank Transfer Details:</h3>
                            <div className="space-y-3">
                                {bankAccounts.map((account, index) => (
                                    <div key={index} className="p-3 border rounded-lg">
                                        <p className="font-semibold">{account.bank}</p>
                                        <p className="text-gray-600">Account: {account.accountNumber}</p>
                                        <p className="text-gray-600">Name: {account.accountName}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddToCartSection({ product }: { product: ProductData }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

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
                    onClick={() => setShowBuyNowModal(true)}
                    className="bg-black hover:bg-black/90 text-white px-6 md:px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 hover:shadow-lg font-medium"
                >
                    Buy Now
                </button>
            </div>

            <BuyNowModal
                isOpen={showBuyNowModal}
                onClose={() => setShowBuyNowModal(false)}
                product={product}
                quantity={quantity}
            />
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

            <div className="absolute bottom-28 left-0 w-full h-[1px] bg-gray-200"></div>

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