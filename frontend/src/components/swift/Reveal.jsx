import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./hooks";

const baseVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export function Reveal({ children, delay = 0, as = "div", className = "", id, stagger = 0.08 }) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={reduced ? reducedVariants : baseVariants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

export function StaggerGroup({ children, className = "", id, amount = 0.18, stagger = 0.12 }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", delay = 0 }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? reducedVariants : baseVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
