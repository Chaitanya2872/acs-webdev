import AboutSection from '../components/home/AboutSection';
import CallToAction from '../components/home/CallToAction';
import ClientsCarousel from '../components/home/ClientsCarousel';
import HeroSection from '../components/home/HeroSection';
import PortfolioGrid from '../components/home/PortfolioGrid';
import ServicesSection from '../components/home/ServicesSection';
import Testimonials from '../components/home/Testimonials';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useStackedSections from '../hooks/useStackedSections';
import '../styles/home.css';

export default function HomePage() {
  useDocumentTitle(null);
  const stackRef = useStackedSections();

  return (
    <div className="lp lp-stack" ref={stackRef}>
      <HeroSection />
      <PortfolioGrid />
      <AboutSection />
      <ServicesSection />
      <Testimonials />
      <ClientsCarousel />
      <CallToAction />
    </div>
  );
}
