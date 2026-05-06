import SectionHeading from "@/components/shared/SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface Props {
  dict: Dictionary;
}

export default function WhatWeStudy({ dict }: Props) {
  const t = dict.whatWeStudy;

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {t.card1Title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {t.card1Text}
            </p>
          </div>
          <div className="rounded-2xl border border-card-border bg-card-bg p-8">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {t.card2Title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {t.card2Text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
