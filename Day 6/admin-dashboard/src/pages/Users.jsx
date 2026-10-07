import { FadeUp } from '../components/MotionWrappers';
import DataTable from '../components/DataTable';

export default function Users() {
  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
            User <span className="text-gradient">Management</span>
          </h1>
          <p className="text-sm text-slate-500">Manage users, roles, and permissions.</p>
        </div>
      </FadeUp>
      <FadeUp delay={0.15}>
        <DataTable />
      </FadeUp>
    </div>
  );
}