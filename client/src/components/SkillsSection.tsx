import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function SkillsSection() {
  const { content } = useLanguage();
  const { skills } = content;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="skills-section section-frame section-anchor">
      <div className="skills-intro">
        <p className="eyebrow">{skills.eyebrow}</p>
        <h2>{skills.headingLine1}<br /><em>{skills.headingEm}</em></h2>
        <p className="skills-lede">{skills.intro}</p>
        <div className="skills-artifact" aria-hidden="true"><span>{skills.artifactLabel}</span><i /><i /><b /></div>
      </div>

      <div className="skills-body">
        <div className="skills-bars">
          <p className="skills-subhead">{skills.barsLabel}</p>
          <div className="bar-list">
            {skills.bars.map((bar) => (
              <div className="bar-row" key={bar.name}>
                <div className="bar-row-head">
                  <span className="bar-name">{bar.name}</span>
                  <span className="bar-tier">{bar.tier}</span>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.level}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-tags">
          <div className="skills-filters" role="group" aria-label="Filter skills by category">
            <button
              type="button"
              className={activeCategory === null ? "skills-filter is-active" : "skills-filter"}
              onClick={() => setActiveCategory(null)}
            >
              {activeCategory === null && (
                <motion.span
                  layoutId="skills-filter-highlight"
                  className="skills-filter-highlight"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
                />
              )}
              <span className="skills-filter-label">{skills.filterAllLabel}</span>
            </button>
            {skills.categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={activeCategory === cat.id ? "skills-filter is-active" : "skills-filter"}
                onClick={() => setActiveCategory(cat.id)}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="skills-filter-highlight"
                    className="skills-filter-highlight"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
                  />
                )}
                <span className="skills-filter-label">{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="skill-tag-cloud">
            {skills.tags.map((tag) => {
              const isDimmed = activeCategory !== null && tag.category !== activeCategory;
              return (
                <span key={tag.name} className={isDimmed ? "skill-tag is-dimmed" : "skill-tag"}>
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="skills-certs">
        <p className="skills-subhead">{skills.certsLabel}</p>
        <div className="certs-list">
          {skills.certifications.map((cert) => (
            <div className="cert-chip" key={cert.title}>
              <strong>{cert.title}</strong>
              <span>{cert.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
