"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind", "Three.js", "GSAP",
  "Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "LangGraph",
  "Gemini API", "Groq", "Python", "FastAPI", "Docker", "Git", "Flutter"
];

function Sphere() {
  const groupRef = useRef<THREE.Group>(null);
  const [speed, setSpeed] = useState(0.002);

  const tags = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return SKILLS.map((skill, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      return { skill, pos: new THREE.Vector3(x * 3.5, y * 3.5, z * 3.5) };
    });
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed;
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setSpeed(0.008)} 
      onPointerOut={() => setSpeed(0.002)}
    >
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.12} />
      </mesh>
      
      {tags.map((t, i) => (
        <Html key={i} position={t.pos} center>
          <div className="font-mono text-[11px] px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--card-border)] text-[var(--text-secondary)] whitespace-nowrap transition-all duration-300 hover:scale-125 hover:bg-[var(--accent-1)] hover:text-white cursor-pointer pointer-events-auto shadow-lg">
            {t.skill}
          </div>
        </Html>
      ))}
    </group>
  );
}

export function SkillOrb() {
  return (
    <div className="w-full h-[500px] z-10 hidden md:block">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ alpha: true }}>
        <pointLight position={[0, 0, 0]} color="#A855F7" intensity={0.8} distance={6} />
        <Sphere />
      </Canvas>
    </div>
  );
}
