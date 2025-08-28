import Company from "../models/Company.js";

// POST /api/companies
export const createCompany = async (req, res) => {
  try {
    // Validate required fields
    const { name, industry, location, employees, founded } = req.body;
    
    if (!name || !industry || !location) {
      return res.status(400).json({ 
        error: "Name, industry, and location are required fields" 
      });
    }

    const company = new Company({
      name: name.trim(),
      industry: industry.trim(),
      location: location.trim(),
      employees: employees ? Number(employees) : undefined,
      founded: founded ? Number(founded) : undefined
    });
    
    await company.save();
    res.status(201).json({ 
      success: true, 
      data: company,
      message: "Company created successfully" 
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Company name already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// GET /api/companies?industry=IT&location=India&minEmployees=100
export const getCompanies = async (req, res) => {
  try {
    const filters = {};
    
    // Build filters from query parameters
    if (req.query.industry) {
      filters.industry = { $regex: req.query.industry, $options: 'i' };
    }
    if (req.query.location) {
      filters.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.minEmployees) {
      filters.employees = { $gte: Number(req.query.minEmployees) };
    }
    if (req.query.maxEmployees) {
      filters.employees = { 
        ...filters.employees, 
        $lte: Number(req.query.maxEmployees) 
      };
    }
    if (req.query.foundedAfter) {
      filters.founded = { $gte: Number(req.query.foundedAfter) };
    }

    const companies = await Company.find(filters).sort({ name: 1 });
    
    res.json({ 
      success: true, 
      count: companies.length,
      data: companies 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch companies", 
      details: error.message 
    });
  }
};

// GET /api/companies/:id
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/companies/:id
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ 
      success: true, 
      data: company,
      message: "Company updated successfully" 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/companies/:id
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ 
      success: true, 
      message: "Company deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


