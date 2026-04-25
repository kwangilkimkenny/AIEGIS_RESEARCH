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
    <footer className="bg-ink text-paper">
      {/* Cobalt rule */}
      <div className="h-1 bg-cobalt" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center bg-cobalt">
                <span className="text-base font-extrabold text-paper leading-none">A</span>
              </div>
              <div className="leading-none">
                <span className="text-base font-extrabold tracking-tight text-paper">
                  A<span className="text-cobalt-tint">I</span>EGIS
                </span>
                <span className="ml-2 font-mono text-[10px] tracking-[0.22em] uppercase text-paper/60">
                  Research
                </span>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-paper/70">
              {t.tagline}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-6 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <span className="block h-2 w-2 bg-cobalt" aria-hidden />
                <h3 className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-paper/80">
                  {title}
                </h3>
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/80 hover:text-paper hover:underline underline-offset-4 transition-colors"
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
        <div className="mt-16 pt-6 border-t border-paper/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/60">
            © {t.copyright}
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/60">
            {t.motto}
          </p>
        </div>
      </div>
    </footer>
  );
}
