import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import TypingReveal from "../TypingReveal";
import { Landmark, ShoppingCart, Home, Truck, Briefcase } from "lucide-react";

const SECTORS = [
  {
    code: "V/01",
    icon: Landmark,
    title: "Banking, NBFCs and Fintech",
    sub: "High Volume NPA and Delinquency Routing",
    body:
      "Programmatic ingestion of retail loan defaults. Built on a secure, API first architecture with bank grade end to end encryption, ISO 27001 aligned infrastructure, and data localization under the DPDP Act, 2023, so high volume portfolios move safely from your core systems into structured resolution.",
  },
  {
    code: "V/02",
    icon: ShoppingCart,
    title: "E Commerce and Digital Marketplaces",
    sub: "Transaction and Consumer Dispute Resolution",
    body:
      "Structured resolution of merchant payment disputes, service level failures, and consumer grievances at scale. Disputes are routed and resolved without disrupting platform retention or Gross Merchandise Value, keeping buyers and sellers active on your marketplace.",
  },
  {
    code: "V/03",
    icon: Home,
    title: "Real Estate and Commercial Infrastructure",
    sub: "Tenancy and Asset Adjudication",
    body:
      "Accelerated dispute resolution for commercial and residential lease disputes, builder and buyer claims, contractor non performance, and vendor payment delays. Matters move past congested tribunals toward enforceable outcomes, with the right neutral assigned to each dispute.",
  },
  {
    code: "V/04",
    icon: Truck,
    title: "Supply Chain, Logistics and Procurement",
    sub: "Operational Continuity and Transit Conflicts",
    body:
      "Rapid resolution of cross border and domestic supply chain breakdowns, procurement and vendor contract breaches, and transit and delivery disputes. The focus is on protecting operational continuity and preserving critical vendor partnerships, with mediation and conciliation available under the Mediation Act, 2023.",
  },
  {
    code: "V/05",
    icon: Briefcase,
    title: "Employment and Workplace Disputes",
    sub: "Workforce and Contractual Conflicts",
    body:
      "Confidential resolution of employment and workplace disputes, including contractual claims, separation and severance, and restrictive covenant issues, heard in secure virtual rooms by neutrals experienced in employment matters. The platform handles consensual and contractual disputes and does not adjudicate non arbitrable statutory claims reserved to labour courts and tribunals.",
  },
];

export default function EnterpriseSectors() {
  return (
    <section id="enterprise-sectors" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Systemic Integration
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-4xl">
            Integrates Natively With Your <span style={{ color: "var(--accent-deep)" }}>Core Banking, ERP, and CRM Stack</span>. Built for Every Sector.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.08}>
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.code}>
                <div className="swift-card p-7 h-full flex flex-col">
                  <div className="flex items-center justify-end mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[color:rgba(6,182,212,0.1)] flex items-center justify-center text-[color:var(--accent-deep)]">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-display text-[19px] font-semibold leading-tight text-[color:var(--text-primary)] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-5">
                    {s.sub}
                  </p>
                  <TypingReveal
                    text={s.body}
                    as="p"
                    className="text-[14px] leading-[1.7] text-[color:var(--text-secondary)]"
                    delay={i * 200}
                    duration={1700}
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white px-8 py-7 text-center">
            <p className="text-[16.5px] leading-[1.6] text-[color:var(--text-primary)]">
              <span className="font-semibold text-[color:var(--accent-deep)]">Architecture Agnostic Integration:</span>{" "}
              Deploy via RESTful APIs, encrypted SFTP batch pipelines, or native CRM webhooks.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
