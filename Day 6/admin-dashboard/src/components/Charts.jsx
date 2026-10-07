import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
  CartesianGrid, Legend,
} from 'recharts';
import { revenueTrend, categoryData, topProducts } from '../data/charts';
import { Card } from './UI';
import { TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';

const tooltipStyle = {
  background: 'rgba(19, 24, 38, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  borderRadius: '12px',
  color: '#f1f5f9',
  fontSize: '12px',
  padding: '10px 14px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
};

const axisStyle = {
  fontSize: 11,
  fill: '#94a3b8',
};

function ChartHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/10 flex items-center justify-center">
        <Icon size={15} className="text-violet-300" />
      </div>
      <div>
        <h3 className="text-sm font-bold tracking-tight">{title}</h3>
        <p className="text-[11px] text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Revenue Trend — spans 2 cols */}
      <Card className="p-5 lg:col-span-2">
        <ChartHeader
          icon={TrendingUp}
          title="Revenue Trend"
          subtitle="Last 9 months"
        />
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueTrend}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#232a3d" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `Rs ${v / 1000}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [`Rs ${v.toLocaleString()}`, 'Revenue']}
              cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#revGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Breakdown — Donut */}
      <Card className="p-5">
        <ChartHeader
          icon={PieIcon}
          title="Categories"
          subtitle="Revenue share"
        />
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
            >
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => `Rs ${v.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {categoryData.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c.color }}
                />
                <span className="text-text-muted">{c.name}</span>
              </div>
              <span className="font-semibold">Rs {(c.value / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Products — Bar */}
      <Card className="p-5 lg:col-span-3">
        <ChartHeader
          icon={BarChart3}
          title="Top Products"
          subtitle="Units sold this month"
        />
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid stroke="#232a3d" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [`${v} units`, 'Sales']}
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
            <Bar dataKey="sales" radius={[0, 8, 8, 0]}>
              {topProducts.map((_, i) => (
                <Cell
                  key={i}
                  fill={['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}