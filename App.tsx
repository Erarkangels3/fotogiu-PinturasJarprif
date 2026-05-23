import React, { useState, useEffect, useRef } from 'react';
import ScrollPaintEffect from './components/ScrollPaintEffect';
import { ServiciosPage, type ServicioCategory } from './components/ServiciosPage';
import { MetodoPage } from './components/MetodoPage';
import { ProyectosPage } from './components/ProyectosPage';
import { GoogleGenAI } from "@google/genai";

// CAMBIAR A 'false' PARA ACTIVAR LA WEB
const isDeactivated = false;

const MaintenanceView = () => (
  <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
    {/* Decoración de fondo */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900 blur-[150px] rounded-full"></div>
    </div>

    <div className="relative z-10 glass p-10 md:p-20 rounded-[3rem] border border-white/10 shadow-2xl max-w-2xl">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl mb-8 mx-auto shadow-xl">PJ</div>
      <h1 className="text-4xl md:text-6xl font-display italic text-white mb-6 tracking-tighter">
        Estamos preparando <br /> 
        <span className="not-italic text-blue-500">algo increíble.</span>
      </h1>
      <p className="text-stone-400 text-lg md:text-xl font-light mb-12 leading-relaxed">
        La nueva web de <strong className="text-white">Pinturas Japri</strong> está en proceso de secado. Muy pronto podrás ver todos nuestros trabajos y solicitar presupuestos online.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="https://wa.me/34610833422?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20de%20pintura%20sin%20compromiso%20para%20mi%20proyecto.%20%C2%BFC%C3%B3mo%20podemos%20coordinar%20una%20visita%3F%20%C2%A1Muchas%20gracias%21" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2">
          WhatsApp Presupuesto
        </a>
        <a href="tel:610833422" className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
          Llamar ahora
        </a>
      </div>
    </div>
    
    <div className="mt-12 text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em]">
      © 2025 Pinturas Japri | Valencia
    </div>
  </div>
);

const StatItem = ({ num, title }: { num: string; title: string }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(num.replace(/\D/g, ''));

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center group p-8 md:p-10 glass rounded-[2.5rem] md:rounded-[3rem] hover:scale-105 transition-all duration-700 border border-white/20 shadow-xl">
      <div className="text-5xl md:text-8xl font-display italic mb-4 bg-gradient-to-br from-blue-600 to-indigo-800 bg-clip-text text-transparent">
        {num.includes('+') ? `${count}+` : num.includes('%') ? `${count}%` : count}
      </div>
      <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">{title}</div>
    </div>
  );
};

interface ScrollActiveBenefitProps {
  t: string;
  d: string;
  i: string;
}

const ScrollActiveBenefit: React.FC<ScrollActiveBenefitProps> = ({ t, d, i }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`p-8 md:p-10 border transition-all duration-700 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex flex-col items-center text-center md:items-start md:text-left ${
        isActive 
          ? 'bg-blue-600 border-blue-600 shadow-blue-200/50 shadow-2xl scale-[1.02]' 
          : 'bg-white border-stone-100 hover:bg-stone-50'
      }`}
    >
      <div className={`w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 rounded-2xl flex items-center justify-center transition-all duration-500 ${
        isActive 
          ? 'bg-white text-blue-600' 
          : 'bg-blue-50 text-blue-600'
      }`}>
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={i}/>
        </svg>
      </div>
      <h4 className={`text-xl md:text-2xl font-display italic mb-3 md:mb-4 transition-colors duration-500 ${
        isActive ? 'text-white' : 'text-slate-900'
      }`}>{t}</h4>
      <p className={`text-xs md:text-sm font-light leading-relaxed transition-colors duration-500 ${
        isActive ? 'text-blue-50' : 'text-slate-500'
      }`}>{d}</p>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-100 last:border-0 overflow-hidden text-slate-900">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left group transition-all"
      >
        <span className="text-lg md:text-2xl font-display group-hover:text-blue-600 transition-colors pr-8">{question}</span>
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-stone-100 transition-all ${isOpen ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'text-blue-600'}`}>
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 font-light leading-relaxed max-w-3xl text-base md:text-lg">{answer}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'servicios' | 'metodo' | 'proyectos'>('home');
  const [serviciosCategory, setServiciosCategory] = useState<ServicioCategory>('residencial');
  const [pisoImage, setPisoImage] = useState("/home/pintura-de-pisos.jpg");
  const [isGenerating, setIsGenerating] = useState(false);

  // States for contact form
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactProject, setContactProject] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (mediaQuery.matches) setMobileMenuOpen(false);
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactProject.trim()) {
      alert("Por favor, rellene todos los campos del formulario para enviar el mensaje por WhatsApp.");
      return;
    }
    const messageText = `Hola, mi nombre es ${contactName.trim()}.\nMi teléfono es: ${contactPhone.trim()}.\n\nMe gustaría solicitar un presupuesto para el siguiente proyecto:\n${contactProject.trim()}`;
    const whatsappUrl = `https://wa.me/34610833422?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const img = new Image();
    img.src = pisoImage;
    img.onerror = () => {
      setPisoImage("/home/pintura-de-pisos.jpg");
    };
  }, []);

  const generateNewPisoInspiration = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: 'A professional split-view of a living room renovation. The left side is perfectly painted in a sage green color with a cream sofa. The right side shows a raw wall being prepared for painting, with a step ladder, paint buckets, and plastic floor protection. High-end architectural photography style.' },
          ],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setPisoImage(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // RENDER CONDICIONAL SI ESTÁ DESACTIVADA
  if (isDeactivated) {
    return (
      <>
        <MaintenanceView />
        {/* Dejamos el botón de WhatsApp siempre disponible */}
        <a 
          href="https://wa.me/34610833422?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20de%20pintura%20sin%20compromiso%20para%20mi%20proyecto.%20%C2%BFC%C3%B3mo%20podemos%20coordinar%20una%20visita%3F%20%C2%A1Muchas%20gracias%21" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[70] bg-white text-[#25D366] p-4 md:p-5 rounded-full shadow-2xl border border-stone-100 hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </>
    );
  }

  const handleNavigateView = (
    view: 'home' | 'servicios' | 'metodo' | 'proyectos',
    category?: ServicioCategory
  ) => {
    if (category) setServiciosCategory(category);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToServicios = (category: ServicioCategory) => {
    setServiciosCategory(category);
    setCurrentView('servicios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bentoCardClass = 'cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2';

  const handleScrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactAction = () => {
    if (currentView === 'home') {
      handleScrollToSection('contact');
    } else if (currentView === 'servicios') {
      const el = document.getElementById('presupuestador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-900 bg-stone-50 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-3 sm:px-4 md:px-6 py-3 md:py-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center gap-3 glass px-4 sm:px-5 md:px-10 py-3 sm:py-3 md:py-5 rounded-full shadow-lg">
          <div
            className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 group cursor-pointer flex-shrink-0 min-w-0"
            onClick={() => {
              handleNavigateView('home');
              closeMobileMenu();
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm transition-transform group-hover:rotate-12 shadow-md flex-shrink-0">PJ</div>
            <div className="flex flex-col min-w-0 lg:flex">
              <span className="text-[17px] sm:text-xl md:text-xl font-bold tracking-tighter uppercase font-display leading-none whitespace-nowrap">Pinturas<span className="text-blue-600">Japri</span></span>
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-slate-400 font-bold">Valencia</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-xs lg:text-sm font-bold tracking-wider uppercase text-slate-500">
            <button 
              onClick={() => handleNavigateView('home')} 
              className={`hover:text-blue-600 transition-colors ${currentView === 'home' ? 'text-blue-600' : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavigateView('servicios')} 
              className={`hover:text-blue-600 transition-colors ${currentView === 'servicios' ? 'text-blue-600' : ''}`}
            >
              Servicios
            </button>
            <button 
              onClick={() => handleNavigateView('proyectos')} 
              className={`hover:text-blue-600 transition-colors ${currentView === 'proyectos' ? 'text-blue-600' : ''}`}
            >
              Proyectos
            </button>
            <button 
              onClick={() => handleNavigateView('metodo')} 
              className={`hover:text-blue-600 transition-colors ${currentView === 'metodo' ? 'text-blue-600' : ''}`}
            >
              Método
            </button>
            <button 
              onClick={() => handleScrollToSection('about')} 
              className="hover:text-blue-600 transition-colors"
            >
              Nosotros
            </button>
            <button 
              onClick={handleContactAction}
              className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-md"
            >
              Contacto
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-800 shadow-sm hover:bg-stone-50 transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          </div>

          {mobileMenuOpen && (
            <>
              <button
                type="button"
                className="lg:hidden fixed inset-0 z-[55] bg-black/40"
                aria-label="Cerrar menú"
                onClick={closeMobileMenu}
              />
              <div className="lg:hidden absolute left-0 right-0 top-full z-[61] mt-2 px-1">
                <div className="glass rounded-3xl border border-stone-200/80 shadow-2xl p-3 flex flex-col gap-2">
                  {[
                    { label: 'Inicio', action: () => handleNavigateView('home'), active: currentView === 'home' },
                    { label: 'Servicios', action: () => handleNavigateView('servicios'), active: currentView === 'servicios' },
                    { label: 'Proyectos', action: () => handleNavigateView('proyectos'), active: currentView === 'proyectos' },
                    { label: 'Contacto', action: handleContactAction, active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        item.action();
                        closeMobileMenu();
                      }}
                      className={`w-full text-left rounded-2xl px-5 py-4 text-base font-bold uppercase tracking-wide transition-colors ${
                        item.label === 'Contacto'
                          ? 'bg-black text-white hover:bg-blue-600'
                          : item.active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Conditionally Render Content based on currentView */}
      {currentView === 'home' && (
        <>
          <ScrollPaintEffect />

          {/* Core Core Values Benefits */}
          <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { t: 'Profesionalidad', d: 'Conocimiento experto en materiales técnicos y acabados premium.', i: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { t: 'Limpieza Total', d: 'Protección absoluta de mobiliario y limpieza profunda final.', i: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                { t: 'Puntualidad', d: 'Compromiso riguroso con los plazos de entrega acordados.', i: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { t: 'Garantía', d: 'Respaldo por escrito en cada uno de nuestros proyectos.', i: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
              ].map((v, i) => (
                <ScrollActiveBenefit key={i} t={v.t} d={v.d} i={v.i} />
              ))}
            </div>
          </section>

          {/* Bento Grid de Especialidades de Servicios */}
          <section id="servicios" className="py-12 md:py-20 px-6 max-w-[95rem] mx-auto">
            <div className="mb-24 md:mb-32 text-center">
              <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-[10px] md:text-[12px] mb-6 block">Especialidades</span>
              <h2 className="text-6xl md:text-[14rem] font-display leading-[0.85] italic text-slate-900 tracking-tighter">
                Soluciones <br /> 
                <span className="not-italic text-blue-600">Integrales.</span>
              </h2>
              <button 
                onClick={() => handleNavigateView('servicios')}
                className="mt-12 inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-[9px] hover:bg-black transition-all shadow-xl shadow-blue-600/10"
              >
                <span>Ver Todos los Servicios Detallados</span>
                <span className="font-mono">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto">
              {/* 1. Pintura de Pisos - IMAGEN PROPORCIONADA POR USUARIO */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('residencial')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('residencial')}
                className={`md:col-span-8 bg-stone-900 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative group h-[450px] md:h-[650px] bento-card shadow-xl ${bentoCardClass}`}
              >
                <img 
                  src={pisoImage} 
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${isGenerating ? 'blur-md' : ''}`} 
                  alt="Piso en proceso de pintura profesional" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-6 md:top-8 right-6 md:right-8 z-20">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); generateNewPisoInspiration(); }} 
                    disabled={isGenerating} 
                    className="glass px-4 md:px-6 py-2 md:py-3 rounded-full text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? "Mezclando..." : "Inspiración IA"}
                  </button>
                </div>

                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:left-12 text-white">
                  <span className="bg-blue-600 text-[8px] md:text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-3 md:mb-4 inline-block">Residencial Premium</span>
                  <h3 className="text-3xl md:text-5xl font-display italic mb-3 md:mb-4">Pintura de Pisos</h3>
                  <p className="text-white/80 font-light max-w-lg text-base md:text-xl">Transformación radical con limpieza absoluta. Observe la precisión en cada corte y la protección total de su hogar.</p>
                </div>
              </div>

              {/* 2. Chalets - IMAGEN DE CHALET */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('exterior')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('exterior')}
                className={`md:col-span-4 bg-white border border-stone-200 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between group bento-card shadow-sm h-full md:row-span-2 ${bentoCardClass}`}
              >
                 <div className="mb-6">
                   <div className="text-blue-600 mb-6 md:mb-10"><svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></div>
                   <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tighter">Pintura de <br />Chalets</h3>
                   <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">Protección climática y estética para exteriores de gran formato con materiales de alta resistencia Japri.</p>
                 </div>
                 <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800" referrerPolicy="no-referrer" className="w-full h-48 md:h-80 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-lg grayscale group-hover:grayscale-0 transition-all" alt="Pintura de chalets de lujo" />
              </div>

              {/* 3. Casas - IMAGEN DE FACHADA DE CASA */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('exterior')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('exterior')}
                className={`md:col-span-8 bg-stone-100 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative group h-[450px] md:h-[600px] bento-card shadow-xl ${bentoCardClass}`}
              >
                 <img 
                   src="/home/pintura-de-casas.jpg" 
                   className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                   alt="Fachada de casa tradicional" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                 <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:left-12 text-white">
                    <h3 className="text-3xl md:text-5xl font-display italic mb-3 md:mb-4">Pintura de Casas</h3>
                    <p className="text-white/80 font-light text-base md:text-xl max-w-xl">
                      Recuperamos el valor de su hogar con tratamientos específicos para la conservación y embellecimiento de fachadas tradicionales.
                    </p>
                 </div>
              </div>

              {/* 4. Quitar Gotelé */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('residencial')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('residencial')}
                className={`md:col-span-4 bg-black rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative group h-[300px] md:h-[400px] bento-card shadow-xl ${bentoCardClass}`}
              >
                 <img 
                   src="/home/quitar-gotele.jpg" 
                   className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110" 
                   alt="Alisado maestro" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"></div>
                 <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center text-white z-10">
                   <span className="text-blue-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block">Alisado Manual</span>
                   <h4 className="text-2xl md:text-4xl font-display italic mb-3 md:mb-4">Quitar Gotelé</h4>
                   <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">Paredes como lienzos. Eliminamos texturas antiguas para dar paso a la modernidad absoluta.</p>
                 </div>
              </div>

              {/* 5. Decorativa */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('tecnico')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('tecnico')}
                className={`md:col-span-8 bg-stone-950 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative group h-[350px] md:h-[500px] bento-card shadow-2xl ${bentoCardClass}`}
              >
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-1000 group-hover:scale-110" alt="Decorativa" />
                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:left-12 text-white">
                  <h3 className="text-3xl md:text-4xl font-display italic mb-4 md:mb-6">Pintura Decorativa</h3>
                  <p className="text-white/70 font-light max-w-lg text-base md:text-lg">Acabados artísticos y combinaciones cromáticas de tendencia que definen el carácter de sus espacios más exclusivos.</p>
                </div>
              </div>

              {/* 6. Locales */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => handleNavigateToServicios('comercial')}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigateToServicios('comercial')}
                className={`md:col-span-4 bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative group h-[350px] md:h-full bento-card shadow-xl ${bentoCardClass}`}
              >
                 <img 
                   src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
                   referrerPolicy="no-referrer"
                   className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-1000" 
                   alt="Renovación comercial" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-8 left-8 text-white">
                    <svg className="w-10 h-10 md:w-12 md:h-12 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                    <h4 className="text-xl md:text-3xl font-display italic">Locales Comerciales</h4>
                 </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="about" className="py-24 md:py-40 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <StatItem num="15" title="Años en Valencia" />
              <StatItem num="500+" title="Hogares Renovados" />
              <StatItem num="100%" title="Clientes Satisfechos" />
            </div>
          </section>

          {/* Breve sección de Método redirigiendo a la nueva página */}
          <section className="py-20 bg-stone-900 text-white px-6">
            <div className="max-w-5xl mx-auto text-center">
              <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Garantía de Maestría</span>
              <h2 className="text-3xl md:text-5xl font-display italic mb-6">El Método Japri: Elevamos su Expectativa</h2>
              <p className="text-stone-400 font-light max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
                Nuestros pintores profesionales siguen una cuidada metodología de 5 fases estructurada para asegurar preparación microscópica, protección 360 y acabados perfectos sin motas ni rayas.
              </p>
              <button 
                onClick={() => handleNavigateView('metodo')}
                className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-md"
              >
                Conocer Nuestra Metodología Paso a Paso
              </button>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-24 md:py-40 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 md:mb-32">
                 <h2 className="text-4xl md:text-7xl font-display italic mb-6">Dudas <span className="not-italic text-blue-600">Comunes</span></h2>
              </div>
              <div className="space-y-2 md:space-y-4">
                <FAQItem question="¿Cuánto tardan en pintar un piso?" answer="Un piso estándar de 90m² suele completarse en 3-4 días con acabados de alta calidad y limpieza total." />
                <FAQItem question="¿Incluyen el material en el presupuesto?" answer="Sí, trabajamos con marcas líderes (Titan, Valentine, Jotun Majestic, etc.) y todo el material necesario de primera línea está incluido para garantizar el mejor resultado." />
                <FAQItem question="¿Tienen seguro de responsabilidad civil?" answer="Por supuesto. Contamos con todas las coberturas reglamentarias y seguros necesarios para su total tranquilidad durante la obra." />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 md:py-40 px-6 bg-stone-100">
            <div className="max-w-7xl mx-auto bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 shadow-2xl border border-stone-100 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-8xl font-display leading-[1.1] mb-6 md:mb-10 text-blue-600">Contacte con <br />Nosotros.</h2>
                <p className="text-slate-500 text-lg md:text-xl font-light mb-10 md:mb-16 italic">Presupuestos gratuitos y sin compromiso en toda la Comunidad Valenciana.</p>
                <div className="space-y-6 md:space-y-10">
                   <div className="flex items-center space-x-6 md:space-x-8 group">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div>
                      <a href="tel:610833422" className="text-xl md:text-2xl font-bold hover:text-blue-600 transition-colors">610 83 34 22</a>
                   </div>
                   <div className="flex items-center space-x-6 md:space-x-8 group">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </div>
                      <a href="https://wa.me/34610833422?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20de%20pintura%20sin%20compromiso%20para%20mi%20proyecto.%20%C2%BFC%C3%B3mo%20podemos%20coordinar%20una%20visita%3F%20%C2%A1Muchas%20gracias%21" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold text-green-600 hover:underline transition-colors">Solicitar Presupuesto</a>
                   </div>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6 md:space-y-8 glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-stone-100 shadow-xl">
                <input 
                  type="text" 
                  placeholder="Su nombre" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 bg-stone-50 border-none rounded-2xl outline-none" 
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Número de teléfono" 
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 bg-stone-50 border-none rounded-2xl outline-none" 
                  required
                />
                <textarea 
                  rows={4} 
                  placeholder="Cuéntenos sobre su proyecto..." 
                  value={contactProject}
                  onChange={(e) => setContactProject(e.target.value)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 bg-stone-50 border-none rounded-2xl outline-none resize-none"
                  required
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-6 md:py-8 bg-black text-white font-bold rounded-2xl hover:bg-blue-600 transition-all text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#25D366] fill-currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </section>

          <footer className="py-12 md:py-20 px-6 border-t border-stone-100 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
               <div>© 2025 PINTURAS JAPRI | VALENCIA</div>
               <div className="mt-6 md:mt-0 flex gap-6 md:gap-8">
                 <button onClick={() => handleNavigateView('servicios')} className="hover:text-black">Servicios</button>
                 <button onClick={() => handleNavigateView('proyectos')} className="hover:text-black">Proyectos</button>
                 <button onClick={() => handleNavigateView('metodo')} className="hover:text-black">Método</button>
                 <button onClick={() => handleScrollToSection('about')} className="hover:text-black">Nosotros</button>
                 <button onClick={handleContactAction} className="hover:text-black">Contacto</button>
               </div>
            </div>
          </footer>
        </>
      )}

      {currentView === 'servicios' && (
        <ServiciosPage 
          onBackToHome={() => handleNavigateView('home')} 
          onNavigateToContact={handleContactAction}
          initialCategory={serviciosCategory}
        />
      )}

      {currentView === 'proyectos' && (
        <ProyectosPage 
          onBackToHome={() => handleNavigateView('home')} 
          onNavigateToContact={handleContactAction}
        />
      )}

      {currentView === 'metodo' && (
        <MetodoPage 
          onBackToHome={() => handleNavigateView('home')} 
          onNavigateToContact={handleContactAction}
        />
      )}

      {/* Persistent General Footer for Sub-pages */}
      {currentView !== 'home' && (
        <footer className="py-12 md:py-16 px-6 border-t border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
             <div>© 2025 PINTURAS JAPRI | VALENCIA | TEL: 610 83 34 22</div>
             <div className="mt-6 md:mt-0 flex gap-6 md:gap-8">
               <button onClick={() => handleNavigateView('home')} className="hover:text-blue-600 transition-colors">Inicio</button>
               <button onClick={() => handleNavigateView('servicios')} className="hover:text-blue-600 transition-colors">Servicios</button>
               <button onClick={() => handleNavigateView('proyectos')} className="hover:text-blue-600 transition-colors">Proyectos</button>
               <button onClick={() => handleNavigateView('metodo')} className="hover:text-blue-600 transition-colors">Método Japri</button>
               <button onClick={handleContactAction} className="hover:text-blue-600 transition-colors">Pedir Presupuesto</button>
             </div>
          </div>
        </footer>
      )}

      {/* Floating Buttons: WhatsApp always available */}
      <a 
        href="https://wa.me/34610833422?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20de%20pintura%20sin%20compromiso%20para%20mi%20proyecto.%20%C2%BFC%C3%B3mo%20podemos%20coordinar%20una%20visita%3F%20%C2%A1Muchas%20gracias%21" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[70] bg-white text-[#25D366] p-4 md:p-5 rounded-full shadow-2xl border border-stone-100 hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </div>
  );
};

export default App;
