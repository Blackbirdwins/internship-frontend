import { api } from './api';

export const fetchProducts = (limit = 20) =>
  api.get(`/products?limit=${limit}`);

export const fetchProductById = (id) =>
  api.get(`/products/${id}`);

export const fetchCategories = () =>
  api.get('/products/category-list');

export const searchProducts = (query) =>
  api.get(`/products/search?q=${encodeURIComponent(query)}`);