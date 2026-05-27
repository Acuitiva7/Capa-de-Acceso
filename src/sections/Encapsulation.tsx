import { motion } from 'motion/react';
import { ChevronRight, Layers, Package, Database, AppWindowIcon, Route, ArrowDown } from 'lucide-react';

const LAYERS = [
  { name: 'Aplicación', data: 'Datos', icon: AppWindowIcon, color: 'bg-indigo-500', desc: 'Protocolos: HTTP, FTP, DNS.' },
  { name: 'Transporte', data: 'Segmento', icon: Package, color: 'bg-blue-500', desc: 'Control: TCP / UDP.' },
  { name: 'Red', data: 'Paquete', icon: Route, color: 'bg-orange-500', desc: 'Lógico: Direccionamiento IP.' },
  { name: 'Enlace de Datos', data: 'Trama', icon: Layers, color: 'bg-unicordoba-green', desc: 'Físico: Direccionamiento MAC.' },
  { name: 'Física', data: 'Bits', icon: Database, color: 'bg-slate-700', desc: 'Señal: Impulsos eléctricos / luz.' },
];

export default function Encapsulation({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">El Proceso de Encapsulación</h2>
        <p className="text-slate-600 font-medium">Mira cómo los datos se protegen capa tras capa en una estructura de pila protegida.</p>
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
              className="relative group"
            >
              <div className={`flex items-stretch rounded-2xl overflow-hidden shadow-xl border-2 border-white transition-all group-hover:shadow-2xl`}>
                <div className={`${layer.color} w-24 flex flex-col items-center justify-center text-white p-4`}>
                   <layer.icon size={32} />
                   <span className="text-[8px] font-black uppercase mt-2 opacity-60">L{5-idx}</span>
                </div>
                <div className="flex-1 bg-white p-5 flex items-center justify-between">
                   <div className="space-y-1">
                      <h4 className="font-black text-slate-800 uppercase tracking-tight">{layer.name}</h4>
                      <p className="text-xs text-slate-500">{layer.desc}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PDU Type</p>
                      <p className={`text-xl font-black italic tracking-tighter ${layer.color.replace('bg-', 'text-')}`}>
                        {layer.data}
                      </p>
                   </div>
                </div>
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
