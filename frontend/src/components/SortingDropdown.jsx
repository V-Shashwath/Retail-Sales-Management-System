import React from 'react'
import { ArrowUpDown } from 'lucide-react'
import '../styles/SortingDropdown.css'

const SORT_OPTIONS = [
  { value: 'date-newest', label: 'Date (Newest First)' },
  { value: 'date-oldest', label: 'Date (Oldest First)' },
  { value: 'quantity-desc', label: 'Quantity (High to Low)' },
  { value: 'quantity-asc', label: 'Quantity (Low to High)' },
  { value: 'name-asc', label: 'Customer Name (A-Z)' },
  { value: 'name-desc', label: 'Customer Name (Z-A)' },
]

export default function SortingDropdown({ value, onChange }) {
  const selectedLabel = SORT_OPTIONS.find(opt => opt.value === value)?.label || 'Sort By'

  return (
    <div className="sorting-dropdown">
      <label htmlFor="sort-select" className="sorting-label">
        <ArrowUpDown size={18} />
        Sort By:
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}