import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import { useCountUp, useInView } from "../hooks";
import {
  Banknote, Wallet, ShoppingBag, ShieldCheck, Building2, Truck, HandCoins, Briefcase,
} from "lucide-react";

const TICKER = [
  "Modular Workflows: Standalone or Sequential Negotiation, Mediation, Conciliation, Arbitration",
  "Blockchain Backed Evidentiary Trails (Bharatiya Sakshya Adhiniyam Compliant)",
  "DPDP Act 2023 Secure Data Localization",
  "ISO 27001 Certified Infrastructure",
  "Enforceable as a Civil Court Decree under the Arbitration and Conciliation Act, 1996",
  "Fully Aligned with the Indian Mediation Act, 2023 Framework",
  "Pan India Panel of Certified Neutrals",
  "Bank Grade End to End Encryption",
  "Operational Across 28 States and UTs",
];

const SECTORS = [
  { icon: Banknote, label: "Banking and NBFCs" },
  { icon: Wallet, label: "Fintech and Payments" },
  { icon: ShoppingBag, label: "E Commerce and Marketplaces" },
  { icon: ShieldCheck, label: "Insurance" },
  { icon: Building2, label: "Real Estate" },
  { icon: Truck, label: "Supply Chain and Logistics" },
  { icon: HandCoins, label: "MSME Lending" },
  { icon: Briefcase, label: "Enterprise and Employment" },
];

function MetricCard({ value, suffix = "", prefix = "", label, range }) {
  const [ref, inView] = useInView({ threshold: 0.4, once: true });
  const upper = useCountUp(value, { duration: 1600, startWhen: inView });
  return (
    <div ref={ref} className="swift-card p-7 sm:p-8">
      <div className="font-display text-[40px] sm:text-[44px] font-semibold tracking-tight text-[color:var(--text-primary)]">
        {prefix}
        {range ? `${range.low} to ${upper}` : upper}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}

export default function TrustMetrics() {
  return (
    <section id="trust" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
          <StaggerItem>
            <MetricCard value={60} suffix=" Days" range={{ low: 30 }} label="Avg Resolution Time" />
          </StaggerItem>
          <StaggerItem>
            <MetricCard value={90} suffix="%" range={{ low: 80 }} label="Cost Reduction" />
          </StaggerItem>
          <StaggerItem>
            <MetricCard value={100} suffix="%" label="Statutory Enforceability" />
          </StaggerItem>
        </StaggerGroup>
      </div>

      {/* Ticker */}
      <div className="mt-14 marquee-pause" style={{ background: "var(--slate-deep)" }}>
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-12 py-4 whitespace-nowrap font-mono text-[12.5px] tracking-[0.06em] text-white/85">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-4 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent-bright)] shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Industries band */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-16 md:mt-20">
        <Reveal>
          <h3 className="text-center font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--text-muted)] mb-10">
            Built to Serve Industries Across India
          </h3>
        </Reveal>
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5" stagger={0.06}>
          {SECTORS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="swift-card flex items-center gap-3 px-5 py-5">
                <div className="w-10 h-10 rounded-xl bg-[color:rgba(6,182,212,0.1)] flex items-center justify-center text-[color:var(--accent-deep)]">
                  <s.icon size={20} />
                </div>
                <span className="text-[13.5px] font-medium text-[color:var(--text-primary)]">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
