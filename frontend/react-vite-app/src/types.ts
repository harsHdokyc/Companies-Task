/**
 * Type definitions for the Companies Management System
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 * It provides type safety and better developer experience with IntelliSense support.
 */

// Company entity type
export interface Company {
  _id: string;
  name: string;
  industry: string;
  location: string;
  employees?: number;
  founded?: number;
  createdAt?: string;
  updatedAt?: string;
}

// API response types
export interface ApiResponse {
  success: boolean;
  data: Company[];
  count?: number;
  message?: string;
}

export interface ApiSingleResponse {
  success: boolean;
  data: Company;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: string;
}

// Filter types
export interface Filters {
  industry: string;
  location: string;
  minEmployees: string;
  maxEmployees: string;
  foundedAfter: string;
}

// Form data types
export interface FormData {
  name: string;
  industry: string;
  location: string;
  employees: string;
  founded: string;
}

export interface CompanyPayload {
  name: string;
  industry: string;
  location: string;
  employees?: number;
  founded?: number;
}

// Application state types
export interface AppState {
  companies: Company[];
  loading: boolean;
  error: string;
  success: string;
  showAddForm: boolean;
}

// Event handler types
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

// API error type for error handling
export interface AxiosErrorResponse {
  response?: {
    data?: {
      error?: string;
      details?: string;
    };
  };
}
