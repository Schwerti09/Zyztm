import { Route, Switch } from 'wouter';
import MainPage from './pages/MainPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/admin/AdminPage';

export default function App() {
  return (
    <Switch>
      <Route path="/admin/:rest*" component={AdminPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/" component={MainPage} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}
