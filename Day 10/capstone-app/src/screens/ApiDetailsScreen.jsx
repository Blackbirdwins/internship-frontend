import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';
import { useResponsive } from '../hooks/useResponsive';
import Header from '../components/Header';
import NeonButton from '../components/NeonButton';
import EmptyState from '../components/EmptyState';
import { api } from '../utils/api';
import { radius, shadows, hoverTransition } from '../utils/theme';

export default function ApiDetailsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const { isDesktop, hPad } = useResponsive();
  const id = route.params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await api.getProductById(id);
      if (result.success) setProduct(result.data);
      else setError(result.error);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
        <Header title="Details" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
        <Header title="Error" onBack={() => navigation.goBack()} />
        <EmptyState icon="⚠️" title="Failed to load" message={error || 'Product not found'} />
      </SafeAreaView>
    );
  }

  const fav = isFavorite(id);
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  const QtyBtn = ({ label, onPress }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <Pressable
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={[
          styles.qtyBtn,
          {
            backgroundColor: hovered ? colors.primarySoft : colors.bgElevated,
            borderColor: hovered ? colors.primary : colors.border,
          },
          hoverTransition,
        ]}
      >
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="Product" subtitle={product.category} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollOuter} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.content,
            { paddingHorizontal: hPad },
            isDesktop && styles.contentDesktop,
          ]}
        >
          {/* LEFT: Image */}
          <View style={[styles.leftCol, isDesktop && styles.leftColDesktop]}>
            <View style={[styles.imageBox, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
              <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
              <Pressable
                onPress={() => toggleFavorite(id)}
                style={[styles.favBtn, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
              >
                <Text style={{ fontSize: 18 }}>{fav ? '❤️' : '🤍'}</Text>
              </Pressable>
            </View>
          </View>

          {/* RIGHT: Details */}
          <View style={[styles.rightCol, isDesktop && styles.rightColDesktop]}>
            <View style={[styles.chip, { backgroundColor: colors.primarySoft }]}>
              <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 0.8 }}>
                {product.category?.toUpperCase()}
              </Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>

            <View style={styles.ratingRow}>
              <Text style={[styles.stars, { color: colors.warning }]}>{stars}</Text>
              <Text style={[styles.ratingText, { color: colors.textMuted }]}>
                {product.rating} · {product.stock} in stock
              </Text>
            </View>

            {/* Price */}
            <View style={[styles.priceBox, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.priceLabel, { color: colors.textDim }]}>PRICE</Text>
                <Text style={[styles.price, { color: colors.text }]}>
                  Rs {(product.price * 280).toFixed(0)}
                </Text>
              </View>
              {product.discountPercentage > 0 && (
                <View style={[styles.discountChip, { backgroundColor: colors.dangerSoft }]}>
                  <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '800' }}>
                    -{product.discountPercentage.toFixed(0)}%
                  </Text>
                </View>
              )}
            </View>

            {/* Quantity */}
            <View style={[styles.qtyRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
              <View>
                <Text style={{ color: colors.text, fontSize: 13, fontWeight: '700' }}>Quantity</Text>
                <Text style={{ color: colors.textDim, fontSize: 11, marginTop: 2 }}>Max 10</Text>
              </View>
              <View style={styles.qtyControls}>
                <QtyBtn label="−" onPress={() => setQty(Math.max(1, qty - 1))} />
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '800', minWidth: 32, textAlign: 'center' }}>
                  {qty}
                </Text>
                <QtyBtn label="+" onPress={() => setQty(Math.min(10, qty + 1))} />
              </View>
            </View>

            {/* Description */}
            <Text style={[styles.sectionLabel, { color: colors.textDim }]}>DESCRIPTION</Text>
            <Text style={[styles.description, { color: colors.textMuted }]}>{product.description}</Text>

            {/* Add to Cart */}
            <NeonButton
              variant="primary"
              size="lg"
              fullWidth
              style={{ marginTop: 20 }}
              onPress={() => showToast(`Added ${qty}× to cart`, 'success')}
            >
              Add {qty} to Cart — Rs {(product.price * 280 * qty).toFixed(0)}
            </NeonButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scrollOuter: { paddingVertical: 16, paddingBottom: 60 },
  content: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    gap: 20,
  },
  contentDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  /* Left Column */
  leftCol: { width: '100%' },
  leftColDesktop: { flex: 1, maxWidth: 480 },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    padding: 20,
  },
  image: { width: '100%', height: '100%' },
  favBtn: {
    position: 'absolute', top: 12, right: 12,
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },

  /* Right Column */
  rightCol: { flex: 1, gap: 12 },
  rightColDesktop: { maxWidth: 480 },

  chip: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  title: { fontSize: 20, fontWeight: '800', letterSpacing: -0.4, lineHeight: 26, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  stars: { fontSize: 13 },
  ratingText: { fontSize: 12.5, fontWeight: '500' },

  /* Price */
  priceBox: {
    padding: 14, borderRadius: radius.md, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  priceLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 2 },
  price: { fontSize: 26, fontWeight: '900', letterSpacing: -0.6 },
  discountChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },

  /* Qty */
  qtyRow: {
    padding: 14, borderRadius: radius.md, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 38, height: 38, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },

  /* Description */
  sectionLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 6 },
  description: { fontSize: 13.5, fontWeight: '500', lineHeight: 21 },
});