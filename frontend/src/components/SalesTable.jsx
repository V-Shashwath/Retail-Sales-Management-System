import React from 'react'
import '../styles/SalesTable.css'

export default function SalesTable({ sales }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Shipped': 'status-shipped',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled',
    }
    return statusClasses[status] || 'status-default'
  }

  return (
    <div className="sales-table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="table-row">
              <td className="date-cell">{formatDate(sale.date)}</td>
              <td className="name-cell">
                <strong>{sale.customerName}</strong>
              </td>
              <td className="phone-cell">{sale.phoneNumber}</td>
              <td className="product-cell">
                <div className="product-info">
                  <strong>{sale.productName}</strong>
                  <small>{sale.brand}</small>
                </div>
              </td>
              <td className="category-cell">{sale.productCategory}</td>
              <td className="quantity-cell">
                <span className="quantity-badge">{sale.quantity}</span>
              </td>
              <td className="price-cell">
                {formatCurrency(sale.pricePerUnit)}
              </td>
              <td className="discount-cell">
                {sale.discountPercentage > 0 && (
                  <span className="discount-badge">-{sale.discountPercentage}%</span>
                )}
                {sale.discountPercentage === 0 && <span className="no-discount">—</span>}
              </td>
              <td className="amount-cell">
                <strong className="final-amount">
                  {formatCurrency(sale.finalAmount)}
                </strong>
              </td>
              <td className="payment-cell">
                <span className="payment-badge">{sale.paymentMethod}</span>
              </td>
              <td className="status-cell">
                <span className={`status-badge ${getStatusBadge(sale.orderStatus)}`}>
                  {sale.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}