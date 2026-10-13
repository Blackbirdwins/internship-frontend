import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { day8Tasks } from '../utils/data';
import { useToast } from '../contexts/ToastContext';

export default function TasksScreen({ navigation }) {
  const { showToast } = useToast();

  const handleTask = (task) => {
    switch (task.action) {
      case 'toast': showToast('Navigation ready ✓', 'success'); break;
      case 'settings': navigation.navigate('Settings'); break;
      case 'home': navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Home' } }); break;
      case 'drawer': showToast('Drawer gesture enabled ✓', 'success'); break;
      case 'product3': navigation.navigate('Details', { id: 3, title: 'Ketchup' }); break;
      case 'deeplink': navigation.navigate('Details', { id: 5, title: 'Rooh Afza' }); break;
      case 'api': navigation.navigate('ApiListing'); break;
      case 'refresh': navigation.navigate('ApiListing'); setTimeout(() => showToast('Pull to refresh ✓', 'info'), 300); break;
      case 'storage': showToast('Favorites persist across reload ✓', 'info'); break;
      case 'hooks': navigation.navigate('HooksDemo'); break;
      case 'search': navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Search' } }); break;
      case 'celebrate': showToast('All 13 tasks implemented! 🎉', 'success'); break;
      default: showToast('Task ready', 'info');
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Day 8 Tasks" subtitle="All 13 complete" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>✅ Day 8 — All 13 Tasks</Text>
          <Text style={styles.introDesc}>Har task interactive hai. Tap karke demo dekho.</Text>
        </View>

        {day8Tasks.map(task => (
          <Pressable
            key={task.n}
            onPress={() => handleTask(task)}
            style={({ pressed }) => [styles.taskItem, pressed && styles.taskPressed]}
          >
            <View style={styles.taskNum}>
              <Text style={styles.taskNumText}>{task.n}</Text>
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskDesc}>{task.desc}</Text>
              <Text style={styles.taskStatus}>✓ Implemented — Tap to try</Text>
            </View>
          </Pressable>
        ))}

        <Button
          variant="secondary"
          style={{ marginTop: 16 }}
          onPress={() => showToast('All 13 tasks complete! 🎉', 'success')}
        >
          🎉 All Tasks Complete
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  introCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
  },
  introTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 6 },
  introDesc: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },

  taskItem: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
    ...shadows.sm,
  },
  taskPressed: { opacity: 0.85, borderColor: colors.accent },
  taskNum: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(52,211,153,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskNumText: { fontSize: 13, fontWeight: '700', color: colors.accent },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 13.5, fontWeight: '700', color: colors.text, marginBottom: 4 },
  taskDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  taskStatus: { fontSize: 10, fontWeight: '700', color: colors.accent, marginTop: 6, letterSpacing: 0.4 },
});