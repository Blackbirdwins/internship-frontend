import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { colors, spacing, radius, shadows } from '../utils/theme';

export default function BottomSheet({ visible, onClose, title, children }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <View style={styles.handle} />
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
          </View>
        )}
        <View style={styles.body}>{children}</View>
      </View>
    </Modal>
  );
}

export function SheetAction({ icon, label, onPress, variant = 'default' }) {
  const color = variant === 'danger' ? colors.danger : colors.text;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
    >
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderColor: colors.border2,
    ...shadows.md,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: colors.border2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.text },
  closeBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.bgElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  closeIcon: { fontSize: 14, color: colors.textMuted, fontWeight: '700' },
  body: { padding: 20 },
  action: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 14, paddingHorizontal: 4,
    minHeight: 52,
  },
  actionPressed: { opacity: 0.6 },
  actionIcon: { fontSize: 22 },
  actionLabel: { fontSize: 15, fontWeight: '600' },
}); 