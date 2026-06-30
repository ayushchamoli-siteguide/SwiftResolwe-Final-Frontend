import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const SwiftCtx = createContext(null);

export function SwiftProvider({ children }) {
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
  const openSchedule = useCallback(() => setSchedule({ open: true }), []);
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
