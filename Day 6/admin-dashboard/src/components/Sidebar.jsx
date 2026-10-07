import { motion } from 'framer-motion';
import {
  LayoutDashboard, BarChart3, Users, Package, Settings,
  X, Sparkles, LifeBuoy,
} from 'lucide-react';

const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { id: 'users', label: 'Users', icon: Users, badge: 15 },
      { id: 'products', label: 'Products', icon: Package, badge: 3 },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar({ active, onChange, open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 flex-shrink-0
          glass-strong border-r border-white/10 flex flex-col
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-400 flex items-center justify-center text-lg glow-primary">
              <Sparkles size={18} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gradient leading-tight">
                Anas Dashboard
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                v2.0 — Enterprise
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-3 mb-2 text-[10px] uppercase tracking-widest font-bold text-slate-600">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onChange(item.id); onClose(); }}
                      className={`
                        relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-200 text-left
                        ${isActive
                          ? 'text-white bg-gradient-to-r from-violet-500/20 to-transparent'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-violet-400 to-cyan-400"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={17} className={isActive ? 'text-violet-300' : ''} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-violet-400/30 text-violet-200' : 'bg-white/5 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3">
          <div className="relative overflow-hidden rounded-xl p-3 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 border border-white/5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <LifeBuoy size={14} className="text-violet-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">Need help?</p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Check our docs
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold ring-2 ring-white/10">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Anas Khan</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}