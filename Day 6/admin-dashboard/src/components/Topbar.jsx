import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Search, Command, X } from 'lucide-react';
import { Badge } from './UI';

const notifications = [
  { id: 1, title: 'New order #1234', time: '2 min ago', type: 'success' },
  { id: 2, title: 'Server load high', time: '15 min ago', type: 'warning' },
  { id: 3, title: 'Payment received', time: '1 hour ago', type: 'primary' },
  { id: 4, title: 'User signed up', time: '3 hours ago', type: 'accent' },
];

export default function Topbar({ onMenuClick, title, onCommandK }) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-20 glass border-b border-white/5">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={16} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-0.5">
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-300 font-semibold">{title}</span>
          </div>
          <h2 className="text-base lg:text-lg font-bold tracking-tight">{title}</h2>
        </div>

        {/* Command search */}
        <button
          onClick={onCommandK}
          className="hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 w-64 text-left hover:border-white/20 hover:bg-white/[0.05] transition-all group"
        >
          <Search size={14} className="text-slate-500 group-hover:text-violet-300 transition-colors" />
          <span className="flex-1 text-xs text-slate-500">Search or jump to...</span>
          <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400 font-mono">
            <Command size={10} />K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-400 rounded-full border border-slate-900 animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <h3 className="text-sm font-bold">Notifications</h3>
                  <button onClick={() => setShowNotif(false)} className="text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Badge variant={n.type} dot>{''}</Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-200">{n.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold ring-2 ring-white/10 cursor-pointer hover:ring-violet-400/40 transition-all">
          A
        </div>
      </div>
    </header>
  );
}