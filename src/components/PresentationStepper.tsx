'use client';
import { useStore } from '@/store/useStore';
import { ActiveTab, CameraPreset } from '@/types';

interface StepConfig {
  title: string;
  description: string;
  tab: ActiveTab;
  preset: CameraPreset;
  packing: number;
}

const STEPS: StepConfig[] = [
  {
    title: 'Nucleótidos',
    description: 'Los nucleótidos son las unidades básicas del ADN: fosfato + desoxirribosa + base nitrogenada (A, T, C o G).',
    tab: 'dna',
    preset: 'dna',
    packing: 0,
  },
  {
    title: 'Doble Hélice',
    description: 'Watson y Crick (1953): dos cadenas antiparalelas unidas por enlaces de hidrógeno entre pares complementarios A-T y C-G.',
    tab: 'dna',
    preset: 'dna',
    packing: 0,
  },
  {
    title: 'Nucleosomas',
    description: 'El ADN se enrolla ~1.65 veces alrededor de un octámero de histonas, formando el nucleosoma ("collar de perlas").',
    tab: 'packing',
    preset: 'dna',
    packing: 35,
  },
  {
    title: 'Cromosoma',
    description: 'Empaquetamiento máximo: fibra de cromatina → bucles → cromosoma visible en mitosis.',
    tab: 'packing',
    preset: 'chromosome',
    packing: 95,
  },
  {
    title: 'Célula',
    description: 'El ADN se encuentra en el núcleo celular, rodeado por membrana nuclear. La célula contiene organelos con funciones específicas.',
    tab: 'dna',
    preset: 'cell',
    packing: 95,
  },
  {
    title: 'Universo (Metáfora)',
    description: 'Inspirado en relatividad general de Einstein: la masa curva el espacio-tiempo. NOTA: Modelo didáctico, no simulación exacta.',
    tab: 'einstein',
    preset: 'universe',
    packing: 0,
  },
  {
    title: 'Conclusión',
    description: `El ADN es la molécula portadora de información genética en todos los seres vivos conocidos. Su estructura de doble hélice permite la replicación fiel y la transcripción. El empaquetamiento jerárquico organiza ~2 metros de ADN en un núcleo de ~6 micrómetros.\n\nEsta app mezcla ciencia real (ADN, empaquetamiento) con metáforas visuales (vacío, Einstein). La ciencia es verificable; las metáforas son didácticas/artísticas.`,
    tab: 'academic',
    preset: 'universe',
    packing: 0,
  },
];

export default function PresentationStepper() {
  const {
    presentationStep,
    setPresentationStep,
    setShowPresentation,
    setActiveTab,
    setCameraPreset,
    setPackingLevel,
    setShowCell,
  } = useStore();

  const step = STEPS[Math.min(presentationStep, STEPS.length - 1)];

  const go = (s: number) => {
    const target = STEPS[s];
    if (!target) return;
    setPresentationStep(s);
    setActiveTab(target.tab);
    setCameraPreset(target.preset);
    setPackingLevel(target.packing);
    setShowCell(target.preset === 'cell');
  };

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-950 border border-gray-700 rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-xs">{presentationStep + 1} / {STEPS.length}</span>
          <button onClick={() => setShowPresentation(false)} className="text-gray-500 hover:text-white text-sm">✕ Cerrar</button>
        </div>

        <h2 className="text-xl font-bold text-blue-400 mb-3">{step.title}</h2>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{step.description}</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => go(presentationStep - 1)}
            disabled={presentationStep === 0}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-40 text-sm"
          >
            ← Anterior
          </button>

          <div className="flex gap-1 items-center">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`w-2 h-2 rounded-full ${i === presentationStep ? 'bg-blue-400' : 'bg-gray-600'}`}
              />
            ))}
          </div>

          {presentationStep < STEPS.length - 1 ? (
            <button onClick={() => go(presentationStep + 1)} className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm">
              Siguiente →
            </button>
          ) : (
            <button onClick={() => setShowPresentation(false)} className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded text-sm">
              Finalizar ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
