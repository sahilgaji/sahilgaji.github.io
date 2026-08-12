/**
 * Design system: Signal & Surface / Dry Operator — warm editorial systems dossier,
 * cobalt signals, dry evidence-led humour, and human-readable technical credibility.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "../components/ScrollProgress";
import { ProjectCaseModal } from "../components/ProjectCaseModal";
import { TextLoop } from "../components/TextLoop";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MoveRight,
} from "lucide-react";

const ASSETS = {
  logo: "/images/signal-mark.svg",
  hero: "/images/hero-signal-surface.svg",
  career: "/images/project-career-operating-system.svg",
  bosch: "/images/project-bosch-systems.svg",
  club: "/images/project-food-venture.svg",
};

const navItems = [
  { id: "work", label: "Projects" },
  { id: "method", label: "Approach" },
  { id: "about", label: "Journey" },
  { id: "contact", label: "Consultation" },
];

const HEADLINE_VERBS = ["plan", "optimise", "build"];

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
    period: "Personal project · 2025 — now",
    pullQuote: "The system's most important feature is that it refuses to apply.",
    metrics: [
      { value: "< 30 min", label: "per application" },
      { value: "2h → 10min", label: "daily search effort" },
      { value: "≥ 75%", label: "ATS quality gate" },
      { value: "~ 9 in 10", label: "go to the target track" },
    ],
    story: [
      "I moved to Germany for a Master's in Digital Transformation Management, and finished it into a job market where my own profile worked against me: six years, two countries, six domains, none of them individually enough. Job applications felt like a black box — no feedback loop, no way to know which lever actually mattered.",
      "For a while I believed the fix was more effort: more applications, faster turnaround, a slightly sharper cover letter each time. Months of quiet rejection later, the real lesson landed — I was optimizing the wrong thing.",
      "So I stopped trying to apply harder and built a system to apply better: one that screens before it writes, refuses before it generates, and never ships anything I haven't reviewed by hand.",
    ],
    retro:
      "If I were starting again, I would spend less time trying to perfect the automation and more time validating whether each improvement actually increased interview quality. Early on, I enjoyed building the system so much that I sometimes optimized the process before proving it solved the right problem. The biggest lesson was that better decisions matter more than more automation.",
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
    period: "Robert Bosch GmbH · Mar–Aug 2024",
    pullQuote: "Configuring the tool was the easy fifth of the work.",
    metrics: [
      { value: "150+", label: "managers & team leads trained" },
      { value: "3", label: "cross-functional projects standardised" },
      { value: "~ 15%", label: "productivity improvement" },
      { value: "~ 30%", label: "faster document retrieval" },
    ],
    story: [
      "Six months as an intern on Bosch's Project Management Digitalization team, supporting global supply chain digitalization work across international teams. The problem wasn't a lack of tools — it was too many of them, used inconsistently: OPLs, roadmaps, and risk tracking scattered across spreadsheets and whatever format each project lead preferred.",
      "Standardizing that onto Jira, for three cross-functional projects, took a few weeks. That was the easy part. The other four-fifths was training sessions, documentation people would come back to, and a lot of one-on-one troubleshooting for managers who'd been running things their own way for years.",
      "The Confluence migration was the same problem from a different angle — moving documentation off Excel and an internal Wiki only pays off once people trust the new place enough to stop keeping their own copies. Once it stuck, retrieval time dropped by roughly 30%.",
    ],
    retro:
      "Looking back, I would have asked for feedback earlier and more frequently from the people using the tools, rather than assuming the first version was already intuitive. That experience reinforced that digital transformation is as much about people as it is about technology.",
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
    period: "Club House · Jul–Dec 2020",
    pullQuote: "The business kept running after I left.",
    metrics: [
      { value: "6 months", label: "part-time, alongside a full-time job" },
      { value: "~ 40%", label: "increase in online orders" },
      { value: "₹600,000", label: "funding secured" },
      { value: "~ 20%", label: "increase in business valuation" },
    ],
    story: [
      "A small food-and-beverage startup, co-founded with two friends alongside a full-time job. Breakfast and all-day snacks, out of Pune. Nothing glamorous — the goal was to keep the books straight, keep inventory from walking out the door, and keep customers coming back, on evenings and weekends around a day job.",
      "I built Excel VBA tools for invoicing, ingredient and stock tracking, and financial forecasting; ran the social media campaigns that grew online orders by roughly 40%; and negotiated the vendor and investor relationships that brought in ₹600,000 in funding.",
      "After six months, ownership transitioned to my two co-founders. That wasn't the plan failing — a full-time job and a part-time startup were never going to both get the time they needed indefinitely. What mattered was whether the business could survive the handover — and it did.",
    ],
    retro:
      "If I could do it again, I would invest more time in documenting operational processes from the beginning instead of creating them reactively as the business grew. That experience taught me that sustainable operations are built before they become necessary.",
  },
];

export type Project = (typeof projects)[number];

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
    period: "2022 — 2024",
    role: "M.Sc. Digital Transformation Management",
    org: "SRH Berlin University of Applied Sciences",
    note: "Business analytics, digital strategy, and change management, graded very good (2.0) — with two internships running alongside it.",
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
    period: "2020 — 2022",
    role: "Junior Market Correspondent",
    org: "GirnarSoft · Jaipur",
    note: "Automotive market research and competitive analysis for ZigWheels — the reviews behind someone else's car purchase.",
  },
  {
    period: "Jul — Dec 2020",
    role: "Co-Founder, Club House",
    org: "Part-time side venture · Pune",
    note: "A food-and-beverage startup run alongside a full-time job. Handed to my co-founders after six months; it kept running.",
  },
  {
    period: "2019 — 2020",
    role: "Quality Assurance Engineer",
    org: "KEIHIN FIE · Chakan",
    note: "Die-casting, machining, and assembly quality control. A Power BI reporting push cut defects by roughly 15%.",
  },
  {
    period: "May — Oct 2019",
    role: "Design & Development Engineer",
    org: "Makerspace Creators' Catalyst · Pune",
    note: "Client-facing product development with CAD and rapid prototyping — 3D printing and laser cutting, start to finish.",
  },
  {
    period: "2015 — 2019",
    role: "B.E. Mechanical Engineering",
    org: "Savitribai Phule Pune University",
    note: "Where the reorganising instinct started: systems engineering, lean manufacturing, and a lot of CAD.",
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
  const [showHumanVersion, setShowHumanVersion] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [caseModalProject, setCaseModalProject] = useState<Project | null>(null);
  const [hoveredDockId, setHoveredDockId] = useState<string | null>(null);
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
        <div className="topbar-actions">
          <a className="cv-link" href="https://sahilgaji.github.io/cv/" target="_blank" rel="noreferrer">CV <ArrowUpRight size={15} strokeWidth={2.1} /></a>
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
            <span className="eyebrow">Independent systems builder · operator’s manual, rev. 01</span>
            <span className="hero-location">Hamburg, DE <i /></span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker reveal-up delay-1">Sahil Gaji / Boot sequence</p>
            <h1 className="reveal-up delay-2 hero-headline">
              <span className="hero-headline-line1">I <TextLoop words={HEADLINE_VERBS} /> systems</span>
              that <em>keep working</em>
              <br />even when I
              <br />leave the room.
            </h1>
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
              <motion.div layoutId={`case-image-${project.number}`} className="viewer-image-wrap"><img src={project.image} alt={`Conceptual visual for ${project.title}`} className="viewer-image" /><span className="viewer-index">{project.number}</span><img src={ASSETS.logo} alt="" className="viewer-brand-mark" /></motion.div>
              <div className="viewer-body">
                <div className="viewer-controls">
                  <p className="case-diagnosis">{project.diagnosis}</p>
                  <button type="button" className={showHumanVersion ? "translation-toggle is-active" : "translation-toggle"} onClick={() => setShowHumanVersion((current) => !current)} aria-pressed={showHumanVersion}>{showHumanVersion ? "Technical view" : "Human translation"}</button>
                </div>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className={showHumanVersion ? "viewer-statement is-human" : "viewer-statement"}>{showHumanVersion ? project.humanVersion : project.statement}</p>
                <ul>{project.details.map((detail) => <li key={detail}><Check size={15} strokeWidth={2.6} />{detail}</li>)}</ul>
                <button type="button" className="text-link" onClick={() => setCaseModalProject(project)}>Read the full case archive <MoveRight size={16} /></button>
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
            <p className="eyebrow">03 / Patch notes: 2015 — now</p><h2>Many contexts.<br /><em>Same impulse.</em></h2>
            <p className="about-lede">Mechanical systems first. Then production systems. Then people systems—which have fewer bolts and considerably more opinions.</p>
            <div className="education-card"><span>Education</span><strong>M.Sc. Digital Transformation Management</strong><small>SRH Berlin · “very good” · German B1</small></div><div className="about-artifact" aria-hidden="true"><span>FIELD NOTE / 03</span><i /><b /></div>
          </div>
          <div className="timeline-shell">
            <div className="about-route" aria-hidden="true"><span>MECHANICAL</span><i /><span>DIGITAL</span><i /><span>DURABLE</span></div>
            <div className="timeline">{timeline.map((item, index) => <article className="timeline-item" key={item.period + item.role}><span className="timeline-dot" /><span className="timeline-period">{item.period}</span><div><h3>{item.role}</h3><p className="timeline-org">{item.org}</p><p className="timeline-note">{item.note}</p></div><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span></article>)}</div>
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
          <div className="contact-bottom">
            <div className="contact-details">
              <a className="contact-detail" href="mailto:sahil.gaji@outlook.com"><span className="contact-detail-label">Email</span><span className="contact-detail-value">sahil.gaji@outlook.com <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="mailto:sahil.s.gaji@gmail.com"><span className="contact-detail-label">Email</span><span className="contact-detail-value">sahil.s.gaji@gmail.com <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://www.linkedin.com/in/sahil-gaji/" target="_blank" rel="noreferrer"><span className="contact-detail-label">LinkedIn</span><span className="contact-detail-value">in/sahil-gaji <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://github.com/sahilgaji/sahilgaji.github.io" target="_blank" rel="noreferrer"><span className="contact-detail-label">GitHub</span><span className="contact-detail-value">sahilgaji <ArrowUpRight size={16} /></span></a>
              <a className="contact-detail" href="https://topmate.io/sahil_gaji" target="_blank" rel="noreferrer"><span className="contact-detail-label">Topmate</span><span className="contact-detail-value">sahil_gaji <ArrowUpRight size={16} /></span></a>
            </div>
            <p className="contact-languages">English (business fluent) · German (B1) · Hindi &amp; Marathi (native)</p>
          </div>
        </section>
      </main>

      <footer className="footer section-frame">
        <a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="" /> <span>SG / Operator’s manual</span></a>
        <p>© 2026 Sahil Gaji · Revision 01 · Built to outlast the handover. · <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a></p>
      </footer>

      <ProjectCaseModal project={caseModalProject} onClose={() => setCaseModalProject(null)} />
    </div>
  );
}
