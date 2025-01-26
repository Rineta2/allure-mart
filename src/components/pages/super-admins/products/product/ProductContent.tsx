"use client"

import React, { useState } from 'react';

import { ProductHeader } from '@/components/pages/super-admins/products/product/ProductHeader';

import { ProductTable } from '@/components/pages/super-admins/products/product/ProductTable';

import { ProductModal } from '@/components/pages/super-admins/products/product/ProductModal';

import { DeleteModal } from '@/components/pages/super-admins/products/product/DeleteModal';

import Pagination from '@/components/helper/Pagination';

import { useProduct } from '@/components/pages/super-admins/products/product/utils/useProduct';

export default function ProductContent() {
    const {
        products,
        categories,
        genders,
        mereks,
        loading,
        searchTerm,
        setSearchTerm,
        formData,
        setFormData,
        editingProduct,
        setEditingProduct,
        deletingProduct,
        setDeletingProduct,
        handleAddProduct,
        handleEditProduct,
        handleDeleteProduct,
        handleFileChange,
        resetForm
    } = useProduct();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleOpenAddModal = () => {
        const modal = document.getElementById('product_modal') as HTMLDialogElement;
        modal?.showModal();
    };

    const handleCancelDelete = () => {
        setDeletingProduct(null);
        const modal = document.getElementById('delete_modal') as HTMLDialogElement;
        modal?.close();
    };

    const handleConfirmDelete = async () => {
        if (deletingProduct) {
            await handleDeleteProduct(deletingProduct);
        }
    };

    return (
        <section className='p-4 min-h-full bg-gray-50'>
            <div className="container max-w-7xl mx-auto">
                <ProductHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    openAddModal={handleOpenAddModal}
                />

                <ProductTable
                    loading={loading}
                    currentItems={currentItems}
                    itemsPerPage={itemsPerPage}
                    onEdit={(product) => {
                        setEditingProduct(product);
                        setFormData({
                            title: product.title,
                            price: product.price,
                            description: product.description,
                            content: product.content,
                            stock: product.stock,
                            categoryId: product.category.name,
                            genderId: product.gender.name,
                            merekId: product.merek.name,
                            thumbnail: null,
                            imageSlider: [],
                            slug: product.slug
                        });
                        handleOpenAddModal();
                    }}
                    onDelete={(id) => {
                        setDeletingProduct(id);
                        const modal = document.getElementById('delete_modal') as HTMLDialogElement;
                        modal?.showModal();
                    }}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <ProductModal
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories}
                    genders={genders}
                    mereks={mereks}
                    loading={loading}
                    editingProduct={editingProduct}
                    handleAddProduct={handleAddProduct}
                    handleEditProduct={handleEditProduct}
                    handleFileChange={handleFileChange}
                    resetForm={resetForm}
                />

                <DeleteModal
                    loading={loading}
                    onDelete={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            </div>
        </section>
    );
}
