'use client';
import { useStore } from '@/store/useStore';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import { BASE_COLORS } from '@/lib/colors';

export default function DNAPanel() {
  const {
    basePairCount, setBasePairCount,
    dnaRadius, setDnaRadius,
    dnaPitch, setDnaPitch,
    showLabels, setShowLabels,
    examMode, setExamMode,
    sequence,
  } = useStore();

  return (
    <div>
      <h2 className="font-bold text-blue-400 mb-3 uppercase text-xs tracking-widest">ADN Helix</h2>
      <Slider label="Pares de bases" value={basePairCount} min={20} max={200} step={1} onChange={setBasePairCount} />
      <Slider label="Radio (Å)" value={dnaRadius} min={0.5} max={3} step={0.1} onChange={setDnaRadius} />
      <Slider label="Pitch (Å)" value={dnaPitch} min={1} max={6} step={0.1} onChange={setDnaPitch} />
      <Toggle label="Mostrar etiquetas" value={showLabels} onChange={setShowLabels} />
      <Toggle label="Modo examen" value={examMode} onChange={setExamMode} />

      <div className="mt-4">
        <div className="text-gray-500 mb-1 uppercase text-xs">Leyenda de bases</div>
        {(['A', 'T', 'C', 'G'] as const).map(base => (
          <div key={base} className="flex items-center gap-2 mb-1">
            <span style={{ color: BASE_COLORS[base] }} className="font-bold font-mono">{base}</span>
            <span className="text-gray-400">
              {base === 'A' ? 'Adenina (par: T)' :
               base === 'T' ? 'Timina (par: A)' :
               base === 'C' ? 'Citosina (par: G)' : 'Guanina (par: C)'}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2 bg-gray-900 rounded text-gray-500 text-xs leading-relaxed">
        <span className="text-green-400">✓ Científico:</span> Doble hélice, pares Watson-Crick (A-T, C-G), backbone azúcar-fosfato.
      </div>

      <div className="mt-2 text-gray-500 text-xs">
        Primeras 10 bases: <span className="font-mono text-gray-300">{sequence.slice(0, 10).join('')}</span>
      </div>
    </div>
  );
}
