import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Monitor, Server, Cpu, Router } from 'lucide-react';
import unicorLogo from '../assets/logo_unicordoba.jpg';

interface ImmersiveIntroProps {
  onComplete: () => void;
}

export default function ImmersiveIntro({ onComplete }: ImmersiveIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [currentLog, setCurrentLog] = useState("Inicializando conmutador de datos L2...");

  useEffect(() => {
    // Slower paced progress bar (takes approx 5.5 - 6 seconds for high immersion)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 0.45;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  // Update educational networking steps based on current progress
  useEffect(() => {
    if (progress < 15) {
      setCurrentLog("[INFO] Puerto F0/1 detecta señal eléctrica (Carrier Detect)...");
    } else if (progress < 30) {
      setCurrentLog("[L2 TRAMA] Leyendo preámbulo y delimitador de inicio de trama (SFD)...");
    } else if (progress < 45) {
      setCurrentLog("[APRENDIZAJE] Registrando MAC origen PC-1 (00:0A:12) en Puerto FastEthernet 0/1");
    } else if (progress < 60) {
      setCurrentLog("[TABLA MAC] Dirección destino desconocida. Iniciando Flood (inundación de trama)...");
    } else if (progress < 75) {
      setCurrentLog("[RED] Descartando trama en PC-B y Servidor (MACs no coincidentes)");
    } else if (progress < 88) {
      setCurrentLog("[ROUTER] Router acepta la trama (MAC: 00:FF:AA) y prepara respuesta Unicast...");
    } else {
      setCurrentLog("[LISTO] Canal de datos L2 verificado y optimizado. ¡Iniciando curso!");
    }

    if (progress >= 92) {
      setIsZoomingOut(true);
    }
    if (progress >= 100) {
      const delay = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  // Scales from 1x to 1.35x as simulation boots
  const computedScale = 1 + (progress / 100) * 0.35;

  return (
    <div className="fixed inset-0 bg-[#00170a] text-white flex flex-col justify-between p-6 sm:p-8 select-none z-50 overflow-hidden">
      {/* Deep-green atmospheric terminal radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,81,0.22)_0%,rgba(0,5,2,1)_85%)] pointer-events-none" />
      
      {/* Tech alignment grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-40 mix-blend-overlay" />

      {/* Top Header Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: isZoomingOut ? 0 : 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between w-full max-w-5xl mx-auto relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/15 backdrop-blur-md shadow-md">
            <img src={unicorLogo} alt="Universidad de Córdoba" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00ff87] font-black uppercase block leading-none">Unicórdoba</span>
            <span className="text-[8px] font-mono text-white/45 block mt-0.5 tracking-wider">MODULO DE CONMUTACIÓN DE CAPA 2</span>
          </div>
        </div>
        
        <button
          onClick={onComplete}
          className="text-[10px] font-mono text-green-300 hover:text-white flex items-center gap-1.5 font-bold px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all cursor-pointer border border-[#ceebd6]/10 uppercase tracking-widest"
        >
          Omitir intro &rarr;
        </button>
      </motion.div>

      {/* Main Centered Network Simulation Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* Network Element Area */}
        <motion.div
          animate={{ 
            scale: isZoomingOut ? 2.8 : computedScale,
            opacity: isZoomingOut ? 0 : 1
          }}
          transition={{ 
            scale: isZoomingOut ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0.1 },
            opacity: { duration: 0.45 }
          }}
          className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] flex items-center justify-center"
        >
          
          {/* Animated concentric radar ring overlays to trace signals */}
          <div className="absolute w-[220px] h-[220px] border border-green-500/10 rounded-full animate-ping [animation-duration:4s]" />
          <div className="absolute w-[290px] h-[290px] border border-white/5 rounded-full" />
          <div className="absolute w-[360px] h-[360px] border border-unicordoba-green/10 rounded-full animate-pulse" />
          
          {/* SVG Connector Rays with Dash and animated running packet markers (circles) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
            {/* PC-A <-> Switch Line */}
            <path id="path-pca" d="M 90,90 L 210,210" stroke="rgba(0,143,81,0.22)" strokeWidth="2.5" strokeDasharray="6,4" />
            
            {/* PC-B <-> Switch Line */}
            <path id="path-pcb" d="M 330,90 L 210,210" stroke="rgba(0,143,81,0.22)" strokeWidth="2.5" strokeDasharray="6,4" />

            {/* Servidor <-> Switch Line */}
            <path id="path-server" d="M 90,330 L 210,210" stroke="rgba(0,143,81,0.22)" strokeWidth="2.5" strokeDasharray="6,4" />

            {/* Router <-> Switch Line */}
            <path id="path-router" d="M 330,330 L 210,210" stroke="rgba(0,143,81,0.22)" strokeWidth="2.5" strokeDasharray="6,4" />

            {/* Packet Animations traveling along paths dynamically */}
            {progress > 5 && progress < 90 && (
              <>
                {/* Active PC-A transmitting packet to central Switch */}
                <circle r="4.5" fill="#ffd700" className="filter drop-shadow-[0_0_5px_#ffd700]">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M 90,90 L 210,210" />
                </circle>
                
                {/* Active PC-B receiving packet */}
                <circle r="4" fill="#00ff87" className="filter drop-shadow-[0_0_5px_#00ff87]">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 210,210 L 330,90" />
                </circle>

                {/* Packet travelling to Router response */}
                <circle r="4.5" fill="#00ff87" className="filter drop-shadow-[0_0_5px_#00ff87]">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 210,210 L 330,330" />
                </circle>

                {/* Packet response coming back from Server */}
                <circle r="4" fill="#ffd700" className="filter drop-shadow-[0_0_5px_#ffd700]">
                  <animateMotion dur="1.9s" repeatCount="indefinite" path="M 90,330 L 210,210" />
                </circle>
              </>
            )}
          </svg>

          {/* Central Switch (The Hub) */}
          <div className="absolute z-20">
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0 0 15px rgba(0,143,81,0.3)", 
                  "0 0 45px rgba(0,255,135,0.75)", 
                  "0 0 15px rgba(0,143,81,0.3)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 1.25 }}
              className="w-22 h-22 bg-gradient-to-br from-[#00aa5f] to-[#00381d] rounded-2xl flex flex-col items-center justify-center p-1 border-2 border-[#00ff87] relative group"
            >
              {/* Complex interface coordinate visual rings */}
              <div className="absolute -inset-3 border border-unicordoba-gold/25 rounded-2xl animate-spin [animation-duration:9s] pointer-events-none" />
              <div className="absolute -inset-6 border border-[#00ff87]/15 rounded-2xl animate-spin [animation-duration:14s] pointer-events-none" />

              <Cpu size={28} className="text-unicordoba-gold animate-bounce [animation-duration:2.5s]" />
              <div className="text-[9px] font-mono font-black mt-1 tracking-widest text-green-200">SWITCH_L2</div>
              
              {/* Realistic switch Port indicator blink LEDs */}
              <div className="flex gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse [animation-duration:0.6s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse [animation-duration:0.9s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse [animation-duration:0.4s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse [animation-duration:0.8s]" />
              </div>
            </motion.div>
          </div>

          {/* Peripheral Node 1: PC-A (Top Left) */}
          <div className="absolute left-[35px] top-[45px] sm:left-[50px] sm:top-[50px] z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-950/90 border border-green-500/35 rounded-xl flex items-center justify-center text-white/95 shadow-xl backdrop-blur-sm">
              <Monitor size={18} className="text-green-300" />
            </div>
            <span className="text-[10px] font-mono font-black mt-1.5 text-slate-200 tracking-wider">PC-A</span>
            <span className="text-[8px] font-mono text-green-400/80 font-bold leading-none">00:0A:12</span>
          </div>

          {/* Peripheral Node 2: PC-B (Top Right) */}
          <div className="absolute right-[35px] top-[45px] sm:right-[50px] sm:top-[50px] z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-950/90 border border-green-500/35 rounded-xl flex items-center justify-center text-white/95 shadow-xl backdrop-blur-sm">
              <Monitor size={18} className="text-green-300" />
            </div>
            <span className="text-[10px] font-mono font-black mt-1.5 text-slate-200 tracking-wider">PC-B</span>
            <span className="text-[8px] font-mono text-green-400/80 font-bold leading-none">00:0B:55</span>
          </div>

          {/* Peripheral Node 3: Servidor (Bottom Left) */}
          <div className="absolute left-[35px] bottom-[45px] sm:left-[50px] sm:bottom-[50px] z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-950/90 border border-amber-450/40 rounded-xl flex items-center justify-center text-white/95 shadow-xl backdrop-blur-sm">
              <Server size={18} className="text-unicordoba-gold" />
            </div>
            <span className="text-[10px] font-mono font-black mt-1.5 text-slate-200 tracking-wider">SERVIDOR</span>
            <span className="text-[8px] font-mono text-unicordoba-gold/80 font-bold leading-none">00:1E:C4</span>
          </div>

          {/* Peripheral Node 4: Router (Bottom Right) */}
          <div className="absolute right-[35px] bottom-[45px] sm:right-[50px] sm:bottom-[50px] z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-950/90 border border-green-500/35 rounded-xl flex items-center justify-center text-white/95 shadow-xl backdrop-blur-sm">
              <Router size={18} className="text-green-300" />
            </div>
            <span className="text-[10px] font-mono font-black mt-1.5 text-slate-200 tracking-wider">ROUTER</span>
            <span className="text-[8px] font-mono text-green-400/80 font-bold leading-none">00:FF:AA</span>
          </div>

        </motion.div>

        {/* Dynamic Status / Interactive Console Panel */}
        <motion.div 
          animate={{ opacity: isZoomingOut ? 0 : 1 }}
          className="text-center mt-6 space-y-3.5 max-w-lg w-full px-4"
        >
          {/* Live learning log terminal feedback */}
          <div className="bg-black/40 border border-white/5 shadow-2xl rounded-xl py-3.5 px-5 font-mono text-xs text-left min-h-[58px] flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-green-300 leading-snug break-words">
              {currentLog}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 justify-center">
              <Network size={14} className="text-unicordoba-gold animate-spin [animation-duration:4s]" />
              <span>Inicializando Simulación Académica</span>
            </div>
            
            <div className="flex items-center gap-4 max-w-xs mx-auto pt-1">
              {/* Loader Line wrapper */}
              <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-unicordoba-green to-[#00ff87] rounded-full transition-all duration-75 shadow-[0_0_8px_rgba(0,255,135,0.4)]"
                />
              </div>
              <span className="text-[10px] font-mono text-green-200 font-extrabold">{Math.floor(progress)}%</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer System Credits Block */}
      <motion.div 
        animate={{ opacity: isZoomingOut ? 0 : 0.6 }}
        className="w-full text-center py-2 relative z-10 border-t border-white/5 pt-4 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-[9px] font-mono uppercase tracking-wider"
      >
        <p>Inyección curricular integrada • CCNA v7</p>
        <p>Universidad de Córdoba • Departamento de Informática</p>
      </motion.div>

      {/* Embedded style tag for inline dashboard animations (e.g. running dashes along vector cords) */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
