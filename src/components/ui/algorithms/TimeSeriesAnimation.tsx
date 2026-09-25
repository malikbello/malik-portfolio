"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WIDTH = 360;
const HEIGHT = 224;
const N = 24;
const HISTORY = 17;

function genSeries(): number[] {
  let v = 100;
  const out: number[] = [];
  for (let i = 0; i < N; i++) {
    v += (Math.random() - 0.45) * 14 + Math.sin(i / 3) * 6;
    out.push(v);
  }
  return out;
}

function toPoints(series: number[], w: number, h: number, pad: number) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series.map((v, i) => ({
    x: pad + (i / (series.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2),
  }));
}

export function TimeSeriesAnimation() {
  const [series, setSeries] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setSeries(genSeries()));
    return () => cancelAnimationFrame(raf);
  }, [cycle]);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 6000);
    return () => clearInterval(id);
  }, []);

  if (series.length === 0) return <div className="h-56 rounded-xl bg-brand-bg-soft" />;

  const points = toPoints(series, WIDTH, HEIGHT, 16);
  const history = points.slice(0, HISTORY);
  const forecast = points.slice(HISTORY - 1);

  const historyD = `M${history.map((p) => `${p.x},${p.y}`).join(" L")}`;
  const forecastD = `M${forecast.map((p) => `${p.x},${p.y}`).join(" L")}`;
  const bandTop = forecast.map((p) => `${p.x},${p.y - 10}`).join(" L");
  const bandBottom = forecast
    .slice()
    .reverse()
    .map((p) => `${p.x},${p.y + 10}`)
    .join(" L");

  return (
    <div className="flex h-56 items-center justify-center rounded-xl bg-brand-bg-soft p-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
        <path d={`M${bandTop} L${bandBottom} Z`} fill="var(--color-brand-accent)" opacity={0.12} />
        <motion.path
          key={`h-${cycle}`}
          d={historyD}
          fill="none"
          stroke="var(--color-brand-border)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          key={`f-${cycle}`}
          d={forecastD}
          fill="none"
          stroke="var(--color-brand-accent)"
          strokeWidth={2}
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
