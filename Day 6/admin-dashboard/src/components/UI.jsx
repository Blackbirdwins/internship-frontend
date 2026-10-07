export function Button({ children, variant = 'primary', size = 'md', className = '', ...rest }) {
  const variants = {
    primary: 'relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50',
    ghost: 'bg-white/[0.03] text-slate-400 border border-white/10 hover:bg-white/[0.06] hover:text-white hover:border-white/20',
    danger: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
    outline: 'bg-transparent border border-violet-400/40 text-violet-300 hover:bg-violet-500/10',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'default', dot = false }) {
  const variants = {
    default: 'bg-slate-500/15 text-slate-300 border-slate-500/20',
    primary: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    danger: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    accent: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  };
  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-violet-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-400',
    accent: 'bg-cyan-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 ${variants[variant]} border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  );
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`glass rounded-2xl ${hover ? 'transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`bg-white/[0.04] rounded-lg shimmer ${className}`} />;
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="text-center py-16 px-6">
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/10 flex items-center justify-center">
          <Icon size={28} className="text-violet-300" />
        </div>
      )}
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-5">{message}</p>
      {action}
    </div>
  );
}