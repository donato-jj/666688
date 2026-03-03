'use client';
import { useStore } from '@/store/useStore';
import { ActiveTab } from '@/types';
import DNAPanel from '../panels/DNAPanel';
import PackingPanel from '../panels/PackingPanel';
import VoidPanel from '../panels/VoidPanel';
import EinsteinPanel from '../panels/EinsteinPanel';
import DarwinPanel from '../panels/DarwinPanel';
import AcademicPanel from '../panels/AcademicPanel';
import MethodologyPanel from '../panels/MethodologyPanel';

const TABS: { id: ActiveTab; label: string }[] = [
  { id: 'dna', label: 'ADN' },
  { id: 'packing', label: 'Packing' },
  { id: 'void', label: 'Vacío' },
  { id: 'einstein', label: 'Einstein' },
  { id: 'darwin', label: 'Darwin' },
  { id: 'academic', label: 'Académico' },
  { id: 'methodology', label: 'Metodología' },
];

const PANEL_MAP: Record<ActiveTab, React.ComponentType> = {
  dna: DNAPanel,
  packing: PackingPanel,
  void: VoidPanel,
  einstein: EinsteinPanel,
  darwin: DarwinPanel,
  academic: AcademicPanel,
  methodology: MethodologyPanel,
};

export default function SidePanel() {
  const { activeTab, setActiveTab } = useStore();
  const ActivePanel = PANEL_MAP[activeTab];

  return (
    <div className="w-64 bg-gray-950 border-l border-gray-800 flex flex-col text-xs text-gray-200 overflow-y-auto">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-800">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-1 rounded text-xs ${activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <ActivePanel />
      </div>
    </div>
  );
}
