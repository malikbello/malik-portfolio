"use client";

import { motion } from "framer-motion";
import { ArrowUp, Award, Download, GraduationCap, HandHeart, Users } from "lucide-react";
import {
  experience,
  education,
  certifications,
  communities,
  volunteering,
  kaggleBadges,
  siteConfig,
  type CarouselItem,
} from "@/config/siteData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { GlowSpine } from "@/components/ui/GlowSpine";
import { cn } from "@/lib/utils";

const educationItems: CarouselItem[] = education.map((e) => ({
  title: e.degree,
  subtitle: `${e.org} · ${e.period}`,
  icon: "book",
  image: e.logo,
  imageFit: "contain",
  url: e.url,
}));

const certificationItems: CarouselItem[] = certifications.map((c) => ({
  title: c.title,
  subtitle: `${c.issuer}${c.date ? ` · ${c.date}` : ""}`,
  icon: "star",
  url: c.url,
  image: c.logo,
  imageFit: "contain",
}));

const communityItems: CarouselItem[] = communities.map((c) => ({
  title: c.title,
  subtitle: c.issuer,
  icon: "shield",
  url: c.url,
  image: c.logo,
  imageFit: "contain",
}));

const volunteeringItems: CarouselItem[] = volunteering.map((v) => ({
  title: v.role,
  subtitle: `${v.org} · ${v.period}`,
  icon: "footprints",
  image: v.image,
  imageFit: v.imageFit,
}));

export function Experience() {
  return (
    <section id="experience" className="space-y-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Career Trajectory"
          title="Experience & Impact"
          description="From biology first-class honours to fintech AI — a path built on statistics, research rigor and production engineering."
        />
        <a
          href={siteConfig.resumeUrl}
          download
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-brand-accent px-4 py-2 text-xs font-bold text-brand-accent hover:bg-brand-accent hover:text-brand-bg"
        >
          <Download className="h-3.5 w-3.5" />
          Download Resume
        </a>
      </div>

        <div className="relative space-y-6">
          <GlowSpine />
          {experience.map((item, idx) => {
            const fromRight = idx % 2 === 1;
            return (
              <motion.div
                key={item.role + item.period}
                initial={{ opacity: 0, x: fromRight ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={cn(
                  "relative flex items-center gap-4 md:w-1/2",
                  fromRight ? "md:ml-auto md:flex-row" : "md:flex-row-reverse md:text-right"
                )}
              >
                <span
                  className={cn(
                    "hidden h-2 w-2 shrink-0 rounded-full md:block",
                    item.current
                      ? "bg-brand-accent shadow-[0_0_10px_3px_rgba(241,196,15,0.5)]"
                      : "bg-brand-border"
                  )}
                />
                <div className="w-full rounded-2xl border border-brand-border bg-brand-surface/20 px-5 py-3.5">
                  {item.transition && (
                    <span className={cn("mb-1 inline-flex items-center gap-1 text-[10px] font-semibold text-brand-accent", fromRight ? "" : "md:flex-row-reverse")}>
                      <ArrowUp className="h-3 w-3" /> Promoted
                    </span>
                  )}
                  <p className="font-mono text-[11px] uppercase tracking-wider text-brand-accent">{item.period}</p>
                  <h3 className="mt-0.5 font-heading text-base font-bold">{item.role}</h3>
                  <p className="text-xs text-brand-muted">
                    {item.org} · {item.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-text/90">
          <GraduationCap className="h-4 w-4 text-brand-accent" /> Education
        </h3>
        <Carousel items={educationItems} icon={GraduationCap} />
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-text/90">
          <Award className="h-4 w-4 text-brand-accent" /> Certifications
        </h3>
        <Carousel items={certificationItems} icon={Award} />
        <p className="text-xs text-brand-muted">Kaggle badges: {kaggleBadges.join(" · ")}</p>
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-text/90">
          <Users className="h-4 w-4 text-brand-accent" /> Communities
        </h3>
        <Carousel items={communityItems} icon={Users} />
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-text/90">
          <HandHeart className="h-4 w-4 text-brand-accent" /> Volunteering & Leadership
        </h3>
        <Carousel items={volunteeringItems} icon={HandHeart} />
      </div>
    </section>
  );
}
