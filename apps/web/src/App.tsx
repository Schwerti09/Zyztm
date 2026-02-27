import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import MainPage from './pages/MainPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/admin/AdminPage';

const CoinsPage = lazy(() => import('./pages/CoinsPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const AGBPage = lazy(() => import('./pages/AGBPage'));
const ZyztmIntro = lazy(() => import('./components/ZyztmIntro'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <div className="font-cyber text-neon-pink animate-pulse">LOADING…</div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <ZyztmIntro />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/admin/:rest*" component={AdminPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={MainPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/coins" component={CoinsPage} />
          <Route path="/impressum" component={ImpressumPage} />
          <Route path="/datenschutz" component={DatenschutzPage} />
          <Route path="/agb" component={AGBPage} />
        </Switch>
      </Suspense>
    </>
  );
}

