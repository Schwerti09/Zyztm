import { useEffect, lazy, Suspense } from 'react';
import LiveBar from '../components/LiveBar';
import HeroSection from '../components/HeroSection';
import KickEmbed from '../components/KickEmbed';
import CreatorCode from '../components/CreatorCode';
import SocialHub from '../components/SocialHub';
import ProductGrid from '../components/ProductGrid';
import NewsSection from '../components/NewsSection';
import GamerVoting from '../components/GamerVoting';
import Footer from '../components/Footer';
import Intro from '../components/Intro';
import AboutZyztm from '../components/AboutZyztm';
import StreamHighlights from '../components/StreamHighlights';
import CommunitySpotlight from '../components/CommunitySpotlight';
import StreamCalendar from '../components/StreamCalendar';
import ZyztmLiveMap from '../components/ZyztmLiveMap';
import { Toast, useToastController } from '../components/Toast';

// Lazy-load heavy components to improve initial bundle size
const ParticleField = lazy(() => import('../components/ParticleField'));
const LaptopMockup = lazy(() => import('../components/LaptopMockup'));
const NeuralSynthesizer = lazy(() => import('../components/NeuralSynthesizer'));
const DeepIChat = lazy(() => import('../components/DeepIChat'));
const MediaGallery = lazy(() => import('../components/MediaGallery'));

export default function MainPage() {
  const { toasts, remove } = useToastController();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark relative">
      <Intro />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <div className="relative z-10">
        <LiveBar />
        <main className="pt-10">
          <HeroSection />
          <AboutZyztm />
          <KickEmbed />
          <Suspense fallback={null}>
            <LaptopMockup />
          </Suspense>
          <CreatorCode />
          <SocialHub />
          <ZyztmLiveMap />
          <StreamHighlights />
          <ProductGrid />
          <CommunitySpotlight />
          <NewsSection />
          <StreamCalendar />
          <Suspense fallback={null}>
            <MediaGallery />
          </Suspense>
          <Suspense fallback={null}>
            <NeuralSynthesizer />
          </Suspense>
          <Suspense fallback={null}>
            <DeepIChat />
          </Suspense>
          <GamerVoting />
        </main>
        <Footer />
      </div>
      <Toast toasts={toasts} onRemove={remove} />
    </div>
  );
}
