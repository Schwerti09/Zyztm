import { Route, Switch } from 'wouter';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminProducts from './AdminProducts';
import AdminSales from './AdminSales';
import AdminAI from './AdminAI';
import AdminSettings from './AdminSettings';
import AdminCoins from './AdminCoins';

export default function AdminPage() {
  const secret = localStorage.getItem('adminSecret');

  if (!secret) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/sales" component={AdminSales} />
        <Route path="/admin/coins" component={AdminCoins} />
        <Route path="/admin/ai" component={AdminAI} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route path="/admin/:rest*" component={AdminDashboard} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </AdminLayout>
  );
}
