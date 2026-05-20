---
type: change-state
change_name: "fix-ux-multipage-bugs"
domain: "fix"
status: active
fast_path: "full"
current_phase: sdd-verify
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply]
spec_refs:
  - "[[sections/internal-pages-vertical-rhythm]]"
  - "[[internal-page-heroes/hero-title-contrast]]"
  - "[[interactive-component-transitions/industries-selector-interaction]]"
  - "[[interactive-component-transitions/wizard-step-modality-selection]]"
  - "[[forms-email/quote-folio-server-generated]]"
  - "[[forms-email/quote-email-delivery]]"
  - "[[forms-email/wizard-responsive-mobile]]"
  - "[[components/contacto-channels/whatsapp-icon]]"
  - "[[branding/favicon-logo-atm]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-ux-multipage-bugs"
feature_branch: "feature/fix-ux-multipage-bugs"
integration_target: "main"
mr: ""
mr_status: pending
mr_error: ""
created: "2026-05-19"
updated: "2026-05-19T23:14:00"
tasks_ref: "[[changes/fix-ux-multipage-bugs/tasks]]"
design_ref: "[[changes/fix-ux-multipage-bugs/design]]"
adr_refs:
  - "[[adrs/0004-folio-server-generated]]"

tags: [change]
---

## Intent

Fix de múltiples bugs UX/UI reportados en QA manual sobre las páginas internas del sitio. Alcance:

**/industrias**
- Selector de industrias no permite cambiar de industria (interacción rota).
- Título sobre imágenes se ve en color negro; debería ser blanco.
- Componentes pegados entre sí (falta spacing vertical entre secciones).

**/nosotros**
- Componentes carecen de espaciado entre sí; se ven pegados.

**/contacto**
- Sin espaciado entre componentes.
- Falta el ícono de WhatsApp en el bloque "WhatsApp · respuesta inmediata".

**/cotizar**
- No se puede seleccionar modalidad en el wizard → bloqueo, no avanza.
- Paso "success" muestra folio inventado y no envía email al usuario destino (no hay envío real).
- En mobile los pasos del wizard se ven mal (responsive roto).

**Global**
- Favicon actual es el default de Astro; debe ser el logo de Log ATM.

Layout del repo: el código de la app Astro vive en `{worktree}/log-atm-web-astro/` (subdirectorio), no en la raíz del worktree.

## Path Inference

- Inferred: `full` (override por usuario)
- Signals: S1=Y (gap conocido: bugs QA), S2=Y (páginas identificables), S3=N (múltiples bugs heterogéneos con decisiones pendientes)
- Override: user confirmó `full` via AskUserQuestion. Justificación: bug funcional de envío de email (/cotizar) + redesign responsive del wizard requieren exploración y diseño explícitos.
