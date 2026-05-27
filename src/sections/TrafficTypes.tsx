import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, User, Users, Globe, Monitor, Mail, Radio, Share2 } from 'lucide-react';

import unicastImg from '../assets/images/unicast_illustration_1779902039984.png';
import broadcastImg from '../assets/images/broadcast_illustration_1779902075201.png';
import multicastImg from '../assets/images/multicast_illustration_1779902060055.png';

const TRAFFIC = [
  { 
    id: 'unicast',
    title: 'Unicast', 
    target: '1 a 1', 
    icon: User, 
    color: 'bg-blue-600', 
    image: unicastImg,
    desc: 'Trama enviada de un origen a un único destino específico.', 
    example: 'Descargar un archivo de un servidor o enviar un correo.' 
  },
  { 
    id: 'broadcast',
    title: 'Broadcast', 
    target: '1 a Todos', 
    icon: Globe, 
    color: 'bg-orange-600', 
    image: broadcastImg,
    desc: 'Enviado a todas las estaciones del segmento (FF:FF:FF:FF:FF:FF).', 
    example: 'Solicitud ARP inicial para encontrar la MAC de un vecino.' 
  },
  { 
    id: 'multicast',
    title: 'Multicast', 
    target: '1 a Grupo', 
    icon: Users, 
    color: 'bg-indigo-600', 
    image: multicastImg,
    desc: 'Comunicación selectiva. Solo los dispositivos suscritos reciben la trama.', 
    example: 'Streaming de video corporativo o actualizaciones automáticas.' 
  },
];

const NODE_POSITIONS = [
  { x: 15, y: 30, label: 'Host A', mac: '00:11' },
  { x: 85, y: 30, label: 'Host B', mac: '00:22' },
  { x: 15, y: 70, label: 'Host C', mac: '00:33' },
  { x: 85, y: 70, label: 'Host D', mac: '00:44' },
];

function DeliverySimulator({ type }: { type: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const startAnim = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  return (
    <div className="relative h-64 bg-slate-900 rounded-3xl overflow-hidden shadow-inner border-2 border-slate-800 group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* SVG Cables Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Source to Switch Cable */}
        <motion.path
          d="M 50% 90% L 50% 50%"
          stroke="url(#cableGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={isPlaying ? { 
            pathLength: [0, 1, 1],
            opacity: [0.2, 1, 0.2],
          } : { pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        />
        
        {/* Switch to Nodes Cables */}
        {NODE_POSITIONS.map((node, i) => {
          let isTarget = false;
          if (type === 'unicast' && i === 1) isTarget = true;
          if (type === 'broadcast') isTarget = true;
          if (type === 'multicast' && (i === 1 || i === 3)) isTarget = true;

          return (
            <motion.path
              key={`cable-${i}`}
              d={`M 50% 50% L ${node.x}% ${node.y}%`}
              stroke={isTarget ? "url(#activeGradient)" : "#334155"}
              strokeWidth={isTarget ? "2" : "1"}
              strokeDasharray="4 4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={isPlaying ? { 
                pathLength: isTarget ? [0, 1] : 0,
                opacity: isTarget ? [0.3, 1, 0.3] : 0.3,
              } : { pathLength: 0, opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
          );
        })}

        <defs>
          <linearGradient id="cableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{ 
            y: [null, Math.random() * -40 - 20, null],
            x: [null, Math.random() * 20 - 10, null],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-1 h-1 bg-blue-500 rounded-full blur-[1px]"
        />
      ))}

      {/* Central Hub/Switch Appearance */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-10 bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-500 rounded flex flex-col items-center justify-center z-10 shadow-2xl">
        <div className="flex gap-1 mb-1">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-green-500/50"></div>
          <div className="w-1 h-1 rounded-full bg-green-500/30"></div>
        </div>
        <div className="text-[6px] font-black text-slate-500 uppercase tracking-tighter">L2-SW</div>
      </div>

      {/* Nodes */}
      <div className="absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="p-2 rounded-lg border-2 border-blue-500 bg-blue-500/10 text-blue-400">
          <Monitor size={18} />
        </div>
        <span className="text-[8px] font-mono text-blue-400 mt-1 uppercase">Origen</span>
      </div>

      {NODE_POSITIONS.map((node, i) => {
        // Destination logic
        let isTarget = false;
        if (type === 'unicast' && i === 1) isTarget = true;
        if (type === 'broadcast') isTarget = true;
        if (type === 'multicast' && (i === 1 || i === 3)) isTarget = true;

        return (
          <div key={node.label} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
            <motion.div 
              animate={isPlaying && isTarget ? { scale: [1, 1.2, 1], transition: { delay: 1 } } : {}}
              className={`p-2 rounded-lg border-2 ${isTarget ? 'border-blue-400 text-blue-400' : 'border-slate-700 text-slate-600'} bg-slate-800/50`}
            >
              <Monitor size={18} />
            </motion.div>
            <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase">{node.label}</span>
          </div>
        )
      })}

      {/* Packets */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {/* Initial movement from bottom (source) to switch */}
            <motion.div
              initial={{ left: '50%', top: '90%', scale: 0 }}
              animate={{ left: '50%', top: '50%', scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute z-20 bg-white p-1 rounded shadow-lg text-slate-900"
            >
              <Mail size={12} />
            </motion.div>

            {/* Outgoing movements */}
            {NODE_POSITIONS.map((node, i) => {
              let shouldAnimate = false;
              if (type === 'unicast' && i === 1) shouldAnimate = true;
              if (type === 'broadcast') shouldAnimate = true;
              if (type === 'multicast' && (i === 1 || i === 3)) shouldAnimate = true;

              if (!shouldAnimate) return null;

              return (
                <motion.div
                  key={`out-${i}`}
                  initial={{ left: '50%', top: '50%', scale: 0, opacity: 0 }}
                  animate={{ left: `${node.x}%`, top: `${node.y}%`, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: "circOut" }}
                  className="absolute z-20 bg-blue-500 p-1 rounded shadow-lg text-white"
                >
                  <Mail size={12} />
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button 
          onClick={startAnim}
          className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full flex items-center gap-2 transition-all shadow-lg active:scale-95"
        >
          {isPlaying ? <Radio size={12} className="animate-pulse" /> : <Share2 size={12} />}
          {isPlaying ? 'Reiniciar Envío' : 'Simular Envío'}
        </button>
      </div>
      
      <div className="absolute top-4 right-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{type === 'unicast' ? 'IP: 192.168.1.10' : type === 'broadcast' ? 'MAC: FF-FF-FF-FF-FF-FF' : 'Grupo: 224.0.0.1'}</span>
      </div>
    </div>
  );
}

export default function TrafficTypes({ onNext }: { onNext: () => void }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Métodos de Entrega en Ethernet</h2>
        <p className="text-slate-600">Dependiendo de la dirección MAC de destino, el tráfico se clasifica en tres tipos principales.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {TRAFFIC.map((t, idx) => (
          <motion.div
            key={t.title}
            whileHover={{ y: -5 }}
            onClick={() => {
              setSelectedType(t.id);
              setTimeout(() => {
                document.getElementById('simulation-lab')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }}
            className={`card p-0 overflow-hidden flex flex-col h-full border-2 transition-all duration-300 cursor-pointer 
              ${selectedType === t.id ? 'border-unicordoba-green ring-4 ring-unicordoba-green/10 transform scale-102' : 'border-slate-100 hover:border-unicordoba-green/30'}
            `}
          >
            <div className={`${t.color} p-6 flex flex-col items-center justify-center text-white text-center relative`}>
              <AnimatePresence>
                {selectedType === t.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 bg-white/30 backdrop-blur rounded-full p-1"
                  >
                    <Radio size={14} className="animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="p-3 bg-white/20 rounded-full mb-3 shadow-xl">
                 <t.icon size={28} />
              </div>
              <h4 className="text-xl font-black">{t.title}</h4>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.target}</p>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between bg-white">
              <div className="mb-4 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 aspect-video flex items-center justify-center relative shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={t.image} 
                  alt={`Diagrama de entrega ${t.title}`} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-slate-600 mb-4">{t.desc}</p>
              <div className="pt-4 border-t border-slate-50">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Ejemplo</p>
                 <p className="text-xs text-slate-500 font-medium italic">{t.example}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedType && (
          <motion.div
            key={selectedType}
            id="simulation-lab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-unicordoba-green rounded-full"></div>
              <h3 className="font-black uppercase tracking-tight text-slate-800 text-sm">Laboratorio de Simulación: {TRAFFIC.find(t => t.id === selectedType)?.title}</h3>
            </div>
            <DeliverySimulator type={selectedType} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center pt-8 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium italic">Haz clic en una opción para ver la simulación</p>
        <button id="btn-to-quiz" onClick={onNext} className="btn-primary flex items-center gap-2 px-12 py-4">
          Ir al Cuestionario Final <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
