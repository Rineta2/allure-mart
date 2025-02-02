import React from 'react';

export const EmptyOrderState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16 sm:py-24">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mb-8 animate-float">
                <svg
                    className="w-full h-full drop-shadow-xl"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Box base */}
                    <path
                        d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                        className="fill-blue-50"
                    />
                    {/* Box top */}
                    <path
                        d="M19 8V16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16V8C5 6.34315 6.34315 5 8 5H16C17.6569 5 19 6.34315 19 8Z"
                        className="fill-white"
                    />
                    {/* Box details */}
                    <path
                        d="M8 11H16M8 15H12"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    {/* Shipping icon */}
                    <path
                        d="M15 3.5V2M12 3.5V2M9 3.5V2"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    {/* Decorative elements */}
                    <circle cx="18" cy="14" r="1" className="fill-blue-100" />
                    <circle cx="6" cy="10" r="1" className="fill-blue-100" />
                    <circle cx="10" cy="18" r="1" className="fill-blue-100" />
                </svg>
            </div>
            <div className="text-center space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    No Shipped Orders
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
                    You don&apos;t have any shipped orders at the moment. Your shipped orders will appear here.
                </p>
            </div>
        </div>
    );
};