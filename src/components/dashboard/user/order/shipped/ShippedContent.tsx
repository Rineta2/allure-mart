"use client"

import React, { useState, useEffect } from 'react'

import ShippedSkelaton from '@/components/dashboard/user/order/shipped/ShippedSkelaton'

export default function ShippedContent() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    if (isLoading) return <ShippedSkelaton />

    return (
        <div>ShippedContent</div>
    )
}
