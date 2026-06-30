import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, X, Check } from "lucide-react";
import { useSwift } from "./SwiftContext";

export default function ScheduleConsultModal() {
  const { schedule, closeSchedule } = useSwift();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      closeSchedule();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {schedule.open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="schedule-modal"
        >
          <motion.div
            className="absolute inset-0 bg-[color:rgba(14,23,38,0.5)] backdrop-blur-sm"
            onClick={closeSchedule}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md w-full rounded-2xl bg-white border border-[color:var(--border-soft)] shadow-2xl p-7"
          >
            <button
              onClick={closeSchedule}
              data-testid="schedule-close"
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[color:var(--bg-surface-2)]"
            >
              <X size={18} />
            </button>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[color:rgba(6,182,212,0.12)] flex items-center justify-center text-[color:var(--accent-deep)] shrink-0">
                <CalendarCheck size={22} />
              </div>
              <div>
                <h3 className="font-display text-[20px] font-semibold text-[color:var(--text-primary)]">
                  Schedule a Consultation
                </h3>
                <p className="mt-1.5 text-[14px] text-[color:var(--text-secondary)]">
                  Consultations open shortly. Leave your email and we will reach out.
                </p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="schedule-email-input"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-[color:var(--border-soft)] bg-white text-[15px] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(6,182,212,0.2)]"
                />
                <button
                  type="submit"
                  data-testid="schedule-submit-btn"
                  className="cta-primary w-full px-5 py-3 rounded-xl text-[14px] font-semibold"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div data-testid="schedule-thanks" className="flex items-center gap-3 p-4 rounded-xl bg-[color:rgba(16,185,129,0.08)] border border-[color:rgba(16,185,129,0.25)]">
                <Check size={18} className="text-[color:var(--positive)]" />
                <p className="text-[14px] text-[color:var(--text-primary)]">
                  Thank you. We will be in touch shortly.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
