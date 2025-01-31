import Image from 'next/image';

import { OrderSummaryProps } from '@/components/pages/checkout/hooks/schema/Checkout';

export default function OrderSummary({ cartItems, totalItems, total }: OrderSummaryProps) {
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm lg:sticky lg:top-20 h-fit">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-border/40 group">
                        <div className="relative overflow-hidden rounded-xl">
                            <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-lg font-semibold mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    </div>
                ))}

                <div className="pt-4 space-y-4">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-xl pt-2 border-t">
                        <span>Total</span>
                        <span className="text-primary">${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}