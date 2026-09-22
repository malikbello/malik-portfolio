"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLS = 8;
const ROWS = 4;
const CELL = 30;
const GAP = 4;
const WIDTH = COLS * CELL + (COLS - 1) * GAP;
const HEIGHT = ROWS * CELL + (ROWS - 1) * GAP;

export function GPUFilterAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 4500);
    return () => clearInterval(id);
  }, []);

  const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return { col, row };
  });

  return (
    <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-brand-bg-soft">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-20 w-auto">
        {cells.map(({ col, row }, i) => (
          <motion.rect
            key={`${cycle}-${i}`}
            x={col * (CELL + GAP)}
            y={row * (CELL + GAP)}
            width={CELL}
            height={CELL}
            rx={4}
            fill="var(--color-brand-accent)"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 1, 1, 0.08] }}
            transition={{
              duration: 3.4,
              delay: col * 0.22,
              times: [0, 0.15, 0.8, 1],
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
