# Sales Management System - Frontend

Modern React-based frontend for Retail Sales Management System with advanced filtering, search, and sorting capabilities.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 4
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: CSS3 with CSS Variables
- **Package Manager**: npm

## Installation

```bash
cd frontend
npm install
```

## Configuration

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Development

```bash
npm run dev
```

Application will start on `http://localhost:5000`

## Production Build

```bash
npm run build
npm run preview
```

## Features

### Search
- Case-insensitive full-text search
- Search across customer name and phone number
- Real-time search results with debouncing

### Filtering
- **Multi-Select Filters**:
  - Customer Region
  - Gender
  - Product Category
  - Payment Method
  - Tags
- **Range Filters**:
  - Age Range (Min-Max)
  - Date Range (Start-End)
- Filters work independently and in combination
- Active filter count indicator

### Sorting
- Date (Newest/Oldest First)
- Quantity (High to Low / Low to High)
- Customer Name (A-Z / Z-A)
- Preserves search and filter states

### Pagination
- 10 items per page
- Next/Previous navigation
- Direct page jump
- Shows current page and total pages
- Maintains search, filter, and sort states

### Statistics Dashboard
- Total Sales (in INR)
- Total Quantity Sold
- Average Order Value
- Total Transactions
- Real-time data update

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Clean, modern interface aligned with Figma design
- Smooth animations and transitions
- Loading states and error handling
- Empty state messaging
- Accessible components

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── SalesTable.jsx
│   │   ├── Pagination.jsx
│   │   └── Statistics.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   ├── SortingDropdown.css
│   │   ├── SalesTable.css
│   │   ├── Pagination.css
│   │   └── Statistics.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── vite.config.js
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend API via axios. All API calls are centralized in `src/services/api.js`.

### Key Endpoints Used:
- `GET /api/sales` - Fetch sales with filters
- `GET /api/sales/filters/options` - Get filter options
- `GET /api/sales/statistics` - Get statistics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Component-based architecture for reusability
- Efficient state management
- Optimized re-renders with React hooks
- CSS variables for theming
- Responsive images and lazy loading ready

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- High contrast ratios
- Focus indicators

## Deployment

The frontend can be deployed to any static hosting service:

- **Vercel**: Push to GitHub and connect project
- **Netlify**: Drag and drop build folder
- **AWS S3 + CloudFront**: Upload build folder
- **GitHub Pages**: Configure with gh-pages

Ensure environment variable `VITE_API_URL` points to your backend API in production.