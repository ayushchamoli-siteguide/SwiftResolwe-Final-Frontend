import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { useSwift } from "../SwiftContext";
import { UserCheck, LifeBuoy, GraduationCap, ArrowRight } from "lucide-react";

const CARDS = [
  {
    icon: UserCheck,
    title: "Who They Are",
    body:
      "Our case managers are trained dispute resolution professionals, drawn from law graduates and ADR specialists. They are not the neutrals who decide your case. They are the people who help you move through it.",
  },
  {
    icon: LifeBuoy,
    title: "How They Help",
    body:
      "They guide you through intake, help organize your documents, explain each step in plain language, and keep your matter moving. They handle the process so you can focus on the outcome.",
  },
  {
    icon: GraduationCap,
    title: "How They Are Trained",
    body:
      "Every case manager completes structured training in SwiftResolwe ODR protocols, secure evidence handling, and strict neutrality boundaries, so support never crosses into legal advice or advocacy.",
  },
];

export default function CaseManagers() {
  const { openSchedule } = useSwift();
  return (
    <section id="case-managers" className="relative py-16 md:py-24" style={{ background: "var(--bg-surface-2)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Your Case Managers
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            <span style={{ color: "var(--accent-deep)" }}>Real People</span> Guiding Every Case.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            Technology runs the process. Trained case managers make sure you are never lost in it.
            They are your single point of contact from intake to resolution.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title}>
                <div className="swift-card p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-[color:rgba(6,182,212,0.1)] flex items-center justify-center text-[color:var(--accent-deep)] mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-[20px] font-semibold text-[color:var(--text-primary)] mb-3">
                    {c.title}
                  </h3>
                  <TypingReveal
                    text={c.body}
                    as="p"
                    className="text-[14.5px] leading-[1.7] text-[color:var(--text-secondary)]"
                    delay={i * 220}
                    duration={1700}
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-12 text-center">
          <button
            data-testid="case-managers-schedule-cta"
            onClick={openSchedule}
            className="cta-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold"
          >
            Schedule a 30 mins Consultation
            <ArrowRight size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
