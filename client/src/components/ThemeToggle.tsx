import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable || !toggleTheme) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="switch-toggle"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to day theme" : "Switch to night theme"}
    >
      <span className={isDark ? "switch-icon" : "switch-icon is-active"}><Sun size={12} /></span>
      <span className={isDark ? "switch-icon is-active" : "switch-icon"}><Moon size={12} /></span>
      <motion.span
        className="switch-thumb"
        animate={{ x: isDark ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}
