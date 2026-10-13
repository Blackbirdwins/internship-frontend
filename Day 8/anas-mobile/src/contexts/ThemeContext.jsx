import { createContext, useContext } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme, meta] = useAsyncStorage('app_theme', 'dark');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loaded: meta.loaded }}>
      {children}
    </ThemeContext.Provider>
  );
}