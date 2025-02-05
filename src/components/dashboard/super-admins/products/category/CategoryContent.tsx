"use client"
import React from 'react';

import { useCategories } from '@/components/dashboard/super-admins/products/category/utils/useCategories';

import { useCategoryModal } from '@/components/dashboard/super-admins/products/category/utils/useCategoryModal';

import { CategoryHeader } from '@/components/dashboard/super-admins/products/category/CategoryHeader';

import { CategoryTable } from '@/components/dashboard/super-admins/products/category/CategoryTable';

import { CategoryModal } from '@/components/dashboard/super-admins/products/category/CategoryModal';

import { DeleteModal } from '@/components/dashboard/super-admins/products/category/DeleteModal';

import Pagination from '@/components/helper/Pagination';

export default function CategoryContent() {
    const {
        currentItems,
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        searchTerm,
        setSearchTerm,
        addCategory,
        updateCategory,
        deleteCategory
    } = useCategories();

    const {
        formData,
        editingCategory,
        setFormData,
        handleAddClick,
        handleEditClick,
        handleDeleteClick,
        handleSubmit,
        handleDelete,
        handleCloseEditModal,
        handleCloseDeleteModal
    } = useCategoryModal(addCategory, updateCategory, deleteCategory);

    return (
        <section className='p-4 min-h-full bg-gray-50'>
            <div className="container max-w-7xl mx-auto">
                <CategoryHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onAddClick={handleAddClick}
                />

                <CategoryTable
                    loading={loading}
                    currentItems={currentItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <CategoryModal
                    loading={loading}
                    formData={formData}
                    editingCategory={editingCategory}
                    onSubmit={handleSubmit}
                    onChange={setFormData}
                    onClose={handleCloseEditModal}
                />

                <DeleteModal
                    loading={loading}
                    onConfirm={handleDelete}
                    onClose={handleCloseDeleteModal}
                />
            </div>
        </section>
    );
}