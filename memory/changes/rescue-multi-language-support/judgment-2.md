---
type: judgment
judge: 2
change_name: "rescue-multi-language-support"
created: "2026-05-12"
verdict: APPROVE_WITH_CONDITIONS
tags: [judgment]
---

# Juez 2 — Veredicto

## Resumen ejecutivo

Infra i18n sólida: paridad de 613 claves, validador bloqueante, fallback robusto en `useTranslations`, RTL con propiedades lógicas, sitemap con `xhtml:link` alternates correcto. Sin embargo encuentro **una incoherencia SEO sutil pero real** entre los `hreflang` del `<head>` (sin slash final) y el sitemap (con slash final), y una **regresión de routing de 404** que vuelve decorativas las páginas `/[lang]/404.astro`. Bundle/perf no es un problema (i18n es 100% SSG). Bloqueantes ninguno; condicionar el merge a corregir las dos incoherencias listadas como importantes.

## Hallazgos

### Críticos (BLOCK)

Ninguno.

### Importantes (APPROVE_WITH_CONDITIONS)

1. **Inconsistencia `hreflang` head vs sitemap (slash final).** `buildLocaleUrl('en', '/')` retorna `/en` y el `<head>` emite `href="https://logatm.com/en"`. El sitemap (vía `@astrojs/sitemap`) emite `https://logatm.com/en/`. Google trata `/en` y `/en/` como URLs distintas: el clúster hreflang queda inconsistente con el clúster del sitemap; en hosts que redirijan `/en→/en/` (la gran mayoría de CDNs), el alternate apunta a un 301 y Google lo ignora. Bug en `src/i18n/utils.ts` `buildLocaleUrl` línea 60: el branch home (`safePath === '/'`) retorna `/en` y debería retornar `/en/` para alinearse con `trailingSlash` por defecto de Astro y con el sitemap. **Aplica a todas las páginas, en `<head>` y en `<link>` del `LanguageSelector`.** Fix: 1 línea.

2. **404 multilingüe es decorativo.** `default.conf` tiene `try_files $uri $uri/index.html /index.html` sin `error_page 404` ni reglas por locale. Una URL inexistente `/en/foo` cae al `/index.html` (¡home español, con status 200, no 404!). Las páginas `/[lang]/404.astro` nunca se sirven. Esto rompe el acceptance criteria implícito y daña SEO (soft-404 masivo). Fix: añadir en `default.conf`:
   ```
   error_page 404 /404.html;
   location ~ ^/(en|zh|hi|ar|pt)(/|$) {
     try_files $uri $uri/index.html /$1/404/index.html;
   }
   ```

### Menores (informativos)

3. **`og:locale` para `ar` no respeta BCP-47.** `OG_LOCALE.ar = 'ar_AR'` pero el `og:locale` requiere `lang_TERRITORY`; `ar_AR` es válido pero podría refinarse (`ar_SA` o `ar_AE` según mercado). Bajo riesgo.

4. **Validador no detecta type-mismatch puro.** `flatten()` aplana arrays con índices, pero si `es.faq = "string"` y `en.faq = {x:"y"}`, las rutas divergen → sí lo detecta. Sin embargo `[]` (array vacío) vs `["a"]` solo se reporta como `extra` y no como divergencia estructural. Suficiente en práctica.

5. **`tList`/`tObj` carecen de `console.warn`.** A diferencia de `t()`, si falta la colección en ambos locales se retorna el `fallback` silenciosamente. Para parity de visibilidad de errores, añadir `console.warn` cuando ambos fallan.

6. **`Astro.currentLocale` no se usa.** Confirmé inspeccionando `dist/en/index.html`: los strings tienen prefijo `[en]` correctamente — el patrón `getLangFromUrl(Astro.url)` evita el problema de propagación. OK.

7. **`@astrojs/sitemap` ignora 404.** El verify-report lo nota; coherente con SEO.

## Veredicto

**APPROVE_WITH_CONDITIONS** — La implementación es de buena calidad y los 7 specs están cubiertos. Pero (1) el desalineamiento slash final entre `<head>` y `sitemap.xml` es un defecto SEO concreto que el PR introduce; y (2) el routing nginx convierte el 404 multilingüe en humo. Ambos son fixes triviales; merge bloqueado hasta que los dos puntos estén corregidos o explícitamente diferidos a un follow-up con issue tracker.

## Lo que SÍ está bien hecho

- Fallback de tipo con `typeof === 'string'` evita render de `[object Object]`.
- `tList`/`tObj` tipados con generics y `Array.isArray` defensivo.
- 6 JSONs solo se importan en SSG; cero impacto en bundle cliente.
- Sitemap usa `xhtml:link` alternates por URL correctamente.
- Drawer móvil mantiene `inert`, `trapFocus`, `prefers-reduced-motion` y RTL con propiedades lógicas.
- Validador idempotente y sin side effects (solo lee JSON).
- ADRs 0002/0003 documentan trade-offs reales.
