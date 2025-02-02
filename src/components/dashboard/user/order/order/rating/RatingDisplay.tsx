import React from 'react'
import { StarRating } from './StartRating'
import { Rating } from '@/components/dashboard/user/order/order/schema/schema'
import { formatDistance } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'

interface RatingDisplayProps {
    ratings: Rating[]
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ ratings }) => {
    return (
        <div className="space-y-6">
            {ratings.map((rating) => (
                <div key={rating.uid} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <Image
                            src={rating.photoURL}
                            alt={rating.displayName}
                            className="w-12 h-12 rounded-full object-cover"
                            width={48}
                            height={48}
                        />
                        <div>
                            <h4 className="font-medium text-gray-900">{rating.displayName}</h4>
                            <p className="text-sm text-gray-500">
                                {formatDistance(rating.createdAt.toDate(), new Date(), {
                                    addSuffix: true,
                                    locale: id
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-gray-700 leading-relaxed">{rating.review}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Kualitas Produk</p>
                            <StarRating value={rating.productQuality} readonly />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Pelayanan Penjual</p>
                            <StarRating value={rating.sellerService} readonly />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Kecepatan Pengiriman</p>
                            <StarRating value={rating.shippingSpeed} readonly />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}