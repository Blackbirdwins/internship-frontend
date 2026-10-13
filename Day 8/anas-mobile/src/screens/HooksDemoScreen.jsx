import { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import useToggle from '../hooks/useToggle';
import usePrevious from '../hooks/usePrevious';
import useDebounce from '../hooks/useDebounce';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function HooksDemoScreen({ navigation }) {
  const [on, { toggle }] = useToggle(false);
  const [text, setText] = useState('');
  const debounced = useDebounce(text, 500);
  const previous = usePrevious(text);
  const [note, setNote, meta] = useAsyncStorage('demo_note', '');

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Custom Hooks" subtitle="Day 8 — Task 11" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* useToggle */}
        <Card>
          <View style={styles.header}>
            <Text style={styles.title}>useToggle</Text>
            <Badge variant={on ? 'success' : 'gray'} dot>{on ? 'ON' : 'OFF'}</Badge>
          </View>
          <Text style={styles.desc}>A boolean state with toggle, on, off helpers.</Text>
          <Button variant={on ? 'danger' : 'primary'} onPress={toggle}>
            {on ? 'Turn Off' : 'Turn On'}
          </Button>
        </Card>

        {/* useDebounce + usePrevious */}
        <Card>
          <Text style={styles.title}>useDebounce + usePrevious</Text>
          <Text style={styles.desc}>Type something. Debounced updates after 500ms.</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type here..."
            placeholderTextColor={colors.textDim}
            style={styles.input}
          />
          <View style={styles.statsBox}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Current:</Text>
              <Text style={styles.statValue}>{text || '—'}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Debounced:</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>{debounced || '—'}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Previous:</Text>
              <Text style={[styles.statValue, { color: colors.textMuted }]}>{previous || '—'}</Text>
            </View>
          </View>
        </Card>

        {/* useAsyncStorage */}
        <Card>
          <View style={styles.header}>
            <Text style={styles.title}>useAsyncStorage</Text>
            <Badge variant={meta.loaded ? 'success' : 'warning'} dot>
              {meta.loaded ? 'saved' : 'loading'}
            </Badge>
          </View>
          <Text style={styles.desc}>Persist any value across app restarts.</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Write a note..."
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={3}
            style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
          />
          <Text style={styles.hint}>Key: <Text style={styles.code}>demo_note</Text></Text>
        </Card>

        {/* Info */}
        <Card>
          <Text style={styles.title}>📦 Hook Inventory</Text>
          <View style={styles.hookList}>
            {[
              'useApi — API state',
              'useAsyncStorage — persistence',
              'useDebounce — delay value',
              'useToggle — boolean helpers',
              'usePrevious — track prev value',
              'useInterval — safe intervals',
              'useDeepLink — URL handling',
              'useTheme — theme context',
            ].map((h) => (
              <Text key={h} style={styles.hookItem}>• {h}</Text>
            ))}
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl * 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  title: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  desc: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md, lineHeight: 20 },
  input: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 15,
  },
  statsBox: {
    marginTop: spacing.md,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { ...typography.small, color: colors.textMuted },
  statValue: { ...typography.small, color: colors.text, fontWeight: '700' },
  hint: { ...typography.small, color: colors.textDim, marginTop: spacing.sm },
  code: { color: colors.accent, fontFamily: 'monospace' },
  hookList: { gap: spacing.sm, marginTop: spacing.sm },
  hookItem: { ...typography.body, color: colors.textMuted },
});