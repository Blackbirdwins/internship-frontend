import { useState, lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ErrorBoundary from './components/ErrorBoundary';
import CommandPalette from './components/CommandPalette';
import { Skeleton } from './components/UI';
import { PageTransition } from './components/MotionWrappers';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Users = lazy(() => import('./pages/Users'));
const Products = lazy(() => import('./pages/Products'));
const Settings = lazy(() => import('./pages/Settings'));

const pageTitles = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  users: 'Users',
  products: 'Products',
  settings: 'Settings',
};

function PageLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
      </div>
    </div>
  );
}

const pages = {
  dashboard: Dashboard,
  analytics: Analytics,
  users: Users,
  products: Products,
  settings: Settings,
};

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const ActivePage = pages[active];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        active={active}
        onChange={setActive}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          title={pageTitles[active]}
          onCommandK={() => setCmdOpen(true)}
        />

        <main className="flex-1 w-full px-4 lg:px-6 py-6">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <PageTransition key={active}>
                <Suspense fallback={<PageLoader />}>
                  <ActivePage />
                </Suspense>
              </PageTransition>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
      </div>

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={setActive}
      />
    </div>
  );
}