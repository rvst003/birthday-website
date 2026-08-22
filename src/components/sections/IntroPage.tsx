import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

function BurstParticles({ triggered }: { triggered: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const speed = 0.04 + Math.random() * 0.08;
      vel[i * 3] = dir.x * speed;
      vel[i * 3 + 1] = dir.y * speed;
      vel[i * 3 + 2] = dir.z * speed;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!ref.current || !triggered) return;
    const pos = ref.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
    }
    pos.needsUpdate = true;
  });

  if (!triggered) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ff6b9d"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingHearts({ triggered }: { triggered: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime + i;
      child.position.y += 0.02;
      child.position.x = Math.sin(t) * 0.3 + child.userData.baseX;
      child.rotation.z = Math.sin(t * 0.5) * 0.2;
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat && child.position.y > 8) {
        child.position.y = -6;
        child.userData.baseX = (Math.random() - 0.5) * 10;
      }
    });
  });

  if (!triggered) return null;
  const hearts = Array.from({ length: 20 });
  return (
    <group ref={group}>
      {hearts.map((_, i) => {
        const baseX = (Math.random() - 0.5) * 10;
        return (
          <mesh key={i} position={[baseX, -6 + Math.random() * 12, 0]} userData={{ baseX }}>
            <shapeGeometry
              args={[
                (() => {
                  const s = new THREE.Shape();
                  s.moveTo(0, 0.5);
                  s.bezierCurveTo(0, 0.6, -0.1, 0.7, -0.25, 0.7);
                  s.bezierCurveTo(-0.5, 0.7, -0.5, 0.35, -0.5, 0.35);
                  s.bezierCurveTo(-0.5, 0.1, -0.3, -0.1, 0, -0.35);
                  s.bezierCurveTo(0.3, -0.1, 0.5, 0.1, 0.5, 0.35);
                  s.bezierCurveTo(0.5, 0.35, 0.5, 0.7, 0.25, 0.7);
                  s.bezierCurveTo(0.1, 0.7, 0, 0.6, 0, 0.5);
                  return s;
                })(),
              ]}
            />
            <meshStandardMaterial
              color={["#ff3b6b", "#ff6b9d", "#ffb3c6"][i % 3]}
              emissive="#ff3b6b"
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function IntroPage({ onOpen }: { onOpen: () => void }) {
  const [burst, setBurst] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    setBurst(true);
    setLeaving(true);
    setTimeout(onOpen, 2200);
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={leaving ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a2e] to-[#0d0518]" />

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b9d" />
            <BurstParticles triggered={burst} />
            <FloatingHearts triggered={burst} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          className="text-lg sm:text-2xl font-light tracking-wide text-pink-200/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Someone special has a birthday today... ❤️
        </motion.p>

        <motion.p
          className="mt-6 text-sm sm:text-base text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Do you want to see your surprise?
        </motion.p>

        <motion.button
          onClick={handleClick}
          className="group relative mt-10 overflow-hidden rounded-full px-8 py-4 sm:px-12 sm:py-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 opacity-90 blur-md transition-all group-hover:opacity-100" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600" />
          <span className="relative flex items-center gap-2 font-medium text-white">
            <Sparkles className="h-5 w-5" />
            Open Your Surprise ✨
          </span>
        </motion.button>

        <motion.p
          className="mt-8 text-xs sm:text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          Turn on the sound 🎵
        </motion.p>
      </div>

      <AnimatePresence />
    </motion.section>
  );
}
