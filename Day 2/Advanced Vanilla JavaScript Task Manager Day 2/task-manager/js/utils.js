// Task 5: Reusable utility functions
// Task 3: Modern JS syntax (arrow functions, template literals, destructuring)

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const formatDate = (dateStr) => {
  if (!dateStr) return 'No due date';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getPriorityLabel = (priority) => {
  const labels = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };
  return labels[priority] ?? 'Medium';
};

export const normalize = (str) => str.toLowerCase().trim();

export const searchTasks = (tasks, query) => {
  if (!query) return tasks;
  const q = normalize(query);
  return tasks.filter((task) => normalize(task.title).includes(q));
};

export const sortTasks = (tasks, sortBy) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sorted = [...tasks];

  switch (sortBy) {
    case 'priority':
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'date':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

// Task 4: Data transformation - statistics
export const getStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = tasks.filter((t) => !t.completed).length;
  const highPriority = tasks.filter((t) => t.priority === 'high').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, active, highPriority, completionRate };
};