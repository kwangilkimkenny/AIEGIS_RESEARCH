"use client";

import { useState } from "react";

interface PdfDownloadButtonProps {
  slug: string;
  title: string;
  subtitle: string;
  documentNumber: string;
  authors: string[];
  affiliation: string;
  publishedDate: string;
  version: string;
  type: string;
  abstract: string;
  label: string;
  variant?: "primary" | "outline" | "link";
  className?: string;
}

export default function PdfDownloadButton({
  slug,
  title,
  subtitle,
  documentNumber,
  authors,
  affiliation,
  publishedDate,
  version,
  type,
  abstract,
  label,
  variant = "primary",
  className = "",
}: PdfDownloadButtonProps) {
  const [generating, setGenerating] = useState(false);

  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const typeLabel: Record<string, string> = {
    "research-paper": "Research Paper",
    "technical-report": "Technical Report",
    "benchmark-report": "Benchmark Report",
    whitepaper: "Whitepaper",
    "case-study": "Case Study",
    "executive-brief": "Executive Brief",
  };

  async function handleDownload() {
    setGenerating(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // Grab the rendered article content from the page
      const articleEl = document.querySelector("article.prose");
      if (!articleEl) {
        alert("Content not found.");
        setGenerating(false);
        return;
      }

      // Build a standalone HTML container for the PDF
      const container = document.createElement("div");
      container.innerHTML = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a2e; padding: 0;">
          <!-- Cover Header -->
          <div style="border-bottom: 3px solid #2563eb; padding-bottom: 24px; margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
              <div>
                <div style="font-size: 11px; font-weight: 600; color: #2563eb; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;">
                  AEGIS RESEARCH
                </div>
                <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
                  ${documentNumber} &middot; v${version}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="display: inline-block; background: #eff6ff; color: #2563eb; font-size: 10px; font-weight: 500; padding: 3px 10px; border-radius: 4px;">
                  ${typeLabel[type] || type}
                </div>
              </div>
            </div>

            <h1 style="font-size: 26px; font-weight: 700; line-height: 1.25; margin: 0 0 8px 0; color: #0f172a;">
              ${title}
            </h1>
            <p style="font-size: 14px; color: #64748b; font-style: italic; margin: 0 0 16px 0;">
              ${subtitle}
            </p>

            <div style="font-size: 11px; color: #6b7280; line-height: 1.6;">
              <div><strong>Authors:</strong> ${authors.join(", ")}</div>
              <div><strong>Affiliation:</strong> ${affiliation}</div>
              <div><strong>Published:</strong> ${formattedDate}</div>
            </div>
          </div>

          <!-- Abstract -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
            <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin: 0 0 8px 0;">
              Abstract
            </h2>
            <p style="font-size: 12px; line-height: 1.7; color: #334155; margin: 0;">
              ${abstract}
            </p>
          </div>

          <!-- Main Content -->
          <div class="pdf-body" style="font-size: 12px; line-height: 1.7; color: #1e293b;">
            ${articleEl.innerHTML}
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="font-size: 10px; color: #94a3b8; margin: 0;">
              &copy; YATAV AIEGIS Research. All rights reserved.
            </p>
            <p style="font-size: 9px; color: #cbd5e1; margin: 4px 0 0 0;">
              ${documentNumber} &middot; ${formattedDate}
            </p>
          </div>
        </div>
      `;

      // Apply print-friendly styles to the cloned content
      const style = document.createElement("style");
      style.textContent = `
        .pdf-body h2 {
          font-size: 18px;
          font-weight: 700;
          margin-top: 28px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
          color: #0f172a;
        }
        .pdf-body h3 {
          font-size: 15px;
          font-weight: 600;
          margin-top: 20px;
          margin-bottom: 8px;
          color: #1e293b;
        }
        .pdf-body h4 {
          font-size: 13px;
          font-weight: 600;
          margin-top: 16px;
          margin-bottom: 6px;
          color: #334155;
        }
        .pdf-body p {
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 10px;
          color: #334155;
        }
        .pdf-body ul, .pdf-body ol {
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 10px;
          padding-left: 20px;
          color: #334155;
        }
        .pdf-body li {
          margin-bottom: 4px;
        }
        .pdf-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 10px;
        }
        .pdf-body th, .pdf-body td {
          border: 1px solid #d1d5db;
          padding: 6px 8px;
          text-align: left;
        }
        .pdf-body th {
          background: #f1f5f9;
          font-weight: 600;
          color: #334155;
        }
        .pdf-body td {
          color: #475569;
        }
        .pdf-body strong {
          color: #0f172a;
        }
        .pdf-body blockquote {
          border-left: 3px solid #2563eb;
          padding-left: 12px;
          margin: 12px 0;
          color: #475569;
          font-style: italic;
        }
        .pdf-body code {
          font-size: 11px;
          background: #f1f5f9;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .pdf-body pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 12px;
          border-radius: 6px;
          font-size: 10px;
          overflow-x: auto;
          margin: 12px 0;
        }
        .pdf-body pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .pdf-body img {
          max-width: 100%;
          margin: 12px 0;
        }
        .pdf-body a {
          color: #2563eb;
          text-decoration: none;
        }
      `;
      container.prepend(style);

      const opt = {
        margin: [15, 15, 20, 15],
        filename: `${slug}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(container).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  if (variant === "link") {
    return (
      <button
        onClick={handleDownload}
        disabled={generating}
        className={`text-sm font-medium text-accent-blue hover:text-accent-blue-hover disabled:opacity-50 ${className}`}
      >
        {generating ? "Generating..." : `${label} ↓`}
      </button>
    );
  }

  const baseClasses =
    variant === "primary"
      ? "px-6 py-3 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      : "px-6 py-3 rounded-lg border border-white/20 text-text-on-dark font-medium hover:bg-white/5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className={`${baseClasses} ${className}`}
    >
      {generating && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {generating ? "Generating PDF..." : label}
    </button>
  );
}
