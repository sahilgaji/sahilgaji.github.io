import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { useEffect, useState } from "react";

const SPRING: SpringOptions = { bounce: 0.3, duration: 0.1 };
const SIZE = 52;

export function Spotlight() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-SIZE);
  const mouseY = useMotionValue(-SIZE);
  const left = useSpring(mouseX, SPRING);
  const top = useSpring(mouseY, SPRING);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - SIZE / 2);
      mouseY.set(event.clientY - SIZE / 2);
      setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="cursor-spotlight"
      style={{ width: SIZE, height: SIZE, left, top, opacity: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
      aria-hidden="true"
    />
  );
}
