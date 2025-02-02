interface CancelConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const CancelConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel
}: CancelConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Cancel Order</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to cancel this order? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl 
                        font-medium hover:bg-red-700 transition-colors"
                    >
                        Yes, Cancel Order
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl 
                        font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        No, Keep Order
                    </button>
                </div>
            </div>
        </div>
    );
};