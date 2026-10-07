import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, BarChart3, Users, Package, Settings, ArrowRight } from 'lucide-react';

const commands = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, group: 'Navigation' },
  { id: 'analytics', label: 'Go to Analytics', icon: BarChart3, group: 'Navigation' },
  { id: 'users', label: 'Go to Users', icon: Users, group: 'Navigation' },
  { id: 'products', label: 'Go to Products', icon: Package, group: 'Navigation' },
  { id: 'settings', label: 'Go to Settings', icon: Settings, group: 'Navigation' },
];

export default function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter' && filtered[selected]) {
        onNavigate(filtered[selected].id);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
              <Search size={16} className="text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
              />
              <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-500 font-mono">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No commands found</div>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const isSelected = i === selected;
                  return (
                    <button
                      key={cmd.id}
                      onMouseEnter={() => setSelected(i)}
                      onClick={() => { onNavigate(cmd.id); onClose(); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-500/20 to-transparent text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-violet-500/20' : 'bg-white/5'
                      }`}>
                        <Icon size={13} className={isSelected ? 'text-violet-300' : ''} />
                      </div>
                      <span className="flex-1 font-medium">{cmd.label}</span>
                      {isSelected && <ArrowRight size={14} className="text-violet-300" />}
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>Ctrl+K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}