import React from 'react'

interface SearchBarProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
        <div className="search relative max-w-2xl mx-auto w-full">
            <input
                type="text"
                placeholder='Search by order ID, name, email, or phone'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 md:px-6 md:py-4 rounded-2xl border border-gray-200 
                focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                bg-white/80 backdrop-blur-xl text-gray-700 placeholder-gray-400
                shadow-lg shadow-gray-200/20 hover:border-gray-300 transition-all duration-300"
            />
            <span className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
            </span>
        </div>
    )
}