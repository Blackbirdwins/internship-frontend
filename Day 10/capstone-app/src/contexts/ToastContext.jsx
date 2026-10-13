import { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from './ThemeContext';
import { radius, shadows } from '../utils/theme';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};

export function ToastProvider({ children }) {
  const { colors, isDark } = useTheme();
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);

  const colorMap = {
    success: colors.accent,
    error: colors.danger,
    warning: colors.warning,
    info: colors.primary,
  };
  const iconMap = { success: '✓', error: '✕', warning: '!', info: 'i' };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View pointerEvents="none" style={styles.container}>
        {toasts.map(t => (
          <View
            key={t.id}
            style={[
              styles.toast,
              {
                backgroundColor: isDark ? 'rgba(23, 23, 26, 0.94)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: colors.border2,
                ...shadows.lg,
              },
              Platform.OS === 'web' && {
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              },
            ]}
          >
            <View style={[styles.icon, { backgroundColor: colorMap[t.type] + '20' }]}>
              <Text style={[styles.iconText, { color: colorMap[t.type] }]}>
                {iconMap[t.type]}
              </Text>
            </View>
            <Text style={[styles.msg, { color: colors.text }]} numberOfLines={2}>
              {t.message}
            </Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    right: 16,
    left: 16,
    gap: 8,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 0.5,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  icon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontWeight: '800', fontSize: 13 },
  msg: { flex: 1, fontSize: 13.5, fontWeight: '600', letterSpacing: -0.1 },
});