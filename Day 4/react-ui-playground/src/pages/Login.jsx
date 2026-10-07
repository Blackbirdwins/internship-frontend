import { useState } from 'react';
import { login, register } from '../services/authService';
import Card from '../1/Card';
import Input from '../1/Input';
import Button from '../1/Button';
import '../1/components.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = isRegister
        ? await register(username, password)
        : await login(username, password);

      if (isRegister) {
        setError('✅ Registration successful! Please login.');
        setIsRegister(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <Card title={isRegister ? '📝 Register' : '🔐 Login'}>
        <form onSubmit={handleSubmit}>
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="anas"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
          <Button type="submit">{isRegister ? 'Register' : 'Login'}</Button>
          <br /><br />
          <Button
            type="button"
            variant="outline"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
          >
            {isRegister ? 'Already have account? Login' : 'New user? Register'}
          </Button>
        </form>
        {error && (
          <p style={{ marginTop: '1rem', color: error.startsWith('✅') ? 'green' : 'red' }}>
            {error}
          </p>
        )}
      </Card>
    </div>
  );
}