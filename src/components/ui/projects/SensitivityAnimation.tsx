"use client";

import { useEffect, useState } from "react";

const FEATURES = 5;

function randomSpread() {
  return Array.from({ length: FEATURES }, () => ({
    left: 10 + Math.random() * 50,
    right: 10 + Math.random() * 50,
  }));
}

export function SensitivityAnimation() {
  const [bars, setBars] = useState(() => Array.from({ length: FEATURES }, () => ({ left: 30, right: 30 })));

  useEffect(() => {
    const raf = requestAnimationFrame(() => setBars(randomSpread()));
    const id = setInterval(() => setBars(randomSpread()), 2200);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex h-28 w-full flex-col justify-center gap-1.5 overflow-hidden rounded-xl bg-brand-bg-soft px-5">
      {bars.map((b, i) => (
        <div key={i} className="relative flex h-2.5 items-center">
          <div className="absolute left-1/2 h-full w-px bg-brand-border" />
          <div
            className="absolute right-1/2 h-full rounded-l-sm bg-[#e0674f]/60 transition-all duration-1000 ease-in-out"
            style={{ width: `${b.left}%` }}
          />
          <div
            className="absolute left-1/2 h-full rounded-r-sm bg-brand-accent/70 transition-all duration-1000 ease-in-out"
            style={{ width: `${b.right}%` }}
          />
        </div>
      ))}
    </div>
  );
}
