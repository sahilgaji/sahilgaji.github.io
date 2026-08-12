/**
 * Design system: Signal & Surface / Dry Operator — warm editorial systems dossier,
 * cobalt signals, dry evidence-led humour, and human-readable technical credibility.
 */
import { useEffect, useState } from "react";
import { ScrollProgress } from "../components/ScrollProgress";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveRight,
  X,
} from "lucide-react";

const ASSETS = {
  logo: "/images/signal-mark.svg",
  hero: "/images/hero-signal-surface.svg",
  career: "/images/project-career-operating-system.svg",
  bosch: "/images/project-bosch-systems.svg",
  club: "/images/project-food-venture.svg",
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
    subtitle: "A very picky robot, with human supervision.",
    image: ASSETS.career,
    tags: ["Python", "Claude API", "GitHub Actions", "Quality gates"],
    diagnosis: "Diagnosis: repetitive work detected. A configuration-driven pipeline followed.",
    statement:
      "A modular AI-powered application system that turns unstructured postings into evidence-checked, ATS-ready application packages through configurable logic, confidence scoring, and quality gates.",
    humanVersion:
      "My job search stopped being a two-hour daily ritual. The repetitive work is handled first; I spend my time on the roles that deserve actual judgement.",
    details: [
      "Uses a single YAML source of truth, five professional personas, eligibility gates, and APPLY / STRETCH / REJECT recommendations.",
      "Connects Python, Claude API, GitHub Actions, SQLite, Google Sheets, Telegram, and a human-review interface into one operating loop.",
      "Reduced daily job-search effort from about two hours to under ten minutes; per-application processing is under thirty minutes.",
    ],
  },
  {
    number: "02",
    title: "Robert Bosch GmbH",
    subtitle: "Because a new tool without adoption is expensive optimism.",
    image: ASSETS.bosch,
    tags: ["Jira", "PMO", "Change adoption"],
    diagnosis: "Diagnosis: another tool entered the room. Adoption mattered more than configuration.",
    statement:
      "At Bosch, the tool configuration was only the first fifth of the work. The real project was making a new system useful enough to be adopted.",
    humanVersion:
      "I helped teams trade scattered trackers for a shared way of working. The difficult part was not Jira; it was earning room in 150+ people’s already busy days.",
    details: [
      "Standardised Jira workflows and PMO reporting across three cross-functional projects, improving operational productivity by about 15%.",
      "Trained 150+ managers and team leads to make the new working system stick.",
      "Migrated documentation to Confluence and Docupedia, cutting document retrieval time by roughly 30%.",
    ],
  },
  {
    number: "03",
    title: "Club House",
    subtitle: "Founders should not be the workflow.",
    image: ASSETS.club,
    tags: ["Operations", "VBA", "Founding"],
    diagnosis: "Diagnosis: too much knowledge lived inside the founders. Documentation was prescribed.",
    statement:
      "A food-and-beverage startup co-founded alongside a full-time job. The useful test was whether the business could continue once its systems had a different owner.",
    humanVersion:
      "I helped start a food business, automated enough of the routine work to hand it over, and learned that operational continuity is a better compliment than being indispensable.",
    details: [
      "Built VBA tools for invoicing, inventory tracking, and financial forecasting while co-founding the venture part-time.",
      "Secured ₹600,000 in funding and helped drive a roughly 40% increase in online orders through targeted digital marketing.",
      "Handed ownership to the remaining partners after six months; the business continued operating.",
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
    role: "Quality Specialist Team · part-time",
    org: "Picnic Technologies · Hamburg",
    note: "Quality audits, inventory accuracy, and defect-pattern tracking in a fulfilment environment. The shelf knows if the system is lying.",
  },
  {
    period: "2025 — now",
    role: "Builder, Career Operating System",
    org: "Personal project · Python, AI & workflow orchestration",
    note: "Designed the full lifecycle: architecture, prompts, quality controls, deployment, iteration, and the occasional reminder that a human should still look at it.",
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
    note: "Renewable-energy feasibility research and Excel VBA forecasting automation, saving about five person-days per month.",
  },
  {
    period: "2019 — 2022",
    role: "Operations, quality, research & founding",
    org: "Club House · KEIHIN FIE · GirnarSoft · Makerspace",
    note: "A startup, quality dashboards, automotive research, and hands-on prototyping. Different rooms; consistently the person reorganising the process.",
  },
];

const sectionStatus = {
  top: "SYSTEM NOMINAL",
  work: "INSPECTING EVIDENCE",
  method: "HUMAN FACTORS DETECTED",
  about: "PATCH NOTES OPEN",
  contact: "CONVERSATION CHANNEL OPEN",
} as const;

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState<keyof typeof sectionStatus>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHumanVersion, setShowHumanVersion] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
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
        <a href="#top" className="brand" aria-label="Sahil Gaji — top of page">
          <img src={ASSETS.logo} alt="Sahil Gaji signal mark" className="brand-mark" />
          <span className="brand-name">Sahil Gaji</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id} className={activeSection === item.id ? "nav-link is-active" : "nav-link"}>{item.label}</a>
          ))}
        </nav>
        <a className="cv-link" href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer">CV <ArrowUpRight size={15} strokeWidth={2.1} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <span className="eyebrow">Navigate</span>
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}><span>{item.label}</span><MoveRight size={23} /></a>
          ))}
          <a href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><span>Open CV</span><ArrowUpRight size={23} /></a>
        </div>
      </div>

      <main id="top">
        <section className="hero section-frame" onPointerMove={handlePointerMove}>
          <div className="hero-labels reveal-up">
            <span className="eyebrow">Independent systems builder · operator’s manual, rev. 01</span>
            <span className="hero-location">Hamburg, DE <i /></span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker reveal-up delay-1">Sahil Gaji / Boot sequence</p>
            <h1 className="reveal-up delay-2">I build systems that <em>keep working</em> when I leave the room.</h1>
            <div className="hero-route reveal-up delay-3" aria-hidden="true"><span>Observe</span><i /><span>Build</span><i /><span>Adopt</span></div>
            <div className="hero-summary reveal-up delay-3">
              <p>Mechanical engineer by training. Project-management and digital-transformation person by choice. I turn messy work into clear, adopted systems—partly to improve it, partly to stop it messaging people at 17:58.</p>
              <a href="#work" className="round-arrow" aria-label="Explore selected work"><ArrowDown size={25} strokeWidth={1.8} /></a>
            </div>
          </div>
          <div className="hero-art reveal-up delay-3" style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
            <span className="art-orbit orbit-a" aria-hidden="true" /><span className="art-orbit orbit-b" aria-hidden="true" /><span className="art-dot" aria-hidden="true" />
            <img src={ASSETS.hero} alt="Abstract cobalt and coral system components" />
            <div className="art-caption"><span>Signal / 01</span><span>Scroll to inspect</span></div>
          </div>
          <div className="hero-bottom reveal-up delay-4">
            <p><span className="status-dot" /> {status} · Open to junior PM, PMO, process &amp; digital-transformation conversations.</p>
            <a href="#contact">Start a conversation <MoveRight size={16} /></a>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Selected impact metrics">
          <div><strong>5+</strong><span>live job sources routed</span></div>
          <div><strong>&lt;10 min</strong><span>daily system supervision</span></div>
          <div><strong>150+</strong><span>people trained</span></div>
          <div><strong>~30%</strong><span>faster document retrieval</span></div>
        </section>

        <section id="work" className="work-section section-frame section-anchor">
          <div className="section-head">
            <div><p className="eyebrow">01 / Selected work</p><h2>Things I made<br /><em>less chaotic.</em></h2></div>
            <p className="section-intro">No cinematic whiteboards. Just what was built, what changed, and whether the system survived handover.</p>
          </div>
          <div className="work-layout">
            <div className="project-list" aria-label="Select a case study">
              {projects.map((item, index) => (
                <button type="button" className={index === activeProject ? "project-row is-selected" : "project-row"} key={item.title} onMouseEnter={() => selectProject(index)} onFocus={() => selectProject(index)} onClick={() => selectProject(index)} aria-pressed={index === activeProject}>
                  <span className="project-number">{item.number}</span><span className="project-title-wrap"><strong>{item.title}</strong><small>{item.subtitle}</small></span><ArrowUpRight className="project-arrow" size={19} />
                </button>
              ))}
            </div>
            <article className="project-viewer" key={project.title}>
              <div className="viewer-route" aria-label="Project system stages"><span>INTAKE</span><i /><span>BUILD</span><i /><span>ADOPT</span><i /><span>HANDOVER</span></div>
              <div className="viewer-image-wrap"><img src={project.image} alt={`Conceptual visual for ${project.title}`} className="viewer-image" /><span className="viewer-index">{project.number}</span><img src={ASSETS.logo} alt="" className="viewer-brand-mark" /></div>
              <div className="viewer-body">
                <div className="viewer-controls">
                  <p className="case-diagnosis">{project.diagnosis}</p>
                  <button type="button" className={showHumanVersion ? "translation-toggle is-active" : "translation-toggle"} onClick={() => setShowHumanVersion((current) => !current)} aria-pressed={showHumanVersion}>{showHumanVersion ? "Technical view" : "Human translation"}</button>
                </div>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className={showHumanVersion ? "viewer-statement is-human" : "viewer-statement"}>{showHumanVersion ? project.humanVersion : project.statement}</p>
                <ul>{project.details.map((detail) => <li key={detail}><Check size={15} strokeWidth={2.6} />{detail}</li>)}</ul>
                <a href="https://sahilgaji.github.io/work/" target="_blank" rel="noreferrer" className="text-link">Read the full case archive <ArrowUpRight size={16} /></a>
              </div>
            </article>
          </div>
        </section>

        <section id="method" className="method-section section-frame section-anchor">
          <div className="method-intro"><p className="eyebrow">02 / Known operating conditions</p><h2>Structure is a<br /><em>human service.</em></h2><p>I ask annoying clarifying questions early, so nobody has to ask expensive ones later. Tools matter, but people need to recognise themselves in the way a system works.</p><div className="method-artifact" aria-hidden="true"><span>SG / 02</span><i /><i /><b /></div></div>
          <div className="principles-shell">
            <div className="method-route" aria-hidden="true"><span>INPUT</span><i /><span>CLARITY</span><i /><span>CHANGE</span></div>
            <div className="principles-list">{principles.map((principle) => <article className="principle" key={principle.number} tabIndex={0}><span className="principle-number">{principle.number}</span><h3>{principle.title}</h3><p>{principle.evidence}</p><span className="principle-plus">+</span></article>)}</div>
          </div>
        </section>

        <section id="about" className="about-section section-frame section-anchor">
          <div className="about-aside">
            <p className="eyebrow">03 / Patch notes: 2019 — now</p><h2>Many contexts.<br /><em>Same impulse.</em></h2>
            <p className="about-lede">Mechanical systems first. Then production systems. Then people systems—which have fewer bolts and considerably more opinions.</p>
            <div className="education-card"><span>Education</span><strong>M.Sc. Digital Transformation Management</strong><small>SRH Berlin · “very good” · German B1</small></div><div className="about-artifact" aria-hidden="true"><span>FIELD NOTE / 03</span><i /><b /></div>
          </div>
          <div className="timeline-shell">
            <div className="about-route" aria-hidden="true"><span>MECHANICAL</span><i /><span>DIGITAL</span><i /><span>DURABLE</span></div>
            <div className="timeline">{timeline.map((item, index) => <article className="timeline-item" key={item.period + item.role}><span className="timeline-dot" /><span className="timeline-period">{item.period}</span><div><h3>{item.role}</h3><p className="timeline-org">{item.org}</p><p className="timeline-note">{item.note}</p></div><span className="timeline-index">0{index + 1}</span></article>)}</div>
          </div>
        </section>

        <section className="notes-section section-frame">
          <div className="notes-artifact" aria-hidden="true"><span>SG</span><i /><b /></div>
          <div className="notes-copy"><p className="eyebrow">04 / Notes, queued</p><h2>Thinking in public,<br /><em>carefully.</em></h2><p>Notes are on their way. Until then, the useful bits are already in the work: what happened, what was built, and what I would change before pretending it was perfect.</p></div>
          <a href="https://sahilgaji.github.io/changelog/" target="_blank" rel="noreferrer" className="changelog-card"><span className="pulse-dot" /><span className="eyebrow">Work in progress</span><strong>See what’s shipping so far.</strong><MoveRight size={27} /></a>
        </section>

        <section id="contact" className="contact-section section-frame section-anchor">
          <div className="contact-artifact" aria-hidden="true"><span>CHANNEL / 05</span><i /><i /></div>
          <p className="eyebrow">05 / Talk to the operator</p><h2>If the workflow relies on<br /><em>one spreadsheet and hope,</em><br />we should probably talk.</h2>
          <div className="contact-bottom"><a className="email-link" href="mailto:sahil.gaji@outlook.com">sahil.gaji@outlook.com <ArrowUpRight size={22} /></a><p>English (business fluent) · German (B1) · Hindi &amp; Marathi (native)</p></div>
        </section>
      </main>

      <footer className="footer section-frame">
        <a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="" /> <span>SG / Operator’s manual</span></a>
        <p>© 2026 Sahil Gaji · Revision 01 · Built to outlast the handover. · <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a></p>
        <div className="footer-links"><a href="https://www.linkedin.com/in/sahil-gaji/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://github.com/sahilgaji/sahilgaji.github.io" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="mailto:sahil.gaji@outlook.com"><Mail size={16} /> Email</a></div>
      </footer>
    </div>
  );
}
