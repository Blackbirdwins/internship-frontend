import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!form.username.trim()) errs.username = 'Username is required';
    else if (form.username.trim().length < 3) errs.username = 'Min 3 characters';

    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const result = login(form.username, form.password);
    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success');
    } else {
      setErrors({ form: result.error });
      addToast(result.error, 'error');
    }
  };

  const fillDemo = () => {
    setForm({ username: 'anas', password: 'anas123' });
    setErrors({});
  };

  return (
    <div className="login-page">
      <button className="login-theme-btn" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">⚡</div>
          <h1 className="login-title">Anas Admin Panel</h1>
          <p className="login-tagline">Sign in to manage your workspace</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Username</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">👤</span>
              <input
                className={`form-input login-input ${errors.username ? 'error' : ''}`}
                value={form.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                className={`form-input login-input ${errors.password ? 'error' : ''}`}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-pass-toggle"
                onClick={() => setShowPass((p) => !p)}
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {errors.form && (
            <div className="login-alert">{errors.form}</div>
          )}

          <button type="submit" className="btn btn-primary login-submit">
            Sign In →
          </button>
        </form>

        <div className="login-demo">
          <span>Try demo:</span>
          <button type="button" className="login-demo-btn" onClick={fillDemo}>
            anas / anas123
          </button>
        </div>
      </div>

      <p className="login-footer">© 2026 Anas Admin Panel — Day 5</p>
    </div>
  );
}