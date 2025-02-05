import React from 'react';

import { DeleteModalProps } from '@/components/dashboard/super-admins/products/product/schema/schema';

export const DeleteModal: React.FC<DeleteModalProps> = ({
    loading,
    onDelete,
    onCancel
}) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="modal-box bg-white">
                <h3 className="font-bold text-xl mb-4">Confirm Delete</h3>
                <p>Are you sure you want to delete this product?</p>
                <div className="modal-action">
                    <button
                        className="btn btn-error"
                        onClick={onDelete}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Delete'}
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};