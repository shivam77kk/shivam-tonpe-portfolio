"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DNA() {
  const groupRef = useRef<THREE.Group>(null);
  const numSpheres = 40;

  const spheres1 = useMemo(() => {
    return Array.from({ length: numSpheres }).map((_, i) => {
      const t = (i / numSpheres) * Math.PI * 4;
      return new THREE.Vector3(Math.cos(t), t * 0.4 - 2.5, Math.sin(t));
    });
  }, []);

  const spheres2 = useMemo(() => {
    return Array.from({ length: numSpheres }).map((_, i) => {
      const t = (i / numSpheres) * Math.PI * 4;
      return new THREE.Vector3(Math.cos(t + Math.PI), t * 0.4 - 2.5, Math.sin(t + Math.PI));
    });
  }, []);

  const linePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < numSpheres; i += 2) {
      pos.push(spheres1[i].x, spheres1[i].y, spheres1[i].z);
      pos.push(spheres2[i].x, spheres2[i].y, spheres2[i].z);
    }
    return new Float32Array(pos);
  }, [spheres1, spheres2]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
      const targetRotationX = (state.mouse.y * Math.PI) / 10;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      {spheres1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#6C63FF" />
        </mesh>
      ))}
      {spheres2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#00FFFF" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute 
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export function DNAHelix() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px] z-0 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <DNA />
      </Canvas>
    </div>
  );
}
