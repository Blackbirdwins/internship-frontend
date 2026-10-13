import { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../utils/theme';

const Input = forwardRef(({ label, error, style, ...props }, ref) => (
  <View style={styles.wrapper}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      ref={ref}
      style={[styles.input, error && styles.inputError, style]}
      placeholderTextColor={colors.textDim}
      {...props}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
));

export default Input;

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.lg },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 48,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 11,
    marginTop: 5,
    fontWeight: '500',
  },
});