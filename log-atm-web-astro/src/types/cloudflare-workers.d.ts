// Declaración ambient del módulo `cloudflare:workers`, que provee el runtime de Workers.
// Se declara solo lo que el código usa (`env`); ampliar aquí si se importa algo más del módulo.
// No se usa `wrangler types` ni `@cloudflare/workers-types`: sus globales del runtime chocan con
// `lib.dom` (ver ADR-0011). Este archivo es un script (sin import/export de nivel superior) para
// que `declare module` declare el módulo en lugar de aumentarlo.
declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>;
}
