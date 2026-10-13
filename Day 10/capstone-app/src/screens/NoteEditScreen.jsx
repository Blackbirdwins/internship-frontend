import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useNotes } from '../contexts/NotesContext';
import { useToast } from '../contexts/ToastContext';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { radius, shadows } from '../utils/theme';

const COLOR_OPTIONS = [
  { id: 'primary', color: '#818CF8' },
  { id: 'accent', color: '#34D399' },
  { id: 'warning', color: '#FBBF24' },
  { id: 'danger', color: '#F87171' },
];

export default function NoteEditScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes();
  const { showToast } = useToast();

  const editId = route.params?.id;
  const existing = editId ? notes.find(n => n.id === editId) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [body, setBody] = useState(existing?.body || '');
  const [color, setColor] = useState(existing?.color || 'primary');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setBody(existing.body);
      setColor(existing.color);
    }
  }, [editId]);

  const handleSave = () => {
    if (!title.trim() && !body.trim()) {
      showToast('Note khali hai', 'warning');
      return;
    }
    if (existing) {
      updateNote(editId, { title: title.trim() || 'Untitled', body: body.trim(), color });
      showToast('Note updated', 'success');
    } else {
      addNote({ title: title.trim() || 'Untitled', body: body.trim(), color });
      showToast('Note created', 'success');
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    const doDel = () => {
      deleteNote(editId);
      showToast('Note deleted', 'warning');
      navigation.goBack();
    };
    if (Platform.OS === 'web') {
      if (window.confirm('Delete note?')) doDel();
    } else {
      require('react-native').Alert.alert('Delete Note', 'Yeh note delete karna hai?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: doDel },
      ]);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: colors.bg }]}>
      <Header
        title={existing ? 'Edit Note' : 'New Note'}
        subtitle={existing ? 'Update your note' : 'Create something new'}
        onBack={() => navigation.goBack()}
        rightAction={
          existing && (
            <Pressable onPress={() => togglePin(editId)} style={[styles.iconBtn, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
              <Text style={{ fontSize: 16 }}>{existing.pinned ? '📌' : '📍'}</Text>
            </Pressable>
          )
        }
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border, ...shadows.sm }]}>
            <Input
              label="TITLE"
              value={title}
              onChangeText={setTitle}
              placeholder="Note title"
              maxLength={60}
            />
            <Input
              label="BODY"
              value={body}
              onChangeText={setBody}
              placeholder="Write your thoughts..."
              multiline
              numberOfLines={10}
              style={{ minHeight: 160, textAlignVertical: 'top' }}
            />

            <Text style={[styles.colorLabel, { color: colors.textMuted }]}>ACCENT COLOR</Text>
            <View style={styles.colorRow}>
              {COLOR_OPTIONS.map(opt => {
                const active = color === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => setColor(opt.id)}
                    style={[
                      styles.colorDot,
                      {
                        backgroundColor: opt.color,
                        borderWidth: active ? 3 : 0,
                        borderColor: colors.bg,
                        transform: [{ scale: active ? 1.15 : 1 }],
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.actions}>
            <Button variant="primary" onPress={handleSave} fullWidth>
              {existing ? 'Update Note' : 'Create Note'}
            </Button>
            {existing && (
              <Button variant="danger" onPress={handleDelete} fullWidth style={{ marginTop: 10 }}>
                Delete Note
              </Button>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  iconBtn: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5 },
  card: { padding: 20, borderRadius: radius.lg, borderWidth: 0.5, marginBottom: 16 },
  colorLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.6, marginTop: 8, marginBottom: 12 },
  colorRow: { flexDirection: 'row', gap: 14 },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  actions: { marginTop: 8 },
});