import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Dictionary> = {
  en: () => require("./dictionaries/en").default,
  ko: () => require("./dictionaries/ko").default,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]();
}
