'use client';
import { useStore } from '@/store/useStore';
import { CameraPreset, QualityLevel } from '@/types';

interface TopBarProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function TopBar({ canvasRef }: TopBarProps) {
  const { cameraPreset, setCameraPreset, quality, setQuality, fps, resetScene, exportReport, setShowPresentation } = useStore();

  const handleCapture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `scene-${Date.now()}.png`;
    a.click();
  };

  const presets: CameraPreset[] = ['dna', 'chromosome', 'cell', 'universe'];
  const qualities: QualityLevel[] = ['auto', 'low', 'high'];

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-950 border-b border-gray-800 text-xs text-gray-300 overflow-x-auto">
      <span className="font-bold text-blue-400 mr-2 whitespace-nowrap">BioSci 3D</span>

      <div className="flex gap-1">
        {presets.map(p => (
          <button
            key={p}
            onClick={() => setCameraPreset(p)}
            className={`px-2 py-1 rounded text-xs capitalize ${cameraPreset === p ? 'bg-blue-700 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex gap-1 ml-2">
        {qualities.map(q => (
          <button
            key={q}
            onClick={() => setQuality(q)}
            className={`px-2 py-1 rounded text-xs uppercase ${quality === q ? 'bg-green-700 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="ml-2 px-2 py-1 bg-gray-800 rounded font-mono">
        {fps} FPS
      </div>

      <button onClick={resetScene} className="ml-2 px-2 py-1 bg-gray-800 hover:bg-red-900 rounded">
        Reset
      </button>
      <button onClick={handleCapture} className="px-2 py-1 bg-gray-800 hover:bg-blue-900 rounded">
        📷 Capture
      </button>
      <button onClick={exportReport} className="px-2 py-1 bg-gray-800 hover:bg-green-900 rounded">
        📄 Export
      </button>
      <button onClick={() => setShowPresentation(true)} className="px-2 py-1 bg-blue-900 hover:bg-blue-700 rounded">
        🎓 Presentation
      </button>
    </div>
  );
}
