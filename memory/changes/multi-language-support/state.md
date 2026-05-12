---
type: change-state
change_name: "multi-language-support"
domain: "feature"
status: active
fast_path: "full"
current_phase: sdd-verify
phases_completed: [sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply]
spec_refs:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-rtl-support-arabic]]"
  - "[[i18n-seo-hreflang]]"
  - "[[i18n-typography-system-fonts]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support"
feature_branch: "feature/multi-language-support"
integration_target: "main"
mr: ""
mr_status: pending
mr_error: ""
created: "2026-05-11"
updated: "2026-05-12"
sdd_verify_attempted: "2026-05-12"
sdd_verify_verdict: "FAIL"
sdd_apply_completed: "2026-05-12"
sdd_tasks_completed: "2026-05-12"
spec_phase_completed: "2026-05-11"
exploration_completed: "2026-05-11"
tags: [change]
---

## Intent

Implementar soporte multi-idioma en el sitio Astro. Idioma principal: español. Añadir los 5 idiomas más hablados del mundo (inglés, mandarín, hindi, árabe, portugués) según hablantes nativos + L2.

Alcance esperado:
- Configurar routing i18n nativo de Astro (`/`, `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`).
- Estructura de archivos de traducción (JSON o equivalente).
- Selector de idioma en UI (header/menu).
- Soporte RTL para árabe.
- SEO: `hreflang`, `lang` attribute en `<html>`.
- Fallback a español si la traducción falta.
