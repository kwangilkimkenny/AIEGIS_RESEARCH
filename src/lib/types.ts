export type DocumentType =
  | "research-paper"
  | "technical-report"
  | "benchmark-report"
  | "whitepaper"
  | "case-study"
  | "executive-brief";

export type Category =
  | "hallucination-and-grounding"
  | "ai-guardrails"
  | "safety-and-security"
  | "privacy-and-compliance"
  | "regulation-and-governance"
  | "rag-reliability"
  | "agent-safety"
  | "multimodal-safety"
  | "robotics-and-vla-safety"
  | "quantum-ai-safety"
  | "education-ai-trust"
  | "enterprise-ai-evaluation"
  | "responsible-ai-operations";

export type PublicationStatus = "draft" | "review" | "published" | "archived";

export interface Publication {
  documentNumber: string;
  slug: string;
  type: DocumentType;
  title: string;
  subtitle: string;
  authors: string[];
  affiliation: string;
  publishedDate: string;
  version: string;
  categories: Category[];
  tags: string[];
  oneLinerKo: string;
  oneLinerEn: string;
  abstract: string;
  pdfUrl: string;
  githubUrl?: string;
  executiveSummaryUrl?: string;
  slidesUrl?: string;
  demoVideoUrl?: string;
  pressReleaseUrl?: string;
  relatedPublications?: string[];
  status: PublicationStatus;
  featured: boolean;
  content: string;
}

export interface ResearchArea {
  id: Category;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
