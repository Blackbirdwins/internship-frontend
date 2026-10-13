import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../utils/theme';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products, categories, categoryEmojis } from '../utils/data';

export default function HomeScreen({ navigation }) {
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <Header title="Home" subtitle="Welcome back" showMenu />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.badgeNew}><Text style={styles.badgeNewText}>DAY 8 PROJECT</Text></View>
            <Text style={styles.heroTitle}>Welcome to{'\n'}Anas Mobile</Text>
            <Text style={styles.heroSub}>Pakistani brands at your fingertips</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>SHOP BY CATEGORY</Text>
        <View style={styles.catGrid}>
          {categories.filter(c => c !== 'All').map(c => (
            <Pressable
              key={c}
              onPress={() => navigation.navigate('Search', { category: c })}
              style={({ pressed }) => [styles.catTile, pressed && { opacity: 0.8 }]}
            >
              <Text style={styles.catEmoji}>{categoryEmojis[c]}</Text>
              <Text style={styles.catName}>{c.split(' ')[0]}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}><Text style={styles.statV}>12K+</Text><Text style={styles.statL}>Users</Text></View>
          <View style={styles.stat}><Text style={styles.statV}>1.4K</Text><Text style={styles.statL}>Products</Text></View>
          <View style={styles.stat}><Text style={styles.statV}>4.9★</Text><Text style={styles.statL}>Rating</Text></View>
        </View>

        <Text style={styles.sectionLabel}>FEATURED PRODUCTS</Text>
        <View style={styles.gridWrap}>
          {featured.map(p => (
            <View key={p.id} style={styles.gridItem}>
              <ProductCard
                product={p}
                onPress={() => navigation.navigate('Details', { id: p.id, title: p.name })}
              />
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => navigation.navigate('Tasks')}
          style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.outlineBtnText}>✅ Day 8 Tasks Overview</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Search')}
          style={({ pressed }) => [styles.bigBtn, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.bigBtnText}>🛍️ Browse All Products</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('ApiListing')}
          style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.outlineBtnText}>🌐 Live Products (API)</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('HooksDemo')}
          style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.outlineBtnText}>🪝 Custom Hooks Demo</Text>
        </Pressable>

        <View style={styles.row}>
          <Pressable
            onPress={() => navigation.navigate('Auth')}
            style={({ pressed }) => [styles.halfBtn, pressed && { opacity: 0.8 }]}
          >
            <Text style={styles.outlineBtnText}>🔐 Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => [styles.halfBtnGhost, pressed && { opacity: 0.8 }]}
          >
            <Text style={styles.ghostText}>⚙️ Settings</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },

  hero: { borderRadius: 18, overflow: 'hidden', height: 200, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,15,26,0.75)' },
  heroContent: { ...StyleSheet.absoluteFillObject, padding: 22, justifyContent: 'flex-end', gap: 8 },
  badgeNew: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, backgroundColor: 'rgba(129,140,248,0.2)', borderWidth: 1, borderColor: 'rgba(129,140,248,0.4)' },
  badgeNewText: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 0.6 },
  heroTitle: { fontSize: 26, fontWeight: '700', lineHeight: 30, color: '#fff', letterSpacing: -0.5 },
  heroSub: { fontSize: 13, color: colors.textMuted, fontWeight: '500' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textDim, letterSpacing: 0.8, marginBottom: 12, marginTop: 4 },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  catTile: {
    width: '23%', aspectRatio: 1,
    backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    minHeight: 80,
  },
  catEmoji: { fontSize: 24, marginBottom: 4 },
  catName: { fontSize: 10, fontWeight: '600', color: colors.textMuted, textAlign: 'center' },

  stats: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  stat: { flex: 1, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, alignItems: 'center' },
  statV: { fontSize: 18, fontWeight: '700', color: colors.text },
  statL: { fontSize: 10, fontWeight: '600', color: colors.textDim, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.6 },

  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  gridItem: { width: '48%' },

  bigBtn: { paddingVertical: 14, borderRadius: 12, backgroundColor: colors.accent, alignItems: 'center', marginBottom: 10, ...shadows.sm, minHeight: 48 },
  bigBtnText: { fontSize: 14, fontWeight: '700', color: '#0a0f1a', letterSpacing: 0.3 },

  outlineBtn: { paddingVertical: 13, borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border2, alignItems: 'center', marginBottom: 10, minHeight: 48 },
  outlineBtnText: { fontSize: 13, fontWeight: '600', color: colors.text },

  row: { flexDirection: 'row', gap: 10, marginTop: 4 },
  halfBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border2, alignItems: 'center', minHeight: 48 },
  halfBtnGhost: { flex: 1, paddingVertical: 13, borderRadius: 12, backgroundColor: 'transparent', alignItems: 'center', minHeight: 48 },
  ghostText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
});