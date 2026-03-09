"use client";

import { useState } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import NeuralMesh from "@/components/shared/NeuralMesh";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default function ContactPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || "en";
  const dict = getDictionary(locale);
  const t = dict.contact;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inquiryTypes = [
    { value: "general", label: t.general },
    { value: "demo", label: t.demo },
    { value: "partnership", label: t.partnership },
    { value: "media", label: t.media },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      inquiryType: formData.get("inquiryType") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(locale === "ko"
        ? "요청을 처리하는 중 오류가 발생했습니다. 다시 시도해 주세요."
        : "Failed to send your message. Please try again."
      );
      setSubmitting(false);
    }
  }

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

      {/* Form */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="text-center py-20">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 mb-6">
                <svg
                  className="h-8 w-8 text-emerald"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-on-dark">
                {t.thankYou}
              </h2>
              <p className="mt-3 text-text-secondary dark:text-text-on-dark-muted">
                {t.thankYouText}
              </p>
            </div>
          ) : (
            <>
              <SectionHeading
                title={t.formTitle}
                subtitle={t.formSubtitle}
              />

              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-4">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-on-dark mb-2">
                    {t.inquiryType}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {inquiryTypes.map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2.5 cursor-pointer hover:border-accent-blue transition-colors"
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          defaultChecked={type.value === "general"}
                          className="text-accent-blue"
                        />
                        <span className="text-sm text-text-primary dark:text-text-on-dark">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-on-dark mb-2">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-text-primary dark:text-text-on-dark placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-text-on-dark mb-2">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-text-primary dark:text-text-on-dark placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-on-dark mb-2">
                    {t.organization}
                  </label>
                  <input
                    type="text"
                    name="organization"
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-text-primary dark:text-text-on-dark placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors"
                    placeholder={t.orgPlaceholder}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-text-on-dark mb-2">
                    {t.message} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-text-primary dark:text-text-on-dark placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors resize-y"
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {submitting
                    ? (locale === "ko" ? "전송 중..." : "Sending...")
                    : t.send
                  }
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-section-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.infoCards.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-card-border bg-card-bg p-6"
              >
                <h3 className="text-base font-semibold text-text-primary dark:text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary dark:text-text-on-dark-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
