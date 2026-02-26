import { lazy, Suspense, useEffect } from 'react';
import LiveBar from '../components/LiveBar';
import HeroSection from '../components/HeroSection';
import Intro from '../components/Intro';
import ParticleField from '../components/ParticleField';
import { Toast, useToastController } from '../components/Toast';
import BackgroundMusic from '../components/BackgroundMusic';

const FanCounter = lazy(() => import('../components/FanCounter'));
const ClutchReel = lazy(() => import('../components/ClutchReel'));
const GlobalEmpire = lazy(() => import('../components/GlobalEmpire'));
const ThumbnailSnake = lazy(() => import('../components/ThumbnailSnake'));
const FortniteDanceCanvas = lazy(() => import('../components/FortniteDanceCanvas'));
const KickEmbed = lazy(() => import('../components/KickEmbed'));
const CreatorCode = lazy(() => import('../components/CreatorCode'));
const SocialHub = lazy(() => import('../components/SocialHub'));
const ProductGrid = lazy(() => import('../components/ProductGrid'));
const NeuralSynthesizer = lazy(() => import('../components/NeuralSynthesizer'));
const ZyztmBro = lazy(() => import('../components/ZyztmBro'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const MediaGallery = lazy(() => import('../components/MediaGallery'));
const GamerVoting = lazy(() => import('../components/GamerVoting'));
const Footer = lazy(() => import('../components/Footer'));
const LaptopMockup = lazy(() => import('../components/LaptopMockup'));
const AboutZyztm = lazy(() => import('../components/AboutZyztm'));
const StreamHighlights = lazy(() => import('../components/StreamHighlights'));
const CommunitySpotlight = lazy(() => import('../components/CommunitySpotlight'));
const StreamCalendar = lazy(() => import('../components/StreamCalendar'));
const ZyztmLiveMap = lazy(() => import('../components/ZyztmLiveMap'));
const HotRightNow = lazy(() => import('../components/HotRightNow'));
const FortniteNewsSection = lazy(() => import('../components/FortniteNewsSection'));
const UpcomingEvents = lazy(() => import('../components/UpcomingEvents'));
const BattlePassProgress = lazy(() => import('../components/BattlePassProgress'));
const FortniteItemShop = lazy(() => import('../components/FortniteItemShop'));
const FortniteArcade = lazy(() => import('../components/FortniteArcade'));
const LatestNews = lazy(() => import('../components/LatestNews'));
const RundgangTour = lazy(() => import('../components/RundgangTour'));
const SoundboardDemo = lazy(() => import('../components/SoundboardDemo'));

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
      <BackgroundMusic />
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

