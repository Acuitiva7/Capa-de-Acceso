import { motion } from 'motion/react';
import { Mail, GraduationCap, Link2, BookOpen } from 'lucide-react';

export default function Credits() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Créditos de Fabricación</h2>
        <p className="text-slate-600">Este recurso educativo fue creado con pasión por la comunidad académica de la Universidad de Córdoba.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="space-y-3">
             <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter text-sm">
                <GraduationCap size={18} className="text-unicordoba-green" />
                Institución
             </h4>
             <div className="card bg-white">
                <p className="font-bold text-slate-900 mb-1">Universidad de Córdoba, Colombia</p>
                <p className="text-sm text-slate-500">Licenciatura en Informática</p>
                <p className="text-xs text-slate-400 mt-2">Montería, Córdoba - 2026</p>
             </div>
          </section>

          <section className="space-y-3">
             <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter text-sm">
                <BookOpen size={18} className="text-unicordoba-green" />
                Fuentes de Contenido
             </h4>
             <div className="card bg-white border-l-4 border-l-unicordoba-green">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Este curso ha sido adaptado didácticamente tomando como base el contenido oficial de:
                </p>
                <div className="mt-4 flex items-center gap-2 font-bold text-slate-900">
                   <div className="w-8 h-8 bg-[#00bceb]/10 rounded flex items-center justify-center">
                      <img src="https://www.cisco.com/c/dam/en_us/about/ac123/ac147/img/cisco-logo.png" alt="Cisco" className="w-6 opacity-80" />
                   </div>
                   Cisco Networking Academy
                </div>
                <p className="text-[10px] text-slate-400 mt-3 font-medium flex items-center gap-1">
                   <Link2 size={10} /> Introduction to Networks v7.0
                </p>
             </div>
          </section>
        </div>

        <div className="space-y-6">
           <section className="space-y-3">
              <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter text-sm">
                 <Mail size={18} className="text-unicordoba-green" />
                 Contacto
              </h4>
              <div className="card bg-white flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">AD</div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 italic">Adaptado para Educación Superior</p>
                       <p className="text-xs text-slate-500">lic.informatica@correo.unicordoba.edu.co</p>
                    </div>
                 </div>
              </div>
           </section>

           <div className="card bg-unicordoba-green text-white">
              <h5 className="font-bold mb-2">Aviso de Copyright</h5>
              <p className="text-xs opacity-80 leading-relaxed">
                Todos los derechos de las marcas mencionadas pertenecen a sus respectivos dueños. Este es un material con fines estrictamente académicos desarrollado para facilitar el aprendizaje de redes de computadoras.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
