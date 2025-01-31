"use client"

import React, { useState, useEffect } from 'react'

import { auth } from '@/utils/firebase'

import { useRouter } from 'next/navigation'

import PrivacySkelaton from '@/components/dashboard/user/privacy/PrivacySkelaton'

import DeleteAccountModal from '@/components/dashboard/user/privacy/hooks/DeleteAccountModal'

import Image from 'next/image'

import ImageDelete from "@/components/assets/accounts/delete/img.png"

export default function PrivacyContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleDeleteAccount = async () => {
        try {
            setIsDeleting(true);
            const currentUser = auth.currentUser;

            if (currentUser) {
                // Dapatkan token ID terbaru
                const idToken = await currentUser.getIdToken();

                // Panggil API untuk menghapus akun
                const response = await fetch('/api/user/delete', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete account');
                }

                // Redirect ke halaman utama setelah berhasil
                router.push('/');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Gagal menghapus akun. Silakan coba login ulang dan coba lagi.');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (isLoading) {
        return <PrivacySkelaton />
    }

    return (
        <section className="py-8 sm:py-12 min-h-full">
            <div className="container max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
                        <p className="text-gray-600">Kelola privasi dan keamanan akun Anda</p>
                    </div>
                    <div className="hidden sm:block">
                        <Image
                            src={ImageDelete}
                            alt="Privacy Shield"
                            className="w-40 h-40 object-cover"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Privacy Cards */}
                    <div className="grid gap-6 mb-8">
                        {/* Data Protection Card */}
                        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Proteksi Data</h3>
                                    <p className="text-gray-600 text-sm">Data Anda dienkripsi dan dilindungi menggunakan standar industri.</p>
                                </div>
                            </div>
                        </div>

                        {/* Delete Account Card */}
                        <div className="p-6 border border-red-100 rounded-xl bg-red-50">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Hapus Akun</h3>
                                        <p className="text-gray-600 text-sm">Tindakan ini akan menghapus akun Anda secara permanen</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    disabled={isDeleting}
                                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg disabled:opacity-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>{isDeleting ? 'Menghapus...' : 'Hapus Akun'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
            />
        </section>
    )
}
