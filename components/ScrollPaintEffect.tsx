
import React, { useState, useEffect, useRef } from 'react';

const ScrollPaintEffect: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // VELOCIDAD ULTRA-RÁPIDA (1:1): El efecto se completa muy rápido 
      // para acompañar el movimiento natural del dedo o ratón.
      const progress = Math.min(scrollY / 140, 1);
      
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setScrollProgress(progress);
        // Transición suave al estado de "apoyo" al final de la sección
        setIsAtBottom(scrollY > 160);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // offsetPixels en 0 para que la imagen esté totalmente arriba sin margen
  const offsetPixels = 0; 

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-stone-900">
      <style>{`
        @keyframes puddle-fade-in {
          0% { transform: scaleX(0) scaleY(0); opacity: 0; }
          100% { transform: scaleX(1) scaleY(1); opacity: 1; }
        }
        @keyframes simple-drip {
          0% { transform: translateY(0); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(25px); opacity: 0; }
        }
        .puddle-mini {
          animation: puddle-fade-in 0.5s forwards cubic-bezier(0.19, 1, 0.22, 1);
        }
        .drip-effect {
          animation: simple-drip 1.5s infinite ease-in;
        }
      `}</style>

      {/* Capa Antes: Imagen con filtro - Alineada arriba (bg-top) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000")',
          filter: `grayscale(${100 - (scrollProgress * 90)}%) brightness(${0.2 + (scrollProgress * 0.8)})`,
        }}
      />

      {/* Capa Después: Revelado - Alineada arriba (bg-top) */}
      <div 
        className="absolute inset-0 z-10 bg-cover bg-top origin-top pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000")',
          clipPath: `inset(0 0 calc(${100 - (scrollProgress * 100)}% - ${offsetPixels * (1 - scrollProgress)}px) 0)`,
          willChange: 'clip-path'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      {/* Texto Hero */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <div className={`transition-all duration-500 transform ${scrollProgress > 0.8 ? 'opacity-0 -translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          <div className="mb-6 md:mb-8">
            <span 
              className="inline-block px-6 py-2 border border-white/20 text-[10px] md:text-[12px] font-bold tracking-[0.1em] md:tracking-[0.4em] uppercase backdrop-blur-md rounded-full text-white transition-colors duration-500"
              style={{ 
                backgroundColor: `rgba(0, 0, 0, ${0.4 + (scrollProgress * 0.4)})` 
              }}
            >
              Maestros del color & acabados
            </span>
          </div>
          {/* leading-[1.0] md:leading-[1.1] ajustado para dar un poco más de margen entre líneas */}
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display italic text-white mb-2 leading-[1.0] md:leading-[1.1] drop-shadow-2xl">
            La Perfección <br /> 
            <span className="font-bold not-italic bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
              tiene un Color
            </span>
          </h1>
        </div>
      </div>

      {/* CHARCO OVALADO: Pequeño y en la costura inferior */}
      {isAtBottom && (
        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 z-40 flex justify-center pointer-events-none">
          <div className="puddle-mini w-28 md:w-52 h-5 md:h-8 bg-[#050505] rounded-[100%] blur-[0.5px] shadow-[0_0_20px_rgba(0,0,0,0.9)]"></div>
        </div>
      )}

      {/* EL RODILLO: Solo contorno, sincronizado 1:1 con el scroll */}
      <div 
        className="absolute z-50 transition-all duration-150 ease-out pointer-events-none"
        style={{ 
          top: isAtBottom ? '96%' : `calc(${scrollProgress * 100}% + ${offsetPixels}px)`,
          left: '50%',
          transform: `translate3d(-50%, -50%, 0) scale(${isAtBottom ? 0.45 : 1.1})`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
          willChange: 'transform, top'
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Gotas de pintura */}
          {isAtBottom && (
            <div className="absolute top-[60px] flex space-x-6 opacity-40">
              <div className="drip-effect w-1 h-1 bg-black rounded-full" style={{ animationDelay: '0s' }}></div>
              <div className="drip-effect w-0.5 h-0.5 bg-black rounded-full" style={{ animationDelay: '0.5s' }}></div>
            </div>
          )}

          <svg 
            viewBox="0 0 600 480" 
            className="w-[160px] md:w-[400px] h-auto drop-shadow-xl"
          >
            {/* Solo contorno (stroke) sin rellenos ni líneas de brillo internas */}
            <rect 
              x="120" y="40" width="360" height="90" rx="15" 
              stroke="white" strokeWidth="12" fill="none"
            />
            <path d="M105 55C105 50 110 45 120 45V125C110 125 105 120 105 115V55Z" stroke="white" strokeWidth="10" fill="none"/>
            <path d="M495 55C495 50 490 45 480 45V125C490 125 495 120 495 115V55Z" stroke="white" strokeWidth="10" fill="none"/>
            <path 
              d="M495 85H525C535 85 540 90 540 100V200C540 210 535 215 525 215H310C300 215 295 220 295 230V260" 
              stroke="white" strokeWidth="14" strokeLinecap="round" fill="none"
            />
            <rect x="260" y="260" width="80" height="180" rx="40" stroke="white" strokeWidth="12" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Indicador de inicio */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-[1px] h-8 bg-white/20"></div>
          <span className="text-white/20 text-[6px] tracking-[1em] uppercase font-bold">Desliza</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollPaintEffect;
