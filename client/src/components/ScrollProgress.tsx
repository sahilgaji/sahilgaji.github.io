import { motion, useScroll, useSpring, type SpringOptions } from "framer-motion";

type ScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
};

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 400,
  damping: 40,
  restDelta: 0.001,
};

export function ScrollProgress({ className, springOptions }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING,
    ...springOptions,
  });

  return <motion.div className={className} style={{ scaleY, transformOrigin: "0% 0%" }} />;
}
