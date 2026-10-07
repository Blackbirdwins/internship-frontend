import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid } from 'recharts';
import StatCard from '../components/StatCard';
import { Card } from '../components/UI';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/MotionWrappers';

const trafficData = [
  { day: 'Mon', visits: 1200 }, { day: 'Tue', visits: 1900 }, { day: 'Wed', visits: 1600 },
  { day: 'Thu', visits: 2400 }, { day: 'Fri', visits: 2900 }, { day: 'Sat', visits: 2200 },
  { day: 'Sun', visits: 1800 },
];

const conversion = [
  { stage: 'Visits', value: 12000, color: '#a78bfa' },
  { stage: 'Signups', value: 3400, color: '#22d3ee' },
  { stage: 'Active', value: 2100, color: '#34d399' },
  { stage: 'Paid', value: 890, color: '#fbbf24' },
];

const kpis = [
  { id: 1, label: 'Page Views', value: '48.2K', delta: 18.4, icon: TrendingUp, color: 'primary', sparkline: [20, 25, 22, 30, 35, 32, 40, 45, 52, 60] },
  { id: 2, label: 'Unique Visitors', value: '12.8K', delta: 12.1, icon: Users, color: 'cyan', sparkline: [30, 32, 34, 33, 36, 38, 40, 42, 44, 46] },
  { id: 3, label: 'Conversion', value: '7.4%', delta: 2.8, icon: Target, color: 'success', sparkline: [5, 5.5, 5.2, 6, 6.2, 6.8, 7, 7.2, 7.3, 7.4] },
  { id: 4, label: 'Avg Session', value: '4m 32s', delta: -1.2, icon: Zap, color: 'warning', sparkline: [6, 5.8, 5.5, 5.4, 5.2, 5, 4.9, 4.7, 4.5, 4.3] },
];

const tooltipStyle = {
  background: 'rgba(19, 24, 38, 0.95)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  borderRadius: '12px',
  color: '#f1f5f9',
  fontSize: '12px',
  padding: '10px 14px',
};

const axisStyle = { fontSize: 11, fill: '#94a3b8' };

export default function Analytics() {
  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
            Analytics <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-sm text-slate-500">Track your performance and engagement metrics.</p>
        </div>
      </FadeUp>

      <StaggerContainer delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <StaggerItem key={k.id}><StatCard {...k} /></StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FadeUp delay={0.3}>
          <Card className="p-5 lg:col-span-2">
            <h3 className="text-sm font-bold mb-1">Traffic Trend</h3>
            <p className="text-[11px] text-slate-500 mb-4">Last 7 days</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.08)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: '#a78bfa', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="visits" stroke="#a78bfa" strokeWidth={2.5} fill="url(#trafficGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </FadeUp>

        <FadeUp delay={0.4}>
          <Card className="p-5">
            <h3 className="text-sm font-bold mb-1">Conversion Funnel</h3>
            <p className="text-[11px] text-slate-500 mb-4">User journey</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={conversion} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis dataKey="stage" type="category" tick={axisStyle} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(167,139,250,0.08)' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {conversion.map((c) => <Cell key={c.stage} fill={c.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}