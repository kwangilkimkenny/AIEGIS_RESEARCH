"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = dict.nav;

  const otherLocale = locale === "en" ? "ko" : "en";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navItems = [
    { label: t.research, href: `/${locale}` },
    { label: t.publications, href: `/${locale}/publications` },
    { label: t.about, href: `/${locale}/about` },
    { label: t.contact, href: `/${locale}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo — ink block monogram + monospace metadata */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center bg-cobalt">
              <span className="text-base font-extrabold text-paper leading-none">Y</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-ink">
                YATAV
              </span>
              <span className="mt-1 font-mono text-[9px] font-semibold tracking-[0.22em] uppercase text-ink-mute">
                Research
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item, idx) => {
              const isActive =
                item.href === `/${locale}`
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-5 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? "text-cobalt" : "text-ink hover:text-cobalt"
                  } ${idx > 0 ? "border-l border-ink-faint" : ""}`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-4 right-4 -bottom-px h-0.5 bg-cobalt"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Language Switch */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={switchedPath}
              className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              {otherLocale === "ko" ? "KO" : "EN"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-[12px] font-semibold uppercase tracking-wider px-4 py-2 bg-cobalt text-paper hover:bg-cobalt-deep transition-colors"
            >
              {t.contactUs}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-ink">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-ink hover:text-cobalt border-b border-ink-faint"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={switchedPath}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-ink"
            >
              {otherLocale === "ko" ? "KO" : "EN"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 mt-2 text-sm font-semibold uppercase tracking-wider text-paper bg-cobalt hover:bg-cobalt-deep text-center"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
