import React, { useEffect, useState } from 'react'
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react'
import { fetchStatistics } from '../services/api'
import '../styles/Statistics.css'

export default function Statistics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics()
        setStats(data.stats)
      } catch (err) {
        console.error('Failed to load statistics:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return <div className="statistics-loading">Loading statistics...</div>
  }

  if (!stats) {
    return null
  }

  return (
    <div className="statistics-container">
      <div className="stat-card">
        <div className="stat-icon stat-icon-sales">
          <DollarSign size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Sales</p>
          <p className="stat-value">{formatCurrency(stats.totalSales)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-quantity">
          <Package size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Quantity</p>
          <p className="stat-value">{stats.totalQuantity.toLocaleString()}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-avg">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Avg Order Value</p>
          <p className="stat-value">{formatCurrency(stats.averageOrderValue)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-transactions">
          <ShoppingCart size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Transactions</p>
          <p className="stat-value">{stats.totalTransactions.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}