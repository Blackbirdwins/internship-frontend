import { products, categories } from '../data/products';

export const fetchProducts = async (signal) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products;
};

export const fetchProductById = async (id, signal) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const product = products.find((p) => p.id === Number(id));
  if (!product) throw new Error('Product not found');
  return product;
};

export const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return categories;
};