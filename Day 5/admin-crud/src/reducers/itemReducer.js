import { seedItems, createItem } from '../data/items';

const STORAGE_KEY = 'admin_items';

// localStorage se initial state lo, warna seed data
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { items: JSON.parse(saved) };
  } catch {}
  return { items: seedItems };
};

export const initialState = loadInitialState();

export function saveToStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function itemReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { items: [createItem(action.payload), ...state.items] };

    case 'UPDATE':
      return {
        items: state.items.map((it) =>
          it.id === action.payload.id
            ? {
                ...it,
                title: action.payload.data.title.trim(),
                description: action.payload.data.description?.trim() || '',
                status: action.payload.data.status,
                priority: action.payload.data.priority,
                category: action.payload.data.category,
                updatedAt: new Date().toISOString(),
              }
            : it
        ),
      };

    case 'DELETE':
      return { items: state.items.filter((i) => i.id !== action.payload) };

    case 'ROLLBACK':
      return { items: action.payload };

    case 'RESET':
      return { items: seedItems };

    default:
      return state;
  }
}