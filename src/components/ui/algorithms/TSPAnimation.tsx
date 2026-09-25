"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WIDTH = 360;
const HEIGHT = 224;
const NUM_POINTS = 12;
const PADDING = 20;

type Point = { x: number; y: number };

function randomPoints(): Point[] {
  return Array.from({ length: NUM_POINTS }, () => ({
    x: PADDING + Math.random() * (WIDTH - PADDING * 2),
    y: PADDING + Math.random() * (HEIGHT - PADDING * 2),
  }));
}

function dist(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Real nearest-neighbour heuristic for a route through all points.
function nearestNeighbourTour(points: Point[]): Point[] {
  const remaining = [...points];
  const tour = [remaining.shift()!];
  while (remaining.length) {
    const last = tour[tour.length - 1];
    let bestIdx = 0;
    let bestDist = Infinity;
    remaining.forEach((p, i) => {
      const d = dist(last, p);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    tour.push(remaining.splice(bestIdx, 1)[0]);
  }
  return tour;
}

export function TSPAnimation() {
  const [points, setPoints] = useState<Point[]>([]);
  const [tour, setTour] = useState<Point[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const pts = randomPoints();
    const raf = requestAnimationFrame(() => {
      setPoints(pts);
      setTour(nearestNeighbourTour(pts));
    });
    return () => cancelAnimationFrame(raf);
  }, [cycle]);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const pathD = tour.length ? `M${tour.map((p) => `${p.x},${p.y}`).join(" L")} Z` : "";

  return (
    <div className="flex h-56 items-center justify-center rounded-xl bg-brand-bg-soft p-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
        {pathD && (
          <motion.path
            key={cycle}
            d={pathD}
            fill="none"
            stroke="var(--color-brand-accent)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        )}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--color-brand-bg)" stroke="var(--color-brand-accent)" strokeWidth={1.5} />
        ))}
      </svg>
    </div>
  );
}
