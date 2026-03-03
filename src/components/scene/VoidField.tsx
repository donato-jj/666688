'use client';
import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

const VoidMaterial = shaderMaterial(
  { uTime: 0, uIntensity: 0.5 },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv * 4.0 + uTime * 0.05;
    float f = fbm(uv);
    vec3 col = mix(vec3(0.02, 0.02, 0.1), vec3(0.1, 0.3, 0.6), f * uIntensity);
    gl_FragColor = vec4(col, 0.3 * uIntensity);
  }
  `
);

extend({ VoidMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    voidMaterial: JSX.IntrinsicElements['shaderMaterial'] & {
      uTime?: number;
      uIntensity?: number;
    };
  }
}

export default function VoidField() {
  const { voidIntensity, voidParticleMode, voidParticleDensity } = useStore();
  const matRef = useRef<THREE.ShaderMaterial & { uTime: number; uIntensity: number }>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(voidParticleDensity * 3);
    for (let i = 0; i < voidParticleDensity; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [voidParticleDensity]);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
      matRef.current.uIntensity = voidIntensity;
    }
    if (particlesRef.current && voidParticleMode) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {!voidParticleMode && (
        <mesh position={[0, 0, -8]} scale={[20, 20, 1]}>
          <planeGeometry args={[1, 1, 32, 32]} />
          <voidMaterial ref={matRef} transparent side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {voidParticleMode && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={voidParticleDensity}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={voidIntensity} sizeAttenuation />
        </points>
      )}
    </group>
  );
}
