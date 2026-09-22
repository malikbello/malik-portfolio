"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SortVisualizer } from "@/components/ui/algorithms/SortVisualizer";
import { NeuralNetAnimation } from "@/components/ui/algorithms/NeuralNetAnimation";
import { TSPAnimation } from "@/components/ui/algorithms/TSPAnimation";
import { TimeSeriesAnimation } from "@/components/ui/algorithms/TimeSeriesAnimation";
import { RAGAnimation } from "@/components/ui/algorithms/RAGAnimation";
import { GraphEmbeddingAnimation } from "@/components/ui/algorithms/GraphEmbeddingAnimation";
import { RLAnimation } from "@/components/ui/algorithms/RLAnimation";
import { ASRAnimation } from "@/components/ui/algorithms/ASRAnimation";
import { OCRAnimation } from "@/components/ui/algorithms/OCRAnimation";
import { AgentLoopAnimation } from "@/components/ui/algorithms/AgentLoopAnimation";
import { GPUFilterAnimation } from "@/components/ui/algorithms/GPUFilterAnimation";

const items = [
  {
    title: "Sorting Algorithms",
    desc: "Bubble sort running live — watch it shuffle, compare and settle.",
    render: () => <SortVisualizer />,
  },
  {
    title: "Neural Networks",
    desc: "A forward pass, visualised as signal pulses moving layer to layer.",
    render: () => <NeuralNetAnimation />,
  },
  {
    title: "Optimisation (TSP / VRP)",
    desc: "A real nearest-neighbour tour, redrawn on a fresh set of points every few seconds.",
    render: () => <TSPAnimation />,
  },
  {
    title: "Time Series Forecasting",
    desc: "History drawn solid, forecast drawn dashed with a confidence band — regenerated on a loop.",
    render: () => <TimeSeriesAnimation />,
  },
  {
    title: "Retrieval-Augmented Generation",
    desc: "Documents get searched, relevant context retrieved, then grounded into the final answer.",
    render: () => <RAGAnimation />,
  },
  {
    title: "Graph Embeddings",
    desc: "Connected nodes settle into clusters in embedding space — structure becomes geometry.",
    render: () => <GraphEmbeddingAnimation />,
  },
  {
    title: "Reinforcement Learning",
    desc: "An agent explores a grid, step by step, chasing the reward — then resets and tries again.",
    render: () => <RLAnimation />,
  },
  {
    title: "Speech Recognition (ASR)",
    desc: "The engine behind Maya — a live waveform transcribed into text in real time.",
    render: () => <ASRAnimation />,
  },
  {
    title: "Optical Character Recognition",
    desc: "A scanning pass over a document, extracting text line by line.",
    render: () => <OCRAnimation />,
  },
  {
    title: "Agent Loops, Harnesses & MCP",
    desc: "The perceive → plan → act → observe cycle that keeps a tool-using agent reliable.",
    render: () => <AgentLoopAnimation />,
  },
  {
    title: "GPU-Accelerated Spatial Filtering",
    desc: "Filtering ~1M+ map features by decade and region entirely in the GPU shader — powers NYC Skyline Growth's live timelapse with zero per-frame recompute.",
    render: () => <GPUFilterAnimation />,
  },
];

export function Algorithms() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section id="algorithms" className="space-y-10">
      <SectionHeading
        eyebrow="How the Models Actually Work"
        title="The algorithms behind the projects, animated."
        description="Eleven live, running visualisations of the techniques behind the projects above."
      />

      <div className="group/carousel relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="w-[300px] shrink-0 snap-start space-y-3 rounded-2xl border border-brand-border bg-brand-surface/20 p-5 hover:border-brand-accent/60 hover:shadow-[0_12px_30px_-8px_rgba(241,196,15,0.35)]"
            >
              {item.render()}
              <div>
                <h3 className="font-heading text-sm font-bold text-brand-text">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
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
