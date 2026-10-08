/**
 * LOG ATM — Definición única de idiomas: locales soportados, idioma por defecto,
 * locales con prefijo, códigos regionales (BCP-47 y Open Graph) y mapeos de display.
 * El routing y el sitemap de `astro.config.mjs` y los scripts de validación toman
 * sus idiomas de aquí. Sin imports (ni imágenes, ni componentes, ni otros recursos),
 * para que la carguen por igual la configuración de Astro, `tsx` y las páginas.
 */

export const LOCALES = ['es', 'en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = 'es' satisfies Locale;

/** Locales servidos bajo prefijo `/{locale}/`: todos salvo el idioma por defecto. */
export const NON_DEFAULT_LOCALES: ReadonlyArray<Exclude<Locale, typeof DEFAULT_LOCALE>> = LOCALES.filter(
  (l): l is Exclude<Locale, typeof DEFAULT_LOCALE> => l !== DEFAULT_LOCALE,
);

/** Etiqueta corta para selector (códigos ISO). */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
};

/** Nombre nativo del idioma para tooltip y aria. */
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

/** Tag BCP-47 para <html lang> y og:locale. */
export const HTML_LANG: Record<Locale, string> = {
  es: 'es-CL',
  en: 'en-US',
  pt: 'pt-BR',
};

export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_CL',
  en: 'en_US',
  pt: 'pt_BR',
};

export const SITEMAP_LOCALES: Record<Locale, string> = HTML_LANG;
