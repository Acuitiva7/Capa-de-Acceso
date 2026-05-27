import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Cpu, 
  Search, 
  ArrowRight, 
  Table2, 
  Users, 
  Monitor, 
  Laptop, 
  Server, 
  Mail,
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';

interface MacEntry {
  port: string;
  mac: string;
}

const SCENARIOS = [
  { id: 'unicast_known', name: 'Unicast (Conocido)', origin: '00-AA-11-22-33-44', dest: 'AA-BB-CC-DD-EE-FF', type: 'Unicast', desc: 'Envío desde Fa0/2 a Fa0/3' },
  { id: 'unicast_unknown', name: 'Unicast (Desconocido)', origin: '00-AA-11-22-33-44', dest: 'BB-BB-BB-BB-BB-BB', type: 'Unicast', desc: 'MAC no en SAT -> Inundación total' },
  { id: 'broadcast', name: 'Broadcast', origin: '00-AA-11-22-33-44', dest: 'FF-FF-FF-FF-FF-FF', type: 'Broadcast', desc: 'Trama de Difusión amplia' },
  { id: 'multicast', name: 'Multicast', origin: '00-AA-11-22-33-44', dest: '01-00-5E-00-00-01', type: 'Multicast', desc: 'Envío a Grupo de suscripción' },
];

const DEVICES = [
  { id: 'D1', p: 'Fa0/1', icon: Laptop, label: 'Laptop-0', x: 20, y: 25 },
  { id: 'D2', p: 'Fa0/2', icon: Monitor, label: 'PC-Admin', x: 20, y: 75, isSource: true },
  { id: 'D3', p: 'Fa0/3', icon: Server, label: 'Server-Data', x: 80, y: 25 },
  { id: 'D4', p: 'Fa0/4', icon: Monitor, label: 'PC-Estudiante', x: 80, y: 75 },
];

export default function SwitchSim({ onNext }: { onNext: () => void }) {
  const DEFAULT_MAC_TABLE = [
    { port: 'Fa0/1', mac: '00-1A-2B-3C-4D-5E' },
    { port: 'Fa0/3', mac: 'AA-BB-CC-DD-EE-FF' },
  ];

  const [macTable, setMacTable] = useState<MacEntry[]>(DEFAULT_MAC_TABLE);
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(['Switch(config)# system ready', 'Switch# ready for traffic...']);
  const [forwardedPorts, setForwardedPorts] = useState<string[]>([]);
  const [isLearning, setIsLearning] = useState(false);

  const addLog = (msg: string) => {
    setConsoleLogs(prev => [...prev.slice(-8), `Switch# ${msg}`]);
  };

  const manualResetTable = () => {
    setMacTable(DEFAULT_MAC_TABLE);
    addLog("SAT: Table cleared and restored to defaults.");
  };

  const resetSim = (scenario = activeScenario) => {
    setStep(0);
    setIsDone(false);
    setForwardedPorts([]);
    setActiveScenario(scenario);
    setConsoleLogs([`Switch# scenario changed to ${scenario.name}`, 'Switch# sat_engine reset']);
  };

  const nextStep = () => {
    const nextS = step + 1;
    setStep(nextS);

    if (nextS === 1) { // INGRESO
      addLog(`vlan1: link up on Fa0/2. Receiving frame...`);
      addLog(`src_mac: ${activeScenario.origin}`);
      
      const alreadyExists = macTable.find(e => e.mac === activeScenario.origin);
      if (!alreadyExists) {
        setIsLearning(true);
        setTimeout(() => {
          setMacTable(prev => [...prev, { port: 'Fa0/2', mac: activeScenario.origin }]);
          addLog(`SAT: Learned ${activeScenario.origin} on port Fa0/2`);
          setIsLearning(false);
        }, 1200);
      }
    } 
    else if (nextS === 2) { // PROCESAR
      addLog(`SAT_LOOKUP: Searching for ${activeScenario.dest}...`);
      const isBroadcast = activeScenario.dest === 'FF-FF-FF-FF-FF-FF';
      const isMulticast = activeScenario.dest.startsWith('01-00-5E');
      const destEntry = macTable.find(e => e.mac === activeScenario.dest);

      if (isBroadcast) addLog('RESULT: Broadcast found. Action: Flood all ports.');
      else if (isMulticast) addLog('RESULT: Multicast group found. Action: Forward to members.');
      else if (destEntry) addLog(`RESULT: Destination found at port ${destEntry.port}. Action: Selective Forward.`);
      else addLog('RESULT: MAC unknown. Action: Flooding.');
    }
    else if (nextS === 3) { // REENVIAR
      const isBroadcast = activeScenario.dest === 'FF-FF-FF-FF-FF-FF';
      const isMulticast = activeScenario.dest.startsWith('01-00-5E');
      const destEntry = macTable.find(e => e.mac === activeScenario.dest);
      
      const targets = (isBroadcast || isMulticast || !destEntry) 
        ? ['Fa0/1', 'Fa0/3', 'Fa0/4'] 
        : [destEntry.port];
        
      setForwardedPorts(targets);
      addLog(`FORWARD: Packet sent to ports: ${targets.join(', ')}`);
      setIsDone(true);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-2">
            <Activity className="text-unicordoba-green" size={24} />
            Simulador de Conmutación Cisco
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Laboratorio de Redes - Unicórdoba</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
           {SCENARIOS.map(s => (
             <button
              key={s.id}
              onClick={() => resetSim(s)}
              className={`px-3 py-1 rounded border transition-all text-[9px] font-black uppercase tracking-tighter shadow-sm
                ${activeScenario.id === s.id ? 'bg-unicordoba-green border-unicordoba-green text-white shadow-md' : 'bg-white border-slate-200 text-slate-400 hover:border-unicordoba-green/50'}`}
             >
               {s.name}
             </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 h-[600px] relative">
        {/* Canvas Area (Packet Tracer look) */}
        <div className="col-span-8 bg-[#2d2d2d] rounded-2xl relative overflow-hidden shadow-2xl border-4 border-slate-700">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           {/* Floating MAC Table Overlay */}
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="absolute top-4 right-4 z-40 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 pointer-events-auto"
           >
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                 <h4 className="font-black text-[9px] uppercase tracking-widest text-unicordoba-green flex items-center gap-2">
                    <Table2 size={12} /> SAT Engine
                 </h4>
                 <button 
                  onClick={manualResetTable}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-unicordoba-green transition-colors"
                  title="Reiniciar Tabla"
                 >
                   <RefreshCw size={10} />
                 </button>
              </div>
              <div className="max-h-40 overflow-y-auto no-scrollbar">
                 <table className="w-full text-[9px] text-left">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[8px] border-b">
                       <tr>
                         <th className="px-3 py-1.5">Pto</th>
                         <th className="px-3 py-1.5">Dirección MAC</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {macTable.map((entry, idx) => (
                         <motion.tr 
                          key={idx}
                          layoutId={`sat-row-${entry.mac}`}
                          initial={{ opacity: 0, backgroundColor: 'rgba(234, 179, 8, 0.2)' }}
                          animate={{ opacity: 1, backgroundColor: 'transparent' }}
                          className={`font-mono ${entry.port === 'Fa0/2' && step >= 1 ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500'}`}
                         >
                           <td className="px-3 py-1.5">{entry.port}</td>
                           <td className="px-3 py-1.5 truncate">{entry.mac}</td>
                         </motion.tr>
                       ))}
                       {isLearning && (
                         <tr className="animate-pulse bg-blue-50/50">
                            <td className="px-3 py-1.5 font-black text-blue-400">Fa0/2</td>
                            <td className="px-3 py-1.5 text-blue-400 italic">Learning...</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </motion.div>

           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {DEVICES.map(dev => (
                <line 
                  key={`link-${dev.id}`}
                  x1={`${dev.x}%`} y1={`${dev.y}%`} 
                  x2="50%" y2="50%" 
                  stroke={step > 0 ? (dev.p === 'Fa0/2' ? '#3b82f6' : forwardedPorts.includes(dev.p) ? '#eab308' : '#475569') : '#475569'} 
                  strokeWidth="2" 
                  strokeDasharray="4"
                  className={step === 3 && forwardedPorts.includes(dev.p) ? 'animate-[pulse_1s_infinite]' : ''}
                />
              ))}
            </svg>

            <div className="absolute inset-0 p-8 flex items-center justify-center">
              {/* Technical Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                    animate={{ 
                      y: [null, Math.random() * -50 - 20, null],
                      opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    className="absolute text-blue-500/20 font-mono text-[80px] font-black select-none"
                  >
                    {i % 2 === 0 ? "1010" : "0101"}
                  </motion.div>
                ))}
              </div>

              {/* Central Switch - Realistic Cisco Design */}
              <div className="relative z-10 group">
                {/* Rack Ears */}
                <div className="absolute -left-4 top-2 bottom-2 w-4 bg-slate-800 rounded-l-sm border-r border-slate-600 flex flex-col justify-around py-4 items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner"></div>
                </div>
                <div className="absolute -right-4 top-2 bottom-2 w-4 bg-slate-800 rounded-r-sm border-l border-slate-600 flex flex-col justify-around py-4 items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner"></div>
                </div>

                <motion.div 
                  animate={step === 2 ? { 
                    rotate: [0, -0.2, 0.2, -0.2, 0.2, 0], 
                    scale: [1, 1.01, 1],
                    boxShadow: ["0px 10px 40px rgba(0,0,0,0.8)", "0px 15px 60px rgba(59,130,246,0.3)", "0px 10px 40px rgba(0,0,0,0.8)"]
                  } : { boxShadow: "0px 10px 40px rgba(0,0,0,0.8)" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 1 }}
                  className="w-56 h-28 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-t border-slate-500 rounded-sm flex flex-col items-center justify-center relative overflow-hidden ring-1 ring-black/50 shadow-2xl"
                >
                   {/* Realistic Metallic Front Panel Elements */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                   
                   {/* Ports Layout */}
                   <div className="grid grid-cols-6 gap-2 mb-2 bg-black/60 p-2 rounded border border-white/5 shadow-inner">
                      {[...Array(12)].map((_, i) => {
                        const portNum = i + 1;
                        const isSource = portNum === 2;
                        const isDest = forwardedPorts.includes(`Fa0/${portNum}`) || (portNum === 3 && activeScenario.dest === 'AA-BB-CC-DD-EE-FF');
                        return (
                          <div key={i} className="flex flex-col items-center gap-1">
                             <div className={`w-1.5 h-1.5 rounded-full border border-black/50 transition-colors duration-300 ${
                               (step === 1 && isSource) ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]' : 
                               (step === 3 && isDest) ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-slate-700'
                             }`}></div>
                             <div className="w-4 h-3 bg-slate-900 border border-slate-700 rounded-sm"></div>
                          </div>
                        )
                      })}
                   </div>

                   <div className="flex items-center gap-2">
                     <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded leading-none">Catalyst 2960-X</span>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-green-500/50"></div>
                     </div>
                   </div>

                   {/* Vent Grills visual */}
                   <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around py-2 opacity-20">
                      {[1,2,3,4,5].map(i => <div key={i} className="h-px bg-white w-full"></div>)}
                   </div>
                   <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around py-2 opacity-20">
                      {[1,2,3,4,5].map(i => <div key={i} className="h-px bg-white w-full"></div>)}
                   </div>
                   
                   {/* Processing Visual Feedback Overlay */}
                   <AnimatePresence>
                     {step === 2 && (
                       <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-500/10 flex items-center justify-center backdrop-blur-[2px]"
                       >
                         <motion.div
                           animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                           transition={{ repeat: Infinity, duration: 1.5 }}
                           className="absolute w-20 h-20 bg-blue-500/30 rounded-full"
                         />
                         <div className="relative font-black text-[10px] text-blue-400 bg-black/80 px-2 py-1 rounded border border-blue-400/30 flex items-center gap-2">
                           <RefreshCw size={10} className="animate-spin" /> CPU_SAT_SCAN
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </motion.div>
              </div>

              {/* Devices and Dynamic Cables */}
              {DEVICES.map((dev) => {
                 const isSource = dev.p === 'Fa0/2';
                 const isForwarded = forwardedPorts.includes(dev.p);
                 
                 return (
                   <div key={dev.p} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${dev.x}%`, top: `${dev.y}%` }}>
                     {/* Dynamic Cable Glow */}
                     <AnimatePresence>
                       {(isSource && step === 1) && (
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <motion.div
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 300, opacity: [0, 0.5, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                              style={{ 
                                transform: `rotate(${Math.atan2(50-dev.y, 50-dev.x) * 180 / Math.PI}deg)`,
                                transformOrigin: 'left center'
                              }}
                              className="h-1 bg-gradient-to-r from-blue-400 to-transparent blur-sm"
                            />
                         </div>
                       )}
                       {(isForwarded && step === 3) && (
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <motion.div
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 300, opacity: [0, 0.5, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                              style={{ 
                                transform: `rotate(${Math.atan2(50-dev.y, 50-dev.x) * 180 / Math.PI + 180}deg)`,
                                transformOrigin: 'left center'
                              }}
                              className="h-1 bg-gradient-to-r from-unicordoba-gold to-transparent blur-sm"
                            />
                         </div>
                       )}
                     </AnimatePresence>

                     <div className="flex flex-col items-center">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          animate={isForwarded ? { 
                            scale: [1, 1.15, 1], 
                            y: [0, -8, 0],
                            boxShadow: ["0px 0px 0px rgba(234,179,8,0)", "0px 0px 30px rgba(234,179,8,0.4)", "0px 0px 0px rgba(234,179,8,0)"]
                          } : {}}
                          className={`p-5 rounded-2xl border-2 transition-all duration-500 relative cursor-pointer
                          ${isSource ? 'border-blue-500 bg-slate-800/80 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.25)]' : 
                            isForwarded ? 'border-unicordoba-gold bg-slate-800/80 text-unicordoba-gold' : 
                            'border-slate-700 bg-slate-800/50 text-slate-500'}
                        `}>
                           <dev.icon size={32} />
                           {/* Activity LED */}
                           <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 shadow-sm ${isSource || isForwarded ? 'bg-green-400 animate-pulse' : 'bg-slate-700'}`}></div>
                        </motion.div>
                        <div className="mt-4 text-center bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm shadow-lg">
                           <p className="text-[11px] font-black text-white uppercase leading-none tracking-tighter">{dev.label}</p>
                           <p className="text-[9px] font-mono text-slate-400 mt-1">{dev.p}</p>
                        </div>
                      </div>

                      {/* Packets with Advanced Motion */}
                     <AnimatePresence>
                       {step === 1 && isSource && (
                         <motion.div
                           initial={{ left: '0%', top: '0%', scale: 0, rotate: -45 }}
                           animate={{ left: `${50 - dev.x}%`, top: `${50 - dev.y}%`, scale: 1.2, rotate: 0 }}
                           transition={{ duration: 1.2, ease: "backOut" }}
                           className="absolute z-30 flex flex-col items-center"
                         >
                            <div className="bg-blue-500 text-white p-1.5 rounded shadow-2xl ring-2 ring-white/20">
                               <Mail size={16} />
                            </div>
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-black/80 text-white text-[7px] px-2 py-0.5 rounded mt-1 whitespace-nowrap font-mono"
                            >
                               L2 PDU Origen: ...33:44
                            </motion.div>
                         </motion.div>
                       )}
                       {step === 3 && isForwarded && (
                         <motion.div
                            initial={{ left: `${50 - dev.x}%`, top: `${50 - dev.y}%`, scale: 0.8 }}
                            animate={{ left: '0%', top: '0%', scale: 1.2 }}
                            transition={{ duration: 1, ease: "circOut", delay: 0.1 }}
                            whileHover={{ scale: 1.4 }}
                            className="absolute z-30 flex flex-col items-center"
                         >
                            <div className="bg-unicordoba-gold text-green-950 p-1.5 rounded shadow-2xl ring-2 ring-white/20">
                               <Mail size={16} />
                            </div>
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              className="bg-black/80 text-white text-[7px] px-2 py-0.5 rounded mt-1 whitespace-nowrap font-mono"
                            >
                               Destino: {activeScenario.dest.slice(-5)}
                            </motion.div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 )
              })}
           </div>

           {/* Console Bar Overlay */}
           <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 font-mono text-[10px] flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 </div>
                 <div className="w-px h-4 bg-white/10 mx-2"></div>
                 <Terminal size={14} className="text-green-500" />
                 <span className="text-green-400 font-bold">{activeScenario.desc}</span>
              </div>
              <div className="flex gap-4 text-slate-500 font-bold uppercase tracking-widest text-[8px]">
                 <span className={step === 1 ? 'text-blue-400' : ''}>1. Ingreso</span>
                 <span className={step === 2 ? 'text-blue-400' : ''}>2. Lógica</span>
                 <span className={step === 3 ? 'text-blue-400' : ''}>3. Salida</span>
              </div>
           </div>
        </div>

        {/* SAT Table and Real-time Console */}
        <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
           {/* Detailed Console Log Area */}
           <div className="bg-slate-900 rounded-2xl shadow-2xl flex-1 flex flex-col border border-slate-700 overflow-hidden">
              <div className="bg-slate-800 p-3 border-b border-slate-700 flex items-center gap-2">
                 <Terminal size={12} className="text-slate-400" />
                 <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-400">System IOS Monitor</h4>
              </div>
              <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] text-green-400/90 space-y-2 no-scrollbar scroll-smooth">
                 {consoleLogs.map((log, i) => (
                   <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={i} 
                    className="flex gap-2 border-b border-white/5 pb-1 last:border-0"
                   >
                      <span className="opacity-30 flex-shrink-0">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                      <span className="leading-relaxed">{log}</span>
                   </motion.div>
                 ))}
                 <div className="w-2 h-3 bg-green-500 animate-pulse inline-block align-middle ml-1"></div>
              </div>
           </div>

           {/* Control Button Section */}
           <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xl space-y-3">
             {!isDone ? (
                  <button 
                    onClick={nextStep}
                    disabled={isLearning}
                    className="w-full btn-primary py-5 text-base flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 group"
                  >
                     {step === 0 ? 'Iniciar Simulación' : step === 1 ? 'Analizar SAT' : 'Liberar Trama'}
                     <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => resetSim()} className="w-full py-4 border-2 border-unicordoba-green text-unicordoba-green font-black rounded-xl text-xs hover:bg-unicordoba-green/5 flex items-center justify-center gap-2 transition-all">
                       <RefreshCw size={14} /> Repetir Escenario
                    </button>
                    <button onClick={onNext} className="w-full btn-gold py-4 text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95">
                       Continuar Lección <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              <div className="px-2 pt-2">
                <p className="text-[9px] text-slate-400 text-center font-medium leading-tight">Interactúa con el switch para visualizar el comportamiento de la capa 2 en tiempo real.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
