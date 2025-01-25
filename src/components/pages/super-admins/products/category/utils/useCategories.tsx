import { useState, useEffect, useMemo } from 'react';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/utils/firebase';

import { Category, FormData } from '@/components/pages/super-admins/products/category/schema/schema';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_PRODUCTS as string));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            })) as Category[];
            const sortedCategories = categoriesData.sort((a, b) =>
                b.createdAt.getTime() - a.createdAt.getTime()
            );
            setCategories(sortedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (formData: FormData) => {
        try {
            setLoading(true);
            await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_PRODUCTS as string), {
                ...formData,
                createdAt: new Date()
            });
            await fetchCategories();
            return true;
        } catch (error) {
            console.error('Error adding category:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id: string, formData: FormData) => {
        try {
            setLoading(true);
            await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_PRODUCTS as string, id), {
                name: formData.name,
                updatedAt: new Date()
            });
            await fetchCategories();
            return true;
        } catch (error) {
            console.error('Error updating category:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_PRODUCTS as string, id));
            await fetchCategories();
            return true;
        } catch (error) {
            console.error('Error deleting category:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter categories based on search term
    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    // Calculate pagination for filtered results
    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredCategories, currentPage]);

    // Calculate total pages based on filtered results
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return {
        categories: filteredCategories,
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
    };
};