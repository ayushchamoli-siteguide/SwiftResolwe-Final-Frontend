import React from "react";
import { useSwift } from "./SwiftContext";

const COLS = [
  {
    title: "Resolution Modalities",
    items: [
      "SwiftResolwe Negotiate (Tier 1)",
      "SwiftResolwe Mediate (Tier 2)",
      "SwiftResolwe Conciliate (Tier 3)",
      "SwiftResolwe Arbitrate (Tier 4)",
      "SwiftResolwe Triage Engine",
    ],
  },
  {
    title: "Ecosystem Infrastructure",
    items: [
      "Empanelled Panel of Neutrals",
      "Developer Portal and REST API Docs",
      "Scale Based Retail Fee Matrix",
      "Institutional Case Studies",
    ],
  },
  {
    title: "Corporate and Legal",
    items: [
      "Terms of Service and Portal Rules",
      "Privacy Policy and Data Fiduciary Disclosures",
      "Standard Model ODR Contract Clauses",
      "Contact Enterprise Operations Team",
    ],
  },
];

export default function Footer() {
  const { openComingSoon } = useSwift();
  return (
    <footer data-testid="site-footer" className="mt-24">
      <div style={{ background: "var(--bg-surface-2)" }} className="border-t border-[color:var(--border-soft)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img src="/logo.webp" alt="SwiftResolwe" className="h-8 w-auto" />
            </div>
            <p className="text-[14px] leading-relaxed text-[color:var(--text-secondary)] max-w-xs">
              SwiftResolwe is India&apos;s premiere ODR 2.0 platform for resolving disputes quickly,
              fairly, and with full legal force. We bring negotiation, mediation, conciliation,
              and arbitration together in one secure digital space, and carry every case through
              to a final, legally binding resolution.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => openComingSoon("A")}
                      data-testid={`footer-link-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                      className="text-[14px] text-[color:var(--text-secondary)] hover:text-[color:var(--accent-deep)] transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom statutory ribbon */}
      <div style={{ background: "var(--slate-deep)" }} className="text-[color:rgba(255,255,255,0.7)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 text-[12.5px] leading-relaxed space-y-3">
          <p>
            SwiftResolwe operates strictly as an institutional Online Dispute Resolution (ODR)
            platform provider and administrator. The platform does not directly provide legal
            representation, advocacy services, or formal legal opinions. Empanelled dispute
            resolution professionals act as completely independent, neutral third parties in
            compliance with statutory disclosure mandates.
          </p>
          <p>
            All electronic records, metadata, and case logs are cryptographically processed and
            permanently stored within cloud data infrastructures located in India.
          </p>
          <p className="text-[color:rgba(255,255,255,0.55)] pt-2 border-t border-white/10">
            Copyright 2026 SwiftResolwe Platforms Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
