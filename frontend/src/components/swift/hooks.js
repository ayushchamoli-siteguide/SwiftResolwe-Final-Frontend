import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.2, once: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (options.once) io.disconnect();
          } else if (!options.once) {
            setInView(false);
          }
        });
      },
      { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? "0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [options.threshold, options.once, options.rootMargin]);
  return [ref, inView];
}

export function useCountUp(target, { duration = 1400, startWhen = true, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!startWhen) return undefined;
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    const from = 0;
    const to = Number(target) || 0;
    function tick(ts) {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      setValue(decimals ? Number(v.toFixed(decimals)) : Math.round(v));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startWhen, decimals]);
  return value;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);
  return reduced;
}
