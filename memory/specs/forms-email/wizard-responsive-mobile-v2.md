---
type: capability-spec
title: "Stepper del wizard de cotización sin overflow en todos los iPhones modernos"
capability: "forms-email"
slug: "wizard-responsive-mobile-v2"
domain: "fix"
delta_type: "behavior-correction"
supersedes: "[[forms-email/wizard-responsive-mobile]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "fix-cotizar-mobile-wizard-stepper"
feature_branch: "feature/fix-cotizar-mobile-wizard-stepper"
commits:
  - "f01efbc fix(cotizar): compact stepper layout on mobile ≤640px"
worktree: "fix-cotizar-mobile-wizard-stepper"
acceptance_criteria:
  - "En un iPhone con viewport CSS ≤640px en portrait, el stepper de 4 pasos es completamente visible sin scroll horizontal"
  - "El paso activo (bullet numerado) es claramente identificable en cualquier iPhone moderno (SE, 14, 15, Pro Max)"
  - "Las etiquetas textuales 'PASO XX' no son visibles en viewports ≤640px — solo los bullets numerados"
  - "No existe scroll horizontal en ningún paso del wizard en viewport de 393px (iPhone 14)"
  - "No existe scroll horizontal en ningún paso del wizard en viewport de 430px (iPhone 15 Plus)"
  - "El layout del stepper en desktop (>640px) no presenta regresión visual"
  - "El contenedor del stepper bloquea cualquier desbordamiento residual con overflow-x: clip"
related:
  - "[[forms-email/wizard-modality-tap-ios]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: null
---

## Purpose

El stepper de 4 pasos del wizard de `/cotizar` debe renderizarse de forma compacta y sin desbordamiento horizontal en todos los iPhones modernos en portrait. El PR #19 introdujo un media query `@media (max-width: 480px)` que sí aplica en los viewports de iPhone 14/15 (393–430px CSS), pero las reglas internas son insuficientes: mantienen `padding: 1.25rem 1rem` y el texto `.stepper__label` visible, requiriendo ~556px de ancho mínimo frente a los ~353px disponibles reales. Esta spec corrige la causa raíz ampliando el breakpoint a `≤640px` y eliminando el contenido que impide la compactación.

## Requirements

- **MUST**: el stepper de 4 pasos DEBE renderizarse sin scroll horizontal en cualquier viewport CSS con ancho ≤640px en orientación portrait.
- **MUST**: el indicador del paso activo DEBE permanecer visible y distinguible (por color o estilo diferenciado) en viewports ≤640px.
- **MUST**: el contenedor del stepper DEBE bloquear cualquier desbordamiento horizontal residual con `overflow-x: clip` o equivalente.
- **SHOULD**: en viewports ≤640px, las etiquetas textuales de paso ("PASO 01", "PASO 02", etc.) PUEDEN ocultarse en favor de bullets numerados compactos, preservando la información de progreso mediante el número visible.
- **MUST NOT**: el fix CSS DEBE confinarse dentro del breakpoint `@media (max-width: 640px)` para no afectar el layout en desktop ni tablet.
- **SHALL**: el layout horizontal del stepper con 4 ítems en línea DEBE mantenerse — no se acepta cambio a orientación vertical ni acordeón.

## Scenarios

### Scenario 1: Usuario en iPhone 14 accede al wizard

GIVEN que el usuario abre `/cotizar` en un iPhone 14 (viewport CSS ~393px) en orientación portrait
WHEN la página carga y muestra el paso 1 del wizard
THEN el stepper de 4 pasos es completamente visible dentro del ancho de pantalla, sin requerir scroll horizontal, y el paso activo (01) está claramente diferenciado de los pasos pendientes

### Scenario 2: Usuario en iPhone 15 Plus navega por los pasos

GIVEN que el usuario está en el wizard desde un iPhone 15 Plus (viewport CSS ~430px)
WHEN el usuario avanza por los pasos 1, 2, 3 y 4 del wizard
THEN en cada paso el stepper muestra el progreso correcto (paso activo resaltado, pasos anteriores completados) sin desbordamiento horizontal en ningún momento

### Scenario 3: Ocultar etiquetas de texto en favor de bullets numerados

GIVEN que el usuario está en un viewport CSS ≤640px
WHEN observa el stepper en la parte superior de la página
THEN ve únicamente los bullets numerados (01, 02, 03, 04) sin las etiquetas de texto "PASO XX", lo que mantiene la información de progreso en un formato compacto

### Scenario 4: Desktop no presenta regresión

GIVEN que un usuario accede a `/cotizar` desde un escritorio con viewport CSS >640px
WHEN observa el stepper
THEN el stepper se muestra con el layout completo (bullets + etiquetas + nombres de paso) sin ningún cambio visual respecto al diseño original

## Acceptance Criteria

<!-- Verificables estáticamente (CSS bundle confirmado) -->
- [x] En viewport de 393px (iPhone 14), el stepper es visible en su totalidad sin scroll horizontal
- [x] En viewport de 430px (iPhone 15 Plus), el stepper es visible en su totalidad sin scroll horizontal
- [x] En viewport de 375px (iPhone SE), el stepper es visible en su totalidad sin scroll horizontal
- [x] En viewport ≤640px, las etiquetas "PASO XX" no son visibles
- [x] En viewport ≤640px, los bullets numerados identifican el paso activo por diferenciación visual
<!-- Verificable estáticamente: reglas desktop no modificadas -->
- [x] En viewport >640px (desktop), el stepper mantiene su layout completo sin regresión
<!-- Runtime iOS: pendiente validación usuario en iPhone real -->
- [ ] No hay scroll horizontal en ningún paso del wizard en viewports de 375px, 393px y 430px
