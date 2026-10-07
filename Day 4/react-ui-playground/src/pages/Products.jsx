import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { fetchProducts, fetchCategories } from '../services/productService';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';

const PRODUCTS_PER_PAGE = 6;

export default function Products() {
  useDocumentTitle('Products | Anas React Shop');

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'default';
  const currentPage = Number(searchParams.get('page')) || 1;

  const debouncedSearch = useDebounce(search, 400);

  const { data: products, loading, error } = useFetch(fetchProducts, []);
  const { data: categories } = useFetch(fetchCategories, []);

  const filtered = (products || [])
    .filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((p) => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    setSearchParams(params);
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader size="lg" text="Loading products..." />;
  if (error) return <ErrorState title="Error" message={error} />;

  return (
    <>
      <Card title="🔍 Filters">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            className="input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
          />
          <select
            className="input"
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="all">All categories</option>
            {categories?.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="input"
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title">Title: A → Z</option>
          </select>
        </div>
        <p style={{ marginTop: '1rem', color: '#94a3b8' }}>
          Found <strong style={{ color: '#6366f1' }}>{filtered.length}</strong> products
        </p>
      </Card>

      {paginated.length === 0 ? (
        <EmptyState icon="📦" title="No products" message="Try different filters" />
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {paginated.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card" style={{
                  height: '100%',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <Badge variant="gray">{product.category}</Badge>
                  <h4 style={{
                    fontSize: '1.05rem',
                    marginTop: '0.75rem',
                    marginBottom: '0.5rem',
                    color: '#f1f5f9',
                    minHeight: '50px',
                  }}>
                    {product.title}
                  </h4>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    flex: 1,
                  }}>
                    {product.description}
                  </p>
                  <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    ⭐ {product.rating.rate} ({product.rating.count} reviews)
                  </p>
                  <p style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#10b981',
                  }}>
                    Rs {product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}