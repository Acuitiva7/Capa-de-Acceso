import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Layers, Package, Database, AppWindowIcon, Route, ArrowDown, Lightbulb, Info } from 'lucide-react';

const LAYERS = [
  { 
    name: 'Aplicación', 
    data: 'Datos', 
    icon: AppWindowIcon, 
    color: 'bg-indigo-500', 
    textColor: 'text-indigo-500',
    desc: 'Protocolos: HTTP, FTP, DNS.',
    concept: 'Es la interfaz directa con las aplicaciones de software que utilizas. Se encarga de formatear y estructurar tus peticiones de red para que los navegadores, correos o servidores hablen un idioma estandarizado.',
    analogy: 'Es como redactar tu carta original y ordenarla en un papel con un formato legible y comprensible ante el lector.'
  },
  { 
    name: 'Transporte', 
    data: 'Segmento', 
    icon: Package, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-500',
    desc: 'Control: TCP / UDP.',
    concept: 'Toma el flujo continuo de datos de la capa superior y lo divide en segmentos de tamaño controlado. Agrega puertos de origen y destino para enviarlos de forma confiable, reordenando la información perdida.',
    analogy: 'Es como numerar cada página de tu manuscrito secuencialmente y meterlas en sobres numerados para que el receptor reconstruya el libro.'
  },
  { 
    name: 'Red', 
    data: 'Paquete', 
    icon: Route, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-500',
    desc: 'Lógico: Direccionamiento IP.',
    concept: 'Se encarga del enrutamiento a escala global. Agrega las direcciones IP lógicas de origen (tu red) y destino (servidor remoto), seleccionando el camino óptimo a través de internet.',
    analogy: 'Es escribir tu dirección residencial exterior y la dirección postal destino completa y detallada encima de cada sobre.'
  },
  { 
    name: 'Enlace de Datos', 
    data: 'Trama', 
    icon: Layers, 
    color: 'bg-unicordoba-green', 
    textColor: 'text-unicordoba-green',
    desc: 'Físico: Direccionamiento MAC.',
    concept: 'Prepara el paquete para cruzar los enlaces físicos inmediatos. Agrega la dirección física local MAC (de hardware) de tu tarjeta de red y de tu router vecino, añadiendo sumas de verificación de errores.',
    analogy: 'Es colocar el sobre dentro del casillero del camión de transporte local, etiquetado con la identificación de placa del siguiente punto de control.'
  },
  { 
    name: 'Física', 
    data: 'Bits', 
    icon: Database, 
    color: 'bg-slate-700', 
    textColor: 'text-slate-700',
    desc: 'Señal: Impulsos eléctricos / luz.',
    concept: 'Convierte las tramas en señales electromagnéticas puras, voltajes eléctricos, pulsos o señales de luz de fibra de vidrio para transmitir bits elementales (ceros y unos) por el medio físico de transmisión.',
    analogy: 'Representa el giro físico de las llantas en la carretera para avanzar o la vibración de las ondas de radio transmitiéndose por el aire.'
  },
];

export default function Encapsulation({ onNext }: { onNext: () => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">El Proceso de Encapsulación</h2>
        <p className="text-slate-600 font-medium">Mira cómo los datos se protegen capa tras capa en una estructura de pila protegida. Pasa el cursor o selecciona cada una para revelar su concepto.</p>
      </header>

      <div className="relative py-10 flex flex-col items-center">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-slate-200 -z-10 left-1/2 -translate-x-1/2 rounded-full"></div>

        <div className="w-full max-w-2xl space-y-4">
          {LAYERS.map((layer, idx) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
              className="relative group cursor-pointer"
            >
              <div className="flex flex-col rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white transition-all group-hover:shadow-2xl">
                <div className="flex items-stretch">
                  <div className={`${layer.color} w-24 flex flex-col items-center justify-center text-white p-4 shrink-0`}>
                     <layer.icon size={32} />
                     <span className="text-[10px] font-black uppercase mt-2 opacity-60">L{5-idx}</span>
                  </div>
                  <div className="flex-1 p-5 flex items-center justify-between">
                     <div className="space-y-1">
                        <h4 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                          {layer.name}
                          <Info size={14} className="text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{layer.desc}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PDU Type</p>
                        <p className={`text-xl font-black italic tracking-tighter ${layer.textColor}`}>
                          {layer.data}
                        </p>
                     </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-slate-100 bg-slate-50/70"
                    >
                      <div className="p-5 space-y-3.5 text-xs text-slate-650 leading-relaxed">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conceptualización Detallada</span>
                          <p className="font-semibold text-slate-700 text-[13px]">{layer.concept}</p>
                        </div>
                        <div className="flex items-start gap-2.5 bg-white/85 p-3.5 rounded-xl border border-slate-100 shadow-sm">
                          <Lightbulb size={16} className="text-unicordoba-green shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold text-unicordoba-green uppercase tracking-wider block">Analogía de la Vida Real</span>
                            <p className="italic text-slate-600 text-[11px] leading-snug">{layer.analogy}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {idx < LAYERS.length - 1 && (
                <div className="flex justify-center -my-2 relative z-20">
                   <div className="bg-slate-100 p-1.5 rounded-full border-2 border-white shadow-md text-slate-400">
                      <ArrowDown size={14} />
                   </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card bg-slate-900 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-unicordoba-green/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex gap-6 items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-unicordoba-gold">
            <Package size={32} />
          </div>
          <div>
            <h4 className="font-black uppercase tracking-tighter mb-1">Empaquetado de Datos</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Imagina una "Matrioshka" digital: cada capa envuelve los datos de la anterior y les coloca su propia etiqueta de control. En la base de esta pila se encuentra la <span className="text-white font-bold italic">Trama Ethernet</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={onNext} className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
          Ver Anatomía de la Trama <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
