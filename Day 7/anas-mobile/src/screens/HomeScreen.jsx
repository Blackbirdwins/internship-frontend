import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import { useResponsive } from '../utils/useResponsive';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function HomeScreen({ navigation }) {
  const { maxWidth, hPad, isPhone } = useResponsive();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Home" subtitle="Welcome back" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { maxWidth, paddingHorizontal: hPad, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { height: isPhone ? 200 : 280 }]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Badge variant="primary" dot>
              New
            </Badge>
            <Text style={[styles.heroTitle, { fontSize: isPhone ? 26 : 34 }]}>
              Welcome to{'\n'}Anas Mobile
            </Text>
            <Text style={styles.heroSubtitle}>
              Pakistani products at your fingertips
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>12K+</Text>
            <Text style={styles.statLabel}>Users</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>1.4K</Text>
            <Text style={styles.statLabel}>Products</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>4.9⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.cardTitle}>About this app</Text>
          <Text style={styles.cardText}>
            A React Native mobile app showcasing Pakistani daily-use products.
            Built with Expo, React Navigation, and modern styling.
          </Text>
        </Card>

        <Button onPress={() => navigation.navigate('Listing')}>
          Browse Products →
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingVertical: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  hero: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 16, 0.65)',
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  heroTitle: { ...typography.h1, color: '#fff', lineHeight: 36 },
  heroSubtitle: { ...typography.body, color: 'rgba(255,255,255,0.85)' },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, alignItems: 'center', padding: spacing.md },
  statValue: { ...typography.h3, color: colors.primary },
  statLabel: { ...typography.tiny, color: colors.textMuted, marginTop: 4 },
  cardTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  cardText: { ...typography.body, color: colors.textMuted, lineHeight: 22 },
});