import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/shared/SectionHeading";
import PublicationCard from "@/components/publications/PublicationCard";
import NeuralMesh from "@/components/shared/NeuralMesh";
import { getAllPublications } from "@/lib/publications";
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
    title: dict.publications.metaTitle,
    description: dict.publications.metaDescription,
  };
}

export default async function PublicationsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const t = dict.publications;
  const publications = getAllPublications();

  return (
    <>
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden">
        <NeuralMesh variant="subtle" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="max-w-3xl">
            <div className="gradient-bar w-12 mb-6 rounded-full" />
            <h1 className="text-4xl sm:text-5xl font-bold text-text-on-dark tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-on-dark-muted">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {publications.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-text-muted dark:text-text-on-dark-muted">
                {t.comingSoon}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-center justify-between">
                <p className="text-sm text-text-muted dark:text-text-on-dark-muted">
                  {publications.length} {publications.length !== 1 ? t.publicationsCount : t.publicationCount}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publications.map((pub) => (
                  <PublicationCard key={pub.slug} publication={pub} locale={locale} dict={dict} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
