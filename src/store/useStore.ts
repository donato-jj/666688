import { create } from 'zustand';
import { AppState, BaseType, QualityLevel, ActiveTab, CameraPreset, MutationEvent } from '@/types';
import { generateSequence, mutateBase, getComplement } from '@/lib/sequences';

// Suppress unused import warning
void getComplement;

const initialSequence = generateSequence(50);

const defaultState = {
  basePairCount: 50,
  dnaRadius: 1,
  dnaPitch: 3.4,
  showLabels: true,
  examMode: false,
  sequence: initialSequence,
  mutationRate: 0.05,
  mutationHistory: [] as MutationEvent[],
  packingLevel: 0,
  voidIntensity: 0.5,
  voidParticleMode: false,
  voidParticleDensity: 500,
  einMass: 1,
  einScale: 10,
  einIntensity: 0.5,
  showGeodesics: true,
  showCell: false,
  quality: 'auto' as QualityLevel,
  activeTab: 'dna' as ActiveTab,
  cameraPreset: 'dna' as CameraPreset,
  fps: 60,
  showPresentation: false,
  presentationStep: 0,
};

export const useStore = create<AppState>((set, get) => ({
  ...defaultState,

  setBasePairCount: (n) => {
    const seq = generateSequence(n);
    set({ basePairCount: n, sequence: seq });
  },
  setDnaRadius: (r) => set({ dnaRadius: r }),
  setDnaPitch: (p) => set({ dnaPitch: p }),
  setShowLabels: (v) => set({ showLabels: v }),
  setExamMode: (v) => set({ examMode: v }),
  setMutationRate: (r) => set({ mutationRate: r }),
  triggerMutation: () => {
    const { sequence, mutationRate, mutationHistory } = get();
    const newSeq = [...sequence];
    const events: MutationEvent[] = [];
    for (let i = 0; i < newSeq.length; i++) {
      if (Math.random() < mutationRate) {
        const from = newSeq[i];
        const to = mutateBase(from);
        newSeq[i] = to;
        events.push({ index: i, from, to, timestamp: Date.now() });
      }
    }
    set({ sequence: newSeq, mutationHistory: [...mutationHistory, ...events].slice(-50) });
  },

  setPackingLevel: (l) => set({ packingLevel: l }),
  setVoidIntensity: (i) => set({ voidIntensity: i }),
  setVoidParticleMode: (v) => set({ voidParticleMode: v }),
  setVoidParticleDensity: (d) => set({ voidParticleDensity: d }),
  setEinMass: (m) => set({ einMass: m }),
  setEinScale: (s) => set({ einScale: s }),
  setEinIntensity: (i) => set({ einIntensity: i }),
  setShowGeodesics: (v) => set({ showGeodesics: v }),
  setShowCell: (v) => set({ showCell: v }),
  setQuality: (q) => set({ quality: q }),
  setActiveTab: (t) => set({ activeTab: t }),
  setCameraPreset: (p) => set({ cameraPreset: p }),
  setFps: (fps) => set({ fps }),
  setShowPresentation: (v) => set({ showPresentation: v }),
  setPresentationStep: (s) => set({ presentationStep: s }),

  resetScene: () => set({ ...defaultState, sequence: generateSequence(50) }),

  exportReport: () => {
    const state = get();
    const report = {
      timestamp: new Date().toISOString(),
      parameters: {
        dna: {
          basePairCount: state.basePairCount,
          radius: state.dnaRadius,
          pitch: state.dnaPitch,
          sequence: state.sequence.join(''),
          mutationRate: state.mutationRate,
        },
        packing: { level: state.packingLevel },
        void: { intensity: state.voidIntensity, particleMode: state.voidParticleMode },
        einstein: { mass: state.einMass, scale: state.einScale, intensity: state.einIntensity },
      },
      mutationHistory: state.mutationHistory,
      notes: {
        scientific: 'ADN doble hélice, pares Watson-Crick, empaquetamiento nucleosomal',
        metaphor: 'Curvatura Einstein y genoma del vacío son representaciones artísticas/didácticas',
        limitations: 'Modelo 3D simplificado; no es simulación molecularmente exacta',
      },
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));
