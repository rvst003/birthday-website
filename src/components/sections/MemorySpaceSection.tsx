import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

function Moon() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={ref} position={[4, 2, -8]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#fff8e7"
        emissive="#fff0c0"
        emissiveIntensity={0.5}
        roughness={0.9}
      />
    </mesh>
  );
}

function FloatingPhoto({ url, position }: { url: string; position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const [texture] = useState(() => new THREE.TextureLoader().load(url));
  const start = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + start;
    ref.current.position.y = position[1] + Math.sin(t * 0.3) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.2) * 0.3;
    ref.current.rotation.y = Math.sin(t * 0.15) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[2, 1.4]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.01;
  });
  return (
    <mesh ref={ref} position={[0, 0, -12]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial
        color="#2a0a4a"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.08) * 2;
    state.camera.position.y = Math.cos(t * 0.06) * 1.5;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const photos = birthdayConfig.memories;
  const positions = useMemo<[number, number, number][]>(() => {
    return photos.map((_, i) => {
      const angle = (i / photos.length) * Math.PI * 2;
      const r = 5 + Math.random() * 2;
      return [Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r - 2];
    });
  }, [photos.length]);

  const starPositions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return arr;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b9d" />
      <Nebula />
      <Moon />
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={800} array={starPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
      </points>
      {photos.map((p, i) => (
        <FloatingPhoto key={i} url={p.image} position={positions[i]} />
      ))}
      <CameraRig />
    </>
  );
}

export default function MemorySpaceSection() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3500);
    return () => clearTimeout(t1);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <AnimateText text={birthdayConfig.memorySpaceTitle} visible={phase === 0} />
          <AnimateText text={birthdayConfig.memorySpaceMessage} visible={phase === 1} />
        </div>
      </div>
    </section>
  );
}

function AnimateText({ text, visible }: { text: string; visible: boolean }) {
  return (
    <motion.p
      className="max-w-2xl text-2xl font-light leading-relaxed text-pink-100 sm:text-4xl"
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 1.5 }}
      style={{ display: visible || true ? "block" : "none" }}
    >
      {text}
    </motion.p>
  );
}
