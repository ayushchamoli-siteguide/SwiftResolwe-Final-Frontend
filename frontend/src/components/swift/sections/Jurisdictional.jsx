import React from "react";
import { Reveal } from "../Reveal";
import TypingReveal from "../TypingReveal";

export default function Jurisdictional() {
  return (
    <section id="jurisdictional" className="relative py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div
            className="rounded-3xl px-8 md:px-12 py-12 md:py-14 relative overflow-hidden"
            style={{ background: "var(--slate-deep)", color: "white" }}
          >
            <div
              className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(6,182,212,0.22), transparent 70%)" }}
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent-bright)] flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent-bright)]" />
                Jurisdictional Clarity
              </div>
              <h2 className="font-display text-[30px] md:text-[40px] font-semibold leading-tight tracking-tight">
                What We Are Not
              </h2>
              <TypingReveal
                text="SwiftResolwe is not a court. We provide the procedural infrastructure, qualified neutrals, and institutional rules within which disputes are conclusively resolved."
                as="p"
                className="mt-5 text-[16px] md:text-[17px] leading-[1.75] text-white/80 max-w-3xl"
                duration={1800}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
