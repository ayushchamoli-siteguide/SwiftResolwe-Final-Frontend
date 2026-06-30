import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { useSwift } from "../SwiftContext";
import { Scale, BookCheck, Quote } from "lucide-react";

const CARDS = [
  {
    code: "PANEL 01",
    icon: Scale,
    title: "Elite Arbitrators",
    body:
      "The panel comprises former Supreme Court, High Court, and District Court jurists, designated senior advocates, alongside advocates with 10 to 25 years of significant arbitration experience. Arbitrators are appointed through an algorithm designed to preserve neutrality and party autonomy, matching each dispute to an available arbitrator by reference to the subject matter and the arbitrator's domain expertise. Every appointment mandates strict statutory disclosures under Section 12 of the Arbitration and Conciliation Act, 1996, read with the Fifth and Sixth Schedules, neutralizing any justifiable doubts as to independence.",
  },
  {
    code: "PANEL 02",
    icon: BookCheck,
    title: "Certified Mediators and Conciliators",
    body:
      "These dispute resolution professionals hold accreditations from leading domestic and international mediation institutes. Applying facilitative and transformative methodologies, they operate strictly within the ethical codes, confidentiality mandates, and procedural rules of SwiftResolwe, in adherence with the Mediation Act, 2023 and the Arbitration and Conciliation Act, 1996.",
  },
];

export default function PanelNeutrals() {
  const { openComingSoon } = useSwift();
  return (
    <section id="panel" className="relative py-16 md:py-24" style={{ background: "var(--bg-surface-2)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Dispute Resolution Professionals
          </div>

          <div className="rounded-2xl bg-white border border-[color:var(--border-soft)] p-8 md:p-10 mb-10 relative overflow-hidden">
            <Quote size={42} className="absolute -top-2 -left-1 text-[color:rgba(6,182,212,0.15)]" />
            <p className="relative font-display text-[22px] md:text-[28px] leading-[1.35] font-medium text-[color:var(--text-primary)] italic" data-no-justify="true">
              &ldquo;In conflict, be fair and generous.&rdquo;
            </p>
            <p className="relative mt-4 font-mono text-[12px] tracking-[0.14em] text-[color:var(--text-muted)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
              Lao Tzu
            </p>
          </div>

          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            <span style={{ color: "var(--accent-deep)" }}>Domain Expert</span> Adjudication.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            Technology makes resolution fast. Our panel of neutrals makes it sound in law. Every
            dispute is heard by an independent, qualified neutral chosen for real experience in
            that exact field, bound by strict standards of impartiality, natural justice, and
            procedural fairness.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.code}>
                <div className="swift-card p-8 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                      {c.code}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[color:rgba(6,182,212,0.1)] flex items-center justify-center text-[color:var(--accent-deep)]">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-display text-[22px] font-semibold text-[color:var(--text-primary)] mb-4">
                    {c.title}
                  </h3>
                  <TypingReveal
                    text={c.body}
                    as="p"
                    className="text-[14.5px] leading-[1.7] text-[color:var(--text-secondary)]"
                    delay={i * 250}
                    duration={1700}
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-12 text-center">
          <button
            data-testid="empanelment-cta"
            onClick={() => openComingSoon("A")}
            className="cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold"
          >
            Read our Empanelment Dossier
          </button>
        </Reveal>
      </div>
    </section>
  );
}
