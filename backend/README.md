# Sales Management System - Backend

High-performance REST API for Retail Sales Management System built with Node.js, Express, and MongoDB.

## Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express Validator
- **Environment**: dotenv

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sales-db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Get Sales with Filters, Search, and Sorting
```
GET /api/sales?page=1&limit=10&search=john&sortBy=date-newest
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search term for customer name or phone number
- `sortBy`: Sorting option (date-newest, date-oldest, quantity-asc, quantity-desc, name-asc, name-desc)
- `customerRegion`: Filter by region (multi-select via array)
- `gender`: Filter by gender (multi-select)
- `productCategory`: Filter by category (multi-select)
- `paymentMethod`: Filter by payment method (multi-select)
- `tags`: Filter by tags (multi-select)
- `minAge`: Minimum age
- `maxAge`: Maximum age
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalRecords": 100,
    "pageSize": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get Filter Options
```
GET /api/sales/filters/options
```

Returns all unique values for filter dropdowns.

### Get Statistics
```
GET /api/sales/statistics
```

Returns sales statistics (total sales, average order value, etc.).

### Create Sales Record
```
POST /api/sales
Content-Type: application/json

{
  "customerId": "C001",
  "customerName": "John Doe",
  ...
}
```

### Bulk Import Sales
```
POST /api/sales/bulk
Content-Type: application/json

{
  "salesArray": [...]
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── salesController.js
│   ├── models/
│   │   └── Sales.js
│   ├── services/
│   │   └── salesService.js
│   ├── routes/
│   │   └── salesRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Key Features

- **Full-Text Search**: Case-insensitive search on customer name and phone
- **Multi-Select Filtering**: Filter by multiple regions, categories, tags simultaneously
- **Range Filtering**: Age and date range filtering
- **Advanced Sorting**: Sort by date, quantity, and customer name
- **Pagination**: Efficient cursor-based pagination with metadata
- **Performance**: MongoDB indexes on frequently queried fields
- **Error Handling**: Comprehensive error handling and validation