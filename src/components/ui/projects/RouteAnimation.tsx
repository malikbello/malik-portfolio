"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WIDTH = 300;
const HEIGHT = 112;
const PADDING = 16;

type Point = { x: number; y: number };

function randomPoints(n: number): Point[] {
  return Array.from({ length: n }, () => ({
    x: PADDING + Math.random() * (WIDTH - PADDING * 2),
    y: PADDING + Math.random() * (HEIGHT - PADDING * 2),
  }));
}

function dist(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

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

export function RouteAnimation() {
  const [points, setPoints] = useState<Point[]>([]);
  const [tour, setTour] = useState<Point[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const pts = randomPoints(9);
    const raf = requestAnimationFrame(() => {
      setPoints(pts);
      setTour(nearestNeighbourTour(pts));
    });
    return () => cancelAnimationFrame(raf);
  }, [cycle]);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 4500);
    return () => clearInterval(id);
  }, []);

  const pathD = tour.length ? `M${tour.map((p) => `${p.x},${p.y}`).join(" L")}` : "";

  return (
    <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-brand-bg-soft">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
        {pathD && (
          <motion.path
            key={cycle}
            d={pathD}
            fill="none"
            stroke="var(--color-brand-accent)"
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        )}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--color-brand-bg)" stroke="var(--color-brand-accent)" strokeWidth={1.2} />
        ))}
      </svg>
    </div>
  );
}
