/**
 * LOG ATM — Conversión de logo PNG a SVG
 * Ejecutar una sola vez: node scripts/png-to-svg.mjs
 */
import potrace from 'potrace';
import sharp from 'sharp';
import { writeFileSync, existsSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const INPUT       = '/mnt/c/Users/cipri/Downloads/logatmlogo.png';
const OUTPUT      = resolve(ROOT, 'src/assets/logo.svg');
const TMP         = resolve(tmpdir(), 'logatm-logo-trace.png');
const BRAND_COLOR = '#4A7BB5';

if (!existsSync(INPUT)) {
  console.error(`❌ No se encontró: ${INPUT}`);
  process.exit(1);
}

console.log('📁 Preprocesando PNG con sharp…');

// Preparar imagen: escala de grises + alto contraste → archivo temporal
await sharp(INPUT)
  .resize(900, null, { withoutEnlargement: true })
  .greyscale()
  .normalise()
  .threshold(140)   // binariza: blanco/negro limpio para potrace
  .png()
  .toFile(TMP);

console.log('🖊  Trazando con potrace…');

// Trazar desde archivo temporal
potrace.trace(TMP, {
  color:        BRAND_COLOR,
  background:   'transparent',
  turdSize:     4,
  turnPolicy:   potrace.Potrace.TURNPOLICY_MINORITY,
  optTolerance: 0.2,
}, (err, svg) => {
  // Limpiar temp
  try { unlinkSync(TMP); } catch {}

  if (err) {
    console.error('❌ Error en potrace:', err.message);
    process.exit(1);
  }

  // Convertir a responsive: quitar dimensiones fijas, mantener viewBox
  const clean = svg
    .replace(/width="\d+(\.\d+)?"/, 'width="100%"')
    .replace(/height="\d+(\.\d+)?"/, 'height="100%"');

  writeFileSync(OUTPUT, clean, 'utf8');
  const kb = (Buffer.byteLength(clean) / 1024).toFixed(1);
  console.log(`✅ SVG guardado: ${OUTPUT}`);
  console.log(`   Tamaño: ${kb} KB`);
});
