import { motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

type TextRollProps = {
  text: string;
  className?: string;
  loopInterval?: number;
  duration?: number;
  transition?: Transition;
};

export function TextRoll({ text, className, loopInterval = 2000, duration = 0.4, transition }: TextRollProps) {
  const [replayKey, setReplayKey] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!prefersReducedMotion);
    if (prefersReducedMotion) return;

    const timer = setInterval(() => setReplayKey((k) => k + 1), loopInterval);
    return () => clearInterval(timer);
  }, [loopInterval]);

  if (!animate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-hidden="true">
      {text.split("").map((letter, i) => (
        <span key={`${replayKey}-${i}`} className="text-roll-letter-wrap" aria-hidden="true">
          <motion.span
            className="text-roll-letter"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration, delay: i * 0.018, ease: [0.175, 0.885, 0.32, 1.1], ...transition }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
