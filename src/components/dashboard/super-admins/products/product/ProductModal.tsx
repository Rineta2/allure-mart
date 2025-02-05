import React from "react";

import RichTextEditor from "@/components/helper/RichTextEditor";

import { ProductModalProps } from "@/components/dashboard/super-admins/products/product/schema/schema";

import { formatPrice, parsePrice } from "@/components/helper/formatters";

export const ProductModal: React.FC<ProductModalProps> = ({
    formData,
    setFormData,
    categories,
    genders,
    mereks,
    loading,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleFileChange,
    resetForm
}) => {
    return (
        <dialog id="product_modal" className="modal">
            <div className="modal-box bg-white max-w-6xl p-0 overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-gray-900">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button
                        onClick={resetForm}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <form id="product-form" onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Basic Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.title}
                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            setFormData({
                                                ...formData,
                                                title: newTitle,
                                                slug: newTitle.toLowerCase().replace(/ /g, '-')
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Slug</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="auto-generated-from-title"
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Price</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full bg-white pl-10 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            value={formatPrice(formData.price)}
                                            onChange={(e) => {
                                                const value = parsePrice(e.target.value);
                                                setFormData({ ...formData, price: value });
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories and Details */}
                        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Categories & Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Category</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.name} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Gender</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.genderId}
                                        onChange={(e) => setFormData({ ...formData, genderId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        {genders.map((gender) => (
                                            <option key={gender.name} value={gender.name}>
                                                {gender.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Merek</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.merekId}
                                        onChange={(e) => setFormData({ ...formData, merekId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Merek</option>
                                        {mereks.map((merek) => (
                                            <option key={merek.name} value={merek.name}>
                                                {merek.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Stock and Images */}
                        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Stock & Images
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Stock</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formatPrice(formData.stock)}
                                        onChange={(e) => {
                                            const value = parsePrice(e.target.value);
                                            setFormData({ ...formData, stock: value });
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Thumbnail</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'thumbnail')}
                                        required={!editingProduct}
                                    />
                                </div>
                                <div className="form-control w-full md:col-span-2">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Slider Images</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleFileChange(e, 'slider')}
                                        required={!editingProduct}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description and Content */}
                        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Description & Content
                            </h4>
                            <div className="space-y-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Short Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-sm font-medium text-gray-700">Detailed Content</span>
                                    </label>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(value: string) => setFormData({ ...formData, content: value })}
                                        className="min-h-[200px] bg-white rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={resetForm}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Loading...
                            </>
                        ) : editingProduct ? 'Update Product' : 'Save Product'}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};