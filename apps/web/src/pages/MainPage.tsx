import { useEffect } from 'react';
import LiveBar from '../components/LiveBar';
import HeroSection from '../components/HeroSection';
import KickEmbed from '../components/KickEmbed';
import CreatorCode from '../components/CreatorCode';
import SocialHub from '../components/SocialHub';
import ProductGrid from '../components/ProductGrid';
import NeuralSynthesizer from '../components/NeuralSynthesizer';
import DeepIChat from '../components/DeepIChat';
import NewsSection from '../components/NewsSection';
import MediaGallery from '../components/MediaGallery';
import GamerVoting from '../components/GamerVoting';
import Footer from '../components/Footer';
import ParticleField from '../components/ParticleField';
import Intro from '../components/Intro';
import LaptopMockup from '../components/LaptopMockup';
import { Toast, useToastController } from '../components/Toast';
import AboutZyztm from '../components/AboutZyztm';
import StreamHighlights from '../components/StreamHighlights';
import CommunitySpotlight from '../components/CommunitySpotlight';
import StreamCalendar from '../components/StreamCalendar';

export default function MainPage() {
  const { toasts, remove } = useToastController();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark relative">
      <Intro />
      <ParticleField />
      <div className="relative z-10">
        <LiveBar />
        <main className="pt-10">
          <HeroSection />
          <AboutZyztm />
          <KickEmbed />
          <LaptopMockup />
          <CreatorCode />
          <SocialHub />
          <StreamHighlights />
          <ProductGrid />
          <CommunitySpotlight />
          <NewsSection />
          <StreamCalendar />
          <MediaGallery />
          <NeuralSynthesizer />
          <DeepIChat />
          <GamerVoting />
        </main>
        <Footer />
      </div>
      <Toast toasts={toasts} onRemove={remove} />
    </div>
  );
}
