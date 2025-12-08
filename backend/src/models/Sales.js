const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  // Customer Fields
  customerId: {
    type: String,
    required: true,
    index: true,
  },
  customerName: {
    type: String,
    required: true,
    index: 'text',
  },
  phoneNumber: {
    type: String,
    required: true,
    index: 'text',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    index: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
    index: true,
  },
  customerRegion: {
    type: String,
    required: true,
    index: true,
  },
  customerType: {
    type: String,
    enum: ['Retail', 'Wholesale', 'Premium'],
  },

  // Product Fields
  productId: {
    type: String,
    required: true,
    index: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
    index: true,
  },
  tags: [{
    type: String,
    index: true,
  }],

  // Sales Fields
  quantity: {
    type: Number,
    required: true,
    min: 1,
    index: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  finalAmount: {
    type: Number,
    required: true,
    min: 0,
  },

  // Operational Fields
  date: {
    type: Date,
    required: true,
    index: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Net Banking'],
    index: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    index: true,
  },
  deliveryType: {
    type: String,
    enum: ['Standard', 'Express', 'Overnight'],
  },
  storeId: {
    type: String,
    required: true,
    index: true,
  },
  storeLocation: {
    type: String,
    required: true,
  },
  salespersonId: {
    type: String,
    required: true,
    index: true,
  },
  employeeName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
SalesSchema.index({ customerName: 'text', phoneNumber: 'text' });
SalesSchema.index({ date: -1 });
SalesSchema.index({ customerRegion: 1, gender: 1, productCategory: 1 });
SalesSchema.index({ tags: 1, paymentMethod: 1 });

module.exports = mongoose.model('Sales', SalesSchema);