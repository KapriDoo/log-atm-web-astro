---
type: proposal
change_name: "fix-ux-multipage-bugs"
domain: "fix"
status: approved
created: "2026-05-19"
approved: "2026-05-19"
effort: M
risks_overall: Media
---

# Propuesta — fix-ux-multipage-bugs

## Intent

Corregir 10 bugs UX/UI distribuidos en 4 páginas internas (`/industrias`, `/nosotros`, `/contacto`, `/cotizar`) más un bug global de favicon. Se agrupan en un único cambio porque comparten causas raíz transversales: (a) la clase `.section { padding-block }` solo existe en `sections/services.css` (importado únicamente por `index.astro`), lo que explica B3/B4/B5; (b) varios scripts no escuchan `astro:page-load`, lo que rompe interacción tras View Transitions (B1/B7); (c) el resto son fixes focales (color de hero, ícono WhatsApp, folio server-side, responsive del stepper, favicon de marca). Tratarlos juntos minimiza re-trabajo de regresión visual.

## Scope

**Incluye**:
- B1 — `/industrias`: envolver init del directorio editorial en `astro:page-load` para reactivar listeners tras View Transitions.
- B2 — Color blanco del título sobre hero en páginas internas (resolver conflicto `@layer components` vs reglas unlayered de `shared.css`).
- B3-B5 — Mover `.section { padding-block: var(--section-pad) }` a `shared.css` (o `global.css` fuera de layer) para que aplique a todas las páginas internas.
- B6 — Reemplazar `lucide:message-circle` por logo oficial de WhatsApp (inline SVG o `@iconify-json/simple-icons`).
- B7 — Wizard `/cotizar`: envolver el script principal en `astro:page-load` y resetear flag `isAnimating`.
- B8 — Mover generación de folio al servidor (`/api/cotizacion.ts` retorna `{ ok, folio }`), wizard usa el folio del response. Verificar SMTP config.
- B9 — Breakpoints mobile para `.stepper` y `.quote-card` en `cotizar.css`.
- B10 — Generar `favicon.svg` y `favicon.ico` desde `logo.svg` con `sharp` (ya instalado).

**Excluye** (explícito):
- Refactor completo del wizard a store reactivo.
- Implementación de tests automatizados (no hay infra; verificación manual + curl).
- Persistencia de folio en BD (no hay BD; folio server-generated en memoria/response).
- Migración del directorio de industrias a otra librería.

## Approach recomendado

Fixes atómicos por bug, agrupados por commit lógico. Approach A1 (mínimo quirúrgico) del exploration extendido con la regla `.section` movida a un lugar global (parte de A2). Verificación manual con `astro dev` + browser + curl al endpoint.

| # | Bug | Fix de alto nivel | Capability | Esfuerzo |
|---|-----|-------------------|------------|----------|
| B1 | Selector industrias no responde | Envolver init en `astro:page-load`; auditar `window.__indDirectoryOnRender` | interactive-component-transitions | S |
| B2 | Título hero en negro | Forzar `color: #fff` en `.page-hero__title` o sacar la regla de `@layer components` en `global.css` | internal-page-heroes | S |
| B3-B5 | Spacing entre secciones en internas | Mover `.section { padding-block }` desde `sections/services.css` a `shared.css` (importado por todas las internas) | sections + tokens | S |
| B6 | Ícono WhatsApp ausente o genérico | Inline SVG del logo WhatsApp en `.channel--wa`, o instalar `@iconify-json/simple-icons` y usar `simple-icons:whatsapp` | components / forms-email | XS |
| B7 | Modalidad wizard no avanza | `astro:page-load` wrapper + reset `isAnimating`; verificar binding de `mode-tile` click | forms-email + interactive-component-transitions | M |
| B8 | Folio inventado + email no enviado | API retorna `folio` server-generated; wizard lee del response; documentar `.dev.vars` SMTP | forms-email | M |
| B9 | Wizard mobile roto | Breakpoint `<480px` en `.stepper` (bullets-only u overflow); ajustar `.quote-card` padding | forms-email / interactive-component-transitions | M |
| B10 | Favicon default Astro | Script one-shot con `sharp` para generar `favicon.svg` simplificado + `favicon.ico` 32x32 desde `logo.svg` | global / branding | XS |

## Trade-offs explícitos

- **B8 folio**: Opción A — generar server-side en `/api/cotizacion.ts` (timestamp + random) y retornarlo en el JSON de response. Opción B — persistir en BD con UUID. **Recomendado: A** porque no existe capa de persistencia en el stack actual (Astro + Cloudflare Workers + nodemailer); persistencia sería out-of-scope.
- **B6 ícono WhatsApp**: Opción A — inline SVG (0 deps nuevas, control total del path). Opción B — instalar `@iconify-json/simple-icons`. **Recomendado: A** para mantener bundle ligero, dado que es un único ícono.
- **B3-B5 spacing**: Opción A — mover `.section` a `shared.css` (cubre solo internas que importan ese archivo, DRY). Opción B — moverla a `global.css` fuera de layer (aplica universalmente, incluido `index.astro` que ya recibe la regla vía `services.css`). **Recomendado: A** porque preserva la cascada actual de `index.astro` y evita doble definición.
- **B7/B9 wizard**: Opción A — fix puntual (`astro:page-load` + breakpoints). Opción B — refactor a store reactivo. **Recomendado: A**; el refactor queda fuera de scope.
- **B2 color título**: Opción A — añadir `color: #fff` directo en `shared.css` con suficiente especificidad. Opción B — sacar `.page-hero__title` de `@layer components` en `global.css`. **Recomendado: A** porque es el cambio de menor superficie; B se evalúa si A no resuelve.

## Riesgos

| ID | Riesgo | Probabilidad | Mitigación |
|----|--------|--------------|------------|
| R1 | Worktree sin `node_modules` → no se puede probar B8 localmente sin setup | Alta | `npm install` antes de sdd-apply; crear `.dev.vars` placeholder con SMTP de prueba (Mailtrap/Ethereal) |
| R2 | Scripts no escuchan `astro:page-load` → bugs recurrentes al navegar | Media | Auditoría sistemática de todos los scripts inline en páginas internas durante sdd-apply |
| R3 | B2 cascada Tailwind v4 `@layer` — incertidumbre hasta render | Media | Verificación en browser tras apply; fallback a `!important` o quitar `@layer` si A no resuelve |
| R4 | B10 conversión SVG→ICO | Baja | `sharp` ya instalado (verificado en `package.json`); script de build one-shot |
| R5 | B8 folio server-side aumenta superficie de cambio en API | Media | Cambio focal en `/api/cotizacion.ts` (capability `forms-email` ya cubre el endpoint); response shape backward-compatible (`folio` opcional) |
| R6 | SMTP no configurado en entorno de prueba → falso negativo B8 | Media | Documentar requerimiento `.dev.vars`; verify con SMTP test (Ethereal) si vars de producción no disponibles |

## Esfuerzo total

- **Total estimado**: M (mediano) — suma de S+S+S+XS+M+M+M+XS ≈ 1-2 días de implementación + 0.5 día verify manual con browser.

## Capabilities que se tocan (specs a crear/actualizar)

- `forms-email` — delta para B7 (wizard advance/state), B8 (folio en response, retry SMTP), B9 (responsive wizard).
- `internal-page-heroes` — delta para B2 (contrato de color del título sobre hero).
- `sections` (o nueva `sections/internal-spacing`) — spec para B3-B5 (regla `.section` accesible en páginas internas).
- `interactive-component-transitions` — delta para B1 (init en `astro:page-load`), refuerzo de patrón para B7.
- `components/contacto-channels` (nueva o micro-spec) — para B6 (ícono WhatsApp como logo de marca).
- `branding/favicon` (nueva micro-capability) — para B10 (favicon de marca + assets en `public/`).

## Acceptance global (resumen — detalle por spec)

- `/industrias`, `/nosotros`, `/contacto`, `/cotizar` muestran spacing vertical consistente entre secciones (visual paridad con `/index`).
- Selector de industrias responde a click/hover/focus en todos los ítems y actualiza el spotlight tras navegación con View Transitions.
- Título `h1.page-hero__title` sobre hero con imagen se renderiza en blanco con contraste WCAG AA ≥ 4.5:1.
- Bloque WhatsApp en `/contacto` muestra el logo reconocible de WhatsApp.
- Wizard `/cotizar`: el usuario puede seleccionar modalidad, avanzar pasos y enviar; en mobile (≤480px) los pasos renderizan sin overflow ni superposición.
- Email se envía al destinatario `MAIL_TO` con SMTP configurado; folio único viene del server en el response y se muestra en el paso success.
- Favicon es el logo de Log ATM en `.svg` y `.ico` en todas las rutas.

## Decisiones pendientes (HITL)

1. **Folio**: confirmar que server-generated (timestamp + random base36, ej. `LA-K3F9X2`) en response JSON es aceptable, o si se requiere persistencia (esto último expandiría scope). → **Recomendado: server-generated en response**.
2. **Ícono WhatsApp**: confirmar si se prefiere inline SVG del logo oficial (zero deps) o instalar `@iconify-json/simple-icons` para acceder al set de marcas. → **Recomendado: inline SVG**.
3. **Favicon**: confirmar si se generan ambos formatos (`.svg` + `.ico` 32x32) o solo `.svg` (algunos navegadores antiguos requieren `.ico`). → **Recomendado: ambos**.
4. **B2 color**: aceptar opción A (forzar color en `shared.css`) como primera iteración y reevaluar en verify si no resuelve, o ir directo a refactor de `@layer`. → **Recomendado: A primero**.
5. **SMTP testing**: ¿existe acceso a credenciales SMTP reales para verify de B8, o se usa servicio de prueba (Ethereal/Mailtrap)? → **Pregunta abierta al usuario**.

---

## Approval Record

**Aprobado por usuario el 2026-05-19** vía comando "aprobado" tras presentación del HITL canónico de sdd-propose.

Decisiones D1-D5 resueltas con los defaults recomendados (sin override explícito del usuario):

- **D1 (folio)**: server-generated en response JSON (formato `LA-{timestamp36}{random36}`). Sin persistencia BD.
- **D2 (ícono WhatsApp)**: inline SVG del logo oficial. Sin dependencia nueva.
- **D3 (favicon)**: generar ambos formatos (`.svg` + `.ico` 32x32) desde `logo.svg` con `sharp`.
- **D4 (B2 color)**: opción A (forzar `color: #fff` en CSS con suficiente especificidad); reevaluar a refactor `@layer` en verify si A no resuelve.
- **D5 (SMTP)**: NO especificado por usuario al aprobar → default operacional:
  - Documentar requerimiento de `.dev.vars` con SMTP (variables esperadas: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`).
  - En `sdd-apply`: implementar el cambio (folio server + retry SMTP) sin depender de credenciales reales en el worktree.
  - En `sdd-verify`: validar shape de response (folio presente, ok=true en happy path) con request directo al endpoint usando Ethereal como SMTP fallback si las vars reales no están presentes; documentar como limitación si SMTP real no disponible.

Pipeline avanza a `sdd-spec`.
