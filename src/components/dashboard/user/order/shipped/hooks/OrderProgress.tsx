import React from 'react';

const getOrderStatusIndex = (status: string) => {
    const statuses = ['pending', 'processing', 'packaging', 'shipped', 'delivered', 'completed'];
    return statuses.indexOf(status);
};

interface OrderProgressProps {
    status: string;
}

export const OrderProgress: React.FC<OrderProgressProps> = ({ status }) => {
    const steps = [
        { status: 'pending', label: 'Menunggu Pembayaran' },
        { status: 'processing', label: 'Pembayaran Berhasil' },
        { status: 'packaging', label: 'Sedang Dikemas' },
        { status: 'shipped', label: 'Dalam Pengiriman' },
        { status: 'delivered', label: 'Sudah Diterima' },
        { status: 'completed', label: 'Selesai' },
    ];

    const currentStep = getOrderStatusIndex(status);

    return (
        <div className="w-full py-6">
            <div className="relative">
                {/* Progress Bar */}
                <div className="absolute top-5 w-full h-[2px] bg-gray-200">
                    <div
                        className="absolute h-[2px] bg-blue-500 transition-all duration-500"
                        style={{
                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                        }}
                    />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => (
                        <div key={step.status} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center 
                                ${index <= currentStep
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                            >
                                {index <= currentStep ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="text-sm">{index + 1}</span>
                                )}
                            </div>
                            <span className={`mt-2 text-xs text-center w-24
                                ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}
                            `}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};