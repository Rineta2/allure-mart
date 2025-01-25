import React from 'react'

import RegisterContent from '@/components/accounts/register/RegisterContent'

export async function generateMetadata() {
    return {
        title: "ALLURE MART | Register",
        description: "Register to your account",
    }
}

export default function Register() {
    return (
        <RegisterContent />
    )
}
