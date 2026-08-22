import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

function HeroHeart() {
  const group = useRef<THREE.Group>(null);
  const shape = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current || !shape.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.2;
    group.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    shape.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
  });

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.5);
  heartShape.bezierCurveTo(0, 0.6, -0.1, 0.7, -0.25, 0.7);
  heartShape.bezierCurveTo(-0.5, 0.7, -0.5, 0.35, -0.5, 0.35);
  heartShape.bezierCurveTo(-0.5, 0.1, -0.3, -0.1, 0, -0.35);
  heartShape.bezierCurveTo(0.3, -0.1, 0.5, 0.1, 0.5, 0.35);
  heartShape.bezierCurveTo(0.5, 0.35, 0.5, 0.7, 0.25, 0.7);
  heartShape.bezierCurveTo(0.1, 0.7, 0, 0.6, 0, 0.5);

  return (
    <group ref={group} position={[0, 0, -2]}>
      <mesh ref={shape}>
        <shapeGeometry args={[heartShape]} />
        <meshStandardMaterial
          color="#ff3b6b"
          emissive="#ff3b6b"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={1.15}>
        <shapeGeometry args={[heartShape]} />
        <meshBasicMaterial
          color="#ff6b9d"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroSection({ onCta }: { onCta: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    containerRef.current.style.setProperty("--mx", `${x * 20}px`);
    containerRef.current.style.setProperty("--my", `${y * 20}px`);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0" style={{ transform: "translate(var(--mx), var(--my))" }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b9d" />
            <pointLight position={[-5, -3, 2]} intensity={0.6} color="#c084fc" />
            <HeroHeart />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.h1
          className="bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-4xl font-light leading-tight text-transparent sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {birthdayConfig.heroTitle}
        </motion.h1>

        <motion.p
          className="mt-8 text-lg font-light text-pink-100/70 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {birthdayConfig.heroSubtitle1}
        </motion.p>

        <motion.p
          className="mt-3 max-w-xl text-base font-light text-white/50 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
        >
          {birthdayConfig.heroSubtitle2}
        </motion.p>

        <motion.button
          onClick={onCta}
          className="group mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="rounded-full border border-pink-300/30 bg-white/5 px-6 py-2.5 text-sm font-light text-pink-100 backdrop-blur-md transition-all group-hover:border-pink-300/60 group-hover:bg-pink-500/10">
            Start Our Story
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-pink-300/60" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
