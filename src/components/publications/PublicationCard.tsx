import Link from "next/link";
import { Publication } from "@/lib/types";
import { DOCUMENT_TYPE_COLORS } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface PublicationCardProps {
  publication: Publication;
  locale: Locale;
  dict: Dictionary;
}

export default function PublicationCard({ publication, locale, dict }: PublicationCardProps) {
  const dtLabels = dict.documentTypes;
  const t = dict.publications;
  const dateLocale = locale === "ko" ? "ko-KR" : "en-US";

  return (
    <article className="group flex flex-col rounded-2xl border border-card-border bg-card-bg overflow-hidden card-hover">
      <div className="gradient-bar" />
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-muted dark:text-text-on-dark-muted">
              {publication.documentNumber}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                DOCUMENT_TYPE_COLORS[publication.type]
              }`}
            >
              {dtLabels[publication.type]}
            </span>
          </div>
          <time className="text-xs text-text-muted dark:text-text-on-dark-muted">
            {new Date(publication.publishedDate).toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "short",
            })}
          </time>
        </div>

        {/* Title */}
        <Link href={`/${locale}/publications/${publication.slug}`}>
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-on-dark group-hover:text-accent-blue transition-colors leading-snug">
            {publication.title}
          </h2>
        </Link>

        {/* Subtitle */}
        <p className="mt-1 text-sm text-text-muted dark:text-text-on-dark-muted italic">
          {publication.subtitle}
        </p>

        {/* Authors */}
        <p className="mt-3 text-xs text-text-muted dark:text-text-on-dark-muted">
          {publication.authors.join(", ")}
        </p>

        {/* Abstract */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-text-on-dark-muted flex-1 line-clamp-3">
          {publication.abstract}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {publication.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-100 dark:bg-navy-800 px-2 py-0.5 text-xs text-text-muted dark:text-text-on-dark-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 pt-4 border-t border-card-border">
          <Link
            href={`/${locale}/publications/${publication.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue-hover transition-colors"
          >
            {t.readSummary}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
