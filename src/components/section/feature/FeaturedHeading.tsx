import React from 'react'

export default function FeaturedHeading() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 mb-12 md:mb-16">
            <h3 className='text-3xl md:text-4xl font-bold text-center tracking-tight'>
                Featured Products
            </h3>
            <p className='text-gray-600 text-center text-sm md:text-base'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
            </p>
        </div>
    )
}
