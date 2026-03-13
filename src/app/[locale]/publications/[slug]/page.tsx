import { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/shared/Button";
import NeuralMesh from "@/components/shared/NeuralMesh";
import { getPublicationBySlug, getPublicationSlugs } from "@/lib/publications";
import { DOCUMENT_TYPE_COLORS } from "@/lib/constants";
import { MDXRemote } from "next-mdx-remote/rsc";
import { locales, isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPublicationSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return {};

  return {
    title: pub.title,
    description: pub.abstract,
    openGraph: {
      title: pub.title,
      description: pub.oneLinerEn,
      type: "article",
      publishedTime: pub.publishedDate,
      authors: pub.authors,
    },
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  const dict = getDictionary(locale);
  const t = dict.publicationDetail;
  const dtLabels = dict.documentTypes;
  const dateLocale = locale === "ko" ? "ko-KR" : "en-US";

  return (
    <>
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden">
        <NeuralMesh variant="subtle" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-sm text-accent-cyan">
                {pub.documentNumber}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  DOCUMENT_TYPE_COLORS[pub.type]
                }`}
              >
                {dtLabels[pub.type]}
              </span>
              <span className="text-sm text-text-on-dark-muted">
                v{pub.version}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-on-dark tracking-tight leading-tight">
              {pub.title}
            </h1>
            <p className="mt-3 text-lg text-text-on-dark-muted italic">
              {pub.subtitle}
            </p>

            {/* Authors & Date */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-text-on-dark-muted">
              <div>
                <span className="text-text-on-dark-muted/60">{t.authors}: </span>
                <span className="text-text-on-dark">
                  {pub.authors.join(", ")}
                </span>
              </div>
              <div>
                <span className="text-text-on-dark-muted/60">{t.published}: </span>
                <span className="text-text-on-dark">
                  {new Date(pub.publishedDate).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div>
                <span className="text-text-on-dark-muted/60">
                  {t.affiliation}:{" "}
                </span>
                <span className="text-text-on-dark">{pub.affiliation}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {pub.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-text-on-dark-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* <PdfDownloadButton
                slug={pub.slug}
                title={pub.title}
                subtitle={pub.subtitle}
                documentNumber={pub.documentNumber}
                authors={pub.authors}
                affiliation={pub.affiliation}
                publishedDate={pub.publishedDate}
                version={pub.version}
                type={pub.type}
                abstract={pub.abstract}
                label={t.downloadPdf}
                variant="primary"
              /> */}
              {pub.githubUrl && (
                <Button href={pub.githubUrl} variant="outline" size="lg">
                  <span className="text-text-on-dark flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    {t.tryItOut}
                  </span>
                </Button>
              )}
              <Button href={`/${locale}/contact`} variant="outline" size="lg">
                <span className="text-text-on-dark">{t.contactUs}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Banner */}
      <section className="bg-section-alt border-y border-card-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-text-on-dark-muted mb-3">
            {t.summary}
          </h2>
          <p className="text-lg leading-relaxed text-text-primary dark:text-text-on-dark max-w-4xl">
            {pub.abstract}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-card-border prose-a:text-accent-blue prose-table:text-sm">
            <MDXRemote source={pub.content} />
          </article>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 bg-section-alt">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text-primary dark:text-text-on-dark mb-6">
            {t.assetsAndDownloads}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub Repository */}
            {pub.githubUrl && (
              <div className="flex items-center justify-between rounded-xl border border-card-border bg-card-bg p-4">
                <span className="text-sm font-medium text-text-primary dark:text-text-on-dark flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  {t.githubRepo}
                </span>
                <a
                  href={pub.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent-blue hover:text-accent-blue-hover"
                >
                  {t.tryItOut} →
                </a>
              </div>
            )}
            {/* Other assets */}
            {[
              { label: t.executiveSummary, url: pub.executiveSummaryUrl, available: !!pub.executiveSummaryUrl },
              { label: t.slideDeck, url: pub.slidesUrl, available: !!pub.slidesUrl },
              { label: t.demoVideo, url: pub.demoVideoUrl, available: !!pub.demoVideoUrl },
            ].map((asset) => (
              <div
                key={asset.label}
                className={`flex items-center justify-between rounded-xl border border-card-border bg-card-bg p-4 ${
                  asset.available ? "" : "opacity-50"
                }`}
              >
                <span className="text-sm font-medium text-text-primary dark:text-text-on-dark">
                  {asset.label}
                </span>
                {asset.available && asset.url ? (
                  <a
                    href={asset.url}
                    className="text-sm font-medium text-accent-blue hover:text-accent-blue-hover"
                  >
                    {t.download} ↓
                  </a>
                ) : (
                  <span className="text-xs text-text-muted dark:text-text-on-dark-muted">
                    {t.comingSoon}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient overflow-hidden py-16">
        <NeuralMesh variant="subtle" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-on-dark">
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-text-on-dark-muted max-w-xl mx-auto">
            {t.ctaText}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/contact?type=demo`} variant="primary" size="lg">
              {t.requestDemo}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline" size="lg">
              <span className="text-text-on-dark">{t.contactResearchTeam}</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
