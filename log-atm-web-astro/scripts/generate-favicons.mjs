/**
 * generate-favicons.mjs — Script one-shot para generar favicon.svg y favicon.ico
 * Uso: node scripts/generate-favicons.mjs (desde la raíz del proyecto)
 * Output commiteado al repo; no se ejecuta en el build automatizado.
 */
import sharp from 'sharp';
import { copyFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');

const SRC_SVG = join(ROOT, 'public/logo.svg');
const OUT_SVG = join(ROOT, 'public/favicon.svg');
const OUT_ICO = join(ROOT, 'public/favicon.ico');

async function main() {
  // favicon.svg: copia directa del logo
  await copyFile(SRC_SVG, OUT_SVG);
  console.log('[favicons] favicon.svg generado:', OUT_SVG);

  // favicon.ico: PNG 32x32 renombrado a .ico
  // Nota R-D9: PNG en .ico es aceptado por Chrome/Firefox/Safari/Edge modernos (>95% browsers).
  // Si se requiere ICO nativo, instalar `to-ico` como dependencia dev.
  await sharp(SRC_SVG)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(OUT_ICO);
  console.log('[favicons] favicon.ico (32x32 PNG) generado:', OUT_ICO);
}

main().catch(e => { console.error('[favicons] ERROR:', e); process.exit(1); });
