export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'content' | 'sim' | 'quiz' | 'credits';
  icon: string;
}

export const SECTIONS: Section[] = [
  { id: 'intro', title: 'Introducción', type: 'content', icon: 'BookOpen' },
  { id: 'encapsulation', title: 'Encapsulación', type: 'content', icon: 'Layers' },
  { id: 'frame-anatomy', title: 'Anatomía de la Trama', type: 'sim', icon: 'Activity' },
  { id: 'mac-address', title: 'Direccionamiento MAC', type: 'sim', icon: 'Hash' },
  { id: 'switch-logic', title: 'Lógica del Switch', type: 'sim', icon: 'Cpu' },
  { id: 'traffic-types', title: 'Tipos de Tráfico', type: 'content', icon: 'Share2' },
  { id: 'quiz', title: 'Cuestionario Final', type: 'quiz', icon: 'FileCheck' },
  { id: 'credits', title: 'Créditos', type: 'credits', icon: 'Info' },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: '¿Cuál es el propósito del campo FCS en una trama Ethernet?',
    options: [
      'Identificar el protocolo de capa superior',
      'Detectar errores de transmisión mediante CRC',
      'Sincronizar el reloj del receptor',
      'Especificar la dirección MAC de destino'
    ],
    correctAnswer: 1,
    explanation: 'El FCS (Frame Check Sequence) utiliza una comprobación de redundancia cíclica (CRC) para verificar si la trama sufrió daños durante el transporte.'
  },
  {
    id: 2,
    text: '¿Cuántos bits tiene una dirección MAC de Ethernet?',
    options: [
      '32 bits',
      '48 bits',
      '64 bits',
      '128 bits'
    ],
    correctAnswer: 1,
    explanation: 'Una dirección MAC consta de 48 bits (6 bytes), expresados en formato hexadecimal.'
  },
  {
    id: 3,
    text: '¿Qué hace un switch cuando recibe una trama con una dirección MAC de destino desconocida?',
    options: [
      'Descarta la trama inmediatamente',
      'La envía únicamente por el puerto Fa0/1',
      'Inunda la trama por todos los puertos activos (exceptuando el de origen)',
      'Envía un mensaje de error ICMP al emisor'
    ],
    correctAnswer: 2,
    explanation: 'Este proceso se conoce como inundación (flooding); el switch envía la trama por todos los puertos para intentar localizar al destinatario.'
  },
  {
    id: 4,
    text: '¿Qué parte de la dirección MAC identifica al fabricante del hardware?',
    options: [
      'El Identificador del Dispositivo',
      'Los últimos 24 bits',
      'El OUI (Identificador Único de Organización)',
      'El Preámbulo'
    ],
    correctAnswer: 2,
    explanation: 'El OUI son los primeros 3 bytes (24 bits) y son asignados por el IEEE a cada fabricante.'
  }
];
