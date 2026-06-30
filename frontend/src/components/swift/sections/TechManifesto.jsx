import React from "react";
import { Reveal } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { Cpu } from "lucide-react";

export default function TechManifesto() {
  return (
    <section id="manifesto" className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="rounded-3xl border border-[color:var(--border-soft)] bg-white relative overflow-hidden p-10 md:p-14">
          <div className="absolute inset-0 bg-radial-cyan opacity-60 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:rgba(6,182,212,0.1)] border border-[color:rgba(6,182,212,0.25)]">
              <Cpu size={14} className="text-[color:var(--accent-deep)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent-deep)]">
                Technology Manifesto
              </span>
            </div>
            <h2 className="mt-6 font-display text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)]">
              AI as <span style={{ color: "var(--accent-deep)" }}>Infrastructure</span>, Not the Arbiter.
            </h2>
            <TypingReveal
              text="We use AI to organize filings, summarize complex document stacks, and route cases dynamically, never to decide them. All adjudicatory decisions stay strictly human. AI operates within strict access controls and end to end encryption, so case data stays private and is never used to determine an outcome."
              as="p"
              className="mt-6 text-[16.5px] leading-[1.75] text-[color:var(--text-secondary)] max-w-3xl"
              duration={1800}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
