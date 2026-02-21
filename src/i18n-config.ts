export const i18n = {
  defaultLocale: "th",
  locales: ["th", "en", "zh"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
