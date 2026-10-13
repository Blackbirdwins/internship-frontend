import { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { products, sampleReviews } from '../utils/data';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';

export default function DetailsScreen({ route, navigation }) {
  const { id, title } = route.params || {};
  const product = id ? products.find(p => p.id === Number(id)) : null;
  const { showToast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Not Found" onBack={() => navigation.goBack()} />
        <View style={styles.empty}>
          <Text style={{ fontSize: 44 }}>⚠️</Text>
          <Text style={styles.emptyTitle}>Product not found</Text>
          <Button onPress={() => navigation.goBack()}>Go Back</Button>
        </View>
      </SafeAreaView>
    );
  }

  const fav = isFavorite(product.id);
  const stars = '⭐'.repeat(Math.round(product.rating));

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title={title || 'Details'} subtitle={product.category} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageBox}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          <Pressable onPress={() => toggleFavorite(product.id)} style={styles.favBtn}>
            <Text style={{ fontSize: 20 }}>{fav ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>

        <View style={styles.catChip}>
          <Text style={styles.catChipText}>{product.category}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{stars}</Text>
          <Text style={styles.ratingText}>{product.rating} · {product.reviews} reviews</Text>
        </View>

        <View style={styles.priceBox}>
          <View>
            <Text style={styles.priceLbl}>PRICE</Text>
            <Text style={styles.price}>
              <Text style={styles.priceRs}>Rs </Text>
              {product.price.toLocaleString()}
            </Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>Rs {product.oldPrice.toLocaleString()}</Text>
            )}
          </View>
          {product.discount && (
            <View style={styles.discountBox}>
              <Text style={styles.discountText}>-{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Quantity</Text>
          <View style={styles.qtyControls}>
            <Pressable onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>−</Text>
            </Pressable>
            <Text style={styles.qtyVal}>{qty}</Text>
            <Pressable onPress={() => setQty(Math.min(10, qty + 1))} style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionLabel}>DESCRIPTION</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.specs}>
          <View style={styles.spec}><Text style={styles.specLbl}>BRAND</Text><Text style={styles.specVal}>{product.brand}</Text></View>
          <View style={styles.spec}><Text style={styles.specLbl}>RATING</Text><Text style={styles.specVal}>⭐ {product.rating}</Text></View>
          <View style={styles.spec}><Text style={styles.specLbl}>STOCK</Text><Text style={[styles.specVal, { color: colors.accent }]}>In Stock</Text></View>
        </View>

        <Button
          variant="secondary"
          style={{ marginBottom: 12 }}
          onPress={() => showToast(`Added ${qty}× ${product.name.slice(0, 18)}...`, 'success')}
        >
          🛒 Add {qty} to Cart — Rs {(product.price * qty).toLocaleString()}
        </Button>

        <Text style={styles.sectionLabel}>REVIEWS ({product.reviews})</Text>
        {sampleReviews.map((r, i) => (
          <View key={i} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <Text style={styles.reviewStars}>{'⭐'.repeat(r.rating)}</Text>
            </View>
            <Text style={styles.reviewText}>{r.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  imageBox: {
    width: '100%', aspectRatio: 1,
    borderRadius: 18, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: '#ffffff',
    marginBottom: 16, position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  favBtn: {
    position: 'absolute', top: 12, right: 12,
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },

  catChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(129,140,248,0.1)',
    borderWidth: 1, borderColor: 'rgba(129,140,248,0.3)',
  },
  catChipText: { fontSize: 11, fontWeight: '600', color: colors.primary, letterSpacing: 0.4 },

  name: { fontSize: 22, fontWeight: '700', marginTop: 12, marginBottom: 8, color: colors.text, letterSpacing: -0.5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  stars: { fontSize: 14 },
  ratingText: { fontSize: 13, color: colors.textMuted },

  priceBox: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 14, padding: 16, marginBottom: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  priceLbl: { fontSize: 10, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 4 },
  price: { fontSize: 30, fontWeight: '700', color: colors.text, letterSpacing: -0.5 },
  priceRs: { fontSize: 15, color: colors.textMuted, fontWeight: '500' },
  oldPrice: { fontSize: 13, color: colors.textDim, textDecorationLine: 'line-through', marginTop: 2 },
  discountBox: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(236,72,153,0.15)' },
  discountText: { fontSize: 12, fontWeight: '700', color: colors.pink },

  qtyRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16,
    minHeight: 60,
  },
  qtyLabel: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border2,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 18, fontWeight: '700', color: colors.text },
  qtyVal: { fontSize: 16, fontWeight: '700', color: colors.text, minWidth: 24, textAlign: 'center' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 8, marginTop: 8 },
  description: { fontSize: 13.5, color: colors.textMuted, lineHeight: 22, marginBottom: 16 },

  specs: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  spec: { flex: 1, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12 },
  specLbl: { fontSize: 9, fontWeight: '700', color: colors.textDim, letterSpacing: 0.6 },
  specVal: { fontSize: 13, fontWeight: '600', color: colors.text, marginTop: 4 },

  reviewItem: {
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, padding: 14, marginBottom: 10,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  reviewName: { fontSize: 13, fontWeight: '600', color: colors.text },
  reviewStars: { fontSize: 11 },
  reviewText: { fontSize: 12.5, color: colors.textMuted, lineHeight: 20 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
});