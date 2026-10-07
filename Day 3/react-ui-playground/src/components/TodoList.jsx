import { useState } from 'react';
import Button from './Button';
import Badge from './Badge';
import EmptyState from './EmptyState';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build a project', done: true },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {todos.length === 0 ? (
        <EmptyState icon="📝" title="No todos" message="Add your first todo" />
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Badge variant={todo.done ? 'success' : 'warning'}>
                  {todo.done ? 'Done' : 'Pending'}
                </Badge>
                <Button size="sm" variant="secondary" onClick={() => toggleTodo(todo.id)}>
                  {todo.done ? '↩' : '✓'}
                </Button>
                <Button size="sm" variant="danger" onClick={() => deleteTodo(todo.id)}>✕</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}