const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({

  // Customer Fields
  customerId: {
    type: String,
    default: "",
    index: true
  },
  customerName: {
    type: String,
    default: "",
    index: 'text'
  },
  phoneNumber: {
    type: String,
    default: "",
    index: 'text'
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
    default: "other",     // instead of enum
    index: true
  },
  age: {
    type: Number,
    default: 0,
    min: 0,
    max: 150
  },
  customerRegion: {
    type: String,
    default: "",
    index: true
  },
  customerType: {
    type: String,
    trim: true,
    lowercase: true,
    default: "retail"     // no enum
  },

  // Product Fields
  productId: {
    type: String,
    default: "",
    index: true
  },
  productName: {
    type: String,
    default: ""
  },
  brand: {
    type: String,
    default: ""
  },
  productCategory: {
    type: String,
    default: "",
    index: true
  },
  tags: {
    type: [String],
    default: [],
    index: true
  },

  // Sales Fields
  quantity: {
    type: Number,
    default: 0
  },
  pricePerUnit: {
    type: Number,
    default: 0
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    default: 0
  },

  // Operational Fields
  date: {
    type: Date,
    default: null,
    index: true
  },
  paymentMethod: {
    type: String,
    trim: true,
    lowercase: true,
    default: "credit card" // no enum
  },
  orderStatus: {
    type: String,
    trim: true,
    lowercase: true,
    default: "pending"     // no enum
  },
  deliveryType: {
    type: String,
    trim: true,
    lowercase: true,
    default: "standard"    // no enum
  },
  storeId: {
    type: String,
    default: "",
    index: true
  },
  storeLocation: {
    type: String,
    default: ""
  },
  salespersonId: {
    type: String,
    default: "",
    index: true
  },
  employeeName: {
    type: String,
    default: ""
  },

}, { timestamps: true });

// Indexes
SalesSchema.index({ customerName: 'text', phoneNumber: 'text' });
SalesSchema.index({ date: -1 });
SalesSchema.index({ customerRegion: 1, gender: 1, productCategory: 1 });
SalesSchema.index({ tags: 1, paymentMethod: 1 });

module.exports = mongoose.model('Sales', SalesSchema);
