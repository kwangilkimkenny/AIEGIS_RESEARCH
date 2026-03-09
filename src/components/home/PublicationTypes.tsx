import SectionHeading from "@/components/shared/SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const icons = ["📄", "📊", "📈", "📑", "🏢", "📋"];

interface Props {
  dict: Dictionary;
}

export default function PublicationTypes({ dict }: Props) {
  const t = dict.publicationTypes;

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.types.map((type, i) => (
            <div
              key={type.name}
              className="flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5"
            >
              <span className="text-xl flex-shrink-0" role="img" aria-label={type.name}>
                {icons[i]}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-text-primary dark:text-text-on-dark">
                  {type.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary dark:text-text-on-dark-muted">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
