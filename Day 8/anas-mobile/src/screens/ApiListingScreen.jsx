import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import Badge from '../components/Badge';
import useApi from '../hooks/useApi';
import { fetchProducts } from '../services/productService';
import { log } from '../utils/logger';

function ProductRow({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Badge variant="primary">{item.category}</Badge>
        <View style={styles.metaRow}>
          <Text style={styles.price}>Rs {(item.price * 280).toFixed(0)}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function ApiListingScreen({ navigation }) {
  const { data, loading, error, refetch } = useApi(() => fetchProducts(20), []);
  const [refreshing, setRefreshing] = useState(false);

  const products = data?.products || [];

  const onRefresh = async () => {
    log('Pull to refresh triggered');
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    log('Refresh complete');
  };

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.centerText}>Loading products...</Text>
        </View>
      );
    }

    if (error && !refreshing) {
      return (
        <View style={styles.center}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.errorTitle}>Failed to load</Text>
          <Text style={styles.centerText}>{error}</Text>
          <Button onPress={refetch}>Retry</Button>
        </View>
      );
    }

    if (products.length === 0 && !loading) {
      return (
        <View style={styles.center}>
          <Text style={styles.icon}>📭</Text>
          <Text style={styles.errorTitle}>No products found</Text>
          <Text style={styles.centerText}>Pull down to refresh</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressBackgroundColor={colors.bgCard}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <ProductRow
            item={item}
            onPress={() => navigation.navigate('ApiDetails', { id: item.id })}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header
        title="Live Products"
        subtitle={loading ? 'Loading...' : `${products.length} items • Pull to refresh`}
        onBack={() => navigation.goBack()}
        rightAction={
          !loading && (
            <Pressable onPress={onRefresh} style={styles.refreshBtn}>
              <Text style={styles.refreshIcon}>↻</Text>
            </Pressable>
          )
        }
      />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  thumb: { width: 80, height: 80, borderRadius: radius.md, backgroundColor: colors.bgElevated },
  info: { flex: 1, gap: 4 },
  title: { ...typography.body, color: colors.text, fontWeight: '700' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { ...typography.h3, color: colors.success, fontWeight: '700' },
  rating: { ...typography.small, color: colors.warning, fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  icon: { fontSize: 64 },
  errorTitle: { ...typography.h3, color: colors.text },
  centerText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  refreshBtn: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  refreshIcon: { fontSize: 20, color: colors.text, fontWeight: '700' },
});