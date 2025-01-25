import React from 'react'

import SellerContent from "@/components/pages/super-admins/seller/SellerContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Seller Dashboard',
        description: 'Daftar Akun Seller',
    }
}

export default function SellerDashboard() {
    return (
        <SellerContent />
    )
}

