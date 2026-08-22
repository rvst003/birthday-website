import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  speed?: number;
}

export function Particles({
  count = 800,
  color = "#ff6b9d",
  size = 0.04,
  spread = 30,
  speed = 0.15,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * speed;
    pointsRef.current.rotation.y = t * 0.1;
    pointsRef.current.rotation.x = t * 0.05;
    const pos = pointsRef.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t + i) * 0.002;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface HeartShapeProps {
  color?: string;
  scale?: number;
  position?: [number, number, number];
  glow?: boolean;
}

export function HeartShape({
  color = "#ff3b6b",
  scale = 1,
  position = [0, 0, 0],
  glow = true,
}: HeartShapeProps) {
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
    <mesh position={position} scale={scale}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={glow ? 0.6 : 0}
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface FloatingHeartProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}

export function FloatingHeart({
  position,
  scale = 0.3,
  color = "#ff3b6b",
  speed = 1,
}: FloatingHeartProps) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + start;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    ref.current.scale.setScalar(scale * (1 + Math.sin(t * 2) * 0.05));
  });

  return (
    <HeartShape
      color={color}
      scale={1}
      position={position}
    />
  );
}

interface GlowingSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function GlowingSphere({
  position = [0, 0, 0],
  scale = 1,
  color = "#ff3b6b",
}: GlowingSphereProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(scale * (1 + Math.sin(t * 1.5) * 0.08));
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.3}
        wireframe
      />
    </mesh>
  );
}
