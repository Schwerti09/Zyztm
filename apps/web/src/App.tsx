import { Route, Switch } from 'wouter';
import MainPage from './pages/MainPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={MainPage} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}
