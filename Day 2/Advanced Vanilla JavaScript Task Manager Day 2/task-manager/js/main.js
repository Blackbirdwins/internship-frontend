// Task 2: ES6 Module Architecture
// Task 7: Event Delegation
// Task 12: Debugging

import { storage } from './storage.js';
import { validateTask } from './validation.js';
import { renderTasks, renderUsers } from './render.js';
import { fetchUsers } from './api.js';
import { generateId, searchTasks, sortTasks } from './utils.js';

// ===========================
// STATE
// ===========================
let tasks = storage.loadTasks();
let currentFilter = storage.loadFilter();
let currentSearch = storage.loadSearch();
let currentSort = 'date';
let currentTheme = storage.loadTheme();

// ===========================
// INIT
// ===========================
const init = () => {
  console.log('>>> App initialized');
  console.log('>>> Tasks loaded:', tasks.length);

  document.documentElement.setAttribute('data-theme', currentTheme);

  document.querySelector('#searchInput').value = currentSearch;
  document.querySelector('#filterStatus').value = currentFilter;

  render();
  setupEventListeners();
};

// ===========================
// RENDER
// ===========================
const render = () => {
  let filtered = tasks;

  if (currentFilter === 'active') {
    filtered = filtered.filter((t) => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter((t) => t.completed);
  }

  filtered = searchTasks(filtered, currentSearch);
  filtered = sortTasks(filtered, currentSort);

  renderTasks(filtered);
  storage.saveTasks(tasks);
};

// ===========================
// EVENT LISTENERS
// ===========================
const setupEventListeners = () => {
  document.querySelector('#taskForm').addEventListener('submit', handleAddTask);

  document.querySelector('#taskList').addEventListener('click', handleTaskAction);

  document.querySelector('#searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    storage.saveSearch(currentSearch);
    render();
  });

  document.querySelector('#filterStatus').addEventListener('change', (e) => {
    currentFilter = e.target.value;
    storage.saveFilter(currentFilter);
    render();
  });

  document.querySelector('#sortBy').addEventListener('change', (e) => {
    currentSort = e.target.value;
    render();
  });

  document.querySelector('#themeToggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    storage.saveTheme(currentTheme);
  });

  document.querySelector('#analyticsBtn').addEventListener('click', async () => {
    console.log('>>> Loading analytics (dynamic import)...');
    const { showAnalytics } = await import('./analytics.js');
    showAnalytics(tasks);
  });

  document.querySelector('#fetchUsersBtn').addEventListener('click', async () => {
    const output = document.querySelector('#apiOutput');
    output.innerHTML = '<p>Loading...</p>';

    const result = await fetchUsers();

    if (result.success) {
      renderUsers(result.data);
    } else {
      output.innerHTML = `<p class="error">Error: ${result.error}</p>`;
    }
  });
};

// ===========================
// ADD TASK
// ===========================
const handleAddTask = (e) => {
  e.preventDefault();

  const title = document.querySelector('#taskTitle').value;
  const priority = document.querySelector('#taskPriority').value;
  const dueDate = document.querySelector('#taskDueDate').value;

  const errors = validateTask({ title, priority, dueDate });
  const errorEl = document.querySelector('#formError');

  if (errors.length > 0) {
    errorEl.textContent = errors[0];
    return;
  }

  errorEl.textContent = '';

  const newTask = {
    id: generateId(),
    title: title.trim(),
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks = [newTask, ...tasks];
  render();

  e.target.reset();
  document.querySelector('#taskPriority').value = 'medium';

  console.log('>>> Task added:', newTask.title);
};

// ===========================
// TASK ACTIONS (Event Delegation)
// ===========================
const handleTaskAction = (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const taskItem = e.target.closest('.task-item');
  const id = taskItem.dataset.id;

  if (action === 'delete') {
    tasks = tasks.filter((t) => t.id !== id);
    console.log('>>> Task deleted:', id);
  } else if (action === 'toggle') {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    console.log('>>> Task toggled:', id);
  }

  render();
};

// ===========================
// START
// ===========================
init();   