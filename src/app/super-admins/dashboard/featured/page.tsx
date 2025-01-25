import React from 'react'

import FeaturedContent from "@/components/pages/super-admins/featured/FeaturedContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Featured Dashboard',
        description: 'Daftar Featured',
    }
}

export default function Featured() {
    return (
        <FeaturedContent />
    )
}