---
type: judgment-report
change_name: "fix-color-contrast-sitewide"
verdict: FAIL
reviewed_head: "d92da75b074425add83fb8f26efa4e0c45c30d80"
confirmed_issues: 2
suspect_issues: 4
residual_classes:
  C1: produccion
  C2: produccion
  SA1: produccion
  SA2: produccion
  SB1: produccion
  SB2: prosa
created: "2026-10-06"
tags: [judgment]
---

# Judgment Report: fix-color-contrast-sitewide

Iteración 1 (`judgment_iterations` ausente → diff completo `main...feature/fix-color-contrast-sitewide`, sin `memory/`). HEAD revisado: `d92da75`. Jueces: Judge A (corrección y cumplimiento) y Judge B (seguridad y robustez), ambos `opus`, independientes. Ninguno reporta las decisiones del usuario del HITL de la propuesta (texto oscuro en CTA y WhatsApp, `accent-800`, `.channel--wa` sólido, `#111b21` inline en el correo, texto claro sobre fotos y video diferido). El coordinador verificó contra el código los hallazgos C1, SA1 y SA2.

## Síntesis

| Categoría | Count |
|-----------|-------|
| Confirmed (ambos jueces) | 2 |
| Suspect A (solo Judge A) | 2 |
| Suspect B (solo Judge B) | 2 |
| Clean | 0 |

Descartado en triage (no cuenta): Judge B señaló `color-mix()` sin `background` de respaldo en `.ind-directory__counter` (`shared.css:104`, low). Tailwind v4, que el sitio exige, ya requiere navegadores con `color-mix()` (Chrome 111+, Safari 16.4+, Firefox 128+), y el sitio usa `color-mix()` sin respaldo en otras hojas. No es un defecto alcanzable.

## Hallazgos Confirmados

### C1 — Viñeta de paso completado del asistente con texto blanco sobre verde (high · produccion)

- **Archivo**: `log-atm-web-astro/src/styles/pages/cotizar.css:77-79`
- **Hallazgo**: la regla `.stepper__step--done .stepper__bullet { background: var(--color-accent-500); color: #fff; }` no se migró al par CTA. `src/scripts/wizard.ts:181` escribe `✓` en la viñeta de cada paso completado (0.85rem). Blanco sobre `#3EB978` mide 2.50:1, bajo 4.5:1 como texto y bajo 3:1 como gráfico. El equivalente `.mode-tile--active .mode-tile__check` (línea 193) sí se migró. La auditoría axe no lo detecta, porque el texto es un único glifo de símbolo.
- **Incumple**: `cta-button-contrast` (SHALL «toda superficie verde de marca que lleve texto») y `sitewide-contrast-verification` (MUST, «pasos del asistente de cotización»; AC 2).
- **Corrección**: `background: var(--color-cta); color: var(--color-cta-text); border-color: var(--color-cta)` (6.44:1).

### C2 — Colores literales nuevos en el degradado del visor de industrias (medium · produccion)

- **Archivo**: `log-atm-web-astro/src/styles/pages/shared.css:93-97`
- **Hallazgo**: la nueva media query `@media (max-width: 960px) .ind-directory__overlay` agrega cuatro literales `rgba(15,28,46,…)` fuera de `tokens.css`, y `#0f1c2e` no corresponde a ningún token (`primary-950` = `#0a1624`, `primary-900` = `#112236`). El chequeo estático del diseño solo buscaba `#hex` y no lo cubrió.
- **Incumple**: `contrast-token-single-source` (MUST NOT colores literales nuevos fuera de la fuente de tokens; AC 2).
- **Corrección**: expresar los tramos con `color-mix(in srgb, var(--color-primary-950) N%, transparent)` (el mismo recurso que el contador) y volver a medir el nombre de industria ≥ 4.5:1 en el visor ≤ 960px. No se exige migrar el degradado base preexistente de la línea 86.

## Hallazgos Suspect

### SA1 — Mensaje de éxito del formulario de contacto en `#2d9b6f` sobre blanco (high · produccion)

- **Archivo**: `log-atm-web-astro/src/pages/contacto.astro:220-221` (`#contact-status`, líneas 124-131)
- **Hallazgo**: `setStatus` asigna `status.style.color = '#2d9b6f'` al estado `success`, sobre la tarjeta blanca `.contact-form-card` con fuente de 0.875rem: 3.48:1. El diseño (D8) retiró ese mismo hex de `.cta-final__status` sin revisar este otro consumidor. El estado de error (`#c0392b`, 5.44:1) cumple.
- **Incumple**: `sitewide-contrast-verification` (MUST, «mensajes de éxito del formulario»; AC 2).
- **Corrección**: el estado `success` toma un token con ≥ 4.5:1 sobre blanco, p. ej. `var(--color-text-accent)` (6.91:1), sin hex nuevo. Coordinador: verificado en el código.

### SA2 — La pastilla del contador del directorio se estira a todo el ancho (low · produccion)

- **Archivo**: `log-atm-web-astro/src/styles/pages/shared.css:98-108`
- **Hallazgo**: `.ind-directory__counter` es hijo directo de `.ind-directory__overlay` (`display: flex; flex-direction: column`, sin `align-items`). Como ítem flex se estira (`stretch`), y la pastilla de D9 se dibuja como una franja oscura de todo el ancho superior de la foto, no del tamaño de «01 / 12». El contraste cumple (≥ 5.65:1); el defecto es visual y contradice el contrato D9.
- **Incumple**: diseño D9; registrado como SHOULD en `secondary-text-dark-surface-contrast`.
- **Corrección**: `align-self: flex-start` en `.ind-directory__counter` (en RTL, el equivalente lógico que corresponda).

### SB1 — Botón «Responder por email» del correo con 4.38:1 (medium · produccion)

- **Archivo**: `log-atm-web-astro/src/lib/email-templates.ts:283, 293`
- **Hallazgo**: el botón conserva `background:#4A7BB5;color:#ffffff;` (4.38:1, texto de 15px bold, que no cuenta como texto grande). El mismo cambio declara ese par no válido en `DESIGN.md` y fija que cada par del correo que replica uno del sitio vive en una constante que nombra sus tokens. Este botón replica el azul sólido del sitio (`--color-brand-solid` `#3b6497` / blanco, 6.08:1) y no cumple ninguna de las dos reglas. Las interpolaciones siguen escapadas (`escapeHtml`, `encodeURIComponent`, `cleanPhone`): no hay riesgo de seguridad.
- **Registro**: ninguna spec vigente documenta este comportamiento, por lo que se crea la spec original `forms-email/email-reply-button-contrast`. El diseño lo había dejado fuera de las specs como candidato de deuda; el juez lo eleva porque contradice la regla que el propio cambio escribe en `DESIGN.md`.
- **Corrección**: constante local `background:#3b6497;color:#ffffff;` con comentario que nombra `--color-brand-solid` / `--color-brand-solid-text`, consumida en las ramas de las líneas 283 y 293.

### SB2 — `DESIGN.md` se contradice con su tabla y con el anillo de foco (low · prosa)

- **Archivo**: `log-atm-web-astro/DESIGN.md:72, 83, 128`
- **Hallazgo**:
  - La línea 72 describe `--color-brand` como color de «enlaces y acentos», pero la tabla (línea 83) lo limita a texto grande (4.10:1 sobre `neutral-50`; 4.38:1 sobre blanco para la regla base `a` de `global.css:84-85`).
  - La línea 128 afirma que ningún componente fija otro color de anillo, pero `WhyVideoSection.astro:156` conserva `outline: 2px solid #fff`. Ese caso lo mantiene a propósito el diseño D6 y no figura como excepción.
- **Incumple**: `contrast-token-single-source` (requisito nuevo de coherencia de la documentación).
- **Corrección**: describir `--color-brand` sin presentarlo como apto para texto normal de enlaces y declarar la excepción `.why__video-toggle` en la sección del anillo de foco.

## Registro de los hallazgos en specs

- **(a) Corrección en su lugar** (specs del cambio en curso, `status: review`):
  - `ui-contrast/cta-button-contrast`, por C1: nuevo scenario y AC sin marcar.
  - `ui-contrast/sitewide-contrast-verification`, por C1 y SA1: nuevo requisito MUST y scenario del mensaje de éxito; AC 2 desmarcado y AC nuevo.
  - `ui-contrast/contrast-token-single-source`, por C2 y SB2: el requisito de literales se precisa a toda notación de color; nuevo requisito y scenario de coherencia de la documentación; AC 2 desmarcado y AC nuevo.
  - `ui-contrast/secondary-text-dark-surface-contrast`, por SA2: nuevo SHOULD y AC sin marcar.
- **(c) Spec original**: `forms-email/email-reply-button-contrast` (SB1), con `tags: [capability-spec, judgment-fix]`, `assigned_agent: sdd-apply` y agregada a `spec_refs`.

## Veredicto Final

FAIL. Ambos jueces fallan el cambio de forma independiente:
- **Producción**: C1 y SA1 son incumplimientos de MUST con contraste medido bajo el umbral (2.50:1 y 3.48:1) en estados que la spec de cierre cubre de forma explícita, y que la auditoría automática no detectó. C2 viola la regla de fuente única de tokens. SA2 y SB1 son correcciones de una línea.
- **Prosa**: SB2 corrige texto de `DESIGN.md`.

El resto del alcance cumple según ambos jueces:
- Ratios de todos los pares de la tabla.
- Cascada de `.cta-final .btn--cta` y `.svc-filter`.
- Ausencia de `outline: none`.
- `--focus-ring-color` en todas las superficies oscuras con controles enfocables.
- Paridad `:root`/`@theme`.
- Sin consumidores huérfanos de `--color-brand-hover` ni de `--color-whatsapp`.
- Escapes del correo intactos.
