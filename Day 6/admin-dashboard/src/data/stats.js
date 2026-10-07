import { Users, Package, DollarSign, ShoppingCart } from 'lucide-react';

export const statCards = [
  { id: 1, label: 'Total Users', value: '12,847', delta: 12.5, icon: Users, color: 'primary', sparkline: [40, 42, 45, 48, 52, 58, 62, 68, 72, 78] },
  { id: 2, label: 'Products', value: '1,438', delta: 8.2, icon: Package, color: 'cyan', sparkline: [30, 32, 34, 33, 36, 38, 40, 42, 44, 46] },
  { id: 3, label: 'Revenue', value: 'Rs 4.2M', delta: 24.8, icon: DollarSign, color: 'success', sparkline: [20, 25, 22, 30, 35, 32, 40, 45, 52, 60] },
  { id: 4, label: 'Orders', value: '3,291', delta: -3.4, icon: ShoppingCart, color: 'warning', sparkline: [50, 48, 52, 45, 42, 44, 40, 38, 36, 34] },
];