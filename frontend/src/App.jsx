import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import SortingDropdown from './components/SortingDropdown'
import SalesTable from './components/SalesTable'
import Pagination from './components/Pagination'
import Statistics from './components/Statistics'
import { fetchSales, fetchFilterOptions } from './services/api'
import './styles/App.css'

export default function App() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterOptions, setFilterOptions] = useState(null)

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    productCategory: [],
    paymentMethod: [],
    tags: [],
    ageRange: { min: '', max: '' },
    dateRange: { startDate: '', endDate: '' },
  })

  const [sortBy, setSortBy] = useState('date-newest')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const data = await fetchFilterOptions()
        setFilterOptions(data)
      } catch (err) {
        console.error('Failed to load filter options:', err)
      }
    }

    loadFilterOptions()
  }, [])

  useEffect(() => {
    const loadSales = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchSales({
          page,
          limit: 10,
          search,
          filters,
          sortBy,
        })

        setSales(result.data)
        setPagination(result.pagination)
      } catch (err) {
        setError(err.message || 'Failed to load sales data')
        setSales([])
      } finally {
        setLoading(false)
      }
    }

    loadSales()
  }, [search, filters, sortBy, page])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    setPage(1)
  }

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSearch('')
    setFilters({
      customerRegion: [],
      gender: [],
      productCategory: [],
      paymentMethod: [],
      tags: [],
      ageRange: { min: '', max: '' },
      dateRange: { startDate: '', endDate: '' },
    })
    setSortBy('date-newest')
    setPage(1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <h1>Retail Sales Management System</h1>
          <p>Manage and analyze your retail sales data with advanced filtering and search capabilities</p>
        </div>
      </header>

      <main className="app-main">
        <div className="app-container">
          <Statistics />

          <div className="controls-section">
            <SearchBar value={search} onChange={handleSearchChange} />
            <div className="controls-row">
              <SortingDropdown value={sortBy} onChange={handleSortChange} />
              <button className="btn-clear-filters" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="content-wrapper">
            <aside className="filter-sidebar">
              <FilterPanel
                options={filterOptions}
                filters={filters}
                onChange={handleFilterChange}
              />
            </aside>

            <section className="results-area">
              {error && (
                <div className="error-message">
                  <p>⚠️ {error}</p>
                </div>
              )}

              {loading && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading sales data...</p>
                </div>
              )}

              {!loading && !error && sales.length === 0 && (
                <div className="empty-state">
                    <img  src="/empty.png" alt="No data" className="empty-state-image"/>
                    <p>No sales data found</p>
                    <p className="empty-state-subtitle">Try adjusting your search or filters</p>
                </div>
              )}

              {!loading && sales.length > 0 && (
                <>
                  <div className="results-header">
                    <p className="results-count">
                      Showing {sales.length} of {pagination?.totalRecords} records
                    </p>
                  </div>
                  <SalesTable sales={sales} />
                </>
              )}

              {!loading && pagination && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Retail Sales Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}