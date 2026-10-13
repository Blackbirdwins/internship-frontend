import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { radius, shadows, spacing, hoverTransition } from '../utils/theme';

export default function Card({ children, title, subtitle, style, onPress, variant = 'default', interactive }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isInteractive = interactive || !!onPress;

  const hoverProps = Platform.OS === 'web' && isInteractive ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  const Container = isInteractive ? Pressable : View;

  const baseShadow = variant === 'elevated' ? shadows.md : shadows.sm;
  const hoverShadow = hovered && Platform.OS === 'web' ? shadows.lg : baseShadow;

  return (
    <Container
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.card,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered && Platform.OS === 'web' ? colors.border2 : colors.border,
          ...hoverShadow,
        },
        hovered && Platform.OS === 'web' && isInteractive && {
          transform: [{ translateY: -4 }],
          borderColor: colors.primary,
        },
        isInteractive && hoverTransition,
        style,
      ]}
    >
      {title && (
        <View style={{ marginBottom: subtitle ? 4 : spacing.sm }}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 0.5,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 13, fontWeight: '500', marginTop: 2 },
});