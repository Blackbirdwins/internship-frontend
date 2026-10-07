import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Skeleton } from './UI';

function StatCard({ label, value, delta, icon: Icon, color = 'primary', loading, sparkline = [] }) {
  const colorMap = {
    primary: { grad: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', text: 'text-violet-300', line: '#a78bfa' },
    success: { grad: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/30', text: 'text-emerald-300', line: '#34d399' },
    warning: { grad: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', text: 'text-amber-300', line: '#fbbf24' },
    danger: { grad: 'from-rose-500 to-red-600', glow: 'shadow-rose-500/30', text: 'text-rose-300', line: '#f87171' },
    cyan: { grad: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/30', text: 'text-cyan-300', line: '#22d3ee' },
  };
  const c = colorMap[color];
  const isPositive = delta >= 0;

  if (loading) {
    return (
      <div className="glass rounded-2xl p-5">
        <Skeleton className="w-10 h-10 rounded-xl mb-4" />
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-8 w-24" />
      </div>
    );
  }

  return (
    <div className="group relative glass rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
      {/* Ambient glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} shadow-lg ${c.glow} flex items-center justify-center`}>
            {Icon && <Icon size={17} className="text-white" />}
          </div>
          {delta !== undefined && (
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
            }`}>
              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {isPositive ? '+' : ''}{delta}%
            </div>
          )}
        </div>

        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
          {label}
        </p>
        <p className={`text-2xl lg:text-3xl font-bold tracking-tight ${c.text}`}>
          {value}
        </p>

        {/* Sparkline */}
        {sparkline.length > 0 && (
          <div className="h-10 -mx-1 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline.map((v) => ({ v }))}>
                <defs>
                  <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.line} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={c.line} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={c.line}
                  strokeWidth={1.5}
                  fill={`url(#spark-${color})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(StatCard);