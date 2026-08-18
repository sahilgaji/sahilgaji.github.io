/**
 * Design system: Signal & Surface / Dry Operator — warm editorial systems dossier,
 * cobalt signals, dry evidence-led humour, and human-readable technical credibility.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "../components/ScrollProgress";
import { ProjectCaseModal } from "../components/ProjectCaseModal";
import { Typewriter } from "../components/Typewriter";
import { TextRoll } from "../components/TextRoll";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import type { ProjectContent } from "../content";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Link2,
  MoveRight,
} from "lucide-react";

const ASSETS = {
  logo: "/images/signal-mark.svg",
  hero: "/images/hero-signal-surface.svg",
  career: "/images/project-career-operating-system.svg",
  bosch: "/images/project-bosch-systems.svg",
  club: "/images/project-food-venture.svg",
};

const PROJECT_IMAGES = [ASSETS.career, ASSETS.bosch, ASSETS.club];

export type Project = ProjectContent & { image: string };

export default function Home() {
  const { content } = useLanguage();
  const navItems = [
    { id: "work", label: content.nav.work },
    { id: "method", label: content.nav.method },
    { id: "about", label: content.nav.about },
    { id: "contact", label: content.nav.contact },
  ];
  const projects: Project[] = content.projects.map((p, i) => ({ ...p, image: PROJECT_IMAGES[i] }));
  const principles = content.principles;
  const timeline = content.timeline;
  const sectionStatus = content.sectionStatus;

  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState<keyof typeof sectionStatus>("top");
  const [showHumanVersion, setShowHumanVersion] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [hoveredDockId, setHoveredDockId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const project = projects[activeProject];
  const status = sectionStatus[activeSection];

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = ["work", "method", "about", "contact"] as const;
      const checkpoint = window.scrollY + window.innerHeight * 0.34;
      const active = sections.findLast((id) => {
        const element = document.getElementById(id);
        return element && element.offsetTop <= checkpoint;
      });
      setActiveSection(active || "top");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const selectProject = (index: number) => {
    setActiveProject(index);
    setShowHumanVersion(false);
  };

  const handleShare = async () => {
    const shareData = { title: document.title, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the share sheet — no action needed
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // clipboard unavailable — nothing more we can do
    }
  };

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="signal-rail" aria-hidden="true">
        <img src={ASSETS.logo} alt="" className="rail-mark" />
        <span className="rail-label">SG / 2026</span>
        <span className="rail-line"><ScrollProgress className="rail-progress" /></span>
        <span className="rail-label rail-label-bottom">{status}</span>
      </div>

      <header className="topbar">
        <a href="#top" className="brand" aria-label={content.brandTopAria}>
          <img src={ASSETS.logo} alt={content.logoAlt} className="brand-mark" />
          <span className="brand-name">Sahil Gaji</span>
        </a>
        <div className="topbar-actions">
          <a className="cv-link" href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer">{content.cvLabel} <ArrowUpRight size={15} strokeWidth={2.1} /></a>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <nav className="dock-nav" aria-label="Primary navigation">
        <div className="dock-panel" onMouseLeave={() => setHoveredDockId(null)}>
          {navItems.map((item) => {
            const isHighlighted = (hoveredDockId ?? activeSection) === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredDockId(item.id)}
                className={isHighlighted ? "dock-pill is-active" : "dock-pill"}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="dock-highlight"
                    className="dock-pill-highlight"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
                  />
                )}
                <span className="dock-pill-label">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <main id="top">
        <section className="hero section-frame" onPointerMove={handlePointerMove}>
          <div className="hero-labels reveal-up">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <span className="hero-location">{content.hero.location} <i /></span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker reveal-up delay-1">{content.hero.kicker}</p>
            <h1 className="reveal-up delay-2 hero-headline">
              <span className="hero-headline-line1">{content.hero.headlineLine1Prefix} <Typewriter words={content.headlineVerbs} /> <motion.span layout className="hero-headline-word" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>{content.hero.headlineWord}</motion.span></span>
              {content.hero.headlineLine2Prefix} <em>{content.hero.headlineLine2Em}</em>
              <br />{content.hero.headlineLine3}
              <br />{content.hero.headlineLine4}
            </h1>
            <div className="hero-route reveal-up delay-3" aria-hidden="true">{content.hero.routeSteps.map((step, i, arr) => <span key={step}>{step}{i < arr.length - 1 && <i />}</span>)}</div>
            <div className="hero-summary reveal-up delay-3">
              <p>{content.hero.summary}</p>
              <a href="#work" className="round-arrow" aria-label={content.hero.exploreAria}><ArrowDown size={25} strokeWidth={1.8} /></a>
            </div>
          </div>
          <div className="hero-art reveal-up delay-3" style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
            <span className="art-orbit orbit-a" aria-hidden="true" /><span className="art-orbit orbit-b" aria-hidden="true" /><span className="art-dot" aria-hidden="true" />
            <img src={ASSETS.hero} alt="Abstract cobalt and coral system components" />
            <div className="art-caption"><span>Signal / 01</span><span>{content.hero.artCaption}</span></div>
          </div>
          <div className="hero-bottom reveal-up delay-4">
            <p><span className="status-dot" /> <span className="sr-only">{content.hero.statusLine}</span><TextRoll text={content.hero.statusLine} /></p>
            <a href="#contact">{content.hero.startConversation} <MoveRight size={16} /></a>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Selected impact metrics">
          {content.metrics.map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </section>

        <section id="work" className="work-section section-frame section-anchor">
          <div className="section-head">
            <div><p className="eyebrow">{content.work.eyebrow}</p><h2>{content.work.headingLine1}<br /><em>{content.work.headingEm}</em></h2></div>
            <p className="section-intro">{content.work.intro}</p>
          </div>
          <div className="work-layout">
            <div className="project-list" aria-label={content.work.selectAria}>
              {projects.map((item, index) => (
                <button type="button" className={index === activeProject ? "project-row is-selected" : "project-row"} key={item.title} onMouseEnter={() => selectProject(index)} onFocus={() => selectProject(index)} onClick={() => selectProject(index)} aria-pressed={index === activeProject}>
                  <span className="project-number">{item.number}</span><span className="project-title-wrap"><strong>{item.title}</strong><small>{item.subtitle}</small></span><ArrowUpRight className="project-arrow" size={19} />
                </button>
              ))}
            </div>
            <article className="project-viewer" key={project.title}>
              <div className="viewer-route" aria-label={content.work.stageAria}>{content.work.stageSteps.map((step, i, arr) => <span key={step}>{step}{i < arr.length - 1 && <i />}</span>)}</div>
              <motion.div layoutId={`case-image-${project.number}`} className="viewer-image-wrap"><img src={project.image} alt={content.work.imageAlt(project.title)} className="viewer-image" /><span className="viewer-index">{project.number}</span><img src={ASSETS.logo} alt="" className="viewer-brand-mark" /></motion.div>
              <div className="viewer-body">
                <div className="viewer-controls">
                  <p className="case-diagnosis">{project.diagnosis}</p>
                  <button type="button" className={showHumanVersion ? "translation-toggle is-active" : "translation-toggle"} onClick={() => setShowHumanVersion((current) => !current)} aria-pressed={showHumanVersion}>{showHumanVersion ? content.work.technicalView : content.work.humanTranslation}</button>
                </div>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className={showHumanVersion ? "viewer-statement is-human" : "viewer-statement"}>{showHumanVersion ? project.humanVersion : project.statement}</p>
                <ul>{project.details.map((detail) => <li key={detail}><Check size={15} strokeWidth={2.6} />{detail}</li>)}</ul>
                <button type="button" className="text-link" onClick={() => setIsCaseModalOpen(true)}>{content.work.readFullCase} <MoveRight size={16} /></button>
              </div>
            </article>
          </div>
        </section>

        <section id="method" className="method-section section-frame section-anchor">
          <div className="method-intro"><p className="eyebrow">{content.method.eyebrow}</p><h2>{content.method.headingLine1}<br /><em>{content.method.headingEm}</em></h2><p>{content.method.body}</p><div className="method-artifact" aria-hidden="true"><span>{content.method.artifactLabel}</span><i /><i /><b /></div></div>
          <div className="principles-shell">
            <div className="method-route" aria-hidden="true">{content.method.routeSteps.map((step, i, arr) => <span key={step}>{step}{i < arr.length - 1 && <i />}</span>)}</div>
            <div className="principles-list">{principles.map((principle) => <article className="principle" key={principle.number} tabIndex={0}><span className="principle-number">{principle.number}</span><h3>{principle.title}</h3><p>{principle.evidence}</p><span className="principle-plus">+</span></article>)}</div>
          </div>
        </section>

        <section id="about" className="about-section section-frame section-anchor">
          <div className="about-aside">
            <p className="eyebrow">{content.about.eyebrow}</p><h2>{content.about.headingLine1}<br /><em>{content.about.headingEm}</em></h2>
            <p className="about-lede">{content.about.lede}</p>
          </div>
          <div className="timeline-shell">
            <div className="about-route" aria-hidden="true">{content.about.routeSteps.map((step, i, arr) => <span key={step}>{step}{i < arr.length - 1 && <i />}</span>)}</div>
            <div className="timeline">{timeline.map((item, index) => <article className={item.type === "education" ? "timeline-item is-education" : "timeline-item"} key={item.period + item.role}><span className="timeline-dot" /><span className="timeline-period">{item.period}</span><div>{item.type === "education" && <span className="timeline-badge">{content.about.educationBadge}</span>}<h3>{item.role}</h3><p className="timeline-org">{item.org}</p><p className="timeline-note">{item.note}</p></div><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span></article>)}</div>
          </div>
        </section>

        <section id="contact" className="contact-section section-frame section-anchor">
          <div className="contact-artifact" aria-hidden="true"><span>{content.contact.channelLabel}</span><i /><i /></div>
          <p className="eyebrow">{content.contact.eyebrow}</p><h2><span className="nowrap-line">{content.contact.headingLine1}</span><br /><em className="nowrap-line">{content.contact.headingEm}</em><br /><span className="nowrap-line">{content.contact.headingLine3}</span></h2>
          <div className="contact-bottom">
            <div className="contact-details">
              <a className="contact-detail" href="mailto:sahil.gaji@outlook.com"><span className="contact-detail-label">{content.contact.emailLabel}</span><span className="contact-detail-value">sahil.gaji@outlook.com <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="mailto:sahil.s.gaji@gmail.com"><span className="contact-detail-label">{content.contact.emailLabel}</span><span className="contact-detail-value">sahil.s.gaji@gmail.com <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://www.linkedin.com/in/sahil-gaji/" target="_blank" rel="noreferrer"><span className="contact-detail-label">{content.contact.linkedinLabel}</span><span className="contact-detail-value">in/sahil-gaji <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://github.com/sahilgaji/sahilgaji.github.io" target="_blank" rel="noreferrer"><span className="contact-detail-label">{content.contact.githubLabel}</span><span className="contact-detail-value">sahilgaji <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://topmate.io/sahil_gaji" target="_blank" rel="noreferrer"><span className="contact-detail-label">{content.contact.topmateLabel}</span><span className="contact-detail-value">sahil_gaji <ArrowUpRight size={16} /></span></a>
            </div>
            <p className="contact-languages">{content.contact.languages}</p>
            <button type="button" className="share-button" onClick={handleShare}>
              <Link2 size={15} /> {shareState === "copied" ? content.contact.linkCopied : content.contact.sharePage}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer section-frame">
        <a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="" /> <span>{content.footer.brandLabel}</span></a>
        <p>{content.footer.copyright} · <a href="/impressum">{content.footer.impressum}</a> · <a href="/datenschutz">{content.footer.datenschutz}</a></p>
      </footer>

      <ProjectCaseModal project={isCaseModalOpen ? project : null} onClose={() => setIsCaseModalOpen(false)} />
    </div>
  );
}
