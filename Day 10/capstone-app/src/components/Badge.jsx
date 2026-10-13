import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { radius } from '../utils/theme';

export default function Badge({ children, variant = 'default', size = 'md' }) {
  const { colors } = useTheme();

  const config = {
    default: { bg: colors.bgElevated, text: colors.textMuted },
    primary: { bg: colors.primarySoft, text: colors.primary },
    success: { bg: colors.accentSoft, text: colors.accent },
    warning: { bg: colors.warningSoft, text: colors.warning },
    danger: { bg: colors.dangerSoft, text: colors.danger },
  }[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          paddingHorizontal: size === 'sm' ? 8 : 10,
          paddingVertical: size === 'sm' ? 2 : 4,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: config.text, fontSize: size === 'sm' ? 10 : 11 },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
  },
  text: { fontWeight: '700', letterSpacing: 0.4 },
});