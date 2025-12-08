const Sales = require('../models/Sales');

class SalesService {
  buildQuery(searchTerm, filters) {
    const query = {};

    if (searchTerm && searchTerm.trim()) {
      query.$text = { $search: searchTerm };
    }

    if (filters.customerRegion?.length) {
      query.customerRegion = { $in: filters.customerRegion };
    }

    if (filters.gender?.length) {
      query.gender = { $in: filters.gender };
    }

    if (filters.productCategory?.length) {
      query.productCategory = { $in: filters.productCategory };
    }

    if (filters.paymentMethod?.length) {
      query.paymentMethod = { $in: filters.paymentMethod };
    }

    if (filters.tags?.length) {
      query.tags = { $in: filters.tags };
    }

    if (filters.ageRange?.min !== undefined || filters.ageRange?.max !== undefined) {
      query.age = {};
      if (filters.ageRange?.min !== undefined) {
        query.age.$gte = filters.ageRange.min;
      }
      if (filters.ageRange?.max !== undefined) {
        query.age.$lte = filters.ageRange.max;
      }
    }

    if (filters.dateRange?.startDate || filters.dateRange?.endDate) {
      query.date = {};
      if (filters.dateRange?.startDate) {
        query.date.$gte = new Date(filters.dateRange.startDate);
      }
      if (filters.dateRange?.endDate) {
        const endDate = new Date(filters.dateRange.endDate);
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    return query;
  }

  buildSort(sortBy) {
    const sortMap = {
      'date-newest': { date: -1 },
      'date-oldest': { date: 1 },
      'quantity-desc': { quantity: -1 },
      'quantity-asc': { quantity: 1 },
      'name-asc': { customerName: 1 },
      'name-desc': { customerName: -1 },
    };

    return sortMap[sortBy] || { date: -1 };
  }

  async getSales({
    page = 1,
    limit = 10,
    searchTerm = '',
    filters = {},
    sortBy = 'date-newest',
  }) {
    try {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      const query = this.buildQuery(searchTerm, filters);
      const sort = this.buildSort(sortBy);

      const [data, total] = await Promise.all([
        Sales.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Sales.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limitNum);

      return {
        success: true,
        data,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalRecords: total,
          pageSize: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch sales: ${error.message}`);
    }
  }

  async getFilterOptions() {
    try {
      const [regions, genders, categories, paymentMethods, tags] = await Promise.all([
        Sales.distinct('customerRegion'),
        Sales.distinct('gender'),
        Sales.distinct('productCategory'),
        Sales.distinct('paymentMethod'),
        Sales.distinct('tags'),
      ]);

      return {
        success: true,
        regions: regions.filter(Boolean).sort(),
        genders: genders.filter(Boolean).sort(),
        categories: categories.filter(Boolean).sort(),
        paymentMethods: paymentMethods.filter(Boolean).sort(),
        tags: tags.filter(Boolean).sort(),
      };
    } catch (error) {
      throw new Error(`Failed to fetch filter options: ${error.message}`);
    }
  }

  async getStatistics() {
    try {
      const stats = await Sales.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$finalAmount' },
            totalQuantity: { $sum: '$quantity' },
            averageOrderValue: { $avg: '$finalAmount' },
            totalTransactions: { $sum: 1 },
          },
        },
      ]);

      return {
        success: true,
        stats: stats[0] || {
          totalSales: 0,
          totalQuantity: 0,
          averageOrderValue: 0,
          totalTransactions: 0,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch statistics: ${error.message}`);
    }
  }

  async createSales(salesData) {
    try {
      const sales = new Sales(salesData);
      await sales.save();
      return { success: true, data: sales };
    } catch (error) {
      throw new Error(`Failed to create sales record: ${error.message}`);
    }
  }

  async bulkInsertSales(salesArray) {
    try {
      const result = await Sales.insertMany(salesArray, { ordered: false });
      return {
        success: true,
        insertedCount: result.length,
        data: result,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Duplicate entry found');
      }
      throw new Error(`Failed to insert sales records: ${error.message}`);
    }
  }
}

module.exports = new SalesService();