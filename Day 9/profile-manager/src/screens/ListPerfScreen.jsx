import { useState, memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../utils/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';

const ITEMS = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `Product #${i + 1}`,
  category: ['Grocery', 'Beverages', 'Snacks', 'Dairy'][i % 4],
  price: Math.floor(Math.random() * 5000) + 100,
}));

// Memoized row — re-renders only when item changes
const ListRow = memo(function ListRow({ item }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowAvatar}>
        <Text style={styles.rowAvatarText}>#{item.id}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowCat}>{item.category}</Text>
      </View>
      <Text style={styles.rowPrice}>Rs {item.price}</Text>
    </View>
  );
});

const ItemSeparator = () => <View style={styles.separator} />;

export default function ListPerfScreen({ navigation }) {
  const { showToast } = useToast();
  const [data, setData] = useState(ITEMS);
  const [optimized, setOptimized] = useState(true);
  const [useMemo, setUseMemo] = useState(true);

  const keyExtractor = useCallback((item) => String(item.id), []);

  const renderItem = useCallback(({ item }) => <ListRow item={item} />, []);

  const toggleOptimizations = () => {
    setOptimized(o => !o);
    showToast(optimized ? 'Optimizations OFF' : 'Optimizations ON', 'info');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="FlatList Performance" subtitle="Task 12 — 1000 items" onBack={() => navigation.goBack()} />
      <View style={styles.content}>

        <View style={styles.topCard}>
          <Text style={styles.topTitle}>⚡ 1000 Items</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Optimizations</Text>
            <Switch
              value={optimized}
              onValueChange={toggleOptimizations}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <View style={styles.tagRow}>
            {optimized && (
              <>
                <View style={styles.tag}><Text style={styles.tagText}>memo()</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>useCallback</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>initialNumToRender=15</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>windowSize=7</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>getItemLayout</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>removeClippedSubviews</Text></View>
              </>
            )}
            {!optimized && <Text style={styles.warn}>⚠ Optimizations off — scroll slow lagega</Text>}
          </View>
          <Button variant="ghost" size="sm" onPress={() => { setData([...ITEMS].reverse()); showToast('Data reversed', 'info'); }}>
            🔄 Reverse Data
          </Button>
        </View>

        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          {...(optimized ? {
            initialNumToRender: 15,
            maxToRenderPerBatch: 10,
            windowSize: 7,
            removeClippedSubviews: true,
            getItemLayout: (_, index) => ({ length: 66, offset: 66 * index, index }),
          } : {})}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, padding: spacing.md },
  topCard: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginBottom: 12 },
  topTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  toggleLabel: { fontSize: 13, color: colors.text, fontWeight: '600' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.border2 },
  tagText: { fontSize: 9, color: colors.primary, fontWeight: '700', fontFamily: 'monospace' },
  warn: { fontSize: 11, color: colors.warning, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, height: 65, backgroundColor: colors.bgCard },
  rowAvatar: { width: 36, height: 36, borderRadius: 8, backgroundColor: colors.bgElevated, alignItems: 'center', justifyContent: 'center' },
  rowAvatarText: { fontSize: 10, fontWeight: '700', color: colors.primary },
  rowTitle: { fontSize: 13, fontWeight: '600', color: colors.text },
  rowCat: { fontSize: 10.5, color: colors.textMuted, marginTop: 2 },
  rowPrice: { fontSize: 13, fontWeight: '700', color: colors.accent },
  separator: { height: 1, backgroundColor: colors.border },
});