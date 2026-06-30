import React, { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "./hooks";

/**
 * TypingReveal: renders full text (always readable). Animates a subtle
 * left-to-right reveal sweep on first scroll into view, then settles to
 * fully visible. Falls back to a plain fade under prefers-reduced-motion.
 */
export default function TypingReveal({
  text,
  className = "",
  duration = 1200,
  delay = 0,
  as: As = "p",
  caret = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.15, once: true });
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setProgress(1);
      setDone(true);
      return undefined;
    }
    const wait = setTimeout(() => {
      function tick(ts) {
        if (!startRef.current) startRef.current = ts;
        const p = Math.min(1, (ts - startRef.current) / duration);
        setProgress(p);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
        else setDone(true);
      }
      rafRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(wait);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, duration, delay, reduced]);

  // Text is always rendered visible; the sweep is a thin cyan highlight that
  // travels left to right, then disappears.
  const sweepStyle = !done && inView && !reduced
    ? {
        position: "relative",
        display: "inline",
      }
    : { display: "inline" };

  return (
    <As ref={ref} className={className} style={{ position: "relative" }}>
      <span style={sweepStyle}>{text}</span>
      {caret && !done && inView && !reduced && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "var(--accent-bright)",
            boxShadow: "0 0 8px rgba(6,182,212,.6)",
            marginLeft: 2,
            verticalAlign: "-2px",
            animation: "caret-blink 1s infinite step-end",
            opacity: 1 - progress * 0.3,
          }}
        />
      )}
    </As>
  );
}
