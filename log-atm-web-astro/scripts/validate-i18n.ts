/**
 * LOG ATM — Validador de paridad de claves entre archivos de traducción.
 *
 * Compara las claves aplanadas (dot-notation) de cada locale contra `es.json`
 * (master). Reporta `missing` y `extra` por locale. Sale con código 1 si hay
 * cualquier discrepancia.
 *
 * Uso:
 *   node --experimental-strip-types scripts/validate-i18n.ts
 *   o invocado como integration hook de Astro (`astro:build:start`).
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', 'src', 'i18n', 'translations');

const LOCALES = ['es', 'en', 'pt'] as const;
const MASTER = 'es' as const;
/** Claves de metadata que no deben validarse para paridad. */
const META_KEYS = new Set(['__needs_native_review', '__note']);

function flatten(obj: unknown, prefix = '', acc: Set<string> = new Set()): Set<string> {
  if (obj === null || typeof obj !== 'object') {
    if (prefix) acc.add(prefix);
    return acc;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (META_KEYS.has(k)) continue;
    const next = prefix ? `${prefix}.${k}` : k;
    flatten(v, next, acc);
  }
  return acc;
}

function loadJson(locale: string): Record<string, unknown> {
  const file = join(ROOT, `${locale}.json`);
  return JSON.parse(readFileSync(file, 'utf-8'));
}

export function validate(): { ok: boolean; report: string[] } {
  const master = flatten(loadJson(MASTER));
  const report: string[] = [];
  let ok = true;

  for (const lang of LOCALES) {
    if (lang === MASTER) continue;
    const keys = flatten(loadJson(lang));
    const missing = [...master].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !master.has(k));
    if (missing.length === 0 && extra.length === 0) {
      report.push(`[i18n] ${lang}: OK (${keys.size} claves)`);
      continue;
    }
    ok = false;
    report.push(`[i18n] ${lang}: FAIL`);
    if (missing.length) report.push(`  - missing: ${missing.join(', ')}`);
    if (extra.length) report.push(`  - extra:   ${extra.join(', ')}`);
  }

  return { ok, report };
}

const isMain = fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const { ok, report } = validate();
  // eslint-disable-next-line no-console
  console.log(report.join('\n'));
  process.exit(ok ? 0 : 1);
}
