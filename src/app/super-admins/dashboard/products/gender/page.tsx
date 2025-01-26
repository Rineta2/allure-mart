import GenderContent from '@/components/pages/super-admins/products/gender/genderContent'

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Jenis Kelamin',
        description: 'You are logged in as a super admin',
    }
}

export default function Gender() {
    return (
        <GenderContent />
    )
}

