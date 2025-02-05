import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { FeaturedCardProps } from '@/components/dashboard/super-admins/featured/schema/Featured';

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
    feature,
    onEdit,
    onDelete,
    onPreview
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
            <figure className="relative h-48 sm:h-56 w-full overflow-hidden">
                <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </figure>
            <div className="card-body p-6">
                <h2 className="card-title text-lg font-semibold">{feature.title}</h2>
                <div className="card-actions justify-end mt-4">
                    <button
                        onClick={() => onEdit(feature)}
                        className="btn btn-sm btn-info hover:btn-info/80 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(feature.id)}
                        className="btn btn-sm btn-error hover:btn-error/80 transition-colors"
                    >
                        Hapus
                    </button>
                    <button
                        onClick={() => onPreview(feature)}
                        className="btn btn-sm btn-primary hover:btn-primary/80 transition-colors"
                    >
                        Preview
                    </button>
                </div>
            </div>
        </motion.div>
    );
};