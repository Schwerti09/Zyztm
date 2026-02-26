import { lazy, Suspense, useEffect } from 'react';
import LiveBar from '../components/LiveBar';
import HeroSection from '../components/HeroSection';
import KickEmbed from '../components/KickEmbed';
import CreatorCode from '../components/CreatorCode';
import SocialHub from '../components/SocialHub';
import ProductGrid from '../components/ProductGrid';
import NeuralSynthesizer from '../components/NeuralSynthesizer';
import ZyztmBro from '../components/ZyztmBro';
import NewsSection from '../components/NewsSection';
import MediaGallery from '../components/MediaGallery';
import GamerVoting from '../components/GamerVoting';
import Footer from '../components/Footer';
import ParticleField from '../components/ParticleField';
import ThumbnailSnake from '../components/ThumbnailSnake';
import FortniteDanceCanvas from '../components/FortniteDanceCanvas';
import Intro from '../components/Intro';
import LaptopMockup from '../components/LaptopMockup';
import { Toast, useToastController } from '../components/Toast';
import AboutZyztm from '../components/AboutZyztm';
import StreamHighlights from '../components/StreamHighlights';
import CommunitySpotlight from '../components/CommunitySpotlight';
import StreamCalendar from '../components/StreamCalendar';
import ZyztmLiveMap from '../components/ZyztmLiveMap';
import HotRightNow from '../components/HotRightNow';
import FortniteNewsSection from '../components/FortniteNewsSection';
import UpcomingEvents from '../components/UpcomingEvents';
import BattlePassProgress from '../components/BattlePassProgress';
import FortniteItemShop from '../components/FortniteItemShop';
import FortniteArcade from '../components/FortniteArcade';
import LatestNews from '../components/LatestNews';
import RundgangTour from '../components/RundgangTour';

import SoundboardDemo from '../components/SoundboardDemo';

const FanCounter = lazy(() => import('../components/FanCounter'));
const ClutchReel = lazy(() => import('../components/ClutchReel'));
const GlobalEmpire = lazy(() => import('../components/GlobalEmpire'));

function SectionLoader() {
  return <div className="py-20 flex justify-center"><div className="font-cyber text-neon-pink/30 text-xs tracking-widest animate-pulse">LOADING…</div></div>;
}

export default function MainPage() {
  const { toasts, remove } = useToastController();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark relative">
      <Intro />
      <ParticleField />
      <ThumbnailSnake />
      <FortniteDanceCanvas />
      <div className="relative z-10">
        <LiveBar />
        <main className="pt-10">
          <Suspense fallback={<SectionLoader />}><FanCounter /></Suspense>
          <HeroSection />
          <AboutZyztm />
          <Suspense fallback={<SectionLoader />}><GlobalEmpire /></Suspense>
          <KickEmbed />
          <LaptopMockup />
          <CreatorCode />
          <SocialHub />
          <ZyztmLiveMap />
          <StreamHighlights />
          <Suspense fallback={<SectionLoader />}><ClutchReel /></Suspense>
          <ProductGrid />
          <SoundboardDemo />
          <CommunitySpotlight />
          <NewsSection />
          <HotRightNow />
          <FortniteNewsSection />
          <LatestNews />
          <UpcomingEvents />
          <BattlePassProgress />
          <FortniteItemShop />
          <FortniteArcade />
          <StreamCalendar />
          <MediaGallery />
          <NeuralSynthesizer />
          <ZyztmBro />
          <GamerVoting />
        </main>
        <Footer />
      </div>
      <Toast toasts={toasts} onRemove={remove} />
      <RundgangTour />
    </div>
  );
}

