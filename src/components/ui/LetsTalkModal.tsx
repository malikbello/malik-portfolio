"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/config/siteData";

export function LetsTalkModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  function goTo(id: string) {
    onClose();
    // Let the modal close first so the scroll target's final position is accurate.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-brand-border bg-brand-bg p-6 shadow-2xl shadow-black/50"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-brand-muted hover:text-brand-text"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-heading text-lg font-bold text-brand-text">How would you like to reach out?</h3>
            <p className="mt-1 text-sm text-brand-muted">
              Straight to my inbox, or talk it through with {siteConfig.aiName} — a part of my brain — first?
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => goTo("connect")}
                className="flex w-full items-start gap-3 rounded-xl border border-brand-border p-4 text-left transition-colors hover:border-brand-accent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Mail className="h-4 w-4 text-brand-accent" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-text">Email me directly</span>
                  <span className="block text-xs text-brand-muted">
                    Go straight to the contact form — {siteConfig.aiName} can still help draft it there.
                  </span>
                </span>
              </button>

              <button
                onClick={() => goTo("ask-ai")}
                className="flex w-full items-start gap-3 rounded-xl border border-brand-border p-4 text-left transition-colors hover:border-brand-accent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Sparkles className="h-4 w-4 text-brand-accent" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-text">Talk to {siteConfig.aiName} first</span>
                  <span className="block text-xs text-brand-muted">
                    Work out what you need, then reach out once it&apos;s clear.
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
