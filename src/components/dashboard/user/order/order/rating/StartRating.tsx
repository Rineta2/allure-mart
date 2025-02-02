import React from 'react'

import { FaStar } from "react-icons/fa";

interface StarRatingProps {
    value: number
    onChange?: (value: number) => void
    readonly?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readonly = false }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={`w-6 h-6 ${star <= value
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        } ${!readonly && 'cursor-pointer hover:scale-110 transition-transform'}`}
                    onClick={() => {
                        if (!readonly && onChange) {
                            onChange(star)
                        }
                    }}
                />
            ))}
        </div>
    )
}