import { View, Text, Pressable, Image, StyleSheet, Platform } from 'react-native';
import { useState, memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { radius, shadows, hoverTransition } from '../utils/theme';

function ProductCard({ product, onPress, fav, onFav, currency = 'Rs' }) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

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
          borderColor: hovered && Platform.OS === 'web' ? colors.primary : colors.border,
          ...(hovered && Platform.OS === 'web' ? shadows.lg : shadows.sm),
        },
        hovered && Platform.OS === 'web' && { transform: [{ translateY: -6 }] },
        hoverTransition,
      ]}
    >
      <View style={[styles.imageWrap, { backgroundColor: colors.bgElevated }]}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
        <Pressable
          onPress={onFav}
          style={[styles.favBtn, { backgroundColor: 'rgba(0,0,0,0.55)' }]}
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
        <Text style={[styles.cardCat, { color: colors.textDim }]} numberOfLines={1}>
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

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 0.5,
    overflow: 'hidden',
    flex: 1,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  favBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute', top: 8, left: 8,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  discountText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  cardBody: { padding: 12, gap: 4 },
  cardCat: { fontSize: 9.5, fontWeight: '700', letterSpacing: 0.6 },
  cardTitle: {
    fontSize: 13, fontWeight: '600', lineHeight: 17,
    minHeight: 34, marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 4,
  },
  cardPrice: { fontSize: 15, fontWeight: '800', letterSpacing: -0.3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  star: { fontSize: 11 },
  rating: { fontSize: 11, fontWeight: '700' },
});