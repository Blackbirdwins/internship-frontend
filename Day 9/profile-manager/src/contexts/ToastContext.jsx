import { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../utils/theme';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};

const COLORS = { success: colors.accent, error: colors.danger, warning: colors.warning, info: colors.primary };
const ICONS = { success: '✓', error: '✕', warning: '!', info: 'i' };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View pointerEvents="none" style={styles.container}>
        {toasts.map(t => (
          <View key={t.id} style={[styles.toast, { borderLeftColor: COLORS[t.type] }]}>
            <View style={[styles.icon, { backgroundColor: COLORS[t.type] + '22' }]}>
              <Text style={[styles.iconText, { color: COLORS[t.type] }]}>{ICONS[t.type]}</Text>
            </View>
            <Text style={styles.msg}>{t.message}</Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 60, right: spacing.lg, left: spacing.lg, gap: spacing.sm, zIndex: 9999 },
  toast: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 4, borderRadius: radius.md, padding: spacing.md,
  },
  icon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontWeight: '800', fontSize: 14 },
  msg: { flex: 1, color: colors.text, fontSize: 13.5, fontWeight: '500' },
});