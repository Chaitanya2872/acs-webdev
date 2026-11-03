import AboutSection from '../components/home/AboutSection';
import ClientsCarousel from '../components/home/ClientsCarousel';
import HeroSection from '../components/home/HeroSection';
import PortfolioGrid from '../components/home/PortfolioGrid';
import ServicesSection from '../components/home/ServicesSection';
import Testimonials from '../components/home/Testimonials';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useSectionMotion from '../hooks/useSectionMotion';
import '../styles/home.css';

export default function HomePage() {
  useDocumentTitle(null);
  const motionRef = useSectionMotion();

  return (
    <div className="lp lp-motion" ref={motionRef}>
      <HeroSection />
      <PortfolioGrid />
      <AboutSection />
      <ServicesSection />
      <Testimonials />
      <ClientsCarousel />
    </div>
  );
}
