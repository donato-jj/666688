'use client';
import { useStore } from '@/store/useStore';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';

export default function VoidPanel() {
  const { voidIntensity, setVoidIntensity, voidParticleMode, setVoidParticleMode, voidParticleDensity, setVoidParticleDensity } = useStore();

  return (
    <div>
      <h2 className="font-bold text-cyan-400 mb-3 uppercase text-xs tracking-widest">Genoma del Vacío</h2>

      <div className="mb-3 p-2 bg-yellow-950/20 border border-yellow-700/30 rounded text-xs text-yellow-400">
        ⚠ Metáfora artística: &quot;Genoma del vacío&quot; no es un concepto científico validado. Representación visual/didáctica.
      </div>

      <Slider label="Intensidad FBM" value={voidIntensity} min={0} max={1} step={0.01} onChange={setVoidIntensity} />
      <Toggle label="Modo partículas" value={voidParticleMode} onChange={setVoidParticleMode} />
      {voidParticleMode && (
        <Slider label="Densidad" value={voidParticleDensity} min={100} max={2000} step={100} onChange={setVoidParticleDensity} />
      )}

      <div className="mt-3 text-gray-400 text-xs leading-relaxed">
        Campo procedimental basado en ruido FBM (Fractional Brownian Motion). Inspira visualmente la idea de fluctuaciones cuánticas del vacío.
      </div>
    </div>
  );
}
