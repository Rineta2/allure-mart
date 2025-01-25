import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { PreviewModalProps } from '@/components/pages/super-admins/featured/schema/Featured';

export const PreviewModal: React.FC<PreviewModalProps> = ({ feature, onClose }) => {
    React.useEffect(() => {
        if (feature) {
            const modal = document.getElementById('preview_modal') as HTMLDialogElement;
            if (modal && !modal.open) {
                modal.showModal();
            }
        }
    }, [feature]);

    if (!feature) return null;

    return (
        <dialog id="preview_modal" className="modal">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="modal-box sm:max-w-[600px] w-full relative bg-white backdrop-blur-lg p-6 rounded-xl shadow-2xl"
            >
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Preview Featured
                        </h3>
                        <h2 className="text-xl font-semibold">{feature.title}</h2>
                    </div>
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={feature.imageUrl}
                            alt={feature.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.div>
            <form method="dialog" className="modal-backdrop">
                <button
                    type="submit"
                    className="fixed inset-0 bg-black/50 w-full h-full cursor-default"
                    onClick={onClose}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};