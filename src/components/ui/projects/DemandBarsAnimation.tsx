"use client";

import { useEffect, useState } from "react";

const HOURS = 12;

function wavePattern(seed: number) {
  return Array.from({ length: HOURS }, (_, i) => {
    const base = Math.sin((i / HOURS) * Math.PI * 2 + seed) * 0.5 + 0.5;
    return 12 + base * 60;
  });
}

export function DemandBarsAnimation() {
  const [heights, setHeights] = useState<number[]>(() => Array(HOURS).fill(30));

  useEffect(() => {
    let seed = 0;
    const raf = requestAnimationFrame(() => setHeights(wavePattern(seed)));
    const id = setInterval(() => {
      seed += 0.7;
      setHeights(wavePattern(seed));
    }, 900);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex h-28 w-full items-end justify-center gap-1.5 overflow-hidden rounded-xl bg-brand-bg-soft px-5 pb-4 pt-5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-full rounded-t-sm bg-gradient-to-t from-brand-accent/40 to-brand-accent transition-all duration-700 ease-in-out"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}
