import { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { radius } from '../utils/theme';

const Input = forwardRef(({ label, error, style, multiline, icon, ...props }, ref) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>}
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: focused ? colors.bgCard : colors.bgElevated,
            borderColor: focused ? colors.primary : colors.border,
          },
          error && { borderColor: colors.danger },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? colors.primary : colors.textMuted}
            style={{ marginRight: 8 }}
          />
        )}
        <TextInput
          ref={ref}
          style={[styles.input, { color: colors.text }, multiline && styles.multiline, style]}
          placeholderTextColor={colors.textDim}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          multiline={multiline}
          {...props}
        />
      </View>
      {error && (
        <View style={styles.errorRow}>
          <View style={[styles.errDot, { backgroundColor: colors.danger }]} />
          <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
        </View>
      )}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.2, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1.5,
    ...Platform.select({ web: { transition: 'all 0.2s ease' }, default: {} }),
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 50,
    ...Platform.select({ web: { outlineStyle: 'none' }, default: {} }),
  },
  multiline: { minHeight: 76, textAlignVertical: 'top', paddingTop: 14 },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  errDot: { width: 6, height: 6, borderRadius: 3 },
  error: { fontSize: 12, fontWeight: '500' },
});