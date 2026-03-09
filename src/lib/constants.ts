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

export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  "research-paper": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "technical-report": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "benchmark-report": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  whitepaper: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "case-study": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "executive-brief": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};
