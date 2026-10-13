import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, accents } from '../utils/theme';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};

const KEY_MODE = '@theme_mode_v4';
const KEY_ACCENT = '@theme_accent_v4';

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const [accentKey, setAccentKey] = useState('cyber');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedMode, savedAccent] = await Promise.all([
          AsyncStorage.getItem(KEY_MODE),
          AsyncStorage.getItem(KEY_ACCENT),
        ]);
        if (savedMode) setMode(savedMode);
        if (savedAccent) setAccentKey(savedAccent);
      } catch {}
      finally { setLoaded(true); }
    })();
  }, []);

  const toggle = async () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    try { await AsyncStorage.setItem(KEY_MODE, next); } catch {}
  };

  const setTheme = async (m) => {
    setMode(m);
    try { await AsyncStorage.setItem(KEY_MODE, m); } catch {}
  };

  const setAccent = async (key) => {
    setAccentKey(key);
    try { await AsyncStorage.setItem(KEY_ACCENT, key); } catch {}
  };

  const base = mode === 'dark' ? darkColors : lightColors;
  const accent = accents[accentKey] || accents.cyber;

  // Override primary with active accent
  const colors = {
    ...base,
    primary: accent.primary,
    primarySoft: accent.soft,
    primaryGlow: accent.glow,
  };

  const isDark = mode === 'dark';

  return (
    <ThemeContext.Provider value={{
      mode, colors, isDark, toggle, setTheme,
      accentKey, accent, setAccent, allAccents: accents,
      loaded,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}