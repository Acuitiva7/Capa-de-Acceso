import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Info, Search } from 'lucide-react';

const FRAME_FIELDS = [
  { id: 'preamble', name: 'Preámbulo', size: '8 B', color: 'bg-blue-600', info: 'Sincronización. Avisa que hay una trama entrante. Sus últimos 2 bits (SFD) marcan el inicio.' },
  { id: 'dest', name: 'MAC Destino', size: '6 B', color: 'bg-slate-700', info: 'Identificador del receptor. Indica a dónde debe llegar la trama.' },
  { id: 'origin', name: 'MAC Origen', size: '6 B', color: 'bg-slate-600', info: 'Identificador del remitente. Indica quién envió la trama.' },
  { id: 'type', name: 'EtherType', size: '2 B', color: 'bg-orange-500', info: 'Indica el protocolo de la Capa 3 (Ej. IPv4=0x0800).' },
  { id: 'data', name: 'Datos', size: '46-1500 B', color: 'bg-slate-200 text-slate-800', info: 'Payload. El paquete de Capa 3 real que se está transportando.' },
  { id: 'fcs', name: 'FCS', size: '4 B', color: 'bg-green-600', info: 'Control de Calidad. Secuencia de verificación CRC. Si el cálculo falla, la trama se descarta.' },
];

export default function FrameSim({ onNext }: { onNext: () => void }) {
  const [selectedField, setSelectedField] = useState(FRAME_FIELDS[0]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Anatomía de la Trama Ethernet II</h2>
        <p className="text-slate-600">Haz clic en cada campo para entender su función dentro de la logística digital.</p>
      </header>

      <div className="flex w-full h-32 rounded-xl border-4 border-slate-900 overflow-hidden shadow-2xl bg-white">
        {FRAME_FIELDS.map((field) => (
          <button
            id={`frame-field-${field.id}`}
            key={field.id}
            onClick={() => setSelectedField(field)}
            className={`h-full flex flex-col items-center justify-center transition-all duration-300 relative group
              ${selectedField.id === field.id ? 'flex-[2.5]' : 'flex-[1] hover:flex-[1.5]'}
              ${field.color} ${field.color.includes('text') ? '' : 'text-white'}
              border-r border-black/10 last:border-0
            `}
          >
            <span className="text-[10px] uppercase font-bold opacity-70 tracking-tighter">{field.size}</span>
            <span className={`font-black text-sm uppercase px-1 text-center leading-tight ${selectedField.id === field.id ? 'scale-110' : 'scale-90 opacity-60'}`}>
              {field.name}
            </span>
            {selectedField.id === field.id && (
              <motion.div layoutId="arrow" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-inherit border-b border-r border-black/10" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedField.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="card border-l-8 border-l-unicordoba-green min-h-[160px] flex gap-6 items-start"
        >
          <div className="p-4 bg-unicordoba-green/10 text-unicordoba-green rounded-2xl">
            <Search size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              {selectedField.name} <span className="text-sm font-normal text-slate-400">({selectedField.size})</span>
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed italic">
              {selectedField.info}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="card">
        <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
          <Info size={18} />
          <span>Curiosidad Técnica</span>
        </div>
        <p className="text-sm text-slate-600">
          Si el campo de <strong>Datos</strong> es menor a 46 bytes, Ethernet añade automáticamente un "Relleno" (padding) para que la trama alcance el tamaño mínimo reglamentario.
        </p>
      </div>

      <div className="flex justify-end">
        <button id="btn-next-mac" onClick={onNext} className="btn-primary flex items-center gap-2">
          Explorar Dirección MAC <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
