---
status: accepted
date: 2026-10-02
deciders: sdd-design
consulted: exploration.md, astro-docs, ADR-0002
informed: sdd-tasks, sdd-apply, sdd-verify
extends: "[[0002-i18n-routing-pages-lang-folder]]"
change_ref: "[[fix-i18n-links-and-404]]"
capability: i18n-routing
spec_refs:
  - "[[container-production-parity]]"
  - "[[i18n-routing-pages-and-language-selector]]"
  - "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
updated: "2026-10-08"
tags: [adr, i18n, routing, 404, astro, cloudflare]
---

# ADR 0007: Página 404 única, renderizada bajo demanda y fuera del patrón `[lang]/`

## Contexto

[[0002-i18n-routing-pages-lang-folder]] establece que cada página tiene una versión en
`src/pages/*.astro` (español) y otra en `src/pages/[lang]/*.astro` con `getStaticPaths()`
para los locales no-default. La 404 sigue ese patrón: `404.astro` y `[lang]/404.astro`
prerenderizadas (`404.html`, `en/404/index.html`, `pt/404/index.html`).

En el despliegue (Astro 6.3 + `@astrojs/cloudflare` 13.5, Workers con binding `ASSETS`),
una ruta inexistente llega al handler del adapter; el manejador de error por defecto de
Astro resuelve siempre la ruta `/404`, sin locale, y si está prerenderizada la sirve desde
`ASSETS` como `/404.html`. Resultado: toda URL inexistente bajo `/en/` o `/pt/` muestra la
404 en español, y `/en/404/`, `/pt/404/` responden 200 como páginas normales.

Si la ruta `/404` se renderiza bajo demanda, el manejador la renderiza con el path real de
la request: `Astro.url.pathname` conserva el prefijo de idioma.

## Decisión

La página de error 404 es **una sola página** (`src/pages/404.astro`) con
`export const prerender = false`, que deriva el locale de `getLangFromUrl(Astro.url)`.
No existe `src/pages/[lang]/404.astro`. Esta página queda fuera del patrón de
[[0002-i18n-routing-pages-lang-folder]], que sigue vigente para todas las páginas de
contenido.

Como la página se construye desde una URL que no existe, nada derivado de esa URL se
emite: el `Navbar` recibe `currentPath="/"` (el selector ofrece las homes por idioma) y
`BaseLayout`, al recibir `noindex`, omite canonical, `hreflang`, `og:url` y
`BreadcrumbList`.

## Consecuencias

### Positivas

- 404 en el idioma del prefijo para cualquier profundidad de ruta, con estado 404.
- Una única definición de la 404 (SSOT); `/en/404/` y `/pt/404/` responden 404.
- Sin middleware, `_redirects`, `not_found_handling` ni entrypoint propio.
- Un idioma nuevo se cubre sin tocar la 404: basta con `LOCALES` en `src/i18n/config.ts`.

### Negativas

- Depende de un detalle interno del manejador de error de Astro (el path real llega a la
  404 bajo demanda). Un upgrade mayor de Astro o del adapter exige repetir la verificación
  en `astro preview` con `/no-existe`, `/en/no-existe` y `/pt/no-existe`.
- `dist/client/404.html` deja de existir; la 404 se renderiza por request en el Worker
  (coste mínimo: la request ya pasaba por el Worker).
- Toda página `noindex` futura omite canonical, `hreflang`, `og:url` y `BreadcrumbList`
  por la regla de `BaseLayout`.
- Excepción explícita al patrón de [[0002-i18n-routing-pages-lang-folder]]: la cuenta de
  páginas prerenderizadas por idioma excluye la 404.

## Alternativas descartadas

- **Conservar `[lang]/404.astro` junto a la 404 bajo demanda**: `/en/404/` y `/pt/404/`
  siguen respondiendo 200 y queda una ruta sin uso.
- **`assets.not_found_handling = "404-page"`**: Workers Static Assets busca `404.html` por
  directorio de la ruta solicitada; no resuelve rutas profundas arbitrarias sin un archivo
  por prefijo y profundidad.
- **Middleware que reescriba la 404 según locale**: no intercepta la 404 prerenderizada que
  el adapter sirve desde `ASSETS`.
- **Entrypoint propio con `prerenderedErrorPageFetch` por locale**: infraestructura nueva
  para lo que resuelve una línea de frontmatter.

## Estado

**Accepted** — 2026-10-02. Extiende [[0002-i18n-routing-pages-lang-folder]] sin
supersederlo.
