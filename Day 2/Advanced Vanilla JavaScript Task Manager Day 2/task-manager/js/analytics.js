// Task 11: Dynamic Import - lazy loaded

import { getStats } from './utils.js';

export const showAnalytics = (tasks) => {
  const stats = getStats(tasks);
  const panel = document.querySelector('#analyticsPanel');

  panel.innerHTML = `
    <h2>📊 Analytics</h2>
    <p><strong>Total Tasks:</strong> ${stats.total}</p>
    <p><strong>Completed:</strong> ${stats.completed}</p>
    <p><strong>Active:</strong> ${stats.active}</p>
    <p><strong>High Priority:</strong> ${stats.highPriority}</p>
    <p><strong>Completion Rate:</strong> ${stats.completionRate}%</p>
  `;
};