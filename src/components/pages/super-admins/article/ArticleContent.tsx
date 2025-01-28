"use client"
import React, { useState, useEffect } from 'react'

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import imagekitInstance from '@/utils/imageKit'

import Image from 'next/image'

import { toast } from 'react-hot-toast'

import RichTextEditor from '@/components/helper/RichTextEditor'

import { Article, ArticleFormData, Category, Account } from '@/components/pages/super-admins/article/schema/schema'

export default function ArticleContent() {
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [authors, setAuthors] = useState<Account[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [formData, setFormData] = useState<ArticleFormData>({
        title: '',
        content: '',
        description: '',
        image: null,
        categoryName: '',
        authorId: ''
    })

    // Add generateSlug function here, at the component level
    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
    }

    // Fetch articles and categories
    useEffect(() => {
        fetchArticles()
        fetchCategories()
        fetchAuthors()
    }, [])

    const fetchArticles = async () => {
        try {
            const articlesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string)
            const snapshot = await getDocs(articlesRef)
            const articlesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Article[]
            setArticles(articlesData)
        } catch {
            toast.error('Gagal mengambil data artikel')
        }
    }

    const fetchCategories = async () => {
        try {
            const categoriesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLES as string)
            const snapshot = await getDocs(categoriesRef)
            const categoriesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Category[]
            setCategories(categoriesData)
        } catch {
            toast.error('Gagal mengambil data kategori')
        }
    }

    const fetchAuthors = async () => {
        try {
            const accountsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
            const snapshot = await getDocs(accountsRef)
            const accountsData = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setAuthors(accountsData as Account[])
        } catch {
            toast.error('Gagal mengambil data penulis')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = selectedArticle?.imageUrl || ''

            // Check if formData.image exists and is a File
            const imageFile = formData.image
            if (imageFile && imageFile instanceof File) {
                // Convert File to base64
                const reader = new FileReader()
                const base64Image = await new Promise<string>((resolve) => {
                    reader.onload = () => resolve(reader.result as string)
                    reader.readAsDataURL(imageFile)
                })

                // Upload to Imagekit
                const uploadResponse = await imagekitInstance.upload({
                    file: base64Image,
                    fileName: `article-${Date.now()}`,
                    folder: '/articles'
                })
                imageUrl = uploadResponse.url
            }

            const articleData = {
                title: formData.title,
                content: formData.content,
                description: formData.description,
                imageUrl,
                categoryName: formData.categoryName,
                slug: generateSlug(formData.title),
                authorId: formData.authorId,
                authorName: authors.find(author => author.uid === formData.authorId)?.displayName || '',
                authorRole: authors.find(author => author.uid === formData.authorId)?.role || '',
                authorPhoto: authors.find(author => author.uid === formData.authorId)?.photoURL || '',
                updatedAt: new Date().toISOString()
            }

            if (selectedArticle) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string, selectedArticle.id), articleData)
                toast.success('Artikel berhasil diperbarui')
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string), {
                    ...articleData,
                    createdAt: new Date().toISOString()
                })
                toast.success('Artikel berhasil ditambahkan')
            }

            // Reset form and refresh articles
            await fetchArticles() // Refresh the articles list first
            resetForm() // Then reset the form

            // Show modal again with fresh state if adding new article
            const modal = document.getElementById('article_modal') as HTMLDialogElement
            if (!selectedArticle) {
                setFormData({
                    title: '',
                    content: '',
                    description: '',
                    image: null,
                    categoryName: '',
                    authorId: ''
                })
                modal?.showModal()
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Terjadi kesalahan saat menyimpan artikel')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            try {
                await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string, id))
                toast.success('Artikel berhasil dihapus')
                fetchArticles()
            } catch {
                toast.error('Gagal menghapus artikel')
            }
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            description: '',
            image: null,
            categoryName: '',
            authorId: ''
        })
        setSelectedArticle(null)

        // Close the modal
        const modal = document.getElementById('article_modal') as HTMLDialogElement
        if (modal) {
            modal.close()
        }
    }

    return (
        <section className='p-4 min-h-full bg-gray-50'>
            <div className="container max-w-7xl mx-auto">
                {/* Header Section - modernized */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className='text-2xl font-bold text-gray-900'>Daftar Article</h1>
                            <p className='text-sm text-gray-500'>Daftar semua article yang sudah terdaftar</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0 md:min-w-[300px]">
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Cari Article..."
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <button
                                className="btn bg-primary hover:bg-text text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-all"
                                onClick={() => {
                                    const modal = document.getElementById('article_modal') as HTMLDialogElement;
                                    modal?.showModal();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Tambah Article
                            </button>
                        </div>
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    [...Array(10)].map((_, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    articles.map((article) => (
                                        <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                                                    <Image
                                                        src={article.imageUrl}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 text-sm text-primary bg-primary/10 rounded-full">
                                                    {article.categoryName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedArticle(article)
                                                            setFormData({
                                                                title: article.title,
                                                                content: article.content,
                                                                description: article.description,
                                                                image: null,
                                                                categoryName: article.categoryName,
                                                                authorId: article.authorId
                                                            })
                                                            const modal = document.getElementById('article_modal') as HTMLDialogElement
                                                            modal?.showModal()
                                                        }}
                                                        className="text-primary hover:text-primary/80 font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        className="text-red-600 hover:text-red-700 font-medium"
                                                    >
                                                        Delete
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

                {/* Article Modal */}
                <dialog id="article_modal" className="modal">
                    <div className="modal-box max-w-4xl w-full bg-white p-0 rounded-xl overflow-scroll scrollbar-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {selectedArticle ? 'Edit Article' : 'Add New Article'}
                                </h3>
                                <button
                                    onClick={resetForm}
                                    className="btn btn-ghost btn-sm p-0 hover:bg-transparent"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title Field */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="input input-bordered w-full bg-white focus:ring-2 focus:ring-primary/20"
                                            required
                                        />
                                    </div>

                                    {/* Slug Field */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-2">Slug</label>
                                        <input
                                            type="text"
                                            value={generateSlug(formData.title)}
                                            className="input input-bordered w-full bg-gray-50 cursor-not-allowed"
                                            disabled
                                            readOnly
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Automatically generated from title</p>
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="textarea textarea-bordered w-full h-24 bg-white focus:ring-2 focus:ring-primary/20"
                                        placeholder="Enter a brief description of the article..."
                                        required
                                    />
                                </div>

                                {/* Category Field */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={formData.categoryName}
                                        onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                                        className="select select-bordered w-full bg-white focus:ring-2 focus:ring-primary/20"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Author Field */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Author</label>
                                    <select
                                        value={formData.authorId}
                                        onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                        className="select select-bordered w-full bg-white focus:ring-2 focus:ring-primary/20"
                                        required
                                    >
                                        <option value="">Select Author</option>
                                        {authors.map((author) => (
                                            <option key={author.id} value={author.uid}>
                                                {author.displayName} ({author.role})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Content Field */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Content</label>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                        placeholder="Write your article content..."
                                        className="min-h-[200px] border rounded-lg focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Image Upload Field */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                        className="file-input file-input-bordered w-full bg-white focus:ring-2 focus:ring-primary/20"
                                        required={!selectedArticle}
                                    />
                                </div>

                                {/* Move Modal Footer inside the form */}
                                <div className="border-t pt-6 mt-6">
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="btn btn-ghost hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn bg-primary hover:bg-text text-white min-w-[100px]"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="loading loading-spinner loading-sm"></span>
                                            ) : (
                                                'Save'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </section>
    )
}