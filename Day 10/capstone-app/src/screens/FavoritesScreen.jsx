import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { api } from '../utils/api';
import { radius, shadows } from '../utils/theme';

export default function FavoritesScreen({ navigation }) {
  const { colors } = useTheme();
  const { ids, toggleFavorite, clearFavorites } = useFavorites();
  const { showToast } = useToast();
  const { width } = useWindowDimensions();
  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : 2;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await api.getProducts(50);
      if (result.success) {
        setProducts(result.data.products.filter(p => ids.includes(p.id)));
      }
      setLoading(false);
    })();
  }, [ids]);

  if (ids.length === 0) {
    return (
      <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
        <Header title="Favorites" subtitle="Saved items" showMenu />
        <EmptyState
          icon="♡"
          title="No favorites yet"
          message="Tap the heart on any product to save it here"
          actionLabel="Explore Products"
          onAction={() => navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Api' } })}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header
        title="Favorites"
        subtitle={`${ids.length} saved`}
        showMenu
        rightAction={
          <Pressable
            onPress={() => { clearFavorites(); showToast('Cleared', 'warning'); }}
            style={[styles.clearBtn, { backgroundColor: colors.dangerSoft }]}
          >
            <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '700' }}>Clear</Text>
          </Pressable>
        }
      />

      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        numColumns={numColumns}
        key={`grid-${numColumns}`}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <Pressable
              onPress={() => navigation.navigate('ApiDetails', { id: item.id })}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.sm },
                pressed && { opacity: 0.9 },
              ]}
            >
              <View style={[styles.imageWrap, { backgroundColor: colors.bgElevated }]}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <Pressable
                  onPress={() => toggleFavorite(item.id)}
                  style={[styles.favBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
                >
                  <Text style={{ fontSize: 14 }}>❤️</Text>
                </Pressable>
              </View>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
                <Text style={[styles.cardPrice, { color: colors.accent }]}>Rs {(item.price * 280).toFixed(0)}</Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  clearBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  list: { padding: 16, paddingBottom: 100 },
  row: { gap: 12, marginBottom: 12 },
  cardWrap: { flex: 1 },
  card: { borderRadius: radius.md, borderWidth: 0.5, overflow: 'hidden' },
  imageWrap: { aspectRatio: 1, position: 'relative' },
  image: { width: '100%', height: '100%' },
  favBtn: { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 13, fontWeight: '600', minHeight: 34, lineHeight: 17, marginBottom: 6 },
  cardPrice: { fontSize: 15, fontWeight: '800', letterSpacing: -0.3 },
});