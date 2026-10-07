import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import { useResponsive } from '../utils/useResponsive';
import Header from '../components/Header';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { products } from '../utils/data';

export default function DetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const product = products.find((p) => p.id === id);
  const { maxWidth, hPad, isPhone } = useResponsive();

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Not Found" onBack={() => navigation.goBack()} />
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>❌</Text>
          <Text style={styles.emptyText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Details" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[styles.content, { maxWidth, alignSelf: 'center', width: '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: product.image }}
          style={[styles.image, { height: isPhone ? 280 : 380 }]}
          resizeMode="cover"
        />

        <View style={[styles.body, { paddingHorizontal: hPad }]}>
          <Badge variant="primary">{product.category}</Badge>
          <Text style={[styles.title, { fontSize: isPhone ? 22 : 28 }]}>
            {product.name}
          </Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.reviews}>(240 reviews)</Text>
          </View>

          <Text style={styles.price}>Rs {product.price.toLocaleString()}</Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>
            Premium quality {product.name.toLowerCase()}. Imported fresh and
            delivered to your doorstep. Perfect for daily use.
          </Text>

          <View style={styles.specs}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Category</Text>
              <Text style={styles.specValue}>{product.category}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>In Stock</Text>
              <Text style={[styles.specValue, { color: colors.success }]}>
                Yes
              </Text>
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
  image: {
    width: '100%',
    backgroundColor: colors.bgElevated,
  },
  body: {
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  title: { ...typography.h2, color: colors.text, lineHeight: 34 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rating: { ...typography.body, color: colors.warning, fontWeight: '700' },
  reviews: { ...typography.small, color: colors.textMuted },
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 64 },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
});