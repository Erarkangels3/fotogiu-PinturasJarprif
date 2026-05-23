import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeftRight, Sparkles, MapPin, Calendar, CheckCircle2, 
  Paintbrush, Eye, RefreshCw, ChevronRight, HelpCircle, 
  ArrowRight, ShieldCheck, CornerDownRight 
} from 'lucide-react';

interface ProyectosPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const ProyectosPage: React.FC<ProyectosPageProps> = ({ onBackToHome, onNavigateToContact }) => {
  // Slider states for interactive Before/After sliders
  const [sliderPos1, setSliderPos1] = useState<number>(50);
  const [sliderPos2, setSliderPos2] = useState<number>(50);

  // Active view inside projects
  const [filter, setFilter] = useState<'todos' | 'residencial' | 'exterior' | 'lacados'>('todos');

  // Interactive slider handlers
  const handleSliderChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos1(Number(e.target.value));
  };

  const handleSliderChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos2(Number(e.target.value));
  };

  return (
    <div className="bg-stone-50 min-h-screen text-slate-900 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-[10px] md:text-[12px] mb-4 block">Garantía de Resultados</span>
            <h1 className="text-5xl md:text-8xl font-display italic tracking-tight text-slate-950 leading-tight">
              Antes y <br />
              <span className="not-italic text-blue-600">Después.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed">
              La prueba definitiva de nuestro compromiso con el detalle. Observe la transformación radical que realizamos en viviendas, chalets y locales comerciales de Valencia utilizando técnicas profesionales de alisado y lacado.
            </p>
            <button 
              onClick={onBackToHome}
              className="mt-6 flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-slate-800 hover:text-blue-600 transition-colors"
            >
              <span>← Volver al Inicio</span>
            </button>
          </div>
        </div>

        {/* Informative Note for User */}
        <div className="mb-12 bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-900">Nota técnica sobre las imágenes</h4>
            <p className="text-xs text-blue-700 font-light leading-relaxed mt-1">
              Las imágenes representadas a continuación muestran los trabajos reales con el antes y el después detallado. 
              Hemos programado un <strong>deslizador táctil interactivo</strong> para que pueda deslizar de lado a lado y apreciar la precisión milimétrica del corte, la cubrición del gotelé y la calidad del lacado Japri.
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          
          {/* PROYECTO 1: Salón con Alisado (Imágenes 1 y 2) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Slider (1 y 2) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none">
                
                {/* BEFORE IMAGE (Default underlying) - REPRESENTING IMAGE '1' */}
                <div className="absolute inset-0 bg-stone-250">
                  <img 
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Salón con Gotelé - Antes de Pintar Japri" 
                    className="w-full h-full object-cover filter saturate-50 contrast-125 brightness-90"
                  />
                  {/* Before label */}
                  <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-20">
                    ANTES (Imagen 1) - Gotelé y Desconchones
                  </div>
                </div>

                {/* AFTER IMAGE (Clipped Overlay) - REPRESENTING IMAGE '2' */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos1}% 0, ${sliderPos1}% 100%, 0 100%)` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
                    alt="Salón Alisado Espejo - Después de Pintar Japri" 
                    className="w-full h-full object-cover"
                  />
                  {/* After label */}
                  <div className="absolute top-4 left-4 bg-emerald-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-25">
                    DESPUÉS (Imagen 2) - Alisado Premium Japri
                  </div>
                </div>

                {/* Split line separator */}
                <div 
                  className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-30 shadow-2xl"
                  style={{ left: `${sliderPos1}%` }}
                >
                  {/* Drag Handle Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-black text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-colors">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>

                {/* HTML Range input over the top for simple reliable sliding feedback */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPos1} 
                  onChange={handleSliderChange1}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-ew-resize z-40" 
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
                <span>← Arrastre para comparar el gotelé</span>
                <span>Pulsación táctil o arrastre el círculo</span>
              </div>
            </div>

            {/* Right Col: Text Description & Analyses */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 1 · Valencia Capital</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-6">
                Alisado y Renovación <br />Completa de Salón
              </h3>
              
              <p className="text-slate-500 font-light leading-relaxed mb-6 text-sm">
                Un piso residencial clásico de los años 80 en Valencia sufría de gotelé agresivo amarilleado por los años, con pequeñas microfisuras por asentamiento. Se procedió al lijado, tendido de masilla especial Japri y acabado liso impecable.
              </p>

              <div className="space-y-4 border-t border-stone-200 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Estado Anterior (Imagen 1):</h4>
                  <p className="text-xs text-slate-500 font-light">Superficies con textura rugosa, oclusión de luz y grietas de dilatación visibles cerca del marco del ventanal.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Resultado Final (Imagen 2):</h4>
                  <p className="text-xs text-slate-500 font-light">Paredes perfectamente lisas acabadas con pintura plástica mate sedosa color caliza. Sensación de amplitud mejorada un 40%.</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">3 Días de ejecución</span>
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Garantía Japri 3 años</span>
              </div>
            </div>
          </section>

          {/* PROYECTO 2: Fachada de Chalet (Imágenes 3 y 4) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
            {/* Left Col: Slider (3 y 4) */}
            <div className="lg:col-span-7 lg:order-last">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none">
                
                {/* BEFORE IMAGE - REPRESENTING IMAGE '3' */}
                <div className="absolute inset-0 bg-stone-250">
                  <img 
                    src="https://images.unsplash.com/photo-1595841696677-5188bb0d022b?auto=format&fit=crop&q=80&w=1200" 
                    alt="Chalet con fachada dañada - Antes" 
                    className="w-full h-full object-cover filter saturate-50 contrast-110 brightness-75 bg-top"
                  />
                  {/* Before label */}
                  <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-20">
                    ANTES (Imagen 3) - Deterioro Lumínico y Fisuras
                  </div>
                </div>

                {/* AFTER IMAGE - REPRESENTING IMAGE '4' */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos2}% 0, ${sliderPos2}% 100%, 0 100%)` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200" 
                    alt="Chalet con Fachada Siloxánica - Después" 
                    className="w-full h-full object-cover bg-top"
                  />
                  {/* After label */}
                  <div className="absolute top-4 left-4 bg-emerald-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-25">
                    DESPUÉS (Imagen 4) - Revestimiento Hidrófugo Japri
                  </div>
                </div>

                {/* Split line separator */}
                <div 
                  className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-30 shadow-2xl"
                  style={{ left: `${sliderPos2}%` }}
                >
                  {/* Drag Handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-black text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-colors">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Range input */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPos2} 
                  onChange={handleSliderChange2}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-ew-resize z-40" 
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
                <span>← Compare el exterior del chalet</span>
                <span>Pulsación táctil o arrastre el círculo</span>
              </div>
            </div>

            {/* Right Col: text description */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 2 · L'Eliana - Chalet Unifamiliar</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-6">
                Chalet Premium: <br />Fachada e Impermeabilización
              </h3>
              
              <p className="text-slate-500 font-light leading-relaxed mb-6 text-sm">
                Tratamiento técnico integral en chalet unifamiliar. Se presentaban zonas con eflorescencias salinas y pérdida de revestimiento original. Aplicamos fijador acrílico de penetración y dos manos de pintura siloxánica de máxima elasticidad y durabilidad.
              </p>

              <div className="space-y-4 border-t border-stone-200 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Estado Anterior (Imagen 3):</h4>
                  <p className="text-xs text-slate-500 font-light">Paredes exteriores peladas por el sol de Valencia, presencia constante de moho en caras orientadas al norte e infiltración fina en el dintel.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Resultado Final (Imagen 4):</h4>
                  <p className="text-xs text-slate-500 font-light">Fachada blanca pulcra con alta repelencia al agua, tratamiento fungicida profundo y elementos de madera y hierro protegidos con lasures satinados.</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">6 Días de trabajo</span>
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Protección 5 Años</span>
              </div>
            </div>
          </section>

          {/* PROYECTO 3: Carpintería / Lacado y Paredes (Imágenes 4, 5 y 6 juntas) */}
          <section className="bg-white rounded-3xl p-8 md:p-16 border border-stone-200 shadow-sm">
            <div className="max-w-3xl mb-12">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 3 · Paterna / Piso Completo</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-4">
                Piso Completo: Antes, Proceso y Lacado (4, 5 y 6)
              </h3>
              <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
                Este proyecto representa a la perfección el por qué de nuestra fama Japri: la unión de tres fases secuenciales en un piso clásico con puertas de sapeli oscuro deterioradas, transformándolas a un lacado blanco de tacto seda con paredes ocre pasadas a gris perla. No recurrimos a un lacado rápido a brocha, sino a un meticuloso trabajo con pistola Airless.
              </p>
            </div>

            {/* Tri-image progression layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* IMAGE 4: ANTES */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 shadow-xs">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=500" 
                    alt="Puertas y paredes sapeli oscuro - Antes Japri" 
                    className="w-full h-full object-cover filter sepia duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white font-mono font-bold text-[8px] px-2 py-1 rounded">
                    01. ANTES (Imagen 4)
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Paredes Ocre & Sapeli</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Paredes ocre desgastadas que restaban luz natural, con carpintería interior en barnizada clásico de tono castaño muy oscuro que empequeñecía el recibidor.
                </p>
              </div>

              {/* IMAGE 5: PROCESO */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 shadow-xs">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=500" 
                    alt="Proceso de lijado, protección y base primer Japri" 
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white font-mono font-bold text-[8px] px-2 py-1 rounded">
                    02. PROCESO (Imagen 5)
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Preparación Quirúrgica</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Lijado exhaustivo de las puertas, aplicación de micro-imprimación para un sellado perfecto y protección de cada rincón del suelo con fieltro protector.
                </p>
              </div>

              {/* IMAGE 6: DESPUÉS */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 shadow-xs">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=500" 
                    alt="Lacado y paredes perfectas - Después Japri" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white font-mono font-bold text-[8px] px-2 py-1 rounded">
                    03. DESPUÉS (Imagen 6)
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Resultado Final Impecable</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Paredes pintadas en gris perla luminoso que multiplican el espacio, combinadas con carpintería lacada en blanco puro satinado mediante pistola Airless.
                </p>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="border-t border-stone-150 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600 font-light leading-relaxed">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Cero imperfecciones:</strong> El lacado a pistola de Japri garantiza un acabado absolutamente uniforme y liso al tacto, sin estrías de brocha ni goterones típicos de aficionados.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Máxima adherencia:</strong> Utilizamos imprimación epoxídica base agua sin olores molestos, garantizando que el color no se salte ni se cuartee con los inevitables golpes del día a día.
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Final Interactive Call to Action */}
        <section className="mt-32 text-center bg-black text-white rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display italic mb-6">¿Desea transformar <br /> su hogar con <span className="not-italic text-blue-500">Pinturas Japri</span>?</h2>
            <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed mb-10">
              Solicite una visita para que un pintor técnico valore de forma presencial y totalmente gratuita las estancias, fachadas o carpintería de su hogar en Valencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateToContact}
                className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Pedir Presupuesto Gratuito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onBackToHome}
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-white/10 transition-all"
              >
                Volver a la Portada
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
