import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { DOCUMENT_TYPE_COLORS } from "@/lib/constants";
import { Publication } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface FeaturedResearchProps {
  publications: Publication[];
  dict: Dictionary;
  locale: Locale;
}

export default function FeaturedResearch({ publications, dict, locale }: FeaturedResearchProps) {
  if (publications.length === 0) return null;

  const t = dict.featuredResearch;
  const dtLabels = dict.documentTypes;

  return (
    <section className="py-20 sm:py-24 bg-section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <article
              key={pub.slug}
              className="group flex flex-col rounded-2xl border border-card-border bg-card-bg overflow-hidden card-hover"
            >
              {/* Gradient top bar */}
              <div className="gradient-bar" />

              <div className="flex flex-col flex-1 p-6">
                {/* Doc number & type */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-text-muted dark:text-text-on-dark-muted">
                    {pub.documentNumber}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      DOCUMENT_TYPE_COLORS[pub.type]
                    }`}
                  >
                    {dtLabels[pub.type]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-on-dark group-hover:text-accent-blue transition-colors leading-snug">
                  {pub.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-text-on-dark-muted flex-1">
                  {locale === "ko" ? pub.oneLinerKo : pub.oneLinerEn}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pub.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-100 dark:bg-navy-800 px-2 py-0.5 text-xs text-text-muted dark:text-text-on-dark-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button href={`/${locale}/publications/${pub.slug}`} variant="primary" size="sm">
                    {t.readSummary}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
