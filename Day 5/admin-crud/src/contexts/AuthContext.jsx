import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

// Mock users (no backend)
const USERS = [
  { username: 'anas', password: 'anas123', name: 'Anas', role: 'admin' },
  { username: 'admin', password: 'admin123', name: 'Admin', role: 'admin' },
  { username: 'guest', password: 'guest123', name: 'Guest', role: 'viewer' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid username or password' };

    const safeUser = { username: found.username, name: found.name, role: found.role };
    setUser(safeUser);
    localStorage.setItem('user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}