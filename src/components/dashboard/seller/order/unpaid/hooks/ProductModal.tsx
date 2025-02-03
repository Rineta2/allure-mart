import Image from 'next/image'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/helper/dialog"

import { ProductsModalProps } from '@/components/dashboard/seller/order/unpaid/hooks/schema/schema'

export default function ProductsModal({ isOpen, onOpenChange, items }: ProductsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Semua Produk</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-6 items-start border-b border-gray-100 pb-6 last:border-0">
                            <Image
                                src={item.thumbnail}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                            />
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                                <p className="text-sm text-gray-600">Harga: Rp {item.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}