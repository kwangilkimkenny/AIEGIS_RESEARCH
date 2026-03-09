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
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide text-text-on-dark">
                A<span className="text-emerald-500 font-extrabold">I</span>EGIS
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-text-on-dark-muted">
                Research
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Language Switch */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={switchedPath}
              className="px-3 py-1.5 text-xs font-medium text-text-on-dark-muted hover:text-text-on-dark border border-white/10 rounded-md hover:bg-white/5 transition-colors"
            >
              {otherLocale === "ko" ? "한국어" : "EN"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-4 py-2 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover rounded-lg transition-colors"
            >
              {t.contactUs}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-on-dark-muted hover:text-text-on-dark"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
        <div className="md:hidden bg-navy-950 border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={switchedPath}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark hover:bg-white/5 rounded-lg transition-colors"
            >
              {otherLocale === "ko" ? "🌐 한국어" : "🌐 EN"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 mt-2 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover rounded-lg text-center transition-colors"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
