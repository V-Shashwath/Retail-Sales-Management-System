import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const fetchSales = async ({
  page = 1,
  limit = 10,
  search = '',
  filters = {},
  sortBy = 'date-newest',
}) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      search,
      sortBy,
    })

    if (filters.customerRegion?.length) {
      filters.customerRegion.forEach(r => params.append('customerRegion', r))
    }
    if (filters.gender?.length) {
      filters.gender.forEach(g => params.append('gender', g))
    }
    if (filters.productCategory?.length) {
      filters.productCategory.forEach(c => params.append('productCategory', c))
    }
    if (filters.paymentMethod?.length) {
      filters.paymentMethod.forEach(p => params.append('paymentMethod', p))
    }
    if (filters.tags?.length) {
      filters.tags.forEach(t => params.append('tags', t))
    }

    if (filters.ageRange?.min !== '' && filters.ageRange?.min !== undefined) {
      params.append('minAge', filters.ageRange.min)
    }
    if (filters.ageRange?.max !== '' && filters.ageRange?.max !== undefined) {
      params.append('maxAge', filters.ageRange.max)
    }

    if (filters.dateRange?.startDate) {
      params.append('startDate', filters.dateRange.startDate)
    }
    if (filters.dateRange?.endDate) {
      params.append('endDate', filters.dateRange.endDate)
    }

    const response = await apiClient.get(`/sales?${params.toString()}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch sales')
  }
}

export const fetchFilterOptions = async () => {
  try {
    const response = await apiClient.get('/sales/filters/options')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch filter options')
  }
}

export const fetchStatistics = async () => {
  try {
    const response = await apiClient.get('/sales/statistics')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch statistics')
  }
}

export default apiClient