---
change_name: redesign-email-templates-v2
domain: feature
fast_path: full
status: completed
current_phase: ""
mr: https://github.com/KapriDoo/log-atm-web-astro/pull/24
mr_status: created
phases_completed:
  - sdd-init
  - sdd-explore
  - sdd-propose
  - sdd-spec
  - sdd-design
  - sdd-tasks
  - sdd-apply
  - sdd-verify
  - sdd-archive
spec_refs:
  - "[[forms-email/email-brand-identity]]"
  - "[[forms-email/email-section-structure]]"
  - "[[forms-email/email-cta-conditional]]"
  - "[[forms-email/email-form-differentiation]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/redesign-email-templates-v2
feature_branch: feature/redesign-email-templates-v2
integration_target: main
created: "2026-05-26"
updated: "2026-05-26"
archived_at: "2026-05-26"
verified_at: "2026-05-26"
apply_commit: "2d1a16d"
tasks_generated_at: "2026-05-26"
spec_generated_at: "2026-05-26"
design_generated_at: "2026-05-26"
---

## Intent

Rediseñar las plantillas de correo HTML de los formularios del proyecto para que coincidan 1:1 con la propuesta generada por Claude Design en correo-rediseno.html. El rediseño previo de la rama feature/redesign-form-email-templates se DESCARTA (el usuario no lo aprobó); por eso se parte del estado actual de main. Archivo objetivo: log-atm-web-astro/src/lib/email-templates.ts. Referencia de diseño 1:1: /home/kapridoo/projects/log-atm-finally/project/correo-rediseno.html. Preservar los campos dinámicos y la lógica de envío existentes — solo cambiar la presentación/HTML/CSS inline.

## Path Inference
- Inferred: full (rule 5 — default del domain `feature`)
- Signals: S1=N (no es gap/bug/CVE; es rediseño visual), S2=Y (archivo objetivo conocido: email-templates.ts), S3=N (traducir HTML de referencia a plantillas TS con campos dinámicos y compatibilidad email-client conlleva decisiones de diseño pendientes)
- Override: none
- Integration base: main (se descarta el rediseño previo de feature/redesign-form-email-templates por decisión del usuario)
- Reference asset: /home/kapridoo/projects/log-atm-finally/project/correo-rediseno.html (fuera del worktree — fases lectoras lo acceden por path absoluto)
