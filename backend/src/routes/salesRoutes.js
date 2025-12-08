const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/filters/options', salesController.getFilterOptions);
router.get('/statistics', salesController.getStatistics);
router.get('/', salesController.getSales);

router.post('/', salesController.createSales);
router.post('/bulk', salesController.bulkImport);

module.exports = router;