import { useState, useRef } from 'react';
import { Award, ChevronLeft, Download, Printer, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import unicorLogo from '../assets/logo_unicordoba.jpg';
import ciscoLogo from '../assets/cisco.png';

export default function Certificate({ onBack }: { onBack: () => void }) {
  const [studentName, setStudentName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const today = new Date().toLocaleDateString('es-CO', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const downloadCertificateImage = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      // Small delay to ensure any layout changes/fonts settle
      await new Promise((resolve) => setTimeout(resolve, 150));
      
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1.0,
        pixelRatio: 3, // Super high resolution
        backgroundColor: '#ffffff',
        width: 840,
        height: 594,
        style: {
          transform: 'none',
          transformOrigin: 'unset',
          margin: '0',
          position: 'relative',
          left: '0',
          top: '0',
        }
      });
      
      const link = document.createElement('a');
      link.download = `Certificado_Net7_${studentName.trim().replace(/\s+/g, '_') || 'Estudiante'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al generar la imagen del certificado:', err);
      alert('Hubo un inconveniente al generar la imagen. Puedes usar la opción de Imprimir o Guardar en PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8 print:p-0">
      {/* Configuration Hub - No Print */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-unicordoba-green font-bold transition-all self-start">
             <ChevronLeft size={20} /> Volver al Curso
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={downloadCertificateImage} 
              disabled={isDownloading}
              className="px-4 py-2.5 bg-unicordoba-green hover:bg-[#0a4d30] disabled:bg-slate-300 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-unicordoba-green/20 transition-all font-bold text-sm cursor-pointer disabled:cursor-not-allowed"
            >
               {isDownloading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               ) : (
                  <Download size={18} />
               )}
               {isDownloading ? 'Generando Imagen...' : 'Descargar como Imagen (PNG)'}
            </button>
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
              placeholder="Escribe tu nombre completo para el diploma..."
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-unicordoba-green focus:outline-none rounded-xl pl-4 pr-24 py-3 text-sm transition-all"
            />
            {studentName === '' && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-500 font-bold flex items-center gap-1 animate-pulse pointer-events-none select-none">
                <Sparkles size={12} /> Personalizar
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Diplomatic Masterpiece Container - prevents squishing on small screens */}
      <div className="w-full overflow-x-auto pb-6 scrollbar-thin no-print">
        <motion.div 
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-[840px] h-[594px] bg-white relative p-12 shadow-2xl border-[16px] border-double border-unicordoba-green overflow-hidden ring-1 ring-slate-200 mx-auto shrink-0 print:shadow-none print:border-[16px]"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] border-unicordoba-gold m-3 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] border-unicordoba-gold m-3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] border-unicordoba-gold m-3 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] border-unicordoba-gold m-3 pointer-events-none" />
          
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
             <img src={unicorLogo} alt="" className="w-[450px]" />
          </div>

          <div className="h-full border-4 border-unicordoba-green/20 rounded flex flex-col items-center justify-between py-6 relative z-10">
            <header className="text-center space-y-1.5">
               <div className="flex justify-center items-center gap-4 mb-2">
                 <img src={unicorLogo} alt="Logo Unicordoba" className="h-14 object-contain" />
                 <div className="h-8 w-px bg-slate-200"></div>
                 <img src={ciscoLogo} alt="Cisco Reference" className="h-8 opacity-70 object-contain" />
               </div>
               <h4 className="text-lg font-bold text-slate-800 tracking-[0.25em] uppercase">Universidad de Córdoba</h4>
               <p className="text-[10px] font-semibold text-unicordoba-green tracking-[0.15em] uppercase">Facultad de Educación y Ciencias Humanas • Licenciatura en Informática</p>
            </header>

            <div className="text-center space-y-3 my-2 w-full">
               <p className="text-slate-400 font-serif italic text-base leading-none">Otorga el presente</p>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">Diploma de Aprobación</h1>
               
               <div className="py-1">
                 <p className="text-slate-450 text-[11px] font-serif italic mb-0.5">A:</p>
                 <h2 className={`${studentName.length > 25 ? 'text-lg md:text-xl' : 'text-2xl'} font-serif font-bold text-unicordoba-green tracking-wide min-h-[38px] border-b border-dashed border-slate-200 max-w-xl mx-auto pb-1 px-4 truncate`}>
                   {studentName || 'Estudiante de Informática'}
                 </h2>
               </div>

               <p className="text-xs text-slate-655 max-w-xl mx-auto leading-relaxed px-4">
                 Por haber demostrado suficiencia y completado de modo excepcional el simulador interactivo de
                 <br />
                 <span className="font-extrabold text-slate-800 text-sm">Módulo 7: Conmutación Ethernet</span>
                 <span className="text-[10px] text-slate-505 block mt-1 font-medium italic">
                   Adaptado curricularmente bajo estándares de Cisco Networking Academy (Introduction to Networks v7.0)
                 </span>
               </p>
            </div>

            <footer className="w-full px-12 grid grid-cols-3 gap-8 items-end mt-2">
               {/* Signature left */}
               <div className="text-center space-y-1 bg-white/80 p-1 rounded">
                  <div className="font-serif italic text-xs text-slate-600/80 h-6 flex items-center justify-center select-none font-bold">
                    NN
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">Director de Programa</p>
                  <p className="text-[7px] text-slate-400 leading-none mt-0.5">Licenciatura en Informática</p>
               </div>
               
               {/* Center Badge */}
               <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-unicordoba-gold/10 rounded-full flex items-center justify-center text-unicordoba-gold border-2 border-unicordoba-gold/30 mb-1 shadow-inner">
                     <Award size={24} className="animate-pulse" />
                  </div>
                  <p className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Cod: UNICOR-NET7-{studentName ? 'VALID' : 'DEMO'}</p>
               </div>

               {/* Right Signature / Date */}
               <div className="text-center space-y-1 bg-white/80 p-1 rounded">
                  <p className="text-xs font-bold text-slate-800 font-serif h-6 flex items-center justify-center leading-none">{today}</p>
                  <div className="h-px bg-slate-200 w-full" />
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">Fecha de Emisión</p>
                  <p className="text-[7px] text-slate-400 leading-none mt-0.5">Montería, Córdoba, Colombia</p>
               </div>
            </footer>
          </div>
        </motion.div>
      </div>

      {/* Print rendering container (visible ONLY during browser printing) */}
      <div className="hidden print:block print:m-0 print:p-0">
        <div 
          className="w-[1100px] h-[778px] bg-white relative p-16 border-[24px] border-double border-unicordoba-green overflow-hidden mx-auto shrink-0 border-double"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-[8px] border-l-[8px] border-unicordoba-gold m-4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-[8px] border-r-[8px] border-unicordoba-gold m-4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[8px] border-l-[8px] border-unicordoba-gold m-4 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[8px] border-r-[8px] border-unicordoba-gold m-4 pointer-events-none" />
          
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
             <img src={unicorLogo} alt="" className="w-[600px]" />
          </div>

          <div className="h-full border-4 border-unicordoba-green/20 rounded flex flex-col items-center justify-between py-10 relative z-10">
            <header className="text-center space-y-2">
               <div className="flex justify-center items-center gap-6 mb-4">
                 <img src={unicorLogo} alt="Logo Unicordoba" className="h-20 object-contain" />
                 <div className="h-12 w-px bg-slate-300"></div>
                 <img src={ciscoLogo} alt="Cisco Reference" className="h-12 opacity-70 object-contain" />
               </div>
               <h4 className="text-2xl font-bold text-slate-800 tracking-[0.25em] uppercase">Universidad de Córdoba</h4>
               <p className="text-sm font-semibold text-unicordoba-green tracking-[0.15em] uppercase">Facultad de Educación y Ciencias Humanas • Licenciatura en Informática</p>
            </header>

            <div className="text-center space-y-4 my-4 w-full">
               <p className="text-slate-400 font-serif italic text-xl leading-none">Otorga el presente</p>
               <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">Diploma de Aprobación</h1>
               
               <div className="py-2">
                 <p className="text-slate-450 text-sm font-serif italic mb-1">A:</p>
                 <h2 className={`${studentName.length > 25 ? 'text-2xl md:text-2xl' : 'text-3xl'} font-serif font-bold text-unicordoba-green tracking-wide min-h-[48px] border-b border-dashed border-slate-300 max-w-2xl mx-auto pb-1 px-4 truncate`}>
                   {studentName || 'Estudiante de Informática'}
                 </h2>
               </div>

               <p className="text-sm text-slate-655 max-w-2xl mx-auto leading-relaxed">
                 Por haber demostrado suficiencia y completado de modo excepcional el simulador interactivo de
                 <br />
                 <span className="font-extrabold text-slate-800 text-lg">Módulo 7: Conmutación Ethernet</span>
                 <span className="text-xs text-slate-505 block mt-1 font-medium italic">
                   Adaptado curricularmente bajo estándares de Cisco Networking Academy (Introduction to Networks v7.0)
                 </span>
               </p>
            </div>

            <footer className="w-full px-20 grid grid-cols-3 gap-12 items-end mt-4">
               {/* Signature left */}
               <div className="text-center space-y-1">
                  <div className="font-serif italic text-sm text-slate-600/85 h-8 flex items-center justify-center select-none font-bold">
                    NN
                  </div>
                  <div className="h-px bg-slate-350 w-full" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Director de Programa</p>
                  <p className="text-[10px] text-slate-400">Licenciatura en Informática</p>
               </div>
               
               {/* Center Badge */}
               <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-unicordoba-gold/10 rounded-full flex items-center justify-center text-unicordoba-gold border-2 border-unicordoba-gold/30 mb-2 shadow-inner">
                     <Award size={32} className="animate-pulse" />
                  </div>
                  <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">Cod: UNICOR-NET7-{studentName ? 'VALID' : 'DEMO'}</p>
               </div>

               {/* Right Signature / Date */}
               <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-slate-800 font-serif h-8 flex items-center justify-center">{today}</p>
                  <div className="h-px bg-slate-350 w-full" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha de Emisión</p>
                  <p className="text-[10px] text-slate-400">Montería, Córdoba, Colombia</p>
               </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
