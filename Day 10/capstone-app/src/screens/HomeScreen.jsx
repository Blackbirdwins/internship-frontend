import { ScrollView, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../contexts/NotesContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useResponsive } from '../hooks/useResponsive';
import Header from '../components/Header';
import GlowCard from '../components/GlowCard';
import Avatar from '../components/Avatar';
import AnimatedNumber from '../components/AnimatedNumber';
import { radius, shadows, neonGlow, hoverTransition, spacing } from '../utils/theme';

/* ===== Stat Tile ===== */
function StatTile({ icon, value, label, color, colors }) {
  const [hovered, setHovered] = useState(false);
  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  return (
    <Pressable
      {...hoverProps}
      style={[
        styles.stat,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered ? color : colors.border,
        },
        hovered && Platform.OS === 'web' && { transform: [{ translateY: -2 }] },
        hoverTransition,
      ]}
    >
      <View style={[styles.statIconWrap, { backgroundColor: color + '20' }]}>
        <Text style={[styles.statIcon, { color }]}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <AnimatedNumber value={value} style={[styles.statValue, { color: colors.text }]} />
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

/* ===== Quick Action ===== */
function QuickAction({ icon, label, color, onPress, colors }) {
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
        styles.quickAction,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered ? color : colors.border,
        },
        hovered && Platform.OS === 'web' && { transform: [{ translateY: -2 }] },
        hoverTransition,
      ]}
    >
      <View style={[styles.qaIcon, { backgroundColor: color + '20' }]}>
        <Text style={[styles.qaIconText, { color }]}>{icon}</Text>
      </View>
      <Text style={[styles.qaLabel, { color: colors.text }]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

/* ===== Note Row ===== */
function NoteRow({ note, colors, onPress }) {
  const [hovered, setHovered] = useState(false);
  const hoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  } : {};

  const accent = note.pinned ? colors.warning : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      {...hoverProps}
      style={[
        styles.noteRow,
        {
          backgroundColor: colors.bgCard,
          borderColor: hovered ? accent : colors.border,
          borderLeftColor: accent,
        },
        hovered && Platform.OS === 'web' && { transform: [{ translateX: 2 }] },
        hoverTransition,
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
          {note.title}
        </Text>
        {note.body ? (
          <Text style={[styles.noteBody, { color: colors.textMuted }]} numberOfLines={1}>
            {note.body}
          </Text>
        ) : null}
      </View>
      <Text style={{ color: colors.textDim, fontSize: 16 }}>›</Text>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const { colors, isDark, accent } = useTheme();
  const { user, isAdmin } = useAuth();
  const { notes } = useNotes();
  const { ids } = useFavorites();
  const { isDesktop, hPad } = useResponsive();

  const pinned = notes.filter(n => n.pinned).slice(0, 3);
  const recent = notes.filter(n => !n.pinned).slice(0, 5);

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="Dashboard" subtitle={`Welcome, ${user?.name || 'Player'}`} showMenu showFavs />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: hPad, maxWidth: isDesktop ? 1000 : '100%', alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — subtle dark card with accent border */}
        <View
          style={[
            styles.hero,
            {
              backgroundColor: colors.bgCard,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Accent glow strip at top */}
          <View style={[styles.heroStrip, { backgroundColor: colors.primary }]} />

          <View style={styles.heroRow}>
            <Avatar name={user?.name || 'User'} size={52} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={[styles.heroKicker, { color: colors.textMuted }]}>WELCOME BACK</Text>
              <Text style={[styles.heroName, { color: colors.text }]} numberOfLines={1}>
                {user?.name || 'Player'}
              </Text>
              <View style={[styles.roleBadge, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.roleText, { color: colors.primary }]}>
                  {isAdmin ? '⭐ ADMINISTRATOR' : '◆ MEMBER'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <Text style={[styles.sectionLabel, { color: colors.textDim }]}>OVERVIEW</Text>
        <View style={styles.statsGrid}>
          <StatTile icon="✎" value={notes.length} label="NOTES" color={colors.primary} colors={colors} />
          <StatTile icon="♡" value={ids.length} label="SAVED" color={colors.danger} colors={colors} />
          <StatTile icon="◈" value={notes.filter(n => n.pinned).length} label="PINNED" color={colors.warning} colors={colors} />
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionLabel, { color: colors.textDim }]}>QUICK ACTIONS</Text>
        <View style={styles.quickRow}>
          <QuickAction icon="+" label="New Note" color={colors.primary} onPress={() => navigation.navigate('NoteEdit', {})} colors={colors} />
          <QuickAction icon="♡" label="Saved" color={colors.danger} onPress={() => navigation.navigate('Main', { screen: 'Tabs', params: { screen: 'Favorites' } })} colors={colors} />
          <QuickAction icon="⚙" label="Settings" color={colors.purple} onPress={() => navigation.navigate('Settings')} colors={colors} />
        </View>

        {/* Pinned */}
        {pinned.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionLabel, { color: colors.textDim, marginBottom: 0 }]}>📌 PINNED</Text>
              <Text style={[styles.sectionCount, { color: colors.textDim }]}>{pinned.length}</Text>
            </View>
            {pinned.map(note => (
              <NoteRow key={note.id} note={note} colors={colors} onPress={() => navigation.navigate('NoteEdit', { id: note.id })} />
            ))}
          </>
        )}

        {/* Recent */}
        {recent.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionLabel, { color: colors.textDim, marginBottom: 0 }]}>RECENT</Text>
              <Text style={[styles.sectionCount, { color: colors.textDim }]}>{recent.length}</Text>
            </View>
            {recent.map(note => (
              <NoteRow key={note.id} note={note} colors={colors} onPress={() => navigation.navigate('NoteEdit', { id: note.id })} />
            ))}
          </>
        )}

        {/* Empty state */}
        {notes.length === 0 && (
          <View style={[styles.emptyBox, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>✎</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No notes yet</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Tap "New Note" to create your first one
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingVertical: 16, paddingBottom: 100 },

  /* Hero */
  hero: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroStrip: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 3,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroKicker: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 2 },
  heroName: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roleText: { fontSize: 9.5, fontWeight: '800', letterSpacing: 0.8 },

  /* Section */
  sectionLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10, marginTop: 4 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 10,
  },
  sectionCount: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },

  /* Stats */
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 10,
  },
  statIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  statIcon: { fontSize: 16, fontWeight: '700' },
  statValue: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  statLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.8, marginTop: 1 },

  /* Quick Actions */
  quickRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  quickAction: {
    flex: 1,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  qaIcon: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  qaIconText: { fontSize: 20, fontWeight: '700' },
  qaLabel: { fontSize: 11.5, fontWeight: '700', letterSpacing: 0.2 },

  /* Note Row */
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderLeftWidth: 3,
    marginBottom: 8,
    gap: 10,
  },
  noteTitle: { fontSize: 13.5, fontWeight: '700', letterSpacing: -0.2 },
  noteBody: { fontSize: 11.5, fontWeight: '500', marginTop: 2 },

  /* Empty */
  emptyBox: {
    padding: 32,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  emptyText: { fontSize: 12.5, fontWeight: '500', textAlign: 'center' },
});     