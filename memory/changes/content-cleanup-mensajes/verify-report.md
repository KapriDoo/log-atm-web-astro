# Verify Report: content-cleanup-mensajes

**Fecha**: 2026-07-05
**Veredicto**: ✅ PASS (17/17 specs, iteración 2)

## Iteración 2 — Re-verificación post-corrección

Tras el FAIL de la iteración 1 (`content-nosotros/years-experience-narrative-consistency`, superseded por la spec delta `content-nosotros/nosotros-manifesto-founding-year-consistency`), `sdd-apply` corrigió `nosotros.manifesto.p1Html` en los 3 idiomas. Re-verificación confirma:

1. **Build**: `npm run build` — exit code 0. Validador i18n: `en: OK (536 claves)`, `pt: OK (536 claves)`. Paridad es/en/pt confirmada, sin regresiones.
2. **Corrección del FAIL confirmada** en los 3 idiomas — `p1Html` ya no afirma antigüedad de la empresa, reencuadrado a experiencia del equipo:
   - `es.json:302`: "Somos profesionales con más de 20 años de experiencia en el mundo logístico chileno y aprendimos algo simple..."
   - `en.json:302`: "We are professionals with more than 20 years of experience in the Chilean logistics world, and we learned something simple..."
   - `pt.json:302`: "Somos profissionais com mais de 20 anos de experiência no mundo logístico chileno e aprendemos algo simples..."
   - Ninguna variante de "dos décadas" / "two decades" / "duas décadas" / "más de 20 años operando" (referida a la empresa) encontrada. Coherente con "Nosotros · Desde 2023" del hero.
3. **Barrido de términos prohibidos** (grep sobre `src/`, repetido de la iteración 1): mismos resultados — cero ocurrencias en copy renderizado. Todas las coincidencias residuales de `OEA`, `48h`/`24h`, `98%` siguen confinadas a arrays de `src/lib/constants.ts` sin `import` vivo fuera del propio archivo (re-confirmado: `SERVICE_DETAILS`, `PROCESS_STEPS`, `IND_TAGS_MAP`, `SERVICES_PER_IND`, `STATS` — cero referencias en `.astro`/`.tsx`/`.ts` de páginas o componentes). `Hong Kong`/`Iquique` solo aparecen como opciones de ciudad en `QUOTE_ORIGINS`/`QUOTE_DESTS` del wizard de cotización (`cotizar.astro`, `CTASection.astro` — vivos pero fuera de alcance según `design.md`). Cero `300+`, `Conocer más`, teléfono/email antiguos, `Última milla` (fuera del wizard). Sin cambios respecto a la iteración 1: ningún hallazgo nuevo, ninguna regresión.

**Veredicto final: 17/17 specs PASS.** Ver tabla actualizada más abajo.

## 1. Build

`npm run build` en el worktree del proyecto (`.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro`): **PASS**, exit code 0.

- Validador i18n (`validate-i18n.ts`, ADR-0003) corrió en `astro:build:start`:
  ```
  [log-atm:i18n-validator] [i18n] Validando paridad de claves...
  [i18n] en: OK (536 claves)
  [i18n] pt: OK (536 claves)
  ```
  Paridad exacta es/en/pt confirmada (536 claves cada uno).
- Build completo sin errores, sitemap generado, `dist/` producido.

## 2. Barrido de términos eliminados

Grep sobre `src/` (excluyendo `node_modules`/`dist`) + `README.md` + `docs/`:

| Término | Ocurrencias visibles | Detalle |
|---|---|---|
| OEA | 0 en copy renderizado | 5 en `constants.ts` (fallbacks muertos: `SERVICE_DETAILS`, `PROCESS_STEPS`, `IND_TAGS_MAP`/`SERVICES_PER_IND` — sin imports vivos, JSON master siempre gana) + 1 en `docs/project-brief.md:57` (sección "Certificaciones" del brief, texto de contexto interno del proyecto, no copy del sitio — fuera de alcance) |
| 48h / 24h | 0 en copy renderizado | Ocurrencias solo en `constants.ts` (`SERVICES[0].tag`, `SERVICE_DETAILS`, `PROCESS_STEPS` — dead code, JSON master gana) |
| 300+ / 98% | 0 en industrias/nosotros JSON | `98%` persiste en `constants.ts` `STATS` array (línea 92) — confirmado **dead code**: no hay ningún import de `STATS` en ningún `.astro`/`.tsx` (solo `HERO_STRIP_STATS`, variable distinta, sí vive) |
| Operador Económico Autorizado | 0 visible | 1 en `constants.ts` `SERVICE_DETAILS` (dead code) |
| Negociación de tarifas por contrato | 0 visible | 1 en `constants.ts` `SERVICE_DETAILS` (dead code) |
| KPI dashboard | 0 visible | 1 en `constants.ts` `SERVICE_DETAILS` (dead code) |
| Hong Kong / Iquique | Iquique sigue en `constants.ts` (listas `QUOTE_ORIGINS`/`QUOTE_DESTS`, ciudades del wizard de cotización — no es "la ruta Hong Kong→Iquique") | `LIVE_ROUTES[3]` confirmado actualizado a `{from:'Manzanillo', to:'Valparaíso', mode:'sea'}` |
| Conocer más / common.learnMore | 0 | Clave y texto eliminados |
| Última milla | 0 en industrias | Persiste en `constants.ts` (`PROCESS_STEPS`, `IND_TAGS_MAP`/`SERVICES_PER_IND` dead code) y en `cotizar.extras[3]` (JSON, opción del wizard de cotización) — **fuera de alcance**: el intent solo pide quitarla de "Qué movemos en cada sector" (industrias), no del wizard; design.md lo documenta explícitamente como "no tocar" |
| B2B | 0 | — |
| Desde 2003 | 0 | — |
| Teléfono/email viejos (4216 2739, 42162739, mpazrivera) | 0 | — |

Todas las ocurrencias residuales están en arrays de `constants.ts` confirmados como dead code (sin `import` vivo en ningún `.astro`/`.ts` de páginas/componentes — verificado con grep dirigido) o en superficies fuera del alcance declarado en `design.md` (wizard de cotización, brief interno). Ninguna es visible para un visitante del sitio construido.

## 3. Simetría i18n

Confirmada por el validador de build (536 claves en los 3 idiomas). Revisión manual de muestras de claves editadas (es/en/pt) en `servicios.details.items[0..5].features`, `servicios.process.steps`, `nosotros.manifesto`, `nosotros.values.items[3]`, `industrias.metaSectors/metaExpertise`, `contacto`/`cotizar` (términos de plazo): todas traducidas correctamente, sin español residual en en/pt.

## 4. Cero 404 / cards no-clicables

- `src/pages/servicios/carga-aerea.astro`, `carga-maritima.astro`, `src/pages/[lang]/servicios/carga-aerea.astro`, `carga-maritima.astro`: **eliminados**, confirmado con `test -e`.
- `src/lib/constants.ts` → `SERVICES[0].href` y `SERVICES[1].href` = `null as string | null`. Confirmado.
- `servicios.astro` y `ServicesSection.astro` importan `SERVICES` y usan wrapper condicional (no se probó interacción en navegador; verificación estática de código + build sin imports colgantes).

## 5. Secciones eliminadas

- FAQ (`/servicios`): sin markup, sin claves `servicios.faq.*`, sin `.faq*` en CSS.
- Trayectoria (`/nosotros`): sin markup `<section class="timeline">`, sin claves `nosotros.timeline.*`, sin `.timeline*` en CSS. `src/scripts/gsap-timeline-reveal.ts` **eliminado** y sin referencias (`grep gsap-timeline-reveal` → 0).
- Certificaciones (`/nosotros`): sin markup, sin claves `nosotros.certs.*`, sin `.certs`/`.cert` en CSS.
- Sector destacado (`/industrias`): sin markup (confirmado vía diff del commit `84f5369` que retira exactamente el `<section>` "Spotlight: sector destacado"), sin claves `industrias.spotlight.*`. La constante `spotlight` que sigue en `industrias.astro` es una variable reutilizada por la sección **"Directory editorial"** preexistente (feature distinta, no la sección retirada) — confirmado no es una regresión.

## 6. Contraste `.process-step__title`

`src/styles/pages/shared.css:531-535`:
```css
.process-step__title {
  color: var(--color-text-inverse); /* #ffffff */
}
```
`--color-text-inverse: #ffffff` (tokens.css). Fondo `.process-strip { background: var(--color-neutral-900) }` = `#211f1c`. Contraste calculado (WCAG): **≈16.5:1**, muy por encima de 4.5:1 AA. La regla de clase (especificidad 0,1,0) vence a `h1..h6{color:neutral-900}` (especificidad 0,0,1) sin depender de orden de cascada. `.howwork-card__title` (/nosotros, fondo claro) no fue tocado — sin regresión.

Verificación **estática** (CSS + cálculo de contraste), no se tomó captura de navegador — no bloqueante según se indicó en el prompt.

## 7. Datos de contacto

- `SITE.phone: '+56982708492'`, `SITE.phoneDisplay: '+56 9 8270 8492'`, `SITE.email: 'contacto@logatm.com'` (`constants.ts`).
- `BaseLayout.astro` JSON-LD: `telephone: '+56982708492'`, `email: 'contacto@logatm.com'` (literales, decisión explícita de no refactorizar el DRY preexistente — documentada en `design.md` § ADRs).
- `README.md:119` y `docs/project-brief.md:15,17`: teléfono/email nuevos confirmados.
- Cero ocurrencias del teléfono/email anteriores en todo el repo (`src`, `README.md`, `docs/`).

## 8. Ortografía / redacción

Revisión de muestra del copy nuevo en es/en/pt (bullets de servicios, proceso, manifiesto, valores, contacto): sin errores ortográficos ni gramaticales detectados. Traducciones fieles y naturales en los 3 idiomas.

## 9. Coherencia de Grafo de Specs

Validación de `depends_on`/`affects`/`related` de las 16 specs en `spec_refs` (algoritmo de `sdd-verify/SKILL.md` §7):

- Todos los `depends_on` referenciados existen: `content-nosotros/nosotros-hero-identity` (target de `years-experience-narrative-consistency`), `forms-email/email-cta-conditional` (target de `email-sla-no-finite-commitment`). Sin FAIL.
- **WARN** (metadata, no bloqueante): `forms-email/email-sla-no-finite-commitment.depends_on` incluye `[[forms-email/email-cta-conditional]]`, pero `email-cta-conditional.affects`/`.related` no incluye de vuelta `[[forms-email/email-sla-no-finite-commitment]]` (solo `related: [[forms-email/spec]]`). Asimetría de metadata en una spec preexistente (`status: completed`) que este cambio no debía modificar según decisión de diseño — no se corrige automáticamente porque la validación principal no es PASS.
- Resto de pares `related[]` (`services-catalog-cta-and-detail-pages`↔`services-descriptions-bullets`, `services-how-we-work-process`↔`ui-contrast/services-process-step-title-contrast`, `nosotros-hero-identity`↔`years-experience-narrative-consistency`, `content-contact/contact-no-time-commitment`↔`forms-email/email-sla-no-finite-commitment`) son bidireccionales y consistentes.
- Cadenas de supersesión (`content/content-services`, `content/content-industries`, `content/content-stats`, `nosotros-timeline-reveal/spec`) verificadas consistentes en ambas direcciones (`supersedes`/`superseded_by`).

No se ejecuta corrección automática de metadata (reservada a validación principal PASS).

## Resultados por Spec

| Spec | Veredicto | Notas |
|---|---|---|
| `content-services/services-catalog-cta-and-detail-pages` | ✅ PASS | Páginas de detalle eliminadas, hrefs null, sin "Conocer más" |
| `content-services/services-descriptions-bullets` | ✅ PASS | Los 6 servicios con bullets exactos en 3 idiomas |
| `content-services/services-how-we-work-process` | ✅ PASS | Pasos 3/5/6 exactos, sin KPI/OEA/plazos en los 6 pasos |
| `content-services/services-no-faq-section` | ✅ PASS | Sección y claves eliminadas, sin CSS huérfano |
| `content-home/home-frequent-routes` | ✅ PASS | `LIVE_ROUTES[3]` = Manzanillo→Valparaíso |
| `content-industries/industries-page-content` | ✅ PASS | Sin 300+/98%, sin sector destacado, sin OEA/Última milla en tags/servicesPer |
| `content-nosotros/nosotros-hero-identity` | ✅ PASS | "Desde 2023", "Profesionales 20+ años...", sin OEA/B2B en meta |
| `content-nosotros/years-experience-narrative-consistency` | ➡️ **SUPERSEDED** | Superseded por `content-nosotros/nosotros-manifesto-founding-year-consistency` (delta). El hallazgo original (`p1Html` afirmaba "dos décadas") quedó corregido vía la spec delta — ver fila siguiente |
| `content-nosotros/nosotros-manifesto-founding-year-consistency` | ✅ PASS (iter. 2) | `nosotros.manifesto.p1Html` corregido en es/en/pt a "profesionales con más de 20 años de experiencia" — ya no afirma antigüedad de la empresa, coherente con "Desde 2023" |
| `content-nosotros/nosotros-manifesto-messaging` | ✅ PASS | Sin "12 industrias"/"98% retención"; `p3Html` con mensaje de logística a medida |
| `content-nosotros/nosotros-no-timeline-section` | ✅ PASS | Sección + script + CSS eliminados |
| `content-nosotros/nosotros-values-feedback` | ✅ PASS | Valor 4 = "Nos preocupamos del feedback de nuestros clientes" (3 idiomas) |
| `content-nosotros/nosotros-no-certifications-section` | ✅ PASS | Sección y claves eliminadas |
| `content-contact/contact-no-time-commitment` | ✅ PASS | "a la brevedad"/"Respuesta rápida" en contacto y cotizar, sin horas concretas |
| `site-contact-info/site-global-contact-details` | ✅ PASS | Teléfono/email nuevos en SITE, JSON-LD, README, docs; cero rastro de los anteriores |
| `ui-contrast/services-process-step-title-contrast` | ✅ PASS | Contraste ≈16.5:1, sin regresión en /nosotros |
| `forms-email/email-sla-no-finite-commitment` | ✅ PASS | Email SLA usa "a la brevedad", sin "24 h" |

**Scenarios verificados**: 17/17 specs de `spec_refs` con todos sus scenarios cumplidos (iteración 2). El scenario "Visitante compara la fecha de fundación con la experiencia declarada" (spec delta `nosotros-manifesto-founding-year-consistency`), incumplido en la iteración 1, queda cumplido tras la corrección de `p1Html`.

### Tests

Sin tests unitarios en el proyecto (confirmado en observaciones previas). Validación = build (TS + i18n validator) + revisión de contenido/CSS estática, según lo definido en `design.md` § Estrategia de Verificación.

## Hallazgos de Seguridad

No aplica (`domain: feature`, sin superficie de seguridad tocada).

## Acciones Requeridas

Ninguna bloqueante. El único hallazgo de la iteración 1 (`nosotros.manifesto.p1Html`) fue corregido y re-verificado.

1. No bloqueante (diferido): considerar declarar `affects: [[forms-email/email-sla-no-finite-commitment]]` en `forms-email/email-cta-conditional` para simetría de grafo — spec preexistente fuera del alcance de este cambio.
