---
type: change-state
change_name: "fix-content-followups"
domain: fix
status: completed
fast_path: "apply-only"
current_phase: ""
phases_completed: [sdd-init, sdd-apply, sdd-verify, sdd-archive]
spec_refs: []
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-content-followups"
feature_branch: "feature/fix-content-followups"
integration_target: "main"
mr_url: ""
mr_status: pending
mr_error: ""
created: "2026-07-05"
updated: "2026-07-05"
commits: [b87f943, 03d077c, 5e1d2a4, a19596f, de3b0d2, 0bc3d3e]
require_judgment: false
skip_judgment: false
tags: [change]
---

## Intent

Correcciones de seguimiento post PR #28 (5 ítems concretos), en los 3 idiomas donde aplique:
1. Contraste: el `<h2 class="process-strip__title">` "Un proceso predecible en 6 pasos." (sección "Cómo trabajamos" de /servicios) queda en texto oscuro sobre fondo oscuro porque hereda la regla global `h1..h6{color:var(--color-neutral-900)}`. Darle color claro explícito (`--color-text-inverse`) en `src/styles/pages/shared.css`, igual que ya se hizo con `.process-step__title`.
2. Quitar la mención "OEA" en `docs/project-brief.md` (línea "…IATA, FIATA, BASC, ISO 9001, Aduana Chile (OEA).").
3. Deuda DRY: `src/layouts/BaseLayout.astro` tiene teléfono/email hardcodeados en el JSON-LD (`schemaLocalBusiness`, `telephone: '+56982708492'`, `email: 'contacto@logatm.com'`). Importar `SITE` de `../lib/constants` y usar `SITE.phone`/`SITE.email`.
4. Reencuadrar "20+ / Años de operación" (implica antigüedad de la empresa, contradice "Desde 2023") a experiencia del EQUIPO/profesionales: claves `nosotros.metaYears` y `home.hero.stripStats[0]` (es/en/pt) + `HERO_STRIP_STATS[0].label` en `constants.ts`.
5. Reencuadrar "20+ / Años de expertise" a experiencia del equipo: clave `industrias.metaExpertise` (es/en/pt).
(`STATS[0].label` en constants.ts es dead code no renderizado → fuera de alcance.)
