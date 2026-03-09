import SectionHeading from "@/components/shared/SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface Props {
  dict: Dictionary;
}

export default function ResearchPrinciples({ dict }: Props) {
  const t = dict.researchPrinciples;

  return (
    <section id="principles" className="py-20 sm:py-24 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} />
        <div className="max-w-3xl space-y-4">
          {t.principles.map((principle, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent-blue/10 text-sm font-bold text-accent-blue font-mono">
                {index + 1}
              </span>
              <p className="text-base text-text-primary dark:text-text-on-dark leading-relaxed">
                {principle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
