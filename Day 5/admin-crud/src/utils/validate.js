import { STATUS, PRIORITY } from '../data/items';

export const validateItem = (data) => {
  const errors = {};

  if (!data.title || !data.title.trim()) errors.title = 'Title is required';
  else if (data.title.trim().length < 3) errors.title = 'Min 3 characters';
  else if (data.title.trim().length > 50) errors.title = 'Max 50 characters';

  if (data.description && data.description.length > 200) {
    errors.description = 'Max 200 characters';
  }

  if (!STATUS.includes(data.status)) errors.status = 'Invalid status';
  if (!PRIORITY.includes(data.priority)) errors.priority = 'Invalid priority';
  if (!data.category) errors.category = 'Category is required';

  return errors;
};

// Email validation (Task 6 requirement)
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return 'Invalid email format';
  return null;
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });