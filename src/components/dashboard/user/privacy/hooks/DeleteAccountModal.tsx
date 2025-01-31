import React from 'react';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Important</h2>

                <div className="text-sm text-gray-600 space-y-3">
                    <p>Dengan klik &apos;Melanjutkan&apos;, kamu setuju bahwa:</p>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>Setelah akun dihapus, kamu tidak dapat log in kembali dan melihat riwayat akun. Akun yang telah dihapus tidak dapat dikembalikan.</li>
                        <li>Koin yang tersisa akan hangus.</li>
                        <li>Penghapusan akun tidak dapat dilakukan jika kamu memiliki pesanan, penjualan dan/atau hal lain yang belum selesai, termasuk urusan hukum.</li>
                        <li>Setelah akunmu dihapus, kami mungkin masih menyimpan data tertentu sesuai dengan Kebijakan Privasi dan peraturan yang berlaku.</li>
                        <li>Kami berhak untuk menolak permintaan pembuatan akun baru olehmu di kemudian hari.</li>
                        <li>Penghapusan akun tidak membebaskanmu dari kewajiban dan/atau tanggung jawab yang masih berjalan.</li>
                    </ul>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Melanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}