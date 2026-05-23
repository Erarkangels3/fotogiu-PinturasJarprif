import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, HardHat, Sparkles, ShieldCheck, HelpCircle, 
  Paintbrush, Brush, ArrowLeft, CheckCircle2, PhoneCall, AlertCircle
} from 'lucide-react';

interface MetodoPageProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const MetodoPage: React.FC<MetodoPageProps> = ({ onBackToHome, onNavigateToContact }) => {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico y Presupuesto Cerrado",
      duration: "Visita Técnica Gratis",
      desc: "No creemos en las estimaciones a ciegas. Un técnico experto de Japri acude a su domicilio en Valencia y provincia para analizar el estado higrométrico de las paredes, humedades, el nivel de luz solar y las preferencias de acabado.",
      details: [
        "Medición digital láser milimétrica de todas las estancias",
        "Asesoramiento técnico sobre el tipo de pintura idóneo (silicato, látex, acrílica)",
        "Carta de colores para elegir muestras reales in situ",
        "Presupuesto detallado por partidas sin letra pequeña en 24h"
      ],
      icon: <ClipboardCheck className="w-8 h-8 text-blue-600" />
    },
    {
      num: "02",
      title: "Protección Integral Japri 360",
      duration: "Día 1 de Obra",
      desc: "La firma de identidad de un auténtico pintor profesional por cuenta propia es la limpieza. Antes de abrir un bote de pintura, dedicamos el tiempo necesario a blindar su hogar para que no sufra el más mínimo desperfecto.",
      details: [
        "Movimiento y precintado de piezas grandes de mobiliario al centro",
        "Encintado de interruptores, enchufes, marcos de puertas y rodapiés",
        "Protección de suelos de parquet o gres con fieltro absorbente antideslizante",
        "Uso de plásticos electrostáticos que repelen y atrapan motas flotantes"
      ],
      icon: <HardHat className="w-8 h-8 text-blue-600" />
    },
    {
      num: "03",
      title: "Preparación Quirúrgica del Lienzo",
      duration: "Saneado de Paredes",
      desc: "La clave del éxito reside en la base. Aplicar pintura sobre una pared desconchada, fisurada o con humedades es abocar el trabajo al fracaso. Preparamos las superficies hasta que parezcan lienzos perfectos.",
      details: [
        "Apertura mecánica, masillado y lijado de grietas con venda de fibra si procede",
        "Tratamiento hidrófugo y bactericida en zonas propensas a mohos",
        "Lijado orbital Festool conectado a aspiradores HEPA para evitar polvo residual",
        "Aplicación de imprimaciones fijadoras que garantizan adherencia uniforme"
      ],
      icon: <Brush className="w-8 h-8 text-blue-600" />
    },
    {
      num: "04",
      title: "Aplicación de Alta Maestría",
      duration: "Fase de Color",
      desc: "Nuestros pintores disponen de formación avanzada para aplicar las capas necesarias, garantizando la cubrición idónea sin chorretones, marcas de rodillo ('rayas') ni imperfecciones de corte.",
      details: [
        "Mínimo dos capas de pintura plástica premium con tecnología anti-salpicaduras",
        "Recortes finos a pulso en uniones techo-pared para líneas perfectas",
        "Pintura decorativa (stuccos, efectos de arena) aplicada por artesanos especialistas",
        "Tiempos de aireado y secado estrictamente controlados según especificaciones"
      ],
      icon: <Paintbrush className="w-8 h-8 text-blue-600" />
    },
    {
      num: "05",
      title: "Inspección, Limpieza y Garantía Japri",
      duration: "Entrega Final",
      desc: "No damos una obra por finalizada hasta que usted la revise exhaustivamente y se encuentre 100% satisfecho. Retiramos las protecciones y dejamos su vivienda lista para ser disfrutada.",
      details: [
        "Limpieza exhaustiva post-obra y recogida rigurosa de materiales y botes",
        "Inspección ocular final con foco de luz rasante para verificar la uniformidad del acabado",
        "Devolución de muebles a su lugar exacto de origen",
        "Entrega de un kit de retoques con pintura sobrante y certificado de garantía Japri"
      ],
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen text-slate-900 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-blue-600 font-bold tracking-[0.5em] uppercase text-[10px] md:text-[12px] mb-4 block">Nuestro Estándar de Ejecución</span>
            <h1 className="text-5xl md:text-8xl font-display italic tracking-tight text-slate-950 leading-tight">
              Método <br />
              <span className="not-italic text-blue-600">Japri.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed">
              Trabajamos con un proceso de 5 fases estructurado para asegurar un resultado insustituible. Máxima finura, cuidado por los detalles y respeto absoluto por la propiedad de nuestros clientes.
            </p>
            <button 
              onClick={onBackToHome}
              className="mt-6 flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-slate-800 hover:text-blue-600 transition-colors"
            >
              <span>← Volver al Inicio</span>
            </button>
          </div>
        </div>

        {/* Methodology Timeline */}
        <div className="space-y-16 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[1px] bg-stone-200 hidden md:block"></div>

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                key={step.num}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start relative ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Circle */}
                <div className="absolute left-[3px] md:left-1/2 top-4 w-10 h-10 -ml-5 bg-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-[10px] font-bold font-mono">
                  {step.num}
                </div>

                {/* Left Side Content Box */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={`p-8 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all ${
                    isEven ? 'md:mr-10' : 'md:ml-10'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {step.duration}
                      </span>
                      <div className="text-stone-300">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    <div className="space-y-3 pt-6 border-t border-stone-100">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Puntos Clave:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start text-xs text-slate-700 font-light">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty Half in Desktop */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Help Box */}
        <section className="mt-24 bg-white border border-stone-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">¿Cómo influye la preparación en su hogar?</h3>
            <p className="text-sm font-light text-slate-500 leading-relaxed">
              Un pintor aficionado suele dedicar el 80% del tiempo a pintar y el 20% a preparar. En <strong>Pinturas Japri</strong> lo hacemos al revés: dedicamos el 75% del tiempo de obra a preparar, sanear y proteger minuciosamente, y el 25% a aplicar color con acabados perfectos. Es por eso que conseguimos superficies sin marcas y que duran el doble de tiempo.
            </p>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="mt-20 text-center bg-blue-600 text-white rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display italic mb-6">¿Preparado para comprobar <br /> la <span className="underline decoration-white/30">Diferencia Japri</span>?</h2>
            <p className="text-blue-100 font-light text-sm md:text-base leading-relaxed mb-10">
              Estaremos encantados de visitarle en Valencia o municipios vecinos para valorar su fachada, piso o chalet. Solicite su visita técnica sin coste alguno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateToContact}
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Agendar Visita Técnica Gratis</span>
              </button>
              <button 
                onClick={onBackToHome}
                className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-white/10 transition-all"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
