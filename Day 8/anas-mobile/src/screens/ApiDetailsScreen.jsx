import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import useApi from '../hooks/useApi';
import { fetchProductById } from '../services/productService';

export default function ApiDetailsScreen({ route, navigation }) {
  const { id } = route.params || {};
  const { data: product, loading, error, refetch } = useApi(
    () => fetchProductById(id),
    [id]
  );

  // Missing param
  if (!id) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Error" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>No product ID</Text>
        </View>
      </SafeAreaView>
    );
  }

  // LOADING
  if (loading) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <Header title="Loading..." onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.centerText}>Fetching product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ERROR
  if (error) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <Header title="Error" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Failed to load</Text>
          <Text style={styles.centerText}>{error}</Text>
          <Button onPress={refetch}>Retry</Button>
        </View>
      </SafeAreaView>
    );
  }

  // SUCCESS
  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Product" subtitle={product?.category} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          <Badge variant="primary">{product.category}</Badge>
          <Text style={styles.name}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.stock}>• {product.stock} in stock</Text>
          </View>

          <Text style={styles.price}>Rs {(product.price * 280).toFixed(0)}</Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.specs}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Brand</Text>
              <Text style={styles.specValue}>{product.brand || 'N/A'}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Discount</Text>
              <Text style={[styles.specValue, { color: colors.success }]}>{product.discountPercentage}%</Text>
            </View>
          </View>

          <Button onPress={() => {}}>🛒 Add to Cart</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl * 2 },
  image: { width: '100%', height: 280, backgroundColor: colors.bgElevated },
  body: { padding: spacing.lg, gap: spacing.md },
  name: { ...typography.h2, color: colors.text },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rating: { ...typography.body, color: colors.warning, fontWeight: '700' },
  stock: { ...typography.small, color: colors.success, fontWeight: '600' },
  price: { ...typography.h1, color: colors.success, marginVertical: spacing.sm },
  sectionLabel: { ...typography.tiny, color: colors.textDim, marginTop: spacing.md },
  description: { ...typography.body, color: colors.textMuted, lineHeight: 22 },
  specs: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  specItem: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specLabel: { ...typography.tiny, color: colors.textDim, marginBottom: 4 },
  specValue: { ...typography.h3, color: colors.text },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  icon: { fontSize: 64 },
  title: { ...typography.h3, color: colors.text },
  centerText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});