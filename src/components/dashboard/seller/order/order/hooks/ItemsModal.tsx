import Image from 'next/image'

import { ItemsModalProps } from '@/components/dashboard/seller/order/order/hooks/lib/schema'

export const ItemsModal = ({ order, onClose }: ItemsModalProps) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Order Items Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <Image
                                src={item.thumbnail}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div>
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">
                                    {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};