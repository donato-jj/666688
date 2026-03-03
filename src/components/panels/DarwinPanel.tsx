'use client';
import { useStore } from '@/store/useStore';
import Slider from '../ui/Slider';
import { BASE_COLORS } from '@/lib/colors';

export default function DarwinPanel() {
  const { mutationRate, setMutationRate, triggerMutation, mutationHistory } = useStore();

  return (
    <div>
      <h2 className="font-bold text-green-400 mb-3 uppercase text-xs tracking-widest">Darwin: Variación</h2>

      <div className="mb-3 p-2 bg-green-950/20 border border-green-700/30 rounded text-xs text-green-300">
        Narrativa evolutiva: mutaciones aleatorias (sustitución de bases) como metáfora de variación. La &quot;selección&quot; es visual. No replica evolución real.
      </div>

      <Slider label="Tasa de mutación" value={mutationRate} min={0.01} max={0.5} step={0.01} onChange={setMutationRate} />

      <button
        onClick={triggerMutation}
        className="w-full py-1.5 bg-green-800 hover:bg-green-700 rounded text-xs font-bold mb-3"
      >
        🧬 Aplicar mutación
      </button>

      <div>
        <div className="text-gray-500 text-xs mb-1">Historial (últimas 10):</div>
        <div className="space-y-0.5 max-h-32 overflow-y-auto">
          {mutationHistory.slice(-10).reverse().map((m, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono">
              <span className="text-gray-500">#{m.index}</span>
              <span style={{ color: BASE_COLORS[m.from] }}>{m.from}</span>
              <span className="text-gray-500">→</span>
              <span style={{ color: BASE_COLORS[m.to] }}>{m.to}</span>
            </div>
          ))}
          {mutationHistory.length === 0 && <div className="text-gray-600">Sin mutaciones</div>}
        </div>
      </div>
    </div>
  );
}
