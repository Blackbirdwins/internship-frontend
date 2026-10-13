import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useNotes } from '../contexts/NotesContext';
import { useToast } from '../contexts/ToastContext';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';
import { radius, shadows, spacing } from '../utils/theme';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pinned', label: 'Pinned' },
];

const COLORS_MAP = {
  primary: 'primary', accent: 'accent', warning: 'warning', danger: 'danger',
};

export default function NotesScreen({ navigation }) {
  const { colors } = useTheme();
  const { notes, deleteNote, togglePin } = useNotes();
  const { showToast } = useToast();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'pinned' ? notes.filter(n => n.pinned) : notes;

  const confirmDelete = (note) => {
    const doDelete = () => {
      deleteNote(note.id);
      showToast('Note deleted', 'warning');
    };
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${note.title}"?`)) doDelete();
    } else {
      Alert.alert('Delete Note', `"${note.title}" delete karna hai?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: doDelete },
      ]);
    }
  };

  const NoteCard = ({ item }) => {
    const accent = COLORS_MAP[item.color] || 'primary';
    const accentColor = { primary: colors.primary, accent: colors.accent, warning: colors.warning, danger: colors.danger }[accent] || colors.primary;

    return (
      <Pressable
        onPress={() => navigation.navigate('NoteEdit', { id: item.id })}
        style={({ pressed }) => [
          styles.noteCard,
          {
            backgroundColor: colors.bgCard,
            borderColor: colors.border,
            borderLeftColor: accentColor,
            ...shadows.sm,
          },
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
        ]}
      >
        <View style={styles.noteHeader}>
          <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Pressable onPress={() => togglePin(item.id)} hitSlop={10} style={styles.pinBtn}>
            <Text style={{ fontSize: 14, opacity: item.pinned ? 1 : 0.4 }}>
              {item.pinned ? '📌' : '📍'}
            </Text>
          </Pressable>
        </View>

        {item.body ? (
          <Text style={[styles.noteBody, { color: colors.textMuted }]} numberOfLines={3}>
            {item.body}
          </Text>
        ) : null}

        <View style={styles.noteFooter}>
          <Text style={[styles.noteDate, { color: colors.textDim }]}>
            {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Text>
          <Pressable
            onPress={() => confirmDelete(item)}
            style={[styles.deleteBtn, { backgroundColor: colors.dangerSoft }]}
            hitSlop={6}
          >
            <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '700' }}>Delete</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header title="My Notes" subtitle={`${notes.length} total`} showMenu />

      <View style={styles.filtersRow}>
        {FILTERS.map(f => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor: active ? colors.primary : colors.bgCard,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '600', fontSize: 13 }}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => navigation.navigate('NoteEdit', {})}
          style={[styles.newBtn, { backgroundColor: colors.primary, ...shadows.md }]}
        >
          <Text style={styles.newBtnText}>+ New</Text>
        </Pressable>
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          icon="✎"
          title={filter === 'pinned' ? 'No pinned notes' : 'No notes yet'}
          message={filter === 'pinned' ? 'Pin a note to see it here' : 'Tap "New" to create your first note'}
          actionLabel="Create Note"
          onAction={() => navigation.navigate('NoteEdit', {})}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <NoteCard item={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  filtersRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16, paddingBottom: 12 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.full, borderWidth: 1 },
  newBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.full },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  list: { padding: 16, paddingTop: 4, paddingBottom: 100 },
  noteCard: {
    borderWidth: 0.5, borderLeftWidth: 4,
    borderRadius: radius.md, padding: 16, marginBottom: 12,
  },
  noteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  noteTitle: { flex: 1, fontSize: 15, fontWeight: '700', letterSpacing: -0.2 },
  pinBtn: { padding: 4 },
  noteBody: { fontSize: 13, fontWeight: '500', lineHeight: 19, marginBottom: 12 },
  noteFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  noteDate: { fontSize: 11, fontWeight: '600', letterSpacing: 0.2 },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
});