import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../utils/theme';
import { useResponsive } from '../utils/useResponsive';

export default function ProductCard({ product, onPress }) {
  const [imgError, setImgError] = useState(false);
  const { cardAspect } = useResponsive();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.imageWrap, { aspectRatio: cardAspect }]}>
        {imgError ? (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>📦</Text>
          </View>
        ) : (
          <Image
            source={product.isLocal ? product.image : { uri: product.image }}
            style={styles.image}
            onError={() => setImgError(true)}
            resizeMode="cover"
          />
        )}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {product.rating}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>Rs {product.price.toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  imageWrap: { backgroundColor: colors.bgElevated, position: 'relative', width: '100%' },
  image: { width: '100%', height: '100%' },
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  fallbackText: { fontSize: 40 },
  ratingBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm, backgroundColor: 'rgba(5, 8, 16, 0.85)', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.full },
  ratingText: { fontSize: 10, fontWeight: '700', color: colors.text },
  body: { padding: spacing.md, gap: 6 },
  category: { fontSize: 9, fontWeight: '700', color: colors.primary, letterSpacing: 0.8 },
  name: { fontSize: 13, fontWeight: '700', color: colors.text, lineHeight: 18, minHeight: 36 },
  price: { fontSize: 16, fontWeight: '800', color: colors.success, marginTop: 2 },
});