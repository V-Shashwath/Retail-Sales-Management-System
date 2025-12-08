import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import '../styles/FilterPanel.css'

export default function FilterPanel({ options, filters, onChange }) {
  const [expanded, setExpanded] = useState({
    region: true,
    gender: false,
    category: false,
    age: false,
    paymentMethod: false,
    tags: false,
    dateRange: false,
  })

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleMultiSelectChange = (filterKey, value) => {
    const currentArray = filters[filterKey] || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]

    onChange({
      ...filters,
      [filterKey]: newArray,
    })
  }

  const handleAgeChange = (type, value) => {
    onChange({
      ...filters,
      ageRange: {
        ...filters.ageRange,
        [type]: value === '' ? '' : Math.max(0, parseInt(value) || 0),
      },
    })
  }

  const handleDateChange = (type, value) => {
    onChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    })
  }

  if (!options) {
    return <div className="filter-panel"><p>Loading filters...</p></div>
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.customerRegion?.length) count += filters.customerRegion.length
    if (filters.gender?.length) count += filters.gender.length
    if (filters.productCategory?.length) count += filters.productCategory.length
    if (filters.paymentMethod?.length) count += filters.paymentMethod.length
    if (filters.tags?.length) count += filters.tags.length
    if (filters.ageRange?.min !== '') count++
    if (filters.ageRange?.max !== '') count++
    if (filters.dateRange?.startDate) count++
    if (filters.dateRange?.endDate) count++
    return count
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        {getActiveFilterCount() > 0 && (
          <span className="filter-badge">{getActiveFilterCount()}</span>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('region')}
        >
          <span>Region</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.region ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.region && (
          <div className="filter-options">
            {options.regions?.map(region => (
              <label key={region} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.customerRegion?.includes(region) || false}
                  onChange={() => handleMultiSelectChange('customerRegion', region)}
                />
                <span>{region}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('gender')}
        >
          <span>Gender</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.gender ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.gender && (
          <div className="filter-options">
            {options.genders?.map(gender => (
              <label key={gender} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.gender?.includes(gender) || false}
                  onChange={() => handleMultiSelectChange('gender', gender)}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('age')}
        >
          <span>Age Range</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.age ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.age && (
          <div className="filter-range">
            <div className="range-input-group">
              <label>Min Age</label>
              <input
                type="number"
                min="0"
                max="150"
                value={filters.ageRange?.min ?? ''}
                onChange={(e) => handleAgeChange('min', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="range-input-group">
              <label>Max Age</label>
              <input
                type="number"
                min="0"
                max="150"
                value={filters.ageRange?.max ?? ''}
                onChange={(e) => handleAgeChange('max', e.target.value)}
                placeholder="150"
              />
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.category ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.category && (
          <div className="filter-options">
            {options.categories?.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.productCategory?.includes(category) || false}
                  onChange={() => handleMultiSelectChange('productCategory', category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('tags')}
        >
          <span>Tags</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.tags ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.tags && (
          <div className="filter-options">
            {options.tags?.map(tag => (
              <label key={tag} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.tags?.includes(tag) || false}
                  onChange={() => handleMultiSelectChange('tags', tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('paymentMethod')}
        >
          <span>Payment Method</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.paymentMethod ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.paymentMethod && (
          <div className="filter-options">
            {options.paymentMethods?.map(method => (
              <label key={method} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.paymentMethod?.includes(method) || false}
                  onChange={() => handleMultiSelectChange('paymentMethod', method)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('dateRange')}
        >
          <span>Date Range</span>
          <ChevronDown
            size={18}
            style={{
              transform: expanded.dateRange ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {expanded.dateRange && (
          <div className="filter-range">
            <div className="range-input-group">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.dateRange?.startDate || ''}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
              />
            </div>
            <div className="range-input-group">
              <label>End Date</label>
              <input
                type="date"
                value={filters.dateRange?.endDate || ''}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
