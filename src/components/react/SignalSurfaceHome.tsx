/**
 * Design system: Signal & Surface — a warm editorial systems dossier with cobalt signals,
 * asymmetric detail panels, and motion that rewards curiosity without obscuring content.
 */
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Mail,
  Menu,
  MoveRight,
  X,
} from "lucide-react";
// Github and Linkedin brand icons aren't exported by the installed
// lucide-react version (removed upstream) — ArrowUpRight substitutes,
// already used elsewhere on this page for the same "opens elsewhere" cue.
import "@fontsource-variable/space-grotesk";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "./signal-surface.css";

// Placeholder assets (SVG, abstract) — swap for the real Manus exports once
// dropped in website/Manus_Assets/. Logo reuses the site's existing SG
// monogram rather than inventing a new mark without sign-off.
const ASSETS = {
  logo: "/favicon.svg",
  hero: "/manus-assets/placeholder-hero.svg",
  career: "/manus-assets/placeholder-career.svg",
  bosch: "/manus-assets/placeholder-bosch.svg",
  club: "/manus-assets/placeholder-club.svg",
};

const navItems = [
  { id: "work", label: "Work" },
  { id: "method", label: "How I work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    number: "01",
    title: "Career Operating System",
    subtitle: "Apply to fewer jobs, better.",
    image: ASSETS.career,
    tags: ["Automation", "Pipeline design", "Retrospective"],
    statement:
      "A self-built job-search system run like a transformation project: a real pipeline, a living dashboard, and a retrospective loop.",
    details: [
      "Designed during a self-directed upskilling period focused on Python, automation, and AI/LLM tooling.",
      "Turns a daily job search into a focused operating rhythm rather than a volume exercise.",
      "Built around a simple belief: instrument the work, then improve the bottleneck.",
    ],
  },
  {
    number: "02",
    title: "Robert Bosch GmbH",
    subtitle: "Adoption is the actual product.",
    image: ASSETS.bosch,
    tags: ["Jira", "PMO", "Change adoption"],
    statement:
      "At Bosch, the tool configuration was only the first fifth of the work. The real project was making a new system useful enough to be adopted.",
    details: [
      "Standardised Jira workflows and PMO reporting across three cross-functional projects.",
      "Trained 150+ managers and team leads to make the new working system stick.",
      "Migrated documentation to Confluence, cutting document retrieval time by roughly 30%.",
    ],
  },
  {
    number: "03",
    title: "Club House",
    subtitle: "The business continued after handover.",
    image: ASSETS.club,
    tags: ["Operations", "VBA", "Founding"],
    statement:
      "A food-and-beverage startup co-founded alongside a full-time job. The useful test was whether the business could continue once its systems had a different owner.",
    details: [
      "Built VBA tools for invoicing and stock tracking while co-founding the venture part-time.",
      "Secured ₹600,000 in funding and handed ownership to the remaining partners after six months.",
      "The business kept operating — a real-world test of systems over heroic effort.",
    ],
  },
];

const principles = [
  {
    number: "I",
    title: "Understand before solving",
    evidence:
      "A messy spreadsheet, an unclear plan, or a confusing workflow is usually a question before it is a solution. Start by separating the problem into parts.",
  },
  {
    number: "II",
    title: "Systems over heroics",
    evidence:
      "If a process depends on one person always being present, it has not been designed to last. The handover is part of the build.",
  },
  {
    number: "III",
    title: "Measure before improving",
    evidence:
      "From manufacturing quality reports to a job-search dashboard, metrics make the real bottleneck visible before effort is spent in the wrong place.",
  },
  {
    number: "IV",
    title: "Adoption is the product",
    evidence:
      "A technically correct workflow still fails if people cannot or will not use it. Documentation, training, and feedback belong in the scope.",
  },
];

const timeline = [
  {
    period: "2025 — now",
    role: "Quality Control Associate",
    org: "Picnic Technologies · Hamburg",
    note: "Quality audits, inventory accuracy, and defect-pattern tracking in a fulfilment environment.",
  },
  {
    period: "2024 — 2025",
    role: "Career break · self-directed upskilling",
    org: "Automation, Python, AI/LLM tooling",
    note: "Designed and built the Career Operating System while sharpening digital transformation tools.",
  },
  {
    period: "2024",
    role: "Intern, Project Management Digitalization",
    org: "Robert Bosch GmbH · Reutlingen",
    note: "Jira workflows, PMO reporting, Confluence migration, and system adoption across teams.",
  },
  {
    period: "2023",
    role: "Intern, Project Development & Finance Advisory",
    org: "Dornier Suntrace · Hamburg",
    note: "Renewable-energy feasibility research and Excel VBA forecasting automation.",
  },
  {
    period: "2020 — 2022",
    role: "Operations, quality & founding",
    org: "Club House · KEIHIN FIE · GirnarSoft",
    note: "A startup, reporting systems, quality engineering, market research, and a recurring instinct to make work legible.",
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const project = projects[activeProject];

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = ["work", "method", "about", "contact"];
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell signal-surface">
      <div className="grain" aria-hidden="true" />
      <div className="signal-rail" aria-hidden="true">
        <img src={ASSETS.logo} alt="" className="rail-mark" />
        <span className="rail-label">SG / 2026</span>
        <span className="rail-line">
          <span className={`rail-progress rail-${activeSection}`} />
        </span>
        <span className="rail-label rail-label-bottom">SYSTEMS</span>
      </div>

      <header className="topbar">
        <a href="#top" className="brand" aria-label="Sahil Gaji — top of page">
          <img src={ASSETS.logo} alt="Sahil Gaji signal mark" className="brand-mark" />
          <span className="brand-name">Sahil Gaji</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="cv-link" href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer">
          CV <ArrowUpRight size={15} strokeWidth={2.1} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <span className="eyebrow">Navigate</span>
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id} onClick={closeMenu}>
              <span>{item.label}</span>
              <MoveRight size={23} />
            </a>
          ))}
          <a href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer" onClick={closeMenu}>
            <span>Open CV</span>
            <ArrowUpRight size={23} />
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero section-frame" onPointerMove={handlePointerMove}>
          <div className="hero-labels reveal-up">
            <span className="eyebrow">Independent systems builder</span>
            <span className="hero-location">Hamburg, DE <i /></span>
          </div>

          <div className="hero-copy">
            <p className="hero-kicker reveal-up delay-1">Sahil Gaji / Portfolio</p>
            <h1 className="reveal-up delay-2">
              I build systems that <em>keep working</em> when I leave the room.
            </h1>
            <div className="hero-route reveal-up delay-3" aria-hidden="true">
              <span>Observe</span><i /><span>Build</span><i /><span>Adopt</span>
            </div>
            <div className="hero-summary reveal-up delay-3">
              <p>
                Mechanical engineer by training. Project-management and digital-transformation person by choice.
                I turn messy work into clear, adopted systems.
              </p>
              <a href="#work" className="round-arrow" aria-label="Explore selected work">
                <ArrowDown size={25} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <div className="hero-art reveal-up delay-3" style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
            <span className="art-orbit orbit-a" aria-hidden="true" />
            <span className="art-orbit orbit-b" aria-hidden="true" />
            <span className="art-dot" aria-hidden="true" />
            <img src={ASSETS.hero} alt="Abstract cobalt and coral system components" />
            <div className="art-caption">
              <span>Signal / 01</span>
              <span>Scroll to inspect</span>
            </div>
          </div>

          <div className="hero-bottom reveal-up delay-4">
            <p>Available for junior PM, PMO, process &amp; digital-transformation conversations.</p>
            <a href="#contact">Start a conversation <MoveRight size={16} /></a>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Selected impact metrics">
          <div><strong>150+</strong><span>people trained</span></div>
          <div><strong>3</strong><span>cross-functional projects</span></div>
          <div><strong>~30%</strong><span>faster document retrieval</span></div>
          <div><strong>15–16%</strong><span>defect reduction</span></div>
        </section>

        <section id="work" className="work-section section-frame section-anchor">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2>Three systems.<br /><em>One pattern.</em></h2>
            </div>
            <p className="section-intro">Each case starts with a practical question: can the work continue without the person who made it?</p>
          </div>

          <div className="work-layout">
            <div className="project-list" aria-label="Select a case study">
              {projects.map((item, index) => (
                <button
                  type="button"
                  className={index === activeProject ? "project-row is-selected" : "project-row"}
                  key={item.title}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                  onClick={() => setActiveProject(index)}
                  aria-pressed={index === activeProject}
                >
                  <span className="project-number">{item.number}</span>
                  <span className="project-title-wrap">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <ArrowUpRight className="project-arrow" size={19} />
                </button>
              ))}
            </div>

            <article className="project-viewer" key={project.title}>
              <div className="viewer-route" aria-label="Project system stages">
                <span>INTAKE</span><i /><span>BUILD</span><i /><span>ADOPT</span><i /><span>HANDOVER</span>
              </div>
              <div className="viewer-image-wrap">
                <img src={project.image} alt="Conceptual visual for selected case study" className="viewer-image" />
                <span className="viewer-index">{project.number}</span>
              </div>
              <div className="viewer-body">
                <div className="tag-list">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <p className="viewer-statement">{project.statement}</p>
                <ul>
                  {project.details.map((detail) => (
                    <li key={detail}><Check size={15} strokeWidth={2.6} />{detail}</li>
                  ))}
                </ul>
                <a href="https://sahilgaji.github.io/work/" target="_blank" rel="noreferrer" className="text-link">
                  Read the full case archive <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="method" className="method-section section-frame section-anchor">
          <div className="method-intro">
            <p className="eyebrow">02 / How I work</p>
            <h2>Structure is a<br /><em>human service.</em></h2>
            <p>Tools matter, but people need to recognize themselves in the way a system works. These are the principles I keep returning to.</p>
          </div>

          <div className="principles-shell">
            <div className="method-route" aria-hidden="true"><span>INPUT</span><i /><span>CLARITY</span><i /><span>CHANGE</span></div>
            <div className="principles-list">
              {principles.map((principle) => (
                <article className="principle" key={principle.number} tabIndex={0}>
                  <span className="principle-number">{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.evidence}</p>
                  <span className="principle-plus">+</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-frame section-anchor">
          <div className="about-aside">
            <p className="eyebrow">03 / About</p>
            <h2>Many contexts.<br /><em>The same impulse.</em></h2>
            <p className="about-lede">Find the messy process. Make it legible. Build something that can keep going.</p>
            <div className="education-card">
              <span>Education</span>
              <strong>M.Sc. Digital Transformation Management</strong>
              <small>SRH Berlin · "very good"</small>
            </div>
          </div>

          <div className="timeline-shell">
            <div className="about-route" aria-hidden="true"><span>MECHANICAL</span><i /><span>DIGITAL</span><i /><span>DURABLE</span></div>
            <div className="timeline">
              {timeline.map((item, index) => (
                <article className="timeline-item" key={item.period}>
                  <span className="timeline-dot" />
                  <span className="timeline-period">{item.period}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-org">{item.org}</p>
                    <p className="timeline-note">{item.note}</p>
                  </div>
                  <span className="timeline-index">0{index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="notes-section section-frame">
          <div className="notes-copy">
            <p className="eyebrow">04 / Notes</p>
            <h2>Thinking in public,<br /><em>carefully.</em></h2>
            <p>Notes are queued. Until then, the most useful context lives inside the work: what happened, what was built, and what I would change next time.</p>
          </div>
          <a href="https://sahilgaji.github.io/changelog/" target="_blank" rel="noreferrer" className="changelog-card">
            <span className="pulse-dot" />
            <span className="eyebrow">Work in progress</span>
            <strong>See what's shipping so far.</strong>
            <MoveRight size={27} />
          </a>
        </section>

        <section id="contact" className="contact-section section-frame section-anchor">
          <p className="eyebrow">05 / Contact</p>
          <h2>Have a process that<br /><em>needs a better rhythm?</em></h2>
          <div className="contact-bottom">
            <a className="email-link" href="mailto:sahil.gaji@outlook.com">sahil.gaji@outlook.com <ArrowUpRight size={22} /></a>
            <p>English (business fluent) · German (B1, in classes) · Hindi &amp; Marathi (native)</p>
          </div>
        </section>
      </main>

      <footer className="footer section-frame">
        <a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="" /> <span>SG / Signal &amp; Surface</span></a>
        <p>© 2026 Sahil Gaji · Built as a living portfolio.</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/sahil-gaji/" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> LinkedIn</a>
          <a href="https://github.com/sahilgaji/sahilgaji.github.io" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> GitHub</a>
          <a href="mailto:sahil.gaji@outlook.com"><Mail size={16} /> Email</a>
          {/* Required for a Germany-operated site regardless of design —
              not part of the original component, added out of necessity. */}
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}
