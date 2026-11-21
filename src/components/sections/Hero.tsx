"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Terminal, Trophy } from "lucide-react";
import { siteConfig } from "@/config/siteData";
import { NowPlaying } from "@/components/ui/NowPlaying";
import { NewsFeed } from "@/components/ui/NewsFeed";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative grid gap-12 pt-16 pb-8 md:grid-cols-[1.15fr_0.85fr] md:pt-24">
      <div className="space-y-8">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/40 px-3 py-1.5 text-xs text-brand-accent"
        >
          <Terminal className="h-3.5 w-3.5" />
          <span>{siteConfig.role}</span>
          <span className="text-brand-border">•</span>
          <span className="text-brand-text">{siteConfig.company}</span>
        </motion.div>

        <motion.a
          initial="hidden"
          animate="show"
          custom={0.5}
          variants={fadeUp}
          href={siteConfig.highlight.url}
          target="_blank"
          rel="noreferrer"
          className="group flex w-fit items-start gap-2.5 rounded-xl border border-brand-accent/50 bg-brand-accent/10 px-4 py-2.5 text-sm transition-colors hover:bg-brand-accent/20"
        >
          <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
          <span>
            <span className="font-bold text-brand-accent">{siteConfig.highlight.label}</span>
            <span className="block text-xs text-brand-muted">{siteConfig.highlight.detail}</span>
          </span>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="text-balance font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          Turning uncertainty into{" "}
          <span className="text-brand-accent">advantage</span> through data,{" "}
          <span className="text-brand-accent">models</span>, and{" "}
          <span className="text-brand-accent">judgment</span>.
        </motion.h1>

        <motion.div initial="hidden" animate="show" custom={2} variants={fadeUp} className="flex flex-wrap gap-3">
          {siteConfig.philosophy.map((p, i) => (
            <div
              key={i}
              className="rounded-lg border border-brand-border bg-brand-surface/30 px-4 py-2 text-sm font-medium"
            >
              {p.text} <span className="text-brand-accent">{p.highlight}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg"
        >
          {siteConfig.subline}
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={4} variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-sm font-bold text-brand-bg transition-colors hover:bg-brand-accent-hover"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition-colors hover:border-brand-accent"
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4 text-brand-accent" />
          </a>
          <a
            href="#ask-ai"
            className="inline-flex items-center gap-2 rounded-md border border-dashed border-brand-accent/50 px-6 py-3 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
          >
            Ask {siteConfig.aiName} About Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-sm md:mx-0"
      >
        <div className="absolute -inset-4 rounded-3xl bg-brand-accent/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-surface/30">
          <Image
            src="/images/headshot-1.jpg"
            alt="Malik Pelumi Bello"
            width={800}
            height={950}
            priority
            className="aspect-[4/5] w-full object-cover grayscale-[15%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent p-5">
            <p className="text-xs font-semibold text-brand-text">{siteConfig.role} · {siteConfig.location}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 space-y-3"
        >
          <NowPlaying />
          <NewsFeed />
        </motion.div>
      </motion.div>
    </section>
  );
}
