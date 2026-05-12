"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      autoRaf: true,
      anchors: {
        offset: -8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      },
    });

    function onChange() {
      if (mq.matches) lenis.stop();
      else lenis.start();
    }
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
