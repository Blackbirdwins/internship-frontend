import { log } from '../utils/logger';

const BASE_URL = 'https://dummyjson.com';
const TIMEOUT_MS = 10000;

// Custom API Error class
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Fetch with timeout
const fetchWithTimeout = (url, options = {}) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new ApiError('Request timed out', 408, 'TIMEOUT')), TIMEOUT_MS)
    ),
  ]);
};

// Core request handler with retry
const request = async (endpoint, options = {}, retries = 2) => {
  const url = `${BASE_URL}${endpoint}`;
  log('API Request:', options.method || 'GET', url);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          'HTTP_ERROR'
        );
      }

      const data = await response.json();
      log('API Success:', endpoint, data);
      return { success: true, data };
    } catch (error) {
      const isLast = attempt === retries;
      log('API Error (attempt ' + (attempt + 1) + '):', error.message);

      if (error.name === 'AbortError') {
        return { success: false, error: 'Request cancelled', code: 'CANCELED' };
      }

      if (isLast) {
        return {
          success: false,
          error: error.message || 'Network error',
          code: error.code || 'UNKNOWN',
          status: error.status,
        };
      }

      // Wait before retry
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
};

// Public API
export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};