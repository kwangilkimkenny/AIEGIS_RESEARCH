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
    <section className="relative hero-gradient overflow-hidden">
      {/* Neural Network Background */}
      <NeuralMesh variant="hero" />
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-blue/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-cyan/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-medium text-text-on-dark-muted tracking-wide">
                {t.badge}
              </span>
            </div>
            <a
              href="https://aiaegis.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t.visitProduct} →
            </a>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-on-dark leading-[1.1]">
            {t.headlinePre}{" "}
            <span className="gradient-text">
              {t.headlineHighlight}
            </span>{" "}
            {t.headlinePost}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-text-on-dark-muted">
            {t.subheadline}
          </p>

          {/* Body */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-on-dark-muted/70">
            {t.body}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/${locale}/publications`} variant="primary" size="lg">
              {t.viewPublications}
            </Button>
            <Button href={`/${locale}/#research-areas`} variant="outline" size="lg">
              <span className="text-text-on-dark">{t.exploreResearchAreas}</span>
            </Button>
            <Button href={`/${locale}/contact`} variant="ghost" size="lg">
              <span className="text-text-on-dark-muted hover:text-text-on-dark">
                {t.contactResearchTeam} →
              </span>
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-10">
          {[
            { value: "10+", label: t.statsAreas },
            { value: "6", label: t.statsTypes },
            { value: "LLM", label: t.statsGuardrail },
            { value: "2026", label: t.statsEstablished },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-text-on-dark font-mono">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-on-dark-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
