"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { Monolith } from "./Monolith";

export function HeroCanvas() {
  const scrollProgress = useRef({ current: 0 });
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let raf = 0;
    function tick() {
      const el = wrapRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const traveled = Math.max(0, vh - rect.top);
        const p = Math.max(0, Math.min(1, traveled / total));
        scrollProgress.current.current = p;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return <div ref={wrapRef} className="absolute inset-0" />;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, mobile ? 1.4 : 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <color attach="background" args={["#0a0908"]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[3, 4, 5]}
            intensity={1.2}
            color="#ffe4cc"
          />
          <directionalLight
            position={[-4, -2, -3]}
            intensity={0.4}
            color="#8eb7b5"
          />
          <pointLight position={[0, 0, 2.5]} intensity={0.6} color="#ff5b3c" />

          <Environment preset="studio" environmentIntensity={0.6} />

          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
            <Monolith scrollProgress={scrollProgress.current} />
          </Float>

          {!mobile ? (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.55}
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <ChromaticAberration
                offset={[0.0009, 0.0009]}
                blendFunction={BlendFunction.NORMAL}
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette eskil={false} offset={0.15} darkness={0.85} />
            </EffectComposer>
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
