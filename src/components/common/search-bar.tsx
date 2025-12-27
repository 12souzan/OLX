"use client"

import { useState, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from "@/styles/components/SearchBar.module.css";
import { useLanguage } from '@/context/languageContext';

interface SearchBarProps {
  onSearch?: (query: string) => void
  className?: string
}

export const SearchBar = ({ onSearch, className = '' }: SearchBarProps) => {
  const { messages } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  
  const [query, setQuery] = useState(() => {
    const match = pathname.match(/\/ads\/q-(.+)/)
    return match ? decodeURIComponent(match[1]) : ''
  })
  
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const performSearch = useCallback(() => {
    const trimmedQuery = query.trim().toLowerCase()
    
    if (trimmedQuery) {
      const encodedQuery = encodeURIComponent(trimmedQuery)
      router.push(`/ads/q-${encodedQuery}`)
    } else {
      router.push('/ads')
    }
    
    if (onSearch) {
      onSearch(trimmedQuery)
    }
    
  }, [query, router, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const handleSearchIconClick = () => {
    if (query.trim()) {
      performSearch()
    } else if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleClearClick = useCallback(() => {
    setQuery('')
    inputRef.current?.focus()
    router.push('/ads')
    
    if (onSearch) {
      onSearch('')
    }
  }, [router, onSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      handleClearClick()
    }
  }

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={`${styles.searchWrapper} ${isFocused ? styles.focused : ''}`}>
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={messages.Search?.placeholder || 'Search...'}
              className={styles.searchInput}
              aria-label="Search"
            />
            
            {query && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearClick}
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className={styles.searchButton}
            onClick={handleSearchIconClick}
            aria-label="Search"
          >
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}