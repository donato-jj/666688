'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function ChromatinPack() {
  const { packingLevel } = useStore();
  const t = packingLevel / 100;

  const showNucleosomes = t > 0.2;
  const showFiber = t > 0.55;
  const showChromosome = t > 0.85;

  const nucleosomeRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!nucleosomeRef.current || !showNucleosomes) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2;
      dummy.position.set(Math.cos(angle) * r, i * 0.5 - 2, Math.sin(angle) * r);
      dummy.scale.setScalar(Math.min(1, (t - 0.2) * 5) * 0.4);
      dummy.updateMatrix();
      nucleosomeRef.current.setMatrixAt(i, dummy.matrix);
    }
    nucleosomeRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {showNucleosomes && (
        <instancedMesh ref={nucleosomeRef} args={[undefined, undefined, 8]}>
          <cylinderGeometry args={[1, 1, 0.5, 16]} />
          <meshStandardMaterial color="#818cf8" opacity={0.85} transparent />
        </instancedMesh>
      )}
      {showFiber && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.2, 8, 32]} />
          <meshStandardMaterial color="#a78bfa" opacity={Math.min(1, (t - 0.55) * 4)} transparent />
        </mesh>
      )}
      {showChromosome && (
        <group>
          <mesh position={[-0.5, 0, 0]}>
            <capsuleGeometry args={[0.3, 2, 8, 16]} />
            <meshStandardMaterial color="#c084fc" opacity={Math.min(1, (t - 0.85) * 7)} transparent />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <capsuleGeometry args={[0.3, 2, 8, 16]} />
            <meshStandardMaterial color="#c084fc" opacity={Math.min(1, (t - 0.85) * 7)} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
}
