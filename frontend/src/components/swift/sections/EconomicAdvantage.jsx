import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "../Reveal";
import { useCountUp, useInView } from "../hooks";
import { Calculator, IndianRupee } from "lucide-react";

function estimate(claim) {
  let tradRate;
  if (claim <= 1000000) tradRate = 0.10;
  else if (claim <= 5000000) tradRate = 0.08;
  else if (claim <= 10000000) tradRate = 0.06;
  else if (claim <= 50000000) tradRate = 0.045;
  else tradRate = 0.035;
  const tradCost = claim * tradRate;

  let odrFraction;
  if (claim <= 1000000) odrFraction = 0.15;
  else if (claim <= 5000000) odrFraction = 0.14;
  else if (claim <= 10000000) odrFraction = 0.13;
  else if (claim <= 50000000) odrFraction = 0.12;
  else odrFraction = 0.11;
  const odrCost = tradCost * odrFraction;

  const costSaved = tradCost - odrCost;
  const pctSaved = Math.round((costSaved / tradCost) * 100);

  let courtDays;
  if (claim <= 1000000) courtDays = 547;
  else if (claim <= 5000000) courtDays = 730;
  else if (claim <= 10000000) courtDays = 900;
  else if (claim <= 50000000) courtDays = 1050;
  else courtDays = 1200;
  const odrDays = 60;
  const daysSaved = courtDays - odrDays;

  return { tradCost, odrCost, costSaved, pctSaved, courtDays, odrDays, daysSaved };
}

function formatIndianRupees(amount) {
  if (amount >= 10000000) {
    return `Rupees ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `Rupees ${(amount / 100000).toFixed(2)} L`;
  }
  return `Rupees ${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatClaimLabel(amount) {
  if (amount >= 10000000) return `Rupees ${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `Rupees ${(amount / 100000).toFixed(2)} L`;
  return `Rupees ${Math.round(amount).toLocaleString("en-IN")}`;
}

function MetricCard({ value, suffix = "", range, label }) {
  const [ref, inView] = useInView({ threshold: 0.4, once: true });
  const upper = useCountUp(value, { duration: 1600, startWhen: inView });
  return (
    <div ref={ref} className="swift-card p-6 sm:p-7">
      <div className="font-display text-[36px] font-semibold tracking-tight text-[color:var(--text-primary)]">
        {range ? `${range} to ${upper}` : upper}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}

function TimelineBar({ inView, label, value, note, widthPct, color }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
          {label}
        </span>
        <span className="font-display text-[15px] font-semibold text-[color:var(--text-primary)]">
          {value}
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-surface-2)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${widthPct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
      <p className="mt-3 text-[13px] leading-[1.6] text-[color:var(--text-secondary)] max-w-md">{note}</p>
    </div>
  );
}

export default function EconomicAdvantage() {
  const [claim, setClaim] = useState(2500000); // 25 L default
  const result = useMemo(() => estimate(claim), [claim]);
  const [timelineRef, timelineInView] = useInView({ threshold: 0.3, once: true });

  return (
    <section id="economic" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
            Cost Benefit Optimization
          </div>
          <h2 className="font-display text-[34px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            The Numbers <span style={{ color: "var(--accent-deep)" }}>Work in Your Favor</span>.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--text-secondary)] max-w-3xl">
            See exactly what you save in time, money, and legal capacity when you move disputes off
            the docket and onto SwiftResolwe.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-7">
          <Reveal className="lg:col-span-7">
            <div ref={timelineRef} className="swift-card p-7 md:p-9">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent-deep)] mb-7 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />
                Dynamic Resolution Timeline
              </h3>
              <TimelineBar
                inView={timelineInView}
                label="Traditional Indian Court or Ad Hoc Proceedings"
                value="1,000+ Days"
                note="Vulnerable to ad interim stays, perennial backlogs, uncapped billable hours, and mandatory physical appearances."
                widthPct={100}
                color="var(--neg)"
              />
              <TimelineBar
                inView={timelineInView}
                label="The SwiftResolwe ODR Engine (Active State)"
                value="45 to 60 Days Fixed Resolution Window"
                note="Driven by blockchain anchored cryptographic evidence under Section 63 of the BSA, 2023, and by neutrals whose domain specific expertise and training deliver resolution within a fixed window."
                widthPct={5}
                color="var(--accent)"
              />
            </div>
          </Reveal>

          <StaggerGroup className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
            <StaggerItem>
              <MetricCard value={20} suffix="x" label="Faster Resolution" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard value={90} suffix="%" range={80} label="Total Costs Saved" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard value={78} suffix="%" label="Aggregate Resolution Rate" />
            </StaggerItem>
          </StaggerGroup>
        </div>

        {/* Interactive Calculator */}
        <Reveal className="mt-14">
          <div className="swift-card p-7 md:p-10 relative overflow-hidden">
            <div
              className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(closest-side, rgba(6,182,212,0.12), transparent 70%)" }}
            />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent-deep)] mb-3 flex items-center gap-2">
                <Calculator size={13} />
                Claim Amount Lever
              </div>
              <h3 className="font-display text-[24px] md:text-[28px] font-semibold text-[color:var(--text-primary)]">
                Set your claim. Watch the math react.
              </h3>
              <p className="mt-2 text-[14.5px] text-[color:var(--text-secondary)]">
                Drag the slider from Rupees 1L to Rupees 10Cr.
              </p>

              <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                      Claim Amount
                    </span>
                    <span
                      data-testid="claim-value"
                      className="font-display text-[22px] font-semibold text-[color:var(--accent-deep)] flex items-center gap-1"
                    >
                      <IndianRupee size={18} />
                      {formatClaimLabel(claim).replace("Rupees ", "")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={100000000}
                    step={50000}
                    value={claim}
                    onChange={(e) => setClaim(Number(e.target.value))}
                    className="swift-slider w-full"
                    data-testid="claim-slider"
                    aria-label="Claim amount slider"
                  />
                  <div className="mt-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    <span>Rupees 1L</span>
                    <span>Rupees 10Cr</span>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    key={`cost-${claim}`}
                    initial={{ opacity: 0.6, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl p-5 border border-[color:var(--border-soft)]"
                    style={{ background: "var(--bg-surface-2)" }}
                    data-testid="result-cost"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-2">
                      Est. Cost Saved
                    </div>
                    <div className="font-display text-[22px] font-semibold text-[color:var(--text-primary)] leading-tight">
                      {formatIndianRupees(result.costSaved)}
                    </div>
                    <div className="mt-1.5 text-[12px] text-[color:var(--text-secondary)]">
                      {result.pctSaved}% lesser than traditional litigation cost
                    </div>
                  </motion.div>

                  <motion.div
                    key={`days-${claim}`}
                    initial={{ opacity: 0.6, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl p-5 border border-[color:var(--border-soft)]"
                    style={{ background: "var(--bg-surface-2)" }}
                    data-testid="result-days"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-2">
                      Est. Days Saved
                    </div>
                    <div className="font-display text-[22px] font-semibold text-[color:var(--text-primary)] leading-tight">
                      {result.daysSaved.toLocaleString("en-IN")} Days
                    </div>
                    <div className="mt-1.5 text-[12px] text-[color:var(--text-secondary)]">
                      court days versus 60 on SwiftResolwe
                    </div>
                  </motion.div>
                </div>
              </div>

              <p className="mt-6 text-[12.5px] text-[color:var(--text-muted)]">
                Estimates only. Actual figures vary by matter.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
