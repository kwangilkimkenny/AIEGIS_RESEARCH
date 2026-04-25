interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** Render on a dark/ink background (paper text + faint accents). */
  light?: boolean;
  /** Optional section number — rendered as monospace eyebrow (e.g. "§ 02 / RESEARCH"). */
  sectionNumber?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
  sectionNumber,
}: SectionHeadingProps) {
  const titleColor = light ? "text-paper" : "text-ink";
  const subtitleColor = light ? "text-ink-faint" : "text-ink-light";
  const eyebrowColor = light ? "text-paper/70" : "text-ink-light";
  const markerColor = light ? "bg-paper" : "bg-cobalt";

  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 mb-5 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className={`block h-3 w-3 ${markerColor}`} aria-hidden="true" />
        {sectionNumber && (
          <span
            className={`font-mono text-[0.7rem] tracking-[0.18em] uppercase ${eyebrowColor}`}
          >
            {sectionNumber}
          </span>
        )}
      </div>
      <h2
        className={`display-md font-bold ${titleColor}`}
        style={{ letterSpacing: "-0.025em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-3xl text-lg leading-relaxed ${subtitleColor} ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
