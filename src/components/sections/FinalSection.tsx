import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

function BigHeart({ scale = 2 }: { scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(scale * (1 + Math.sin(t * 1.5) * 0.08));
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.05;
  });
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5);
    s.bezierCurveTo(0, 0.6, -0.1, 0.7, -0.25, 0.7);
    s.bezierCurveTo(-0.5, 0.7, -0.5, 0.35, -0.5, 0.35);
    s.bezierCurveTo(-0.5, 0.1, -0.3, -0.1, 0, -0.35);
    s.bezierCurveTo(0.3, -0.1, 0.5, 0.1, 0.5, 0.35);
    s.bezierCurveTo(0.5, 0.35, 0.5, 0.7, 0.25, 0.7);
    s.bezierCurveTo(0.1, 0.7, 0, 0.6, 0, 0.5);
    return s;
  }, []);
  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color="#ff3b6b"
        emissive="#ff3b6b"
        emissiveIntensity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingMemories() {
  const group = useRef<THREE.Group>(null);
  const photos = birthdayConfig.memories;
  const positions = useMemo(() => {
    return photos.map((_, i) => {
      const a = (i / photos.length) * Math.PI * 2;
      const r = 4;
      return [Math.cos(a) * r, Math.sin(a * 0.5) * 2, Math.sin(a) * r - 1] as [number, number, number];
    });
  }, [photos.length]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={group}>
      {photos.map((p, i) => (
        <FloatingFrame key={i} url={p.image} position={positions[i]} index={i} />
      ))}
    </group>
  );
}

function FloatingFrame({ url, position, index }: { url: string; position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [tex] = useState(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load(url);
    return t;
  });
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.2, 0.85]} />
      <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} opacity={0.85} />
    </mesh>
  );
}

export default function FinalSection() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500);
    const t2 = setTimeout(() => setPhase(2), 5500);
    const t3 = setTimeout(() => setPhase(3), 9000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b9d" />
            {phase >= 2 && <BigHeart scale={2.5} />}
            {phase >= 3 && <FloatingMemories />}
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="wait"
              className="text-2xl font-light text-white/70 sm:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {birthdayConfig.finalSurpriseTitle}
            </motion.p>
          )}
          {phase === 1 && (
            <motion.p
              key="thanks"
              className="max-w-xl text-2xl font-light text-pink-200 sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {birthdayConfig.finalThankYou}
            </motion.p>
          )}
          {phase >= 2 && (
            <motion.div
              key="final"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.h2
                className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-4xl font-light text-transparent sm:text-6xl"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                Happy Birthday, {birthdayConfig.name} ❤️
              </motion.h2>

              {phase >= 3 && (
                <motion.p
                  className="mt-8 max-w-xl text-lg font-light text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  {birthdayConfig.finalMessage}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 3 && (
          <motion.p
            className="mt-12 text-xl font-light text-pink-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {birthdayConfig.finalGratitude}
          </motion.p>
        )}
      </div>
    </section>
  );
}
