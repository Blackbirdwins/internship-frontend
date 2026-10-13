import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="About" subtitle="About this app" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.appName}>Anas Mobile</Text>
          <Badge variant="primary" dot>Version 1.0.0</Badge>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Built with</Text>
          <View style={styles.techList}>
            {['React Native', 'Expo', 'React Navigation', 'AsyncStorage'].map((t) => (
              <View key={t} style={styles.techItem}>
                <Text style={styles.techDot}>•</Text>
                <Text style={styles.techName}>{t}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Developer</Text>
          <Text style={styles.devName}>Anas Khan</Text>
          <Text style={styles.devRole}>Full Stack Developer</Text>
          <Text style={styles.devBio}>
            Building mobile apps with modern React Native ecosystem. Made in Pakistan 🇵🇰
          </Text>
        </Card>

        <Text style={styles.footer}>© 2026 Anas Khan. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl * 2 },
  logoWrap: { alignItems: 'center', gap: spacing.md, marginVertical: spacing.xl },
  logo: {
    width: 80, height: 80, borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  logoIcon: { fontSize: 36 },
  appName: { ...typography.h1, color: colors.text },
  cardTitle: { ...typography.tiny, color: colors.textDim, marginBottom: spacing.md },
  techList: { gap: spacing.sm },
  techItem: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  techDot: { color: colors.primary, fontSize: 20, lineHeight: 20 },
  techName: { ...typography.body, color: colors.text },
  devName: { ...typography.h2, color: colors.text, marginBottom: 2 },
  devRole: { ...typography.body, color: colors.primary, marginBottom: spacing.sm },
  devBio: { ...typography.body, color: colors.textMuted, lineHeight: 22 },
  footer: { ...typography.small, color: colors.textDim, textAlign: 'center', marginTop: spacing.md },
});