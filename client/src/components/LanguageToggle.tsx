import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isGerman = language === "de";

  return (
    <button
      type="button"
      className="switch-toggle language-switch"
      role="switch"
      aria-checked={isGerman}
      onClick={toggleLanguage}
    >
      <span className="sr-only">Language switch: {isGerman ? "German selected, activate for English" : "English selected, activate for German"}</span>
      <span className={isGerman ? "switch-icon" : "switch-icon is-active"} aria-hidden="true">EN</span>
      <span className={isGerman ? "switch-icon is-active" : "switch-icon"} aria-hidden="true">DE</span>
      <motion.span
        className="switch-thumb"
        animate={{ x: isGerman ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}
