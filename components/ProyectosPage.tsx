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
  const [sliderPos3, setSliderPos3] = useState<number>(50);

  // Active view inside projects
  const [filter, setFilter] = useState<'todos' | 'residencial' | 'exterior' | 'lacados'>('todos');

  // Interactive slider handlers
  const handleSliderChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos1(Number(e.target.value));
  };

  const handleSliderChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos2(Number(e.target.value));
  };

  const handleSliderChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos3(Number(e.target.value));
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
          
          {/* PROYECTO 1: Patio y fachada trasera */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Slider */}
            <div className="lg:col-span-7 max-w-lg mx-auto lg:max-w-none lg:mx-0 w-full">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none">
                
                {/* BEFORE IMAGE */}
                <div className="absolute inset-0 bg-stone-250">
                  <img 
                    src="/projects/jarpri/proyecto-1-antes.jpg" 
                    alt="Patio exterior con fachada deteriorada - Antes Japri" 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Before label */}
                  <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-20">
                    ANTES - Fachada desgastada y parcheado
                  </div>
                </div>

                {/* AFTER IMAGE (Clipped Overlay) */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos1}% 0, ${sliderPos1}% 100%, 0 100%)` }}
                >
                  <img 
                    src="/projects/jarpri/proyecto-1-despues.jpg" 
                    alt="Patio exterior renovado en blanco - Después Japri" 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* After label */}
                  <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-25">
                    DESPUÉS - Acabado blanco uniforme Japri
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
                <span>← Arrastre para comparar el patio</span>
                <span>Pulsación táctil o arrastre el círculo</span>
              </div>
            </div>

            {/* Right Col: Text Description & Analyses */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 1 · Jávea · Vivienda unifamiliar</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-6">
                Patio y Fachada Trasera: <br />Renovación Integral
              </h3>
              
              <p className="text-slate-500 font-light leading-relaxed mb-6 text-sm">
                Vivienda unifamiliar con patio interior y fachada trasera muy castigada por el sol y la humedad marina. La pintura salmón original había perdido brillo, con grietas y zonas de parcheado visibles en los paramentos laterales. Japri ejecutó la preparación completa y la renovación cromática en blanco de alta luminosidad.
              </p>

              <div className="space-y-4 border-t border-stone-200 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Estado anterior:</h4>
                  <p className="text-xs text-slate-500 font-light">Paredes exteriores descoloridas, fisuras reparadas con masilla a la vista y acabado irregular en terraza, escalera y zona de garaje.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Resultado final:</h4>
                  <p className="text-xs text-slate-500 font-light">Fachada y patio en blanco puro con acabado homogéneo, mayor luminosidad y contraste elegante con barandillas, rejas y suelo cerámico.</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">5 Días de ejecución</span>
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Garantía Japri 3 años</span>
              </div>
            </div>
          </section>

          {/* PROYECTO 2: Terraza exterior */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
            {/* Left Col: Slider */}
            <div className="lg:col-span-7 lg:order-last max-w-lg mx-auto lg:max-w-none lg:mx-0 w-full">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none">
                
                {/* BEFORE IMAGE */}
                <div className="absolute inset-0 bg-stone-250">
                  <img 
                    src="/projects/jarpri/proyecto-2-antes.jpg" 
                    alt="Terraza exterior con paredes deterioradas - Antes Japri" 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Before label */}
                  <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-20">
                    ANTES - Pintura desconchada y manchas
                  </div>
                </div>

                {/* AFTER IMAGE */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos2}% 0, ${sliderPos2}% 100%, 0 100%)` }}
                >
                  <img 
                    src="/projects/jarpri/proyecto-2-despues.jpg" 
                    alt="Terraza exterior renovada en blanco - Después Japri" 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* After label */}
                  <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-25">
                    DESPUÉS - Fachada blanca y acabado impecable
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
                <span>← Compare la terraza exterior</span>
                <span>Pulsación táctil o arrastre el círculo</span>
              </div>
            </div>

            {/* Right Col: text description */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 2 · Jávea · Terraza y fachada</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-6">
                Terraza Exterior: <br />Pintura y Renovación
              </h3>
              
              <p className="text-slate-500 font-light leading-relaxed mb-6 text-sm">
                Terraza acristalada con paramentos en tono beige muy deteriorado: desconchones, manchas de humedad y pérdida de protección frente al sol costero. Realizamos saneamiento de superficies, fijación y aplicación de pintura para exteriores en blanco luminoso, respetando carpintería, toldo y canalones.
              </p>

              <div className="space-y-4 border-t border-stone-200 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Estado anterior:</h4>
                  <p className="text-xs text-slate-500 font-light">Paredes con pintura levantada en la zona izquierda, tono amarillento apagado y aspecto general de abandono en un espacio de uso diario.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Resultado final:</h4>
                  <p className="text-xs text-slate-500 font-light">Acabado blanco uniforme que multiplica la luz natural, integrado con la carpintería blanca y el toldo a rayas para un conjunto limpio y actual.</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">4 Días de trabajo</span>
                <span className="px-4 py-2 bg-stone-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">Protección 5 años</span>
              </div>
            </div>
          </section>

          {/* PROYECTO 3: Dormitorio con líneas decorativas */}
          <section className="bg-white rounded-3xl p-8 md:p-16 border border-stone-200 shadow-sm">
            <div className="max-w-3xl mb-12">
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">Proyecto 3 · Jávea · Dormitorio principal</span>
              <h3 className="text-3xl md:text-5xl font-display italic leading-tight text-slate-950 mb-4">
                Dormitorio: De Franjas Clásicas <br />a Diseño Geométrico
              </h3>
              <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
                Renovación completa de la pared de cabecera en dormitorio principal. El acabado anterior combinaba franjas verticales granate y beige con textura tipo estuco, un estilo que oscurecía la estancia. Japri alisó la superficie y ejecutó un diseño contemporáneo con líneas decorativas en chevrón y laterales en color púrpura, con encintado de precisión y pintura plástica de alta calidad.
              </p>
            </div>

            {/* Slider antes/después */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 select-none mb-6">
              <div className="absolute inset-0 bg-stone-250">
                <img 
                  src="/projects/jarpri/proyecto-3-antes.jpg" 
                  alt="Dormitorio con franjas decorativas antiguas - Antes Japri" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-20">
                  ANTES - Franjas y acabado texturizado
                </div>
              </div>

              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos3}% 0, ${sliderPos3}% 100%, 0 100%)` }}
              >
                <img 
                  src="/projects/jarpri/proyecto-3-despues.jpg" 
                  alt="Dormitorio con diseño geométrico - Después Japri" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md z-25">
                  DESPUÉS - Líneas decorativas y alisado Japri
                </div>
              </div>

              <div 
                className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-30 shadow-2xl"
                style={{ left: `${sliderPos3}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-black text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-colors">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos3} 
                onChange={handleSliderChange3}
                className="absolute inset-0 opacity-0 w-full h-full cursor-ew-resize z-40" 
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-10 uppercase tracking-widest">
              <span>← Arrastre para comparar el dormitorio</span>
              <span>Pulsación táctil o arrastre el círculo</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150">
                <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">Estado anterior</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Pared de cabecera con líneas verticales en granate y beige con acabado moteado, estética recargada que restaba amplitud al dormitorio.
                </p>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150">
                <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">Resultado final</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Superficie alisada con diseño geométrico en chevrón, base blanca y laterales en púrpura. Acabado nítido, moderno y totalmente personalizado.
                </p>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="border-t border-stone-150 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600 font-light leading-relaxed">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Precisión milimétrica:</strong> El encintado profesional de Japri garantiza líneas decorativas perfectamente rectas, sin sangrados ni irregularidades en el diseño geométrico.
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Alisado previo:</strong> Eliminamos la textura y el patrón antiguo con masilla y lijado fino antes de aplicar la base, asegurando un acabado liso y duradero.
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
