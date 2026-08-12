import { AnimatePresence, motion, type Transition, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

type TextLoopProps = {
  words: string[];
  interval?: number;
  className?: string;
};

const DEFAULT_VARIANTS: Variants = {
  initial: { y: 20, rotateX: 90, opacity: 0 },
  animate: { y: 0, rotateX: 0, opacity: 1 },
  exit: { y: -20, rotateX: -90, opacity: 0 },
};

const DEFAULT_TRANSITION: Transition = { type: "spring", stiffness: 900, damping: 80, mass: 10 };

export function TextLoop({ words, interval = 2200, className }: TextLoopProps) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!prefersReducedMotion);
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (!animate) {
    return <span className={className ? `text-loop ${className}` : "text-loop"}>{words[0]}</span>;
  }

  return (
    <span className={className ? `text-loop ${className}` : "text-loop"}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          variants={DEFAULT_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={DEFAULT_TRANSITION}
          className="text-loop-item"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
