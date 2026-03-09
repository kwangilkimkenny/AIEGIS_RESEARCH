import SectionHeading from "@/components/shared/SectionHeading";
import ResearchIcon from "@/components/shared/ResearchIcon";
import { RESEARCH_AREAS } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface Props {
  dict: Dictionary;
}

export default function ResearchAreas({ dict }: Props) {
  const t = dict.researchAreas;

  return (
    <section id="research-areas" className="py-20 sm:py-24 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_AREAS.map((area) => {
            const translated = t.areas[area.id as keyof typeof t.areas];
            return (
              <div
                key={area.id}
                className="group rounded-2xl border border-card-border bg-card-bg p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <span className="text-text-secondary dark:text-text-on-dark-muted group-hover:text-accent-blue transition-colors">
                    <ResearchIcon id={area.id} className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary dark:text-text-on-dark group-hover:text-accent-blue transition-colors">
                      {translated?.title ?? area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
                      {translated?.description ?? area.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
