export const STATUS = ['pending', 'active', 'completed'];
export const PRIORITY = ['low', 'medium', 'high'];
export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Study'];

export const seedItems = [
  { id: 1, title: 'Finish React assignment', description: 'Complete Day 5 CRUD module', status: 'active', priority: 'high', category: 'Work', createdAt: '2026-10-01T10:00:00', updatedAt: '2026-10-01T10:00:00' },
  { id: 2, title: 'Buy groceries', description: 'Milk, eggs, bread, rice', status: 'pending', priority: 'medium', category: 'Shopping', createdAt: '2026-10-02T14:30:00', updatedAt: '2026-10-02T14:30:00' },
  { id: 3, title: 'Morning walk', description: '30 minutes around the park', status: 'completed', priority: 'low', category: 'Health', createdAt: '2026-10-03T06:00:00', updatedAt: '2026-10-03T06:00:00' },
  { id: 4, title: 'Read 20 pages', description: 'Finish the current book chapter', status: 'active', priority: 'low', category: 'Study', createdAt: '2026-10-04T20:00:00', updatedAt: '2026-10-04T20:00:00' },
  { id: 5, title: 'Call parents', description: 'Weekly check-in', status: 'pending', priority: 'high', category: 'Personal', createdAt: '2026-10-05T18:00:00', updatedAt: '2026-10-05T18:00:00' },
  { id: 6, title: 'Fix login bug', description: 'JWT token refresh issue', status: 'completed', priority: 'high', category: 'Work', createdAt: '2026-10-05T09:15:00', updatedAt: '2026-10-05T09:15:00' },
];

export const createItem = (data) => ({
  id: Date.now(),
  title: data.title.trim(),
  description: data.description?.trim() || '',
  status: data.status || 'pending',
  priority: data.priority || 'medium',
  category: data.category || 'Personal',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});