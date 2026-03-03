'use client';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import DNAHelix from './scene/DNAHelix';
import ChromatinPack from './scene/ChromatinPack';
import VoidField from './scene/VoidField';
import EinsteinSpace from './scene/EinsteinSpace';
import CellAssembly from './scene/CellAssembly';
import { CameraPreset } from '@/types';

const CAMERA_POSITIONS: Record<CameraPreset, [number, number, number]> = {
  dna: [0, 0, 8],
  chromosome: [0, 0, 15],
  cell: [0, 0, 12],
  universe: [0, 5, 20],
};

export default function SceneCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
  const { quality, cameraPreset, setFps } = useStore();
  const fpsCounterRef = useRef({ lastTime: performance.now(), fps: 60 });

  const dpr: [number, number] = quality === 'low' ? [0.5, 1] : quality === 'high' ? [1, 2] : [0.5, 1.5];

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.round(fpsCounterRef.current.fps));
    }, 1000);
    return () => clearInterval(interval);
  }, [setFps]);

  const target = new THREE.Vector3(0, 0, 0);

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, antialias: quality !== 'low' }}
      dpr={dpr}
      camera={{ position: CAMERA_POSITIONS[cameraPreset], fov: 60, near: 0.1, far: 1000 }}
      onCreated={({ gl }) => {
        if (canvasRef && 'current' in canvasRef) {
          (canvasRef as React.MutableRefObject<HTMLCanvasElement>).current = gl.domElement;
        }
      }}
      frameloop="always"
    >
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />

      <Suspense fallback={null}>
        <DNAHelix />
        <ChromatinPack />
        <VoidField />
        <EinsteinSpace />
        <CellAssembly />
      </Suspense>

      <OrbitControls target={target} makeDefault />
    </Canvas>
  );
}
