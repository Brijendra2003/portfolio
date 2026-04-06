import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import LatestProjects from '../components/home/LatestProjects';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';
import TechStack from '../components/home/TechStack';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <LatestProjects />
      <TechStack />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
