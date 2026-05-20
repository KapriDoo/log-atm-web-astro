/**
 * Genera un folio único de cotización server-side.
 * Formato: LA-{base36(timestamp)}{8-hex-de-UUID}
 * Ejemplo: LA-LX9K2A3F4B1C2D9E
 *
 * IMPORTANTE: Este módulo es server-only.
 * No importar en scripts de cliente (define:vars, <script> sin módulo).
 */
export function generateFolio(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomUUID().split('-')[0].toUpperCase(); // 8 hex chars
  return `LA-${ts}${rand}`;
}
