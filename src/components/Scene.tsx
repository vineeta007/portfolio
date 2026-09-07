"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group } from "three";

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * Math.min(1, delta * 2);
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * Math.min(1, delta * 2);
  });
  return <group ref={group}>{children}</group>;
}

function Core() {
  const shell = useRef<Group>(null);
  useFrame((_, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.z += delta * 0.05;
    }
  });
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Icosahedron args={[1.25, 6]}>
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#b06bff"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.6}
            distort={0.38}
            speed={1.6}
          />
        </Icosahedron>
      </Float>
      <group ref={shell}>
        <Icosahedron args={[2.15, 1]}>
          <meshBasicMaterial wireframe color="#ff3d8a" transparent opacity={0.14} />
        </Icosahedron>
      </group>
      <Sparkles count={70} scale={7} size={2.4} speed={0.35} color="#c9a6ff" opacity={0.7} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={70} color="#ff3d8a" />
      <pointLight position={[-5, -2, 3]} intensity={55} color="#35e0e8" />
      <Suspense fallback={null}>
        <Rig>
          <group position={[1.5, 0.2, 0]} scale={0.82}>
            <Core />
          </group>
        </Rig>
      </Suspense>
    </Canvas>
  );
}
