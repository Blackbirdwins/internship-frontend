import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import { useResponsive } from '../utils/useResponsive';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products } from '../utils/data';

export default function ListingScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const { gridColumns, maxWidth, hPad } = useResponsive();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Products" subtitle={`${filtered.length} items`} />

      <View style={[styles.searchWrap, { maxWidth, paddingHorizontal: hPad }]}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search products..."
          placeholderTextColor={colors.textDim}
          style={styles.search}
        />
      </View>

      <FlatList
        key={gridColumns}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={gridColumns}
        columnWrapperStyle={{ gap: spacing.md }}
        contentContainerStyle={[
          styles.list,
          { maxWidth, paddingHorizontal: hPad, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>Try a different search</Text>
          </View>
        }
        ListHeaderComponent={
          search ? (
            <Text style={styles.headerText}>Results for "{search}"</Text>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('Details', { id: item.id })}
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    alignSelf: 'center',
    width: '100%',
  },
  search: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 15,
  },
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl * 2,
  },
  empty: { alignItems: 'center', paddingVertical: spacing.xxl * 2 },
  emptyIcon: { fontSize: 64, marginBottom: spacing.md },
  emptyTitle: { ...typography.h3, color: colors.text },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
  headerText: { ...typography.small, color: colors.textMuted, marginBottom: spacing.md },
});