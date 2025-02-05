import MerekContent from '@/components/dashboard/super-admins/products/merek/MerekContent'

export async function generateMetadata() {
    return {
        title: 'ALLURE MART | Merek',
        description: 'You are logged in as a super admin',
    }
}

export default function Merek() {
    return (
        <MerekContent />
    )
}
