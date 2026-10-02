---
type: tasks
change_name: "fix-industries-directory"
created: "2026-10-02"
---

# Tasks — fix-industries-directory

> Fuente: brief `.sdd/briefs/auditoria-2026-10/02-fix-industries-directory.md` (sección «Tareas sugeridas»).
> Rutas relativas al worktree `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`.
> `src/pages/[lang]/industrias.astro` reutiliza `src/pages/industrias.astro` (`import RootPage`), por lo que un solo archivo cubre es/en/pt.

## T1 — Lookup lazy del callback de caption en industrias.astro

**File**: `log-atm-web-astro/src/pages/industrias.astro`
**Líneas/ocurrencias**: línea 192 (`const onRender = (window as ...).__indDirectoryOnRender;`) y comentario de la línea 165 (`// Asignar ANTES de que initIndDirectory lo consuma (orden crítico)`)
**Acción**:
- Reemplazar la lectura eager del global en `initIndustrias()` por un lookup lazy: `onRender: (i) => window.__indDirectoryOnRender?.(i)` (con el cast de tipo de `Window` que ya usa el archivo).
- Reescribir el comentario de la línea 165 para que describa el contrato real: el módulo resuelve el callback en cada render, por lo que el orden de asignación entre el script inline y el módulo no importa.
**Justificación**: el módulo corre con `readyState === 'interactive'`, de modo que `ready()` ejecuta `initIndustrias()` antes del `DOMContentLoaded` en que el inline asigna el global; la lectura eager captura `undefined` y el caption queda congelado en «01 / Minería». El lookup lazy elimina la dependencia de orden sin mover lógica (decisión KISS del brief).

**Acceptance**:
- [ ] En `/industrias`, `/en/industrias` y `/pt/industrias`, tras clic en el ítem N, caption, contador y tags muestran N.
- [ ] Tras la autorrotación (3,5 s), caption, contador y tags muestran el slide visible.
- [ ] El comentario de la línea 165 ya no afirma un «orden crítico».

## T2 — Forzar opacidad 0 en los slides no involucrados tras killTweensOf

**File**: `log-atm-web-astro/src/scripts/gsap-ind-directory.ts`
**Líneas/ocurrencias**: función `render()`, inmediatamente después de `gsap.killTweensOf(slides);` (línea 53)
**Acción**: tras `killTweensOf`, aplicar `gsap.set(..., { opacity: 0 })` a todos los slides que no son `previousSlide` ni `newSlide`. El set aplica también con `prefersReducedMotion` (cambio instantáneo, sin tween).
**Justificación**: `killTweensOf` congela los tweens a medias de slides que dejaron de ser entrante/saliente; con hovers 5→2→8→1 cada 120 ms los slides 2 y 5 quedan en opacidad 0,46 por encima del activo. Forzar 0 en el resto garantiza que solo el activo quede visible (AC A2 de `interactive-component-transitions`).

**Acceptance**:
- [ ] Tras la secuencia de hovers 5→2→8→1 cada 120 ms, una vez estabilizada, solo el slide activo tiene opacidad computada 1; el resto, 0.
- [ ] Con `prefers-reduced-motion: reduce`, los cambios de slide son instantáneos y sin regresiones (el activo visible, el resto en 0).

## T3 — Ajustar el AC A3 de interactive-component-transitions a comportamiento observable

**File**: `memory/specs/interactive-component-transitions/spec.md`
**Líneas/ocurrencias**: sección «Behavior A3 — Fix bug clearInterval y coordinación con autorotación» (comportamiento y acceptance criteria); frontmatter `status: draft`
**Acción**:
- Verificar empíricamente que el flag `paused` (`gsap-ind-directory.ts:104-107`) produce el comportamiento observable: sin rotación automática durante el hover, reanudación al salir. Si es así, NO reescribir el timer: reescribir A3 para que describa comportamiento (pausa durante hover/foco, reanudación al salir, un solo interval activo) en vez de exigir `clearInterval` en `mouseenter`.
- No tocar el cleanup basado en `astro:before-swap` (no hay router; deuda condicionada en el brief 09). Ajustar en A3 el AC de «ViewTransitions» para que no exija un comportamiento que el sitio sin router no tiene.
- Pasar la spec de `status: draft` a `status: completed` si A1–A4 y los behaviors del stepper que la spec declara quedan cumplidos según el código actual; si alguno no lo está, mantener `draft` y declararlo en el envelope.
**Justificación**: la spec está en `draft` y se edita en sitio (decisión del brief); exigir `clearInterval` describe implementación, no comportamiento.

**Acceptance**:
- [ ] Durante el hover sobre `#ind-directory` no hay rotación automática; al salir, se reanuda (medido).
- [ ] A3 describe comportamiento observable y es coherente con el código.
- [ ] El `status` de la spec refleja el cumplimiento real de sus ACs.

## T4 — Verificación empírica en es/en/pt

**File**: script de verificación temporal en el directorio de temporales del despacho (no se versiona)
**Líneas/ocurrencias**: —
**Acción**: build + `astro preview` del proyecto en `log-atm-web-astro/`; con `playwright-core` (caché de npx) y el Chrome ya presente en `/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/` (gitignored, en el repo principal; solo lectura), medir en `/industrias`, `/en/industrias` y `/pt/industrias`:
- caption/contador/tags tras clic en un ítem y tras esperar la autorrotación de 3,5 s;
- opacidad computada de todos los slides tras hovers 5→2→8→1 cada 120 ms y estabilización;
- ausencia de rotación durante el hover y reanudación al salir;
- comportamiento con `prefers-reduced-motion: reduce` (emulado).
Al terminar, bajar el servidor de preview.
**Justificación**: los defectos son de orden de ejecución y de estado de tweens en runtime; solo se observan en navegador real.

**Acceptance**:
- [ ] Evidencia (comando + salida) de cada medición en las tres rutas.
- [ ] `npm run build` (o el comando de build del proyecto) termina sin errores.
- [ ] El servidor de preview queda detenido al cierre.

## Fuera de alcance

- CTAs `/contacto` sin locale en `industrias.astro:141` → brief 03.
- Comentario de colores de industrias en `constants.ts` → brief 07.
