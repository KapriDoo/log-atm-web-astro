---
type: external-input
domain: fix
change_name: fix-color-contrast-sitewide
fast_path: full
priority: P2
depends_on: [fix-a11y-and-icons]
source: ejecucion-brief-05-2026-10-02
---
# Brief 11 — Contraste de color WCAG AA en todo el sitio

**Despacho:** `sdd new fix-color-contrast-sitewide --domain fix --path full --integration-target main --input-file .sdd/briefs/auditoria-2026-10/11-fix-color-contrast-sitewide.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: barrido de axe-core en Chrome real durante `fix-a11y-and-icons` (PR #33), que corrigió solo el selector de idioma. Regla del proyecto (`log-atm-web-astro/CLAUDE.md`): **WCAG AA mínimo en todos los componentes**.

## Problema

El barrido de axe marca **43 nodos `color-contrast`** fuera del selector de idioma (umbral AA: 4.5:1 texto normal, 3:1 texto grande ≥ 24px o ≥ 18.66px bold). Casos identificados (ratios calculados con la fórmula WCAG):

| Componente | Evidencia | Actual | Umbral |
|------------|-----------|--------|--------|
| Botón CTA (`.btn--cta`): blanco sobre `--color-cta` = accent-500 `#3EB978` | `src/styles/global.css:128-136`; token `src/styles/tokens.css:28,73-75` | **2.50:1** | 4.5:1 |
| Botón WhatsApp (`.btn--wa`): blanco sobre `#25D366` (hover `#1da851`) | `src/styles/global.css:158-162`; también `.channel--wa` en `src/styles/pages/shared.css:864` | **1.98:1** | 4.5:1 |
| Botón de marca (`.btn--brand`): blanco sobre primary-500 `#4A7BB5` | `src/styles/global.css:137-141` | 4.38:1 | 4.5:1 |
| Link de navegación en hover/activo (`.nav__link:hover`, `.is-active`) | `src/components/ui/Navbar.astro:171-175` | 3.75:1 | 4.5:1 |
| Link del drawer en hover (`.nav-drawer__link:hover`) | `src/components/ui/Navbar.astro:315` | 3.95:1 | 4.5:1 |

Además: `.lang-selector__option:focus-visible` usa `outline: none` → indicador de foco débil (WCAG 2.4.7).

Los 43 nodos deben re-listarse en explore con axe en Chrome real sobre todas las páginas (es/en/pt); la tabla anterior son los casos ya localizados, no la lista completa.

## Decisiones

**Del usuario (resueltas 2026-10-02):**

1. **CTA verde (color de marca `#3EB978`)** → **DECIDIDO: (a) texto oscuro.** Fondo `#3EB978` sin cambio; texto primary-900 `#112236` (6.44:1) en normal y hover (ojo: contra el hover actual accent-600 `#339965` da **4.51:1**, al límite; en diseño elegir un hover con margen, p. ej. texto primary-950 `#0a1624` sobre accent-600 → 5.1:1, o un hover que no oscurezca el fondo). Implementar vía `--color-cta-text` (`tokens.css:75`). Opciones que se evaluaron:
   - (a) mantener el fondo `#3EB978` y usar texto oscuro primary-900 `#112236` → **6.44:1**;
   - (b) mantener texto blanco y oscurecer el fondo a accent-700 `#297A51` → **5.25:1** (cambia el verde percibido de la marca).
2. **Botón WhatsApp** → **DECIDIDO: (a) texto oscuro.** Fondo `#25D366` sin cambio; texto `#111b21` (8.80:1), verificar también contra el hover `#1da851`. Opciones que se evaluaron:
   - (a) mantener el verde WhatsApp `#25D366` con texto oscuro `#111b21` → **8.80:1**;
   - (b) texto blanco sobre el verde oscuro de WhatsApp `#075E54` → **7.67:1**. (Descartado: `#128C7E` con blanco da 4.14:1, no cumple.)

**Tomadas (sin impacto de marca):**

- `.btn--brand`: fondo primary-600 `#3b6497` (blanco → 6.08:1) y hover primary-700 (ya es `--color-brand-dark`).
- Links de navegación en hover/activo y drawer: primary-700 (`--color-brand-dark`), mismo criterio que el selector en PR #33.
- Foco visible: reemplazar `outline: none` por un indicador visible con tokens (`outline` o `box-shadow` ≥ 3:1 contra el fondo adyacente).
- Todo cambio de color vía tokens existentes o nuevos tokens semánticos en `tokens.css` (sin hex sueltos nuevos). Si se crea un token para WhatsApp, es un token **en uso** (no contradice la limpieza de tokens huérfanos del brief 07).

## Criterios de aceptación

- [ ] axe-core en Chrome real sobre todas las páginas en es/en/pt (desktop y móvil): **0 violaciones `color-contrast`**.
- [ ] Todos los estados interactivos (normal, hover, focus, activo) de botones y links cumplen ≥ 4.5:1 (o ≥ 3:1 si son texto grande, justificado).
- [ ] Ningún control interactivo usa `outline: none` sin un indicador de foco alternativo visible.
- [ ] Sin hex nuevos fuera de `tokens.css`.
- [ ] PR con tabla antes/después de cada color modificado (cambio visual explícito).

## Fuera de alcance

- Rediseño de la paleta de marca más allá de los pares que fallan.
- `scripts/axe-audit.mjs` (roto) → brief 10; usar axe-core en Chrome real como en PR #33.
