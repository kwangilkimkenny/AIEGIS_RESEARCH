interface NeuralMeshProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

/**
 * Swiss / Bauhaus geometric backdrop.
 *
 * Replaces the previous animated neural-network canvas. Renders a static SVG
 * composition: hairline grid + 3 primary geometric solids (square, circle,
 * triangle / line) in cobalt + terracotta + ink. Same exported API as the
 * original component so all callers continue to work.
 */
export default function NeuralMesh({
  variant = "section",
  className = "",
}: NeuralMeshProps) {
  const opacity =
    variant === "hero" ? 1 : variant === "section" ? 0.85 : 0.55;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Hairline grid */}
      <div className="absolute inset-0 bauhaus-grid" />

      {/* Composition */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Cobalt square — anchored top-right */}
        <rect
          x="1180"
          y="-60"
          width="360"
          height="360"
          fill="var(--cobalt)"
          opacity={variant === "subtle" ? 0.18 : 0.92}
        />

        {/* Terracotta circle — bottom-left, partially out of frame */}
        <circle
          cx="160"
          cy="820"
          r="280"
          fill="var(--terracotta)"
          opacity={variant === "subtle" ? 0.14 : 0.88}
        />

        {/* Ink triangle — middle, geometric counterweight */}
        <polygon
          points="900,540 1140,720 660,720"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          opacity={variant === "subtle" ? 0.25 : 0.9}
        />

        {/* Cobalt diagonal hairline — Bauhaus line element */}
        <line
          x1="0"
          y1="120"
          x2="1600"
          y2="640"
          stroke="var(--cobalt)"
          strokeWidth="1.5"
          opacity={variant === "subtle" ? 0.18 : 0.55}
        />

        {/* Mustard dot — type-foundry punctuation */}
        <circle
          cx="1080"
          cy="180"
          r="14"
          fill="var(--mustard)"
          opacity={variant === "subtle" ? 0.4 : 0.95}
        />

        {/* Ink heavy rule near bottom */}
        <line
          x1="60"
          y1="860"
          x2="540"
          y2="860"
          stroke="var(--ink)"
          strokeWidth="4"
          opacity={variant === "subtle" ? 0.3 : 0.9}
        />
      </svg>
    </div>
  );
}
