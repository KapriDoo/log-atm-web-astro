---
type: proposal
change_name: "rescue-multi-language-support"
domain: "feature"
status: approved
iteration: 1
created: "2026-05-12"
updated: "2026-05-12"
tags: [proposal]
---

# Propuesta: rescue-multi-language-support

## Intent

Rescatar la implementación i18n del feature antiguo (`feature/multi-language-support` @ `76664bf`: 6 locales es/en/zh/hi/ar/pt, routing `pages/[lang]`, build-hook de validación, RTL para árabe) y re-aplicarla sobre `main` actual, que ha evolucionado con páginas nuevas y dos pasadas de a11y/UX writing (PRs #11 y #12) que el feature original desconoce. El objetivo es entregar el sitio multilingüe sin regresionar la accesibilidad ni el microcopy ya consolidados en main.

## Scope

**Incluye:**
- Portar `src/i18n/` (`config.ts`, `utils.ts`, `types.ts`, `translations/{es,en,zh,hi,ar,pt}.json`) desde el feature antiguo.
- Portar `scripts/validate-i18n.ts` y registrar el hook `astro:build:start` en `astro.config.mjs`.
- Añadir bloque `i18n` a `astro.config.mjs` (defaultLocale `es`, locales `[es,en,zh,hi,ar,pt]`) y sitemap multilingüe.
- Portar `src/components/ui/LanguageSelector.astro` e integrarlo en el `Navbar.astro` actual de main (sin sustituir el markup actual de Navbar).
- Crear `src/pages/[lang]/` con `getStaticPaths()` para todas las rutas actuales: `index`, `servicios`, `industrias`, `nosotros`, `contacto`, `cotizar`, `404`, `servicios/carga-aerea`, `servicios/carga-maritima`.
- Reemplazar strings hardcoded por llamadas `t()` en: `Navbar`, `Footer`, secciones de home (`Hero`, `Services`, `Industries`, `Why`, `CTA`, `Stats`) y cada página afectada.
- Regenerar `translations/es.json` extrayendo el microcopy actual de main (preserva la pasada UX writing de PR #12).
- Derivar `en/zh/hi/ar/pt.json` desde el nuevo `es.json` con paridad estructural de claves (traducciones provisionales aceptables; el validator solo exige paridad).
- Inyectar `lang`, `dir="rtl"` (si árabe) y `<link rel="alternate" hreflang>` en `BaseLayout`.
- Soporte RTL en el drawer móvil del Navbar actual (flip condicional con CSS logical properties / `isRTL(lang)`).
- Actualizar `package.json` para añadir el script `validate-i18n` (y `prebuild` si corresponde).

**Excluye explícitamente:**
- Re-decidir ADR-0002 (routing `[lang]/`) o ADR-0003 (build-hook custom) — siguen vigentes.
- Rediseñar el `LanguageSelector` (se porta tal cual, solo se adapta su integración a la nueva Navbar).
- Traducción profesional/QA de los 5 locales no-default — alcance es paridad estructural + traducciones provisionales que un equipo de contenido puede refinar después en PRs separados.
- Detección automática de idioma por `Accept-Language` o cookies — out-of-scope; cambio de idioma siempre explícito vía selector.
- Cambios en accesibilidad/UX writing más allá de lo necesario para internacionalizar.
- Integración con CMS externo para textos — los JSON estáticos quedan como única fuente.

## Approach Propuesto

**Approach A — Port directo + integración manual en componentes main.** Se copia la infraestructura i18n del feature antiguo (helpers, translations, validator, selector), pero NO se copia el Navbar/Footer/secciones del feature: en su lugar, se modifican los componentes actuales de main para usar `t()`, preservando intacto el markup que ya cumple las mejoras de a11y (heading order, landmark nesting, drawer con inert/focus-trap, prefers-reduced-motion) y el microcopy refinado en PR #12. El nuevo `translations/es.json` se construye extrayendo strings desde el código main actual, no desde el `es.json` antiguo; los otros 5 locales se derivan de este nuevo master. El build-hook `validate-i18n` actúa como red de seguridad bloqueante para mantener paridad de claves antes de cada build.

## Esfuerzo Estimado

**L** — La infraestructura central (i18n core, validator, selector) es port mecánico (~M), pero el reemplazo de strings por `t()` en 9 páginas + 6 componentes compartidos + secciones de home, más la creación de `[lang]/` con `getStaticPaths()` por cada ruta, más la regeneración del `es.json` desde el código actual y la propagación a 5 locales más, suma volumen importante. El soporte RTL en el drawer móvil requiere lógica CSS condicional adicional. La validación end-to-end (build local, navegación entre locales, RTL, sitemap, hreflang) cierra la estimación en L.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Regresión de a11y al re-tocar Navbar (drawer, focus-trap, aria-* refinados en PR #11) | Media | NO copiar Navbar del feature; solo añadir LanguageSelector + reemplazar strings por `t()`. Verificar Lighthouse a11y ≥95 en sdd-verify. |
| Microcopy del feature antiguo conflictúa con el refinado por UX writing (PR #12) | Alta | Regenerar `es.json` extrayendo strings desde el código main actual, no desde el `es.json` antiguo. El feature `es.json` queda solo como referencia de keys. |
| Paridad de claves bloquea build si algún locale queda incompleto | Media | Poblar los 6 JSONs en el mismo commit con paridad estructural completa desde el inicio; traducciones provisionales aceptables. |
| RTL en drawer móvil rompe la animación o el inert/focus-trap actuales | Media | Aislar lógica RTL en clase CSS condicional + variable `dir`; testear drawer en `lang=ar` con teclado y screen reader. |
| `getStaticPaths()` + sub-rutas (`servicios/carga-*`) generan URLs inválidas o duplicadas | Baja | Estructura `pages/[lang]/servicios/carga-aerea.astro` validada con `astro build` antes del PR. Sitemap revisado contra `<url>` esperadas. |
| Páginas no cubiertas por el feature antiguo (`cotizar.astro`, sub-rutas servicios) carecen de keys | Media | Inventariar strings antes de codificar; añadir scope `cotizar.*` y `servicios.carga.{aerea,maritima}.*` desde el inicio. |
| Build CI rompe por hook validador antes de tener todos los JSONs listos | Baja | Habilitar el hook solo cuando los 6 JSONs ya tienen paridad estructural completa (último paso de la implementación). |

## Trade-offs

- **A favor**:
  - Aprovecha la inversión previa en ADRs y specs sin reabrir decisiones de diseño.
  - Preserva intactas las mejoras de a11y/UX writing (PRs #11, #12) — no hay merge mecánico que pueda perderlas.
  - El build-hook bloquea regresiones de paridad antes de PR (fail-fast local).
  - Routing `[lang]/` explícito permite SEO/hreflang predecible.

- **En contra**:
  - Mayor volumen de cambios atómicos (reemplazo de strings por componente) → diff grande, review costoso.
  - Traducciones provisionales en 5 locales no son producción-ready; un PR de contenido separado será necesario.
  - Duplicación temporal: cada ruta existe como página raíz (es) + `[lang]/`. Cualquier nueva página futura debe recordar replicar ambas.
  - Mantenimiento añadido del build-hook custom (vs apoyarse 100% en Astro i18n nativo).
