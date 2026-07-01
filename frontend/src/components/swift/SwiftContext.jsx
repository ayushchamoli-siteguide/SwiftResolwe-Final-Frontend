import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SwiftCtx = createContext(null);

// External app login/onboarding URL. The "Login" CTA redirects here.
export const APP_LOGIN_URL = "https://odr-frontend-mu.vercel.app/auth/login";

export function SwiftProvider({ children }) {
  const navigate = useNavigate();
  const [comingSoon, setComingSoon] = useState({ open: false, variant: "A" });
  const [schedule, setSchedule] = useState({ open: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const openComingSoon = useCallback((variant = "A") => setComingSoon({ open: true, variant }), []);
  const closeComingSoon = useCallback(() => setComingSoon((s) => ({ ...s, open: false })), []);
  // "Schedule a Consultation" CTAs route to the dedicated booking page.
  const openSchedule = useCallback(() => {
    navigate("/schedule");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [navigate]);
  const closeSchedule = useCallback(() => setSchedule({ open: false }), []);

  const value = useMemo(
    () => ({ comingSoon, openComingSoon, closeComingSoon, schedule, openSchedule, closeSchedule, reducedMotion }),
    [comingSoon, openComingSoon, closeComingSoon, schedule, openSchedule, closeSchedule, reducedMotion]
  );

  return <SwiftCtx.Provider value={value}>{children}</SwiftCtx.Provider>;
}

export function useSwift() {
  const ctx = useContext(SwiftCtx);
  if (!ctx) throw new Error("useSwift must be inside SwiftProvider");
  return ctx;
}
