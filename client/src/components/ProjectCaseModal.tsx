import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "../pages/Home";

type ProjectCaseModalProps = {
  project: Project | null;
  onClose: () => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProjectCaseModal({ project, onClose }: ProjectCaseModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          onClick={onClose}
        >
          <motion.div
            className="case-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-modal-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <motion.div layoutId={`case-image-${project.number}`} className="case-modal-image-wrap">
              <img src={project.image} alt="" className="case-modal-image" />
              <span className="case-modal-index">{project.number}</span>
            </motion.div>

            <button type="button" className="case-modal-close" onClick={onClose} aria-label="Close case study" ref={closeRef}>
              <X size={20} />
            </button>

            <motion.div
              className="case-modal-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.32, ease: EASE }}
            >
              <p className="case-modal-period">{project.period}</p>
              <h2 id="case-modal-title">{project.title}</h2>
              <p className="case-modal-quote">{project.pullQuote}</p>

              <div className="case-modal-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="case-modal-metric">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="case-modal-story">
                {project.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="case-modal-retro">
                <p className="case-modal-retro-label">What I'd do differently</p>
                <p>{project.retro}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
