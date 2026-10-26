import AboutSection from '../components/home/AboutSection';
import CallToAction from '../components/home/CallToAction';
import CertificationStrip from '../components/home/CertificationStrip';
import ClientsCarousel from '../components/home/ClientsCarousel';
import HeroSection from '../components/home/HeroSection';
import ParallaxBanner from '../components/home/ParallaxBanner';
import PortfolioGrid from '../components/home/PortfolioGrid';
import ServicesSection from '../components/home/ServicesSection';
import StatsBand from '../components/home/StatsBand';
import Testimonials from '../components/home/Testimonials';
import useDocumentTitle from '../hooks/useDocumentTitle';
import '../styles/home.css';

export default function HomePage() {
  useDocumentTitle(null);

  return (
    <>
      <HeroSection />
      <StatsBand />
      <CertificationStrip />
      <AboutSection />
      <PortfolioGrid />
      <ParallaxBanner />
      <ServicesSection />
      <Testimonials />
      <ClientsCarousel />
      <CallToAction />
    </>
  );
}
