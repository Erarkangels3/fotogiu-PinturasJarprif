import React, { useState, useEffect } from 'react';
import { 
  Home, Paintbrush, Sliders, ShieldAlert, Sparkles, Building, 
  Warehouse, Shield, Droplet, Layers, CheckCircle2, 
  Calculator, ArrowRight, CornerDownRight, Landmark
} from 'lucide-react';

export type ServicioCategory = 'residencial' | 'exterior' | 'comercial' | 'tecnico';

interface ServiciosPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
  initialCategory?: ServicioCategory;
}

export const ServiciosPage: React.FC<ServiciosPageProps> = ({ 
  onBackToHome, 
  onNavigateToContact,
  initialCategory = 'residencial',
}) => {
  const [activeCategory, setActiveCategory] = useState<ServicioCategory>(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);
  
  // Custom calculator state
  const [surfaceSize, setSurfaceSize] = useState<number>(80);
  const [includeGoteleRemoval, setIncludeGoteleRemoval] = useState<boolean>(false);
  const [doorsToPaint, setDoorsToPaint] = useState<number>(0);
  const [paintQuality, setPaintQuality] = useState<'standard' | 'premium' | 'ecological'>( 'premium');

  const calculateEstimate = () => {
    let perSquareMeter = 9; // average painting price on-account per m2
    if (paintQuality === 'premium') perSquareMeter = 12;
    if (paintQuality === 'ecological') perSquareMeter = 14;

    let total = surfaceSize * perSquareMeter;

    if (includeGoteleRemoval) {
      total += surfaceSize * 18; // Gotele removal is around 18/m2
    }

    total += doorsToPaint * 75; // 75 per lacquered/painted door

    const rangeMin = Math.round(total * 0.9);
    const rangeMax = Math.round(total * 1.1);
    return { min: rangeMin, max: rangeMax };
  };

  const estimate = calculateEstimate();

  const servicesData = {
    residencial: {
      title: "Pintura Residencial e Interiores",
      description: "Servicios enfocados en renovar el confort, la luminosidad y el estilo de su hogar. Materiales lavables, sin olores dañinos y con una limpieza impecable.",
      items: [
        {
          title: "Pintura Plástica de Alta Gama",
          desc: "Aplicación de pinturas de alta opacidad y lavabilidad. Acabados mate sedoso, satinados o semimates de máxima duración.",
          highlight: "Marcas certificadas: Jotun, Titan, Valentine",
          icon: <Paintbrush className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Alisado de Paredes (Quitar Gotelé)",
          desc: "Eliminación completa de gotelé y rugosidades. Lijado mecánico con máquina Festool y aspiración simultánea para minimizar el polvo en un 95%.",
          highlight: "Acabado espejo listo para luz raseante",
          icon: <Layers className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Barnizados, Esmaltados y Lacados",
          desc: "Garantizamos un acabado de fábrica sobre carpintería existente. Esmaltado de puertas de paso, marcos, rodapiés y armarios empotrados.",
          highlight: "Rodillo microfibra o pistola airless",
          icon: <Sliders className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Instalación de Papel Pintado Vangard",
          desc: "Colocación experta de papel decorativo, revestimientos textiles o murales vinílicos de gran formato. Alineación milimétrica de patrones.",
          highlight: "Sin juntas visibles ni burbujas",
          icon: <Sparkles className="w-6 h-6 text-blue-600" />
        }
      ]
    },
    exterior: {
      title: "Pintura de Exteriores y Fachadas",
      description: "Protección climática y revalorización estética de fachadas de casas, chalets, terrazas y zonas comunitarias con materiales de alta resistencia.",
      items: [
        {
          title: "Rehabilitación de Fachadas Residenciales",
          desc: "Saneado de revoques fofos, picado de grietas mecánicas y aplicación de revestimiento elástico anticarbonatación hidrófugo.",
          highlight: "Evita fisuras futuras y protege la estructura",
          icon: <Home className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Impermeabilización de Terrazas y Cubiertas",
          desc: "Aplicación de capas cruzadas de poliuretano líquido o clorocaucho reforzado con malla de fibra de vidrio para eliminar filtraciones.",
          highlight: "Estanqueidad 100% garantizada por escrito",
          icon: <Droplet className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Pintura Siloxánica Especial Climática",
          desc: "Revestimiento mineral de altísima transpirabilidad y repelencia al agua. Repele la suciedad y resiste la degradación por rayos UV y salitre.",
          highlight: "Especial para climas costeros e insolación",
          icon: <SunIcon className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Tratamiento de Madera y Metal de Exterior",
          desc: "Varnizados a poro abierto con lasures marinos y esmaltes antioxidantes directos sobre hierro en cancelas, barandillas y pérgolas.",
          highlight: "Protección activa de hasta 5 años sin pelarse",
          icon: <Shield className="w-6 h-6 text-blue-600" />
        }
      ]
    },
    comercial: {
      title: "Pintura Comercial, Industrial y Oficinas",
      description: "Tiempos óptimos y flexibilidad horaria para no interrumpir el flujo de su negocio. Certificaciones de seguridad y acabados corporativos limpios.",
      items: [
        {
          title: "Locales Comerciales y Retail",
          desc: "Pintura rápida y de alta cubrición respetando la identidad cromática corporativa. Trabajamos nocturnos o fines de semana si lo requiere.",
          highlight: "Interrupción cero de su servicio al público",
          icon: <Building className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Pavimentos Industriales y Pintura Epoxi",
          desc: "Revestimientos con resina de epoxi o poliuretano de dos componentes sobre suelos de hormigón. Antipolvo, antideslizante y de alta resistencia al tráfico.",
          highlight: "Ideal para parkings, garajes y talleres",
          icon: <Warehouse className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Pintura Intumescente Ignífuga",
          desc: "Aplicación técnica con certificación oficial visada para la protección pasiva de estructuras metálicas contra el fuego en naves y locales.",
          highlight: "Cumple con el Código Técnico de la Edificación (CTE)",
          icon: <ShieldAlert className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Oficinas y Co-working",
          desc: "Materiales ecológicos con cero VOC para poder habitar y trabajar inmediatamente. Aplicación de pintura de pizarra magnética o colores estimulantes.",
          highlight: "Ambientes sanos que potencian la productividad",
          icon: <Landmark className="w-6 h-6 text-blue-600" />
        }
      ]
    },
    tecnico: {
      title: "Tratamientos Técnicos y Alta Decoración",
      description: "Soluciones a problemas patológicos de la construcción y acabados artesanales para espacios Premium.",
      items: [
        {
          title: "Saneamiento de Humedades y Mohos",
          desc: "Tratamiento biocida fungicida para eliminar raíces bacterianas, sellado de manchas amarillas y aplicación de pintura anticondensación con microesferas.",
          highlight: "Previene la reaparición y regula la temperatura",
          icon: <Droplet className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Pintura de Azulejos y Baños",
          desc: "Esmaltes de poliuretano de alta adherencia para azulejos de cocina y baños sin necesidad de hacer obras pesadas. Resistente a agua y vapor.",
          highlight: "Ahorro de hasta un 70% frente a la reforma tradicional",
          icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />
        }
      ]
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-slate-900 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-[10px] md:text-[12px] mb-4 block">Catálogo de Alta Calidad</span>
            <h1 className="text-5xl md:text-8xl font-display italic tracking-tight text-slate-950 leading-tight">
              Servicios <br />
              <span className="not-italic text-blue-600">Profesionales.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed">
              Descubra por qué denominan a los pintores autónomos y contratados de <strong className="text-blue-600">Pinturas Japri</strong> maestros del color. Resolvemos desde pintura decorativa convencional hasta la patología técnica más exigente.
            </p>
            <button 
              onClick={onBackToHome}
              className="mt-6 flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-slate-800 hover:text-blue-600 transition-colors"
            >
              <span>← Volver al Inicio</span>
            </button>
          </div>
        </div>

        {/* Tab Controls — móvil: franja con degradado; escritorio: sin cambios */}
        <div className="mb-12 md:border-b md:border-stone-200 md:pb-4">
          <div className="md:hidden p-[2px] rounded-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 shadow-lg shadow-blue-600/25 mb-1">
            <div className="flex gap-2 overflow-x-auto overscroll-x-contain touch-pan-x p-2.5 bg-stone-50/95 rounded-[14px] snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(Object.keys(servicesData) as Array<keyof typeof servicesData>).map((key) => {
                const isActive = activeCategory === key;
                const label =
                  key === 'residencial' ? 'Residencial'
                  : key === 'exterior' ? 'Fachadas y Exteriores'
                  : key === 'comercial' ? 'Comercial e Industrial'
                  : 'Técnico y Decorativo';
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex-shrink-0 snap-start px-4 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                        : 'bg-white text-slate-600 border-stone-200 shadow-sm'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex flex-wrap gap-4">
            {(Object.keys(servicesData) as Array<keyof typeof servicesData>).map((key) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                      : 'bg-white text-slate-500 hover:bg-stone-100 hover:text-slate-900'
                  }`}
                >
                  {key === 'residencial' && "Residencial"}
                  {key === 'exterior' && "Fachadas y Exteriores"}
                  {key === 'comercial' && "Comercial e Industrial"}
                  {key === 'tecnico' && "Técnico y Decorativo"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Column Left: Category intro */}
          <div className="lg:col-span-4 max-lg:static lg:sticky lg:top-36 h-fit bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
            <h2 className="text-3xl font-display italic text-slate-950 mb-6">{servicesData[activeCategory].title}</h2>
            <p className="text-slate-500 font-light leading-relaxed mb-8 text-sm">
              {servicesData[activeCategory].description}
            </p>
            <div className="space-y-4 pt-6 border-t border-stone-100">
              <div className="flex items-center space-x-3 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Presupuesto cerrado sin sorpresas</span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Garantía de 3 años</span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Materiales líderes de primeras marcas</span>
              </div>
            </div>
          </div>

          {/* Column Right: Specific Services list */}
          <div className="lg:col-span-8 space-y-6">
            {servicesData[activeCategory].items.map((item, id) => (
              <div 
                key={`${activeCategory}-${id}`}
                className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col md:flex-row gap-6 md:items-start"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <CornerDownRight className="w-4 h-4 mr-2" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Budget Estimator Tool */}
        <section id="presupuestador" className="bg-black text-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative max-lg:overflow-visible lg:overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Col: Description & Controls */}
            <div className="lg:col-span-7">
              <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">Estimador Orientativo</span>
              <h2 className="text-3xl md:text-5xl font-display italic mb-8">Calcule su Presupuesto <br /><span className="not-italic text-blue-500">en 30 segundos.</span></h2>
              
              <div className="space-y-8 max-w-xl">
                {/* Surface Input */}
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                    <span>Metros Cuadrados de vivienda (Suelo)</span>
                    <span className="text-white text-base font-mono">{surfaceSize} m²</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="220" 
                    step="5"
                    value={surfaceSize}
                    onChange={(e) => setSurfaceSize(Number(e.target.value))}
                    className="w-full h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-indigo-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[9px] font-semibold text-stone-500 mt-1">
                    <span>Estudio (30 m²)</span>
                    <span>Piso Estándar (80 m²)</span>
                    <span>Chalet (220+ m²)</span>
                  </div>
                </div>

                {/* Gotelé Toggle */}
                <div className="flex items-center justify-between bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="text-sm font-semibold text-white">¿Necesita retirar Gotelé y alisar?</h4>
                    <p className="text-xs font-light text-stone-400">Es el trabajo más común de pintores profesionales por cuenta propia, requiere masillado y lijado total.</p>
                  </div>
                  <button
                    onClick={() => setIncludeGoteleRemoval(!includeGoteleRemoval)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${includeGoteleRemoval ? 'bg-blue-600' : 'bg-stone-800'}`}
                  >
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${includeGoteleRemoval ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                {/* Doors input */}
                <div className="flex items-center justify-between bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Pintar o lacar puertas existentes</h4>
                    <p className="text-xs font-light text-stone-400">Laminadas o macizas con imprimación y esmalte de alta resistencia.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setDoorsToPaint(Math.max(0, doorsToPaint - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                    >-</button>
                    <span className="w-10 text-center font-mono font-bold text-lg">{doorsToPaint}</span>
                    <button 
                      onClick={() => setDoorsToPaint(Math.min(15, doorsToPaint + 1))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Paint Quality Selection */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Gama de Pintura Utilizada</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'standard', name: 'Estándar', desc: 'Titan/Valentine' },
                      { key: 'premium', name: 'Premium', desc: 'Jotun Majestic' },
                      { key: 'ecological', name: 'Ecológica', desc: 'Aero sin olor' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setPaintQuality(opt.key as any)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          paintQuality === opt.key 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                            : 'bg-stone-900 border-white/10 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase">{opt.name}</div>
                        <div className="text-[9px] text-white/50">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Calculation Display & CTA */}
            <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 p-8 md:p-12 rounded-[2.5rem] border border-white/10 text-center shadow-xl">
              <Calculator className="w-12 h-12 text-blue-500 mx-auto mb-6" />
              <div className="text-stone-400 text-xs font-bold tracking-widest uppercase mb-2">Estimación de Presupuesto Cerrado</div>
              <div className="text-4xl md:text-5xl font-mono text-white font-bold tracking-tight mb-2">
                {estimate.min}€ - {estimate.max}€
              </div>
              <div className="text-[10px] text-stone-500 italic max-w-xs mx-auto mb-8">
                *IVA no incluido. El coste final incluye: protección de suelos, cinta de carrocero, reparación de microfisuras, dos manos completas de pintura premium y limpieza exhaustiva post-obra.
              </div>

              <div className="space-y-4">
                <button 
                  onClick={onNavigateToContact}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-600/10 flex items-center justify-center space-x-2"
                >
                  <span>Solicitar Visita y Confirmar Tarifa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">
                  Sin ningún compromiso | Respuesta en &lt; 24h
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper components missing in standard icons
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);
