import { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { products } from '../utils/data';
import { useFavorites } from '../contexts/FavoritesContext';

const SORTS = [
  { id: 'recent', label: 'Recent', icon: '🕐' },
  { id: 'price-asc', label: 'Low', icon: '↑' },
  { id: 'price-desc', label: 'High', icon: '↓' },
  { id: 'rating', label: 'Top', icon: '⭐' },
];

export default function FavoritesScreen({ navigation }) {
  const { ids, clearFavorites, loaded } = useFavorites();
  const [sort, setSort] = useState('recent');
  const { width } = useWindowDimensions();
  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : 2;

  const favorites = useMemo(() => {
    const list = products.filter(p => ids.includes(p.id));
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [ids, sort]);

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Favorites" subtitle="Loading..." />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Favorites"
        subtitle={`${favorites.length} item${favorites.length !== 1 ? 's' : ''}`}
        rightAction={
          favorites.length > 0 && (
            <Button variant="ghost" size="sm" onPress={clearFavorites}>Clear</Button>
          )
        }
      />

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 48 }}>❤️</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>Tap the heart on any product to save it here</Text>
          <Button onPress={() => navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Search' } })}>
            Browse Products
          </Button>
        </View>
      ) : (
        <>
          <View style={styles.sortCard}>
            <View style={styles.sortHeader}>
              <Text style={styles.sortLbl}>SORT BY</Text>
              <Text style={styles.sortCount}>{favorites.length} items</Text>
            </View>
            <View style={styles.sortChips}>
              {SORTS.map(s => {
                const active = sort === s.id;
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => setSort(s.id)}
                    style={[styles.sortChip, active && styles.sortChipActive]}
                  >
                    <Text style={[styles.sortText, active && styles.sortTextActive]}>
                      {s.icon} {s.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => String(item.id)}
            numColumns={numColumns}
            key={`grid-${numColumns}`}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cardWrap}>
                <ProductCard
                  product={item}
                  onPress={() => navigation.navigate('Details', { id: item.id, title: item.name })}
                />
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  sortCard: {
    margin: spacing.md, padding: 14,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 14,
  },
  sortHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sortLbl: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.6 },
  sortCount: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  sortChips: { flexDirection: 'row', gap: 6 },
  sortChip: {
    flex: 1, paddingVertical: 9, borderRadius: 8,
    backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', minHeight: 40, justifyContent: 'center',
  },
  sortChipActive: { backgroundColor: colors.primaryDark, borderColor: colors.primaryDark },
  sortText: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  sortTextActive: { color: '#fff' },

  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl * 2 },
  row: { gap: 12, marginBottom: 12 },
  cardWrap: { flex: 1 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 12 },
});