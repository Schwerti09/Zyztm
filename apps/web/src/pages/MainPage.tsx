import { lazy, Suspense, useEffect, useState } from 'react';
import { Toast, useToastController } from '../components/Toast';

const LiveBar = lazy(() => import('../components/LiveBar'));
const IntroChaosBus = lazy(() => import('../components/IntroChaosBus'));
const HeroSection = lazy(() => import('../components/HeroSection'));
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
const ParticleField = lazy(() => import('../components/ParticleField'));
const ThumbnailSnake = lazy(() => import('../components/ThumbnailSnake'));
const FortniteDanceCanvas = lazy(() => import('../components/FortniteDanceCanvas'));
const Intro = lazy(() => import('../components/Intro'));
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
const GlobalEmpire = lazy(() => import('../components/GlobalEmpire'));
const RundgangTour = lazy(() => import('../components/RundgangTour'));
const MidScrollChaos = lazy(() => import('../components/MidScrollChaos'));
const SoundboardDemo = lazy(() => import('../components/SoundboardDemo'));
const BackgroundMusic = lazy(() => import('../components/BackgroundMusic'));
const FanCounter = lazy(() => import('../components/FanCounter'));
const ClutchReel = lazy(() => import('../components/ClutchReel'));

function SectionLoader() {
  return <div className="py-20 flex justify-center"><div className="font-cyber text-neon-pink/30 text-xs tracking-widest animate-pulse">LOADING…</div></div>;
}

export default function MainPage() {
  const { toasts, remove } = useToastController();

  const [showChaosBus, setShowChaosBus] = useState(
    () => !sessionStorage.getItem('chaos-bus-seen'),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark relative">
      <Suspense fallback={<SectionLoader />}>
        {showChaosBus && (
          <IntroChaosBus
            onFinish={() => {
              sessionStorage.setItem('chaos-bus-seen', '1');
              setShowChaosBus(false);
            }}
          />
        )}
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
            <GlobalEmpire />
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
        <MidScrollChaos />
      </Suspense>
    </div>
  );
}

