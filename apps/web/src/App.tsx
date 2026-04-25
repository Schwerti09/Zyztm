import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import ScrollFix from './components/ScrollFix';
import MainPage from './pages/MainPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/admin/AdminPage';
import { getLanguageFromPath, type Language, buildLocalizedUrl } from './lib/i18n';

const CoinsPage = lazy(() => import('./pages/CoinsPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const AGBPage = lazy(() => import('./pages/AGBPage'));
const NexusIntro = lazy(() => import('./components/ZyztmIntro'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const HubPage = lazy(() => import('./pages/HubPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <div className="font-cyber text-neon-pink animate-pulse">LOADING…</div>
    </div>
  );
}

// Language-aware route wrapper
function LanguageRoute({ path, component }: { path: string; component: React.ComponentType<any> }) {
  return (
    <>
      {['en', 'de', 'es', 'fr', 'pt-br', 'it', 'ru', 'pl', 'tr', 'ja'].map((lang) => (
        <Route key={lang} path={`/${lang}${path}`} component={component} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollFix />
      <Suspense fallback={null}>
        <NexusIntro />
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
          {/* Guide / Runbook routes (language-prefixed for SEO) */}
          <LanguageRoute path="/guide/:slug" component={GuidePage} />
          <LanguageRoute path="/guides/:category" component={HubPage} />
          {/* News routes */}
          <LanguageRoute path="/news/:slug" component={NewsArticlePage} />
          <LanguageRoute path="/news" component={NewsPage} />
        </Switch>
      </Suspense>
    </>
  );
}

