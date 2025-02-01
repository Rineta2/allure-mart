"use client"

import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { useAuth } from '@/components/router/auth/AuthContext';

import { db } from '@/utils/firebase';

import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import toast from 'react-hot-toast';

import { Address, UserAccount } from '@/components/dashboard/user/profile/address/schema/auth';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { divIcon } from 'leaflet';

import { renderToString } from 'react-dom/server';

import AddressSkelaton from '@/components/dashboard/user/profile/address/AdressSkelaton';

import { LocationResult, Coordinates, OpenCageResult } from '@/components/dashboard/user/profile/address/schema/auth';

// Custom marker icon menggunakan React Icons
const customIcon = divIcon({
    html: renderToString(
        <FaMapMarkerAlt
            style={{
                color: '#ef4444', // Warna merah (sesuaikan dengan theme Anda)
                fontSize: '32px'
            }}
        />
    ),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

// Komponen untuk menangani klik pada peta
function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function AddressContent() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Address[]>((user as UserAccount)?.addresses || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        postalCode: '',
        streetAddress: '',
        details: '',
        isDefault: false,
        type: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Default center (Indonesia)
    const defaultCenter: [number, number] = [-6.200000, 106.816666];

    // Add useEffect to handle body scroll
    useEffect(() => {
        if (isModalOpen || isMapModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, isMapModalOpen]);

    // Add useEffect to simulate loading
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            province: '',
            city: '',
            district: '',
            postalCode: '',
            streetAddress: '',
            details: '',
            isDefault: false,
            type: ''
        });
        setCurrentAddress(null);
        setSearchQuery('');
        setSelectedLocation(null);
        setLocationResults([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure we have coordinates from selectedLocation
        const districtCoordinates = selectedLocation
            ? `${selectedLocation.lat},${selectedLocation.lng}`
            : "";

        // Create address data with coordinates
        const addressData: Address = {
            id: currentAddress?.id || Date.now().toString(),
            ...formData,
            district: districtCoordinates
        };

        try {
            if (!user?.uid) return;

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);

            if (currentAddress) {
                const updatedAddresses = addresses.map(addr =>
                    addr.id === currentAddress.id ? addressData : addr
                );
                await updateDoc(userRef, { addresses: updatedAddresses });
                toast.success('Alamat berhasil diperbarui');
            } else {
                await updateDoc(userRef, {
                    addresses: arrayUnion(addressData)
                });
                toast.success('Alamat berhasil ditambahkan');
            }

            setAddresses(prev => currentAddress
                ? prev.map(addr => addr.id === currentAddress.id ? addressData : addr)
                : [...prev, addressData]
            );

            setIsModalOpen(false);
            resetForm();
        } catch {
            toast.error('Terjadi kesalahan saat menyimpan alamat');
        }
    };

    const handleDelete = async (addressId: string) => {
        try {
            if (!user?.uid) return;

            const addressToDelete = addresses.find(addr => addr.id === addressId);
            if (!addressToDelete) return;

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await updateDoc(userRef, {
                addresses: arrayRemove(addressToDelete)
            });

            setAddresses(prev => prev.filter(addr => addr.id !== addressId));
            toast.success('Alamat berhasil dihapus');
        } catch {
            toast.error('Terjadi kesalahan saat menghapus alamat');
        }
    };

    const handleEdit = (address: Address) => {
        setCurrentAddress(address);
        setFormData({
            fullName: address.fullName,
            phone: address.phone,
            province: address.province,
            city: address.city,
            district: address.district,
            postalCode: address.postalCode,
            streetAddress: address.streetAddress,
            details: address.details || '',
            isDefault: address.isDefault,
            type: address.type
        });
        setIsModalOpen(true);
    };

    const searchLocations = async (query: string) => {
        if (!query || query.length < 3) {
            setLocationResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    query
                )}&countrycode=id&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
            );
            const data = await response.json();

            if (data.results) {
                const formattedResults: LocationResult[] = data.results.map((result: OpenCageResult) => {
                    const components = result.components;
                    return {
                        formatted: result.formatted,
                        province: components.state || '',
                        city: components.city || components.county || '',
                        district: `${result.geometry.lat},${result.geometry.lng}`,
                        postalCode: components.postcode || '',
                        coordinates: {
                            lat: result.geometry.lat,
                            lng: result.geometry.lng
                        }
                    };
                });
                setLocationResults(formattedResults);
            }
        } catch {
            toast.error('Gagal mengambil data lokasi');
        } finally {
            setIsSearching(false);
        }
    };

    const handleLocationSelect = async (lat: number, lng: number) => {
        const newLocation = { lat, lng };
        setSelectedLocation(newLocation);

        const coordinatesString = `${lat},${lng}`;
        setFormData(prev => ({
            ...prev,
            district: coordinatesString
        }));

        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
            );
            const data = await response.json();

            if (data.results && data.results[0]) {
                const result = data.results[0];
                const components = result.components;

                setFormData(prev => ({
                    ...prev,
                    province: components.state || components.province || prev.province || 'Tidak diketahui',
                    city: components.city || components.county || components.municipality || prev.city || 'Tidak diketahui',
                    district: coordinatesString,
                    postalCode: components.postcode || prev.postalCode || 'Tidak diketahui',
                    streetAddress: components.road ?
                        `${components.road}${components.house_number ? `, No. ${components.house_number}` : ''}` :
                        result.formatted
                }));
            }
        } catch {
            toast.error('Gagal mendapatkan detail alamat');
        }
    };

    const handleSetDefault = async (addressId: string) => {
        try {
            if (!user?.uid) return;

            // Create new array with the selected address as default and move it to top
            const selectedAddress = addresses.find(addr => addr.id === addressId);
            if (!selectedAddress) return;

            const otherAddresses = addresses.filter(addr => addr.id !== addressId);
            const updatedAddresses = [
                { ...selectedAddress, isDefault: true },
                ...otherAddresses.map(addr => ({ ...addr, isDefault: false }))
            ];

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await updateDoc(userRef, {
                addresses: updatedAddresses
            });

            setAddresses(updatedAddresses);
            toast.success('Alamat utama berhasil diubah');
        } catch {
            toast.error('Terjadi kesalahan saat mengubah alamat utama');
        }
    };

    return (
        <>
            {loading ? (
                <AddressSkelaton />
            ) : (
                <section className="py-8 sm:py-12 min-h-full">
                    <div className="container max-w-6xl mx-auto">
                        {/* Header Section with improved styling */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-title">
                                    Alamat Saya
                                </h1>
                                <p className="text-gray-500 mt-1">Kelola alamat pengiriman Anda</p>
                            </div>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl 
                                transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
                                flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                            >
                                <span className="text-xl">+</span>
                                Tambah Alamat
                            </button>
                        </div>

                        {/* Address List with improved card design */}
                        <div className="grid gap-6">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200
                                    border border-gray-100 hover:border-primary/20"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold text-lg">{address.fullName}</h3>
                                                <span className="text-gray-300">|</span>
                                                <p className="text-gray-600">{address.phone}</p>
                                                {address.isDefault && (
                                                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                                                        Utama
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700">{address.streetAddress}</p>
                                            <p className="text-gray-600">
                                                {address.city}, {address.province}, {address.postalCode}
                                            </p>
                                            {address.type && (
                                                <span className="inline-block px-4 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-full">
                                                    {address.type === 'rumah' ? '🏠 Alamat Rumah' : '🏢 Alamat Kantor'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                            <button
                                                onClick={() => handleEdit(address)}
                                                className="flex-1 sm:flex-none px-4 py-2 text-blue-600 hover:bg-blue-50 
                                                rounded-lg transition-colors duration-200"
                                            >
                                                Ubah
                                            </button>
                                            <button
                                                onClick={() => handleDelete(address.id)}
                                                className="flex-1 sm:flex-none px-4 py-2 text-red-600 hover:bg-red-50 
                                                rounded-lg transition-colors duration-200"
                                            >
                                                Hapus
                                            </button>
                                            {!address.isDefault && (
                                                <button
                                                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg 
                                                    hover:bg-gray-50 transition-all duration-200 text-sm"
                                                    onClick={() => handleSetDefault(address.id)}
                                                >
                                                    Atur sebagai utama
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal styling improvements */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Alamat Baru</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 
                                                focus:ring-primary/20 focus:border-primary outline-none transition-all
                                                placeholder:text-gray-400"
                                                placeholder="Nama Lengkap"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 
                                                focus:ring-primary/20 focus:border-primary outline-none transition-all
                                                placeholder:text-gray-400"
                                                placeholder="Nomor Telepon"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchQuery(value);
                                                    searchLocations(value);
                                                }}
                                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 
                                                focus:ring-primary/20 focus:border-primary outline-none transition-all
                                                placeholder:text-gray-400"
                                                placeholder="Cari lokasi (min. 3 karakter)"
                                            />

                                            {isSearching && (
                                                <div className="absolute inset-x-0 top-full mt-1 bg-white border rounded-md shadow-lg z-50 p-2">
                                                    <div className="text-center text-gray-500">Mencari...</div>
                                                </div>
                                            )}

                                            {!isSearching && locationResults.length > 0 && (
                                                <div className="absolute inset-x-0 top-full mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                                    {locationResults.map((location, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                            onClick={() => {
                                                                if (location.coordinates) {
                                                                    setFormData({
                                                                        ...formData,
                                                                        province: location.province,
                                                                        city: location.city,
                                                                        district: `${location.coordinates.lat},${location.coordinates.lng}`,
                                                                        postalCode: location.postalCode,
                                                                    });
                                                                    setSelectedLocation(location.coordinates);
                                                                }
                                                                setSearchQuery(location.formatted);
                                                                setLocationResults([]);
                                                            }}
                                                        >
                                                            {location.formatted}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.streetAddress}
                                                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 
                                                focus:ring-primary/20 focus:border-primary outline-none transition-all
                                                placeholder:text-gray-400"
                                                placeholder="Nama Jalan, Gedung, No. Rumah"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.details}
                                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 
                                                focus:ring-primary/20 focus:border-primary outline-none transition-all
                                                placeholder:text-gray-400"
                                                placeholder="Detail Lainnya (Cth: Blok / Unit No., Patokan)"
                                            />
                                        </div>

                                        {/* Map Section */}
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            {selectedLocation ? (
                                                <div className="h-48 rounded-lg overflow-hidden">
                                                    <MapContainer
                                                        center={[selectedLocation.lat, selectedLocation.lng]}
                                                        zoom={15}
                                                        style={{ height: '100%', width: '100%' }}
                                                        dragging={false}
                                                        scrollWheelZoom={false}
                                                    >
                                                        <TileLayer
                                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        />
                                                        <Marker
                                                            position={[selectedLocation.lat, selectedLocation.lng]}
                                                            icon={customIcon}
                                                        />
                                                    </MapContainer>
                                                    <div className="mt-2 text-sm text-gray-500 p-2">
                                                        Koordinat: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
                                                    <button
                                                        type="button"
                                                        className="text-gray-500 flex items-center gap-2 hover:text-primary transition-colors"
                                                        onClick={() => setIsMapModalOpen(true)}
                                                    >
                                                        <span className="text-xl">+</span> Tambah Lokasi
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Address Type Selection */}
                                        <div className="space-y-2">
                                            <p className="text-gray-700 font-medium">Tandai Sebagai:</p>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="rumah"
                                                        checked={formData.type === 'rumah'}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-4 h-4 text-primary"
                                                    />
                                                    <span className="text-gray-700">Rumah</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="kantor"
                                                        checked={formData.type === 'kantor'}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-4 h-4 text-primary"
                                                    />
                                                    <span className="text-gray-700">Kantor</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Nanti Saja
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Map Modal */}
                        {isMapModalOpen && (
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">Pilih Lokasi</h3>
                                        <button
                                            onClick={() => setIsMapModalOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="h-[400px] mb-6 rounded-xl overflow-hidden">
                                        <MapContainer
                                            center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter}
                                            zoom={13}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <MapEvents onLocationSelect={handleLocationSelect} />
                                            {selectedLocation && (
                                                <Marker
                                                    position={[selectedLocation.lat, selectedLocation.lng]}
                                                    icon={customIcon}
                                                />
                                            )}
                                        </MapContainer>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setIsMapModalOpen(false)}
                                            className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (selectedLocation) {
                                                    setIsMapModalOpen(false);
                                                } else {
                                                    toast.error('Silakan pilih lokasi terlebih dahulu');
                                                }
                                            }}
                                            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Pilih Lokasi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
