import { TableRowSkeleton } from '@/components/helper/Skelaton';

import { CategoryTableProps } from '@/components/pages/super-admins/products/category/schema/schema';

export const CategoryTable: React.FC<CategoryTableProps> = ({
    loading,
    currentItems,
    itemsPerPage,
    currentPage,
    onEdit,
    onDelete
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">No</th>
                            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Nama Kategori</th>
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
                            currentItems.map((category, index) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">{category.name}</td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">{category.createdAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                onClick={() => onEdit(category)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(category.id)}
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
    );
};