"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { projects, projectsNote, type Project } from "@/config/siteData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { AIDERAnimation } from "@/components/ui/projects/AIDERAnimation";
import { RAGFlowAnimation } from "@/components/ui/projects/RAGFlowAnimation";
import { VoiceWaveAnimation } from "@/components/ui/projects/VoiceWaveAnimation";
import { SensitivityAnimation } from "@/components/ui/projects/SensitivityAnimation";
import { RouteAnimation } from "@/components/ui/projects/RouteAnimation";
import { DemandBarsAnimation } from "@/components/ui/projects/DemandBarsAnimation";
import { FloodRiskAnimation } from "@/components/ui/projects/FloodRiskAnimation";
import { ScrapePipelineAnimation } from "@/components/ui/projects/ScrapePipelineAnimation";
import { SkylineGrowthAnimation } from "@/components/ui/projects/SkylineGrowthAnimation";

// Each project gets its own small, running visualisation — same idea as the
// Algorithms section, but illustrating what that specific project does.
function projectAnimation(name: string) {
  if (name.includes("AIDER")) return <AIDERAnimation />;
  if (name.includes("Bedrock RAG")) return <RAGFlowAnimation />;
  if (name.includes("Maya")) return <VoiceWaveAnimation />;
  if (name.includes("ESAAM")) return <SensitivityAnimation />;
  if (name.includes("Vehicle Routing")) return <RouteAnimation />;
  if (name.includes("Taxi")) return <DemandBarsAnimation />;
  if (name.includes("Nepal Climate")) return <FloodRiskAnimation />;
  if (name.includes("Scraper")) return <ScrapePipelineAnimation />;
  if (name.includes("Skyline")) return <SkylineGrowthAnimation />;
  return null;
}

const categories: Array<Project["category"] | "All"> = [
  "All",
  "AI Engineering",
  "ML & Data Science",
  "Analytics",
  "Research",
];

// Reverse-engineered from launchfar.com's "Your mentor evolves around you" card
// deck: each card's pose is a smooth function of its distance (offset) from the
// currently-active card. Cards still waiting ease in from behind (exponential,
// ratio ~0.45 per step, matching what launchfar actually ships), while a card
// that has already had its turn keeps swinging forward/down and flips past
// vertical until the sticky stage's overflow clips it out of view.
//
// DEADZONE holds a card at its exact active pose across a range of scroll
// (not just one exact pixel) -- without it, the "active, clickable" state
// only existed for an instant, not nearly long enough to actually click a
// project's links while scrolling past.
const DEADZONE = 0.3;

function cascadeStyle(rawOffset: number) {
  const offset =
    rawOffset > 0 ? Math.max(0, rawOffset - DEADZONE) : Math.min(0, rawOffset + DEADZONE);
  if (offset >= 0) {
    const k = Math.pow(0.45, offset);
    return {
      y: -190 + 235 * k,
      z: -230 + 245 * k,
      rotateX: -56 + 48 * k,
      scale: 0.84 + 0.16 * k,
      opacity: Math.max(0, 1 - Math.max(0, offset - 2) / 2),
    };
  }
  return {
    y: -190 - 360 * offset,
    z: -230 - 150 * offset,
    rotateX: -56 - 82 * offset,
    scale: 1 + 0.06 * Math.min(-offset, 1.3),
    opacity: 1,
  };
}

function CascadeCard({
  project,
  index,
  total,
  activeFloat,
}: {
  project: Project;
  index: number;
  total: number;
  activeFloat: MotionValue<number>;
}) {
  const offset = useTransform(activeFloat, (v) => index - v);
  const y = useTransform(offset, (o) => cascadeStyle(o).y);
  const z = useTransform(offset, (o) => cascadeStyle(o).z);
  const rotateX = useTransform(offset, (o) => cascadeStyle(o).rotateX);
  const scale = useTransform(offset, (o) => cascadeStyle(o).scale);
  const opacity = useTransform(offset, (o) => cascadeStyle(o).opacity);
  const zIndex = useTransform(offset, (o) => Math.round(1000 - o * 10));

  return (
    <motion.article
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -310,
        marginLeft: -240,
        y,
        z,
        rotateX,
        scale,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "flex h-155 w-[480px] max-w-[88vw] flex-col gap-3 overflow-hidden rounded-3xl border p-7 shadow-2xl shadow-black/50",
        project.featured ? "border-brand-accent/40 bg-[#0c2116]" : "border-brand-border bg-[#0a1c13]"
      )}
    >
      <div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.category}
        </span>
        <h3 className="mt-1 font-heading text-lg font-bold leading-snug">{project.name}</h3>
      </div>

      {projectAnimation(project.name)}

      <p className="text-sm leading-relaxed text-brand-muted">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((t) => (
          <span key={t} className="rounded border border-brand-border bg-brand-bg-soft px-2.5 py-1 text-[11px] text-brand-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        {project.status && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-accent">
            <Clock className="h-3.5 w-3.5" />
            {project.status}
          </span>
        )}
        {project.links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-text hover:text-brand-accent"
          >
            {l.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectDetail({ p }: { p: Project }) {
  return (
    <>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">
          {p.category} · {p.year}
        </span>
        <h3 className="mt-1 font-heading text-lg font-bold leading-snug">{p.name}</h3>
      </div>

      {projectAnimation(p.name)}

      <p className="text-sm leading-relaxed text-brand-muted">{p.description}</p>

      <div className="flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span key={t} className="rounded border border-brand-border bg-brand-bg-soft px-2.5 py-1 text-[11px] text-brand-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        {p.status && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-accent">
            <Clock className="h-3.5 w-3.5" />
            {p.status}
          </span>
        )}
        {p.links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-text hover:text-brand-accent"
          >
            {l.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </>
  );
}

function ProjectCascade({ filtered }: { filtered: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const total = filtered.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Input range stops at 0.85, not 1 -- useTransform clamps outside its input
  // domain, so the last ~15% of scroll through this section holds activeFloat
  // at the final card instead of the last card's "active" moment landing
  // exactly when the sticky container releases (previously: the one instant
  // it was reachable coincided with the section scrolling away entirely).
  const activeFloat = useTransform(scrollYProgress, [0, 0.85], [0, Math.max(0, total - 1)]);

  useMotionValueEvent(activeFloat, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.round(v)));
    setActiveIdx(idx);
  });

  function jumpTo(idx: number) {
    const el = containerRef.current;
    if (!el || total <= 1) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top + (idx / (total - 1)) * (rect.height - window.innerHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  return (
    <div ref={containerRef} style={{ height: `${Math.max(1, total) * 92}vh` }} className="relative">
      <div className="bg-abstract-mesh sticky top-20 h-[min(78vh,700px)] overflow-hidden rounded-3xl border border-brand-border">
        <div className="grid h-full items-center gap-6 px-6 md:grid-cols-[1fr_120px] md:px-10">
          <div style={{ perspective: 1500, perspectiveOrigin: "50% 40%" }} className="relative h-full">
            {filtered.map((p, idx) => (
              <CascadeCard key={p.name} project={p} index={idx} total={total} activeFloat={activeFloat} />
            ))}
          </div>

          <div className="hidden flex-col items-center gap-4 md:flex">
            <div className="text-center font-heading text-2xl font-bold text-brand-text">
              {String(activeIdx + 1).padStart(2, "0")}
              <span className="block font-mono text-[10px] font-normal text-brand-muted">/ {String(total).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-col gap-2">
              {filtered.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => jumpTo(idx)}
                  aria-label={`Show project ${idx + 1}: ${p.name}`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] transition-all",
                    idx === activeIdx
                      ? "border-brand-accent bg-brand-accent text-brand-bg shadow-[0_0_14px_rgba(241,196,15,0.4)]"
                      : "border-brand-border text-brand-muted hover:border-brand-accent/60 hover:text-brand-text"
                  )}
                >
                  {String(idx + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="space-y-10">
      <SectionHeading
        eyebrow="Featured Systems"
        title="Projects, grouped by the kind of problem they solve."
        description="Shipped systems and research builds — each with the stack, the reasoning, and where to see it work."
      />

      <p className="rounded-lg border border-dashed border-brand-border bg-brand-surface/10 px-4 py-3 text-xs leading-relaxed text-brand-muted">
        {projectsNote}
      </p>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              active === c
                ? "border-brand-accent bg-brand-accent text-brand-bg"
                : "border-brand-border text-brand-muted hover:border-brand-accent/60 hover:text-brand-text"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Desktop/tablet: the launchfar-style scroll-driven 3D card cascade */}
      <div className="hidden md:block">
        <ProjectCascade key={active} filtered={filtered} />
      </div>

      {/* Mobile: plain stacked grid — the perspective cascade isn't usable at that size */}
      <div className="grid gap-5 md:hidden">
        {filtered.map((p, idx) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
            className={cn(
              "flex flex-col gap-4 rounded-2xl border p-6",
              p.featured ? "border-brand-accent/40 bg-brand-accent/[0.06]" : "border-brand-border bg-brand-surface/20"
            )}
          >
            <ProjectDetail p={p} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
