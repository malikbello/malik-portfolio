"use client";

import { useEffect, useState } from "react";

const WIDTH = 360;
const HEIGHT = 224;

type Node = { id: number; cluster: number; gx: number; gy: number; ex: number; ey: number };

function genNodes(): Node[] {
  const clusters = [
    { cx: 90, cy: 70 },
    { cx: 270, cy: 60 },
    { cx: 180, cy: 165 },
  ];
  const nodes: Node[] = [];
  let id = 0;
  clusters.forEach((c, ci) => {
    for (let i = 0; i < 5; i++) {
      nodes.push({
        id: id++,
        cluster: ci,
        gx: 20 + Math.random() * (WIDTH - 40),
        gy: 20 + Math.random() * (HEIGHT - 40),
        ex: c.cx + (Math.random() - 0.5) * 50,
        ey: c.cy + (Math.random() - 0.5) * 50,
      });
    }
  });
  return nodes;
}

export function GraphEmbeddingAnimation() {
  // Generated client-side only (Math.random) to avoid an SSR/client hydration mismatch.
  const [nodes, setNodes] = useState<Node[] | null>(null);
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNodes(genNodes()));
    const id = setInterval(() => setEmbedded((e) => !e), 3200);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const colors = ["var(--color-brand-accent)", "#7fb99a", "#e7d38b"];

  if (!nodes) return <div className="h-56 rounded-xl bg-brand-bg-soft" />;

  return (
    <div className="flex h-56 items-center justify-center rounded-xl bg-brand-bg-soft p-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
        {!embedded &&
          nodes.map((a) =>
            nodes
              .filter((b) => b.cluster === a.cluster && b.id > a.id)
              .map((b) => (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={a.gx}
                  y1={a.gy}
                  x2={b.gx}
                  y2={b.gy}
                  stroke="var(--color-brand-border)"
                  strokeWidth={1}
                />
              ))
          )}
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={embedded ? n.ex : n.gx}
            cy={embedded ? n.ey : n.gy}
            r={5}
            fill={colors[n.cluster]}
            style={{ transition: "cx 1.4s ease-in-out, cy 1.4s ease-in-out" }}
          />
        ))}
      </svg>
    </div>
  );
}
