import { useState, useMemo } from 'react';
import { Search, Package } from 'lucide-react';
import { Badge, Card, EmptyState } from '../components/UI';
import { FadeUp } from '../components/MotionWrappers';

const products = [
  { id: 1, name: 'Super Kernel Basmati Rice 5kg', category: 'Grocery', price: 2450, stock: 120, status: 'in-stock' },
  { id: 2, name: 'Tapal Danedar Tea 950g', category: 'Beverages', price: 1890, stock: 8, status: 'low-stock' },
  { id: 3, name: 'National Tomato Ketchup 800g', category: 'Grocery', price: 550, stock: 240, status: 'in-stock' },
  { id: 4, name: 'Shan Biryani Masala 65g', category: 'Spices', price: 180, stock: 0, status: 'out' },
  { id: 5, name: 'Rooh Afza 800ml', category: 'Beverages', price: 380, stock: 380, status: 'in-stock' },
  { id: 6, name: 'Lays Masala Chips 40g', category: 'Snacks', price: 50, stock: 1200, status: 'in-stock' },
  { id: 7, name: 'Olpers Milk 1L', category: 'Dairy', price: 290, stock: 15, status: 'low-stock' },
  { id: 8, name: 'Dalda Cooking Oil 5L', category: 'Grocery', price: 3200, stock: 45, status: 'in-stock' },
  { id: 9, name: 'Nestle Nido 900g', category: 'Dairy', price: 2100, stock: 5, status: 'low-stock' },
  { id: 10, name: 'Tapal Green Tea 250g', category: 'Beverages', price: 720, stock: 0, status: 'out' },
];

const statusVariant = { 'in-stock': 'success', 'low-stock': 'warning', out: 'danger' };

export default function Products() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (cat !== 'all') list = list.filter((p) => p.category === cat);
    return list;
  }, [search, cat]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
            Product <span className="text-gradient">Catalog</span>
          </h1>
          <p className="text-sm text-slate-500">{products.length} products in inventory</p>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <Card className="p-5">
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 flex-1 hover:border-white/20 transition-colors">
              <Search size={14} className="text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-violet-400/50 cursor-pointer"
            >
              {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={Package} title="No products" message="Try a different search." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <div key={p.id} className="glass rounded-xl p-4 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/10 flex items-center justify-center">
                      <Package size={16} className="text-violet-300" />
                    </div>
                    <Badge variant={statusVariant[p.status]} dot>{p.status.replace('-', ' ')}</Badge>
                  </div>
                  <h4 className="text-sm font-bold mb-1 line-clamp-2">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 mb-3">{p.category}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Price</p>
                      <p className="text-lg font-bold text-emerald-300">Rs {p.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Stock</p>
                      <p className="text-sm font-bold">{p.stock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </FadeUp>
    </div>
  );
}