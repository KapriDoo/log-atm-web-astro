/**
 * LOG ATM — Tipos i18n derivados del master `es.json`.
 */
import type es from './translations/es.json';
import type { Locale } from './config';

/**
 * Genera tipo unión con todas las rutas tipo "a.b.c" del JSON.
 * Termina la recursión en valores `string`/`number`/`boolean`.
 */
type Primitive = string | number | boolean | null;
type DotPaths<T, Prefix extends string = ''> = T extends Primitive
  ? Prefix extends '' ? never : Prefix
  : {
      [K in Extract<keyof T, string>]: K extends `__${string}`
        ? never
        : DotPaths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>;
    }[Extract<keyof T, string>];

export type TranslationKey = DotPaths<typeof es>;
export type Translations = typeof es;
export type { Locale };
