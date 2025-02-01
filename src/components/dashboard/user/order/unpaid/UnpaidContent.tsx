"use client"

import React, { useState, useEffect } from 'react'

import UnpaidSkelaton from '@/components/dashboard/user/order/unpaid/UnpaidSkelaton'

export default function UnpaidContent() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    if (isLoading) return <UnpaidSkelaton />

    return (
        <div>UnpaidContent</div>
    )
}
