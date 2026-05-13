---
type: change-state
change_name: "forms-email-sending"
domain: "feature"
status: active
fast_path: "full"
current_phase: sdd-archive
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify]
spec_refs: ["forms-email"]
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/forms-email-sending"
feature_branch: "feature/forms-email-sending"
integration_target: "main"
mr: ""
mr_status: pending
mr_error: ""
created: "2026-05-12"
updated: "2026-05-12"
tags: [change]
---

## Intent

Implementar envío de correos para los 3 formularios del sitio (contacto, cotización rápida hero, cotización 4 pasos) usando nodemailer + SMTP ioh. Agregar adapter Astro Node en modo hybrid, crear API routes con `prerender=false`, mailer compartido en `src/lib/`, plantillas HTML+texto, honeypot anti-spam, validación server-side con anti header-injection, y wiring del JS cliente con estados `aria-live`. Probar local en WSL2 con `astro dev`. El proyecto Astro vive en subfolder `log-atm-web-astro/`.

## Decisiones tempranas (orquestador)

- **Cadencia**: pipeline `full` completo (confirmado por usuario).
- **Astro output**: `hybrid` (estático por default, SSR solo en API routes con `prerender=false`).
- **WhatsApp en cotización rápida**: se mantiene intacto el flujo `wa.me` existente; solo se agrega el branch de Email al endpoint nuevo.
- **Package manager**: npm (lockfile existente).
- **Variables SMTP** ya provistas por el usuario en `.env`; mailer las consume vía `import.meta.env` / `process.env`. NO embedir `SMTP_PASS` en código.
