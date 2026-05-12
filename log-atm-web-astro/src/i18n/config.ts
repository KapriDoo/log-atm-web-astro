/**
 * LOG ATM — Configuración i18n centralizada.
 * Locales soportados, defaults y mapeos de display.
 */

export const LOCALES = ['es', 'en', 'zh', 'hi', 'ar', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const NON_DEFAULT_LOCALES: ReadonlyArray<Exclude<Locale, 'es'>> = [
  'en',
  'zh',
  'hi',
  'ar',
  'pt',
];

export const RTL_LOCALES: ReadonlyArray<Locale> = ['ar'];

/** Etiqueta corta para selector (códigos ISO). */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  zh: '中文',
  hi: 'हिं',
  ar: 'AR',
  pt: 'PT',
};

/** Nombre nativo del idioma para tooltip y aria. */
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  pt: 'Português',
};

/** Tag BCP-47 para <html lang> y og:locale. */
export const HTML_LANG: Record<Locale, string> = {
  es: 'es-CL',
  en: 'en-US',
  zh: 'zh-CN',
  hi: 'hi-IN',
  ar: 'ar',
  pt: 'pt-BR',
};

export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_CL',
  en: 'en_US',
  zh: 'zh_CN',
  hi: 'hi_IN',
  ar: 'ar_AR',
  pt: 'pt_BR',
};

export const SITEMAP_LOCALES: Record<Locale, string> = HTML_LANG;
