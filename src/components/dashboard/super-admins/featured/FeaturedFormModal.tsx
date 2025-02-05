import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { FeaturedFormModalProps, FormData } from '@/components/dashboard/super-admins/featured/schema/Featured';

export const FeaturedFormModal: React.FC<FeaturedFormModalProps> = ({
    editingFeature,
    isSaving,
    onSubmit,
    onClose
}) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (editingFeature) {
            setFormData({
                title: editingFeature.title,
                image: null
            });
        }
    }, [editingFeature]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, image: null });
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <dialog id="featured_modal" className="modal">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="modal-box sm:max-w-[600px] w-full relative bg-white backdrop-blur-lg p-6 rounded-xl shadow-2xl"
            >
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    {editingFeature ? 'Edit Featured' : 'Tambah Featured Baru'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Judul</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Gambar</label>
                        <input
                            type="file"
                            className="file-input w-full bg-base-100"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!editingFeature}
                        />
                    </div>

                    {(imagePreview || (editingFeature && editingFeature.imageUrl)) && (
                        <div className="mt-4">
                            <label className="label">Preview</label>
                            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                <Image
                                    src={imagePreview || editingFeature?.imageUrl || ''}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Menyimpan...
                                </>
                            ) : 'Simpan'}
                        </button>
                    </div>
                </form>
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