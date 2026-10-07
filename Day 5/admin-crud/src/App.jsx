import { useReducer, useState, useEffect } from 'react';
import { itemReducer, initialState, saveToStorage } from './reducers/itemReducer';
import { formatDate } from './utils/validate';
import { simulateApiCall } from './services/api';
import { useToast } from './contexts/ToastContext';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';
import Modal from './components/Modal';
import ItemForm from './components/ItemForm';
import ConfirmDialog from './components/ConfirmDialog';
import LoginPage from './components/LoginPage';
import './App.css';

function Badge({ text, type }) {
  return <span className={`badge badge-${type}`}>{text}</span>;
}

export default function App() {
  const { user, logout } = useAuth();

  if (!user) return <LoginPage />;

  return <AdminPanel user={user} logout={logout} />;
}

function AdminPanel({ user, logout }) {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  const items = state.items;

  const [view, setView] = useLocalStorage('admin_view', 'table');
  const [busyIds, setBusyIds] = useState([]);

  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const stats = {
    total: items.length,
    pending: items.filter((i) => i.status === 'pending').length,
    active: items.filter((i) => i.status === 'active').length,
    completed: items.filter((i) => i.status === 'completed').length,
  };

  const openCreate = () => { setEditing(null); setModal(true); };
  const openEdit = (item) => { setEditing(item); setModal(true); };

  const handleSubmit = async (formData) => {
    const prevState = items;

    if (editing) {
      dispatch({ type: 'UPDATE', payload: { id: editing.id, data: formData } });
      setBusyIds((p) => [...p, editing.id]);
    } else {
      dispatch({ type: 'ADD', payload: formData });
    }
    setModal(false);
    setEditing(null);

    const ok = await simulateApiCall();

    if (ok) {
      addToast(editing ? 'Item updated' : 'Item created', 'success');
    } else {
      dispatch({ type: 'ROLLBACK', payload: prevState });
      addToast('Server error — rolled back', 'error');
    }
    if (editing) setBusyIds((p) => p.filter((id) => id !== editing.id));
  };

  const confirmDelete = async () => {
    const prevState = items;
    const target = deleting;
    dispatch({ type: 'DELETE', payload: target.id });
    setDeleting(null);

    const ok = await simulateApiCall();

    if (ok) {
      addToast(`"${target.title}" deleted`, 'error');
    } else {
      dispatch({ type: 'ROLLBACK', payload: prevState });
      addToast('Delete failed — restored', 'error');
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all items to default?')) return;
    dispatch({ type: 'RESET' });
    addToast('Data reset to defaults', 'info');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">⚡ Anas Admin Panel</h1>
          <p className="app-subtitle">Day 5 — CRUD Module</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" onClick={handleReset} title="Reset data">↺</button>

          <div className="user-chip">
            <span className="user-avatar">{user.name[0].toUpperCase()}</span>
            <span className="user-name">{user.name}</span>
            <button className="icon-btn" onClick={() => { logout(); addToast('Logged out', 'info'); }} title="Logout">⎋</button>
          </div>

          <div className="view-toggle">
            <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>📋 Table</button>
            <button className={view === 'card' ? 'active' : ''} onClick={() => setView('card')}>🎴 Cards</button>
          </div>
          <button className="btn btn-primary" onClick={openCreate}>+ New Item</button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total</div><div className="stat-value purple">{stats.total}</div></div>
        <div className="stat-card"><div className="stat-label">Pending</div><div className="stat-value amber">{stats.pending}</div></div>
        <div className="stat-card"><div className="stat-label">Active</div><div className="stat-value purple">{stats.active}</div></div>
        <div className="stat-card"><div className="stat-label">Completed</div><div className="stat-value green">{stats.completed}</div></div>
      </div>

      {view === 'table' ? (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th><th>Category</th><th>Status</th><th>Priority</th><th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={busyIds.includes(item.id) ? 'busy' : ''}>
                  <td>
                    <div className="table-title">{item.title}</div>
                    <div className="table-desc">{item.description}</div>
                  </td>
                  <td>{item.category}</td>
                  <td><Badge text={item.status} type={item.status} /></td>
                  <td><Badge text={item.priority} type={`priority-${item.priority}`} /></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" onClick={() => openEdit(item)} title="Edit">✏️</button>
                      <button className="icon-btn danger" onClick={() => setDeleting(item)} title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-grid">
          {items.map((item) => (
            <div key={item.id} className={`item-card ${busyIds.includes(item.id) ? 'busy' : ''}`}>
              <div className="item-card-header">
                <div className="item-card-title">{item.title}</div>
                <Badge text={item.status} type={item.status} />
              </div>
              <p className="item-card-desc">{item.description}</p>
              <div className="item-card-footer">
                <Badge text={item.priority} type={`priority-${item.priority}`} />
                <div className="action-btns">
                  <button className="icon-btn" onClick={() => openEdit(item)} title="Edit">✏️</button>
                  <button className="icon-btn danger" onClick={() => setDeleting(item)} title="Delete">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => { setModal(false); setEditing(null); }} title={editing ? 'Edit Item' : 'Create New Item'}>
        <ItemForm initialData={editing} onSubmit={handleSubmit} onCancel={() => { setModal(false); setEditing(null); }} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        itemName={deleting?.title}
      />
    </div>
  );
}