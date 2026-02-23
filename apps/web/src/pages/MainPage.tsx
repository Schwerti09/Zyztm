import LiveBar from '../components/LiveBar';
import HeroSection from '../components/HeroSection';
import CreatorCode from '../components/CreatorCode';
import SocialHub from '../components/SocialHub';
import ProductGrid from '../components/ProductGrid';
import NeuralSynthesizer from '../components/NeuralSynthesizer';
import DeepIChat from '../components/DeepIChat';
import NewsSection from '../components/NewsSection';
import ImageGallery from '../components/ImageGallery';
import Footer from '../components/Footer';
import ParticleField from '../components/ParticleField';
import Intro from '../components/Intro';
import LaptopMockup from '../components/LaptopMockup';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-bg-dark relative">
      <Intro />
      <ParticleField />
      <div className="relative z-10">
        <LiveBar />
        <main className="pt-10">
          <HeroSection />
          <LaptopMockup />
          <CreatorCode />
          <SocialHub />
          <ProductGrid />
          <NeuralSynthesizer />
          <DeepIChat />
          <NewsSection />
          <ImageGallery />
        </main>
        <Footer />
      </div>
    </div>
  );
}
