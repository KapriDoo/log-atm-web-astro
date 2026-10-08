---
type: external-input
domain: debt
change_name: debt-i18n-three-locales
fast_path: spec-first
priority: P3
depends_on: [fix-i18n-links-and-404, fix-a11y-and-icons, debt-copy-tokens-ssot]
source: validacion-auditoria-2026-10-02
---
# Brief 08 — i18n: consolidar la realidad de 3 idiomas (código muerto RTL, SSOT de locales, specs y ADRs)

**Despacho:** `sdd new debt-i18n-three-locales --domain debt --path spec-first --integration-target main --input-file .sdd/briefs/auditoria-2026-10/08-debt-i18n-three-locales.md`

> Rutas `src/...`, `scripts/...` relativas a `log-atm-web-astro/`; `memory/...` relativa a la raíz del repo. Origen: validación de auditoría (D5, D12 parcial, §3 grupo i18n, ADR-0002, ADR-0003). **Despachar después de 03, 05 y 07** (tocan `BaseLayout`, `Navbar`, el selector y la 404, que estas specs describen).

> **Revalidado contra `main` @ `1c70406` (2026-10-08)**, tras los PR #34–#40 (ubicar por contenido; las líneas pueden haberse corrido):
> - Sigue presente: `RTL_LOCALES = []` (`src/i18n/config.ts:15`), helper RTL (`src/i18n/utils.ts` ~:159), `dir={dir}` (`BaseLayout.astro` ~:134), `[dir="rtl"] .nav-drawer__panel` (`Navbar.astro` ~:287); `locales: ['es','en','pt']` literal en `astro.config.mjs` (~:120, y bloque `locales` del sitemap ~:135); `BreadcrumbList` con `name: 'Inicio'` (`BaseLayout.astro` ~:120); ADR-0002/0003 sin nota.
> - **Patrón disponible para el SSOT de locales:** desde el PR #40, `astro.config.mjs` importa `./src/lib/site.ts` (Astro 6.3.1 carga el config con import nativo y, si falla, con el runner de Vite, que transpila TS). La lista de locales puede salir de `src/i18n/config.ts` del mismo modo, siempre que ese módulo no arrastre imports pesados.
> - Specs i18n nuevas desde la versión original de este brief (ya `completed`, no tocar salvo referencias): `i18n-internal-links-keep-language`, `i18n-not-found-localized`, `i18n-not-found-navigation-and-seo-signals` (PR #34) y `copy-single-source` (PR #40).
> - Guarda de prerender (ADR-0012, PR #40): un error de render ahora rompe el build; útil al quitar el código RTL.

## Para deuda técnica

- **Estado actual**:
  1. **Decisión vigente no documentada:** el sitio tiene 3 idiomas (`es`, `en`, `pt`) desde `551e26f` (se quitaron `zh`, `hi`, `ar`), 7 rutas por idioma desde `3ae0f66` (se eliminaron los detalles de carga aérea/marítima), 21 HTML en `dist/client` (20 `index.html` + `404.html`), sitemap con 18 URLs y 3 `hreflang` + `x-default` por página.
  2. **7 specs i18n describen 6 idiomas**: `memory/specs/i18n-core/i18n-core-translation-helpers.md`, `i18n-routing/i18n-routing-locale-prefixes.md`, `i18n-rtl-support/i18n-rtl-support-arabic.md`, `i18n-seo-hreflang/i18n-seo-hreflang.md`, `i18n-translations/i18n-translations-json-structure.md`, `i18n-translations/i18n-translations-build-validation.md`, `i18n-ui-selector/i18n-ui-selector-navbar.md`. Cifras obsoletas: 9 rutas, ≥ 54 páginas, 5 hreflang. En `build-validation` y `ui-selector` los AC no dependen del número de idiomas: lo obsoleto es solo el texto de los requisitos. `i18n-rtl-support-arabic` está obsoleta en su propósito.
  3. **Infraestructura RTL muerta (~15 líneas)**: `RTL_LOCALES = []` en `src/i18n/config.ts:15`, helper en `src/i18n/utils.ts:140-142`, `dir` dinámico en `src/layouts/BaseLayout.astro:41,134` (siempre sale `dir="ltr"`), drawer invertible en `src/components/ui/Navbar.astro:27,67,271-278`. Las propiedades lógicas CSS (`padding-block`, `margin-inline`…) **no** son infraestructura RTL: son buena práctica y se conservan.
  4. **Lista de locales repetida**: `src/i18n/config.ts` (fuente), `astro.config.mjs:59,73-77` y `scripts/validate-i18n.ts:20` la repiten a mano.
  5. **ADRs desactualizados**: `memory/adrs/0002-i18n-routing-pages-lang-folder.md` habla de 6 locales y 9 páginas (`:15`, `:26`, `:40`); `memory/adrs/0003-i18n-key-validation-build-hook.md` declara un script `prebuild` (`:27`, `:121`) que nunca existió en `package.json` (`git log -S` vacío): el mecanismo único es el hook `astro:build:start` en `astro.config.mjs:17-33`.
- **Estado deseado**:
  1. Código RTL muerto eliminado (YAGNI); si en el futuro se agrega un idioma RTL, se reintroduce con su propia spec.
  2. La lista de locales vive solo en `src/i18n/config.ts` y la consumen `astro.config.mjs` y `scripts/validate-i18n.ts`.
  3. Specs: un solo cambio "3 locales" con deltas MODIFY para `i18n-core-translation-helpers`, `i18n-routing-locale-prefixes`, `i18n-seo-hreflang` e `i18n-translations-json-structure` (absorben los requisitos textuales de `build-validation` y `ui-selector`); las originales quedan con `superseded_by`. `i18n-rtl-support-arabic` → `status: cancelled` con nota que cite `551e26f`.
  4. ADR-0002 y ADR-0003 con nota de actualización (sin reescribir la decisión): 0002 → 3 locales / 7 páginas y referencia a **ADR-0007** (404 localizada bajo demanda, PR #34, que ya amplía 0002); 0003 → `prebuild` nunca se implementó, el hook es el mecanismo único.
  5. Los deltas de `i18n-seo-hreflang` e `i18n-routing-locale-prefixes` excluyen explícitamente la 404 (`noindex`, sin canonical/hreflang/og:url/BreadcrumbList según ADR-0007) y referencian las specs ADD de PR #34 (`i18n-not-found-localized`, `i18n-not-found-navigation-and-seo-signals`, `i18n-internal-links-keep-language`).
  6. El `BreadcrumbList` del JSON-LD usa el texto "Inicio" fijo en los 3 idiomas: localizarlo desde el i18n.
  7. Los scripts de cliente de `src/components/sections/CTASection.astro` y `WhyVideoSection.astro` conservan textos de respaldo en español (residual del brief 07 / PR #40): pasarlos al i18n o a `data-*` renderizados desde el i18n.
- **Archivos/módulos afectados**: `src/i18n/config.ts`, `src/i18n/utils.ts`, `src/layouts/BaseLayout.astro`, `src/components/ui/Navbar.astro`, `astro.config.mjs`, `scripts/validate-i18n.ts`, las 7 specs i18n, ADR-0002, ADR-0003.
- **Justificación de prioridad**: es la mayor fuente de specs desactualizadas del corpus (7 de 18 en el conteo estricto); sin impacto visible para el usuario, por eso va al final del bloque de código.

## Criterios de aceptación

- [ ] Sin referencias a `RTL_LOCALES` ni lógica de `dir` dinámico/drawer invertible; HTML generado idéntico (sigue `dir="ltr"` donde corresponda o se omite si es el default).
- [ ] Agregar o quitar un locale en `src/i18n/config.ts` se refleja en el routing de Astro y en `validate-i18n` sin tocar otro archivo (prueba local, sin commitear).
- [ ] `npm run build` y `npm run validate-i18n` OK; mismas 21 páginas y mismo sitemap.
- [ ] Las 4 specs delta creadas, las originales con `superseded_by`, `i18n-rtl-support-arabic` en `cancelled`; ninguna spec i18n vigente menciona `zh`, `hi` ni `ar`.
- [ ] ADR-0002 y ADR-0003 con nota de actualización fechada (0002 referencia a ADR-0007).
- [ ] `BreadcrumbList` con el nombre de "Inicio" localizado en es/en/pt (verificable en `dist/client/{en,pt}/**`).

## Fuera de alcance

- Agregar idiomas nuevos.
- Semántica ARIA del selector → brief 05 (este brief solo refleja el resultado en la spec).
