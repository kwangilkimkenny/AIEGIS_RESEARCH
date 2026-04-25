import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

const variants = {
  primary:
    "bg-cobalt text-paper hover:bg-cobalt-deep border border-cobalt hover:border-cobalt-deep",
  secondary:
    "bg-ink text-paper hover:bg-ink-soft border border-ink",
  outline:
    "bg-paper text-ink border border-ink hover:bg-ink hover:text-paper",
  ghost:
    "bg-transparent text-ink hover:text-cobalt underline-offset-4 hover:underline",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-wide",
  md: "px-5 py-2.5 text-sm tracking-wide",
  lg: "px-7 py-3.5 text-sm tracking-wide",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  // Sharp corners (rounded-none) — Swiss/Bauhaus geometric language.
  const classes = `inline-flex items-center justify-center gap-2 rounded-none font-semibold uppercase transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
