'use client';
import { useStore } from '@/store/useStore';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';

export default function EinsteinPanel() {
  const { einMass, setEinMass, einScale, setEinScale, einIntensity, setEinIntensity, showGeodesics, setShowGeodesics } = useStore();

  return (
    <div>
      <h2 className="font-bold text-indigo-400 mb-3 uppercase text-xs tracking-widest">Espacio Einstein</h2>

      <div className="mb-3 p-2 bg-yellow-950/20 border border-yellow-700/30 rounded text-xs text-yellow-400">
        ⚠ Modelo didáctico inspirado en relatividad general. No es simulación científica exacta de curvatura espacio-temporal.
      </div>

      <Slider label="Masa central" value={einMass} min={0.1} max={5} step={0.1} onChange={setEinMass} />
      <Slider label="Escala" value={einScale} min={5} max={20} step={0.5} onChange={setEinScale} />
      <Slider label="Intensidad curvatura" value={einIntensity} min={0} max={1} step={0.01} onChange={setEinIntensity} />
      <Toggle label="Mostrar geodésicas" value={showGeodesics} onChange={setShowGeodesics} />

      <div className="mt-3 text-gray-400 text-xs leading-relaxed">
        La curvatura representa el pozo gravitatorio de Schwarzschild simplificado. Las geodésicas son trayectorias de luz en campo gravitatorio (aproximadas).
      </div>
    </div>
  );
}
