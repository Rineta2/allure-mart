import React from 'react'

import ContactContent from '@/components/pages/contact/ContactContent'

export async function generateMetadata() {
    return {
        title: 'Contact | ALLURE MART',
        description: 'Contact | ALLURE MART',
    }
}

export default function Contact() {
    return (
        <ContactContent />
    )
}
