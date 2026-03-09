interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <div className="gradient-bar w-12 mb-4 rounded-full" />
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-text-on-dark" : "text-text-primary dark:text-text-on-dark"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-3xl text-lg leading-relaxed ${
            light
              ? "text-text-on-dark-muted"
              : "text-text-secondary dark:text-text-on-dark-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
