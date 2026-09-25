"use client";

import { useEffect, useState } from "react";

type Pin = { x: number; y: number; delay: number };

function randomPins(): Pin[] {
  return Array.from({ length: 4 }, () => ({
    x: 20 + Math.random() * 260,
    y: 16 + Math.random() * 88,
    delay: Math.random() * 2,
  }));
}

export function AIDERAnimation() {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPins(randomPins()));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-brand-bg-soft">
      <svg viewBox="0 0 300 120" className="h-full w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={120} stroke="var(--color-brand-border)" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40} x2={300} y2={i * 40} stroke="var(--color-brand-border)" strokeWidth={0.5} />
        ))}
        <g transform="translate(150,60)">
          <circle r={2} fill="var(--color-brand-accent)" />
          <line x1={0} y1={0} x2={45} y2={0} stroke="var(--color-brand-accent)" strokeWidth={1.5} opacity={0.8}>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" />
          </line>
          <circle r={45} fill="none" stroke="var(--color-brand-accent)" strokeWidth={0.5} opacity={0.3} />
        </g>
        {pins.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#e0674f">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
