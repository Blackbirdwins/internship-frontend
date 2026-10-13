import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen({ navigation }) {
  const { showToast } = useToast();
  const { ids, clearFavorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Settings" subtitle="Manage your app" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Anas Khan</Text>
            <Text style={styles.userEmail}>anas@example.pk</Text>
            <Badge variant="primary" dot>Pro Member</Badge>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Preferences</Text>

        <Card style={{ padding: 0 }}>
          <Pressable style={styles.row} onPress={toggleTheme}>
            <View style={styles.iconBox}><Text style={styles.icon}>🎨</Text></View>
            <View style={styles.textBox}>
              <Text style={styles.label}>Theme</Text>
              <Text style={styles.desc}>Current: {theme}</Text>
            </View>
            <Text style={styles.chevron}>{theme === 'dark' ? '🌙' : '☀️'}</Text>
          </Pressable>

          <Pressable style={styles.row} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.iconBox}><Text style={styles.icon}>👤</Text></View>
            <View style={styles.textBox}>
              <Text style={styles.label}>Profile</Text>
              <Text style={styles.desc}>Edit your details</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable style={styles.row} onPress={() => navigation.navigate('Help')}>
            <View style={styles.iconBox}><Text style={styles.icon}>❓</Text></View>
            <View style={styles.textBox}>
              <Text style={styles.label}>Help & Support</Text>
              <Text style={styles.desc}>FAQ, contact us</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable style={[styles.row, styles.lastRow]} onPress={() => navigation.navigate('About')}>
            <View style={styles.iconBox}><Text style={styles.icon}>📄</Text></View>
            <View style={styles.textBox}>
              <Text style={styles.label}>About</Text>
              <Text style={styles.desc}>Version 1.0.0</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Card>

        <Text style={styles.sectionTitle}>Data</Text>

        <Card>
          <View style={styles.dataRow}>
            <View>
              <Text style={styles.label}>Favorites</Text>
              <Text style={styles.desc}>{ids.length} items saved</Text>
            </View>
            {ids.length > 0 && (
              <Button
                variant="danger"
                size="sm"
                onPress={() => {
                  clearFavorites();
                  showToast('Favorites cleared', 'warning');
                }}
              >
                Clear
              </Button>
            )}
          </View>
        </Card>

        <Button
          variant="outline"
          onPress={() => showToast('Logged out', 'warning')}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl * 2 },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 26, fontWeight: '800', color: '#fff' },
  userInfo: { flex: 1, gap: spacing.xs },
  userName: { ...typography.h3, color: colors.text },
  userEmail: { ...typography.small, color: colors.textMuted },
  sectionTitle: { ...typography.tiny, color: colors.textDim, marginTop: spacing.sm },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  lastRow: { borderBottomWidth: 0 },
  iconBox: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 20 },
  textBox: { flex: 1 },
  label: { ...typography.body, color: colors.text, fontWeight: '600' },
  desc: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  chevron: { fontSize: 20, color: colors.textDim },
  dataRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});