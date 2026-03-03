'use client';
import { useRef, useMemo, useCallback, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { BASE_COLORS_HEX, BACKBONE_COLOR } from '@/lib/colors';
import { helixPosition, helixPosition2 } from '@/lib/math';
import { getComplement } from '@/lib/sequences';
import { BaseType } from '@/types';

interface TooltipInfo {
  position: THREE.Vector3;
  base: BaseType;
  complement: BaseType;
  index: number;
}

export default function DNAHelix() {
  const { sequence, dnaRadius, dnaPitch, showLabels, examMode, packingLevel } = useStore();
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);

  const count = sequence.length;
  const turns = Math.max(2, count / 10);

  const backbone1Ref = useRef<THREE.InstancedMesh>(null);
  const backbone2Ref = useRef<THREE.InstancedMesh>(null);
  const bases1Ref = useRef<THREE.InstancedMesh>(null);
  const bases2Ref = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorsA = useMemo(() => new Float32Array(count * 3), [count]);
  const colorsB = useMemo(() => new Float32Array(count * 3), [count]);

  const packScale = 1 - (packingLevel / 100) * 0.7;

  useFrame(() => {
    if (!backbone1Ref.current || !bases1Ref.current || !backbone2Ref.current || !bases2Ref.current) return;

    for (let i = 0; i < count; i++) {
      const [x1, y1, z1] = helixPosition(i, count, dnaRadius * packScale, dnaPitch, turns);
      const [x2, y2, z2] = helixPosition2(i, count, dnaRadius * packScale, dnaPitch, turns);

      dummy.position.set(x1, y1, z1);
      dummy.scale.setScalar(0.1 * packScale);
      dummy.updateMatrix();
      backbone1Ref.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(x2, y2, z2);
      dummy.updateMatrix();
      backbone2Ref.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(x1, y1, z1);
      dummy.scale.setScalar(0.15 * packScale);
      dummy.updateMatrix();
      bases1Ref.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(x2, y2, z2);
      dummy.updateMatrix();
      bases2Ref.current.setMatrixAt(i, dummy.matrix);

      const c1 = new THREE.Color(BASE_COLORS_HEX[sequence[i]]);
      const c2 = new THREE.Color(BASE_COLORS_HEX[getComplement(sequence[i])]);
      colorsA[i * 3] = c1.r; colorsA[i * 3 + 1] = c1.g; colorsA[i * 3 + 2] = c1.b;
      colorsB[i * 3] = c2.r; colorsB[i * 3 + 1] = c2.g; colorsB[i * 3 + 2] = c2.b;
    }

    backbone1Ref.current.instanceMatrix.needsUpdate = true;
    backbone2Ref.current.instanceMatrix.needsUpdate = true;
    bases1Ref.current.instanceMatrix.needsUpdate = true;
    bases2Ref.current.instanceMatrix.needsUpdate = true;

    if (bases1Ref.current.instanceColor) {
      bases1Ref.current.instanceColor.array.set(colorsA);
      bases1Ref.current.instanceColor.needsUpdate = true;
    }
    if (bases2Ref.current.instanceColor) {
      bases2Ref.current.instanceColor.array.set(colorsB);
      bases2Ref.current.instanceColor.needsUpdate = true;
    }
  });

  const handleClick = useCallback((e: { stopPropagation: () => void; instanceId?: number }, isStrand2: boolean) => {
    e.stopPropagation();
    const idx = e.instanceId;
    if (idx === undefined) return;
    const base = isStrand2 ? getComplement(sequence[idx]) : sequence[idx];
    const complement = isStrand2 ? sequence[idx] : getComplement(sequence[idx]);
    const pos = isStrand2
      ? helixPosition2(idx, count, dnaRadius * packScale, dnaPitch, turns)
      : helixPosition(idx, count, dnaRadius * packScale, dnaPitch, turns);
    setTooltip({ position: new THREE.Vector3(pos[0], pos[1], pos[2]), base, complement, index: idx });
  }, [sequence, count, dnaRadius, dnaPitch, turns, packScale]);

  return (
    <group>
      <instancedMesh ref={backbone1Ref} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={BACKBONE_COLOR} />
      </instancedMesh>

      <instancedMesh ref={backbone2Ref} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={BACKBONE_COLOR} />
      </instancedMesh>

      <instancedMesh ref={bases1Ref} args={[undefined, undefined, count]} onClick={(e) => handleClick(e, false)}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial vertexColors />
      </instancedMesh>

      <instancedMesh ref={bases2Ref} args={[undefined, undefined, count]} onClick={(e) => handleClick(e, true)}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial vertexColors />
      </instancedMesh>

      {tooltip && (
        <Html position={tooltip.position}>
          <div
            className="bg-gray-900 border border-blue-400 rounded p-2 text-xs text-white pointer-events-none"
            style={{ minWidth: 120 }}
          >
            <div className="font-bold mb-1">Base #{tooltip.index + 1}</div>
            {!examMode && (
              <>
                <div>Base: <span className="font-mono">{tooltip.base}</span></div>
                <div>Complement: <span className="font-mono">{tooltip.complement}</span></div>
                <div>Pair: <span className="font-mono">{tooltip.base}-{tooltip.complement}</span></div>
              </>
            )}
            {examMode && (
              <div className="text-yellow-400">Exam Mode: identify the base!</div>
            )}
            <button className="mt-1 text-gray-400 underline text-xs pointer-events-auto" onClick={() => setTooltip(null)}>close</button>
          </div>
        </Html>
      )}

      {showLabels && !examMode && sequence.slice(0, Math.min(count, 20)).map((base, i) => {
        const [x, y, z] = helixPosition(i, count, dnaRadius * packScale + 0.3, dnaPitch, turns);
        return (
          <Text
            key={i}
            position={[x, y, z]}
            fontSize={0.12}
            color={`#${BASE_COLORS_HEX[base].toString(16).padStart(6, '0')}`}
            anchorX="center"
            anchorY="middle"
          >
            {base}
          </Text>
        );
      })}
    </group>
  );
}
