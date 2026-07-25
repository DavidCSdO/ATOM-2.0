"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from '@/components/layout/Navbar';
import FooterSection from '@/components/layout/FooterSection';
import HeroSection from '@/components/sections/HeroSection';
import PlanetsSection from '@/components/sections/PlanetsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FeaturedProjectSection from '@/components/sections/FeaturedProjectSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import BentoSection from '@/components/sections/BentoSection';
import ProjectArchitectSection from '@/components/sections/ProjectArchitectSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import RoiCalculatorSection from '@/components/sections/RoiCalculatorSection';
import PricingSection from '@/components/sections/PricingSection';
import BookingModal from '@/components/modals/BookingModal';
import LatestProjectModal from '@/components/modals/LatestProjectModal';
import SystemStatusWidget from '@/components/layout/SystemStatusWidget';
import LiveActivityToast from '@/components/layout/LiveActivityToast';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';

export default function Page() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const lenisRef = useRef(null);
  const toastDebounceTimerRef = useRef(null);

  const handleToastVisibilityChange = useCallback((visible) => {
    if (visible) {
      if (toastDebounceTimerRef.current) {
        clearTimeout(toastDebounceTimerRef.current);
        toastDebounceTimerRef.current = null;
      }
      setIsToastVisible(true);
    } else {
      // 2 seconds delay before sliding WhatsApp button down to prevent jumping during message rotation
      if (!toastDebounceTimerRef.current) {
        toastDebounceTimerRef.current = setTimeout(() => {
          setIsToastVisible(false);
          toastDebounceTimerRef.current = null;
        }, 2000);
      }
    }
  }, []);

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

    // Check if announcement modal has already been seen in this session
    const hasSeenPopup = sessionStorage.getItem('atom_latest_project_popup_seen');
    if (!hasSeenPopup) {
      const popupTimer = setTimeout(() => {
        setIsAnnouncementOpen(true);
      }, 1200);
      return () => clearTimeout(popupTimer);
    }

    return () => {
      lenis.destroy();
      if (toastDebounceTimerRef.current) clearTimeout(toastDebounceTimerRef.current);
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

  const handleCloseAnnouncement = () => {
    setIsAnnouncementOpen(false);
    sessionStorage.setItem('atom_latest_project_popup_seen', 'true');
  };

  const handleExploreLatestProject = () => {
    handleCloseAnnouncement();
    setTimeout(() => {
      document.getElementById('ultimo-projeto')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      <FeaturedProjectSection id="ultimo-projeto" onBook={() => setIsBookingOpen(true)} />
      <BeforeAfterSection id="antes-depois" />
      <BentoSection id="solucoes" onBook={() => setIsBookingOpen(true)} />
      <ProjectArchitectSection id="arquiteto-projeto" onBook={() => setIsBookingOpen(true)} />
      <TestimonialsSection id="depoimentos" />
      <FAQSection id="faq" />
      <RoiCalculatorSection id="calculadora-roi" onBook={() => setIsBookingOpen(true)} />
      <PricingSection id="planos" onBook={() => setIsBookingOpen(true)} />
      
      <FooterSection id="contato" />

      {/* Floating System Status, WhatsApp Orbit & Live Activity Toast */}
      <SystemStatusWidget />
      <WhatsAppWidget hasToastVisible={isToastVisible} />
      <LiveActivityToast onVisibilityChange={handleToastVisibilityChange} onBook={() => setIsBookingOpen(true)} />
      
      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
      
      {isAnnouncementOpen && (
        <LatestProjectModal
          onClose={handleCloseAnnouncement}
          onExplore={handleExploreLatestProject}
        />
      )}
    </div>
  );
}
