/**
 * LOG ATM — Helpers i18n.
 * - getLangFromUrl: extrae el locale del path (`/en/...` → 'en'; `/...` → 'es').
 * - useTranslations: devuelve un `t(key)` con fallback al master español.
 * - getAlternateLinks: arma los `<link rel="alternate" hreflang>` para SEO.
 * - isRTL / getHtmlLang / getOgLocale: utilidades misceláneas.
 */

import {
  LOCALES,
  DEFAULT_LOCALE,
  RTL_LOCALES,
  HTML_LANG,
  OG_LOCALE,
  type Locale,
} from './config';
import type { TranslationKey, Translations } from './types';

import es from './translations/es.json';
import en from './translations/en.json';
import zh from './translations/zh.json';
import hi from './translations/hi.json';
import ar from './translations/ar.json';
import pt from './translations/pt.json';

const dictionaries: Record<Locale, Translations> = {
  es: es as Translations,
  en: en as Translations,
  zh: zh as Translations,
  hi: hi as Translations,
  ar: ar as Translations,
  pt: pt as Translations,
};

/** Extrae el locale del primer segmento del path. */
export function getLangFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment && (LOCALES as readonly string[]).includes(segment)) {
    return segment as Locale;
  }
  return DEFAULT_LOCALE;
}

/** Devuelve el path sin el prefijo de locale (`/en/servicios` → `/servicios`). */
export function stripLocaleFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && (LOCALES as readonly string[]).includes(parts[0])) {
    parts.shift();
  }
  return '/' + parts.join('/');
}

/** Construye la URL pública para un locale dado, partiendo del path "limpio". */
export function buildLocaleUrl(lang: Locale, cleanPath: string): string {
  const safePath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  if (lang === DEFAULT_LOCALE) {
    return safePath === '/' ? '/' : safePath;
  }
  return `/${lang}${safePath === '/' ? '' : safePath}` || `/${lang}/`;
}

/** Resuelve `a.b.c` dentro de un dict; retorna `undefined` si falta. */
function resolveKey(dict: Translations, key: string): unknown {
  let cursor: unknown = dict;
  for (const part of key.split('.')) {
    if (cursor && typeof cursor === 'object' && part in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return cursor;
}

function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
}

/**
 * Devuelve una función `t(key, params?)` con fallback al master español.
 * Si tampoco existe en español, retorna la propia clave (failure visible).
 */
export function useTranslations(lang: Locale) {
  const primary = dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE];
  const fallback = dictionaries[DEFAULT_LOCALE];

  return function t(key: TranslationKey | string, params?: Record<string, string | number>): string {
    const direct = resolveKey(primary, key);
    if (typeof direct === 'string') return interpolate(direct, params);
    if (typeof direct === 'number' || typeof direct === 'boolean') return String(direct);

    const fb = resolveKey(fallback, key);
    if (typeof fb === 'string') return interpolate(fb, params);
    if (typeof fb === 'number' || typeof fb === 'boolean') return String(fb);

    // eslint-disable-next-line no-console
    console.warn(`[i18n] Clave faltante: "${key}" (lang=${lang})`);
    return key;
  };
}

/** Indica si el locale se renderiza de derecha a izquierda. */
export function isRTL(lang: Locale): boolean {
  return (RTL_LOCALES as readonly Locale[]).includes(lang);
}

export function getHtmlLang(lang: Locale): string {
  return HTML_LANG[lang] ?? HTML_LANG[DEFAULT_LOCALE];
}

export function getOgLocale(lang: Locale): string {
  return OG_LOCALE[lang] ?? OG_LOCALE[DEFAULT_LOCALE];
}

/** Construye los pares para `<link rel="alternate" hreflang>` incluyendo x-default. */
export function getAlternateLinks(currentPath: string): Array<{ hreflang: string; href: string }> {
  const cleanPath = stripLocaleFromPath(currentPath);
  const links: Array<{ hreflang: string; href: string }> = [];
  for (const lang of LOCALES) {
    links.push({
      hreflang: getHtmlLang(lang),
      href: buildLocaleUrl(lang, cleanPath),
    });
  }
  links.push({
    hreflang: 'x-default',
    href: buildLocaleUrl(DEFAULT_LOCALE, cleanPath),
  });
  return links;
}

export type { Locale, TranslationKey };
export { LOCALES, DEFAULT_LOCALE, NON_DEFAULT_LOCALES, LOCALE_LABELS, LOCALE_NAMES, RTL_LOCALES } from './config';
