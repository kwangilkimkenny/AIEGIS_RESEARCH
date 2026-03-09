import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const t = dict.footer;

  const footerLinks = {
    [t.research]: [
      { label: t.publications, href: `/${locale}/publications` },
      { label: t.researchAreas, href: `/${locale}/#research-areas` },
      { label: t.principles, href: `/${locale}/#principles` },
    ],
    [t.company]: [
      { label: t.about, href: `/${locale}/about` },
      { label: t.contact, href: `/${locale}/contact` },
    ],
    [t.resources]: [
      { label: t.latestPapers, href: `/${locale}/publications` },
    ],
  };

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div>
                <span className="text-sm font-bold tracking-wide text-text-on-dark">
                  A<span className="text-emerald-500 font-extrabold">I</span>EGIS Research
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-on-dark-muted">
              {t.tagline}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text-on-dark mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-on-dark-muted hover:text-text-on-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="gradient-bar mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-on-dark-muted">
            &copy; {t.copyright}
          </p>
          <p className="text-xs text-text-on-dark-muted">
            {t.motto}
          </p>
        </div>
      </div>
    </footer>
  );
}
