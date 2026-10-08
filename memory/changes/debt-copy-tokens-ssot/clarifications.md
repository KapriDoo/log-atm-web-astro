## Iteración 1 — Preguntas (2026-10-07)

1. **C1 — Opción «Otro» del selector de origen en `/cotizar`.** `QUOTE_ORIGINS` en `constants.ts` incluye el literal `'Otro'`. Hoy se muestra en español también en `/en/cotizar` y `/pt/cotizar`. Dos AC del brief chocan aquí: «`constants.ts` sin copy visible» exige moverlo al i18n, y «HTML idéntico salvo "Última milla"» exige no cambiarlo. ¿Se mueve la etiqueta al i18n (es «Otro», en «Other», pt «Outro»), manteniendo el `value="Otro"` que recibe el operador, y se suma a las excepciones del diff de regresión? **Sí** (recomendado; es lo que asume la propuesta) / **No** (se deja el literal como excepción declarada al AC 1 y se registra como bug i18n aparte).

## Iteración 1 — Respuestas (2026-10-07)

Decisión del usuario: **[R] Refinar**, tras consultar a la sesión consultora (`bigger-consultor`), que coincidió con todos los desvíos de la iteración 1 (12 sitios, helper junto a `tList`, `site.ts` sin assets, política «sin literales nuevos; legado tolerado», supersede de `tokens/create-functional-tokens`, diff ampliado a industrias y contacto, API sin cambios).

1. **C1 — «Otro»: Sí.** La etiqueta se mueve al i18n (es «Otro», en «Other», pt «Outro»); se mantiene `value="Otro"` en el payload al operador; se declara como diferencia intencional del diff de regresión (corrige un bug i18n vigente: texto en español en /en y /pt).
2. **Slogan sin duplicar (DRY): se elimina `SITE.tagline`.** Los correos (en español, para el operador) leen `meta.tagline` de `es` desde el i18n; el JSON-LD usa el `meta.tagline` del idioma de la página (dato estructurado localizado en /en y /pt). Si al especificar aparece un motivo para conservar el slogan oficial en español en el JSON-LD, debe documentarse en la spec; no bloquea. La diferencia en el JSON-LD de /en y /pt se declara como diferencia intencional del diff de regresión.
3. **Host canónico: www.** Verificado en producción: `https://logatm.com` responde `301` hacia `https://www.logatm.com`, mientras el repo usa el apex en `astro.config.mjs` (`site`), `public/robots.txt` (`Sitemap:`), `BaseLayout.astro`, `constants.ts` y (según la propuesta) `manifest.json`; canonical, `hreflang`, `og:url` y sitemap apuntan hoy a una URL que redirige. Decisión: `SITE.url = https://www.logatm.com` y entran al scope `astro.config.mjs` `site` (idealmente leyendo de `site.ts` si el config puede importarlo sin arrastrar assets), `public/robots.txt` y `public/manifest.json`, que la iteración 1 excluía. Cloudflare no se toca. El cambio de host en canonical/`hreflang`/`og:url`/sitemap/JSON-LD es diferencia intencional del diff de regresión; el email `contacto@logatm.com` no cambia.

## Iteración 2 — Respuestas (2026-10-07)

Decisión del usuario: **[A] Aprobar** la iteración 2, con la recomendación de `bigger-consultor` y estas notas, que no requieren otra iteración y viajan como instrucciones de despacho:

1. **`robots.txt` como endpoint** (`src/pages/robots.txt.ts`): `export const prerender = true` (archivo estático en `dist/client`, sin invocar el worker); `Content-Type: text/plain`; `public/robots.txt` se borra en el mismo commit (si conviven, chocan en el build). Verify comprueba que `dist/client/robots.txt` existe con `Sitemap: https://www.logatm.com/sitemap-index.xml`.
2. **`es.json` en el bundle del worker de correo**: aceptable (24 KB). Si es simple, import nombrado de la clave usada (`meta`) en vez del JSON completo, para que el bundler descarte el resto. No bloquea.
3. **Checklist post-deploy para el PR** (verificación del usuario en producción): (a) primer build de Workers Builds tras el merge en verde (astro.config cargó `site.ts`); (b) en `https://www.logatm.com` con navegador real (Cloudflare responde 403 a curl): canonical, `hreflang` y `og:url` en www, `/robots.txt` con `Sitemap` en www, `/sitemap-index.xml` con URLs en www; (c) si se usa Google Search Console: verificar la propiedad de www y reenviar el sitemap.

Nota: el `name: 'Inicio'` fijo del `BreadcrumbList` ya está asignado al brief 08 (residual del PR #34); no se registra de nuevo.
