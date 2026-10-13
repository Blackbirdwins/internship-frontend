import { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products, categories, categoryEmojis } from '../utils/data';
import useDebounce from '../hooks/useDebounce';

const SORTS = [
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'price-asc', label: 'Price ↑', icon: '↑' },
  { id: 'price-desc', label: 'Price ↓', icon: '↓' },
  { id: 'rating', label: 'Top Rated', icon: '⭐' },
];

export default function SearchScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(route?.params?.category || 'All');
  const [sort, setSort] = useState('popular');
  const [showSort, setShowSort] = useState(false);
  const debounced = useDebounce(query, 300);
  const { width } = useWindowDimensions();
  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : 2;

  useEffect(() => {
    if (route?.params?.category) setCategory(route.params.category);
  }, [route?.params?.category]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (debounced.trim()) {
      const q = debounced.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [debounced, category, sort]);

  const currentSort = SORTS.find(s => s.id === sort) || SORTS[0];

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Shop" subtitle={`${filtered.length} products`} />

      <View style={styles.searchWrap}>
        <Text style={{ color: colors.textMuted }}>🔍</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products..."
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.tabsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {categories.map(c => (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={({ pressed }) => [
                styles.catTab,
                category === c && styles.catTabActive,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={[styles.catTabText, category === c && styles.catTabTextActive]}>
                {categoryEmojis[c]} {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.countText}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</Text>
        <View style={{ position: 'relative', zIndex: 100 }}>
          <Pressable onPress={() => setShowSort(!showSort)} style={styles.sortBtn}>
            <Text style={styles.sortBtnText}>{currentSort.icon} {currentSort.label} ▼</Text>
          </Pressable>
          {showSort && (
            <View style={styles.sortMenu}>
              {SORTS.map(s => (
                <Pressable
                  key={s.id}
                  onPress={() => { setSort(s.id); setShowSort(false); }}
                  style={styles.sortItem}
                >
                  <Text style={[styles.sortItemText, sort === s.id && { color: colors.primary }]}>
                    {s.icon} {s.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        key={`grid-${numColumns}`}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>Try a different search</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Details', { id: item.id, title: item.name })}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11,
    marginHorizontal: spacing.lg, marginTop: spacing.lg, marginBottom: 10,
    minHeight: 48,
  },
  input: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '500' },
  clearIcon: { color: colors.textMuted, fontSize: 14, padding: 4 },

  tabsWrap: { height: 48 },
  tabsContent: { paddingHorizontal: spacing.lg, gap: 8, alignItems: 'center' },
  catTab: {
    paddingHorizontal: 14, paddingVertical: 9,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, minHeight: 40,
    justifyContent: 'center',
  },
  catTabActive: { backgroundColor: colors.primaryDark, borderColor: colors.primaryDark },
  catTabText: { fontSize: 12.5, color: colors.textMuted, fontWeight: '600' },
  catTabTextActive: { color: '#fff' },

  sortRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginTop: 4, marginBottom: 12,
  },
  countText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  sortBtn: {
    paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    minHeight: 40, justifyContent: 'center',
  },
  sortBtnText: { fontSize: 11, fontWeight: '600', color: colors.text },
  sortMenu: {
    position: 'absolute', top: '100%', right: 0, marginTop: 6,
    backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border2,
    borderRadius: 10, minWidth: 180, zIndex: 200,
  },
  sortItem: { paddingHorizontal: 14, paddingVertical: 12, minHeight: 44 },
  sortItemText: { fontSize: 12.5, color: colors.text, fontWeight: '500' },

  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl * 2 },
  row: { gap: 12, marginBottom: 12 },
  cardWrap: { flex: 1 },

  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyIcon: { fontSize: 44 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: 13, color: colors.textMuted },
});