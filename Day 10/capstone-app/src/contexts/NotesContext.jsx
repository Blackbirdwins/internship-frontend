import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesContext = createContext(null);

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be inside NotesProvider');
  return ctx;
};

const KEY = '@notes_v3';

const SEED_NOTES = [
  { id: '1', title: 'Welcome to Notes', body: 'Yeh aapka pehla note hai. Edit ya delete karo.', color: 'primary', pinned: true, createdAt: Date.now() },
  { id: '2', title: 'Task list', body: 'Day 10 capstone complete karna hai.\n- Auth ✓\n- Notes ✓\n- API ✓', color: 'accent', pinned: false, createdAt: Date.now() - 3600000 },
];

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setNotes(JSON.parse(raw));
        else setNotes(SEED_NOTES);
      } catch {}
      finally { setLoaded(true); }
    })();
  }, []);

  const persist = async (next) => {
    setNotes(next);
    try { await AsyncStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const addNote = (data) => {
    const note = {
      id: Date.now().toString(),
      title: data.title || 'Untitled',
      body: data.body || '',
      color: data.color || 'primary',
      pinned: false,
      createdAt: Date.now(),
    };
    persist([note, ...notes]);
    return note;
  };

  const updateNote = (id, updates) => {
    persist(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id) => {
    persist(notes.filter(n => n.id !== id));
  };

  const togglePin = (id) => {
    persist(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const clearAll = () => persist([]);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, togglePin, clearAll, loaded }}>
      {children}
    </NotesContext.Provider>
  );
}