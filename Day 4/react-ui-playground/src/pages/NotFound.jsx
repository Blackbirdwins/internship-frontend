import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <Card title="404 — Not Found">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/"><Button>Go Home</Button></Link>
    </Card>
  );
}