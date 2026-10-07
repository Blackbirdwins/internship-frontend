import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Users } from 'lucide-react';
import { Badge, EmptyState, Button } from './UI';
import { users as allUsers } from '../data/users';

const PER_PAGE = 6;

const statusVariant = {
  active: 'success',
  pending: 'warning',
  inactive: 'danger',
};

const roleVariant = {
  Admin: 'primary',
  Moderator: 'warning',
  User: 'default',
};

export default function DataTable() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const processed = useMemo(() => {
    let list = [...allUsers];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    if (filter !== 'all') {
      list = list.filter((u) => u.status === filter);
    }

    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (a[sortKey] < b[sortKey]) return -1 * dir;
      if (a[sortKey] > b[sortKey]) return 1 * dir;
      return 0;
    });

    return list;
  }, [search, filter, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = processed.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortBtn = ({ label, k }) => (
    <button
      onClick={() => handleSort(k)}
      className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-violet-300 transition-colors"
    >
      {label}
      <ArrowUpDown size={11} className={sortKey === k ? 'text-violet-300' : 'opacity-30'} />
    </button>
  );

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-white/5 flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex-1">
          <h3 className="text-base font-bold tracking-tight">All Users</h3>
          <p className="text-xs text-slate-500">
            {processed.length} of {allUsers.length} records
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 sm:w-64 hover:border-white/20 transition-colors">
            <Search size={14} className="text-slate-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name or email..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-violet-400/50 cursor-pointer hover:border-white/20 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          message="Try adjusting your search or filters."
          action={
            <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setFilter('all'); }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="text-left p-4"><SortBtn label="User" k="name" /></th>
                  <th className="text-left p-4 hidden md:table-cell"><SortBtn label="Role" k="role" /></th>
                  <th className="text-left p-4"><SortBtn label="Status" k="status" /></th>
                  <th className="text-right p-4 hidden lg:table-cell"><SortBtn label="Orders" k="orders" /></th>
                  <th className="text-right p-4"><SortBtn label="Spent" k="spent" /></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/5 last:border-0 hover:bg-violet-500/[0.04] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 ring-2 ring-white/10">
                          {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate text-white">{u.name}</p>
                          <p className="text-xs text-slate-500 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Badge variant={roleVariant[u.role]}>{u.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusVariant[u.status]} dot>{u.status}</Badge>
                    </td>
                    <td className="p-4 text-right hidden lg:table-cell">
                      <span className="text-sm font-semibold text-slate-300">{u.orders}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-bold text-emerald-300">
                        Rs {u.spent.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Showing <strong className="text-white">{(currentPage - 1) * PER_PAGE + 1}</strong>–
              <strong className="text-white">{Math.min(currentPage * PER_PAGE, processed.length)}</strong> of{' '}
              <strong className="text-white">{processed.length}</strong>
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === n
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-400/50'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}