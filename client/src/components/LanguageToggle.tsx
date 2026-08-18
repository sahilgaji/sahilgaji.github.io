import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isGerman = language === "de";

  return (
    <button
      type="button"
      className="theme-toggle language-toggle"
      onClick={toggleLanguage}
      aria-label={isGerman ? "Switch to English" : "Auf Deutsch umschalten"}
      aria-pressed={isGerman}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={language}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="theme-toggle-icon language-toggle-icon"
        >
          {isGerman ? "DE" : "EN"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
