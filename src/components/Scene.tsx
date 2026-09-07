"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sparkles, OrbitControls, Torus } from "@react-three/drei";
import type { Group } from "three";

/* rotates the whole rig from page scroll — the "spin as you scroll" effect */
function ScrollSpin({ children }: { children: React.ReactNode }) {
  const g = useRef<Group>(null);
  useFrame(() => {
    if (!g.current) return;
    const s = typeof window !== "undefined" ? window.scrollY : 0;
    g.current.rotation.y = s * 0.0016;
    g.current.rotation.x = s * 0.0007;
  });
  return <group ref={g}>{children}</group>;
}

function Satellite() {
  const g = useRef<Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.5;
  });
  return (
    <group ref={g}>
      <group position={[2.35, 0.3, 0]}>
        <Icosahedron args={[0.22, 1]}>
          <meshStandardMaterial color="#35e0e8" emissive="#35e0e8" emissiveIntensity={0.7} roughness={0.3} />
        </Icosahedron>
      </group>
    </group>
  );
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
            distort={0.4}
            speed={1.8}
          />
        </Icosahedron>
      </Float>

      <group ref={shell}>
        <Icosahedron args={[2.15, 1]}>
          <meshBasicMaterial wireframe color="#ff3d8a" transparent opacity={0.14} />
        </Icosahedron>
      </group>

      <Torus args={[2, 0.012, 16, 90]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <meshBasicMaterial color="#35e0e8" transparent opacity={0.5} />
      </Torus>
      <Torus args={[2.4, 0.008, 14, 100]} rotation={[Math.PI / 1.7, -0.5, 0.6]}>
        <meshBasicMaterial color="#ff3d8a" transparent opacity={0.35} />
      </Torus>

      <Satellite />
      <Sparkles count={80} scale={7} size={2.4} speed={0.35} color="#c9a6ff" opacity={0.7} />
      <Sparkles count={40} scale={11} size={4} speed={0.15} color="#35e0e8" opacity={0.35} />
      <Sparkles count={30} scale={5} size={1.6} speed={0.6} color="#ff8fc4" opacity={0.6} />
    </>
  );
}

export default function Scene({
  interactive = true,
  compact = false,
}: {
  interactive?: boolean;
  compact?: boolean;
}) {
  const pos: [number, number, number] = compact ? [0.6, 1.9, 0] : [3.2, 0.2, 0];

  return (
    <Canvas
      dpr={compact ? [1, 1.5] : [1, 1.8]}
      camera={{ position: [0, 0, compact ? 7.4 : 6], fov: compact ? 46 : 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={85} color="#ff3d8a" />
      <pointLight position={[-5, -2, 3]} intensity={65} color="#35e0e8" />
      <pointLight position={[0, 4, -4]} intensity={40} color="#b06bff" />
      <Suspense fallback={null}>
        <ScrollSpin>
          <group position={pos} scale={compact ? 0.5 : 0.78}>
            <Core />
          </group>
        </ScrollSpin>
      </Suspense>
      {interactive && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.55}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.72}
          target={[pos[0] - 0.2, pos[1], 0]}
        />
      )}
    </Canvas>
  );
}
