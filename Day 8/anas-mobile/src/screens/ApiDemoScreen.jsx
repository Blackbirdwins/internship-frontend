import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Loader from '../components/Loader';
import useApi from '../hooks/useApi';
import { fetchProducts, fetchCategories } from '../services/productService';

export default function ApiDemoScreen({ navigation }) {
  const products = useApi(() => fetchProducts(3), []);
  const categories = useApi(() => fetchCategories(), []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="API Demo" subtitle="Live from dummyjson.com" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Products */}
        <Card>
          <View style={styles.header}>
            <Text style={styles.cardTitle}>📦 Products API</Text>
            <Badge variant="primary" dot>{products.loading ? 'loading' : 'ready'}</Badge>
          </View>

          {products.loading && <Loader text="Fetching products..." />}

          {products.error && (
            <View>
              <Text style={styles.errorText}>⚠️ {products.error}</Text>
              <Button variant="ghost" size="sm" onPress={products.refetch}>Retry</Button>
            </View>
          )}

          {products.data?.products?.map((p) => (
            <View key={p.id} style={styles.row}>
              <Text style={styles.rowTitle} numberOfLines={1}>{p.title}</Text>
              <Text style={styles.rowPrice}>Rs {(p.price * 280).toFixed(0)}</Text>
            </View>
          ))}
        </Card>

        {/* Categories */}
        <Card>
          <View style={styles.header}>
            <Text style={styles.cardTitle}>🏷️ Categories</Text>
            <Badge variant="success" dot>{categories.loading ? 'loading' : 'ready'}</Badge>
          </View>

          {categories.loading && <Loader text="Fetching categories..." />}

          {categories.error && (
            <Text style={styles.errorText}>⚠️ {categories.error}</Text>
          )}

          <View style={styles.categoriesWrap}>
            {categories.data?.slice(0, 8).map((c) => (
              <View key={c} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{c}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Features */}
        <Card>
          <Text style={styles.cardTitle}>✨ API Features</Text>
          <View style={styles.features}>
            {[
              '✅ Timeout (10s)',
              '✅ Auto retry (2x)',
              '✅ Error normalization',
              '✅ Success/Error objects',
              '✅ Custom hook (useApi)',
            ].map((f) => (
              <Text key={f} style={styles.featureText}>{f}</Text>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl * 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  cardTitle: { ...typography.h3, color: colors.text },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTitle: { ...typography.body, color: colors.text, flex: 1, marginRight: spacing.md },
  rowPrice: { ...typography.body, color: colors.success, fontWeight: '700' },
  errorText: { ...typography.body, color: colors.danger, marginVertical: spacing.md },
  categoriesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  categoryChip: {
    backgroundColor: colors.bgElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: { ...typography.small, color: colors.text, textTransform: 'capitalize' },
  features: { gap: spacing.sm, marginTop: spacing.sm },
  featureText: { ...typography.body, color: colors.textMuted },
});