import React from 'react'
import { Search, X } from 'lucide-react'
import '../styles/SearchBar.css'

export default function SearchBar({ value, onChange }) {
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by customer name or phone number..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button className="search-clear-btn" onClick={handleClear} aria-label="Clear search">
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
