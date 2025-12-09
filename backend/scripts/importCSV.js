// File: backend/scripts/importCSV.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Sales = require('../src/models/Sales');

// Parse CSV date format (DD-MM-YYYY) to Date object
function parseDate(dateString) {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
}

// Clean and convert tags string to array
function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
}

// Convert string numbers to actual numbers
function parseNumber(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// Map CSV columns to database fields
function mapCSVToDB(row) {
  return {
    customerId: row['Customer ID'] || '',
    customerName: row['Customer Name'] || '',
    phoneNumber: row['Phone Number'] || '',
    gender: row['Gender'] || 'Other',
    age: parseNumber(row['Age']) || 0,
    customerRegion: row['Customer Region'] || '',
    customerType: row['Customer Type'] || 'Retail',
    productId: row['Product ID'] || '',
    productName: row['Product Name'] || '',
    brand: row['Brand'] || '',
    productCategory: row['Product Category'] || '',
    tags: parseTags(row['Tags']),
    quantity: parseNumber(row['Quantity']) || 1,
    pricePerUnit: parseNumber(row['Price per Unit']) || 0,
    discountPercentage: parseNumber(row['Discount Percentage']) || 0,
    totalAmount: parseNumber(row['Total Amount']) || 0,
    finalAmount: parseNumber(row['Final Amount']) || 0,
    date: parseDate(row['Date']),
    paymentMethod: row['Payment Method'] || 'Credit Card',
    orderStatus: row['Order Status'] || 'Pending',
    deliveryType: row['Delivery Type'] || 'Standard',
    storeId: row['Store ID'] || '',
    storeLocation: row['Store Location'] || '',
    salespersonId: row['Salesperson ID'] || '',
    employeeName: row['Employee Name'] || '',
  };
}

async function importCSV(filePath) {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✓ MongoDB connected');
    console.log(`Importing CSV from: ${filePath}`);

    const records = [];
    let totalRows = 0;
    let successRows = 0;
    let errorRows = 0;

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          totalRows++;
          try {
            const mappedData = mapCSVToDB(row);
            records.push(mappedData);
            
            // Log every 100 records
            if (totalRows % 100 === 0) {
              console.log(`Processed ${totalRows} rows...`);
            }
          } catch (error) {
            console.error(`Error parsing row ${totalRows}:`, error.message);
            errorRows++;
          }
        })
        .on('end', async () => {
          try {
            console.log(`\nTotal rows read: ${totalRows}`);
            console.log(`Valid rows: ${records.length}`);
            console.log(`Erroneous rows: ${errorRows}`);

            if (records.length === 0) {
              console.log('No valid records to import');
              await mongoose.connection.close();
              resolve();
              return;
            }

            console.log('\nInserting records into database...');
            
            // Clear existing data (optional - comment out if you want to keep existing data)
            // await Sales.deleteMany({});
            // console.log('Cleared existing records');

            // Insert in batches of 500 to avoid memory issues
            const batchSize = 500;
            let insertedCount = 0;

            for (let i = 0; i < records.length; i += batchSize) {
              const batch = records.slice(i, i + batchSize);
              try {
                const result = await Sales.insertMany(batch, { ordered: false });
                insertedCount += result.length;
                console.log(`Inserted ${insertedCount}/${records.length} records`);
              } catch (error) {
                // Handle duplicate key errors gracefully
                if (error.code === 11000) {
                  console.warn(`Skipped some duplicate records in batch`);
                  insertedCount += batch.length - error.writeErrors.length;
                } else {
                  throw error;
                }
              }
            }

            console.log(`\n✓ Import completed successfully!`);
            console.log(`Total records inserted: ${insertedCount}`);
            
            // Show statistics
            const stats = await Sales.aggregate([
              {
                $group: {
                  _id: null,
                  totalRecords: { $sum: 1 },
                  totalSales: { $sum: '$finalAmount' },
                  avgOrderValue: { $avg: '$finalAmount' },
                }
              }
            ]);

            if (stats[0]) {
              console.log('\nDatabase Statistics:');
              console.log(`Total records in DB: ${stats[0].totalRecords}`);
              console.log(`Total sales: ₹${stats[0].totalSales.toFixed(2)}`);
              console.log(`Average order value: ₹${stats[0].avgOrderValue.toFixed(2)}`);
            }

            await mongoose.connection.close();
            resolve();
          } catch (error) {
            console.error('Error during insertion:', error);
            await mongoose.connection.close();
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Get file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node importCSV.js <path-to-csv-file>');
  console.error('Example: node importCSV.js ./sales_data.csv');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

importCSV(filePath)
  .then(() => {
    console.log('\n✓ CSV import process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ CSV import failed:', error.message);
    process.exit(1);
  });