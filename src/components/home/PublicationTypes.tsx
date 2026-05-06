import SectionHeading from "@/components/shared/SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/* Monochrome line icons — one shared visual language across the six
   publication types. Each glyph carries the type's meaning through
   shape alone; no color, no emoji. */
const icons: React.ReactNode[] = [
  // Research Papers — document with body text lines
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </>,
  // Technical Reports — document with code chevrons
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M10 13l-2 2 2 2" />
    <path d="M14 13l2 2-2 2" />
  </>,
  // Benchmark Reports — bar chart
  <>
    <line x1="3" y1="20" x2="21" y2="20" />
    <rect x="5" y="12" width="3" height="8" />
    <rect x="10.5" y="6" width="3" height="14" />
    <rect x="16" y="14" width="3" height="6" />
  </>,
  // Whitepapers — formal document with three justified lines
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="16" x2="14" y2="16" />
    <line x1="8" y1="19" x2="12" y2="19" />
  </>,
  // Case Studies — magnifier (examination)
  <>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </>,
  // Executive Briefs — clipboard
  <>
    <rect x="6" y="4" width="12" height="18" rx="1" />
    <path d="M9 4V2h6v2" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </>,
];

interface Props {
  dict: Dictionary;
}

export default function PublicationTypes({ dict }: Props) {
  const t = dict.publicationTypes;

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.types.map((type, i) => (
            <div
              key={type.name}
              className="flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5"
            >
              <svg
                className="w-6 h-6 flex-shrink-0 text-ink"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label={type.name}
                role="img"
              >
                {icons[i]}
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {type.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
