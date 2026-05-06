import { ResearchArea, NavItem, DocumentType } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Research", href: "/" },
  { label: "Publications", href: "/publications" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "hallucination-and-grounding",
    title: "Hallucination & Grounding",
    description:
      "Reducing unsupported responses and improving evidence alignment for trustworthy AI outputs.",
    icon: "🔍",
  },
  {
    id: "ai-guardrails",
    title: "AI Guardrails",
    description:
      "Designing layered control systems that help prevent unsafe, non-compliant, or high-risk model behavior.",
    icon: "🛡️",
  },
  {
    id: "safety-and-security",
    title: "Safety & Security Engineering",
    description:
      "Addressing prompt attacks, misuse scenarios, privacy risk, and operational vulnerabilities in deployed AI systems.",
    icon: "🔒",
  },
  {
    id: "privacy-and-compliance",
    title: "Privacy & Compliance",
    description:
      "Building methods for privacy-aware AI use, policy enforcement, and alignment with regulatory requirements.",
    icon: "📋",
  },
  {
    id: "agent-safety",
    title: "Agent Safety & Control",
    description:
      "Studying decision safety, action boundaries, escalation logic, and controllability in agentic AI systems.",
    icon: "🤖",
  },
  {
    id: "multimodal-safety",
    title: "Multimodal, VLA & Robotics Safety",
    description:
      "Extending AI safety research into vision-language-action systems, embodied AI, and robotic environments.",
    icon: "👁️",
  },
  {
    id: "quantum-ai-safety",
    title: "Quantum-AI Safety Foresight",
    description:
      "Exploring future safety and governance implications of AI systems connected to emerging compute paradigms.",
    icon: "⚛️",
  },
];

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  "research-paper": "Research Paper",
  "technical-report": "Technical Report",
  "benchmark-report": "Benchmark Report",
  whitepaper: "Whitepaper",
  "case-study": "Case Study",
  "executive-brief": "Executive Brief",
};

/* Editorial monochrome badge tiers. Differentiation by weight, not hue:
   — Tier 1 (flagship academic):     solid ink, paper text
   — Tier 2 (formal report):         outlined ink on paper
   — Tier 3 (industry/supplementary): paper-warm fill, muted text */
export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  "research-paper":   "bg-ink text-paper",
  "technical-report": "bg-paper text-ink border border-ink",
  "benchmark-report": "bg-paper text-ink border border-ink",
  whitepaper:         "bg-paper-warm text-ink-light border border-ink-faint",
  "case-study":       "bg-paper-warm text-ink-light border border-ink-faint",
  "executive-brief":  "bg-paper-warm text-ink-light border border-ink-faint",
};
