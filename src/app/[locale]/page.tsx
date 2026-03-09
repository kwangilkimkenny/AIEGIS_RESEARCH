import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import HeroSection from "@/components/home/HeroSection";
import WhatWeStudy from "@/components/home/WhatWeStudy";
import ResearchAreas from "@/components/home/ResearchAreas";
import WhyItMatters from "@/components/home/WhyItMatters";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import PublicationTypes from "@/components/home/PublicationTypes";
import ResearchPrinciples from "@/components/home/ResearchPrinciples";
import CTASection from "@/components/home/CTASection";
import { getFeaturedPublications } from "@/lib/publications";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const featured = getFeaturedPublications();

  return (
    <>
      <HeroSection dict={dict} locale={locale} />
      <WhatWeStudy dict={dict} />
      <ResearchAreas dict={dict} />
      <WhyItMatters dict={dict} />
      <FeaturedResearch publications={featured} dict={dict} locale={locale} />
      <PublicationTypes dict={dict} />
      <ResearchPrinciples dict={dict} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
