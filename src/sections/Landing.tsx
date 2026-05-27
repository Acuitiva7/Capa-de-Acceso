import { motion } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Layers, 
  Activity, 
  Hash, 
  Cpu, 
  Award, 
  Info,
  CheckCircle,
  Sparkles,
  Network
} from 'lucide-react';
import unicorLogo from '../assets/logo_unicordoba.jpg';
import ciscoLogo from '../assets/cisco.png';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  const modules = [
    {
      title: "Anatomía de la Trama",
      desc: "Análisis pormenorizado campo por campo de la trama Ethernet Capa 2.",
      icon: Activity,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Direccionamiento MAC",
      desc: "Desglose de los 48 bits, división en OUI e identificador del dispositivo físico.",
      icon: Hash,
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      title: "Lógica del Switch",
      desc: "Simula el aprendizaje de MACs, reenvío selectivo e inundación en tiempo real.",
      icon: Cpu,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Evaluación & Certificado",
      desc: "Valida tus conocimientos y descarga tu diploma oficial de aprobación.",
      icon: Award,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-unicordoba-green/15 relative overflow-hidden">
      {/* Subtle top decoration */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-unicordoba-green via-unicordoba-gold to-unicordoba-green-light" />
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-6 pt-12 pb-16 flex-1 flex flex-col justify-center relative z-10">
        
        {/* Logos & Context */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md p-2.5 border border-slate-100">
              <img src={unicorLogo} alt="Universidad de Córdoba" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-black tracking-tight text-slate-900 leading-none">Universidad de Córdoba</h2>
              <p className="text-[11px] text-unicordoba-green font-bold uppercase tracking-wider mt-1">Licenciatura en Informática</p>
              <p className="text-[9px] text-slate-400 font-medium font-mono leading-none">Facultad de Educación y Ciencias Humanas</p>
            </div>
          </div>
          
          <div className="h-px w-12 bg-slate-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full">Currículo Integrado</span>
            <img src={ciscoLogo} alt="Cisco Networking Academy" className="h-8 opacity-85 object-contain" />
          </div>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Dynamic Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e6f4ea] border border-[#ceebd6] rounded-full text-unicordoba-green font-bold text-xs">
              <Sparkles size={14} className="animate-spin duration-1000" />
              <span>Módulo Académico Actualizado CCNA v7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight space-y-2">
              <span>Simulador Interactivo de</span><br />
              <span className="text-unicordoba-green bg-clip-text">Conmutación Ethernet</span>
            </h1>

            <p className="text-slate-650 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Explora el funcionamiento lógico de la Capa de Enlace de Datos (Capa 2 del modelo OSI). 
              Aprende cómo se encapsula la información, filtra tramas y toma decisiones un switch utilizando la tabla de direcciones MAC.
            </p>

            {/* Quick stats / bullet highlights */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2 pb-4 text-left">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-unicordoba-green mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Animaciones conceptuales paso a paso de trama en tránsito.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-unicordoba-green mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Simulador en tiempo real de inundación, filtrado y reenvío.</span>
              </div>
            </div>

            {/* Pulsing CTA Action Button */}
            <div className="pt-2">
              <motion.button
                id="btn-iniciar-simulador"
                onClick={onStart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-unicordoba-green hover:bg-unicordoba-green-light text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-unicordoba-green/20 transition-all font-black text-base cursor-pointer group"
              >
                <Play size={20} className="fill-white" />
                <span>INICIAR EXPERIENCIA</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </motion.button>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">Sin registros requeridos • Gratuito • Con Certificación de aprobación</p>
            </div>
          </motion.div>

          {/* Right Preview Bento Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl opacity-10 group-hover:scale-125 transition-transform" />
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 font-bold ${m.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-unicordoba-green transition-colors">{m.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
            
            {/* Visual network badge decorator */}
            <div className="sm:col-span-2 bg-unicordoba-green-dark text-white rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden leading-tight">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                <Network size={120} />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-unicordoba-gold shrink-0 border border-white/10">
                <Network size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-unicordoba-gold uppercase tracking-wider leading-none">Pedagogía Activa</p>
                <p className="text-[11px] text-green-100 mt-1 leading-snug">Metodología adaptada para estudiantes presenciales e independientes en ciencias de la computación.</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Footer credits */}
      <footer className="border-t border-slate-200/60 bg-white/75 backdrop-blur-sm py-6 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-unicordoba-gold rounded-full animate-ping" />
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Desarrollado en el marco académico de la <strong className="text-slate-700">Licenciatura en Informática</strong>.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono text-center md:text-right">
            Universidad de Córdoba © 2026 • Montería, Colombia
          </div>
        </div>
      </footer>
    </div>
  );
}
