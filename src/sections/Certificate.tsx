import { useState } from 'react';
import { Award, ChevronLeft, Download, Printer, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import unicorLogo from '../assets/logo_unicordoba.jpg';

export default function Certificate({ onBack }: { onBack: () => void }) {
  const [studentName, setStudentName] = useState('');
  
  const today = new Date().toLocaleDateString('es-CO', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-8 print:p-0">
      {/* Configuration Hub - No Print */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-unicordoba-green font-bold transition-all self-start">
             <ChevronLeft size={20} /> Volver al Curso
          </button>
          
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="btn-primary flex items-center gap-2 shadow-lg shadow-unicordoba-green/20">
               <Printer size={18} /> Imprimir / Guardar PDF
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <User size={12} className="text-unicordoba-green" /> 
            Nombre Completo del Estudiante
          </label>
          <div className="relative max-w-lg">
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Escribe tu nombre para personalizar el diploma (Ej: Juan Pérez Martínez)"
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-unicordoba-green focus:outline-none rounded-xl px-4 py-3 text-sm transition-all"
            />
            {studentName === '' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-500 font-bold flex items-center gap-1 animate-pulse">
                <Sparkles size={12} /> Personalizar
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Diplomatic Masterpiece */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-[1.414/1] w-full bg-white relative p-12 md:p-16 shadow-2xl border-[16px] border-double border-unicordoba-green overflow-hidden ring-1 ring-slate-200"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-[8px] border-l-[8px] border-unicordoba-gold m-4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-[8px] border-r-[8px] border-unicordoba-gold m-4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[8px] border-l-[8px] border-unicordoba-gold m-4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[8px] border-r-[8px] border-unicordoba-gold m-4 pointer-events-none" />
        
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <img src={unicorLogo} alt="" className="w-[500px]" />
        </div>

        <div className="h-full border-4 border-unicordoba-green/20 rounded flex flex-col items-center justify-between py-10 relative z-10">
          <header className="text-center space-y-2">
             <div className="flex justify-center items-center gap-4 mb-2">
               <img src={unicorLogo} alt="Logo Unicordoba" className="h-16 object-contain" />
               <div className="h-10 w-px bg-slate-200"></div>
               <img src="https://www.cisco.com/c/dam/en_us/about/ac123/ac147/img/cisco-logo.png" alt="Cisco Reference" className="h-10 opacity-70 object-contain" />
             </div>
             <h4 className="text-lg md:text-xl font-bold text-slate-800 tracking-[0.25em] uppercase">Universidad de Córdoba</h4>
             <p className="text-xs font-semibold text-unicordoba-green tracking-[0.15em] uppercase">Facultad de Educación y Ciencias Humanas • Licenciatura en Informática</p>
          </header>

          <div className="text-center space-y-4 my-4">
             <p className="text-slate-400 font-serif italic text-lg leading-none">Otorga el presente</p>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">Diploma de Aprobación</h1>
             
             <div className="py-2">
               <p className="text-slate-400 text-xs font-serif italic mb-1">A:</p>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-unicordoba-green tracking-wide min-h-[46px] border-b border-dashed border-slate-200 max-w-lg mx-auto pb-1 px-4">
                 {studentName || 'Estudiante de Informática'}
               </h2>
             </div>

             <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
               Por haber demostrado suficiencia y completado de modo excepcional el simulador interactivo de
               <br />
               <span className="font-extrabold text-slate-800">Módulo 7: Conmutación Ethernet</span>
               <span className="text-xs text-slate-500 block mt-1 font-medium">
                 Adaptado curricularmente bajo estándares de Cisco Networking Academy (Introduction to Networks v7.0)
               </span>
             </p>
          </div>

          <footer className="w-full px-12 md:px-16 grid grid-cols-3 gap-6 items-end">
             {/* Signature left */}
             <div className="text-center space-y-1">
                <div className="font-serif italic text-sm text-blue-600/70 h-8 flex items-center justify-center select-none font-bold">
                  Dra. María Claudia Gómez
                </div>
                <div className="h-px bg-slate-300 w-full" />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Director de Programa</p>
                <p className="text-[7px] text-slate-400">Licenciatura en Informática</p>
             </div>
             
             {/* Center Badge */}
             <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-unicordoba-gold/10 rounded-full flex items-center justify-center text-unicordoba-gold border-2 border-unicordoba-gold/30 mb-2 shadow-inner">
                   <Award size={28} className="animate-pulse" />
                </div>
                <p className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">Cod: UNICOR-NET7-{studentName ? 'VALID' : 'DEMO'}</p>
             </div>

             {/* Right Signature / Date */}
             <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-800 font-serif h-8 flex items-center justify-center">{today}</p>
                <div className="h-px bg-slate-300 w-full" />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fecha de Emisión</p>
                <p className="text-[7px] text-slate-400">Montería, Córdoba, Colombia</p>
             </div>
          </footer>
        </div>
      </motion.div>

      <div className="card bg-blue-50 border-blue-200 no-print">
         <p className="text-sm text-blue-700 flex items-center gap-2">
            <Download size={16} /> 
            <strong>Consejo Oficial:</strong> Para descargar este diploma como PDF de alta calidad, haz clic en el botón <strong>Imprimir / Guardar PDF</strong>, y en la ventana del navegador elige la impresora de destino <strong>"Guardar como PDF"</strong>. Asegúrate de activar <strong>"Gráficos de fondo"</strong> para conservar los colores y el logo institucional.
         </p>
      </div>
    </div>
  );
}
