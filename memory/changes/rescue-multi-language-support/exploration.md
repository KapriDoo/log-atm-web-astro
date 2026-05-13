---
type: exploration
change_name: "rescue-multi-language-support"
created: "2026-05-12"
---

# Exploración: rescue-multi-language-support

## Estado Actual

**Main (HEAD `00f1e9c`)** tiene 9 rutas en `src/pages/` con UI 100% en español hardcodeado y SIN ninguna infraestructura i18n. `astro.config.mjs` no declara `i18n`. Las mejoras post-feature aplicadas en main (heading order, landmark nesting, UX writing pass, handoff parity de home) han modificado los componentes compartidos (especialmente `Navbar.astro`) respecto al estado en que se construyó el feature antiguo.

**Feature antiguo (`feature/multi-language-support` @ `76664bf`)** contiene una implementación i18n completa para 6 locales (es/en/zh/hi/ar/pt) con:
- Routing `src/pages/[lang]/` + páginas raíz en español
- `src/i18n/` (config.ts, utils.ts, types.ts, translations/*.json)
- `LanguageSelector.astro` (desktop dropdown + mobile list)
- Build-hook `scripts/validate-i18n.ts` para paridad de claves
- Soporte RTL para árabe (dir="rtl" + logical CSS properties)
- SEO hreflang via `getAlternateLinks()`

`[fuente: código main `.../log-atm-web-astro/src/`]`
`[fuente: código preview-i18n worktree]`
`[fuente: spec [[i18n-routing-locale-prefixes]], [[i18n-translations-json-structure]], [[i18n-ui-selector-navbar]], [[i18n-rtl-support-arabic]], [[i18n-seo-hreflang]], [[i18n-typography-system-fonts]]]`
`[fuente: ADR-0002 i18n-routing-pages-lang-folder, ADR-0003 i18n-key-validation-build-hook]`

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| `astro.config.mjs` | Config Astro | Añadir bloque `i18n` (defaultLocale, locales) + hook validador + sitemap multilingüe |
| `src/pages/index.astro` | Home español | Permanece como default (es). Extraer strings a translations |
| `src/pages/{servicios,industrias,nosotros,contacto,cotizar,404}.astro` | Páginas español | Idem — default locale |
| `src/pages/servicios/carga-{aerea,maritima}.astro` | Detalle servicios | Idem |
| `src/pages/[lang]/*.astro` | NUEVAS rutas no-default | Crear con `getStaticPaths()` → en/zh/hi/ar/pt |
| `src/components/ui/Navbar.astro` | Navegación + drawer móvil | **Conflicto**: feature usa `<header role="banner">`, main usa `<nav id="navbar">`. Mantener estructura main (a11y mejorada) e integrar `LanguageSelector` + `t()` calls |
| `src/components/Footer.astro` | Footer | Reemplazar strings hardcoded por `t()` |
| `src/components/home/*.astro` (Hero, Services, Industries, Why, CTA, Stats) | Secciones home | Reemplazar strings por `t()` |
| `src/layouts/BaseLayout.astro` (o equivalente) | Layout raíz | Inyectar `lang`, `dir`, `<link rel="alternate" hreflang>` |
| `src/i18n/` (nuevo) | Helpers + types | Portar de feature antiguo: `config.ts`, `utils.ts`, `types.ts`, `translations/*.json` |
| `src/components/ui/LanguageSelector.astro` (nuevo) | Selector idioma | Portar de feature antiguo; integrar en Navbar main |
| `scripts/validate-i18n.ts` (nuevo) | Build-hook validador | Portar — falla build si JSONs divergen |
| `package.json` | Scripts | Añadir `validate-i18n` + posible `prebuild` |

## Approaches Posibles

### Approach A: Port directo de archivos i18n + integración manual en componentes main

1. Copiar `src/i18n/` completo del feature antiguo (config, utils, types, translations)
2. Copiar `scripts/validate-i18n.ts` y hook en `astro.config.mjs`
3. Crear `src/pages/[lang]/` clonando cada página raíz con wrapper `getStaticPaths()`
4. Reescribir Navbar/Footer/secciones de main para usar `t()` (sin copiar el HTML del feature — preservar estructura main)
5. Refrescar `translations/es.json` con el microcopy actualizado por la pasada UX writing de main
6. Para páginas que el feature no cubrió (`cotizar.astro`, `nosotros.astro` rediseñadas, sub-rutas de servicios): añadir keys nuevas

- **Pros**: Reutiliza al máximo el trabajo previo. Preserva a11y/UX writing de main. Control fino sobre cada string portado.
- **Contras**: Tarea repetitiva por cada componente. Riesgo de strings olvidados (validator lo detecta).
- **Esfuerzo**: **L**

### Approach B: Merge mecánico de la rama feature/multi-language-support + resolución de conflictos

1. `git merge origin/feature/multi-language-support` o `git cherry-pick 76664bf`
2. Resolver conflictos archivo por archivo (Navbar, astro.config, package.json son conflictos seguros)
3. Re-aplicar mejoras a11y/UX de main sobre el resultado merge

- **Pros**: Conserva historia de commits del feature.
- **Contras**: Conflicto en Navbar requiere reescritura completa (los dos archivos divergen significativamente). Riesgo alto de perder mejoras de main en a11y/UX si la resolución se hace mal. Sub-páginas `servicios/carga-*` no están en feature antiguo.
- **Esfuerzo**: **L** (con riesgo de regresiones en a11y).

### Approach C: Astro i18n nativo (v6) + reuso parcial de translations

1. Usar la integración `i18n` nativa de Astro 6 (`astro.config.mjs` → `i18n: { defaultLocale, locales, routing }`) en vez del routing manual `[lang]/`
2. Mantener `translations/*.json` del feature como datos
3. Implementar `t()` simple basado en `Astro.currentLocale`
4. Skip build-hook si Astro i18n ya valida estructura

- **Pros**: Menos código custom. Aprovecha features modernas (Astro 6 mejoró i18n).
- **Contras**: Diverge del ADR-0002 (routing manual fue decisión explícita). El feature antiguo evitó Astro i18n por razones documentadas en el ADR (RTL handling, control granular).
- **Esfuerzo**: **M** pero requiere re-decidir ADR-0002.

## Recomendación

**Approach recomendado**: **A — Port directo + integración manual**

**Justificación**:
- Preserva sin pérdida las mejoras de a11y/UX writing aplicadas en main (PRs #11, #12) — son contractuales con el handoff de diseño.
- Respeta ADR-0002 y ADR-0003 ya documentadas (routing `[lang]/` + build-hook custom) sin reabrir decisiones.
- El delta de páginas es pequeño (las 9 rutas de main vs las del feature) y conocido — el coste real está en re-mapear `t()` calls dentro de componentes main, que es repetitivo pero predecible.
- El build-hook `validate-i18n.ts` actúa como red de seguridad: si alguna key queda huérfana o falta en un locale, el build falla local antes de PR.

## Riesgos Identificados

1. **Microcopy desactualizado en `es.json`**: la pasada UX writing (b255a35) tocó aria-labels, CTAs y headings. Mitigación: regenerar `translations/es.json` extrayendo strings desde el código main actual, no desde el feature antiguo. Las otras 5 traducciones se re-derivan desde el nuevo `es.json`.

2. **Conflicto estructural en `Navbar.astro`**: feature trae `<header role="banner">`, main usa `<nav id="navbar">` con drawer mejorado (inert, focus-trap, prefers-reduced-motion). Mitigación: NO copiar Navbar del feature; solo importar `LanguageSelector` y reemplazar strings.

3. **RTL drawer direction**: feature voltea `translateX` para árabe; el drawer main aún no es RTL-aware. Mitigación: añadir lógica condicional `isRTL(lang)` en el drawer móvil de main, validando con spec `i18n-rtl-support-arabic`.

4. **Sub-rutas `servicios/carga-*` no contempladas en feature**: el feature solo cubre páginas raíz. Mitigación: extender el patrón `[lang]/servicios/carga-{aerea,maritima}.astro` y añadir keys de traducción correspondientes.

5. **`cotizar.astro` con formulario**: textos de form labels, placeholders, mensajes de error/éxito. Las traducciones del feature no los cubren porque la página no existía. Mitigación: añadir scope `cotizar.*` en JSONs nuevos.

6. **SEO hreflang en páginas nuevas**: `getAlternateLinks()` del feature genera links para páginas conocidas; necesita actualización para incluir `cotizar`, `nosotros` y sub-rutas de servicios.

7. **Validación de paridad bloqueante en CI**: si el build hook se activa antes de completar todos los JSONs, romperá deploy. Mitigación: poblar los 6 JSONs en commits secuenciales con paridad estructural desde el inicio (placeholders aceptados si el validator lo permite, sino traducciones provisionales marcadas).

8. **`Astro 6` cambios de API**: el feature antiguo se construyó contra Astro 6 también, pero confirmar que `getStaticPaths()` + `Astro.params.lang` siguen funcionando como en commit `76664bf`.
