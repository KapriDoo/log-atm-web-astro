---
name: "redesign-form-email-templates"
domain: feature
fast_path: full
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/redesign-form-email-templates"
feature_branch: "feature/redesign-form-email-templates"
integration_target: "main"
status: active
current_phase: sdd-archive
phases_completed:
  - sdd-init
  - sdd-explore
  - sdd-propose
  - sdd-spec
  - sdd-design
  - sdd-tasks
  - sdd-apply
  - sdd-verify
spec_refs:
  - "[[forms-email/email-brand-identity]]"
  - "[[forms-email/email-visual-hierarchy]]"
updated: "2026-05-26"
---

## Intent

Rediseñar el HTML que se envía por correo desde los formularios del sitio. El diseño actual es muy soso/aburrido. Investigar cuántos formularios existen y aplicar un rediseño moderno al HTML de los emails. El código de emails vive en `src/lib/email-templates.ts` y `src/lib/mailer.ts`; los endpoints de formularios son `src/pages/api/contacto.ts`, `src/pages/api/cotizacion-rapida.ts` y `src/pages/api/cotizacion.ts`.
