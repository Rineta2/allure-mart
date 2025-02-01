"use client"

import React, { useState, useEffect } from 'react'

import CompletedSkelaton from '@/components/dashboard/user/order/completed/CompletedSkelaton'

export default function CompletedContent() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    if (isLoading) return <CompletedSkelaton />

    return (
        <div>CompletedContent</div>
    )
}
