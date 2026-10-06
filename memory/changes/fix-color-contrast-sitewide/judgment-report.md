---
type: judgment-report
change_name: "fix-color-contrast-sitewide"
verdict: FAIL
reviewed_head: "6d9dba7f4347936e575ea97e1f3f7deeb44b6d21"
confirmed_issues: 1
suspect_issues: 1
residual_classes:
  C1: prosa
  SA1: prosa
created: "2026-10-06"
tags: [judgment]
---

# Judgment Report: fix-color-contrast-sitewide

Iteración 2 (`judgment_iterations: 1` → solo el diff de la ronda, `git log -p --first-parent --no-merges d92da75..HEAD`). HEAD revisado: `6d9dba7`. Jueces: Judge A (corrección y cumplimiento) y Judge B (seguridad y robustez), ambos `opus` e independientes. Ninguno reporta las decisiones que el usuario tomó en el HITL de la propuesta. El coordinador verificó contra el código y `DESIGN.md` los hallazgos C1 y SA1, y los dos descartes de triage.

Cómo resolvió la ronda los seis hallazgos de la iteración 1 (ambos jueces coinciden):
- **C1 (viñeta `✓`)**: resuelto con el par CTA, 6.44:1. Ninguna regla posterior lo pisa.
- **C2 (degradado ≤ 960px)**: resuelto con `color-mix(… var(--color-primary-950) N%, transparent)`. El nombre de industria sube de 6.79 a 7.32:1 en la parada del 50 %, con foto blanca como peor caso.
- **SA1 (mensaje de éxito de contacto)**: resuelto con `var(--color-text-accent)`, 6.91:1. Cubre también las páginas en y pt.
- **SA2 (pastilla del contador)**: resuelto con `align-self: flex-start`, que es lógico y respeta RTL.
- **SB1 (botón «Responder por email»)**: resuelto con la constante `emailBtnColors` (`#3b6497`/`#fff`, 6.08:1) en las dos ramas. Los escapes y el `mailto` no cambian, así que no hay superficie de inyección nueva.
- **SB2 (`DESIGN.md`)**: resuelto solo en parte (ver SA1 de esta iteración).

## Síntesis

| Categoría | Count |
|-----------|-------|
| Confirmed (ambos jueces) | 1 |
| Suspect A (solo Judge A) | 1 |
| Suspect B (solo Judge B) | 0 |
| Clean | 5 |

Descartados en triage (no cuentan):
- **Rama `success` de `setQuoteStatus` con `#2d9b6f`** (`src/scripts/wizard.ts:336`).
  - Lo señalaron ambos jueces, con severidad low y como no bloqueante.
  - El código es previo al cambio y queda fuera del diff de la ronda.
  - La rama es inalcanzable: ninguna llamada de las líneas 361-386 pasa `'success'`. El éxito del asistente es una pantalla aparte, verificada en `verify-report.6` y `.8`.
  - No incumple ningún MUST: la regla de literales cubre colores *nuevos*, y el requisito de los mensajes de éxito cubre los visibles.
  - Queda registrado como deuda en `observations.md`.
- **Regla base `a { color: var(--color-brand) }`** (`src/styles/global.css:84`), señalada solo por Judge B.
  - Es previa al cambio, idéntica en `main` y queda fuera del diff de la ronda.
  - La iteración 1 la resolvió en la documentación (SB2): `--color-brand` no se presenta como color de enlace.
  - No hay un consumidor alcanzable que falle: axe `color-contrast` da 0 violaciones en 21 URL (`verify-report.5`).
  - Queda registrado como deuda en `observations.md`.

## Hallazgos Confirmados

### C1 — El diseño y el ADR-0008 no reflejan el botón «Responder por email» que la ronda incorporó (low · prosa)

- **Archivos**:
  - `memory/changes/fix-color-contrast-sitewide/design.md:191`
  - `memory/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md:89`
  - `memory/specs/ui-contrast/contrast-token-single-source.md:77`
- **Hallazgo**:
  - `design.md` sigue clasificando el botón «Responder por email» como «fuera del alcance de las specs» y candidato de deuda, aunque la ronda creó la spec `forms-email/email-reply-button-contrast` y lo corrigió en `84e0c03`.
  - El apartado «Referencias → Specs» del ADR-0008 no lista esa spec, y el ADR rige la excepción de hex inline del correo que la spec consume.
  - El scenario «Equipo revisa los estilos tras el cambio» limitaba la excepción al botón WhatsApp.
- **Incumple**: la coherencia de los artefactos del cambio con el alcance que la ronda incorporó.
- **Corrección**:
  - En `design.md:191`, citar la spec `email-reply-button-contrast` y la constante `emailBtnColors`, y dejar como deuda solo el texto SLA `#898580` y el enlace `mailto`.
  - Agregar `forms-email/email-reply-button-contrast` a las specs del ADR-0008.
  - El scenario de la spec ya quedó corregido en esta fase (ver «Registro»).

## Hallazgos Suspect

### SA1 — `DESIGN.md` sigue asignando a texto normal colores que su tabla limita a texto grande (medium · prosa)

- **Archivo**: `log-atm-web-astro/DESIGN.md:27, 61, 157-158`
- **Hallazgo**: la ronda corrigió el comentario de `--color-brand` (línea 71), pero el mismo documento sigue presentando como color de texto normal tonos que no alcanzan 4.5:1:
  - Línea 27: `primary-400` como «links hover» (`#658fc3` sobre blanco, 3.35:1).
  - Línea 61: `info` `#4A7BB5` para «Mensajes informativos» (4.38:1).
  - Línea 157: botón «Outline» `.btn-outline` con `text-primary-500` (4.38:1). La clase no existe en `src/`.
  - Línea 158: botón «Ghost» con `text-brand` (4.38:1 sobre blanco y 4.10:1 sobre `neutral-50`). El `.btn-ghost` real (`cotizar.css:269-273`) usa `--color-text-muted`.

  Esas líneas contradicen la línea 123 («No validos para texto normal: … blanco sobre `primary-500` (4.38:1)») y la tabla, que limita `--color-brand` a texto grande. El coordinador lo verificó: las cuatro líneas son previas al cambio, pero el SHALL de coherencia que agregó la iteración 1 las alcanza, y su AC se había marcado cumplido.
- **Incumple**: `contrast-token-single-source`, en el SHALL «mantener la documentación de diseño coherente con sus propios pares», el scenario «Equipo consulta el uso de un color en la documentación» y su AC 6.
- **Corrección**:
  - Describir `.btn-ghost` con sus tokens reales: `--color-text-muted` y hover `--color-text`.
  - Quitar `.btn-outline`, o describirlo con un par válido si se mantiene como patrón.
  - Describir `primary-400` y `info` sin asignarlos a texto normal: como acento o ícono, o declararlos no aptos para texto normal.

## Registro de los hallazgos en specs

- **(a) Corrección en su lugar**: `ui-contrast/contrast-token-single-source` (cambio en curso, `status: review`).
  - Por SA1: AC 6 desmarcado en el frontmatter y en el cuerpo, y nuevo `AND` en el scenario «Equipo consulta el uso de un color en la documentación». El `AND` extiende la coherencia a los tonos de la paleta, los colores semánticos y la descripción de los botones, y exige que los botones descritos existan en el código con los tokens indicados.
  - Por C1: el scenario «Equipo revisa los estilos tras el cambio» nombra ahora los dos botones de los correos (WhatsApp y «Responder por email») como excepción declarada.
- Sin specs nuevas: no hubo casos (b) ni (c), y `spec_refs` no cambia.

## Veredicto Final

FAIL. Los dos residuales son de prosa:
- **SA1**: incumple un SHALL de la spec del cambio con un AC marcado indebidamente como cumplido.
- **C1**: deja el diseño y el ADR-0008 desalineados con el alcance que la ronda incorporó.

El código de la ronda cumple, según ambos jueces: los cinco defectos de producción de la iteración 1 están resueltos, sin regresiones de contraste, de cascada ni de seguridad. Judge A falla por SA1 y Judge B aprueba. No queda ningún residual de producción.
