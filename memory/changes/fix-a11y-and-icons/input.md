---
type: external-input
domain: fix
change_name: fix-a11y-and-icons
fast_path: apply-only
priority: P2
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 05 — Accesibilidad del selector de idioma, reduced-motion del wizard y apple-touch-icon

**Despacho:** `sdd new fix-a11y-and-icons --domain fix --path apply-only --integration-target main --input-file .sdd/briefs/auditoria-2026-10/05-fix-a11y-and-icons.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: validación de auditoría (hallazgos N3, N4, B3). Requisito del proyecto: WCAG AA y `prefers-reduced-motion` obligatorio en toda animación.

## Problema 1 — Patrón ARIA incorrecto en el selector de idioma (Media, WCAG 4.1.2)

- `src/components/**/LanguageSelector.astro` envuelve links `<a>` en `role="listbox"`/`role="option"` (con `aria-selected`, `:64`) sin navegación por flechas. Un lector de pantalla anuncia un listbox que no se comporta como tal.
- Lo que sí está bien y debe conservarse: `aria-current` en el idioma activo (`:34`), `Escape` cierra y devuelve el foco (`:275-279`), reduced-motion respetado.
- El comentario sobre `:focus-within` está obsoleto.
- Nota: el focus-trap y `inert` que menciona la auditoría pertenecen al drawer del Navbar, no al selector.
- La spec `memory/specs/i18n-ui-selector/i18n-ui-selector-navbar.md` **no** exige el rol listbox (verificado), así que el cambio no la contradice.

## Problema 2 — Scroll suave sin guard de reduced-motion (Baja)

- `src/scripts/wizard.ts:424`: `scrollIntoView({ behavior: 'smooth' })` sin consultar `prefers-reduced-motion`; el JS pisa el `scroll-behavior` de CSS.

## Problema 3 — `/apple-touch-icon.png` referenciado y ausente (Baja)

- `src/layouts/BaseLayout.astro:178` lo declara; no existe en `public/` ni en `dist/client/` (404) y nunca existió en el historial. `scripts/generate-favicons.mjs` no lo genera.

## Decisiones tomadas

- **Selector:** patrón disclosure — botón con `aria-expanded` + lista simple de links con `aria-current="page"` en el activo; quitar `role="listbox"`/`role="option"`/`aria-selected`. Mantener `Escape` y retorno de foco.
- **Wizard:** `behavior: prefersReducedMotion ? 'auto' : 'smooth'`.
- **Icono:** generar `apple-touch-icon.png` 180×180 desde el mismo origen que el resto de favicons, dentro de `scripts/generate-favicons.mjs`, y versionarlo en `public/`. (No se toca `favicon.ico`: es un PNG renombrado, impacto práctico nulo — decisión YAGNI.)

## Criterios de aceptación

- [ ] El selector de idioma no usa roles `listbox`/`option`; el activo lleva `aria-current="page"`; se opera completo con teclado (Tab, Enter, Escape con retorno de foco al botón).
- [ ] axe (o Lighthouse a11y) sin violaciones en el selector, en desktop y en el drawer móvil, en `es`, `en` y `pt`.
- [ ] Con `prefers-reduced-motion: reduce`, el cambio de paso del wizard hace scroll instantáneo.
- [ ] `GET /apple-touch-icon.png` → 200, PNG 180×180, generado por `npm run favicons`.

## Tareas sugeridas (para `tasks.md`)

1. Refactor de semántica ARIA en `LanguageSelector.astro` y limpieza del comentario obsoleto.
2. Guard de reduced-motion en `wizard.ts:424`.
3. Agregar la salida 180×180 a `generate-favicons.mjs`, ejecutar el script y versionar el PNG.
4. Verificación con axe (el proyecto ya tiene `scripts/axe-audit.mjs`, jsdom + axe-core) y con teclado.
