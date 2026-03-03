'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

const ORGANELLE_COUNT = 5;

const organelleData = Array.from({ length: ORGANELLE_COUNT }, (_, i) => ({
  angle: (i / ORGANELLE_COUNT) * Math.PI * 2,
  yOffset: Math.sin(i * 0.7) * 0.5,
  size: 0.3 + (i % 3) * 0.1,
  hue: (i * 60) % 360,
}));

export default function CellAssembly() {
  const { showCell } = useStore();
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particleData = useMemo(() => {
    const count = 80;
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ),
      target: new THREE.Vector3().setFromSphericalCoords(
        3.5,
        Math.acos(2 * Math.random() - 1),
        Math.random() * Math.PI * 2
      ),
    }));
  }, []);

  useFrame(() => {
    if (!particlesRef.current || !showCell) return;
    particleData.forEach((p, i) => {
      const dir = p.target.clone().sub(p.position).normalize().multiplyScalar(0.01);
      p.position.add(dir);
      dummy.position.copy(p.position);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      particlesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!showCell) return null;

  return (
    <group>
      {/* Membrane */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Membrane wireframe */}
      <mesh>
        <sphereGeometry args={[4, 16, 16]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.15} wireframe />
      </mesh>

      {/* Organelles */}
      {organelleData.map((o, i) => (
        <mesh key={i} position={[Math.cos(o.angle) * 2, o.yOffset, Math.sin(o.angle) * 2]}>
          <sphereGeometry args={[o.size, 12, 12]} />
          <meshStandardMaterial color={`hsl(${o.hue}, 70%, 60%)`} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleData.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}
