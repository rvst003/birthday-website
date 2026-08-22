import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

function Candle({ position, lit, index }: { position: [number, number, number]; lit: boolean; index: number }) {
  const flameRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!flameRef.current || !lit) return;
    const t = state.clock.elapsedTime + index;
    flameRef.current.scale.y = 1 + Math.sin(t * 10) * 0.15;
    flameRef.current.scale.x = 1 + Math.cos(t * 8) * 0.1;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 12]} />
        <meshStandardMaterial color="#fff0f5" />
      </mesh>
      {lit && (
        <mesh ref={flameRef} position={[0, 0.75, 0]}>
          <coneGeometry args={[0.08, 0.25, 12]} />
          <meshStandardMaterial
            color="#ffaa33"
            emissive="#ff6600"
            emissiveIntensity={2}
          />
        </mesh>
      )}
      {lit && (
        <pointLight position={[0, 0.75, 0]} intensity={0.5} color="#ffaa33" distance={3} />
      )}
    </group>
  );
}

interface CakeProps {
  candlesLit: boolean;
}

function Cake({ candlesLit }: CakeProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const candlePositions: [number, number, number][] = [
    [-0.6, 1.0, 0],
    [0, 1.0, 0.4],
    [0.6, 1.0, 0],
    [0, 1.0, -0.4],
  ];

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Bottom tier */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.6, 32]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.5} />
      </mesh>
      {/* Frosting drip */}
      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[1.15, 0.08, 8, 32]} />
        <meshStandardMaterial color="#ff6b9d" roughness={0.3} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.5, 32]} />
        <meshStandardMaterial color="#ffe4ec" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.85, 0.07, 8, 32]} />
        <meshStandardMaterial color="#ff8fab" roughness={0.3} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.4, 32]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <torusGeometry args={[0.55, 0.06, 8, 32]} />
        <meshStandardMaterial color="#ff6b9d" roughness={0.3} />
      </mesh>

      {/* Decorative flowers */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.1, 0.3, Math.sin(a) * 1.1]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color={["#ff6b9d", "#ffd6e8", "#c44569"][i % 3]} emissive="#ff3b6b" emissiveIntensity={0.2} />
          </mesh>
        );
      })}

      {/* Candles */}
      {candlePositions.map((p, i) => (
        <Candle key={i} position={p} lit={candlesLit} index={i} />
      ))}
    </group>
  );
}

function Fireworks() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));

  useState(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = 0;
      positions.current[i * 3 + 1] = 0;
      positions.current[i * 3 + 2] = 0;
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        (Math.random() - 0.5) * 0.5
      ).normalize();
      const speed = 0.05 + Math.random() * 0.1;
      velocities.current[i * 3] = dir.x * speed;
      velocities.current[i * 3 + 1] = dir.y * speed;
      velocities.current[i * 3 + 2] = dir.z * speed;
    }
  });

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities.current[i * 3];
      arr[i * 3 + 1] += velocities.current[i * 3 + 1];
      velocities.current[i * 3 + 1] -= 0.001;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, 1, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ffd700" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function CakeSection() {
  const [lit, setLit] = useState(true);
  const [wished, setWished] = useState(false);

  const blow = () => {
    setLit(false);
    setTimeout(() => setWished(true), 600);
  };

  return (
    <section id="cake" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-2 text-center text-3xl font-light text-pink-200 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {birthdayConfig.cakeTitle}
      </motion.h2>

      <div className="relative h-[400px] w-full max-w-md sm:h-[500px]">
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 5, 3]} intensity={0.8} color="#ff6b9d" />
            <pointLight position={[-3, 2, 2]} intensity={0.5} color="#c084fc" />
            <Cake candlesLit={lit} />
            {wished && <Fireworks />}
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {!wished ? (
          <motion.button
            key="blow"
            onClick={blow}
            disabled={!lit}
            className="group relative mt-4 overflow-hidden rounded-full px-8 py-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-md opacity-80" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-rose-600" />
            <span className="relative font-light text-white">🎂 {birthdayConfig.cakeButton}</span>
          </motion.button>
        ) : (
          <motion.div
            key="wish"
            className="mt-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-3xl font-light text-pink-200 sm:text-4xl">Happy Birthday ❤️</p>
            <p className="mt-2 text-base font-light text-white/60">{birthdayConfig.cakeFinalMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
