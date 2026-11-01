"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteData";
import { LetsTalkModal } from "@/components/ui/LetsTalkModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Experience" },
  { href: "#hobbies", label: "Beyond Work" },
  { href: "#connect", label: "Connect" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [talkOpen, setTalkOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-brand-border bg-brand-bg/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-brand-accent/40">
            <Image src="/images/headshot-1.jpg" alt={siteConfig.name} fill className="object-cover" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight text-brand-text">
            {siteConfig.shortName}
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-brand-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-brand-accent">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <button
            onClick={() => setTalkOpen(true)}
            className="rounded-full border border-brand-accent px-4 py-2 text-xs font-bold text-brand-accent transition-all hover:bg-brand-accent hover:text-brand-bg"
          >
            Let&apos;s Talk
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-brand-text"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-border bg-brand-bg px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4 text-sm text-brand-muted">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-brand-accent">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setTalkOpen(true);
              }}
              className="mt-2 w-fit rounded-full border border-brand-accent px-4 py-2 text-xs font-bold text-brand-accent"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      )}

      <LetsTalkModal open={talkOpen} onClose={() => setTalkOpen(false)} />
    </nav>
  );
}
