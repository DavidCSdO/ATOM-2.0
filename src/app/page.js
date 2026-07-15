"use client";

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from '@/components/layout/Navbar';
import FooterSection from '@/components/layout/FooterSection';
import HeroSection from '@/components/sections/HeroSection';
import PlanetsSection from '@/components/sections/PlanetsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BentoSection from '@/components/sections/BentoSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import PricingSection from '@/components/sections/PricingSection';
import BookingModal from '@/components/modals/BookingModal';

export default function Page() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    lenis.stop();
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  const onHeroReady = () => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.start();
    }
    document.body.style.overflow = '';
  };

  const handleNav = (target) => {
    if (target === 'explore') {
      document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'projects') {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Navbar onBook={() => setIsBookingOpen(true)} />
      
      <HeroSection id="home" onNavigate={handleNav} onReady={onHeroReady} />
      <PlanetsSection />
      <ProjectsSection id="projetos" />
      <BentoSection id="solucoes" onBook={() => setIsBookingOpen(true)} />
      <TestimonialsSection id="depoimentos" />
      <FAQSection id="faq" />
      <PricingSection id="planos" onBook={() => setIsBookingOpen(true)} />
      
      <FooterSection id="contato" />
      
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </div>
  );
}
