import React, { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "./hooks";

/**
 * TypingReveal: live typewriter effect that reveals text character by
 * character (~1.6s total, regardless of length). Reserves final layout
 * space (unrevealed characters are visibility:hidden) so containers do
 * not reflow during reveal. Falls back to plain visible text under
 * prefers-reduced-motion.
 */
export default function TypingReveal({
  text,
  className = "",
  duration = 1600,
  delay = 0,
  as: As = "p",
  caret = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.15, once: true });
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const total = text ? text.length : 0;

  useEffect(() => {
    if (!inView || !total) return undefined;
    if (reduced) {
      setCount(total);
      setDone(true);
      return undefined;
    }
    const wait = setTimeout(() => {
      function tick(ts) {
        if (!startRef.current) startRef.current = ts;
        const p = Math.min(1, (ts - startRef.current) / duration);
        const eased = 1 - Math.pow(1 - p, 2);
        setCount(Math.floor(eased * total));
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
        else {
          setCount(total);
          setDone(true);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(wait);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, duration, delay, reduced, total]);

  const visible = text.slice(0, count);
  const hidden = text.slice(count);

  return (
    <As
      ref={ref}
      className={className}
      aria-label={text}
      style={{ whiteSpace: "pre-wrap" }}
    >
      <span aria-hidden="true">{visible}</span>
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
          }}
        />
      )}
      {!done && (
        <span aria-hidden="true" style={{ visibility: "hidden" }}>
          {hidden}
        </span>
      )}
    </As>
  );
}
