// Task 8: Form validation

export const validateTask = ({ title, priority, dueDate }) => {
  const errors = [];

  if (!title || !title.trim()) {
    errors.push('Title is required');
  }

  if (title && title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (dueDate) {
    const selected = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.push('Due date cannot be in the past');
    }
  }

  return errors;
};