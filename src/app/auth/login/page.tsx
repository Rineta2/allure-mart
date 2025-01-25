import React from 'react'

import LoginContent from "@/components/accounts/login/LoginContent"

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Login',
        description: 'Login to your account',
    }
}

export default function Login() {
    return (
        <LoginContent />
    )
}
