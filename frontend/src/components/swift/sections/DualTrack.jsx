import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { useSwift } from "../SwiftContext";
import { Check, User, Building2, ArrowRight } from "lucide-react";

const INDIVIDUAL = {
  heading: "Personal Guidance, Step by Step.",
  sub: "We help you understand your options for resolving a dispute, supported by experienced Swift case managers.",
  pillars: [
    "Pre filing consultation with a Swift case manager.",
    "Document checklist to prepare your claim.",
    "Support available in 11 vernacular languages.",
    "Cross border disputes handled with ease.",
    "Transparent pricing.",
  ],
  link: "Explore Workflow",
};

const ENTERPRISE = {
  heading: "Volume, Velocity, Visibility.",
  sub: "Plug SwiftResolwe into your collections, contracts, and compliance workflows. Bulk onboard cases. Track every claim in real time.",
  pillars: [
    "RESTful API and secure SFTP CSV bulk upload for 100K plus concurrent cases.",
    "Dedicated Institutional dashboards and automated legal escalation triggers.",
    "Secure virtual hearing rooms.",
    "Dedicated Enterprise Managers.",
  ],
  link: "Explore Architecture",
};

function Card({ data, icon: Icon, accent = false, testid }) {
  const { openComingSoon } = useSwift();
  return (
    <div className="swift-card p-8 md:p-10 h-full flex flex-col relative overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: accent
            ? "radial-gradient(closest-side, rgba(6,182,212,0.16), transparent 70%)"
            : "radial-gradient(closest-side, rgba(16,185,129,0.12), transparent 70%)",
        }}
      />
      <div className="relative flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: accent ? "rgba(6,182,212,0.1)" : "rgba(16,185,129,0.1)",
            color: accent ? "var(--accent-deep)" : "var(--positive)",
          }}
        >
          <Icon size={20} />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
          {accent ? "Banks, NBFCs and Enterprises" : "Individuals and MSMEs"}
        </span>
      </div>
      <h3 className="relative font-display text-[26px] md:text-[28px] font-semibold leading-[1.15] text-[color:var(--text-primary)] mb-4">
        {data.heading}
      </h3>
      <TypingReveal
        text={data.sub}
        as="p"
        className="relative text-[15px] leading-[1.7] text-[color:var(--text-secondary)] mb-6"
        delay={accent ? 200 : 0}
      />
      <ul className="relative space-y-3 mb-7">
        {data.pillars.map((p, i) => (
          <li key={i} className="flex items-start gap-3 text-[14.5px] text-[color:var(--text-primary)]">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[color:rgba(16,185,129,0.14)] flex items-center justify-center shrink-0">
              <Check size={12} className="text-[color:var(--positive)]" />
            </span>
            <TypingReveal text={p} as="span" delay={(accent ? 200 : 0) + 200 + i * 80} duration={1500} caret={false} />
          </li>
        ))}
      </ul>
      <button
        data-testid={testid}
        onClick={() => openComingSoon("A")}
        className="relative mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--accent-deep)] hover:gap-3 transition-all w-fit"
      >
        {data.link}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default function DualTrack() {
  return (
    <section id="dual-track" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Built for Both Sides
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-4xl">
            From a single claim to <span style={{ color: "var(--accent-deep)" }}>a portfolio of thousands</span>.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            From one unpaid invoice to thousands of overdue or disputed matters at once, the
            platform scales to match what you need, whether you are an individual, a business, or
            a large institution.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          <StaggerItem>
            <Card data={INDIVIDUAL} icon={User} accent={false} testid="dual-explore-workflow" />
          </StaggerItem>
          <StaggerItem>
            <Card data={ENTERPRISE} icon={Building2} accent={true} testid="dual-explore-architecture" />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
