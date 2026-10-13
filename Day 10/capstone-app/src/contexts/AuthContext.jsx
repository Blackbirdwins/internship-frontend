import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

const KEY = '@auth_v3';

// Mock users
const MOCK_USERS = [
  { username: 'anas', password: 'anas123', name: 'Anas Khan', role: 'admin' },
  { username: 'ali', password: 'ali123', name: 'Ali Raza', role: 'user' },
  { username: 'guest', password: 'guest123', name: 'Guest', role: 'viewer' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {}
      finally { setLoaded(true); }
    })();
  }, []);

  const login = async (username, password) => {
    if (!username || !password) return { success: false, error: 'Username aur password required' };
    const found = MOCK_USERS.find(
      u => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid credentials' };

    const safe = { username: found.username, name: found.name, role: found.role };
    setUser(safe);
    try { await AsyncStorage.setItem(KEY, JSON.stringify(safe)); } catch {}
    return { success: true, user: safe };
  };

  const register = async (username, password, name) => {
    if (!username || username.length < 3) return { success: false, error: 'Username min 3 chars' };
    if (!password || password.length < 6) return { success: false, error: 'Password min 6 chars' };
    const safe = { username, name: name || username, role: 'user' };
    setUser(safe);
    try { await AsyncStorage.setItem(KEY, JSON.stringify(safe)); } catch {}
    return { success: true, user: safe };
  };

  const logout = async () => {
    setUser(null);
    try { await AsyncStorage.removeItem(KEY); } catch {}
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loaded }}>
      {children}
    </AuthContext.Provider>
  );
}