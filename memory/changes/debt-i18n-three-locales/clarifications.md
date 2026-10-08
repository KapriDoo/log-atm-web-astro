---
type: clarifications
change_name: "debt-i18n-three-locales"
created: "2026-10-08"
updated: "2026-10-08"
---

# Clarificaciones: debt-i18n-three-locales

## Iteración 1 — Respuestas (2026-10-08)

Decisión del usuario: **[R] Refinar**, con la lectura del orquestador y la del consultor (`bigger-consultor`) alineadas. El approach de la v1 se mantiene: `dir="ltr"` literal, `common.breadcrumbHome` y la exclusión de `payload.preference = "Email"`. La v2 incorpora como **criterios de cierre** explícitos, para que lleguen a `sdd-spec` (que solo lee `proposal.md`):

1. **Línea base medida** en `main@1c70406` antes de tocar código. Las cifras del brief (21 HTML, 7 rutas) vienen de la auditoría de julio y están desactualizadas; la realidad actual es 6 rutas prerenderizadas por idioma (18 HTML) más la 404 bajo demanda. Los AC se fijan contra la medición, no contra el brief.
2. **Diff de `dist/client` contra la línea base**: solo cambia el `name` del `BreadcrumbList` en `/en` y `/pt` (Home / Início). Retirar los respaldos de `CTASection`/`WhyVideoSection` no altera el HTML, solo el JS de cliente; si el bundle de esos scripts cambia, debe ser únicamente por esa eliminación. Mismo sitemap y mismo `hreflang`.
3. `npm run a11y`, `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links` y `npm run measure:images` en **exit 0**, con la guarda de prerender (ADR-0012) en verde.
4. **Prueba de SSOT** en una copia aislada, sin commit: agregar un locale ficticio en `src/i18n/config.ts` se refleja en el routing, el sitemap y `validate-i18n` sin tocar otro archivo.
5. Los deltas referencian `copy-single-source` (PR #40) además de las specs de PR #34 y ADR-0007; la cadena de supersedes rota por la absorción se declara en ambos extremos.

Nota para la implementación: `src/i18n/config.ts` sigue sin imports pesados ni de assets, porque ahora lo cargan el config de Astro y `validate-i18n` (vía `tsx`). Mismo criterio que `src/lib/site.ts`.

## Decisión de pipeline — diferencia CSS de las reglas RTL (2026-10-08)

Origen: riesgo levantado por `sdd-tasks` (Tarea 6). El scope aprobado incluye retirar las reglas `[dir="rtl"]`/`.is-rtl` del drawer de `Navbar.astro`, lo que puede cambiar el CSS del HTML (inline o nombre con hash del bundle), diferencia no listada en el criterio de cierre 2. Resuelta por el orquestador sin volver a spec, con acuerdo del consultor (`bigger-consultor`), como diferencia intencional documentada en verify y en el PR. Condiciones para `sdd-verify`:

- Se admite solo si la diferencia del CSS construido (inline o bundle) consiste únicamente en la eliminación de las reglas `[dir="rtl"]`/`.is-rtl` del drawer: el CSS normalizado de la base, sin esas reglas, es idéntico al nuevo. Si solo cambia el nombre con hash referenciado en el HTML, se acepta como consecuencia de lo mismo.
- Cualquier otra diferencia de CSS sigue bloqueando el cierre.
- El PR declara la lista cerrada de diferencias admitidas: `BreadcrumbList` (en/pt), script de cliente de `CTASection`/`WhyVideoSection` y reglas RTL del drawer.
