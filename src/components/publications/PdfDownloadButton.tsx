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
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111111; padding: 0;">
          <!-- Cover Header -->
          <div style="border-bottom: 4px solid #000000; padding-bottom: 24px; margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
              <div>
                <div style="font-size: 11px; font-weight: 600; color: #000000; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;">
                  AEGIS RESEARCH
                </div>
                <div style="font-size: 10px; color: #767676; font-family: monospace;">
                  ${documentNumber} &middot; v${version}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="display: inline-block; border: 1px solid #111111; color: #111111; font-size: 10px; font-weight: 600; padding: 3px 10px; letter-spacing: 1px; text-transform: uppercase;">
                  ${typeLabel[type] || type}
                </div>
              </div>
            </div>

            <h1 style="font-size: 26px; font-weight: 700; line-height: 1.25; margin: 0 0 8px 0; color: #111111;">
              ${title}
            </h1>
            <p style="font-size: 14px; color: #4A4A4A; font-style: italic; margin: 0 0 16px 0;">
              ${subtitle}
            </p>

            <div style="font-size: 11px; color: #4A4A4A; line-height: 1.6;">
              <div><strong style="color: #111111;">Authors:</strong> ${authors.join(", ")}</div>
              <div><strong style="color: #111111;">Affiliation:</strong> ${affiliation}</div>
              <div><strong style="color: #111111;">Published:</strong> ${formattedDate}</div>
            </div>
          </div>

          <!-- Abstract -->
          <div style="background: #F5F4EE; border-left: 3px solid #111111; padding: 20px 24px; margin-bottom: 32px;">
            <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #111111; margin: 0 0 10px 0;">
              Abstract
            </h2>
            <p style="font-size: 12px; line-height: 1.7; color: #2D2D2D; margin: 0;">
              ${abstract}
            </p>
          </div>

          <!-- Main Content -->
          <div class="pdf-body" style="font-size: 12px; line-height: 1.7; color: #1A1A1A;">
            ${articleEl.innerHTML}
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #111111; text-align: center;">
            <p style="font-size: 10px; color: #4A4A4A; margin: 0; letter-spacing: 1px;">
              &copy; YATAV AIEGIS Research. All rights reserved.
            </p>
            <p style="font-size: 9px; color: #767676; margin: 4px 0 0 0; font-family: monospace;">
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
          border-bottom: 2px solid #111111;
          color: #111111;
          letter-spacing: -0.01em;
        }
        .pdf-body h3 {
          font-size: 15px;
          font-weight: 600;
          margin-top: 20px;
          margin-bottom: 8px;
          color: #111111;
        }
        .pdf-body h4 {
          font-size: 13px;
          font-weight: 600;
          margin-top: 16px;
          margin-bottom: 6px;
          color: #2D2D2D;
        }
        .pdf-body p {
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 10px;
          color: #2D2D2D;
        }
        .pdf-body ul, .pdf-body ol {
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 10px;
          padding-left: 20px;
          color: #2D2D2D;
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
          border: 1px solid #111111;
          padding: 6px 8px;
          text-align: left;
        }
        .pdf-body th {
          background: #111111;
          color: #FFFFFF;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 9px;
        }
        .pdf-body td {
          color: #2D2D2D;
        }
        .pdf-body strong {
          color: #111111;
        }
        .pdf-body blockquote {
          border-left: 3px solid #111111;
          padding-left: 14px;
          margin: 12px 0;
          color: #2D2D2D;
          font-style: italic;
        }
        .pdf-body code {
          font-size: 11px;
          background: #F2F2F0;
          color: #111111;
          padding: 1px 4px;
          border-radius: 2px;
        }
        .pdf-body pre {
          background: #111111;
          color: #F5F4EE;
          padding: 12px;
          border-radius: 2px;
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
          color: #111111;
          text-decoration: underline;
          text-underline-offset: 2px;
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
