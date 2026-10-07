// Task 9: LocalStorage persistence

const KEYS = {
  tasks: 'tm_tasks',
  filter: 'tm_filter',
  search: 'tm_search',
  theme: 'tm_theme',
};

export const storage = {
  saveTasks: (tasks) => localStorage.setItem(KEYS.tasks, JSON.stringify(tasks)),
  loadTasks: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.tasks)) ?? [];
    } catch {
      return [];
    }
  },

  saveFilter: (filter) => localStorage.setItem(KEYS.filter, filter),
  loadFilter: () => localStorage.getItem(KEYS.filter) ?? 'all',

  saveSearch: (search) => localStorage.setItem(KEYS.search, search),
  loadSearch: () => localStorage.getItem(KEYS.search) ?? '',

  saveTheme: (theme) => localStorage.setItem(KEYS.theme, theme),
  loadTheme: () => localStorage.getItem(KEYS.theme) ?? 'light',
};