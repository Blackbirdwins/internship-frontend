import { useEffect, useState, useCallback } from 'react';
import { statCards } from '../data/stats';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Charts from '../components/Charts';
import RetryState from '../components/RetryState';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/MotionWrappers';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(false);
    const t = setTimeout(() => {
      // Simulate occasional failure
      if (Math.random() < 0.05) setError(true);
      else setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const cleanup = loadData();
    return cleanup;
  }, [loadData]);

  if (error) return <RetryState message="Failed to load dashboard" onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="bg-gradient-to-br from-primary/20 via-bg-card to-cyan-500/10 border border-primary/30 rounded-2xl p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Anas</span> 👋
          </h2>
          <p className="text-text-muted text-sm">Here's what's happening with your store today.</p>
        </div>
      </FadeUp>

      <StaggerContainer delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCard {...stat} loading={loading} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      <FadeUp delay={0.3}>
        <Charts />
      </FadeUp>

      <FadeUp delay={0.4}>
        <DataTable />
      </FadeUp>
    </div>
  );
}