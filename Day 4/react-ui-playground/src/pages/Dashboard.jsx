import { Link, Outlet, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Dashboard() {
  useDocumentTitle('Dashboard | React Shop');
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: 'Overview' },
    { to: '/dashboard/profile', label: 'Profile' },
    { to: '/dashboard/settings', label: 'Settings' },
    { to: '/dashboard/analytics', label: 'Analytics' },
  ];

  return (
    <Card title="📊 Dashboard">
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              background: location.pathname === link.to ? '#4f46e5' : '#f3f4f6',
              color: location.pathname === link.to ? 'white' : '#1f2937',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </Card>
  );
}