---
type: change-state
change_name: "rescue-multi-language-support"
domain: "feature"
status: archived
fast_path: "full"
current_phase: completed
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-design, sdd-spec, sdd-tasks, sdd-apply, sdd-verify, sdd-judgment, sdd-archive]
spec_refs:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-translations-build-validation]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-rtl-support-arabic]]"
  - "[[i18n-seo-hreflang]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/rescue-multi-language-support"
feature_branch: "feature/rescue-multi-language-support"
integration_target: "main"
mr: ""
mr_status: pending
mr_error: ""
require_judgment: false
skip_judgment: false
created: "2026-05-12"
updated: "2026-05-12"
tags: [change]
---

## Intent

Rescatar la implementación i18n del feature/multi-language-support (commit 76664bf: 6 locales es/en/zh/hi/ar/pt con routing `pages/[lang]`, translations JSON, build-hook validation, RTL para árabe) y re-aplicarla sobre `main` actual, que ha avanzado con:

- Páginas nuevas (`/servicios`, `/industrias`, `/nosotros`, `/contacto`, `/cotizar`) — commit `a3528f7`
- Pasada de a11y/UX writing — commit `b255a35`
- Fix heading order + landmark nesting (Lighthouse a11y ≈100) — commit `0e37038`
- Handoff parity home (video why, page-based nav, quick-quote CTA, hero gradient, navbar, stats, industries) — commits `603238c`, `c1d1fb1`, `8d53225`, `04a5468`

Re-aplicar i18n a **toda la superficie actual** (no solo las páginas que existían cuando se diseñó), **preservando** los criterios de accesibilidad y UX writing ya aplicados. Las ADRs y specs del worktree `preview-i18n` son referencia válida pero deben reevaluarse contra la nueva estructura.

## Referencias

- Rama origen: `feature/multi-language-support` (commit `76664bf`)
- Worktree de referencia: `.sdd/worktrees/preview-i18n/memory/`
  - `adrs/0002-i18n-routing-pages-lang-folder.md`
  - `adrs/0003-i18n-key-validation-build-hook.md`
  - `specs/i18n-translations/`, `specs/i18n-ui-selector/`, `specs/i18n-rtl-support/`
- Rama base: `main` (HEAD `00f1e9c`)
