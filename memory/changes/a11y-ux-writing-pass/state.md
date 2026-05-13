---
change_name: a11y-ux-writing-pass
type: change-state
domain: refactoring
fast_path: apply-only
status: active
current_phase: sdd-archive
phases_completed:
  - sdd-init
  - sdd-apply
  - sdd-verify
worktree: ".sdd/worktrees/a11y-ux-writing-pass"
feature_branch: "feature/a11y-ux-writing-pass"
integration_target: "feature/handoff-home-deltas"
require_judgment: false
skip_judgment: true
created: "2026-05-12"
---

## Intent

Aplicar los hallazgos P0+P1+P2 de la revisión de accesibilidad (WCAG 2.2 AA)
y UX writing sobre la rama `feature/handoff-home-deltas`. 11 fixes acotados
distribuidos en 7 archivos:

- **P0** (críticos): pause control en video Why (WCAG 2.2.2), focus management
  completo del drawer móvil (WCAG 2.4.3 + 2.1.2), unificación de cifras
  inconsistentes (70+ países vs 80+ partners).
- **P1** (importantes): radiogroup CTA con teclado real (WAI-ARIA APG),
  validación visible + live region en form, aria-label dinámico hamburger,
  alt="" en imágenes decorativas, ajuste de promesa "30s" → "60s".
- **P2** (menores): mejorar copy del form, limpiar aria-label del selector
  idioma, dividir campo contacto en email + teléfono separados.

## Path Inference
- Inferred: apply-only (override del usuario)
- Signals: S1=Y (hallazgos identificados en review previo), S2=Y (archivos:línea conocidos), S3=Y (cada fix acotado)
- Override: user explicit (recommended path from /sdd new)
