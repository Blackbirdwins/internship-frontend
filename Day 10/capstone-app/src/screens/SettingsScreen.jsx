import { View, Text, ScrollView, Pressable, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../contexts/NotesContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { radius, shadows } from '../utils/theme';

export default function SettingsScreen({ navigation }) {
  const { colors, mode, toggle, isDark } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const { notes, clearAll: clearNotes } = useNotes();
  const { ids, clearFavorites } = useFavorites();
  const { showToast } = useToast();

  const Row = ({ icon, label, value, onPress, variant }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border },
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={[styles.rowIcon, { backgroundColor: colors.bgElevated }]}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <Text style={[styles.rowLabel, { color: variant === 'danger' ? colors.danger : colors.text }]}>
        {label}
      </Text>
      {value ? <Text style={[styles.rowValue, { color: colors.textMuted }]}>{value}</Text> : null}
      <Text style={{ color: colors.textDim, fontSize: 18 }}>›</Text>
    </Pressable>
  );

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionLabel, { color: colors.textDim }]}>{title}</Text>
      <View style={[styles.sectionCard, { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.sm }]}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="Settings" subtitle="Manage preferences" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Section title="APPEARANCE">
          <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.bgElevated }]}>
              <Text style={{ fontSize: 16 }}>{isDark ? '☾' : '☀'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.rowValue, { color: colors.textMuted, marginTop: 2 }]}>
                {isDark ? 'Currently dark theme' : 'Currently light theme'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </Section>

        <Section title="DATA">
          <Row icon="✎" label="Notes" value={`${notes.length}`} />
          <Row icon="♡" label="Favorites" value={`${ids.length}`} />
          <Row
            icon="🗑"
            label="Clear all notes"
            variant="danger"
            onPress={() => {
              if (notes.length === 0) return showToast('No notes', 'info');
              clearNotes();
              showToast('Notes cleared', 'warning');
            }}
          />
          <Row
            icon="♡"
            label="Clear favorites"
            variant="danger"
            onPress={() => {
              if (ids.length === 0) return showToast('No favorites', 'info');
              clearFavorites();
              showToast('Favorites cleared', 'warning');
            }}
          />
        </Section>

        <Section title="ACCOUNT">
          <Row icon="☺" label="Profile" onPress={() => navigation.navigate('Profile')} />
          <Row icon="ℹ" label="Role" value={isAdmin ? 'Administrator' : 'Member'} />
          <Row icon="@" label="Username" value={user?.username || '-'} />
        </Section>

        <Button
          variant="danger"
          fullWidth
          style={{ marginTop: 8 }}
          onPress={async () => {
            await logout();
            showToast('Logged out', 'info');
          }}
        >
          Logout
        </Button>

        <View style={styles.footer}>
          <Text style={[styles.footerTitle, { color: colors.text }]}>Capstone App</Text>
          <Text style={[styles.footerText, { color: colors.textDim }]}>
            v1.0.0 · Day 10 Deliverable · Made by Anas Khan
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 },
  sectionCard: { borderRadius: radius.lg, borderWidth: 0.5, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5 },
  rowIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '600', letterSpacing: -0.1 },
  rowValue: { fontSize: 12.5, fontWeight: '500' },
  footer: { alignItems: 'center', marginTop: 24, gap: 4 },
  footerTitle: { fontSize: 13, fontWeight: '700', letterSpacing: -0.2 },
  footerText: { fontSize: 11, fontWeight: '500', textAlign: 'center' },
});