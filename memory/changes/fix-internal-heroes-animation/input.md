---
type: external-input
domain: fix
change_name: fix-internal-heroes-animation
fast_path: apply-only
priority: P2
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 04 — Animar los heroes de las páginas internas

**Despacho:** `sdd new fix-internal-heroes-animation --domain fix --path apply-only --integration-target main --input-file .sdd/briefs/auditoria-2026-10/04-fix-internal-heroes-animation.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: validación de auditoría (hallazgo B2). **Decisión del usuario (2026-10-02): se animan** (no se retira el markup).

## Problema

- `src/scripts/scroll-animations.ts:149-159`: `animatePageHero('.page-hero')` y `animatePageHero('.quote-hero')` solo se invocan dentro del listener `astro:page-load`.
- El sitio no monta `<ClientRouter />` (no hay `astro:transitions` en `src/`), y en Astro 6 `astro:page-load` solo lo emite el router → el listener nunca corre.
- Verificado empíricamente: en `/servicios/`, `/industrias/`, `/nosotros/`, `/contacto/` (`.page-hero`) y `/cotizar/` (`.quote-hero`), 0 elementos `[data-hero-animate]` reciben tween; son 24 atributos inertes (más las variantes `/en` y `/pt`). El home no está afectado (`HeroSection` usa su propio `ready()`).
- `animatePageHero` (`:61-77`) ya protege reduced-motion (`if (prefersReducedMotion) return;`) y usa `gsap.from` con `clearProps` (si JS falla, el contenido queda visible).

## Estado deseado

Los heroes de las 5 páginas internas (en los 3 idiomas) ejecutan la entrada escalonada una vez en la carga de la página.

## Decisiones tomadas (KISS/YAGNI)

- Invocar el auto-init de heroes en el nivel superior del módulo, junto a `init()` (`scroll-animations.ts:146`).
- **Eliminar el listener `astro:page-load` de este archivo**: es código muerto (no hay router) y, si algún día se reintrodujera un router, provocaría doble animación en la primera carga. Los otros 6 scripts con el mismo patrón quedan fuera de alcance (deuda condicionada, ver brief 09).
- Defaults de la animación: **se mantienen los del código** (stagger 120 ms, y 24 px, 600 ms) y se alinea la spec al código.
- **No** se reintroducen los 18 atributos `data-scroll-*` de contenido que quitó `a3528f7` (YAGNI); la spec `scroll-inner-pages` se actualiza a la cobertura real.

## Specs afectadas

- `memory/specs/internal-page-heroes/spec.md` (`draft`): editar en sitio — defaults (spec dice 80 ms / y16 / 450 ms; código 120 ms / y24 / 600 ms) y cantidad de meta-items (spec pide 4; las specs vigentes posteriores `industries-page-content`, `nosotros-hero-identity` y la decisión D8 de `3ae0f66` fijan 2-3 por página). Pasar a `completed` al cerrar.
- `memory/specs/scroll-animations/scroll-inner-pages.md`: delta MODIFY con la cobertura real (5 páginas internas, no 7; entrada del hero vía `animatePageHero`; animaciones de scroll vía `CTASection` y `Footer`).

## Criterios de aceptación

- [ ] En `/servicios`, `/industrias`, `/nosotros`, `/contacto` y `/cotizar` (y `/en/...`, `/pt/...`), los elementos `[data-hero-animate]` animan en la carga directa de la URL, con stagger visible y una sola vez.
- [ ] Con `prefers-reduced-motion: reduce`: sin animación, contenido visible de inmediato.
- [ ] El home sigue animando igual (sin doble animación).
- [ ] Sin JS, el contenido del hero es visible.
- [ ] LCP de las páginas internas no se degrada de forma material respecto de la línea base (medir antes/después con Lighthouse en `astro preview`; el elemento LCP no debe quedar oculto más de la duración del tween). Requisito del proyecto: Lighthouse ≥ 95.
- [ ] Specs `internal-page-heroes/spec.md` y `scroll-inner-pages.md` actualizadas según lo anterior.

## Tareas sugeridas (para `tasks.md`)

1. Extraer el auto-init de heroes a una función y llamarla en el nivel superior de `scroll-animations.ts`, después de `init()`.
2. Eliminar el listener `astro:page-load` de `scroll-animations.ts` (y su comentario).
3. Medición Lighthouse antes/después en una página interna.
4. Actualizar `internal-page-heroes/spec.md` y delta de `scroll-inner-pages.md`.
