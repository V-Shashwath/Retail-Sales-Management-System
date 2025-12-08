# Retail Sales Management System

A production-grade retail sales management application with advanced search, filtering, sorting, and pagination capabilities. Built with Node.js/Express backend and React frontend, powered by MongoDB Atlas.

## Overview

Complete sales data management platform enabling users to search, filter, sort, and paginate through thousands of retail sales records with real-time statistics and comprehensive filtering options.

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose ODM
- **Port**: 5000

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 4
- **Styling**: CSS3 with CSS Variables
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Port**: 3000

### Database
- **MongoDB Atlas** (Free Tier)
- Connection pooling enabled
- Full-text indexes for search
- Performance indexes on filter fields

## Features

### Search Implementation
- Full-text search across customer name and phone number
- Case-insensitive matching
- Real-time search results
- Works seamlessly with filters and sorting
- MongoDB text index for optimal performance

### Filter Implementation
- **Multi-Select Filters**: Region, Gender, Category, Payment Method, Tags
- **Range Filters**: Age (min-max), Date Range (start-end)
- Independent and combined filter operations
- Active filter count indicator
- Clean UI with collapsible sections

### Sorting Implementation
- Date: Newest/Oldest First
- Quantity: High to Low / Low to High
- Customer Name: A-Z / Z-A
- Preserves active search and filters
- Default sort: Newest transactions first

### Pagination Implementation
- Page size: 10 items per page
- Next/Previous navigation
- Direct page jump buttons
- Shows current page, total pages, and total records
- Maintains search, filter, and sort states across pages

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- MongoDB Atlas account (free)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in backend directory:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sales-db?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in frontend directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:3000`

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (M0 Free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password

3. **Update Backend .env**
   ```
   MONGODB_URI=your_connection_string
   ```

4. **Import Sample Data (Optional)**
   The system will work with any CSV data. To import your CSV:
   - Format: Follow the Sales model schema in `backend/src/models/Sales.js`
   - Use MongoDB Compass or Atlas UI to import CSV
   - Or use the `/api/sales/bulk` endpoint with JSON array

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── models/
│   │   │   └── Sales.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── SortingDropdown.jsx
│   │   │   ├── SalesTable.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── Statistics.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── SearchBar.css
│   │   │   ├── FilterPanel.css
│   │   │   ├── SortingDropdown.css
│   │   │   ├── SalesTable.css
│   │   │   ├── Pagination.css
│   │   │   └── Statistics.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

## API Endpoints

### Sales Data
```
GET /api/sales
Query Parameters:
  - page: Page number (default: 1)
  - limit: Items per page (default: 10, max: 100)
  - search: Search term (customer name or phone)
  - sortBy: Sort option (date-newest, quantity-desc, name-asc, etc.)
  - customerRegion: Region filter (multi-select)
  - gender: Gender filter (multi-select)
  - productCategory: Category filter (multi-select)
  - paymentMethod: Payment method filter (multi-select)
  - tags: Tags filter (multi-select)
  - minAge: Minimum age
  - maxAge: Maximum age
  - startDate: Start date (YYYY-MM-DD)
  - endDate: End date (YYYY-MM-DD)
```

### Filter Options
```
GET /api/sales/filters/options
Returns all unique values for filter dropdowns
```

### Statistics
```
GET /api/sales/statistics
Returns sales statistics (total, average, count)
```

## Error Handling

The system handles various edge cases:
- **No search results**: Displays "No sales data found" message
- **Conflicting filters**: Applies all filters simultaneously, returns empty if no match
- **Invalid numeric ranges**: Validates and sanitizes input
- **Large filter combinations**: Optimized MongoDB queries
- **Missing optional fields**: Gracefully handles null/undefined values
- **Network errors**: Shows error messages with retry option

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

### Backend
- MongoDB indexes on frequently queried fields
- Text indexes for full-text search
- Lean queries for read-only operations
- Connection pooling
- Pagination to limit document loads

### Frontend
- React component memoization
- CSS custom properties for efficient theming
- Optimized bundle splitting in Vite
- Lazy loading ready for images
- Efficient re-render management

## Security Considerations

- Input validation on backend
- CORS properly configured
- No sensitive data in frontend
- Environment variables for secrets
- SQL injection prevention (using MongoDB)
- XSS prevention through React's built-in escaping

## Deployment

### Backend (Heroku/Render/Railway)
```bash
cd backend
npm install
npm start
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm install
npm run build
# Deploy dist folder
```

### Environment Variables
Update in production:
- `MONGODB_URI`: Production MongoDB Atlas connection
- `CORS_ORIGIN`: Frontend production URL
- `NODE_ENV`: Set to 'production'

## Testing

Manual testing checklist:
- [ ] Search functionality with various terms
- [ ] Each filter individually
- [ ] Multiple filters simultaneously
- [ ] Sorting options
- [ ] Pagination across all pages
- [ ] Responsive design on mobile
- [ ] Empty states and error handling
- [ ] Cross-browser compatibility

## Troubleshooting

**Backend won't connect to MongoDB**
- Verify connection string in .env
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

**Frontend shows "Network Error"
- Verify backend is running on port 5000
- Check CORS_ORIGIN in backend .env
- Confirm VITE_API_URL in frontend .env

**Filters/Search not working**
- Check browser console for errors
- Verify backend indexes are created
- Restart backend server

## Support

For issues or questions:
1. Check the docs/architecture.md for detailed design
2. Review error messages in browser console
3. Check backend logs for server errors
4. Verify database connection

## License

MIT License - Feel free to use for learning and projects.

## Version

1.0.0 - Initial Release

---
