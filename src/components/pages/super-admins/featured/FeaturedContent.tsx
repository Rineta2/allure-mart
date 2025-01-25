"use client"

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';

import { useFeaturedOperations } from '@/components/pages/super-admins/featured/utils/useFeatured';

import { FeaturedFormModal } from '@/components/pages/super-admins/featured/FeaturedFormModal';

import { PreviewModal } from '@/components/pages/super-admins/featured/PriviewModal';

import { FeaturedCard } from '@/components/pages/super-admins/featured/FeaturedCard';

import { useFeaturedModal } from '@/components/pages/super-admins/featured/utils/useFeaturedModa';

export default function FeaturedContent() {
    const {
        features,
        isLoading,
        isSaving,
        fetchFeatures,
        handleDelete,
        handleSave
    } = useFeaturedOperations();

    const [search, setSearch] = useState('');

    const {
        editingFeature,
        previewFeature,
        handleSubmit,
        handleCloseModal,
        handleClosePreview,
        openEditModal,
        handlePreview
    } = useFeaturedModal(handleSave);

    useEffect(() => {
        fetchFeatures();
    }, [fetchFeatures])

    return (
        <section className='p-4 sm:p-6 min-h-full bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                    <div className="flex flex-col gap-3 flex-1 w-full">
                        <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-title'>
                            Daftar Featured
                        </h1>
                        <p className='text-sm sm:text-base text-gray-600/90'>
                            Daftar semua produk yang sudah dijadwalkan untuk dijadikan featured
                        </p>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative w-full max-w-md group"
                        >
                            <input
                                type="text"
                                className="w-full px-4 py-3 pl-10 pr-4 rounded-xl border border-gray-200 
                                         focus:ring-2 focus:ring-primary/20 focus:border-primary 
                                         transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                placeholder="Cari Featured..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                                         transition-transform duration-300 group-focus-within:scale-110"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (features.length >= 3) {
                                alert('Maksimal hanya 3 featured items yang diperbolehkan.');
                                return;
                            }
                            const modal = document.getElementById('featured_modal') as HTMLDialogElement;
                            modal?.showModal();
                        }}
                        className={`btn btn-primary px-6 py-3 w-full md:w-auto transition-all duration-300
                                 shadow-lg hover:shadow-primary/30 rounded-xl
                                 ${features.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                        disabled={features.length >= 3}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Tambah Featured
                    </motion.button>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                >
                    {isLoading ? (
                        [...Array(3)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="card bg-white backdrop-blur-lg shadow-xl rounded-xl overflow-hidden"
                            >
                                <div className="h-48 sm:h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
                                <div className="card-body p-6">
                                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 animate-pulse" />
                                    <div className="flex justify-end gap-3 mt-4">
                                        {[1, 2, 3].map((btn) => (
                                            <div key={btn} className="h-9 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : features.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500"
                        >
                            <div className="relative w-24 h-24 mb-4">
                                <Image
                                    src="/empty-state.svg"
                                    alt="No content"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-lg font-medium">Belum ada featured content</p>
                            <p className="text-sm text-gray-400">Mulai dengan menambahkan featured baru</p>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {features
                                .filter(feature =>
                                    feature.title.toLowerCase().includes(search.toLowerCase())
                                )
                                .map(feature => (
                                    <FeaturedCard
                                        key={feature.id}
                                        feature={feature}
                                        onEdit={openEditModal}
                                        onDelete={handleDelete}
                                        onPreview={handlePreview}
                                    />
                                ))
                            }
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>

            <FeaturedFormModal
                editingFeature={editingFeature}
                isSaving={isSaving}
                onSubmit={handleSubmit}
                onClose={handleCloseModal}
            />

            <PreviewModal
                feature={previewFeature}
                onClose={handleClosePreview}
            />
        </section>
    );
}