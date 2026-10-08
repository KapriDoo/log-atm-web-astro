---
type: proposal
change_name: "debt-i18n-three-locales"
domain: "debt"
status: approved
iteration: 2
effort: M
risks:
  - descripcion: "Las cifras del input (21 HTML, 7 rutas por idioma, 18 URLs de sitemap) vienen de la auditoría de julio y no describen el árbol actual: 6 rutas prerenderizadas por idioma (18 HTML) más la 404 bajo demanda (ADR-0007)"
    probabilidad: Media
    mitigacion: "Medir la línea base con un build de main@1c70406 antes de tocar código y fijar los AC de paridad contra esa medición, no contra las cifras del input"
  - descripcion: "Absorber los requisitos de i18n-translations-build-validation e i18n-ui-selector-navbar en deltas de otras capabilities rompe la cadena 1:1 de supersedes/superseded_by"
    probabilidad: Media
    mitigacion: "sdd-spec declara superseded_by de cada spec absorbida hacia el delta que la absorbe y lo registra en el cuerpo del delta; se valida que la spec vigente de cada cadena tenga superseded_by null y status distinto de cancelled"
  - descripcion: "Retirar los respaldos de CTASection y WhyVideoSection cambia el script de cliente y, con él, el HTML de las páginas que lo incluyen (script inline o nombre con hash del bundle), lo que choca con un criterio de paridad que solo admita el BreadcrumbList"
    probabilidad: Media
    mitigacion: "El criterio de diff admite de forma explícita ese cambio de script, siempre que su único contenido sea la eliminación de los respaldos; cualquier otra diferencia bloquea el cierre"
  - descripcion: "astro.config.mjs importando src/i18n/config.ts falla en el build de Cloudflare Workers Builds"
    probabilidad: Baja
    mitigacion: "Mismo patrón que src/lib/site.ts (PR #40); config.ts se mantiene sin imports pesados ni de assets; scripts/check-i18n-links.ts ya importa el módulo vía tsx"
  - descripcion: "Diferencias no intencionales en el HTML generado al retirar dir dinámico y la clase is-rtl"
    probabilidad: Baja
    mitigacion: "Diff completo de dist/client y sitemap contra la línea base, con la lista cerrada de diferencias admitidas de los criterios de cierre"
created: "2026-10-08"
updated: "2026-10-08"
tags: [proposal]
---

# Propuesta: debt-i18n-three-locales

## Intent

El sitio opera con 3 idiomas (es, en, pt) desde `551e26f`, pero el código conserva infraestructura RTL muerta, la lista de locales se repite en tres archivos, 7 specs i18n describen 6 idiomas y ADR-0002/0003 contienen datos obsoletos. El cambio alinea código, specs y ADRs con la realidad de 3 locales, deja `src/i18n/config.ts` como fuente única de locales y cierra dos residuales de texto no localizado, sin cambio visible para el usuario.

## Scope

**Incluye:**
- Código RTL muerto: `RTL_LOCALES` (`config.ts`), `isRTL` y su re-export (`utils.ts`), `dir` dinámico (`BaseLayout.astro`), clase `is-rtl` y reglas `[dir="rtl"]`/`.is-rtl` del drawer (`Navbar.astro`). Las propiedades lógicas CSS se conservan.
- SSOT de locales: `astro.config.mjs` (routing `i18n` y `sitemap`) toma `LOCALES`, `DEFAULT_LOCALE` y `SITEMAP_LOCALES` de `src/i18n/config.ts`; `scripts/validate-i18n.ts` toma `LOCALES` y el master de ahí; `NON_DEFAULT_LOCALES` se deriva de `LOCALES` dentro del mismo módulo. `config.ts` sigue sin imports pesados ni de assets.
- `BreadcrumbList` del JSON-LD: `name` desde la clave existente `common.breadcrumbHome` (Inicio / Home / Início).
- Scripts de cliente de `CTASection.astro` y `WhyVideoSection.astro`: retirar los respaldos en español (`dataset.… ?? "…"`); los `data-*` ya se renderizan desde el i18n.
- Specs: 4 deltas MODIFY (`i18n-core-translation-helpers`, `i18n-routing-locale-prefixes`, `i18n-seo-hreflang`, `i18n-translations-json-structure`); `build-validation` y `ui-selector` absorbidas con `superseded_by` declarado en ambos extremos; `i18n-rtl-support-arabic` en `cancelled` citando `551e26f`. Los deltas de routing y hreflang excluyen la 404 y referencian las specs de PR #34, `copy-single-source` (PR #40) y ADR-0007.
- ADR-0002 (3 locales, páginas reales, referencia a ADR-0007) y ADR-0003 (`prebuild` nunca existió; el hook `astro:build:start` es el mecanismo único) con nota de actualización fechada.

**Excluye explícitamente:**
- Agregar idiomas; semántica ARIA del selector (brief 05); el literal `payload.preference = "Email"` de `CTASection` (valor de payload, no texto visible); las specs `completed` de PR #34 y `copy-single-source` salvo referencias.

## Approach Propuesto

Se mide primero la línea base sobre `main@1c70406` (lista de HTML de `dist/client`, `sitemap-*.xml` y `hreflang`). Luego se retira el RTL: `<html>` conserva `dir="ltr"` literal para que el HTML quede idéntico, y la clase `is-rtl` desaparece sin efecto en la salida porque hoy siempre evalúa a falso. `astro.config.mjs` importa `./src/i18n/config.ts` con el patrón ya validado de `site.ts`, y `validate-i18n.ts` lo importa como ya lo hace `check-i18n-links.ts`. Los deltas de specs se redactan contra el código resultante, y las notas de ADR se anexan sin reescribir la decisión.

## Criterios de cierre

1. **Línea base medida** en `main@1c70406` antes de tocar código; los AC de paridad se fijan contra esa medición (hoy: 6 rutas prerenderizadas por idioma, 18 HTML, más la 404 bajo demanda), no contra las cifras del input.
2. **Diff de `dist/client` contra la línea base** con lista cerrada de diferencias admitidas: el `name` del `BreadcrumbList` en `/en` y `/pt` (Home / Início), y el script de cliente de `CTASection`/`WhyVideoSection` (contenido inline o nombre con hash del bundle) cuyo único cambio es la eliminación de los respaldos. Sitemap y `hreflang` idénticos.
3. `npm run a11y`, `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links` y `npm run measure:images` en exit 0, con la guarda de prerender (ADR-0012) en verde.
4. **Prueba de SSOT** en una copia aislada bajo el directorio de temporales, sin commit: agregar un locale ficticio en `src/i18n/config.ts` se refleja en el routing, el sitemap y `validate-i18n` sin tocar otro archivo.
5. Los deltas referencian `copy-single-source`, las specs de PR #34 y ADR-0007; la cadena de supersesión rota por la absorción se declara en ambos extremos.

## Esfuerzo Estimado

El código es acotado (~8 archivos, cambios de pocas líneas, sin lógica nueva). El peso está en el corpus (4 deltas, 3 specs con estado actualizado, 2 notas de ADR) y en la verificación: línea base, diff de `dist/client` y sitemap, cinco comandos en verde y la prueba de SSOT aislada.

## Riesgos

- Línea base: los AC de paridad salen de la medición del build previo, no del input.
- Cadena de supersesión: la absorción se declara explícita en ambos extremos.
- Script de cliente en el diff: el criterio 2 admite ese cambio y solo ese; sin esa admisión el criterio sería incumplible por construcción.
- Carga del config en Workers Builds: patrón ya probado; el primer build tras el merge lo confirma.
- HTML no intencional: diff completo contra la lista cerrada del criterio 2.

## Trade-offs

- **A favor**: elimina ~15 líneas de código muerto (YAGNI); un solo lugar para los locales (SSOT); el corpus vuelve a describir el sistema real (7 de 18 specs desactualizadas); los criterios de cierre llegan a `sdd-spec` como AC verificables.
- **En contra**: conservar `dir="ltr"` literal es redundante con el default del navegador; se elige por paridad byte a byte del HTML. Absorber `build-validation` y `ui-selector` reduce el número de specs pero mezcla requisitos de capabilities distintas en un mismo delta; la alternativa (6 deltas, uno por spec vigente) sería más fiel a las capabilities a costa de más artefactos.
