import { CategoryModalProps } from '@/components/dashboard/super-admins/products/category/schema/schema';

export const CategoryModal: React.FC<CategoryModalProps> = ({
    loading,
    formData,
    editingCategory,
    onSubmit,
    onChange,
    onClose
}) => {
    return (
        <dialog id="category_modal" className="modal">
            <div className="modal-box bg-white max-w-md mx-auto p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-6">
                    {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                </h3>
                <form onSubmit={onSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700">Nama Kategori</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            value={formData.name}
                            onChange={(e) => onChange({ ...formData, name: e.target.value })}
                            required
                        />
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
                            ) : editingCategory ? 'Update' : 'Simpan'}
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            disabled={loading}
                            onClick={onClose}
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
    );
};