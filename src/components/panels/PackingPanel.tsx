'use client';
import { useStore } from '@/store/useStore';
import Slider from '../ui/Slider';

export default function PackingPanel() {
  const { packingLevel, setPackingLevel } = useStore();

  const stage =
    packingLevel < 20 ? 'Hélice libre' :
    packingLevel < 55 ? 'Nucleosomas (H2A, H2B, H3, H4)' :
    packingLevel < 85 ? 'Fibra de cromatina 30nm' :
    'Cromosoma condensado';

  return (
    <div>
      <h2 className="font-bold text-purple-400 mb-3 uppercase text-xs tracking-widest">Empaquetamiento</h2>
      <Slider label="Nivel de empaquetamiento" value={packingLevel} min={0} max={100} step={1} onChange={setPackingLevel} unit="%" />

      <div className="mt-2 p-2 bg-purple-950/30 border border-purple-800/30 rounded text-xs">
        <div className="text-purple-300 font-bold">{stage}</div>
      </div>

      <div className="mt-3 text-gray-400 text-xs leading-relaxed space-y-1">
        <div><span className="text-gray-200">0%:</span> ADN libre en doble hélice</div>
        <div><span className="text-gray-200">20-55%:</span> Nucleosomas: ~147 pb enrolladas en octámero de histonas</div>
        <div><span className="text-gray-200">55-85%:</span> Fibra 30nm: solenoide o zigzag</div>
        <div><span className="text-gray-200">85-100%:</span> Cromosoma metafásico (condensación máxima)</div>
      </div>

      <div className="mt-3 p-2 bg-gray-900 rounded text-xs text-gray-500">
        <span className="text-green-400">✓ Científico:</span> Jerarquía real de empaquetamiento del genoma. Representación visual simplificada.
      </div>
    </div>
  );
}
