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
const AboutTeamPage = lazy(() => import('./pages/AboutTeamPage'));
const NexusIntro = lazy(() => import('./components/NexusIntro'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const HubPage = lazy(() => import('./pages/HubPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'));
const NexusIQPage = lazy(() => import('./pages/NexusIQPage'));
const FortniteSpacePage = lazy(() => import('./pages/FortniteSpacePage'));
const LoadoutGodPage = lazy(() => import('./pages/LoadoutGodPage'));
const CreatorsPage = lazy(() => import('./pages/CreatorsPage'));
const ClassicPage = lazy(() => import('./pages/ClassicPage'));

// Digital Products Shop
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const CheckoutCancelPage = lazy(() => import('./pages/CheckoutCancelPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));

// Pro Tools
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const SensitivityConverterPage = lazy(
  () => import('./pages/tools/SensitivityConverterPage'),
);
const LoadoutOptimizerPage = lazy(
  () => import('./pages/tools/LoadoutOptimizerPage'),
);
const StatsDashboardPage = lazy(() => import('./pages/tools/StatsDashboardPage'));
const DropLocationsPage = lazy(() => import('./pages/tools/DropLocationsPage'));
const BuildTrainerPage = lazy(() => import('./pages/tools/BuildTrainerPage'));
const MetaPredictorPage = lazy(() => import('./pages/tools/MetaPredictorPage'));
const KeybindOptimizerPage = lazy(() => import('./pages/tools/KeybindOptimizerPage'));
const RotationPlannerPage = lazy(() => import('./pages/tools/RotationPlannerPage'));

// Live Data & Programmatic SEO
const ShopLivePage = lazy(() => import('./pages/ShopLivePage'));
const ProsHubPage = lazy(() => import('./pages/ProsHubPage'));
const ProPlayerPage = lazy(() => import('./pages/ProPlayerPage'));
const WeaponsHubPage = lazy(() => import('./pages/WeaponsHubPage'));
const WeaponPage = lazy(() => import('./pages/WeaponPage'));

// Viral Landing Pages
const ShareLandingPage = lazy(() => import('./pages/ShareLandingPage'));

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
          <Route path="/" component={FortniteSpacePage} />
          <Route path="/classic" component={MainPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/coins" component={CoinsPage} />
          <Route path="/impressum" component={ImpressumPage} />
          <Route path="/datenschutz" component={DatenschutzPage} />
          <Route path="/agb" component={AGBPage} />
          <Route path="/ueber-uns/team" component={AboutTeamPage} />
          {/* Digital Products Shop */}
          <Route path="/shop" component={ShopPage} />
          <Route path="/shop/:slug" component={ProductDetailPage} />
          <Route path="/checkout/success" component={CheckoutSuccessPage} />
          <Route path="/checkout/cancel" component={CheckoutCancelPage} />
          <Route path="/download/:orderId/:token" component={DownloadPage} />
          <Route path="/orders" component={OrdersPage} />
          {/* NEXUS IQ */}
          <Route path="/nexus-iq" component={NexusIQPage} />
          {/* Pro Tools — High-Tech Suite */}
          <Route path="/tools" component={ToolsPage} />
          <Route
            path="/tools/sensitivity-converter"
            component={SensitivityConverterPage}
          />
          <Route path="/tools/loadout-optimizer" component={LoadoutOptimizerPage} />
          <Route path="/tools/stats-dashboard" component={StatsDashboardPage} />
          <Route path="/tools/drop-locations" component={DropLocationsPage} />
          <Route path="/tools/build-trainer" component={BuildTrainerPage} />
          <Route path="/tools/meta-predictor" component={MetaPredictorPage} />
          <Route path="/tools/keybind-optimizer" component={KeybindOptimizerPage} />
          <Route path="/tools/rotation-planner" component={RotationPlannerPage} />
          {/* Live Data & Programmatic SEO */}
          <Route path="/item-shop" component={ShopLivePage} />
          <Route path="/pros" component={ProsHubPage} />
          <Route path="/pro/:slug" component={ProPlayerPage} />
          <Route path="/weapons" component={WeaponsHubPage} />
          <Route path="/weapon/:slug" component={WeaponPage} />
          {/* Viral Landing Pages */}
          <Route path="/share/:type/:id" component={ShareLandingPage} />
          {/* Fortnite Nexus Space */}
          <Route path="/space" component={FortniteSpacePage} />
          {/* Loadout God */}
          <Route path="/loadout-god" component={LoadoutGodPage} />
          {/* Creators */}
          <Route path="/creators" component={CreatorsPage} />
          {/* Classic */}
          <Route path="/classic" component={ClassicPage} />
          {/* Guide / Runbook routes (language-prefixed for SEO) */}
          <Route path="/:lang/guide/:slug" component={GuidePage} />
          <Route path="/:lang/guides/:category" component={HubPage} />
          {/* News routes */}
          <Route path="/:lang/news/:slug" component={NewsArticlePage} />
          <Route path="/:lang/news" component={NewsPage} />
        </Switch>
      </Suspense>
    </>
  );
}

