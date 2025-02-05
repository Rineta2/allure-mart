"use client"
import React, { useState, useEffect } from 'react'

import toast from 'react-hot-toast'

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { TableRowSkeleton } from '@/components/helper/Skelaton';

import Pagination from '@/components/helper/Pagination';

import { Merek, FormData } from '@/components/dashboard/super-admins/products/merek/schema/Schema';

export default function MerekContent() {
    const [mereks, setMereks] = useState<Merek[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        name: '',
    });
    const [editingMerek, setEditingMerek] = useState<Merek | null>(null);
    const [deletingMerek, setDeletingMerek] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Add this filtered items calculation before the pagination calculation
    const filteredMereks = mereks.filter(merek =>
        merek.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update pagination calculations to use filteredMereks instead of mereks
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMereks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMereks.length / itemsPerPage);

    // Fetch categories
    const fetchMereks = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_MEREKS as string));
            const mereksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            })) as Merek[];
            // Sort categories by createdAt in descending order (newest first)
            const sortedMereks = mereksData.sort((a, b) =>
                b.createdAt.getTime() - a.createdAt.getTime()
            );
            setMereks(sortedMereks);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add new category
    const handleAddMerek = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Check for duplicate names
            const isDuplicate = mereks.some(
                merek => merek.name.toLowerCase() === formData.name.toLowerCase()
            );

            if (isDuplicate) {
                toast.error('Nama merek sudah ada, gunakan nama lain');
                return;
            }

            await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_MEREKS as string), {
                ...formData,
                createdAt: new Date()
            });
            setFormData({ name: '' });
            const modal = document.getElementById('merek_modal') as HTMLDialogElement;
            modal?.close();
            fetchMereks();
            toast.success('Merek berhasil ditambahkan');
        } catch (error) {
            console.error('Error adding gender:', error);
            toast.error('Gagal menambahkan merek');
        } finally {
            setLoading(false);
        }
    };

    // Add handleEditCategory function
    const handleEditMerek = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMerek) return;

        try {
            setLoading(true);
            // Check for duplicate names, excluding the current merek being edited
            const isDuplicate = mereks.some(
                merek => merek.name.toLowerCase() === formData.name.toLowerCase()
                    && merek.id !== editingMerek.id
            );

            if (isDuplicate) {
                toast.error('Nama merek sudah ada, gunakan nama lain');
                return;
            }

            await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_MEREKS as string, editingMerek.id), {
                name: formData.name,
                updatedAt: new Date()
            });
            setFormData({ name: '' });
            setEditingMerek(null);
            const modal = document.getElementById('merek_modal') as HTMLDialogElement;
            modal?.close();
            fetchMereks();
            toast.success('Merek berhasil diperbarui');
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Gagal memperbarui merek');
        } finally {
            setLoading(false);
        }
    };

    // Update delete category function
    const handleDeleteMerek = async (id: string) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_MEREKS as string, id));
            const modal = document.getElementById('delete_modal') as HTMLDialogElement;
            modal?.close();
            setDeletingMerek(null);
            fetchMereks();
            toast.success('Merek berhasil dihapus');
        } catch (error) {
            console.error('Error deleting gender:', error);
            toast.error('Gagal menghapus merek');
        } finally {
            setLoading(false);
        }
    };

    // Handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetchMereks();
    }, []);

    return (
        <section className='p-4 min-h-full bg-gray-50'>
            <div className="container max-w-7xl mx-auto">
                {/* Header Section - modernized */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className='text-2xl font-bold text-gray-900'>Daftar Merek</h1>
                            <p className='text-sm text-gray-500'>Daftar semua merek yang sudah terdaftar</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Cari Merek..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <button
                                className="btn bg-primary hover:bg-text text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-all"
                                onClick={() => {
                                    const modal = document.getElementById('merek_modal') as HTMLDialogElement;
                                    modal?.showModal();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Tambah Merek
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section - modernized */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">No</th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Nama Merek</th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(itemsPerPage)].map((_, index) => (
                                        <TableRowSkeleton key={index} />
                                    ))
                                ) : (
                                    currentItems.map((merek, index) => (
                                        <tr key={merek.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">
                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">{merek.name}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">{merek.createdAt.toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                        onClick={() => {
                                                            setEditingMerek(merek);
                                                            setFormData({ name: merek.name });
                                                            const modal = document.getElementById('merek_modal') as HTMLDialogElement;
                                                            modal?.showModal();
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDeletingMerek(merek.id);
                                                            const modal = document.getElementById('delete_modal') as HTMLDialogElement;
                                                            modal?.showModal();
                                                        }}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination - modernized */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Modals - modernized */}
                <dialog id="merek_modal" className="modal">
                    <div className="modal-box bg-white max-w-md mx-auto p-6 rounded-xl">
                        <h3 className="font-bold text-xl text-gray-900">
                            {editingMerek ? 'Edit Merek' : 'Tambah Merek Baru'}
                        </h3>

                        <form onSubmit={editingMerek ? handleEditMerek : handleAddMerek} className='flex flex-col mt-4'>
                            <div className="form-control flex flex-col gap-2">
                                <label className="flex flex-col gap-2">
                                    <span className="label-text text-gray-700">Nama Merek</span>

                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="modal-action flex gap-3 mt-8">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Loading...
                                        </>
                                    ) : editingMerek ? 'Update' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                    disabled={loading}
                                    onClick={() => {
                                        setEditingMerek(null);
                                        setFormData({ name: '' });
                                        const modal = document.getElementById('merek_modal') as HTMLDialogElement;
                                        modal?.close();
                                    }}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                {/* Delete Modal - modernized */}
                <dialog id="delete_modal" className="modal">
                    <div className="modal-box bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-xl text-gray-900 mb-4">Konfirmasi Hapus</h3>
                        <p className="text-gray-600">Apakah Anda yakin ingin menghapus merek ini?</p>
                        <div className="modal-action flex gap-3 mt-8">
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                                onClick={() => deletingMerek && handleDeleteMerek(deletingMerek)}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Loading...
                                    </>
                                ) : 'Hapus'}
                            </button>
                            <button
                                className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                onClick={() => {
                                    setDeletingMerek(null);
                                    const modal = document.getElementById('delete_modal') as HTMLDialogElement;
                                    modal?.close();
                                }}
                                disabled={loading}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </section>
    )
}