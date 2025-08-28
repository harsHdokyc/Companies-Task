# 📡 Postman Testing Guide - Companies API

Complete guide for testing the Companies Management API using Postman.

## 🚀 Base Configuration

**Base URL:** `http://localhost:5000`
**API Base:** `http://localhost:5000/api/companies`

---

## 📋 API Endpoints Testing

### 1. 🏠 **Health Check**
**Method:** `GET`  
**URL:** `http://localhost:5000/`  
**Description:** Check if the API server is running  

**Expected Response:**
```json
{
  "message": "🏢 Companies API is running!",
  "version": "1.0.0",
  "endpoints": {
    "companies": "/api/companies"
  }
}
```

---

### 2. 📝 **Create Company**
**Method:** `POST`  
**URL:** `http://localhost:5000/api/companies`  
**Headers:**
```
Content-Type: application/json
```

**Sample Request Body 1:**
```json
{
  "name": "Tech Innovations Inc.",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "employees": 250,
  "founded": 2020
}
```

**Sample Request Body 2:**
```json
{
  "name": "Green Energy Solutions",
  "industry": "Renewable Energy",
  "location": "Austin, TX",
  "employees": 150,
  "founded": 2018
}
```

**Sample Request Body 3:**
```json
{
  "name": "FinTech Dynamics",
  "industry": "Financial Technology",
  "location": "New York, NY",
  "employees": 500,
  "founded": 2015
}
```

**Sample Request Body 4 (Minimal - Required Fields Only):**
```json
{
  "name": "Startup Ventures",
  "industry": "Consulting",
  "location": "Seattle, WA"
}
```

**Expected Success Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Tech Innovations Inc.",
    "industry": "Technology",
    "location": "San Francisco, CA",
    "employees": 250,
    "founded": 2020,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Company created successfully"
}
```

---

### 3. 📋 **Get All Companies**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies`  

**Expected Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "FinTech Dynamics",
      "industry": "Financial Technology",
      "location": "New York, NY",
      "employees": 500,
      "founded": 2015,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more companies
  ]
}
```

---

### 4. 🔍 **Get Company by ID**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies/{company_id}`  
**Example:** `http://localhost:5000/api/companies/64f8a1b2c3d4e5f6a7b8c9d0`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Tech Innovations Inc.",
    "industry": "Technology",
    "location": "San Francisco, CA",
    "employees": 250,
    "founded": 2020,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 5. ✏️ **Update Company**
**Method:** `PUT`  
**URL:** `http://localhost:5000/api/companies/{company_id}`  
**Headers:**
```
Content-Type: application/json
```

**Sample Update Request:**
```json
{
  "name": "Tech Innovations Corp.",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "employees": 300,
  "founded": 2020
}
```

**Partial Update Request:**
```json
{
  "employees": 275,
  "location": "Palo Alto, CA"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Tech Innovations Corp.",
    "industry": "Technology",
    "location": "Palo Alto, CA",
    "employees": 275,
    "founded": 2020,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  "message": "Company updated successfully"
}
```

---

### 6. 🗑️ **Delete Company**
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/companies/{company_id}`  

**Expected Response:**
```json
{
  "success": true,
  "message": "Company deleted successfully"
}
```

---

## 🔍 Advanced Filtering Tests

### 7. **Filter by Industry**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?industry=Technology`

### 8. **Filter by Location**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?location=California`

### 9. **Filter by Employee Count (Minimum)**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?minEmployees=100`

### 10. **Filter by Employee Range**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?minEmployees=100&maxEmployees=500`

### 11. **Filter by Founded Year**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?foundedAfter=2015`

### 12. **Multiple Filters Combined**
**Method:** `GET`  
**URL:** `http://localhost:5000/api/companies?industry=Technology&location=CA&minEmployees=200&foundedAfter=2018`

---

## 🧪 Test Data Sets

### Large Dataset for Testing
Use these additional companies for comprehensive testing:

**Healthcare Company:**
```json
{
  "name": "MedTech Solutions",
  "industry": "Healthcare",
  "location": "Boston, MA",
  "employees": 800,
  "founded": 2010
}
```

**E-commerce Company:**
```json
{
  "name": "ShopFast Online",
  "industry": "E-commerce",
  "location": "Los Angeles, CA",
  "employees": 1200,
  "founded": 2012
}
```

**Manufacturing Company:**
```json
{
  "name": "AutoParts Manufacturing",
  "industry": "Manufacturing",
  "location": "Detroit, MI",
  "employees": 2000,
  "founded": 1995
}
```

**Small Startup:**
```json
{
  "name": "AI Startup Lab",
  "industry": "Artificial Intelligence",
  "location": "San Jose, CA",
  "employees": 25,
  "founded": 2023
}
```

**International Company:**
```json
{
  "name": "Global Consulting Group",
  "industry": "Consulting",
  "location": "London, UK",
  "employees": 5000,
  "founded": 2000
}
```

---

## ❌ Error Testing

### 13. **Test Validation Errors**

**Missing Required Fields:**
```json
{
  "industry": "Technology",
  "location": "San Francisco, CA"
}
```
**Expected Error Response:**
```json
{
  "error": "Name, industry, and location are required fields"
}
```

**Duplicate Company Name:**
```json
{
  "name": "Tech Innovations Inc.",
  "industry": "Technology",
  "location": "San Francisco, CA"
}
```
**Expected Error Response:**
```json
{
  "error": "Company name already exists"
}
```

**Invalid Employee Count:**
```json
{
  "name": "Invalid Company",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "employees": -50
}
```

**Invalid Founded Year:**
```json
{
  "name": "Future Company",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "founded": 2030
}
```

### 14. **Test Not Found Errors**

**Get Non-existent Company:**
**URL:** `http://localhost:5000/api/companies/64f8a1b2c3d4e5f6a7b8c999`

**Expected Error Response:**
```json
{
  "error": "Company not found"
}
```

---

## 🛠️ Postman Collection Setup

### Environment Variables
Create a Postman environment with:
```
base_url: http://localhost:5000
api_url: {{base_url}}/api/companies
```

### Pre-request Scripts
For dynamic testing, add this to collection pre-request:
```javascript
// Generate random company data
pm.globals.set("random_name", "Test Company " + Math.floor(Math.random() * 1000));
pm.globals.set("timestamp", new Date().toISOString());
```

### Test Scripts
Add to test tab for automated validation:
```javascript
// Test status code
pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

// Test response structure
pm.test("Response has success property", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

// Save company ID for future requests
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.globals.set("company_id", jsonData.data._id);
}
```

---

## 🚀 Quick Test Sequence

1. **Health Check** → Verify API is running
2. **Create 3-5 Companies** → Populate database
3. **Get All Companies** → Verify creation
4. **Test Filters** → Check search functionality
5. **Update Company** → Test modification
6. **Get by ID** → Verify single retrieval
7. **Delete Company** → Test removal
8. **Error Tests** → Validate error handling

---

## 📊 Expected Performance

- **Response Time:** < 200ms for most operations
- **Create Operation:** < 300ms
- **Search with Filters:** < 250ms
- **Database Queries:** Optimized with indexes

---

**💡 Pro Tip:** Use Postman's Collection Runner to automate testing all endpoints in sequence!
