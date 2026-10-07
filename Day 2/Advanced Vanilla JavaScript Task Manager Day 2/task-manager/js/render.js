// Task 6: Dynamic DOM Rendering
// Task 7: Event delegation - data attributes

import { formatDate, getPriorityLabel } from './utils.js';

export const renderTasks = (tasks) => {
  const list = document.querySelector('#taskList');
  const empty = document.querySelector('#emptyState');
  const count = document.querySelector('#taskCount');

  count.textContent = tasks.length;

  if (tasks.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  list.innerHTML = tasks
    .map(
      (task) => `
      <li class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="task-info">
          <strong>${task.title}</strong>
          <div>
            <small>${getPriorityLabel(task.priority)} • Due: ${formatDate(task.dueDate)}</small>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-complete" data-action="toggle">${task.completed ? '↩' : '✓'}</button>
          <button class="btn-delete" data-action="delete">✕</button>
        </div>
      </li>
    `
    )
    .join('');
};

export const renderUsers = (users) => {
  const output = document.querySelector('#apiOutput');
  output.innerHTML = users
    .map(
      (user) => `
      <div class="user-card">
        <strong>${user.name}</strong><br>
        <small>${user.email}</small>
      </div>
    `
    )
    .join('');
};