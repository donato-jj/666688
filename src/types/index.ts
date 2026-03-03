export type BaseType = 'A' | 'T' | 'C' | 'G';
export type QualityLevel = 'auto' | 'low' | 'high';
export type CameraPreset = 'dna' | 'chromosome' | 'cell' | 'universe';
export type ActiveTab = 'dna' | 'packing' | 'void' | 'einstein' | 'darwin' | 'academic' | 'methodology';

export interface BasePair {
  index: number;
  base1: BaseType;
  base2: BaseType;
  position: number;
}

export interface MutationEvent {
  index: number;
  from: BaseType;
  to: BaseType;
  timestamp: number;
}

export interface AppState {
  // DNA
  basePairCount: number;
  dnaRadius: number;
  dnaPitch: number;
  showLabels: boolean;
  examMode: boolean;
  sequence: BaseType[];
  mutationRate: number;
  mutationHistory: MutationEvent[];

  // Packing
  packingLevel: number;

  // Void
  voidIntensity: number;
  voidParticleMode: boolean;
  voidParticleDensity: number;

  // Einstein
  einMass: number;
  einScale: number;
  einIntensity: number;
  showGeodesics: boolean;

  // Cell
  showCell: boolean;

  // UI
  quality: QualityLevel;
  activeTab: ActiveTab;
  cameraPreset: CameraPreset;
  fps: number;
  showPresentation: boolean;
  presentationStep: number;

  // Actions
  setBasePairCount: (n: number) => void;
  setDnaRadius: (r: number) => void;
  setDnaPitch: (p: number) => void;
  setShowLabels: (v: boolean) => void;
  setExamMode: (v: boolean) => void;
  setMutationRate: (r: number) => void;
  triggerMutation: () => void;
  setPackingLevel: (l: number) => void;
  setVoidIntensity: (i: number) => void;
  setVoidParticleMode: (v: boolean) => void;
  setVoidParticleDensity: (d: number) => void;
  setEinMass: (m: number) => void;
  setEinScale: (s: number) => void;
  setEinIntensity: (i: number) => void;
  setShowGeodesics: (v: boolean) => void;
  setShowCell: (v: boolean) => void;
  setQuality: (q: QualityLevel) => void;
  setActiveTab: (t: ActiveTab) => void;
  setCameraPreset: (p: CameraPreset) => void;
  setFps: (fps: number) => void;
  setShowPresentation: (v: boolean) => void;
  setPresentationStep: (s: number) => void;
  resetScene: () => void;
  exportReport: () => void;
}
