"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BUDGET = 10;
const RETRY_AT = 6; // this call "fails" and retries once before continuing

export function GovernanceAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 5200);
    return () => clearInterval(id);
  }, []);

  const cells = Array.from({ length: BUDGET }, (_, i) => i);

  return (
    <div className="flex h-28 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-bg-soft px-4">
      <div className="flex gap-1.5">
        {cells.map((i) => (
          <motion.div
            key={`${cycle}-${i}`}
            className="h-6 w-4 rounded-sm border border-brand-border"
            initial={{ backgroundColor: "transparent" }}
            animate={
              i === RETRY_AT
                ? { backgroundColor: ["transparent", "#ef4444", "var(--color-brand-accent)"] }
                : { backgroundColor: "var(--color-brand-accent)" }
            }
            transition={{
              duration: i === RETRY_AT ? 0.9 : 0.25,
              delay: i * 0.35,
              times: i === RETRY_AT ? [0, 0.55, 1] : undefined,
            }}
          />
        ))}
      </div>
      <motion.p
        key={`label-${cycle}`}
        className="text-center text-[10px] font-mono uppercase tracking-wider text-brand-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: RETRY_AT * 0.35 + 0.9, duration: 0.4 }}
      >
        call budget enforced · retry, then continue
      </motion.p>
    </div>
  );
}
