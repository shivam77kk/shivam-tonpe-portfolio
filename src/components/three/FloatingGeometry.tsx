"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <lineSegments ref={meshRef}>
      <wireframeGeometry>
        <torusKnotGeometry args={[1.2, 0.3, 80, 16, 2, 3]} />
      </wireframeGeometry>
      <lineBasicMaterial color="#6C63FF" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function FloatingGeometry() {
  return (
    <div className="absolute right-0 top-[40%] w-[400px] h-[400px] z-0 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <TorusKnot />
      </Canvas>
    </div>
  );
}
