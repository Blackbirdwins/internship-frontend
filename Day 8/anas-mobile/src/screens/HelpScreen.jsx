import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';

const FAQ = [
  { q: 'How do I place an order?', a: 'Browse products, tap to view details, and add to cart.' },
  { q: 'What are delivery charges?', a: 'Free delivery on orders above Rs 2000.' },
  { q: 'How can I return an item?', a: 'Return within 7 days of delivery in original packaging.' },
  { q: 'Which cities do you deliver to?', a: 'Currently delivering to Karachi, Lahore, Islamabad, and Rawalpindi.' },
];

export default function HelpScreen({ navigation }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Help & Support" subtitle="We're here to help" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>📞</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Call Us</Text>
              <Text style={styles.contactValue}>+92 300 1234567</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>📧</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@anasmobile.pk</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {FAQ.map((item, i) => (
          <Card key={i} style={styles.faqCard}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl * 2 },
  contactCard: { gap: 0, padding: spacing.lg },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  contactIcon: { fontSize: 28 },
  contactInfo: { flex: 1 },
  contactLabel: { ...typography.tiny, color: colors.textDim, marginBottom: 2 },
  contactValue: { ...typography.h3, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md, marginBottom: spacing.sm },
  faqCard: { padding: spacing.lg },
  faqQ: { ...typography.body, color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  faqA: { ...typography.body, color: colors.textMuted, lineHeight: 22 },
});