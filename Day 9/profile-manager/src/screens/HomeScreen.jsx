import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';

const TASKS = [
  { n: 1, icon: '🔐', title: 'Permissions Overview', desc: 'Android/iOS permission flow', screen: 'Permissions' },
  { n: 2, icon: '📸', title: 'Image Picker', desc: 'Gallery ya camera se photo', screen: 'ImagePicker' },
  { n: 3, icon: '👤', title: 'Profile Image Flow', desc: 'Preview, replace, persist', screen: 'Profile' },
  { n: 4, icon: '📍', title: 'Location Permission', desc: 'GPS coordinates', screen: 'Location' },
  { n: 5, icon: '⌨️', title: 'Keyboard Handling', desc: 'KeyboardAvoidingView', screen: 'Keyboard' },
  { n: 6, icon: '📝', title: 'React Hook Form', desc: 'Validated forms', screen: 'Form' },
  { n: 7, icon: '✅', title: 'Validation UX', desc: 'Inline errors + states', screen: 'Validation' },
  { n: 8, icon: '🔔', title: 'Toast / Alert', desc: 'Success, warning, error', screen: 'Toast' },
  { n: 9, icon: '📋', title: 'Modal / Bottom Sheet', desc: 'Actions + confirmations', screen: 'Form' },
  { n: 10, icon: '📱', title: 'App Lifecycle', desc: 'Background/foreground', screen: 'Extras' },
  { n: 11, icon: '📡', title: 'Offline & Error', desc: 'Retry + fallback', screen: 'Offline' },
  { n: 12, icon: '⚡', title: 'FlatList Performance', desc: 'Optimized lists', screen: 'ListPerf' },
  { n: 13, icon: '🎯', title: 'Deliverable', desc: 'Profile management app', screen: 'Profile' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Profile Manager" subtitle="Day 9 — 13 Tasks" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>DAY 9</Text></View>
          <Text style={styles.heroTitle}>Advanced Mobile{'\n'}Features</Text>
          <Text style={styles.heroSub}>Permissions • Image Picker • Forms • Offline UX</Text>
        </View>
        <Text style={styles.sectionLabel}>ALL 13 TASKS</Text>
        {TASKS.map(t => (
          <Pressable
            key={t.n}
            onPress={() => t.screen && navigation.navigate(t.screen)}
            style={({ pressed }) => [styles.taskItem, pressed && t.screen && styles.pressed]}
          >
            <View style={styles.taskIcon}><Text style={styles.taskEmoji}>{t.icon}</Text></View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskNum}>TASK {t.n}</Text>
              <Text style={styles.taskTitle}>{t.title}</Text>
              <Text style={styles.taskDesc}>{t.desc}</Text>
            </View>
            {t.screen && <Text style={styles.chev}>›</Text>}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
  hero: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 20, marginBottom: 20, ...shadows.md },
  heroBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(129,140,248,0.2)', borderWidth: 1, borderColor: 'rgba(129,140,248,0.4)', marginBottom: 10 },
  heroBadgeText: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 0.6 },
  heroTitle: { fontSize: 24, fontWeight: '700', color: colors.text, lineHeight: 30, letterSpacing: -0.5, marginBottom: 6 },
  heroSub: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 12, marginTop: 4 },
  taskItem: { flexDirection: 'row', gap: 12, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginBottom: 10, ...shadows.sm, alignItems: 'center' },
  pressed: { opacity: 0.85, borderColor: colors.primary },
  taskIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.bgElevated, alignItems: 'center', justifyContent: 'center' },
  taskEmoji: { fontSize: 20 },
  taskInfo: { flex: 1 },
  taskNum: { fontSize: 9, fontWeight: '700', color: colors.primary, letterSpacing: 0.8, marginBottom: 2 },
  taskTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 3 },
  taskDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  chev: { fontSize: 24, color: colors.textDim, fontWeight: '300' },
});