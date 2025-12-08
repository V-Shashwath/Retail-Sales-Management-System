const salesService = require('../services/salesService');

class SalesController {
  async getSales(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'date-newest',
      } = req.query;

      const filters = {};

      if (req.query.customerRegion) {
        filters.customerRegion = Array.isArray(req.query.customerRegion)
          ? req.query.customerRegion
          : [req.query.customerRegion];
      }

      if (req.query.gender) {
        filters.gender = Array.isArray(req.query.gender)
          ? req.query.gender
          : [req.query.gender];
      }

      if (req.query.productCategory) {
        filters.productCategory = Array.isArray(req.query.productCategory)
          ? req.query.productCategory
          : [req.query.productCategory];
      }

      if (req.query.paymentMethod) {
        filters.paymentMethod = Array.isArray(req.query.paymentMethod)
          ? req.query.paymentMethod
          : [req.query.paymentMethod];
      }

      if (req.query.tags) {
        filters.tags = Array.isArray(req.query.tags)
          ? req.query.tags
          : [req.query.tags];
      }

      if (req.query.minAge || req.query.maxAge) {
        filters.ageRange = {
          min: req.query.minAge ? parseInt(req.query.minAge) : undefined,
          max: req.query.maxAge ? parseInt(req.query.maxAge) : undefined,
        };
      }

      if (req.query.startDate || req.query.endDate) {
        filters.dateRange = {
          startDate: req.query.startDate,
          endDate: req.query.endDate,
        };
      }

      const result = await salesService.getSales({
        page,
        limit,
        searchTerm: search,
        filters,
        sortBy,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getFilterOptions(req, res) {
    try {
      const result = await salesService.getFilterOptions();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getStatistics(req, res) {
    try {
      const result = await salesService.getStatistics();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async createSales(req, res) {
    try {
      const result = await salesService.createSales(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async bulkImport(req, res) {
    try {
      const { salesArray } = req.body;

      if (!Array.isArray(salesArray) || salesArray.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'salesArray must be a non-empty array',
        });
      }

      const result = await salesService.bulkInsertSales(salesArray);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new SalesController();