"use client"

import React, { useState, useEffect } from 'react'

import OrderSkelaton from '@/components/dashboard/user/order/order/OrderSkelaton'

export default function OrderContent() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    if (isLoading) return <OrderSkelaton />

    return (
        <div>OrderContent</div>
    )
}
