import React from 'react';

import Select from 'react-select';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { CheckoutFormData, checkoutSchema, LocationOption, CheckoutFormProps } from '@/components/pages/checkout/hooks/schema/Checkout';

export default function CheckoutForm({
    user,
    locationOptions,
    isSearching,
    provinceOptions,
    onLocationSearch,
    onSubmit
}: CheckoutFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: user?.displayName?.split(' ')[0] || '',
            lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
            province: 'western',
            paymentMethod: 'bank-transfer',
            email: user?.email || ''
        }
    });

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/40 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            placeholder="John"
                            {...register('firstName')}
                            readOnly
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            placeholder="Doe"
                            {...register('lastName')}
                            readOnly
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                {/* Contact Fields */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-border/40 rounded-xl bg-gray-50 cursor-not-allowed"
                            placeholder="john@example.com"
                            {...register('email')}
                            readOnly
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full p-3 border border-border/40 rounded-xl"
                            placeholder="08123456789"
                            {...register('phone')}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                {/* Location Fields */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Area Location</label>
                        <Select
                            className="rounded-xl"
                            classNames={{
                                control: () =>
                                    `!rounded-xl !border ${errors.address ? '!border-red-500' : '!border-border/40'}`,
                            }}
                            options={locationOptions}
                            isLoading={isSearching}
                            onInputChange={(newValue) => {
                                if (newValue) {
                                    onLocationSearch(newValue);
                                }
                            }}
                            onChange={(selectedOption) => {
                                if (selectedOption) {
                                    const option = selectedOption as LocationOption;
                                    setValue('address', option);
                                    if (option.details) {
                                        setValue('city', option.details.city || '');
                                        const matchingProvince = provinceOptions.find(
                                            p => p.label.toLowerCase() === option.details?.state?.toLowerCase()
                                        );
                                        if (matchingProvince) {
                                            setValue('province', matchingProvince.value);
                                        }
                                        setValue('zipCode', option.details.postcode || '');
                                    }
                                }
                            }}
                            placeholder="Search your area..."
                            noOptionsMessage={() => "Type to search locations..."}
                            loadingMessage={() => "Searching..."}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Detail Address</label>
                        <textarea
                            className="w-full p-3 border border-border/40 rounded-xl"
                            rows={3}
                            placeholder="Enter your detail address..."
                            {...register('addressDetail')}
                        />
                        {errors.addressDetail && (
                            <p className="text-red-500 text-sm mt-1">{errors.addressDetail.message}</p>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-border/40 rounded-xl"
                                placeholder="City"
                                {...register('city')}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Province</label>
                            <Select
                                className="rounded-xl"
                                classNames={{
                                    control: () =>
                                        `!rounded-xl !border ${errors.province ? '!border-red-500' : '!border-border/40'}`,
                                }}
                                options={provinceOptions}
                                onChange={(option) => {
                                    if (option) {
                                        setValue('province', option.value);
                                    }
                                }}
                                placeholder="Select province..."
                            />
                            {errors.province && (
                                <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-border/40 rounded-xl"
                            placeholder="ZIP Code"
                            {...register('zipCode')}
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                        <textarea
                            className="w-full p-3 border border-border/40 rounded-xl"
                            rows={3}
                            placeholder="Notes about your order, e.g. special notes for delivery"
                            {...register('additionalInfo')}
                        />
                        {errors.additionalInfo && (
                            <p className="text-red-500 text-sm mt-1">{errors.additionalInfo.message}</p>
                        )}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-lg">Payment Method</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                value="bank-transfer"
                                className="w-4 h-4 text-primary"
                                {...register('paymentMethod')}
                            />
                            <div>
                                <span className="font-medium">Direct Bank Transfer</span>
                                <p className="text-sm text-gray-500 mt-1">Make your payment directly into our bank account.</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                value="cod"
                                className="w-4 h-4 text-primary"
                                {...register('paymentMethod')}
                            />
                            <div>
                                <span className="font-medium">Cash On Delivery</span>
                                <p className="text-sm text-gray-500 mt-1">Pay with cash upon delivery.</p>
                            </div>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium text-lg shadow-lg shadow-primary/30"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}