import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Home | React Shop');

  return (
    <Card title="🏠 Home">
      <h1>Welcome to React Shop</h1>
      <p>Browse products, view details, and manage your cart.</p>
      <Link to="/products">
        <Button>Browse Products →</Button>
      </Link>
    </Card>
  );
}