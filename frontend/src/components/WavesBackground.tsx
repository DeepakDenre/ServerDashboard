"use client";
import { useEffect, useRef } from "react";

interface VantaEffect {
  destroy(): void;
}

interface VantaWavesProps {
  waveColor?: number;
  backgroundColor?: number;
  shininess:number,
  waveHeight?: number;
  waveSpeed?: number;
  scale?: number;
  scaleMobile?: number;
  zoom: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
}

export default function VantaWavesBackground({
  waveColor = 0xffffff,
  backgroundColor = 0x2563eb,
  shininess = 45,
  waveHeight = 30,
  waveSpeed = 1,
  scale = 1,
  scaleMobile = 1,
  zoom = 1,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
}: VantaWavesProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    console.log("[Vanta] useEffect mounted");
    let cancelled = false;

    if (typeof window !== "undefined" && vantaRef.current) {
      Promise.all([import("three"), import("vanta/dist/vanta.waves.min.js")])
        .then(([threeModule, vantaWaves]) => {
          if (cancelled) return;

          const initVanta = () => {
            const el = vantaRef.current;
            if (!el) return;

            vantaEffect.current = vantaWaves.default({
              el,
              mouseControls,
              touchControls,
              gyroControls,
              scale,
              scaleMobile,
              zoom,
              color: waveColor,
              backgroundColor,
              shininess,
              waveHeight,
              waveSpeed,
              THREE: threeModule,
            });
          };

          setTimeout(initVanta, 100); // wait for layout
        })
        .catch((err) => console.error("[Vanta] failed to load modules:", err));
    }

    return () => {
      cancelled = true;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [
    waveColor,
    backgroundColor,
    shininess,
    waveHeight,
    waveSpeed,
    scale,
    scaleMobile,
    zoom,
    mouseControls,
    touchControls,
    gyroControls,
  ]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 -z-10 w-full h-full"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
