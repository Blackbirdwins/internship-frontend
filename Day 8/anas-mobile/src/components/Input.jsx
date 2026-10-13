import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../utils/theme';

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry, error, keyboardType = 'default' }) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.lg },
  label: { ...typography.tiny, color: colors.textMuted, marginBottom: spacing.sm },
  input: { backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, color: colors.text, fontSize: 15 },
  inputError: { borderColor: colors.danger },
  errorText: { ...typography.small, color: colors.danger, marginTop: spacing.xs },
});