'use client';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function EinsteinSpace() {
  const { einMass, einScale, einIntensity, showGeodesics } = useStore();
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(einScale * 2, einScale * 2, 40, 40);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      const dip = -einMass * einIntensity / (r + 0.5);
      pos.setY(i, Math.max(-einMass * 2, dip));
    }
    geo.computeVertexNormals();
    return geo;
  }, [einMass, einScale, einIntensity]);

  const geodesicObjects = useMemo(() => {
    if (!showGeodesics) return [];
    return Array.from({ length: 6 }, (_, g) => {
      const angle = (g / 6) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let t = 0; t <= 40; t++) {
        const dist = (t / 40) * einScale;
        const x = Math.cos(angle + dist * 0.1) * dist;
        const z = Math.sin(angle + dist * 0.1) * dist;
        const r = Math.sqrt(x * x + z * z);
        const y = -einMass * einIntensity / (r + 0.5) + 0.05;
        points.push(new THREE.Vector3(x, y, z));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.6 });
      return new THREE.Line(lineGeo, lineMat);
    });
  }, [showGeodesics, einMass, einScale, einIntensity]);

  return (
    <group position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#1e3a5f"
          wireframe
          opacity={0.4}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {geodesicObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}
