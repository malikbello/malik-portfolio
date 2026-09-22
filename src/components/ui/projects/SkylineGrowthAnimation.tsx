"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WIDTH = 300;
const HEIGHT = 112;

const BUILDINGS = [
  { x: 10, w: 22, h: 38 },
  { x: 38, w: 18, h: 58 },
  { x: 62, w: 26, h: 30 },
  { x: 94, w: 20, h: 82 },
  { x: 120, w: 24, h: 46 },
  { x: 150, w: 18, h: 66 },
  { x: 174, w: 28, h: 96 },
  { x: 208, w: 20, h: 40 },
  { x: 234, w: 22, h: 70 },
  { x: 262, w: 18, h: 52 },
];

export function SkylineGrowthAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-28 w-full items-end overflow-hidden rounded-xl bg-brand-bg-soft">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
        <line x1={0} y1={HEIGHT - 1} x2={WIDTH} y2={HEIGHT - 1} stroke="var(--color-brand-border)" strokeWidth={1} />
        {BUILDINGS.map((b, i) => (
          <motion.rect
            key={`${cycle}-${i}`}
            x={b.x}
            width={b.w}
            fill="var(--color-brand-accent)"
            fillOpacity={0.25 + (i % 3) * 0.2}
            initial={{ y: HEIGHT, height: 0 }}
            animate={{ y: HEIGHT - b.h, height: b.h }}
            transition={{ duration: 1.1, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
    </div>
  );
}
