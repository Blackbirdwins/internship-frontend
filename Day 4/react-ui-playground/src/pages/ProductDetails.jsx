import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { fetchProductById } from '../services/productService';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import Badge from '../components/Badge';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(
    (signal) => fetchProductById(id, signal),
    [id]
  );

  useDocumentTitle(product ? product.title : 'Loading...');

  if (loading) return <Loader size="lg" text="Loading product..." />;
  if (error) return <ErrorState title="Error" message={error} />;
  if (!product) return null;

  return (
    <Card title="📦 Product Details">
      <Link to="/products">
        <Button variant="outline" size="sm">← Back to Products</Button>
      </Link>

      <div style={{ marginTop: '1.5rem' }}>
        <Badge variant="gray">{product.category}</Badge>
        <h1 style={{
          color: '#f1f5f9',
          marginTop: '0.75rem',
          marginBottom: '1rem',
          fontSize: '1.8rem',
        }}>
          {product.title}
        </h1>

        <p style={{
          color: '#94a3b8',
          lineHeight: 1.7,
          fontSize: '1rem',
          marginBottom: '1.5rem',
        }}>
          {product.description}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          <div style={{
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Price</p>
            <h2 style={{ color: '#10b981', fontSize: '1.8rem' }}>
              Rs {product.price.toLocaleString()}
            </h2>
          </div>

          <div style={{
            padding: '1rem',
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Rating</p>
            <h2 style={{ color: '#f59e0b', fontSize: '1.8rem' }}>
              ⭐ {product.rating.rate}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              {product.rating.count} reviews
            </p>
          </div>

          <div style={{
            padding: '1rem',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Category</p>
            <h2 style={{ color: '#6366f1', fontSize: '1.5rem' }}>
              {product.category}
            </h2>
          </div>
        </div>

        <Button style={{ marginTop: '2rem' }} size="lg">🛒 Add to Cart</Button>
      </div>
    </Card>
  );
}