import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const linkStyle = ({ isActive }) => ({
    padding: '0.6rem 1.2rem',
    textDecoration: 'none',
    color: isActive ? '#6366f1' : '#94a3b8',
    fontWeight: isActive ? '700' : '500',
    borderRadius: '8px',
    background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #334155',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            fontWeight: 800,
          }}>
            🛍️ Anas React Shop
          </h2>
        </NavLink>
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          <NavLink to="/" style={linkStyle} end>Home</NavLink>
          <NavLink to="/products" style={linkStyle}>Products</NavLink>
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
        </nav>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <Outlet />
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#64748b',
        borderTop: '1px solid #1e293b',
        marginTop: '3rem',
      }}>
        © 2026 <strong style={{ color: '#6366f1' }}>Anas React Shop</strong> — Built with ❤️ in Pakistan
      </footer>
    </div>
  );
}