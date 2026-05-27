import { motion } from 'motion/react';
import { Mail, GraduationCap, Link2, BookOpen, Award, Shield, User, Heart } from 'lucide-react';
import unicorLogo from '../assets/logo_unicordoba.jpg';
import profileImg from '../assets/img_profile.jpeg';
import ciscoLogo from '../assets/cisco.png';

export default function Credits() {
  return (
    <div className="space-y-10 py-4">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-1 bg-unicordoba-green rounded-full"></div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0c623d] font-black">Equipo de Desarrollo</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Créditos</h2>
        <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
          Este recurso didáctico e interactivo ha sido desarrollado en el marco académico de la Licenciatura en Informática.
        </p>
      </header>

      {/* Main Grid: Creator Profile and Institution Details */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Creator Identity Hero Card: Spans 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
          >
            {/* Top decorative gradient bar with university colors */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-unicordoba-green via-unicordoba-gold to-[#0c623d]"></div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Creator Photo with Elegant Framing and Ring Animation */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-unicordoba-green to-unicordoba-gold rounded-2xl rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                  <img 
                    src={profileImg} 
                    alt="Andrea C. Cuitiva" 
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                {/* Active LED badge */}
                <div className="absolute -bottom-1 -right-1 bg-unicordoba-green text-white p-1 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                  <Award size={14} />
                </div>
              </div>

              {/* Creator Metadata */}
              <div className="space-y-2 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unicordoba-green/10 text-unicordoba-green-dark text-xs font-bold">
                  <User size={12} /> Creadora del Contenido
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Andrea C. Cuitiva</h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Licenciatura en Informática • Universidad de Córdoba</p>
                <div className="h-px bg-slate-100 my-2"></div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;Nuestra misión es transformar conceptos técnicos complejos como la encapsulación ethernet en laboratorios visuales e intuitivos que empoderen a los futuros educadores de la región.&rdquo;
                </p>
              </div>
            </div>

            {/* Profile Contact and Details Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-unicordoba-green shrink-0">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Contacto Directo</p>
                  <p className="text-[11px] text-slate-400">acuitivagomez26@correo.unicordoba.edu.co</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-unicordoba-green shrink-0">
                  <GraduationCap size={14} />
                </div>
                <div>
                  <p className="font-bold text-slate-700">Facultad</p>
                  <p className="text-[11px] text-slate-400">Educación y Ciencias Humanas</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Institutional Banner */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200 flex items-center gap-5">
            <img src={unicorLogo} alt="Escudo Universidad de Córdoba" className="h-16 w-16 object-contain shrink-0 bg-white p-2.5 rounded-xl shadow-sm border border-slate-200" />
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Universidad de Córdoba</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Este simulador es un producto académico del programa de Licenciatura en Informática, diseñado como recurso didáctico interactivo para el estudio práctico de las redes informáticas en Montería, Córdoba, Colombia.
              </p>
            </div>
          </div>
        </div>

        {/* References and Licensing Information side: Spans 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reference Card Cisco */}
          <section className="space-y-3">
            <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter text-sm">
              <BookOpen size={18} className="text-unicordoba-green" />
              Fuentes de Contenido
            </h4>
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Este simulador fue adaptado didáctica y experimentalmente basándose en los lineamientos curriculares y el contenido teórico oficial de:
              </p>
              
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                  <img src={ciscoLogo} alt="Cisco" className="w-8 object-contain" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-950">Cisco Networking Academy</h5>
                  <p className="text-[11px] text-slate-500 font-mono font-semibold">Curso: Introduction to Networks (v7.0)</p>
                </div>
              </div>

              <div className="flex gap-2 text-[10px] text-slate-400 font-mono">
                <Link2 size={12} className="text-slate-400 shrink-0 mt-0.5" />
                <span>Modulo 7: Conmutación Ethernet (Ethernet Switching)</span>
              </div>
            </div>
          </section>

          {/* Legal / Copyright Card */}
          <section className="space-y-3">
            <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tighter text-sm">
              <Shield size={18} className="text-[#0c623d]" />
              Aviso Legal y Derechos de Autor
            </h4>
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-xl border border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed">
                Este simulador tiene fines exclusivamente formativos y académicos. Alude a marcas registradas como <strong className="text-white">Cisco®</strong>, <strong className="text-white">Cisco Networking Academy®</strong> y <strong className="text-white">Catalyst®</strong> únicamente para contextos informativos de simulación docente conforme a las normativas de propiedad intelectual y de uso legítimo con fines educativos en Colombia.
              </p>
              <div className="h-px bg-slate-800"></div>
              <p className="text-[10px] text-slate-400 leading-normal flex items-center gap-1.5">
                <Heart size={10} className="text-rose-500 fill-rose-500" />
                <span>Montería, Colombia • Universidad de Córdoba © 2026. Todos los derechos reservados.</span>
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

