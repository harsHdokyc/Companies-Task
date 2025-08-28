/**
 * Constants and configuration for the Companies Management System
 * 
 * This file contains all constant values, API URLs, validation rules,
 * UI text, and other configuration values used throughout the application.
 * Centralizing these values makes the code more maintainable and easier to update.
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    COMPANIES: '/api/companies',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

// API URLs
export const API_URLS = {
  COMPANIES: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPANIES}`,
  COMPANY_BY_ID: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPANIES}/${id}`,
} as const;

// Form validation constants
export const VALIDATION = {
  REQUIRED_FIELDS: ['name', 'industry', 'location'] as const,
  MIN_YEAR: 1800,
  MAX_YEAR: new Date().getFullYear(),
  MIN_EMPLOYEES: 1,
  MAX_EMPLOYEES: 1000000,
  MAX_NAME_LENGTH: 100,
  MAX_INDUSTRY_LENGTH: 50,
  MAX_LOCATION_LENGTH: 50,
} as const;

// Default form values
export const DEFAULT_FORM_DATA = {
  name: '',
  industry: '',
  location: '',
  employees: '',
  founded: '',
} as const;

// Default filter values
export const DEFAULT_FILTERS = {
  industry: '',
  location: '',
  minEmployees: '',
  maxEmployees: '',
  foundedAfter: '',
} as const;

// UI Messages
export const MESSAGES = {
  SUCCESS: {
    COMPANY_ADDED: 'Company added successfully!',
    COMPANY_DELETED: 'Company deleted successfully!',
    COMPANY_UPDATED: 'Company updated successfully!',
  },
  ERROR: {
    FETCH_FAILED: 'Failed to fetch companies',
    ADD_FAILED: 'Failed to add company',
    DELETE_FAILED: 'Failed to delete company',
    UPDATE_FAILED: 'Failed to update company',
    REQUIRED_FIELDS: 'Name, industry, and location are required',
    NETWORK_ERROR: 'Network error. Please check your connection.',
  },
  CONFIRM: {
    DELETE_COMPANY: 'Are you sure you want to delete this company?',
  },
  LOADING: {
    ADDING: 'Adding...',
    LOADING: 'Loading...',
    DELETING: 'Deleting...',
  },
  PLACEHOLDER: {
    COMPANY_NAME: 'Enter company name',
    INDUSTRY: 'e.g., Technology',
    LOCATION: 'e.g., San Francisco',
    EMPLOYEES: 'e.g., 500',
    FOUNDED_YEAR: 'e.g., 2010',
    MIN_EMPLOYEES: 'e.g., 100',
    MAX_EMPLOYEES: 'e.g., 1000',
    FOUNDED_AFTER: 'e.g., 2010',
  },
} as const;

// UI Text
export const UI_TEXT = {
  HEADERS: {
    MAIN_TITLE: 'Companies Directory',
    SEARCH_FILTER: 'Search & Filter',
    ADD_COMPANY: 'Add New Company',
    COMPANIES_LIST: 'Companies',
  },
  LABELS: {
    INDUSTRY: 'Industry',
    LOCATION: 'Location',
    MIN_EMPLOYEES: 'Min Employees',
    MAX_EMPLOYEES: 'Max Employees',
    FOUNDED_AFTER: 'Founded After',
    COMPANY_NAME: 'Company Name',
    EMPLOYEES: 'Employees',
    FOUNDED_YEAR: 'Founded Year',
    ACTIONS: 'Actions',
  },
  BUTTONS: {
    CLEAR_FILTERS: 'Clear Filters',
    ADD_COMPANY: 'Add Company',
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    SUBMIT: 'Add Company',
  },
  EMPTY_STATE: {
    NO_COMPANIES: 'No companies found',
    NO_COMPANIES_DESC: 'Add a company to get started or adjust your filters.',
  },
} as const;

// Table column configuration
export const TABLE_COLUMNS = [
  { key: 'name', label: UI_TEXT.LABELS.COMPANY_NAME },
  { key: 'industry', label: UI_TEXT.LABELS.INDUSTRY },
  { key: 'location', label: UI_TEXT.LABELS.LOCATION },
  { key: 'employees', label: UI_TEXT.LABELS.EMPLOYEES },
  { key: 'founded', label: 'Founded' },
  { key: 'actions', label: UI_TEXT.LABELS.ACTIONS },
] as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
