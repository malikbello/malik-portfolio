"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const COLS = 8;
const ROWS = 5;
const GOAL = { x: COLS - 1, y: ROWS - 1 };

function randomWalkToGoal(): { x: number; y: number }[] {
  const path = [{ x: 0, y: 0 }];
  let { x, y } = path[0];
  while (x !== GOAL.x || y !== GOAL.y) {
    if (x < GOAL.x && (y === GOAL.y || Math.random() > 0.45)) x++;
    else if (y < GOAL.y) y++;
    path.push({ x, y });
  }
  return path;
}

const START_PATH = [{ x: 0, y: 0 }];

export function RLAnimation() {
  // Starts with a deterministic single-point path (SSR-safe) and swaps in a
  // real random walk once mounted, to avoid a hydration mismatch.
  const [path, setPath] = useState(START_PATH);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPath(randomWalkToGoal()));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= path.length) {
          setPath(randomWalkToGoal());
          return 0;
        }
        return s + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [path.length]);

  const cellW = 360 / COLS;
  const cellH = 224 / ROWS;
  const trail = path.slice(0, step + 1);
  const pos = path[step];

  return (
    <div className="flex h-56 items-center justify-center rounded-xl bg-brand-bg-soft p-3">
      <svg viewBox="0 0 360 224" className="h-full w-full">
        <Trophy
          x={GOAL.x * cellW + cellW / 2 - 8}
          y={GOAL.y * cellH + cellH / 2 - 8}
          width={16}
          height={16}
          color="var(--color-brand-accent)"
        />
        {trail.map((p, i) => (
          <circle
            key={i}
            cx={p.x * cellW + cellW / 2}
            cy={p.y * cellH + cellH / 2}
            r={2.5}
            fill="var(--color-brand-border)"
          />
        ))}
        <circle
          cx={pos.x * cellW + cellW / 2}
          cy={pos.y * cellH + cellH / 2}
          r={6}
          fill="var(--color-brand-accent)"
          style={{ transition: "cx 0.22s ease-in-out, cy 0.22s ease-in-out" }}
        />
      </svg>
    </div>
  );
}
