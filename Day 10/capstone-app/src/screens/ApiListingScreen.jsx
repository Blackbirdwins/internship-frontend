import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Platform, Image } from 'react-native';
import { useState as useState2 } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';
import { useResponsive } from '../hooks/useResponsive';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import { api } from '../utils/api';
import { radius, shadows, neonGlow, hoverTransition } from '../utils/theme';

function ProductTile({ product, onPress, fav, onFav, colors, currency = 'Rs' }) {
  const [hovered, setHovered] = useState2(false);

  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  return (
    <Pressable
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.card,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered ? colors.primary : colors.border,
        },
        hovered && Platform.OS === 'web' && { transform: [{ translateY: -6 }] },
        hovered && Platform.OS === 'web' && neonGlow(colors.primaryGlow, 18, 0.5),
        hoverTransition,
      ]}
    >
      <View style={[styles.imageWrap, { backgroundColor: colors.bgElevated }]}>
        <Image
  source={{ uri: product.thumbnail }}
  style={styles.image}
  resizeMode="cover"
/>
        <Pressable
          onPress={onFav}
          style={[styles.favBtn, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
          hitSlop={6}
        >
          <Text style={{ fontSize: 14 }}>{fav ? '❤️' : '🤍'}</Text>
        </Pressable>
        {product.discountPercentage > 10 && (
          <View style={[styles.discountBadge, { backgroundColor: colors.danger }]}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardCat, { color: colors.primary }]} numberOfLines={1}>
          {product.category?.toUpperCase()}
        </Text>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={[styles.cardPrice, { color: colors.accent }]}>
            {currency} {(product.price * 280).toFixed(0)}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={[styles.star, { color: colors.warning }]}>★</Text>
            <Text style={[styles.rating, { color: colors.textMuted }]}>{product.rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function ApiListingScreen({ navigation }) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const { gridColumns, hPad } = useResponsive();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await api.getProducts(20);
    if (result.success) setProducts(result.data.products || []);
    else setError(result.error);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
        <Header title="EXPLORE" subtitle="Loading..." showMenu />
        <View style={styles.center}>
          <View style={[styles.spinner, { borderColor: colors.border, borderTopColor: colors.primary }]} />
          <Text style={[styles.centerText, { color: colors.textMuted }]}>LOADING PRODUCTS...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
        <Header title="EXPLORE" subtitle="Error" showMenu />
        <EmptyState icon="⚠️" title="Failed to load" message={error} actionLabel="Retry" onAction={load} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="EXPLORE" subtitle={`${filtered.length} items available`} showMenu showFavs />

      <View style={{ paddingHorizontal: hPad }}>
        <View style={[styles.searchWrap, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
          <Text style={{ fontSize: 15, color: colors.primary, fontWeight: '700' }}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            placeholderTextColor={colors.textDim}
            style={[styles.searchInput, { color: colors.text }]}
          />
          {search ? (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Text style={{ color: colors.textMuted, fontSize: 14 }}>✕</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No products" message="Try a different search" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          numColumns={gridColumns}
          key={`grid-${gridColumns}`}
          columnWrapperStyle={gridColumns > 1 ? { gap: 12 } : null}
          contentContainerStyle={[styles.list, { paddingHorizontal: hPad }]}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={7}
          removeClippedSubviews
          renderItem={({ item }) => (
            <View style={{ flex: 1, marginBottom: 12 }}>
              <ProductTile
                product={item}
                fav={isFavorite(item.id)}
                onFav={() => {
                  toggleFavorite(item.id);
                  showToast(isFavorite(item.id) ? 'Removed' : 'Saved', isFavorite(item.id) ? 'warning' : 'success');
                }}
                onPress={() => navigation.navigate('ApiDetails', { id: item.id })}
                colors={colors}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  spinner: { width: 40, height: 40, borderRadius: 20, borderWidth: 3 },
  centerText: { fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    marginTop: 12, marginBottom: 8,
    borderRadius: radius.md, borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14.5, fontWeight: '500', paddingVertical: 4 },
  list: { paddingTop: 8, paddingBottom: 100 },
  card: { borderRadius: radius.md, borderWidth: 1, overflow: 'hidden', flex: 1, ...shadows.sm },
  imageWrap: { width: '100%', aspectRatio: 1, position: 'relative' },
  image: { width: '100%', height: '100%' },
  favBtn: { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  discountBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  discountText: { color: '#FFFFFF', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  cardBody: { padding: 12, gap: 4 },
  cardCat: { fontSize: 9.5, fontWeight: '900', letterSpacing: 1 },
  cardTitle: { fontSize: 13, fontWeight: '700', lineHeight: 17, minHeight: 34, marginBottom: 4 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  cardPrice: { fontSize: 15, fontWeight: '900', letterSpacing: -0.3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  star: { fontSize: 11 },
  rating: { fontSize: 11, fontWeight: '700' },
});