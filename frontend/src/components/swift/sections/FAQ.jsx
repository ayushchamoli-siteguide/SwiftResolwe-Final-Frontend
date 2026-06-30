import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "../Reveal";

const FAQS = [
  {
    code: "Q01",
    group: "Dispute resolution",
    q: "What are the four resolution tiers, and how is the right one chosen?",
    a: "SwiftResolwe offers four standalone tiers: Negotiate, Mediate, Conciliate, and Arbitrate. Negotiate lets parties settle directly. Mediate and Conciliate bring in a neutral to help reach a voluntary settlement, with the conciliator able to propose terms. Arbitrate ends in a binding award. Where parties already have a dispute resolution clause, the matter proceeds under it. Where they do not, SwiftResolwe provides a suitable pre dispute SwiftClause, or a dispute resolution agreement entered into after the dispute arises, matched to the dispute.",
  },
  {
    code: "Q02",
    group: "Dispute resolution",
    q: "What happens if the respondent ignores notices or refuses to participate?",
    a: "Non cooperation does not stall resolution. If a party ignores the secure notices in a Negotiation, Mediation, or Conciliation, the file is flagged for non compliance. Where a valid SwiftResolwe arbitration clause or agreement exists, the matter proceeds to Arbitration, where the appointed sole arbitrator may conduct a document based hearing and deliver an ex parte Arbitral Award that is final and binding.",
  },
  {
    code: "Q03",
    group: "Dispute resolution",
    q: "How are settlements and awards enforced across different states?",
    a: "Enforceability rests on central statutes. A Settlement Agreement under SwiftResolwe Negotiate is a binding contract. A Mediated or Conciliated Settlement Agreement under SwiftResolwe Mediate or Conciliate is enforceable in the same manner as a Civil Court Decree under Section 27 of the Mediation Act, 2023. An Arbitral Award under SwiftResolwe Arbitrate carries the status of a court decree under Section 36 of the Arbitration and Conciliation Act, 1996, and is enforceable across all 28 States and the Union Territories.",
  },
  {
    code: "Q04",
    group: "Dispute resolution",
    q: "What types of disputes can SwiftResolwe handle?",
    a: "SwiftResolwe handles a wide range of civil and commercial disputes: banking and loan defaults, e commerce and consumer matters, real estate and tenancy, supply chain and procurement, and employment and contractual disputes, including cross border matters. The platform resolves consensual and contractual disputes and does not handle non arbitrable claims reserved exclusively to courts and statutory tribunals.",
  },
  {
    code: "Q05",
    group: "Technology",
    q: "How does the AI work, and does it decide cases?",
    a: "AI organizes filings, summarizes large document sets, and routes each dispute to the right tier and neutral. It never decides the outcome. Every adjudicatory decision is made by a qualified human neutral. AI is the infrastructure, not the arbiter.",
  },
  {
    code: "Q06",
    group: "Technology",
    q: "How does SwiftResolwe integrate with our existing systems?",
    a: "SwiftResolwe connects through RESTful APIs, encrypted SFTP batch pipelines, and native CRM webhooks, integrating with your core banking, ERP, and CRM stack. Institutions can bulk onboard cases and track every claim in real time through dedicated dashboards.",
  },
  {
    code: "Q07",
    group: "Security, compliance, and data privacy",
    q: "How are electronic records made admissible under the Bharatiya Sakshya Adhiniyam, 2023?",
    a: "Every document, message, and milestone in the secure vaults is time stamped and cryptographically hashed. The platform generates a validated digital certificate that meets the electronic record admissibility conditions of Section 63 of the Bharatiya Sakshya Adhiniyam, 2023, removing the need for manual verification chains.",
  },
  {
    code: "Q08",
    group: "Security, compliance, and data privacy",
    q: "Is SwiftResolwe compliant with the DPDP Act, and where is data stored?",
    a: "Yes. Operating as a data fiduciary, SwiftResolwe runs on bank grade cloud infrastructure localized within India. All personal identifiers, financial records, and case data are processed under end to end encryption, in line with the processing and security requirements of the Digital Personal Data Protection Act, 2023.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="relative py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            Your Questions, <span style={{ color: "var(--accent-deep)" }}>Answered Clearly</span>.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            Straight answers on how SwiftResolwe works, how disputes are resolved, and how your data
            and outcomes are protected under Indian law.
          </p>
        </Reveal>

        <Reveal className="mt-12 swift-card p-2 sm:p-4">
          <ul>
            {FAQS.map((f, i) => {
              const open = openIdx === i;
              return (
                <li key={f.code} className="border-b border-[color:var(--border-soft)] last:border-b-0">
                  <button
                    data-testid={`faq-toggle-${f.code}`}
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="w-full text-left flex items-start justify-between gap-6 px-4 sm:px-6 py-5 group"
                    aria-expanded={open}
                  >
                    <div className="flex items-start gap-5 flex-1">
                      <span className="font-mono text-[11px] mt-1.5 uppercase tracking-[0.18em] text-[color:var(--accent)] shrink-0">
                        {f.code}
                      </span>
                      <span className="font-display text-[16px] sm:text-[17px] font-medium text-[color:var(--text-primary)] group-hover:text-[color:var(--accent-deep)] transition-colors">
                        {f.q}
                      </span>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        open ? "bg-[color:var(--accent)] text-white" : "bg-[color:var(--bg-surface-2)] text-[color:var(--text-primary)]"
                      }`}
                    >
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pl-4 sm:pl-[88px] text-[14.5px] leading-[1.75] text-[color:var(--text-secondary)]">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
