import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { radius, shadows, spacing, hoverTransition } from '../utils/theme';

export default function GlowCard({
  children, title, subtitle, style, onPress,
  glow = true, glowColor, accentBar, variant = 'default',
}) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isInteractive = !!onPress;

  const hoverProps = Platform.OS === 'web' && isInteractive ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  const Container = isInteractive ? Pressable : View;
  const baseShadow = variant === 'elevated' ? shadows.md : shadows.sm;
  const gc = glowColor || colors.primary;

  return (
    <Container
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.card,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered ? gc : colors.border,
          ...baseShadow,
        },
        accentBar && { borderLeftWidth: 3, borderLeftColor: gc },
        hovered && Platform.OS === 'web' && isInteractive && { transform: [{ translateY: -2 }] },
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
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { fontSize: 15, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 12.5, fontWeight: '500', marginTop: 2 },
});