import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Company name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Company name cannot exceed 100 characters"]
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
    maxlength: [50, "Industry cannot exceed 50 characters"]
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    maxlength: [50, "Location cannot exceed 50 characters"]
  },
  employees: {
    type: Number,
    min: [1, "Number of employees must be at least 1"],
    max: [1000000, "Number of employees cannot exceed 1,000,000"]
  },
  founded: {
    type: Number,
    min: [1800, "Founded year must be after 1800"],
    max: [new Date().getFullYear(), "Founded year cannot be in the future"]
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add indexes for better query performance
companySchema.index({ industry: 1 });
companySchema.index({ location: 1 });
companySchema.index({ employees: 1 });
companySchema.index({ founded: 1 });
companySchema.index({ name: "text", industry: "text", location: "text" });

export default mongoose.model("Company", companySchema);
