---
type: judgment
judge: 1
change_name: "rescue-multi-language-support"
created: "2026-05-12"
verdict: BLOCK
tags: [judgment]
---

# Juez 1 — Veredicto

## Resumen ejecutivo

Build, paridad de claves (613×6), validador bloqueante, sitemap, RTL drawer con propiedades lógicas, a11y del Navbar (inert, focus-trap, reduced-motion) y migración de microcopy a `es.json` están correctos. Sin embargo, las páginas no-default (`/en/servicios/`, `/ar/contacto/`, etc., 40 de 48 URLs) emiten un `<link rel="canonical">` y `<meta property="og:url">` que apuntan a la versión española sin prefijo. Esto desindexaría las traducciones en Google. Es un BLOQUEANTE.

## Hallazgos

### Críticos (BLOCK)

- **Canonical/og:url roto en subpáginas no-default**
  - Archivo: `src/layouts/BaseLayout.astro:34`, evidencia en `dist/ar/servicios/index.html`, `dist/ar/contacto/index.html`, `dist/en/servicios/index.html`, etc.
  - Síntoma: `<link rel="canonical" href="https://logatm.com/servicios">` en `/ar/servicios/` (debería ser `/ar/servicios/`). `og:url` idéntico.
  - Curioso: la raíz sí funciona (`/ar/` → canonical `/ar/`); falla en subpáginas. El `<html lang>`/`dir`/hreflang/title sí ven el locale correcto. La inconsistencia entre `Astro.url.pathname` "visto" por `getLangFromUrl` (correcto) vs el usado para construir el canonical (incorrecto en subpáginas) sugiere que el patrón de "delegación por import desde `[lang]/foo.astro`" no propaga la URL de salida de forma consistente cuando hay sub-rutas.
  - Impacto SEO: Google interpreta `/ar/servicios/` como duplicado canónico de `/servicios/` y la desindexará. Anula el objetivo entero del cambio para SEO multilingüe.
  - Mitigación sugerida: pasar `canonical` explícito como prop desde cada `[lang]/*.astro` (`<Page canonical={`/${lang}${path}/`} />`) o reemplazar la delegación por import por copia de plantilla por idioma. Verificar también `og:url`.

- **Hreflang sin trailing slash**
  - Evidencia: `dist/en/servicios/index.html` `<link rel="alternate" hreflang="en-US" href="https://logatm.com/en/servicios">` vs canonical/sitemap que usan `https://logatm.com/en/servicios/`.
  - Astro sirve `/en/servicios/` con trailing slash; el hreflang debería coincidir. Google trata `/en/servicios` y `/en/servicios/` como URLs distintas para hreflang.
  - Fix: en `getAlternateLinks` (utils.ts L150-165) asegurar trailing slash en rutas no-raíz. `buildLocaleUrl` no lo añade hoy.

### Importantes (APPROVE_WITH_CONDITIONS)

- **Traducciones provisionales (`[en]` … `[pt]`) visibles en HTML público**: aceptable por proposal, pero hay que confirmar feature flag o `noindex` temporal antes de publicar. Sin ello, los crawlers indexan `[en] Logística Aérea y Marítima` como title de la versión inglesa.
- **`@astrojs/check` no instalado**: el `verify-report.md` lo reconoce. Bajo riesgo, recomendable agregar a CI antes de cerrar.

### Menores (informativos)

- `LanguageSelector` dropdown desktop usa `:focus-within` + click handler. Funcional, pero no se verificó cierre con `Esc` ni `aria-expanded` actualizado dinámicamente (no auditado).
- 404 incluida en `getStaticPaths` de `[lang]/404.astro` pero excluida del sitemap; esperado.

## Veredicto

**BLOCK** — El canonical erróneo en 40/48 URLs no-default es un fallo SEO de severidad alta que invalida el propósito de habilitar el multi-idioma para indexación. La paridad estructural, el build, la a11y y el RTL están bien resueltos, pero el head SEO de las páginas no-default está objetivamente roto. Una vez corregido (canonical/og:url incluyen prefijo de locale, hreflang con trailing slash), el cambio queda listo.

## Lo que SÍ está bien hecho

- Validador i18n bloqueante con reporte explícito (probado induciendo clave extra).
- `tList`/`tObj` con fallback al master ES — robusto contra arrays/objetos faltantes.
- Drawer móvil: `inset-inline-*`, `--drawer-offset` invertido en `[dir="rtl"]`, focus-trap, `inert`, `prefers-reduced-motion`, `data-label-open/close` para a11y dinámica.
- 613 keys exactas por locale; namespaces por área de negocio.
- ADRs 0002 y 0003 documentan decisiones de routing y validación.
- `es.json` refleja microcopy actual de main (verificado en cotizar: "Respuesta < 24h", "Paso 01 · Modalidad", "¿De dónde a dónde?", "Selecciona origen..." todos presentes).
- Cero strings hardcoded sobrevivientes en componentes/pages/inline JS.
