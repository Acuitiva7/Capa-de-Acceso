import { motion } from 'motion/react';
import { ChevronRight, Network } from 'lucide-react';

export default function Introduction({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-unicordoba-green text-white text-[10px] font-black uppercase tracking-widest">
          Módulo 7
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
          La Capa de <span className="text-unicordoba-green">Acceso</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
          Cómo se empaqueta, etiqueta y distribuye la información en las redes Ethernet modernas para la Licenciatura en Informática.
        </p>
      </header>

      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef0109583a8e?auto=format&fit=crop&q=80&w=1200" 
          alt="Network Logic" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-end p-10">
          <div className="text-white max-w-md">
            <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">Muelle de Carga Digital</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              La infraestructura Estructurada de Red comienza aquí, donde los datos puros se organizan para su transporte físico.
            </p>
          </div>
        </div>
        {/* Technical overlay elements like in high density theme */}
        <div className="absolute top-6 right-6 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card border-l-4 border-l-unicordoba-green">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-unicordoba-green">
            <Network size={20} />
          La Capa de Acceso
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            La primera capa en la jerarquía de red. Funciona como el puente exclusivo que conecta directamente a los dispositivos finales (hosts) con la infraestructura.
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold mb-3 text-slate-800">Objetivo del Módulo</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2 italic">
              "Entender el proceso de encapsulación y el rol fundamental del Switch en la capa 2 del modelo OSI."
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button id="btn-start-course" onClick={onNext} className="btn-primary flex items-center gap-2 px-8 py-3 shadow-lg shadow-unicordoba-green/20">
          Comenzar Lección <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
