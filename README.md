# Companies Management System 🏢

A modern, full-stack web application for managing company information with a powerful REST API and an intuitive React frontend. Built with Node.js, Express, MongoDB, React, and TypeScript.

## 🚀 Features

### Backend API Features
- **Complete CRUD Operations** - Create, Read, Update, and Delete companies
- **Advanced Filtering** - Filter companies by industry, location, employee count, and founding year
- **Data Validation** - Comprehensive input validation with error handling
- **MongoDB Integration** - Robust database with proper indexing for performance
- **RESTful Architecture** - Clean, standardized API endpoints
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error management and logging

### Frontend Features
- **Modern React UI** - Built with React 19 and TypeScript
- **Real-time Search & Filtering** - Dynamic company filtering with multiple criteria
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Form Validation** - Client-side validation with user-friendly error messages
- **Professional UI/UX** - Clean, modern interface with loading states and notifications
- **Type Safety** - Full TypeScript implementation for better development experience

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with responsive design

### Development Tools
- **Nodemon** - Auto-restart for development
- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple npm scripts simultaneously

## 📁 Project Structure

```
Companies-Task/
├── backend/                    # Node.js API server
│   ├── src/
│   │   ├── config/            # Database and environment configuration
│   │   │   ├── db.js          # MongoDB connection
│   │   │   └── env.eg         # Environment variables example
│   │   ├── controllers/       # Request handlers
│   │   │   └── companyController.js
│   │   ├── models/            # Database schemas
│   │   │   └── Company.js     # Company data model
│   │   ├── routes/            # API route definitions
│   │   │   └── companyRoutes.js
│   │   └── server.js          # Express server setup
│   └── package.json           # Backend dependencies
│
├── frontend/                  # React frontend application
│   └── react-vite-app/
│       ├── src/
│       │   ├── App.tsx        # Main application component
│       │   ├── types.ts       # TypeScript type definitions
│       │   ├── constants.ts   # Application constants
│       │   ├── index.css      # Global styles
│       │   └── main.tsx       # Application entry point
│       └── package.json       # Frontend dependencies
│
└── package.json               # Root package with scripts
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Companies-Task
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp src/config/env.eg .env
   # Edit .env file with your MongoDB URI
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API server on `http://localhost:5000`
   - Frontend React app on `http://localhost:5173`

## 🔧 Available Scripts

### Root Level Scripts
```bash
npm run dev           # Start both backend and frontend in development mode
npm run start         # Start both backend and frontend in production mode
npm run setup         # Install all dependencies for both backend and frontend
npm run build         # Build the frontend for production
```

### Backend Scripts
```bash
npm run backend:dev   # Start backend in development mode (with nodemon)
npm run backend:start # Start backend in production mode
```

### Frontend Scripts
```bash
npm run frontend:dev  # Start frontend development server
npm run frontend:start # Start frontend production preview
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api/companies`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/` | Get all companies | `industry`, `location`, `minEmployees`, `maxEmployees`, `foundedAfter` |
| `POST` | `/` | Create a new company | Request body: `{name, industry, location, employees?, founded?}` |
| `GET` | `/:id` | Get company by ID | Path parameter: `id` |
| `PUT` | `/:id` | Update company | Path parameter: `id`, Request body: company data |
| `DELETE` | `/:id` | Delete company | Path parameter: `id` |

### Example API Calls

**Get all companies:**
```bash
GET http://localhost:5000/api/companies
```

**Filter companies:**
```bash
GET http://localhost:5000/api/companies?industry=Technology&location=USA&minEmployees=100
```

**Create a company:**
```bash
POST http://localhost:5000/api/companies
Content-Type: application/json

{
  "name": "Tech Innovations Inc.",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "employees": 250,
  "founded": 2020
}
```

## 📊 Data Model

### Company Schema
```javascript
{
  name: String,        // Required, unique, max 100 characters
  industry: String,    // Required, max 50 characters
  location: String,    // Required, max 50 characters
  employees: Number,   // Optional, 1-1,000,000
  founded: Number,     // Optional, 1800-current year
  createdAt: Date,     // Auto-generated
  updatedAt: Date      // Auto-generated
}
```

## 🎨 Frontend Features

### Search & Filter Capabilities
- **Industry Filter** - Search companies by industry type
- **Location Filter** - Find companies by geographic location
- **Employee Range** - Filter by minimum and maximum employee count
- **Founded Year** - Filter companies founded after a specific year
- **Real-time Results** - Instant filtering as you type

### User Interface
- **Responsive Design** - Works on all screen sizes
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages
- **Success Notifications** - Confirmation messages for actions
- **Form Validation** - Real-time validation with helpful hints

## 🔒 Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/companies-db
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/companies-db

PORT=5000
NODE_ENV=development
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Run `npm start` in the backend directory

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your static hosting service
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Development Notes

### Code Organization
- **Backend**: Follows MVC pattern with clear separation of concerns
- **Frontend**: Component-based architecture with TypeScript for type safety
- **Database**: Optimized with proper indexing for common queries
- **API**: RESTful design with comprehensive error handling

### Performance Optimizations
- Database indexing on frequently queried fields
- Efficient MongoDB queries with proper filtering
- Frontend state management for optimal re-renders
- Responsive loading states and error boundaries

## 🐛 Troubleshooting

### Common Issues

**Connection refused on port 5000:**
- Ensure MongoDB is running
- Check environment variables
- Verify no other process is using port 5000

**CORS errors:**
- Frontend and backend URLs are properly configured
- Check CORS settings in `server.js`

**Build errors:**
- Run `npm install` in both frontend and backend directories
- Ensure Node.js version compatibility






