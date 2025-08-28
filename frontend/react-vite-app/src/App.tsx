import { useEffect, useState } from "react";
import axios from "axios";
import type {
  Company,
  ApiResponse,
  Filters,
  FormData,
  CompanyPayload,
  AxiosErrorResponse,
  FormEvent,
  InputChangeEvent
} from "./types";
import {
  API_URLS,
  DEFAULT_FORM_DATA,
  DEFAULT_FILTERS,
  MESSAGES,
  UI_TEXT,
  TABLE_COLUMNS,
  VALIDATION
} from "./constants";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

  useEffect(() => {
    fetchCompanies();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCompanies = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value.trim() !== "")
      );
      
      const response = await axios.get<ApiResponse>(API_URLS.COMPANIES, { params });
      
      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
        setCompanies([]);
      }
    } catch (err: unknown) {
      const error = err as AxiosErrorResponse;
      setError(error.response?.data?.error || MESSAGES.ERROR.FETCH_FAILED);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.industry.trim() || !formData.location.trim()) {
      setError(MESSAGES.ERROR.REQUIRED_FIELDS);
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const payload: CompanyPayload = {
        name: formData.name.trim(),
        industry: formData.industry.trim(),
        location: formData.location.trim(),
        ...(formData.employees && { employees: parseInt(formData.employees) }),
        ...(formData.founded && { founded: parseInt(formData.founded) })
      };

      const response = await axios.post(API_URLS.COMPANIES, payload);
      
      if (response.data.success) {
        setSuccess(MESSAGES.SUCCESS.COMPANY_ADDED);
        setFormData(DEFAULT_FORM_DATA);
        setShowAddForm(false);
        await fetchCompanies();
      }
    } catch (err: unknown) {
      const error = err as AxiosErrorResponse;
      setError(error.response?.data?.error || MESSAGES.ERROR.ADD_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: string): Promise<void> => {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE_COMPANY)) {
      return;
    }

    try {
      setError("");
      const response = await axios.delete(API_URLS.COMPANY_BY_ID(id));
      
      if (response.data.success) {
        setSuccess(MESSAGES.SUCCESS.COMPANY_DELETED);
        await fetchCompanies();
      }
    } catch (err: unknown) {
      const error = err as AxiosErrorResponse;
      setError(error.response?.data?.error || MESSAGES.ERROR.DELETE_FAILED);
    }
  };

  const clearFilters = (): void => {
    setFilters(DEFAULT_FILTERS);
  };

  const dismissMessage = (): void => {
    setError("");
    setSuccess("");
  };

  const handleFilterChange = (field: keyof Filters) => (e: InputChangeEvent): void => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const handleFormChange = (field: keyof FormData) => (e: InputChangeEvent): void => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    if (showAddForm) {
      setFormData(DEFAULT_FORM_DATA);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>{UI_TEXT.HEADERS.MAIN_TITLE}</h1>
      </div>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={dismissMessage} 
            style={{ 
              float: 'right', 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer' 
            }}
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="success">
          {success}
          <button 
            onClick={dismissMessage} 
            style={{ 
              float: 'right', 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer' 
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters Section */}
      <div className="card">
        <h3>{UI_TEXT.HEADERS.SEARCH_FILTER}</h3>
        <div className="filters-grid">
          <div className="input-group">
            <label>{UI_TEXT.LABELS.INDUSTRY}</label>
            <input
              type="text"
              placeholder={MESSAGES.PLACEHOLDER.INDUSTRY}
              value={filters.industry}
              onChange={handleFilterChange('industry')}
            />
          </div>

          <div className="input-group">
            <label>{UI_TEXT.LABELS.LOCATION}</label>
            <input
              type="text"
              placeholder={MESSAGES.PLACEHOLDER.LOCATION}
              value={filters.location}
              onChange={handleFilterChange('location')}
            />
          </div>

          <div className="input-group">
            <label>{UI_TEXT.LABELS.MIN_EMPLOYEES}</label>
            <input
              type="number"
              placeholder={MESSAGES.PLACEHOLDER.MIN_EMPLOYEES}
              value={filters.minEmployees}
              onChange={handleFilterChange('minEmployees')}
              min={VALIDATION.MIN_EMPLOYEES}
            />
          </div>

          <div className="input-group">
            <label>{UI_TEXT.LABELS.MAX_EMPLOYEES}</label>
            <input
              type="number"
              placeholder={MESSAGES.PLACEHOLDER.MAX_EMPLOYEES}
              value={filters.maxEmployees}
              onChange={handleFilterChange('maxEmployees')}
              min={VALIDATION.MIN_EMPLOYEES}
              max={VALIDATION.MAX_EMPLOYEES}
            />
          </div>

          <div className="input-group">
            <label>{UI_TEXT.LABELS.FOUNDED_AFTER}</label>
            <input
              type="number"
              placeholder={MESSAGES.PLACEHOLDER.FOUNDED_AFTER}
              value={filters.foundedAfter}
              onChange={handleFilterChange('foundedAfter')}
              min={VALIDATION.MIN_YEAR}
              max={VALIDATION.MAX_YEAR}
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-secondary" onClick={clearFilters}>
            {UI_TEXT.BUTTONS.CLEAR_FILTERS}
          </button>
          <button className="btn btn-primary" onClick={toggleAddForm}>
            {showAddForm ? UI_TEXT.BUTTONS.CANCEL : UI_TEXT.BUTTONS.ADD_COMPANY}
          </button>
        </div>
      </div>

      {/* Add Company Form */}
      {showAddForm && (
        <div className="card">
          <h3>{UI_TEXT.HEADERS.ADD_COMPANY}</h3>
          <form onSubmit={addCompany}>
            <div className="form-grid">
              <div className="input-group">
                <label>{UI_TEXT.LABELS.COMPANY_NAME} *</label>
                <input
                  type="text"
                  placeholder={MESSAGES.PLACEHOLDER.COMPANY_NAME}
                  value={formData.name}
                  onChange={handleFormChange('name')}
                  maxLength={VALIDATION.MAX_NAME_LENGTH}
                  required
                />
              </div>

              <div className="input-group">
                <label>{UI_TEXT.LABELS.INDUSTRY} *</label>
                <input
                  type="text"
                  placeholder={MESSAGES.PLACEHOLDER.INDUSTRY}
                  value={formData.industry}
                  onChange={handleFormChange('industry')}
                  maxLength={VALIDATION.MAX_INDUSTRY_LENGTH}
                  required
                />
              </div>

              <div className="input-group">
                <label>{UI_TEXT.LABELS.LOCATION} *</label>
                <input
                  type="text"
                  placeholder={MESSAGES.PLACEHOLDER.LOCATION}
                  value={formData.location}
                  onChange={handleFormChange('location')}
                  maxLength={VALIDATION.MAX_LOCATION_LENGTH}
                  required
                />
              </div>

              <div className="input-group">
                <label>{UI_TEXT.LABELS.EMPLOYEES}</label>
                <input
                  type="number"
                  placeholder={MESSAGES.PLACEHOLDER.EMPLOYEES}
                  value={formData.employees}
                  onChange={handleFormChange('employees')}
                  min={VALIDATION.MIN_EMPLOYEES}
                  max={VALIDATION.MAX_EMPLOYEES}
                />
              </div>

              <div className="input-group">
                <label>{UI_TEXT.LABELS.FOUNDED_YEAR}</label>
                <input
                  type="number"
                  placeholder={MESSAGES.PLACEHOLDER.FOUNDED_YEAR}
                  value={formData.founded}
                  onChange={handleFormChange('founded')}
                  min={VALIDATION.MIN_YEAR}
                  max={VALIDATION.MAX_YEAR}
                />
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? MESSAGES.LOADING.ADDING : UI_TEXT.BUTTONS.SUBMIT}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Companies Table */}
      <div className="card">
        <div className="stats">
          <h3>{UI_TEXT.HEADERS.COMPANIES_LIST} ({companies.length})</h3>
          {loading && <span>{MESSAGES.LOADING.LOADING}</span>}
        </div>

        {loading && companies.length === 0 ? (
          <div className="loading">
            <p>{MESSAGES.LOADING.LOADING} companies...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="empty-state">
            <h3>{UI_TEXT.EMPTY_STATE.NO_COMPANIES}</h3>
            <p>{UI_TEXT.EMPTY_STATE.NO_COMPANIES_DESC}</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="companies-table">
              <thead>
                <tr>
                  {TABLE_COLUMNS.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company._id}>
                    <td><strong>{company.name}</strong></td>
                    <td>{company.industry}</td>
                    <td>{company.location}</td>
                    <td>
                      {company.employees ? company.employees.toLocaleString() : '-'}
                    </td>
                    <td>
                      {company.founded || '-'}
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteCompany(company._id)}
                        title="Delete company"
                      >
                        {UI_TEXT.BUTTONS.DELETE}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;