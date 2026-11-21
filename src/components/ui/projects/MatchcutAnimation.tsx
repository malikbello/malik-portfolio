"use client";

import { useEffect, useState } from "react";

// One verified moment, re-cut for each fan in their own language: the core
// idea of Matchcut in a single loop.
const CUTS = [
  { lang: "EN", line: "Quinouani, 74'. His ninth of the season." },
  { lang: "Naijá", line: "Quinouani don score again, 74 minute!" },
  { lang: "FR", line: "Quinouani, 74e. Son neuvième de la saison." },
  { lang: "ES", line: "Quinouani, minuto 74. Su noveno del año." },
  { lang: "PT", line: "Quinouani, aos 74. O nono da temporada." },
];

export function MatchcutAnimation() {
  const [idx, setIdx] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % CUTS.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 12), 150);
    return () => clearInterval(id);
  }, []);

  const cut = CUTS[idx];

  return (
    <div className="flex h-28 w-full shrink-0 flex-col justify-center gap-2.5 overflow-hidden rounded-xl bg-brand-bg-soft px-5">
      <div className="flex items-center gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`h-5 flex-1 rounded-[3px] border border-brand-border transition-colors duration-150 ${
              i === frame ? "bg-brand-accent" : i < frame ? "bg-brand-accent/20" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="shrink-0 rounded-full border border-brand-accent/50 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-accent">
          {cut.lang}
        </span>
        <p className="truncate font-mono text-[11px] text-brand-muted">&ldquo;{cut.line}&rdquo;</p>
      </div>
      <p className="font-mono text-[10px] text-brand-accent/80">✓ verified · captioned · audio-described</p>
    </div>
  );
}
