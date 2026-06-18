"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function NeuralScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const particleCount = 150; // Optimized for performance
  
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    const mouseX = (mouse.x * state.viewport.width) / 2;
    const mouseY = (mouse.y * state.viewport.height) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      if (Math.abs(positions[i3]) > 15) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > 15) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 5) velocities[i3 + 2] *= -1;

      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3.0) {
        positions[i3] += dx * 0.02;
        positions[i3 + 1] += dy * 0.02;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 16.0) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <>
      {/* @ts-ignore */}
      <fogExp2 attach="fog" color="#050508" density={0.008} />
      <points ref={pointsRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#6C63FF" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}

export function NeuralBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true, antialias: false }}>
        <NeuralScene />
      </Canvas>
    </div>
  );
}
