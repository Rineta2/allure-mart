import { BankModalProps } from "@/components/pages/checkout/hooks/schema/Checkout";

export default function BankModal({
    show,
    onClose,
    onConfirm,
    total,
    bankAccounts
}: BankModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Bank Transfer Details</h3>
                <div className="space-y-4">
                    {bankAccounts.map((account, index) => (
                        <div key={index} className="p-4 border rounded-xl">
                            <h4 className="font-medium text-lg">{account.bankName}</h4>
                            <p className="text-gray-600">Account Number: {account.accountNumber}</p>
                            <p className="text-gray-600">Account Holder: {account.accountHolder}</p>
                        </div>
                    ))}
                    <div className="text-sm text-gray-500 mt-4">
                        <p>Please transfer the exact amount and confirm your payment below.</p>
                        <p className="font-medium mt-2">Total Amount: ${total.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-2 px-4 bg-primary text-white rounded-xl hover:bg-primary/90"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}