"use client"

import React, { useEffect, useState } from 'react'

import { getOrders, Order } from '@/components/dashboard/seller/order/order/utils/getOrders'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import ComplatedSkelaton from '@/components/dashboard/seller/order/complate/ComplatedSkelaton'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/helper/dialog"

import logo from "../../../../../../public/icon.png"

import JsBarcode from 'jsbarcode'

type OrderItem = {
    name: string;
    thumbnail: string;
    quantity: number;
    price: number;
}

export default function ComplatedContent() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImages, setSelectedImages] = useState<OrderItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders()
                const activeOrders = data.filter(order => order.orderStatus === 'completed')
                setOrders(activeOrders)
            } catch (error) {
                console.error("Error fetching orders:", error)
                toast.error("Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order => {
        const searchLower = searchQuery.toLowerCase()
        return order.displayName.toLowerCase().includes(searchLower) ||
            order.id.toString().includes(searchQuery)
    })

    const generateBarcodeDataUrl = (orderId: string) => {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, orderId, {
            format: "CODE128",
            width: 1.5,
            height: 40,
            displayValue: true,
            fontSize: 8,
            margin: 5
        });
        return canvas.toDataURL('image/png');
    };

    const getLogoDataUrl = () => {
        return new Promise<string>((resolve) => {
            const img = document.createElement('img');
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    resolve('');
                }
            };
            img.src = logo.src;
        });
    };

    const handlePrint = async (order: Order) => {
        const [barcodeDataUrl, logoDataUrl] = await Promise.all([
            generateBarcodeDataUrl(order.id),
            getLogoDataUrl()
        ]);

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const printContent = `
            <html>
            <head>
                <title>Order #${order.id}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    body { 
                        font-family: 'Inter', sans-serif;
                        padding: 0;
                        margin: 0;
                        background: #fff;
                        font-size: 8px;
                    }
                    .container {
                        width: 105mm;
                        height: 148mm;
                        margin: 0;
                        padding: 5mm;
                        box-sizing: border-box;
                        border: 1px solid #000;
                    }
                    .header {
                        text-align: left;
                        margin-bottom: 3mm;
                        padding-bottom: 2mm;
                        border-bottom: 0.5px solid #e5e7eb;
                        display: flex;
                        align-items: center;
                        gap: 2mm;
                    }
                    .logo {
                        width: 8mm;
                        height: 8mm;
                        object-fit: contain;
                    }
                    .header-text {
                        flex: 1;
                    }
                    .store-name {
                        font-size: 12px;
                        font-weight: 700;
                    }
                    .order-number {
                        font-size: 8px;
                        color: #000;
                        margin-top: 1mm;
                    }
                    .barcode-section {
                        text-align: center;
                        margin: 3mm 0;
                        padding: 2mm;
                        border: 0.5px solid #e5e7eb;
                        border-radius: 2mm;
                    }
                    .barcode-section img {
                        width: 90%;
                        max-height: 15mm;
                    }
                    .section {
                        margin-bottom: 3mm;
                        padding: 2mm;
                        border: 0.5px solid #e5e7eb;
                        border-radius: 2mm;
                    }
                    .section-title {
                        font-size: 9px;
                        font-weight: 600;
                        margin-bottom: 2mm;
                        padding-bottom: 1mm;
                        border-bottom: 0.5px solid #e5e7eb;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 20mm 1fr;
                        gap: 1mm;
                        font-size: 8px;
                    }
                    .label {
                        font-weight: 500;
                    }
                    .value {
                        color: #000;
                    }
                    .product-list {
                        margin-top: 2mm;
                    }
                    .product-item {
                        display: flex;
                        justify-content: space-between;
                        padding: 1mm 0;
                        border-bottom: 0.5px solid #e5e7eb;
                    }
                    .product-item:last-child {
                        border-bottom: none;
                    }
                    .product-name {
                        font-weight: 500;
                    }
                    .product-price {
                        text-align: right;
                    }
                    .total-section {
                        margin-top: 2mm;
                        padding-top: 2mm;
                        text-align: right;
                        font-weight: 700;
                        font-size: 9px;
                        border-top: 0.5px solid #e5e7eb;
                    }
                    @media print {
                        @page {
                            size: 105mm 148mm;
                            margin: 0;
                        }
                        html, body {
                            width: 105mm;
                            height: 148mm;
                        }
                        .container {
                            page-break-after: always;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="${logoDataUrl}" alt="Logo" class="logo">
                        <div class="header-text">
                            <div class="store-name">ALLURE MART</div>
                            <div class="order-number">${order.id}</div>
                        </div>
                    </div>

                    <div class="barcode-section">
                        <img src="${barcodeDataUrl}" alt="Barcode ${order.id}">
                    </div>

                    <div class="section">
                        <div class="section-title">Informasi Pengiriman</div>
                        <div class="info-grid">
                            <div class="label">Pengirim:</div>
                            <div class="value">ALLURE MART</div>
                            <div class="label">Alamat:</div>
                            <div class="value">${order.address}</div>
                            <div class="label">Kota:</div>
                            <div class="value">${order.city}</div>
                            <div class="label">Kode Pos:</div>
                            <div class="value">${order.zipCode}</div>
                            <div class="label">No. Telepon:</div>
                            <div class="value">${order.phone}</div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Detail Produk</div>
                        <div class="product-list">
                            ${order.items.map(item => `
                                <div class="product-item">
                                    <div class="product-name">
                                        ${item.name}
                                        <div style="font-size: 7px; color: #666;">
                                            ${item.quantity}x @ Rp ${item.price.toLocaleString()}
                                        </div>
                                    </div>
                                    <div class="product-price">
                                        Rp ${(item.quantity * item.price).toLocaleString()}
                                    </div>
                                </div>
                            `).join('')}
                            
                            <div class="total-section">
                                <div style="margin-bottom: 1mm; font-size: 8px;">Total Pembayaran</div>
                                <div>
                                    Rp ${order.totalAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const handlePrintSelected = async () => {
        const logoDataUrl = await getLogoDataUrl();

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const selectedOrdersData = selectedOrders
            .map(orderId => orders.find(o => o.id.toString() === orderId))
            .filter(order => order) as Order[];

        const printContent = `
            <html>
            <head>
                <title>Multiple Orders</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    body { 
                        font-family: 'Inter', sans-serif;
                        padding: 0;
                        margin: 0;
                        background: #fff;
                        font-size: 8px;
                    }
                    .container {
                        width: 105mm;
                        height: 148mm;
                        margin: 0 auto;
                        padding: 5mm;
                        box-sizing: border-box;
                        page-break-after: always;
                        border: 1px solid #000;
                    }
                    .header {
                        text-align: left;
                        margin-bottom: 3mm;
                        padding-bottom: 2mm;
                        border-bottom: 0.5px solid #e5e7eb;
                        display: flex;
                        align-items: center;
                        gap: 2mm;
                    }
                    .logo {
                        width: 8mm;
                        height: 8mm;
                        object-fit: contain;
                    }
                    .header-text {
                        flex: 1;
                    }
                    .store-name {
                        font-size: 12px;
                        font-weight: 700;
                    }
                    .order-number {
                        font-size: 8px;
                        color: #000;
                        margin-top: 1mm;
                    }
                    .barcode-section {
                        text-align: center;
                        margin: 3mm 0;
                        padding: 2mm;
                        border: 0.5px solid #e5e7eb;
                        border-radius: 2mm;
                    }
                    .barcode-section img {
                        width: auto;
                        max-width: 90%;
                        height: 15mm;
                        object-fit: contain;
                    }
                    .section {
                        margin-bottom: 3mm;
                        padding: 2mm;
                        border: 0.5px solid #e5e7eb;
                        border-radius: 2mm;
                    }
                    .section-title {
                        font-size: 9px;
                        font-weight: 600;
                        margin-bottom: 2mm;
                        padding-bottom: 1mm;
                        border-bottom: 0.5px solid #e5e7eb;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 20mm 1fr;
                        gap: 1mm;
                    }
                    .label {
                        font-weight: 500;
                    }
                    .value {
                        color: #000;
                    }
                    .product-list {
                        margin-top: 2mm;
                    }
                    .product-item {
                        display: flex;
                        justify-content: space-between;
                        padding: 1mm 0;
                        border-bottom: 0.5px solid #e5e7eb;
                    }
                    .product-item:last-child {
                        border-bottom: none;
                    }
                    .total-section {
                        margin-top: 2mm;
                        padding-top: 2mm;
                        text-align: right;
                        font-weight: 700;
                        font-size: 9px;
                        border-top: 0.5px solid #e5e7eb;
                    }
                    @media print {
                        @page {
                            size: 105mm 148mm;
                            margin: 0;
                        }
                        html, body {
                            width: 105mm;
                            height: 148mm;
                        }
                        .container {
                            page-break-after: always;
                        }
                        .container:last-child {
                            page-break-after: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                ${selectedOrdersData.map(order => {
            const barcodeDataUrl = generateBarcodeDataUrl(order.id);
            return `
                        <div class="container">
                            <div class="header">
                                <img src="${logoDataUrl}" alt="Logo" class="logo">
                                <div class="header-text">
                                    <div class="store-name">ALLURE MART</div>
                                    <div class="order-number">${order.id}</div>
                                </div>
                            </div>

                            <div class="barcode-section">
                                <img src="${barcodeDataUrl}" alt="Barcode ${order.id}">
                            </div>

                            <div class="section">
                                <div class="section-title">Informasi Pengiriman</div>
                                <div class="info-grid">
                                    <div class="label">Pengirim:</div>
                                    <div class="value">ALLURE MART</div>
                                    <div class="label">Alamat:</div>
                                    <div class="value">${order.address}</div>
                                    <div class="label">Kota:</div>
                                    <div class="value">${order.city}</div>
                                    <div class="label">Kode Pos:</div>
                                    <div class="value">${order.zipCode}</div>
                                    <div class="label">No. Telepon:</div>
                                    <div class="value">${order.phone}</div>
                                </div>
                            </div>

                            <div class="section">
                                <div class="section-title">Detail Produk</div>
                                <div class="product-list">
                                    ${order.items.map(item => `
                                        <div class="product-item">
                                            <div class="product-name">
                                                ${item.name}
                                                <div style="font-size: 7px; color: #666;">
                                                    ${item.quantity}x @ Rp ${item.price.toLocaleString()}
                                                </div>
                                            </div>
                                            <div class="product-price">
                                                Rp ${(item.quantity * item.price).toLocaleString()}
                                            </div>
                                        </div>
                                    `).join('')}
                                    
                                    <div class="total-section">
                                        <div style="margin-bottom: 1mm; font-size: 8px;">Total Pembayaran</div>
                                        <div>
                                            Rp ${order.totalAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allOrderIds = filteredOrders.map(order => order.id.toString());
            setSelectedOrders(allOrderIds);
        } else {
            setSelectedOrders([]);
        }
    };

    if (loading) {
        return <ComplatedSkelaton />
    }

    return (
        <section className="py-12 min-h-full">
            <div className="container">
                <div className="flex flex-col gap-12">
                    <div className="flex justify-start sm:justify-between sm:flex-row flex-col items-start sm:items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold text-gray-900">Pesanan Selesai</h1>
                            <p className="text-base text-gray-600">Daftar pesanan yang telah selesai</p>
                        </div>

                        <div className="flex w-fit gap-4 items-center">
                            <button
                                onClick={() => handleSelectAll(selectedOrders.length !== filteredOrders.length)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                {selectedOrders.length === filteredOrders.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                            </button>

                            {selectedOrders.length > 0 && (
                                <button
                                    onClick={handlePrintSelected}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Cetak {selectedOrders.length} Label
                                </button>
                            )}

                            <input
                                placeholder="Cari pesanan"
                                className="w-full max-w-full sm:max-w-fit p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {filteredOrders.map(order => (
                            <div
                                key={order.id}
                                onClick={() => {
                                    if (selectedOrders.includes(order.id.toString())) {
                                        setSelectedOrders(selectedOrders.filter(id => id !== order.id.toString()));
                                    } else {
                                        setSelectedOrders([...selectedOrders, order.id.toString()]);
                                    }
                                }}
                                className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border cursor-pointer ${selectedOrders.includes(order.id.toString())
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-100'
                                    } w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]`}
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="label-text">Order #{order.id}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {order.orderStatus}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
                                        <p className="font-medium text-gray-900">Informasi Pembeli</p>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={order.photoURL}
                                                alt={order.displayName}
                                                width={60}
                                                height={60}
                                                className="rounded-full ring-2 ring-gray-100"
                                            />
                                            <div className="space-y-1">
                                                <p className="text-gray-900">{order.displayName}</p>
                                                <p className="text-gray-600 text-sm">{order.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 space-y-2">
                                        <p className="font-medium text-gray-900">Informasi Penerima</p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p><span className="font-medium">Nama:</span> {order.fullName}</p>
                                            <p><span className="font-medium">Email:</span> {order.email}</p>
                                            <p><span className="font-medium">No. Telepon:</span> {order.phone}</p>
                                            <p><span className="font-medium">Alamat:</span> {order.address}, {order.addressDetail}, {order.city}, {order.province}, {order.zipCode}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="font-medium text-gray-900 mb-4">Detail Produk</p>
                                        <div className="space-y-4">
                                            {order.items.length > 0 && (
                                                <div className="relative">
                                                    <div className="flex gap-4">
                                                        <Image
                                                            src={order.items[0].thumbnail}
                                                            alt={order.items[0].name}
                                                            width={120}
                                                            height={120}
                                                            className="rounded-lg object-cover"
                                                        />
                                                        <div className="text-sm space-y-1 text-gray-600">
                                                            <p className="font-medium text-gray-900">{order.items[0].name}</p>
                                                            <p>Jumlah: {order.items[0].quantity}</p>
                                                            <p>Harga: Rp {order.items[0].price.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    {order.items.length > 1 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedImages(order.items)
                                                                setIsModalOpen(true)
                                                            }}
                                                            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                                                        >
                                                            Lihat Semua ({order.items.length - 1} produk lainnya)
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePrint(order)
                                            }}
                                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Cetak Label
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="font-medium text-gray-600">Total Pembayaran</p>
                                        <p className="text-xl font-bold text-gray-900">Rp {order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Semua Produk</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-4">
                        {selectedImages.map((item, index) => (
                            <div key={index} className="flex gap-6 items-start border-b border-gray-100 pb-6 last:border-0">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="rounded-lg object-cover"
                                />
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                                    <p className="text-sm text-gray-600">Harga: Rp {item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
