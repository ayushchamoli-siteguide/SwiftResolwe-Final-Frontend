import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Cpu, X } from "lucide-react";
import { useSwift } from "./SwiftContext";

const COPY = {
  A: {
    icon: Sparkles,
    title: "Module in Final Calibration",
    body: "This module is in final calibration. Launching shortly.",
  },
  B: {
    icon: Cpu,
    title: "Model Completing Training",
    body: "Our model is completing its training. This goes live shortly.",
  },
};

export default function ComingSoonModal() {
  const { comingSoon, closeComingSoon } = useSwift();
  const cfg = COPY[comingSoon.variant] || COPY.A;
  const Icon = cfg.icon;

  return (
    <AnimatePresence>
      {comingSoon.open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="coming-soon-modal"
        >
          <motion.div
            className="absolute inset-0 bg-[color:rgba(14,23,38,0.45)] backdrop-blur-sm"
            onClick={closeComingSoon}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md w-full rounded-2xl bg-white/90 backdrop-blur-xl border border-[color:var(--border-soft)] shadow-2xl p-7"
          >
            <button
              onClick={closeComingSoon}
              data-testid="coming-soon-close"
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[color:var(--bg-surface-2)]"
            >
              <X size={18} />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[color:rgba(6,182,212,0.12)] flex items-center justify-center text-[color:var(--accent-deep)] shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-[18px] font-semibold text-[color:var(--text-primary)]">
                  {cfg.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[color:var(--text-secondary)]">
                  {cfg.body}
                </p>
              </div>
            </div>
            <div className="mt-7 flex justify-end">
              <button
                onClick={closeComingSoon}
                className="cta-primary px-5 py-2 rounded-full text-[13.5px] font-semibold"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
