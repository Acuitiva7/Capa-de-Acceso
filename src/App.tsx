import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Activity, 
  Hash, 
  Cpu, 
  Share2, 
  FileCheck, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Trophy,
  Download,
  AlertCircle,
  Award,
  CheckCircle2
} from 'lucide-react';
import { SECTIONS, QUIZ_QUESTIONS, Section } from './types';
import unicorLogo from './assets/logo_unicordoba.jpg';

// Components imported below
import Introduction from './sections/Introduction';
import Encapsulation from './sections/Encapsulation';
import FrameSim from './sections/FrameSim';
import MacSim from './sections/MacSim';
import SwitchSim from './sections/SwitchSim';
import TrafficTypes from './sections/TrafficTypes';
import QuizModule from './sections/QuizModule';
import Credits from './sections/Credits';
import Certificate from './sections/Certificate';

const ICON_MAP: any = {
  BookOpen,
  Layers,
  Activity,
  Hash,
  Cpu,
  Share2,
  FileCheck,
  Info
};

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [completedSections, setCompletedSections] = useState<string[]>(['intro']);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleComplete = (id: string) => {
    if (!completedSections.includes(id)) {
      setCompletedSections(prev => [...prev, id]);
    }
  };

  const progress = (completedSections.length / (SECTIONS.length - 1)) * 100;

  const renderContent = () => {
    if (showCertificate) return <Certificate onBack={() => setShowCertificate(false)} />;

    switch (activeSection.id) {
      case 'intro': return <Introduction onNext={() => navigateTo('encapsulation')} />;
      case 'encapsulation': return <Encapsulation onNext={() => navigateTo('frame-anatomy')} />;
      case 'frame-anatomy': return <FrameSim onNext={() => navigateTo('mac-address')} />;
      case 'mac-address': return <MacSim onNext={() => navigateTo('switch-logic')} />;
      case 'switch-logic': return <SwitchSim onNext={() => navigateTo('traffic-types')} />;
      case 'traffic-types': return <TrafficTypes onNext={() => navigateTo('quiz')} />;
      case 'quiz': return <QuizModule onPass={() => { setQuizPassed(true); handleComplete('quiz'); }} onShowCertificate={() => setShowCertificate(true)} />;
      case 'credits': return <Credits />;
      default: return <Introduction onNext={() => {}} />;
    }
  };

  const navigateTo = (id: string) => {
    const section = SECTIONS.find(s => s.id === id);
    if (section) {
      setActiveSection(section);
      handleComplete(id);
      setShowCertificate(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800">
      {/* Sidebar - High Density Dark Theme */}
      <aside className="w-72 bg-unicordoba-green text-white flex flex-col shadow-2xl z-30">
        <div className="p-6 border-b border-unicordoba-green-dark">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border border-white/20">
              <img src={unicorLogo} alt="Universidad de Córdoba" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-white">Universidad de Córdoba</h1>
              <p className="text-[10px] text-green-200 uppercase tracking-widest font-bold">Lic. en Informática</p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-6 pb-2">
          <p className="text-[10px] font-black text-green-300/50 uppercase tracking-widest mb-3 ml-2">Menú de Aprendizaje</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {SECTIONS.filter(s => s.id !== 'credits' && s.id !== 'quiz').map((section) => {
            const Icon = ICON_MAP[section.icon];
            const isActive = activeSection.id === section.id;
            const isCompleted = completedSections.includes(section.id);

            return (
              <button
                id={`nav-${section.id}`}
                key={section.id}
                onClick={() => navigateTo(section.id)}
                className={`w-full sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon size={16} className={isActive ? 'text-unicordoba-gold' : 'text-green-300'} />
                  <span className="truncate">{section.title}</span>
                </div>
                {isCompleted && !isActive && (
                  <CheckCircle2 size={14} className="text-unicordoba-gold" />
                )}
              </button>
            );
          })}

          <div className="my-4 border-t border-unicordoba-green-dark/50"></div>

          {/* Special Action Sections - Quiz and Credits at the end of the menu */}
          {SECTIONS.filter(s => s.id === 'quiz' || s.id === 'credits').map((section) => {
            const Icon = ICON_MAP[section.icon];
            const isActive = activeSection.id === section.id;
            const isQuiz = section.id === 'quiz';
            
            return (
              <button
                key={section.id}
                onClick={() => navigateTo(section.id)}
                className={`w-full sidebar-link ${
                  isActive 
                    ? 'sidebar-link-active' 
                    : isQuiz 
                      ? 'bg-unicordoba-gold text-green-950 hover:bg-unicordoba-gold-light' 
                      : 'sidebar-link-inactive'
                } mt-2`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon size={16} className={isActive ? 'text-unicordoba-gold' : isQuiz ? 'text-green-950' : 'text-green-300'} />
                  <span className={isQuiz ? 'font-bold uppercase tracking-tighter' : ''}>{section.title}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 bg-unicordoba-green-dark border-t border-white/5">
          <div className="text-[10px] leading-tight text-green-100/50 italic">
            Adaptado de Cisco © 2026. Todos los derechos reservados.<br/>
            Montería, Córdoba, Colombia.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-100">
        {/* Persistent High-Density Header */}
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-20">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              {activeSection.title}
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-400 font-bold uppercase tracking-widest">
                Sesión Interactiva
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Módulo 7: Conceptos de Redes - Unicórdoba</p>
          </div>
          
          <div className="w-80 hidden md:block">
            <div className="flex justify-between text-[10px] font-black mb-1 uppercase text-slate-400 px-1">
              <span>Progreso del Curso</span>
              <span className="text-unicordoba-green">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bg">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-unicordoba-green shadow-sm rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-5xl mx-auto py-10 px-10 mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={showCertificate ? 'cert' : activeSection.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Institutional Footer */}
        <footer className="bg-white border-t border-slate-200 px-10 py-4 grid grid-cols-2 gap-8 items-center z-20">
          <div className="text-[10px] text-slate-500 leading-tight">
            <span className="font-bold text-slate-700 uppercase tracking-tighter">Referencias:</span><br />
            Cisco Networking Academy: Introduction to Networks v7.0. Adaptado para la Lic. en Informática.
          </div>
          <div className="text-[10px] text-slate-500 text-right leading-tight">
            <span className="font-bold text-slate-700 uppercase tracking-tighter">Universidad de Córdoba</span><br />
            Facultad de Educación y Ciencias Humanas. Montería, Córdoba.
          </div>
        </footer>
      </main>
    </div>
  );
}
