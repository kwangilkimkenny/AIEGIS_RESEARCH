import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import ResearchIcon from "@/components/shared/ResearchIcon";
import NeuralMesh from "@/components/shared/NeuralMesh";
import { RESEARCH_AREAS } from "@/lib/constants";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const t = dict.about;
  const ra = dict.researchAreas;

  return (
    <>
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden">
        <NeuralMesh variant="section" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="gradient-bar w-12 mb-6 rounded-full" />
            <h1 className="text-4xl sm:text-5xl font-bold text-text-on-dark tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-text-on-dark-muted">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading title={t.missionTitle} />
              <p className="text-lg leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
                {t.missionText1}{" "}
                <strong className="text-text-primary dark:text-text-on-dark">
                  {t.missionHighlight}
                </strong>
                .
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
                {t.missionText2}
              </p>
              <div className="mt-6">
                <Button href="https://aiaegis.io" variant="outline" size="md">
                  {t.visitMainSite} →
                </Button>
              </div>
            </div>
            <div className="space-y-10">
              {/* CEO */}
              <div>
                <SectionHeading title={t.ceoTitle} />
                <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                  <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary dark:text-text-on-dark">
                      Seongchan Lee
                    </h3>
                    <p className="text-sm font-medium text-emerald-500">
                      Korea Univ. &middot; {t.ceoRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Research Leadership */}
              <div>
                <SectionHeading title={t.leadershipTitle} />
                <div className="space-y-3">
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/10 border border-accent-blue/20">
                      <svg className="w-8 h-8 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary dark:text-text-on-dark">
                        Kwang Il Kim
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.leadershipRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary dark:text-text-on-dark-muted leading-relaxed">
                        {t.leadershipDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/10 border border-accent-blue/20">
                      <svg className="w-8 h-8 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary dark:text-text-on-dark">
                        Seokju Kang
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.cisoRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary dark:text-text-on-dark-muted leading-relaxed">
                        {t.cisoDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advisor */}
              <div>
                <SectionHeading title={t.advisorTitle} />
                <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                  <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20">
                    <svg className="w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary dark:text-text-on-dark">
                      Dr. Taejeong Park
                    </h3>
                    <p className="text-sm font-medium text-violet-500">
                      {t.advisorRole}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary dark:text-text-on-dark-muted leading-relaxed">
                      {t.advisorDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Belief */}
              <div>
                <SectionHeading title={t.coreBeliefTitle} />
                <div className="rounded-2xl border border-card-border bg-card-bg p-8">
                  <p className="text-lg font-medium text-text-primary dark:text-text-on-dark leading-relaxed">
                    &ldquo;{t.coreBeliefQuote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-text-muted dark:text-text-on-dark-muted">
                    {t.coreBeliefAttribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.philosophyTitle}
            subtitle={t.philosophySubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {t.philosophyPrinciples.map((principle, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg p-4"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent-blue/10 text-xs font-bold text-accent-blue font-mono">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Research */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.scopeTitle}
            subtitle={t.scopeSubtitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESEARCH_AREAS.map((area) => (
              <div
                key={area.id}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg p-4"
              >
                <span className="text-text-secondary dark:text-text-on-dark-muted flex-shrink-0">
                  <ResearchIcon id={area.id} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary dark:text-text-on-dark">
                    {ra.areas[area.id as keyof typeof ra.areas]?.title ?? area.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted dark:text-text-on-dark-muted">
                    {ra.areas[area.id as keyof typeof ra.areas]?.description ?? area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AEGIS Research Exists */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.whyTitle} />
          <div className="max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
              {t.whyText1}
            </p>
            <p className="text-base leading-relaxed text-text-secondary dark:text-text-on-dark-muted">
              {t.whyText2}
            </p>
            <p className="text-base leading-relaxed text-text-primary dark:text-text-on-dark font-medium">
              {t.whyText3}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient overflow-hidden py-20">
        <NeuralMesh variant="subtle" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-on-dark">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-text-on-dark-muted max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/contact`} variant="primary" size="lg">
              {t.ctaContact}
            </Button>
            <Button href={`/${locale}/publications`} variant="outline" size="lg">
              <span className="text-text-on-dark">{t.ctaPublications}</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
