---
type: change-state
change_name: "fix-cotizar-mobile-wizard-stepper"
domain: "fix"
status: active
fast_path: "full"
current_phase: sdd-archive
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify, sdd-judgment]
judgment_iteration: 1
judgment_verdict_iter1: PASS
spec_refs:
  - "forms-email/wizard-responsive-mobile-v2"
  - "forms-email/wizard-modality-tap-ios"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-cotizar-mobile-wizard-stepper"
feature_branch: "feature/fix-cotizar-mobile-wizard-stepper"
integration_target: "main"
mr: ""
mr_status: pending
mr_error: ""
created: "2026-05-20"
updated: "2026-05-20"
verified_at: "2026-05-20"
apply_phase_completed: "2026-05-20"
apply_commits:
  - "f01efbc fix(cotizar): compact stepper layout on mobile ≤640px"
  - "6105389 fix(cotizar): add touch-action and manual listener cleanup for iOS Safari"
tasks_phase_completed: "2026-05-20"
tasks_artifact: "memory/changes/fix-cotizar-mobile-wizard-stepper/tasks.md"
spec_phase_completed: "2026-05-20"
design_phase_completed: "2026-05-20"
design_artifact: "memory/changes/fix-cotizar-mobile-wizard-stepper/design.md"
proposal_artifact: "memory/changes/fix-cotizar-mobile-wizard-stepper/proposal.md"
exploration_artifact: "memory/changes/fix-cotizar-mobile-wizard-stepper/exploration.md"
tags: [change, regression, mobile, safari]
---

## Intent

Regresión observada en mobile (iPhone Safari) de `/cotizar` tras merge del PR #19 (`fix-ux-multipage-bugs`). El usuario adjuntó screenshot mostrando el problema en runtime real.

**Bugs persistentes**:

1. **Stepper descuadrado en mobile** (B9 del PR#19 NO se resolvió en runtime real):
   - Se ven 4 píldoras horizontales: "01 PASO 01", "02 PASO 02", "03 PASO 03", "04 PASO 04"
   - Layout NO compacto: etiquetas "PASO XX" al lado de los números, no debajo
   - Overflow horizontal visible
   - El media query `@media (max-width: 480px)` aplicado en PR#19 NO logró el efecto deseado en Safari iOS

2. **Modalidad NO seleccionable** (B7 del PR#19 NO se resolvió en runtime real):
   - El primer radio (Marítimo) aparece con borde azul pero el círculo del radio sigue ○ vacío
   - Tap en otros items (Aéreo, Courier, Multimodal) no cambia la selección
   - Paso 01 no avanza al paso 02

**Contexto crítico**:
- PR #19 mergeado en `dec5e29` (2026-05-19), refactor de `<script define:vars>` → `src/scripts/wizard.ts`.
- Verify iter2 del PR#19 marcó PASS basado en build estático + curl HTTP 200 + grep TS leak. No hubo smoke test con browser real.
- Jueces iter2 dejaron como riesgo abierto: "verificación funcional end-to-end pendiente".

**Hipótesis a investigar en sdd-explore**:
- ¿`wizard.ts` se carga en producción CF Pages? Inspeccionar HTML producido y bundle.
- ¿`astro:page-load` se dispara en iOS Safari con View Transitions?
- ¿El click handler en `.mode-tile` usa delegación correcta o requiere ser sobre el `<input>` directo?
- ¿El media query `≤480px` cubre el viewport real de iPhone 14/15 (393-430px CSS px, DPR 3)?
- ¿`flex-wrap`/`overflow: auto` del stepper se renderiza diferente en iOS Safari?
- ¿`data-*` attribute parsing del nuevo wizard.ts falla silenciosamente en iOS?

**Acceptance**:
- En iPhone Safari (iOS 16+), stepper compacto sin overflow horizontal, etiquetas no colisionan con números.
- Tap en cualquier modalidad la selecciona (radio marcado, avanzar habilitado).
- Paso 01 → 02 al tap en "Siguiente" tras seleccionar modalidad.

**Specs heredadas relevantes (status: completed PR#19)** a probable supersedir con delta:
- `[[forms-email/wizard-responsive-mobile]]`
- `[[interactive-component-transitions/wizard-step-modality-selection]]`

## Path Inference

- Inferred: `full` (override del orquestador)
- Signals: S1=Y, S2=Y, S3=N
- Algoritmo sugería: spec-first (regla 2)
- Override: lección del PR#19 — verify estático perdió el bug en runtime mobile real. Exploración necesaria.

## Predecessor

- PR #19 (`fix-ux-multipage-bugs`) mergeado a main en commit `dec5e29` el 2026-05-19.
- Specs heredadas (status: completed) relevantes para este change:
  - `[[forms-email/wizard-step-modality-selection]]` — B7 del PR#19 (NO se resolvió en runtime mobile real)
  - `[[forms-email/wizard-responsive-mobile]]` — B9 del PR#19 (NO se resolvió en runtime mobile real)
  - `[[interactive-component-transitions/wizard-step-modality-selection]]` — duplicada en la otra capability
