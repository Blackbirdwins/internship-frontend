import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { colors, spacing, radius, shadows } from '../utils/theme';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';

export default function ProductCard({ product, onPress, onAddToCart }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const fav = isFavorite(product.id);
  const { width } = useWindowDimensions();

  const numCols = width >= 1100 ? 4 : width >= 768 ? 3 : 2;
  const cardWidth = (width - (numCols + 1) * 12) / numCols;
  const isSmall = cardWidth < 180;

  const s = {
    pad: isSmall ? 8 : 10,
    titleSize: isSmall ? 12 : 13,
    priceSize: isSmall ? 14 : 16,
    heart: isSmall ? 28 : 34,
  };

  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  const handleHeart = (e) => {
    e?.stopPropagation?.();
    toggleFavorite(product.id);
    showToast(fav ? 'Removed' : 'Saved', fav ? 'warning' : 'success');
  };

  const handleAdd = (e) => {
    e?.stopPropagation?.();
    showToast(`Added: ${product.name.slice(0, 20)}...`, 'success');
    onAddToCart?.(product);
  };

  return (
    <Pressable
      {...hoverProps}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { padding: s.pad },
        hovered && styles.cardHovered,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageOuter}>
        <View style={[styles.imageWrap, hovered && styles.imageHovered]}>
          {imgError ? (
            <View style={styles.fallback}><Text style={{ fontSize: 44 }}>📦</Text></View>
          ) : (
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              onError={() => setImgError(true)}
              resizeMode="cover"
            />
          )}
        </View>

        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}

        <Pressable
          onPress={handleHeart}
          style={[styles.heartBtn, { width: s.heart, height: s.heart, borderRadius: s.heart / 3 }]}
          hitSlop={6}
        >
          <Text style={{ fontSize: s.heart * 0.42 }}>{fav ? '❤️' : '🤍'}</Text>
        </Pressable>

        <View style={styles.ratingChip}>
          <Text style={styles.ratingText}>⭐ {product.rating}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand ? product.brand.toUpperCase() : product.category.toUpperCase()}
        </Text>
        <Text style={[styles.title, { fontSize: s.titleSize }]} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { fontSize: s.priceSize }]}>
            <Text style={styles.priceRs}>Rs </Text>
            {product.price.toLocaleString()}
          </Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>Rs {product.oldPrice.toLocaleString()}</Text>
          )}
        </View>

        <Pressable
          onPress={handleAdd}
          style={({ pressed }) => [
            styles.addBtn,
            hovered && styles.addBtnHovered,
            pressed && styles.addBtnPressed,
          ]}
        >
          <Text style={[styles.addText, hovered && { color: '#fff' }]}>+ Add</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardHovered: {
    borderColor: colors.border2,
    backgroundColor: colors.bgElevated,
    transform: [{ translateY: -5 }],
    ...shadows.md,
  },
  pressed: { opacity: 0.94 },

  imageOuter: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    marginBottom: 10,
  },
  imageWrap: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  imageHovered: { transform: [{ scale: 1.02 }] },
  image: { width: '100%', height: '100%' },
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgElevated },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(236, 72, 153, 0.9)',
  },
  discountText: { fontSize: 10, color: '#fff', fontWeight: '700' },

  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  ratingChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  ratingText: { fontSize: 10, color: colors.star, fontWeight: '700' },

  body: { paddingHorizontal: 2 },
  brand: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    lineHeight: 17,
    color: colors.text,
    marginBottom: 8,
    minHeight: 34,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  price: { fontWeight: '700', color: colors.text, letterSpacing: -0.3 },
  priceRs: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },
  oldPrice: { fontSize: 11, color: colors.textDim, textDecorationLine: 'line-through' },

  addBtn: {
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  addBtnHovered: { backgroundColor: colors.primaryDark, borderColor: colors.primaryDark },
  addBtnPressed: { opacity: 0.85 },
  addText: { fontSize: 11.5, fontWeight: '600', color: colors.text, letterSpacing: 0.3 },
});