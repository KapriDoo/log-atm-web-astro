---
type: tasks
change_name: "fix-internal-heroes-animation"
created: "2026-10-02"
---

# Tasks — fix-internal-heroes-animation

Fuente: sección "Tareas sugeridas" de `input.md` (brief 04, auditoría 2026-10). Rutas de código relativas al worktree: `log-atm-web-astro/...`.

## T1 — Medir la línea base de Lighthouse en una página interna (antes del cambio)

**File**: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro (build + `astro preview`)
**Líneas/ocurrencias**: no aplica (medición)
**Acción**: Antes de tocar código, ejecutar `npm run build` y `npm run preview`, y correr Lighthouse (móvil, categoría performance como mínimo) contra una página interna con `.page-hero` (p. ej. `/servicios/`) y contra `/cotizar/` (`.quote-hero`). Para Chrome usar `CHROME_PATH` apuntando al binario en `/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/` (carpeta `linux-*`). Registrar puntaje de performance, LCP y elemento LCP en `memory/changes/fix-internal-heroes-animation/apply-evidence.md`.
**Justificación**: el brief exige comparar LCP antes/después; la línea base debe medirse sobre el código sin modificar.

**Acceptance**:
- [ ] `apply-evidence.md` registra puntaje performance, LCP y elemento LCP de la línea base para al menos `/servicios/` y `/cotizar/`, con el comando usado

## T2 — Invocar el auto-init de heroes en el nivel superior del módulo

**File**: log-atm-web-astro/src/scripts/scroll-animations.ts
**Líneas/ocurrencias**: líneas 145-159 (llamada a `init()` en :146 y listener `astro:page-load` en :149-159)
**Acción**: Extraer la detección de `.page-hero` / `.quote-hero` y las llamadas a `animatePageHero` (hoy dentro del listener, :152-158) a una función (p. ej. `initPageHeroes()`) y llamarla en el nivel superior del módulo, inmediatamente después de `init();` (:146). Mantener los defaults actuales de `animatePageHero` (stagger 0.12 s, y 24 px, 0.6 s); no pasar opciones.
**Justificación**: `astro:page-load` solo lo emite `<ClientRouter />`, que el sitio no monta; hoy los heroes de las páginas internas nunca animan. `animatePageHero` ya protege reduced-motion y usa `gsap.from` con `clearProps`, así que sin JS el contenido queda visible.

**Acceptance**:
- [ ] En carga directa de `/servicios/`, `/industrias/`, `/nosotros/`, `/contacto/` y `/cotizar/` (y sus variantes `/en/...` y `/pt/...`), los elementos `[data-hero-animate]` reciben el tween de entrada escalonada una sola vez
- [ ] Con `prefers-reduced-motion: reduce` no hay animación y el contenido es visible de inmediato
- [ ] El home anima igual que antes (sin doble animación; `HeroSection` no usa `.page-hero` ni `.quote-hero`)
- [ ] `npm run build` termina sin errores

## T3 — Eliminar el listener `astro:page-load` de scroll-animations.ts

**File**: log-atm-web-astro/src/scripts/scroll-animations.ts
**Líneas/ocurrencias**: líneas 148-159 (comentario "Auto-init tras navegación con View Transitions de Astro" y el `document.addEventListener('astro:page-load', ...)` completo)
**Acción**: Eliminar el listener y su comentario. Ajustar el comentario de :145 si menciona View Transitions de forma que deje de ser exacto. No tocar los otros scripts con el mismo patrón (fuera de alcance, brief 09).
**Justificación**: es código muerto sin router y, si se reintrodujera un router, provocaría doble animación en la primera carga.

**Acceptance**:
- [ ] `grep -n "astro:page-load" log-atm-web-astro/src/scripts/scroll-animations.ts` no devuelve resultados
- [ ] Los demás archivos de `src/scripts/` no cambian

## T4 — Medir Lighthouse después del cambio y comparar con la línea base

**File**: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro (build + `astro preview`)
**Líneas/ocurrencias**: no aplica (medición)
**Acción**: Repetir la medición de T1 (mismas páginas, mismo comando) con el cambio aplicado y registrar los resultados y la comparación en `apply-evidence.md`. Verificar que el elemento LCP no quede oculto más que la duración del tween.
**Justificación**: criterio de aceptación del brief; el proyecto exige Lighthouse ≥ 95.

**Acceptance**:
- [ ] `apply-evidence.md` registra antes/después de performance y LCP para las mismas páginas
- [ ] Performance ≥ 95 en las páginas medidas, sin degradación material de LCP respecto de la línea base

## T5 — Actualizar la spec internal-page-heroes al código

**File**: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/specs/internal-page-heroes/spec.md
**Líneas/ocurrencias**: Behavior 1 (defaults "stagger 80ms, opacity 0→1, y 16→0, 450ms") y toda mención de 4 meta-items
**Acción**: Editar en sitio: defaults a stagger 120 ms, y 24 px → 0, 600 ms; cantidad de meta-items a 2-3 por página (alineado con `industries-page-content`, `nosotros-hero-identity` y la decisión D8 de `3ae0f66`); el auto-init corre en la carga del módulo (nivel superior), no en `astro:page-load`. Pasar `status` a `completed` al cerrar.
**Justificación**: la spec `draft` describe defaults y cobertura que no coinciden con el código vigente; la decisión del usuario es alinear la spec al código.

**Acceptance**:
- [ ] La spec declara 120 ms / 24 px / 600 ms y 2-3 meta-items, y no menciona `astro:page-load` como disparador
- [ ] `status: completed`

## T6 — Delta MODIFY de scroll-inner-pages con la cobertura real

**File**: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/specs/scroll-animations/scroll-inner-pages.md
**Líneas/ocurrencias**: `acceptance_criteria` ("Las 7 páginas internas…") y secciones que describen la cobertura
**Acción**: Registrar un delta MODIFY (según la convención OpenSpec del proyecto) con la cobertura real: 5 páginas internas (no 7); entrada del hero vía `animatePageHero`; animaciones de scroll vía `CTASection` y `Footer`. No reintroducir los 18 atributos `data-scroll-*` de contenido que quitó `a3528f7` (YAGNI).
**Justificación**: la spec vigente declara una cobertura que el código ya no tiene.

**Acceptance**:
- [ ] La spec (o su delta) describe 5 páginas internas, `animatePageHero` para el hero y `CTASection`/`Footer` para scroll
- [ ] Ningún archivo de `src/` recibe atributos `data-scroll-*` nuevos
