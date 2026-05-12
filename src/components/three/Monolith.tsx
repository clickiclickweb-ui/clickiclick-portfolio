"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

// Procedural "monolith" — a fractured organic crystal that breathes
// and reacts to mouse + scroll. No GLB. Pure geometry + material.

export function Monolith({
  scrollProgress = { current: 0 },
}: {
  scrollProgress?: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const { size } = useThree();

  useEffect(() => {
    function handle(e: MouseEvent) {
      const nx = (e.clientX / size.width - 0.5) * 2;
      const ny = (e.clientY / size.height - 0.5) * 2;
      mouse.current.tx = nx;
      mouse.current.ty = ny;
    }
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [size.width, size.height]);

  // Build a fractured icosahedron with custom displacement seeded once
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, 32);
    const pos = geo.attributes.position;
    const noise = (x: number, y: number, z: number) => {
      // simple cheap noise — sum of sinusoids in 3D
      return (
        Math.sin(x * 2.1 + y * 1.7) * 0.5 +
        Math.cos(y * 2.3 + z * 1.9) * 0.5 +
        Math.sin(z * 1.6 + x * 2.5) * 0.5
      );
    };
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const n = noise(x, y, z);
      const d = 1 + n * 0.07;
      pos.setXYZ(i, x * d, y * d, z * d);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(2.2, 0.005, 32, 256), []);
  const innerGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.9, 1), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Smooth mouse follow
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.5;
      groupRef.current.rotation.x = mouse.current.y * 0.25;
      // Scroll-linked translation
      const p = scrollProgress.current;
      groupRef.current.position.y = -p * 1.6;
      groupRef.current.scale.setScalar(1 - p * 0.35);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.z = t * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
      innerRef.current.rotation.x = t * 0.25;
      const breathe = 1 + Math.sin(t * 1.4) * 0.08;
      innerRef.current.scale.setScalar(breathe);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.3) * 0.1;
      ringRef.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer crystal shell — distort material gives that liquid mercury feel */}
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <MeshDistortMaterial
          color="#fff3e0"
          roughness={0.05}
          metalness={0.95}
          distort={0.32}
          speed={1.1}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Inner core — warm glowing accent */}
      <mesh ref={innerRef} geometry={innerGeometry}>
        <meshStandardMaterial
          color="#ff5b3c"
          emissive="#ff3a18"
          emissiveIntensity={0.9}
          roughness={0.4}
          metalness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Thin ornamental ring */}
      <mesh ref={ringRef} geometry={ringGeometry}>
        <meshBasicMaterial color="#f3ecde" transparent opacity={0.45} />
      </mesh>

      {/* Secondary ring perpendicular */}
      <mesh
        geometry={ringGeometry}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshBasicMaterial color="#8eb7b5" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}
