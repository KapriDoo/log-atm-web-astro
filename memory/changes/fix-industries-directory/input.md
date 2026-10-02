---
type: external-input
domain: fix
change_name: fix-industries-directory
fast_path: apply-only
priority: P1
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 02 — Directorio de industrias: caption congelado y slides fantasma

**Despacho:** `sdd new fix-industries-directory --domain fix --path apply-only --integration-target main --input-file .sdd/briefs/auditoria-2026-10/02-fix-industries-directory.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: validación de auditoría (hallazgos B1, N2), verificado empíricamente con Chrome headless contra `astro preview`.

## Problema 1 — Caption/contador/tags congelados en "Minería · 01" (severidad Alta)

- `src/pages/industrias.astro:192` lee `window.__indDirectoryOnRender` dentro de `ready()`. El módulo se ejecuta con `readyState === 'interactive'`, por lo que `ready()` corre de inmediato.
- El script inline clásico (`:179-184`) recién asigna ese global en `DOMContentLoaded`.
- Traza medida: `GET interactive typeof=undefined` → `DOMContentLoaded` → `SET`. Resultado: al hacer clic en un ítem o con la autorrotación (cada 3,5 s), el slide cambia pero caption, contador y tags quedan en "01 / Minería".
- El comentario "orden crítico" de `:165` es falso.
- Historia: `adec814` reemplazó `astro:page-load` por `ready()`; antes el directorio completo estaba inerte porque `a2826b3` quitó `<ClientRouter />` (y `astro:page-load` no se emite sin router).

## Problema 2 — Slides fantasma tras hovers rápidos (severidad Media)

- `src/scripts/gsap-ind-directory.ts:53` usa `killTweensOf` solo sobre el slide saliente/entrante; los slides con un tween a medias quedan congelados en opacidad intermedia.
- Medido: hovers 5→2→8→1 cada 120 ms → slides 2 y 5 quedan con opacidad 0,46 **por encima** del activo.
- Incumple el AC A2 de `memory/specs/interactive-component-transitions/spec.md` (status `draft`).

## Problema 3 — AC A3 de la misma spec

- A3 exige `clearInterval` en `mouseenter`; el código solo alterna un flag `paused` (`gsap-ind-directory.ts:104-107`).
- El cleanup depende de `astro:before-swap`, que nunca se dispara (no hay router).

## Estado deseado

1. El caption, el contador y los tags siempre reflejan el slide activo (clic, hover y autorrotación).
2. En todo momento solo el slide activo tiene opacidad 1; el resto, 0.
3. La autorrotación se detiene durante el hover y se reanuda al salir (comportamiento observable).

## Decisiones tomadas (KISS)

- **Problema 1:** lookup lazy `onRender: (i) => window.__indDirectoryOnRender?.(i)` y corregir el comentario de `:165`. (Alternativa más limpia, fuera de alcance salvo que resulte trivial: mover la lógica del caption al módulo leyendo datos de `data-*`, sin global.)
- **Problema 2:** al cambiar de slide, tras `killTweensOf`, forzar `opacity: 0` (`gsap.set`) en todos los slides que no son el entrante ni el saliente.
- **Problema 3:** si el flag `paused` produce el comportamiento observable correcto, **ajustar el AC A3** para que describa comportamiento y no implementación (la spec es `draft`, se edita en sitio). No reescribir el timer.
- No tocar el cleanup basado en `astro:before-swap` (no hay router; ver deuda condicionada en brief 09).

## Criterios de aceptación

- [ ] En `/industrias`, `/en/industrias` y `/pt/industrias`: tras clic en el ítem N, caption/contador/tags muestran N; tras la autorrotación, muestran el slide visible.
- [ ] Tras cualquier secuencia de hovers rápidos (p. ej. 5→2→8→1 cada 120 ms), una vez estabilizado, solo el slide activo tiene opacidad 1.
- [ ] Durante el hover no hay rotación automática; al salir, se reanuda.
- [ ] Con `prefers-reduced-motion: reduce`, los cambios son instantáneos y sin regresiones.
- [ ] `interactive-component-transitions/spec.md`: AC A2/A3 cumplidos (A3 ajustado si corresponde) y la spec sale de `draft` al cerrar el cambio.

## Tareas sugeridas (para `tasks.md`)

1. Lookup lazy del callback en `industrias.astro:192` y corregir comentario `:165`.
2. `gsap.set` de opacidad 0 sobre slides no involucrados en `gsap-ind-directory.ts` (cerca de `:53`).
3. Ajustar AC A3 en la spec si el comportamiento observable es correcto.
4. Verificación empírica (script Playwright/CDP: clic + espera 3,5 s + lectura de caption; secuencia de hovers + opacidad computada).

## Fuera de alcance

- CTAs `/contacto` sin locale en `industrias.astro:141` → brief 03.
- Comentario de colores de industrias en `constants.ts` → brief 07.
