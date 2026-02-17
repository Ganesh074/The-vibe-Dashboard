'use client'

import { useState, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [input, setInput] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    onSearch(value)
  }, [onSearch])

  const handleClear = useCallback(() => {
    setInput('')
    onSearch('')
  }, [onSearch])

  return (
    <div className="w-full relative group">
      <div className={`
        flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300
        bg-white/5 border border-white/10 backdrop-blur-xl
        group-focus-within:bg-white/10 group-focus-within:border-cyan-500/50 group-focus-within:shadow-lg group-focus-within:shadow-cyan-500/10
      `}>
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${input ? 'text-cyan-400' : 'text-slate-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search items by name or description..."
          value={input}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none placeholder-slate-500 text-slate-100 text-lg"
        />
        
        {isLoading && (
          <div className="w-5 h-5 border-2 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
        )}

        {input && (
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-slate-100 disabled:opacity-50"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
