import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";
import { useSwift } from "./SwiftContext";

// --- Knowledge base built from the page ---
const KB = [
  {
    keys: ["negotiate", "tier 1", "tier01", "tier 01", "settle directly", "negotiation"],
    answer:
      "SwiftResolwe Negotiate is Tier 01. Parties settle the dispute directly, fully online, using text based settlement modules for retail claims or secure negotiation vaults for business parties. The outcome is a Settlement Agreement, enforceable as a binding contract under Section 10A of the Information Technology Act, 2000 and Section 85 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
  {
    keys: ["mediate", "tier 2", "tier 02", "mediation", "mediator"],
    answer:
      "SwiftResolwe Mediate is Tier 02. A neutral mediator helps both sides reach a voluntary settlement in encrypted virtual hearing rooms. The resulting Mediated Settlement Agreement is final and directly enforceable in the same manner as a Civil Court Decree under Section 27 of the Mediation Act, 2023.",
  },
  {
    keys: ["conciliate", "tier 3", "tier 03", "conciliation", "conciliator"],
    answer:
      "SwiftResolwe Conciliate is Tier 03. A neutral conciliator works with both parties and may propose possible terms of settlement. The Conciliated Settlement Agreement is final and enforceable in the same manner as a Civil Court Decree under Section 27 of the Mediation Act, 2023.",
  },
  {
    keys: ["arbitrate", "tier 4", "tier 04", "arbitration", "arbitrator", "award"],
    answer:
      "SwiftResolwe Arbitrate is Tier 04. A sole arbitrator or three member panel decides the dispute on a fast track online timeline. The Arbitral Award carries the authority of a Civil Court Decree, immediately enforceable under Section 36 of the Arbitration and Conciliation Act, 1996, supported by blockchain backed digital evidence under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
  {
    keys: ["enforce", "enforceability", "decree", "binding", "section 27", "section 36"],
    answer:
      "Enforceability under SwiftResolwe rests on central statutes. A Negotiated Settlement Agreement is a binding contract. A Mediated or Conciliated Settlement Agreement is enforceable like a Civil Court Decree under Section 27 of the Mediation Act, 2023. An Arbitral Award is enforceable as a court decree under Section 36 of the Arbitration and Conciliation Act, 1996, across all 28 States and Union Territories.",
  },
  {
    keys: ["sector", "banking", "nbfc", "fintech", "e commerce", "ecommerce", "real estate", "logistics", "supply chain", "employment", "industries"],
    answer:
      "SwiftResolwe is built for five core sectors: Banking, NBFCs and Fintech (V/01); E Commerce and Digital Marketplaces (V/02); Real Estate and Commercial Infrastructure (V/03); Supply Chain, Logistics and Procurement (V/04); and Employment and Workplace Disputes (V/05). It also serves Insurance and MSME Lending, with disputes handled across consumer and commercial matters.",
  },
  {
    keys: ["case manager", "case managers", "support", "guide", "intake"],
    answer:
      "Case managers are trained dispute resolution professionals, drawn from law graduates and ADR specialists. They are not the neutrals who decide your case. They guide you through intake, help organize documents, explain each step in plain language, and keep your matter moving. They are trained in SwiftResolwe ODR protocols, secure evidence handling, and strict neutrality boundaries.",
  },
  {
    keys: ["ai", "artificial intelligence", "machine", "decide"],
    answer:
      "AI organizes filings, summarizes large document sets, and routes each dispute to the right tier and neutral. It never decides the outcome. Every adjudicatory decision is made by a qualified human neutral. AI is the infrastructure, not the arbiter.",
  },
  {
    keys: ["dpdp", "privacy", "data", "localization", "storage"],
    answer:
      "Yes. SwiftResolwe operates as a data fiduciary on bank grade cloud infrastructure localized within India. All personal identifiers, financial records, and case data are processed under end to end encryption, in line with the Digital Personal Data Protection Act, 2023.",
  },
  {
    keys: ["evidence", "bsa", "bharatiya sakshya", "admissibility", "section 63", "blockchain"],
    answer:
      "Every document, message, and milestone in SwiftResolwe vaults is time stamped and cryptographically hashed. The platform generates a validated digital certificate that meets the electronic record admissibility conditions of Section 63 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
  {
    keys: ["integrate", "integration", "api", "sftp", "webhook", "crm", "erp"],
    answer:
      "SwiftResolwe connects through RESTful APIs, encrypted SFTP batch pipelines, and native CRM webhooks, integrating with your core banking, ERP, and CRM stack. Institutions can bulk onboard cases and track every claim in real time through dedicated dashboards.",
  },
  {
    keys: ["non cooperation", "ignore", "ex parte", "refuses"],
    answer:
      "Non cooperation does not stall resolution. If a party ignores secure notices in a Negotiation, Mediation, or Conciliation, the file is flagged for non compliance. Where a valid SwiftResolwe arbitration clause or agreement exists, the matter proceeds to Arbitration, where the sole arbitrator may conduct a document based hearing and deliver a final, binding ex parte Arbitral Award.",
  },
  {
    keys: ["types", "disputes", "what kind"],
    answer:
      "SwiftResolwe handles a wide range of civil and commercial disputes: banking and loan defaults, e commerce and consumer matters, real estate and tenancy, supply chain and procurement, and employment and contractual disputes, including cross border matters. The platform does not handle non arbitrable claims reserved exclusively to courts and statutory tribunals.",
  },
  {
    keys: ["court"],
    answer:
      "SwiftResolwe is not a court. It provides the procedural infrastructure, qualified neutrals, and institutional rules within which disputes are conclusively resolved, with full statutory enforceability.",
  },
  {
    keys: ["panel", "neutrals", "arbitrators", "mediators"],
    answer:
      "The SwiftResolwe panel includes Elite Arbitrators (former Supreme Court, High Court, and District Court jurists, designated senior advocates, and advocates with 10 to 25 years of arbitration experience) and Certified Mediators and Conciliators accredited by leading domestic and international institutes. Appointments mandate strict statutory disclosures under Section 12 of the Arbitration and Conciliation Act, 1996.",
  },
];

const REDIRECT =
  "For your specific matter, the best next step is a 30 mins consultation with our team. Please use the Schedule a Consultation button at the top of the page.";

function findAnswer(text) {
  const t = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of KB) {
    let score = 0;
    for (const k of item.keys) if (t.includes(k)) score += k.length;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return best ? best.answer : REDIRECT;
}

export default function ChatAssistant() {
  const { openComingSoon } = useSwift();
  const [open, setOpen] = useState(false);
  const [shownNotice, setShownNotice] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello. I am the SwiftResolwe Assistant. Ask me about the four resolution tiers, enforceability, sectors served, case managers, AI usage, or data privacy.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && !shownNotice) {
      // Fallback mode: show Coming Soon Message B once on first open
      const t = setTimeout(() => openComingSoon("B"), 350);
      setShownNotice(true);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open, shownNotice, openComingSoon]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = (e) => {
    e?.preventDefault?.();
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setTimeout(() => {
      const a = findAnswer(q);
      setMessages((m) => [...m, { role: "assistant", text: a }]);
    }, 500);
  };

  return (
    <>
      <button
        data-testid="chat-launcher"
        aria-label="Open SwiftResolwe Assistant"
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full text-white flex items-center justify-center cta-primary ${
          open ? "" : "chat-idle"
        }`}
        style={{ background: "var(--accent)" }}
      >
        {open ? <X size={22} /> : <MessageSquareText size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[69] bottom-24 right-5 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-7rem))] rounded-2xl bg-white/95 backdrop-blur-xl border border-[color:var(--border-soft)] shadow-2xl flex flex-col overflow-hidden"
            data-testid="chat-panel"
            role="dialog"
            aria-label="SwiftResolwe Assistant"
          >
            <div className="px-5 py-4 border-b border-[color:var(--border-soft)] flex items-center gap-3 bg-white">
              <div className="w-9 h-9 rounded-xl bg-[color:rgba(6,182,212,0.12)] flex items-center justify-center text-[color:var(--accent-deep)]">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="font-display text-[14.5px] font-semibold">SwiftResolwe Assistant</div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  Light mode, fallback
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" data-testid="chat-messages">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.6] ${
                    m.role === "assistant"
                      ? "bg-[color:var(--bg-surface-2)] text-[color:var(--text-primary)] mr-auto"
                      : "ml-auto text-white"
                  }`}
                  style={m.role === "user" ? { background: "var(--accent)" } : undefined}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={send} className="px-3 py-3 border-t border-[color:var(--border-soft)] bg-white flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tiers, enforceability, sectors..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[color:var(--border-soft)] bg-white text-[14px] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(6,182,212,0.2)]"
                data-testid="chat-input"
                aria-label="Type your question"
              />
              <button
                type="submit"
                aria-label="Send"
                data-testid="chat-send-btn"
                className="cta-primary w-10 h-10 rounded-xl flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
