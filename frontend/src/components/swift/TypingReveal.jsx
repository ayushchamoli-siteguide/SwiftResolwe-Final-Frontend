import React, { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "./hooks";

/**
 * TypingReveal: renders full text in DOM (a11y / SEO) and reveals it
 * via a left-to-right text mask with a blinking caret.
 * Completes in ~1.6s regardless of text length.
 */
export default function TypingReveal({
  text,
  className = "",
  duration = 1600,
  delay = 0,
  as: As = "p",
  caret = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.2, once: true });
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

  const pct = `${Math.round(progress * 100)}%`;
  const style = {
    backgroundImage: `linear-gradient(to right, currentColor 0%, currentColor ${pct}, rgba(15,23,42,0.12) ${pct}, rgba(15,23,42,0.12) 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <As ref={ref} className={className}>
      <span style={style}>{text}</span>
      {caret && !done && inView && !reduced && <span className="caret-blink" aria-hidden="true" />}
    </As>
  );
}
