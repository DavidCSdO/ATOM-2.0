"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './ProjectsSection.module.css';

import ConceptModal from '../modals/ConceptModal';

const techList = [
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Jupiter', icon: '/Planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png', isSpace: true },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Mars', icon: '/Planets/pngtree-mars-planet-image-on-white-background-png-image_13888526 1.png', isSpace: true },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Saturn', icon: '/Planets/saturn-planet-on-isolated-transparent-background-png 1.png', isSpace: true },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Neptune', icon: '/Planets/30_neptune 1.png', isSpace: true },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
];

const initialProjectsData = [
  {
    name: 'Chá',
    category: 'ALTA PERFORMANCE',
    description: 'Páginas web otimizadas focadas em conversão, com temática espacial e animações de ponta.',
    accent: '#3b9cff',
    accentGlow: 'rgba(59, 156, 255, 0.4)',
    tags: ['Vue', 'Three.js', 'Conversão'],
    screens: [
      { src: '/Carrocel/ATOM.png' },
      { src: '/Carrocel/ATOM 2.png' },
      { src: '/Carrocel/ATOM 3.png' }
    ],
    activeScreen: 0,
    link: 'https://cha-front.vercel.app/'
  },
  {
    name: 'Portfólio Pessoal',
    category: 'AUTOMAÇÃO & IA',
    description: 'Sistemas inteligentes que fazem o negócio rodar no piloto automático, com design imersivo.',
    accent: '#00e5ff',
    accentGlow: 'rgba(0, 229, 255, 0.4)',
    tags: ['UI/UX', 'Automação', 'Identidade'],
    screens: [
      { src: '/Carrocel/PORT.png' },
      { src: '/Carrocel/PORT 2.png' },
      { src: '/Carrocel/PORT 3.png' }
    ],
    activeScreen: 0,
    link: 'https://portifolio-ruddy-phi-47.vercel.app/'
  },
  {
    name: 'Atlas Fin',
    category: 'IDENTIDADE VISUAL',
    description: 'Design de alto impacto e posicionamento estético de marca no setor financeiro.',
    accent: '#b478ff',
    accentGlow: 'rgba(180, 120, 255, 0.4)',
    tags: ['Fintech', 'Branding', 'Premium'],
    screens: [
      { src: '/Carrocel/ATLAS.png' },
      { src: '/Carrocel/ATLAS 2.png' },
      { src: '/Carrocel/ATLAS 3.png' }
    ],
    activeScreen: 0,
    link: 'https://atlas-lyart-six.vercel.app/'
  },
  {
    name: 'Kallah Bride',
    category: 'E-COMMERCE',
    description: 'Estratégias de SEO e design focado em converter noivas buscando excelência e modernidade.',
    accent: '#ff8fb3',
    accentGlow: 'rgba(255, 143, 179, 0.4)',
    tags: ['E-commerce', 'Moda', 'SEO'],
    screens: [
      { src: '/Carrocel/Kallah.png' },
      { src: '/Carrocel/Kallah 2.png' },
      { src: '/Carrocel/Kallah 3.png' }
    ],
    activeScreen: 0,
    link: 'https://khalla-bridehouse.vercel.app/'
  },
  {
    name: 'Nexus System',
    category: 'SISTEMAS WEB',
    description: 'Plataforma de gestão inteligente e dashboards dinâmicos para controle de dados em tempo real.',
    accent: '#f39c12',
    accentGlow: 'rgba(243, 156, 18, 0.4)',
    tags: ['Dashboards', 'SaaS', 'Vue.js'],
    screens: [
      { src: '/Carrocel/PORT 2.png' },
      { src: '/Carrocel/ATOM.png' },
      { src: '/Carrocel/ATLAS 3.png' }
    ],
    activeScreen: 0,
    isConcept: true
  },
  {
    name: 'Lumina',
    category: 'UI/UX DESIGN',
    description: 'Conceito visual arrojado combinando interações imersivas com usabilidade de alta performance.',
    accent: '#9b59b6',
    accentGlow: 'rgba(155, 89, 182, 0.4)',
    tags: ['Design System', 'Figma', 'UX'],
    screens: [
      { src: '/Carrocel/Kallah 2.png' },
      { src: '/Carrocel/ATLAS.png' },
      { src: '/Carrocel/PORT.png' }
    ],
    activeScreen: 0,
    isConcept: true
  }
];

export default function ProjectsSection({ id }) {
  const [showConceptModal, setShowConceptModal] = useState(null);
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef(null);
  
  const screenIntervalRef = useRef(null);
  const autoAdvanceRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isSwipingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);

  const startScreenRotation = useCallback(() => {
    if (screenIntervalRef.current) clearInterval(screenIntervalRef.current);
    screenIntervalRef.current = setInterval(() => {
      setProjectsData((prev) => {
        const nextData = [...prev];
        const project = nextData[activeIndex];
        if (project && project.screens.length > 1) {
          project.activeScreen = (project.activeScreen + 1) % project.screens.length;
        }
        return nextData;
      });
    }, 3500);
  }, [activeIndex]);

  const stopScreenRotation = () => {
    if (screenIntervalRef.current) clearInterval(screenIntervalRef.current);
  };

  const navigate = useCallback((dir) => {
    setActiveIndex((prev) => {
      let next = prev + dir;
      if (next >= projectsData.length) next = 0;
      if (next < 0) next = projectsData.length - 1;
      
      setProjectsData(data => data.map((p, i) => ({
        ...p,
        activeScreen: i !== next ? 0 : p.activeScreen
      })));
      
      return next;
    });
  }, [projectsData.length]);

  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(() => {
      navigate(1);
    }, 8000);
  }, [navigate]);

  const stopAutoAdvance = () => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
  };

  useEffect(() => {
    startScreenRotation();
    startAutoAdvance();
    return () => {
      stopScreenRotation();
      stopAutoAdvance();
    };
  }, [activeIndex, startScreenRotation, startAutoAdvance]);

  const updateSlideWidth = () => {
    if (!viewportRef.current) return;
    const vw = viewportRef.current.offsetWidth;
    if (vw <= 768) {
      setSlideWidth(vw * 0.85);
    } else if (vw <= 1024) {
      setSlideWidth(400);
    } else {
      setSlideWidth(460);
    }
  };

  useEffect(() => {
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    const onKeydown = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener('keydown', onKeydown);
    
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
      window.removeEventListener('keydown', onKeydown);
    };
  }, [navigate]);

  const goTo = (index) => {
    setActiveIndex(index);
    setProjectsData(data => data.map((p, i) => ({
      ...p,
      activeScreen: i !== index ? 0 : p.activeScreen
    })));
  };

  const setScreen = (projectIndex, screenIndex) => {
    setProjectsData(data => {
      const nextData = [...data];
      nextData[projectIndex].activeScreen = screenIndex;
      return nextData;
    });
    startScreenRotation();
  };

  // Drag logic
  const handleDragStart = (clientX, clientY) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    isDraggingRef.current = true;
    isSwipingRef.current = false;
    if (viewportRef.current) viewportRef.current.style.cursor = 'grabbing';
  };

  const handleDragMove = (clientX, clientY, e) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - startXRef.current;
    const dy = clientY - startYRef.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwipingRef.current = true;
      if (e && e.cancelable) e.preventDefault();
    }
  };

  const handleDragEnd = (clientX) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (viewportRef.current) viewportRef.current.style.cursor = 'grab';
    
    if (!isSwipingRef.current) return;
    const dx = clientX - startXRef.current;
    if (Math.abs(dx) > 50) {
      navigate(dx < 0 ? 1 : -1);
    }
    startXRef.current = 0;
    isSwipingRef.current = false;
  };

  const trackOffset = () => {
    const sw = slideWidth || 400;
    const viewportWidth = viewportRef.current?.offsetWidth || 0;
    const centerOffset = (viewportWidth - sw) / 2;
    return centerOffset - activeIndex * sw;
  };

  return (
    <section className={styles.projectsSection} id={id || 'projetos'}>
      <div className={styles.projectsBg} aria-hidden="true">
        <div className={styles.starsLayer}></div>
        <div className={`${styles.starsLayer} ${styles.starsLayer2}`}></div>
        
        <div className={styles.cosmicElements}>
          <div className={`${styles.floatingPlanet} ${styles.planetJupiter}`}>
            <img src="/Planets/pngtree-jupiter-planet-image-on-white-background-png-image_13888640 1.png" alt="" style={{objectFit:'contain', width: '100%', height: '100%'}} />
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetSaturn}`}>
            <img src="/Planets/saturn-planet-on-isolated-transparent-background-png 1.png" alt="" style={{objectFit:'contain', width: '100%', height: '100%'}} />
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetMars}`}>
            <img src="/Planets/pngtree-mars-planet-image-on-white-background-png-image_13888526 1.png" alt="" style={{objectFit:'contain', width: '100%', height: '100%'}} />
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetNeptune}`}>
            <img src="/Planets/30_neptune 1.png" alt="" style={{objectFit:'contain', width: '100%', height: '100%'}} />
          </div>
          
          <div className={`${styles.shootingStar} ${styles.st1}`}></div>
          <div className={`${styles.shootingStar} ${styles.st2}`}></div>
          <div className={`${styles.shootingStar} ${styles.st3}`}></div>
        </div>
      </div>

      <div className={styles.projectsContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerGlow}></div>
          <span className={styles.sectionTag}>✦ NOSSAS MISSÕES</span>
          <h2 className={styles.sectionTitle}>Projetos</h2>
          <p className={styles.sectionSubtitle}>Exploração digital em sua melhor forma. Conheça nossos cases de sucesso.</p>
        </div>

        <div className={styles.carouselStage}>
          <div 
            className={styles.carouselViewport} 
            ref={viewportRef}
            onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientX, e.clientY, e)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onMouseLeave={(e) => handleDragEnd(e.clientX)}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
            style={{ cursor: 'grab' }}
          >
            <div className={styles.carouselTrack} style={{ transform: `translateX(${trackOffset()}px)` }}>
              {projectsData.map((project, index) => (
                <div
                  key={project.name}
                  className={`${styles.projectCardWrapper} ${
                    activeIndex === index ? styles.isActive :
                    activeIndex === index - 1 ? styles.isPrev :
                    activeIndex === index + 1 ? styles.isNext :
                    Math.abs(activeIndex - index) > 1 ? styles.isFar : ''
                  }`}
                  onClick={() => goTo(index)}
                >
                  <div className={styles.projectCard} style={{ '--accent': project.accent, '--accent-glow': project.accentGlow }}>
                    <div className={styles.cardAura}></div>
                    
                    <div className={styles.cardGlass}>
                      <div className={styles.cardScreens}>
                        <Image
                          src={project.screens[project.activeScreen].src}
                          alt={`${project.name} - tela ${project.activeScreen + 1}`}
                          fill
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 400px, 460px"
                          quality={100}
                          style={{ objectFit: 'cover' }}
                          className={styles.screenImage}
                        />
                        
                        {project.screens.length > 1 && (
                          <div className={styles.screenIndicators}>
                            {project.screens.map((_, si) => (
                              <button
                                key={si}
                                className={`${styles.indicatorDot} ${project.activeScreen === si ? styles.isActive : ''}`}
                                onClick={(e) => { e.stopPropagation(); setScreen(index, si); }}
                                aria-label={`Tela ${si + 1} de ${project.name}`}
                              ></button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.cardContent}>
                        <div className={styles.contentHeader}>
                          <span className={styles.projectCategory} style={{ color: project.accent }}>{project.category}</span>
                          <h3 className={styles.projectName}>{project.name}</h3>
                        </div>
                        
                        <p className={styles.projectDesc}>{project.description}</p>
                        
                        <div className={styles.projectTags}>
                          {project.tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                        
                        {project.link ? (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.exploreBtn} 
                            style={{ '--btn-color': project.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                          >
                            Explorar Missão <span className={styles.arrow}>→</span>
                          </a>
                        ) : (
                          <button 
                            className={styles.exploreBtn} 
                            style={{ '--btn-color': project.accent }}
                            onClick={() => setShowConceptModal(project)}
                          >
                            Explorar Conceito <span className={styles.arrow}>→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carouselControls}>
            <button className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={() => navigate(-1)} aria-label="Projeto anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.navDots}>
              {projectsData.map((project, index) => (
                <button
                  key={`dot-${index}`}
                  className={`${styles.navDot} ${activeIndex === index ? styles.isActive : ''}`}
                  style={{ '--accent': project.accent }}
                  onClick={() => goTo(index)}
                  aria-label={`Ir para ${project.name}`}
                ></button>
              ))}
            </div>
            
            <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => navigate(1)} aria-label="Próximo projeto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.techMarqueeWrapper}>
        <div className={styles.techMarqueeTrack}>
          <div className={styles.techMarqueeContent} aria-hidden="true">
            {techList.map((item, i) => (
              item.isSpace ? (
                <div key={`a-${i}`} className={styles.spaceElement}>
                  <Image src={item.icon} alt={item.name} width={40} height={40} />
                </div>
              ) : (
                <div key={`a-${i}`} className={styles.techBox}>
                  {item.icon && <Image src={item.icon} alt={item.name} width={20} height={20} className={styles.techIcon} />}
                  <span>{item.name}</span>
                </div>
              )
            ))}
          </div>
          <div className={styles.techMarqueeContent} aria-hidden="true">
            {techList.map((item, i) => (
              item.isSpace ? (
                <div key={`b-${i}`} className={styles.spaceElement}>
                  <Image src={item.icon} alt={item.name} width={40} height={40} />
                </div>
              ) : (
                <div key={`b-${i}`} className={styles.techBox}>
                  {item.icon && <Image src={item.icon} alt={item.name} width={20} height={20} className={styles.techIcon} />}
                  <span>{item.name}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <ConceptModal project={showConceptModal} onClose={() => setShowConceptModal(null)} />
    </section>
  );
}
