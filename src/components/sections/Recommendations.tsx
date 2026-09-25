"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { recommendations, siteConfig } from "@/config/siteData";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Recommendations() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section className="space-y-10">
      <SectionHeading eyebrow="Endorsements" title="What colleagues and collaborators say." />

      <div className="group/carousel relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {recommendations.map((r) => (
            <motion.div
              key={r.name}
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex w-[300px] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-brand-border bg-brand-surface/20 p-6 hover:border-brand-accent/60 hover:shadow-[0_12px_30px_-8px_rgba(241,196,15,0.35)]"
            >
              <Quote className="h-5 w-5 text-brand-accent" />
              <p className="text-sm leading-relaxed text-brand-text/90">&ldquo;{r.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-brand-muted">
                  {r.title} · {r.relationship}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex w-[300px] shrink-0 snap-start flex-col items-start justify-center gap-3 rounded-2xl border border-dashed border-brand-accent/50 bg-brand-accent/[0.06] p-6"
          >
            <Sparkles className="h-5 w-5 text-brand-accent" />
            <p className="text-sm font-semibold text-brand-text">Worked with me? I&apos;d love your endorsement.</p>
            <p className="text-xs leading-relaxed text-brand-muted">
              {recommendations.length === 0
                ? "Be the first — recommendations will appear here as they come in."
                : "Add yours on LinkedIn and it'll show up here."}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent">
              Leave a Recommendation <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </motion.a>
        </div>

        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-bg text-brand-muted opacity-0 transition-opacity hover:text-brand-accent group-hover/carousel:opacity-100 sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-brand-bg text-brand-muted opacity-0 transition-opacity hover:text-brand-accent group-hover/carousel:opacity-100 sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
