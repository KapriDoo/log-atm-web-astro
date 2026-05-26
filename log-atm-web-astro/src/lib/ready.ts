/**
 * ready.ts — Helper de inicialización cross-carga
 *
 * Ejecuta fn inmediatamente si document.readyState !== 'loading',
 * o espera DOMContentLoaded. Patrón extraído de LanguageSelector.astro.
 *
 * Uso:
 *   ready(initMiComponente);
 *   // Para compat futura con View Transitions, ADEMÁS registrar:
 *   document.addEventListener('astro:page-load', initMiComponente);
 */
export function ready(fn: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}
