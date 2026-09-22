"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
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

// Click-driven, not scroll-driven. The previous version tied each card's pose
// continuously to raw page-scroll position -- it looked good, but there was
// no way to actually stop on a card: trackpad/mouse-wheel momentum carries
// scroll position straight through any "active" window before you can read
// or click anything, no matter how wide that window is made. A card here
// stays in its exact pose indefinitely until the next click -- unlimited
// time to read and click links, by construction, not by timing.
function cascadeStyle(offset: number) {
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
  activeIdx,
}: {
  project: Project;
  index: number;
  total: number;
  activeIdx: number;
}) {
  const offset = index - activeIdx;
  const pose = cascadeStyle(offset);
  const isActive = offset === 0;

  return (
    <motion.article
      animate={{
        y: pose.y,
        z: pose.z,
        rotateX: pose.rotateX,
        scale: pose.scale,
        opacity: pose.opacity,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -310,
        marginLeft: -240,
        zIndex: Math.round(1000 - offset * 10),
        transformStyle: "preserve-3d",
        pointerEvents: isActive ? "auto" : "none",
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
  const [activeIdx, setActiveIdx] = useState(0);
  const total = filtered.length;

  function go(delta: 1 | -1) {
    setActiveIdx((i) => Math.min(total - 1, Math.max(0, i + delta)));
  }

  return (
    <div className="bg-abstract-mesh relative h-[min(78vh,700px)] overflow-hidden rounded-3xl border border-brand-border">
      <div className="grid h-full items-center gap-6 px-6 md:grid-cols-[1fr_120px] md:px-10">
        <div style={{ perspective: 1500, perspectiveOrigin: "50% 40%" }} className="relative h-full">
          {filtered.map((p, idx) => (
            <CascadeCard key={p.name} project={p} index={idx} total={total} activeIdx={activeIdx} />
          ))}

          {/* Prev/next arrows -- the clear, always-reliable way to move between
              cards. No timing, no scroll precision, no momentum to fight. */}
          <button
            onClick={() => go(-1)}
            disabled={activeIdx === 0}
            aria-label="Previous project"
            className="absolute left-2 top-1/2 z-1001 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-bg/80 text-brand-text backdrop-blur transition hover:border-brand-accent hover:text-brand-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={activeIdx === total - 1}
            aria-label="Next project"
            className="absolute right-2 top-1/2 z-1001 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-bg/80 text-brand-text backdrop-blur transition hover:border-brand-accent hover:text-brand-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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
                onClick={() => setActiveIdx(idx)}
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

      {/* Desktop/tablet: click-driven 3D card cascade -- each card holds its
          pose indefinitely until you click next/prev or a dot. */}
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
