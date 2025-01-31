import { GiTrophy } from 'react-icons/gi';

import { MdOutlineSecurity, MdOutlineSupportAgent } from 'react-icons/md';

import { CiDeliveryTruck } from 'react-icons/ci';

import { FeatureItemProps } from '@/components/pages/checkout/hooks/schema/Checkout';

function FeatureItem({ icon, title, description }: FeatureItemProps) {
    return (
        <div className='flex items-center gap-4 p-4'>
            {icon}
            <div className='flex flex-col'>
                <h3 className='text-white text-xl lg:text-2xl font-bold'>{title}</h3>
                <p className='text-white/80 text-sm'>{description}</p>
            </div>
        </div>
    );
}

export default function FeaturesSection() {
    const features = [
        {
            icon: <GiTrophy className='text-white w-12 h-12 flex-shrink-0' />,
            title: "High Quality",
            description: "crafted from top materials"
        },
        {
            icon: <MdOutlineSecurity className='text-white w-12 h-12 flex-shrink-0' />,
            title: "Warranty Protection",
            description: "Over 2 years"
        },
        {
            icon: <CiDeliveryTruck className='text-white w-12 h-12 flex-shrink-0' />,
            title: "Free Shipping",
            description: "Order over 150 $"
        },
        {
            icon: <MdOutlineSupportAgent className='text-white w-12 h-12 flex-shrink-0' />,
            title: "24 / 7 Support",
            description: "Dedicated support"
        }
    ];

    return (
        <div className='relative py-16 bg-primary'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {features.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}