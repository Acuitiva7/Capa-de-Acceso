import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Trophy, 
  RotateCcw, 
  Award,
  AlertCircle
} from 'lucide-react';

export default function QuizModule({ onPass, onShowCertificate }: { onPass: () => void, onShowCertificate: () => void }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleOptionClick = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      if (score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0) >= QUIZ_QUESTIONS.length * 0.75) {
        onPass();
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const finalScore = score;
    const total = QUIZ_QUESTIONS.length;
    const percent = (finalScore / total) * 100;
    const passed = percent >= 75;

    return (
      <div className="flex flex-col items-center text-center py-12 space-y-8">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className={`w-32 h-32 rounded-full flex items-center justify-center ${passed ? 'bg-unicordoba-green text-white shadow-lg shadow-unicordoba-green/30' : 'bg-red-100 text-red-600'}`}
        >
          {passed ? <Trophy size={60} /> : <AlertCircle size={60} />}
        </motion.div>

        <header className="space-y-2">
           <h2 className="text-4xl font-black text-slate-900">{passed ? '¡Felicidades!' : 'Sigue Intentándolo'}</h2>
           <p className="text-xl text-slate-500">
             Has obtenido un <span className={`font-bold ${passed ? 'text-unicordoba-green' : 'text-red-500'}`}>{percent}%</span> ({finalScore} de {total})
           </p>
        </header>

        {passed ? (
          <div className="flex flex-col gap-4 w-full max-w-sm">
             <button id="btn-get-cert" onClick={onShowCertificate} className="btn-gold flex items-center justify-center gap-2 py-4 text-lg">
                <Award size={24} /> Ver mi Certificado
             </button>
             <button onClick={resetQuiz} className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center justify-center gap-1">
                <RotateCcw size={14} /> Repetir Cuestionario
             </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-sm">
             <p className="text-slate-500 text-sm">Necesitas al menos 75% para obtener el certificado de la Universidad de Córdoba.</p>
             <button onClick={resetQuiz} className="border-2 bg-transparent border-unicordoba-green text-unicordoba-green hover:bg-unicordoba-green/5 font-bold rounded-lg flex items-center justify-center gap-2 py-4 text-lg">
                <RotateCcw size={24} /> Reintentar Cuestionario
             </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-unicordoba-green uppercase tracking-widest mb-1">Evaluación Final</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Validación de Conocimientos</h2>
        </div>
        <p className="text-slate-400 font-mono text-sm leading-none flex items-center gap-2">
           Pregunta <span className="text-lg font-bold text-slate-700">{currentQuestionIdx + 1}</span> / {QUIZ_QUESTIONS.length}
        </p>
      </header>

      <div className="card min-h-[400px] flex flex-col justify-between">
         <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 leading-snug">
               {currentQuestion.text}
            </h3>

            <div className="grid gap-3">
               {currentQuestion.options.map((option, idx) => {
                 const isCorrect = idx === currentQuestion.correctAnswer;
                 const isSelected = idx === selectedOption;
                 
                 let variant = "bg-white border-slate-200 text-slate-700 hover:border-unicordoba-green/50 hover:shadow-md";
                 
                 if (showResult) {
                   if (isCorrect) {
                     variant = "bg-green-50 border-green-600 text-green-900 font-bold shadow-lg shadow-green-100 z-10";
                   } else if (isSelected) {
                     variant = "bg-red-50 border-red-600 text-red-900 shadow-md shadow-red-100 opacity-90";
                   } else {
                     variant = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                   }
                 }

                 return (
                   <motion.button
                     id={`opt-${idx}`}
                     key={idx}
                     disabled={showResult}
                     onClick={() => handleOptionClick(idx)}
                     initial={false}
                     animate={showResult ? (
                       isCorrect ? { scale: [1, 1.03, 1] } : 
                       isSelected ? { x: [-4, 4, -4, 4, 0] } : {}
                     ) : {}}
                     transition={{ duration: 0.4 }}
                     className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between group ${variant} relative overflow-hidden`}
                   >
                     <span className="relative z-10">{option}</span>
                     
                     <AnimatePresence>
                       {showResult && isCorrect && (
                         <motion.div 
                           initial={{ scale: 0, opacity: 0, rotate: -20 }}
                           animate={{ scale: 1, opacity: 1, rotate: 0 }}
                           className="flex items-center gap-2 text-green-700"
                         >
                           <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Correcto</span>
                           <CheckCircle2 size={22} fill="currentColor" className="text-green-100" />
                           <CheckCircle2 size={22} className="absolute text-green-600" />
                         </motion.div>
                       )}
                       {showResult && isSelected && !isCorrect && (
                         <motion.div 
                           initial={{ scale: 0, opacity: 0, rotate: 20 }}
                           animate={{ scale: 1, opacity: 1, rotate: 0 }}
                           className="flex items-center gap-2 text-red-700"
                         >
                           <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Incorrecto</span>
                           <XCircle size={22} fill="currentColor" className="text-red-100" />
                           <XCircle size={22} className="absolute text-red-600" />
                         </motion.div>
                       )}
                     </AnimatePresence>

                     {showResult && isCorrect && (
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                        />
                     )}
                   </motion.button>
                 );
               })}
            </div>
         </div>

         <AnimatePresence>
           {showResult && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-8 space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Explicación</p>
                   <p className="text-sm text-slate-600 italic">"{currentQuestion.explanation}"</p>
                </div>
                <button id="btn-next-q" onClick={nextQuestion} className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                   {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? 'Finalizar' : 'Siguiente Pregunta'} <ChevronRight size={20} />
                </button>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
