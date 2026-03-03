'use client';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import TopBar from '@/components/ui/TopBar';
import SidePanel from '@/components/ui/SidePanel';
import PresentationStepper from '@/components/PresentationStepper';

const SceneCanvas = dynamic(() => import('@/components/SceneCanvas'), { ssr: false });

function WebGLCheck({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!ctx);
    } catch {
      setSupported(false);
    }
  }, []);

  if (supported === null) {
    return <div className="flex items-center justify-center h-screen text-gray-400">Cargando...</div>;
  }
  if (!supported) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-red-400 mb-2">WebGL no disponible</h1>
          <p className="text-gray-400">Tu navegador no soporta WebGL. Prueba con Chrome, Firefox o Edge modernos.</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showPresentation } = useStore();

  return (
    <WebGLCheck>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-950">
        <TopBar canvasRef={canvasRef} />
        <div className="flex flex-1 overflow-hidden relative">
          <div className="flex-1 relative">
            <SceneCanvas canvasRef={canvasRef} />
          </div>
          <SidePanel />
          {showPresentation && <PresentationStepper />}
        </div>
      </div>
    </WebGLCheck>
  );
}
