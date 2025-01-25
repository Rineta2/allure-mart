import { DeleteModalProps } from '@/components/pages/super-admins/products/category/schema/schema';

export const DeleteModal: React.FC<DeleteModalProps> = ({
    loading,
    onConfirm,
    onClose
}) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="modal-box bg-white max-w-md mx-auto p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Konfirmasi Hapus</h3>
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="modal-action flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Loading...
                            </>
                        ) : (
                            'Hapus'
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
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
    );
};