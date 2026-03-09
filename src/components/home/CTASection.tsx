import Button from "@/components/shared/Button";
import NeuralMesh from "@/components/shared/NeuralMesh";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function CTASection({ dict, locale }: Props) {
  const t = dict.cta;

  return (
    <section className="relative hero-gradient overflow-hidden">
      <NeuralMesh variant="section" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-on-dark tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-on-dark-muted">
            {t.text1}
          </p>
          <p className="mt-3 text-base text-text-on-dark-muted/70">
            {t.text2}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {t.contactResearchTeam}
            </Button>
            <Button href={`/${locale}/contact?type=demo`} variant="outline" size="lg">
              <span className="text-text-on-dark">{t.requestDemo}</span>
            </Button>
            <Button href={`/${locale}/publications`} variant="ghost" size="lg">
              <span className="text-text-on-dark-muted">
                {t.explorePublications} →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
