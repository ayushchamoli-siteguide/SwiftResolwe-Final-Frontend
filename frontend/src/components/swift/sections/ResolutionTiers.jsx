import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { useSwift } from "../SwiftContext";
import { Handshake, Users, MessagesSquare, Gavel, ShieldCheck } from "lucide-react";

const TIERS = [
  {
    code: "TIER 01",
    name: "SwiftResolwe Negotiate",
    icon: Handshake,
    bullets: [
      "Parties try to settle the dispute directly, fully online.",
      "High volume retail claims use quick text based settlement modules.",
      "Business parties use secure negotiation vaults to share documents and exchange offers.",
      "Everything runs asynchronously, with no court overhead.",
    ],
    outcome:
      "Settlement Agreement enforceable as a binding contract under Section 10A of the Information Technology Act, 2000 and Section 85 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
  {
    code: "TIER 02",
    name: "SwiftResolwe Mediate",
    icon: Users,
    bullets: [
      "A neutral mediator helps both sides reach a voluntary settlement.",
      "The platform matches the dispute with a mediator experienced in that field.",
      "Sessions are held in encrypted virtual hearing rooms.",
      "The focus is a fast settlement that preserves business relationships.",
    ],
    outcome:
      "Mediated Settlement Agreement, final and directly enforceable in the same manner as a Civil Court Decree under Section 27 of the Mediation Act, 2023.",
  },
  {
    code: "TIER 03",
    name: "SwiftResolwe Conciliate",
    icon: MessagesSquare,
    bullets: [
      "A neutral conciliator works closely with both parties toward a practical settlement.",
      "Unlike a mediator, the conciliator may propose possible terms of settlement.",
      "All sessions are confidential and held in secure virtual rooms.",
      "The process is designed to close the dispute quickly and amicably.",
    ],
    outcome:
      "Conciliated Settlement Agreement, final and enforceable in the same manner as a Civil Court Decree under Section 27 of the Mediation Act, 2023.",
  },
  {
    code: "TIER 04",
    name: "SwiftResolwe Arbitrate",
    icon: Gavel,
    bullets: [
      "A sole arbitrator or a three member panel decides the dispute.",
      "The arbitrator reviews the full digital case record and evidence.",
      "The process is conducted online on a fast track timeline.",
      "It ends in a final, binding award that closes the matter.",
    ],
    outcome:
      "Arbitral Award carrying the absolute authority of a Civil Court Decree, immediately enforceable under Section 36 of the Arbitration and Conciliation Act, 1996, supported by blockchain backed digital evidence under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
];

function TierCard({ tier, idx }) {
  const Icon = tier.icon;
  return (
    <div className="swift-card p-7 sm:p-8 h-full flex flex-col" data-no-justify="true">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
          {tier.code}
        </span>
        <div className="w-10 h-10 rounded-xl bg-[color:rgba(6,182,212,0.1)] flex items-center justify-center text-[color:var(--accent-deep)]">
          <Icon size={18} />
        </div>
      </div>
      <h3 className="font-display text-[22px] font-semibold text-[color:var(--text-primary)] mb-5">
        {tier.name}
      </h3>
      <ul className="space-y-3 mb-6 text-[color:var(--text-secondary)] text-[14.5px] leading-[1.65] flex-1 text-left">
        {tier.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-left">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] shrink-0" />
            <TypingReveal text={b} delay={idx * 250 + i * 80} duration={1600} as="span" caret={i === 0} />
          </li>
        ))}
      </ul>
      <div className="mt-auto rounded-xl bg-[color:var(--bg-surface-2)] p-4 text-left">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--accent-deep)] flex items-center gap-2 mb-2">
          <ShieldCheck size={12} />
          Legal Outcome and Enforceability
        </div>
        <TypingReveal
          text={tier.outcome}
          as="p"
          className="text-[13px] leading-[1.6] text-[color:var(--text-primary)] text-left"
          delay={idx * 250 + 400}
          duration={1700}
          caret={false}
        />
      </div>
    </div>
  );
}

export default function ResolutionTiers() {
  const { openComingSoon } = useSwift();
  return (
    <section id="tiers" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            The Resolution Engine
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            One Platform. <span style={{ color: "var(--accent-deep)" }}>Four Tiers</span> of Legal Finality.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            Where parties already have a dispute resolution clause, SwiftResolwe administers the
            matter under that clause. Where they do not, the platform offers a suitable pre dispute
            SwiftClause, or a dispute resolution agreement entered into after the dispute arises,
            matched to the nature of the dispute. Each matter is then resolved through the tier
            that fits it best.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6" stagger={0.06}>
          {TIERS.map((t, i) => (
            <StaggerItem key={t.code}>
              <TierCard tier={t} idx={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-14 text-center">
          <p className="text-[15px] text-[color:var(--text-secondary)] max-w-2xl mx-auto mb-5">
            Unsure whether your claim qualifies for negotiation, mediation, conciliation or arbitration?
          </p>
          <button
            data-testid="triage-cta"
            onClick={() => openComingSoon("B")}
            className="cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold cta-glow-once"
          >
            Run Swift Triage Assessment
          </button>
        </Reveal>
      </div>
    </section>
  );
}
