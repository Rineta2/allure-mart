import { useState } from 'react';
import toast from 'react-hot-toast';
import { Category } from '@/components/pages/super-admins/products/category/schema/schema';

interface FormData {
    name: string;
}

export const useCategoryModal = (
    addCategory: (data: FormData) => Promise<boolean>,
    updateCategory: (id: string, data: FormData) => Promise<boolean>,
    deleteCategory: (id: string) => Promise<boolean>
) => {
    const [formData, setFormData] = useState<FormData>({ name: '' });
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

    const handleAddClick = () => {
        setEditingCategory(null);
        setFormData({ name: '' });
        const modal = document.getElementById('category_modal') as HTMLDialogElement;
        modal?.showModal();
    };

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name });
        const modal = document.getElementById('category_modal') as HTMLDialogElement;
        modal?.showModal();
    };

    const handleDeleteClick = (id: string) => {
        setDeletingCategory(id);
        const modal = document.getElementById('delete_modal') as HTMLDialogElement;
        modal?.showModal();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                const success = await updateCategory(editingCategory.id, formData);
                if (success) {
                    toast.success('Kategori berhasil diperbarui');
                } else {
                    toast.error('Gagal memperbarui kategori');
                }
            } else {
                const success = await addCategory(formData);
                if (success) {
                    toast.success('Kategori berhasil ditambahkan');
                } else {
                    toast.error('Gagal menambahkan kategori');
                }
            }
            setFormData({ name: '' });
            setEditingCategory(null);
            const modal = document.getElementById('category_modal') as HTMLDialogElement;
            modal?.close();
        } catch (error) {
            toast.error('Terjadi kesalahan');
            console.error('Error:', error);
        }
    };

    const handleDelete = async () => {
        if (deletingCategory) {
            try {
                const success = await deleteCategory(deletingCategory);
                if (success) {
                    toast.success('Kategori berhasil dihapus');
                } else {
                    toast.error('Gagal menghapus kategori');
                }
                setDeletingCategory(null);
                const modal = document.getElementById('delete_modal') as HTMLDialogElement;
                modal?.close();
            } catch (error) {
                toast.error('Terjadi kesalahan saat menghapus');
                console.error('Error:', error);
            }
        }
    };

    const handleCloseEditModal = () => {
        setEditingCategory(null);
        setFormData({ name: '' });
        const modal = document.getElementById('category_modal') as HTMLDialogElement;
        modal?.close();
    };

    const handleCloseDeleteModal = () => {
        setDeletingCategory(null);
        const modal = document.getElementById('delete_modal') as HTMLDialogElement;
        modal?.close();
    };

    return {
        formData,
        editingCategory,
        deletingCategory,
        setFormData,
        handleAddClick,
        handleEditClick,
        handleDeleteClick,
        handleSubmit,
        handleDelete,
        handleCloseEditModal,
        handleCloseDeleteModal
    };
};