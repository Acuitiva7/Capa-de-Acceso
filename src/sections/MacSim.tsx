import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ShieldCheck, Globe, Cpu, Hash, Share2, Check, X, AlertTriangle, HelpCircle } from 'lucide-react';

export default function MacSim({ onNext }: { onNext: () => void }) {
  const [isHoveredOUI, setIsHoveredOUI] = useState(false);
  const [isHoveredNIC, setIsHoveredNIC] = useState(false);

  // Interactive Live Validator State
  const [macInput, setMacInput] = useState('');
  
  // Clean all characters except A-F, a-f, 0-9
  const cleanMac = macInput.replace(/[^a-fA-F0-9]/g, '');
  const has12HexDigits = cleanMac.length === 12;
  const hasInvalidChars = /[^a-fA-F0-9:\-\.]/.test(macInput);
  
  // Standard format patterns
  const colonPattern = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;
  const hyphenPattern = /^([0-9A-Fa-f]{2}[-]){5}([0-9A-Fa-f]{2})$/;
  const dotPattern = /^[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}$/;
  const flatPattern = /^[0-9A-Fa-f]{12}$/;
  
  const isValidFormat = colonPattern.test(macInput) || 
                        hyphenPattern.test(macInput) || 
                        dotPattern.test(macInput) || 
                        flatPattern.test(macInput);

  const isValidMac = isValidFormat && !hasInvalidChars && has12HexDigits;

  // Extracted segments if valid/partially valid for visualization
  const parsedOUI = cleanMac.slice(0, 6).toUpperCase();
  const parsedNIC = cleanMac.slice(6, 12).toUpperCase();

  const formattedParsedOUI = parsedOUI ? parsedOUI.match(/.{1,2}/g)?.join('-') : '';
  const formattedParsedNIC = parsedNIC ? parsedNIC.match(/.{1,2}/g)?.join('-') : '';

  // Common UI Manufacturers list based on typed OUI
  const getManufacturer = (oui: string) => {
    const prefix = oui.slice(0, 6).toUpperCase();
    if (prefix.startsWith('000A8A') || prefix.startsWith('001A2B') || prefix.startsWith('00270D')) return 'Cisco Systems';
    if (prefix.startsWith('001422') || prefix.startsWith('7054D2')) return 'Dell Inc.';
    if (prefix.startsWith('001A73')) return 'Apple Inc.';
    if (prefix.startsWith('0050B6')) return 'Intel Corporation';
    if (prefix.startsWith('E0D9E3')) return 'Huawei Technologies';
    if (prefix.trim() === '') return '';
    return 'Fabricante Genérico (IEEE)';
  };

  const detectedManufacturer = getManufacturer(cleanMac);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Dissección de la Etiqueta de Envío</h2>
        <p className="text-slate-600">La Dirección MAC es la huella digital física de cada tarjeta de red (NIC).</p>
      </header>

      {/* Dissection Block */}
      <div className="flex flex-col items-center py-12 bg-white rounded-3xl shadow-inner border border-slate-200">
        <div className="text-5xl font-mono font-black tracking-widest text-slate-900 flex gap-2">
          <motion.span 
            onMouseEnter={() => setIsHoveredOUI(true)}
            onMouseLeave={() => setIsHoveredOUI(false)}
            className={`cursor-help transition-colors duration-300 ${isHoveredOUI ? 'text-blue-600' : ''}`}
          >
            00-1A-2B
          </motion.span>
          <span className="text-slate-300">-</span>
          <motion.span 
            onMouseEnter={() => setIsHoveredNIC(true)}
            onMouseLeave={() => setIsHoveredNIC(false)}
            className={`cursor-help transition-colors duration-300 ${isHoveredNIC ? 'text-orange-600' : ''}`}
          >
            3C-4D-5E
          </motion.span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full px-12 mt-12">
          <motion.div 
            animate={{ scale: isHoveredOUI ? 1.05 : 1, opacity: isHoveredNIC ? 0.3 : 1 }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${isHoveredOUI ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-slate-100 bg-slate-50'}`}
          >
            <div className="flex items-center gap-3 mb-4 text-blue-700">
              <Globe size={24} />
              <h4 className="font-black uppercase tracking-tight">OUI</h4>
            </div>
            <p className="font-bold text-slate-900 text-sm mb-2">Identificador Único de Organización</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              3 bytes (24 bits). Asignado por el IEEE al fabricante del hardware (Ej: Cisco, Intel, Realtek).
            </p>
          </motion.div>

          <motion.div 
            animate={{ scale: isHoveredNIC ? 1.05 : 1, opacity: isHoveredOUI ? 0.3 : 1 }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${isHoveredNIC ? 'border-orange-600 bg-orange-50 shadow-lg' : 'border-slate-100 bg-slate-50'}`}
          >
            <div className="flex items-center gap-3 mb-4 text-orange-700">
              <Cpu size={24} />
              <h4 className="font-black uppercase tracking-tight">Identificador del Dispositivo</h4>
            </div>
            <p className="font-bold text-slate-900 text-sm mb-2">Número de Serie del Hardware</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              3 bytes (24 bits). Número de serie único asignado por el fabricante a esa pieza específica.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interactive MAC Validator and Dissector */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-unicordoba-green uppercase font-black">Laboratorio Interactivo</span>
              <h3 className="text-xl font-black uppercase tracking-tight">Analizador y Validador en Tiempo Real</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setMacInput('00:1A:2B:3C:4D:5E')}
                className="bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
              >
                Cargar Demo Cisco
              </button>
              <button 
                onClick={() => setMacInput('70-54-D2-AF-99-CC')}
                className="bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
              >
                Cargar Demo Dell
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-start">
            {/* Input Box */}
            <div className="md:col-span-3 space-y-4">
              <div className="relative">
                <input 
                  type="text"
                  value={macInput}
                  onChange={(e) => setMacInput(e.target.value)}
                  placeholder="Introduce una MAC (Ej: 00:1A:2B:3C:4D:5E)"
                  className={`w-full bg-black/50 border-2 font-mono text-xl tracking-wider p-4 pr-12 rounded-xl text-white placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                    macInput === '' ? 'border-slate-700 focus:border-blue-500' :
                    isValidMac ? 'border-green-500 focus:border-green-500 ring-4 ring-green-500/10' :
                    'border-red-500 focus:border-red-500 ring-4 ring-red-500/10'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <AnimatePresence mode="wait">
                    {macInput === '' ? (
                      <motion.div key="none" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <HelpCircle className="text-slate-500" size={24} />
                      </motion.div>
                    ) : isValidMac ? (
                      <motion.div key="valid" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-green-500 text-slate-950 p-1 rounded-full">
                        <Check size={18} className="stroke-[3]" />
                      </motion.div>
                    ) : (
                      <motion.div key="invalid" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-red-500 text-white p-1 rounded-full">
                        <X size={18} className="stroke-[3]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Requirement Checklist */}
              <div className="bg-black/30 rounded-2xl p-4 border border-slate-800 space-y-3">
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Reglas de validación física</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    {has12HexDigits ? (
                      <Check size={14} className="text-green-400 stroke-[3]" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-500">1</div>
                    )}
                    <span className={has12HexDigits ? 'text-green-400 font-medium' : 'text-slate-400'}>
                      Posee exactamente 48 bits (12 dígitos hexadecimales)
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 ml-auto">({cleanMac.length}/12)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!hasInvalidChars && macInput.length > 0 ? (
                      <Check size={14} className="text-green-400 stroke-[3]" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-500">2</div>
                    )}
                    <span className={(!hasInvalidChars && macInput.length > 0) ? 'text-green-400 font-medium' : 'text-slate-400'}>
                      Solo caracteres hexadecimales (0-9, A-F) y separadores permitidos
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isValidFormat ? (
                      <Check size={14} className="text-green-400 stroke-[3]" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-500">3</div>
                    )}
                    <span className={isValidFormat ? 'text-green-400 font-medium' : 'text-slate-400'}>
                      Formato de estructura válido (Ej: XX:XX:XX o XX-XX-XX)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis & Real-Time Breakdown Screen (Visual Representation) */}
            <div className="md:col-span-2 h-full">
              <div className="bg-black/40 h-full rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block mb-3">CONSOLA DE DISSECCIÓN DE HARDWARE</span>
                  
                  {macInput === '' ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-slate-500">
                      <Cpu size={32} className="opacity-30 mb-2 animate-pulse" />
                      <p className="text-[11px]">Esperando dirección MAC...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Interactive Visual Breakdown */}
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-center">
                        <div className="text-[10px] text-slate-500 mb-1 flex justify-around">
                          <span>OUI (Fabricante)</span>
                          <span>BIA (Dispositivo)</span>
                        </div>
                        <div className="flex justify-center items-center gap-1 font-bold text-sm">
                          <span className={parsedOUI.length > 0 ? 'text-blue-400 border-b-2 border-blue-400/50 pb-0.5' : 'text-slate-600'}>
                            {formattedParsedOUI || '??-??-??'}
                          </span>
                          <span className="text-slate-700">-</span>
                          <span className={parsedNIC.length > 0 ? 'text-orange-400 border-b-2 border-orange-400/50 pb-0.5' : 'text-slate-600'}>
                            {formattedParsedNIC || '??-??-??'}
                          </span>
                        </div>
                      </div>

                      {/* Manufacturer Info Card */}
                      <AnimatePresence>
                        {parsedOUI.length >= 6 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-950 p-3 rounded-lg border border-blue-500/20 text-[11px] space-y-1"
                          >
                            <p className="text-slate-400 uppercase text-[9px] font-black tracking-wider">Fabricación Identificada</p>
                            <p className="text-blue-400 font-bold">{detectedManufacturer}</p>
                            <p className="text-slate-500 text-[10px] italic">Organización (OUI): {parsedOUI.slice(0, 6)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>ESTADO:</span>
                  <span className={`font-mono font-bold ${isValidMac ? 'text-green-400 animate-pulse' : macInput === '' ? 'text-slate-500' : 'text-red-400'}`}>
                    {isValidMac ? '● DISPOSITIVO VÁLIDO' : macInput === '' ? '○ EN ESPERA' : '▲ COMPORTAMIENTO RUINOSO'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { icon: ShieldCheck, title: 'Grabada en ROM', desc: 'Conocida como BIA (Burned-In Address), es inmutable.' },
          { icon: Hash, title: 'Formato Hexadecimal', desc: 'Se expresa usando base 16 (0-9 y A-F).' },
          { icon: Globe, title: 'Alcance Local', desc: 'Solo tiene significado dentro de su red LAN.' },
          { icon: Share2, title: 'Broadcast', desc: 'FF:FF:FF:FF:FF:FF es la dirección para todos.' },
        ].map((pilar, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-unicordoba-green/30 hover:bg-unicordoba-green/5 transition-all">
            <div className="text-unicordoba-green">
              <pilar.icon size={20} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-800">{pilar.title}</h5>
              <p className="text-xs text-slate-500 leading-tight">{pilar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button id="btn-next-switch" onClick={onNext} className="btn-primary flex items-center gap-2">
          Entrar al Centro de Clasificación (Switch) <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
