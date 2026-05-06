import Button from "@/components/shared/Button";
import NeuralMesh from "@/components/shared/NeuralMesh";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function HeroSection({ dict, locale }: Props) {
  const t = dict.hero;

  return (
    <section className="relative bg-paper overflow-hidden border-b border-ink">
      {/* Bauhaus geometric backdrop */}
      <NeuralMesh variant="hero" />

      {/* Top hairline meta strip */}
      <div className="relative z-10 border-b border-ink-faint">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
          <span>§ 01 / Frontier AI Safety</span>
          <span className="hidden sm:inline">Yatav Inc. · YATAV Research</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Left meta column — Bauhaus index strip */}
          <aside className="col-span-12 lg:col-span-2 lg:pt-2">
            <div className="flex lg:block items-center gap-4">
              <span className="block h-3 w-3 bg-cobalt" aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-light lg:mt-3">
                {t.badge}
              </p>
            </div>
            <a
              href="https://aiaegis.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 hidden lg:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt hover:text-cobalt-deep border-b border-cobalt pb-1"
            >
              {t.visitProduct} <span aria-hidden>↗</span>
            </a>
          </aside>

          {/* Headline column */}
          <div className="col-span-12 lg:col-span-10">
            <h1 className="display-xl text-ink">
              {t.headlinePre}{" "}
              <span className="text-cobalt">{t.headlineHighlight}</span>{" "}
              {t.headlinePost}
            </h1>

            {/* Heavy ink rule under headline */}
            <div className="mt-10 h-1 w-24 bg-ink" aria-hidden="true" />

            <div className="mt-10 grid grid-cols-12 gap-x-6">
              <p className="col-span-12 md:col-span-7 text-lg sm:text-xl leading-relaxed text-ink">
                {t.subheadline}
              </p>
              <p className="col-span-12 md:col-span-5 text-base leading-relaxed text-ink-light">
                {t.body}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href={`/${locale}/publications`} variant="primary" size="lg">
                {t.viewPublications}
              </Button>
              <Button href={`/${locale}/#research-areas`} variant="outline" size="lg">
                {t.exploreResearchAreas}
              </Button>
              <Button href={`/${locale}/contact`} variant="ghost" size="lg">
                {t.contactResearchTeam} →
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar — Bauhaus index, sharp dividers */}
        <div className="mt-24 border-t border-ink">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ink-faint">
            {[
              { value: "10+", label: t.statsAreas, key: "01" },
              { value: "6", label: t.statsTypes, key: "02" },
              { value: "LLM", label: t.statsGuardrail, key: "03" },
              { value: "2026", label: t.statsEstablished, key: "04" },
            ].map((stat) => (
              <div key={stat.label} className="px-2 py-6 sm:px-6">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
                  / {stat.key}
                </p>
                <p className="mt-3 text-3xl font-extrabold text-ink tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ink-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
