import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Particles, FloatingHeart } from "./Shapes";

function NebulaBackground() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.02;
  });
  return (
    <mesh ref={ref} position={[0, 0, -15]}>
      <planeGeometry args={[60, 60]} />
      <meshBasicMaterial
        color="#1a0a2e"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface HeartFieldProps {
  count: number;
}

function HeartField({ count }: HeartFieldProps) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 15 - 5,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.25,
      speed: 0.3 + Math.random() * 0.7,
      color: ["#ff3b6b", "#ff6b9d", "#ffb3c6", "#c44569"][Math.floor(Math.random() * 4)],
    }));
  }, [count]);

  return (
    <>
      {hearts.map((h) => (
        <FloatingHeart
          key={h.id}
          position={h.position}
          scale={h.scale}
          speed={h.speed}
          color={h.color}
        />
      ))}
    </>
  );
}

interface BackgroundSceneProps {
  heartsCount?: number;
  particlesCount?: number;
}

function Scene({ heartsCount = 12, particlesCount = 600 }: Required<BackgroundSceneProps>) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff6b9d" />
      <pointLight position={[-10, -5, 5]} intensity={0.4} color="#a855f7" />
      <NebulaBackground />
      <Particles
        count={particlesCount}
        color="#ffd6e8"
        size={0.05}
        spread={35}
        speed={0.1}
      />
      <Particles
        count={Math.floor(particlesCount / 2)}
        color="#c44569"
        size={0.03}
        spread={25}
        speed={0.2}
      />
      <HeartField count={heartsCount} />
    </>
  );
}

export default function BackgroundScene({
  heartsCount = 12,
  particlesCount = 600,
}: BackgroundSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <Scene heartsCount={heartsCount} particlesCount={particlesCount} />
      </Suspense>
    </Canvas>
  );
}
