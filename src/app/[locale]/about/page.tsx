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
              <p className="text-lg leading-relaxed text-text-secondary">
                {t.missionText1}{" "}
                <strong className="text-text-primary">
                  {t.missionHighlight}
                </strong>
                .
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {t.missionText2}
              </p>
              <div className="mt-6">
                <Button href="https://aiaegis.io" variant="outline" size="md">
                  {t.visitMainSite} →
                </Button>
              </div>
            </div>
            <div className="space-y-10">
              {/* Research Leadership */}
              <div>
                <SectionHeading title={t.leadershipTitle} />
                <div className="space-y-3">
                  {/* Principal Researcher — solid ink fill marks senior position */}
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Seongchan Lee
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.principalResearcherRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.principalResearcherDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Kwang Il Kim
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.leadershipRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.leadershipDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Seokju Kang
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.cisoRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.cisoDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 18l6-6-6-6" />
                        <path d="M8 6l-6 6 6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Hyukjun Yoo
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.engineerRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.engineerDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18" />
                        <path d="M7 17l4-6 4 3 5-8" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Kitae Kim
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.mathResearcherRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.mathResearcherDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        TJ Park
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.eduResearcherRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.eduResearcherDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Yongki Cho
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.csResearcherRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.csResearcherDesc}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card-bg p-8 flex items-center gap-6">
                    <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="3.5" r="1.5" />
                        <line x1="12" y1="5" x2="6" y2="20" />
                        <line x1="12" y1="5" x2="18" y2="20" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Junghoon Kim
                      </h3>
                      <p className="text-sm font-medium text-accent-blue">
                        {t.theoryResearcherRole}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {t.theoryResearcherDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Belief */}
              <div>
                <SectionHeading title={t.coreBeliefTitle} />
                <div className="rounded-2xl border border-card-border bg-card-bg p-8">
                  <p className="text-lg font-medium text-text-primary leading-relaxed">
                    &ldquo;{t.coreBeliefQuote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-text-muted">
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
                <p className="text-sm leading-relaxed text-text-secondary">
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
                <span className="text-text-secondary flex-shrink-0">
                  <ResearchIcon id={area.id} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {ra.areas[area.id as keyof typeof ra.areas]?.title ?? area.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    {ra.areas[area.id as keyof typeof ra.areas]?.description ?? area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why YATAV Research Exists */}
      <section className="py-20 bg-section-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.whyTitle} />
          <div className="max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-text-secondary">
              {t.whyText1}
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              {t.whyText2}
            </p>
            <p className="text-base leading-relaxed text-text-primary font-medium">
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
