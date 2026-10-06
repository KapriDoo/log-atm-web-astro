/**
 * measure-home-image-weight.mjs — Medición reproducible del peso de imágenes del inicio.
 *
 * Lee el HTML construido del inicio (dist/client/index.html), simula la elección de variante
 * AVIF que hace el navegador en cada <picture> (srcset + sizes) para dos escenarios y suma el
 * peso en disco de los archivos elegidos, asumiendo que la página se recorre completa (todas
 * las imágenes lazy se descargan). Incluye también el poster del video y las <img> sueltas
 * (logo), porque se descargan igual. Cada URL se cuenta una sola vez (caché del navegador).
 *
 * Selección de candidato: ancho de slot = valor de `sizes` evaluado contra el viewport; se
 * elige el menor candidato con `w >= slot × DPR`, o el mayor disponible si ninguno alcanza.
 *
 * Uso: npm run build && npm run measure:images (o node scripts/measure-home-image-weight.mjs)
 * Exit code 1 si algún escenario alcanza o supera el presupuesto de 2 MB; 2 ante error de uso.
 */
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const DIST = join(ROOT, 'dist/client');
const HTML = join(DIST, 'index.html');

// Presupuesto de la spec image-multiformat-delivery: < 2 MB (2 × 1024 × 1024 bytes).
const BUDGET = 2 * 1024 * 1024;

const SCENARIOS = [
  { name: 'escritorio 1440x900 DPR 1', width: 1440, dpr: 1 },
  { name: 'movil 390x844 DPR 3', width: 390, dpr: 3 },
];

/** Lee un atributo de una etiqueta HTML (comillas dobles, simples o sin comillas). */
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4]) : null;
}

/** Parsea un srcset en candidatos { url, w } (w = null si no declara descriptor de ancho). */
function parseSrcset(srcset) {
  return srcset
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [url, descriptor] = part.split(/\s+/);
      const w = descriptor && descriptor.endsWith('w') ? Number(descriptor.slice(0, -1)) : null;
      return { url, w };
    });
}

/** Divide por comas de nivel superior (ignora las comas dentro de paréntesis). */
function splitTopLevel(text) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** Evalúa una longitud CSS (px, vw, calc, min, max) contra el ancho de viewport, en px. */
function evalLength(length, vw) {
  const expr = length
    .replace(/calc\(/g, '(')
    .replace(/min\(/g, 'Math.min(')
    .replace(/max\(/g, 'Math.max(')
    .replace(/([\d.]+)vw/g, (_, n) => `(${n}*${vw}/100)`)
    .replace(/([\d.]+)px/g, '$1')
    .replace(/([\d.]+)rem/g, (_, n) => `(${n}*16)`);
  if (!/^[\d.+\-*/()\s,Mathinax]*$/.test(expr)) throw new Error(`Longitud no soportada: ${length}`);
  return Function(`"use strict"; return (${expr});`)();
}

/** Evalúa una media condition simple ((min|max)-width en px, unidas por "and"). */
function matchesMedia(condition, vw) {
  return [...condition.matchAll(/\((min|max)-width:\s*([\d.]+)px\)/g)].every(([, kind, px]) =>
    kind === 'min' ? vw >= Number(px) : vw <= Number(px),
  );
}

/** Ancho de slot en px según el atributo sizes (100vw si no se declara). */
function slotWidth(sizes, vw) {
  if (!sizes) return vw;
  for (const entry of splitTopLevel(sizes)) {
    const m = entry.match(/^(\(.*\))\s+(.+)$/);
    if (!m) return evalLength(entry, vw);
    if (matchesMedia(m[1], vw)) return evalLength(m[2], vw);
  }
  return vw;
}

/** Elige el candidato que descargaría el navegador para un viewport y DPR. */
function pickCandidate(candidates, sizes, vw, dpr) {
  const withWidth = candidates.filter((c) => c.w !== null).sort((a, b) => a.w - b.w);
  if (withWidth.length === 0) return candidates[0];
  const needed = slotWidth(sizes, vw) * dpr;
  return withWidth.find((c) => c.w >= needed) ?? withWidth[withWidth.length - 1];
}

function fileSize(url) {
  return statSync(join(DIST, decodeURIComponent(url.split('?')[0]))).size;
}

function measure(html, { width, dpr }) {
  const urls = new Map(); // url → categoría, sin duplicados
  const pictures = html.match(/<picture[\s\S]*?<\/picture>/g) ?? [];
  for (const picture of pictures) {
    const avif = (picture.match(/<source[^>]*>/g) ?? []).find((s) => attr(s, 'type') === 'image/avif');
    if (!avif) continue;
    const chosen = pickCandidate(parseSrcset(attr(avif, 'srcset')), attr(avif, 'sizes'), width, dpr);
    if (!urls.has(chosen.url)) urls.set(chosen.url, 'avif');
  }
  // Poster del video y <img> fuera de <picture>: se descargan con la página.
  const outside = html.replace(/<picture[\s\S]*?<\/picture>/g, '');
  for (const tag of outside.match(/<(img|video)\s[^>]*>/g) ?? []) {
    const url = attr(tag, tag.startsWith('<video') ? 'poster' : 'src');
    if (url && url.startsWith('/') && !urls.has(url)) urls.set(url, 'otras');
  }
  const totals = { avif: 0, otras: 0 };
  for (const [url, kind] of urls) totals[kind] += fileSize(url);
  return { ...totals, total: totals.avif + totals.otras, files: urls.size };
}

function fmt(bytes) {
  return `${bytes} bytes (${(bytes / 1024 / 1024).toFixed(3)} MB)`;
}

let html;
try {
  html = readFileSync(HTML, 'utf8');
} catch {
  console.error(`No existe ${HTML}: ejecutar "npm run build" antes de medir.`);
  process.exit(2);
}

let overBudget = false;
for (const scenario of SCENARIOS) {
  const r = measure(html, scenario);
  const ok = r.total < BUDGET;
  overBudget ||= !ok;
  console.log(`${scenario.name}: total ${fmt(r.total)} | avif ${fmt(r.avif)} | otras ${fmt(r.otras)} | archivos ${r.files} | ${ok ? 'OK < 2 MB' : 'EXCEDE 2 MB'}`);
}
process.exit(overBudget ? 1 : 0);
