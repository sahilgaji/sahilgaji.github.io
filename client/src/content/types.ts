export type ProjectMetric = { value: string; label: string };

export type ProjectContent = {
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  diagnosis: string;
  statement: string;
  humanVersion: string;
  details: string[];
  period: string;
  pullQuote: string;
  metrics: ProjectMetric[];
  story: string[];
  retro: string;
};

export type TimelineEntryContent = {
  period: string;
  role: string;
  org: string;
  note: string;
  type?: "education";
};

export type PrincipleContent = { number: string; title: string; evidence: string };

export type SiteContent = {
  nav: { work: string; method: string; about: string; contact: string };
  headlineVerbs: string[];
  hero: {
    eyebrow: string;
    location: string;
    kicker: string;
    headlineLine1Prefix: string;
    headlineWord: string;
    headlineLine2Prefix: string;
    headlineLine2Em: string;
    headlineLine3: string;
    headlineLine4: string;
    routeSteps: string[];
    summary: string;
    exploreAria: string;
    artCaption: string;
    statusLine: string;
    startConversation: string;
  };
  brandTopAria: string;
  brandBottomLabel: string;
  logoAlt: string;
  cvLabel: string;
  metrics: { value: string; label: string }[];
  work: {
    eyebrow: string;
    headingLine1: string;
    headingEm: string;
    intro: string;
    selectAria: string;
    stageSteps: string[];
    stageAria: string;
    technicalView: string;
    humanTranslation: string;
    readFullCase: string;
    imageAlt: (title: string) => string;
    closeAria: string;
    retroLabel: string;
  };
  projects: ProjectContent[];
  method: {
    eyebrow: string;
    headingLine1: string;
    headingEm: string;
    body: string;
    routeSteps: string[];
    artifactLabel: string;
  };
  principles: PrincipleContent[];
  about: {
    eyebrow: string;
    headingLine1: string;
    headingEm: string;
    lede: string;
    routeSteps: string[];
    educationBadge: string;
  };
  timeline: TimelineEntryContent[];
  contact: {
    channelLabel: string;
    eyebrow: string;
    headingLine1: string;
    headingEm: string;
    headingLine3: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    topmateLabel: string;
    languages: string;
    sharePage: string;
    linkCopied: string;
  };
  footer: { brandLabel: string; copyright: string; impressum: string; datenschutz: string };
  sectionStatus: {
    top: string;
    work: string;
    method: string;
    about: string;
    contact: string;
  };
};
