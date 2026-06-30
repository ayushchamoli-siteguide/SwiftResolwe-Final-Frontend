import React from "react";
import { motion } from "framer-motion";
import { useSwift } from "../SwiftContext";
import { Reveal } from "../Reveal";
import { ArrowRight } from "lucide-react";

const DISPUTES = [
  { id: "b2c", label: "B2C" },
  { id: "b2b", label: "B2B" },
  { id: "msme", label: "MSME" },
  { id: "banks", label: "Banks and NBFCs" },
  { id: "ent", label: "Enterprise" },
  { id: "cb", label: "Cross Border" },
];

const TIERS = [
  { id: "t1", label: "TIER 01", name: "SwiftNegotiate" },
  { id: "t2", label: "TIER 02", name: "SwiftMediate" },
  { id: "t3", label: "TIER 03", name: "SwiftConciliate" },
  { id: "t4", label: "TIER 04", name: "SwiftArbitrate" },
];

function TriageVisual() {
  // Coordinates: viewBox 660x560. Hub center (330, 280)
  const cx = 330, cy = 280, r = 90;
  const disputeX = 20, tierX = 500;
  const disputeYs = [50, 138, 226, 314, 402, 490];
  const tierYs = [104, 232, 360, 488];

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)] px-1">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
          Incoming Disputes
        </span>
        <span className="flex items-center gap-2">
          Resolution Tiers
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
        </span>
      </div>

      <div className="relative rounded-2xl swift-card overflow-hidden p-4 sm:p-6 bg-white">
        <svg
          viewBox="0 0 660 560"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Swift Triage Engine routing visual"
        >
          <defs>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E7490" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0E7490" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* faint grid */}
          <g opacity="0.45">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="560" stroke="#E8EDF5" strokeWidth="1" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 62} x2="660" y2={i * 62} stroke="#E8EDF5" strokeWidth="1" />
            ))}
          </g>

          {/* Edges: disputes -> hub */}
          {disputeYs.map((y, i) => {
            const path = `M ${disputeX + 130} ${y + 22} C ${disputeX + 220} ${y + 22}, ${cx - 130} ${cy}, ${cx - r} ${cy}`;
            return (
              <g key={`de-${i}`}>
                <path d={path} stroke="#CFE4EC" strokeWidth="1.4" fill="none" />
                <motion.circle
                  r="4"
                  fill="#06B6D4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                >
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} path={path} />
                </motion.circle>
              </g>
            );
          })}

          {/* Edges: hub -> tiers */}
          {tierYs.map((y, i) => {
            const path = `M ${cx + r} ${cy} C ${cx + 120} ${cy}, ${tierX - 80} ${y + 26}, ${tierX} ${y + 26}`;
            return (
              <g key={`te-${i}`}>
                <path d={path} stroke="#CFE4EC" strokeWidth="1.4" fill="none" />
                <motion.circle r="4" fill="#0891B2">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${0.6 + i * 0.35}s`} path={path} />
                </motion.circle>
              </g>
            );
          })}

          {/* Hub glow + circle */}
          <circle cx={cx} cy={cy} r={r + 36} fill="url(#hubGrad)" />
          <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#06B6D4" strokeWidth="1.8" />
          <circle cx={cx} cy={cy} r={r - 10} fill="none" stroke="#06B6D4" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 5">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="22s" repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy - 6} textAnchor="middle" className="font-mono" fontSize="15" fontWeight="700" fill="#0E1726" style={{ letterSpacing: "0.18em" }}>
            SWIFT TRIAGE
          </text>
          <text x={cx} y={cy + 16} textAnchor="middle" className="font-mono" fontSize="15" fontWeight="700" fill="#0891B2" style={{ letterSpacing: "0.18em" }}>
            ENGINE
          </text>

          {/* Dispute nodes */}
          {DISPUTES.map((d, i) => {
            const y = disputeYs[i];
            return (
              <g key={d.id}>
                <rect x={disputeX} y={y} width="130" height="44" rx="12" fill="white" stroke="#E2E8F2" strokeWidth="1.2" />
                <text x={disputeX + 65} y={y + 27} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0E1726" className="font-mono">
                  {d.label}
                </text>
              </g>
            );
          })}

          {/* Tier endpoints */}
          {TIERS.map((t, i) => {
            const y = tierYs[i];
            return (
              <g key={t.id}>
                <rect x={tierX} y={y} width="140" height="52" rx="12" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.4" />
                <text x={tierX + 70} y={y + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0E7490" className="font-mono" style={{ letterSpacing: "0.14em" }}>
                  {t.label}
                </text>
                <text x={tierX + 70} y={y + 38} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0E1726">
                  {t.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openSchedule } = useSwift();
  return (
    <section id="hero" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-radial-cyan pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <Reveal className="lg:col-span-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            India&apos;s Premier ODR 2.0 Infrastructure
          </div>
          <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[58px] leading-[1.05] font-semibold tracking-tight text-[color:var(--text-primary)]">
            Conflict is a variable;{" "}
            <br className="hidden sm:inline" />
            <span style={{ color: "var(--accent-deep)" }}>Resolution</span> a Constant.
          </h1>
          <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.7] text-[color:var(--text-secondary)] max-w-2xl">
            Skip the long delays of traditional courts. SwiftResolwe is an institutional online
            dispute resolution platform that routes every business or consumer dispute to the
            resolution path best suited to it, then carries it through to a binding settlement
            agreement or an enforceable arbitral award. Fast, simple, and fully online.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              data-testid="hero-schedule-cta"
              onClick={openSchedule}
              className="cta-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold cta-glow-once"
            >
              Schedule a 30 mins Consultation
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12.5px] font-mono uppercase tracking-[0.15em] text-[color:var(--text-muted)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--positive)]" />
              ISO 27001 CERTIFIED
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--positive)]" />
              END TO END ENCRYPTED
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--positive)]" />
              28 STATES AND UTS
            </span>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={0.15}>
          <TriageVisual />
        </Reveal>
      </div>
    </section>
  );
}
