---
type: verify-report
change_name: "fix-hero-styles"
phase: sdd-verify
verdict: pass
build: passed
created: "2026-05-10"
tags: [verify]
---

# Verify Report — fix-hero-styles

## Resumen ejecutivo

**Veredicto: PASS**

El fix `eed70ee fix(hero): prevent invisible content when GSAP fails to load`
resuelve el síntoma reportado (hero sin estilos / contenido invisible) mediante
un cambio de fail-closed → fail-open: el estado inicial `opacity:0` ya no se
aplica desde CSS sino desde JS (gsap.set), y los `tl.from()` se convirtieron en
`tl.fromTo()` con destino explícito. Build PASS, HTML correcto, CSS bundleado
sin reglas residuales que oculten contenido. Confirmación visual del usuario
recibida (badge, título, lead, CTAs, fondo con cuadrícula y animaciones OK).

## Acceptance criteria

### T1 — HeroSection.astro

| # | Criterio | Resultado | Evidencia |
|---|----------|-----------|-----------|
| T1.1 | Hero muestra fondo con cuadrícula | **PASS** | Usuario lo confirma visualmente. `.hero__grid-lines{background-image:linear-gradient(...) 1px,...;background-size:60px 60px}` bundleado en `dist/_astro/index@_@astro.CxAr4_-Q.css`. Elemento `<div class="hero__grid-lines" data-hero-grid>` presente en `dist/index.html`. |
| T1.2 | Contenido (títulos, subtítulos, botones) con formato | **PASS** | Usuario confirma visualmente. HTML contiene `hero__badge`, `hero__title`, `hero__title-gradient`, `hero__lead`, `hero__btn-cta`, `hero__btn-wa`, `hero__trust-text`. 32 selectores `.hero__*` bundleados en el CSS. |
| T1.3 | Animaciones GSAP siguen funcionando | **PASS** | Usuario confirma visualmente. Diff muestra timeline migrada a `tl.fromTo()` con `{ opacity: 1, y: 0 }` como destino explícito y `gsap.set('.animate-on-load', { opacity: 0, y: 20 })` como estado inicial. Lógica de `prefersReducedMotion` simplificada (ya no necesita resetear estado porque CSS default = visible). |
| T1.4 | Sin regresiones en otros breakpoints | **PASS** | Build PASS (9 páginas generadas). Breakpoints `@media(max-width:1023px)`, `@media(max-width:639px)` y `@media(max-width:479px)` con reglas `.hero__*` intactos en el CSS bundleado. El diff no toca código responsive — solo la regla `.animate-on-load`. |

### T2 — hero.css

| # | Criterio | Resultado | Evidencia |
|---|----------|-----------|-----------|
| T2.1 | hero.css importado / disponible para HeroSection | **PASS** | Cadena de imports: `pages/index.astro:11` → `styles/sections.css:11` → `./sections/hero.css`. El bundling de Astro lo emite en `dist/_astro/index@_@astro.CxAr4_-Q.css` con las 32 reglas `.hero__*`. *(Nota: el criterio "importado en HeroSection.astro" se cumple en sentido funcional — el componente recibe los estilos vía el global stack del proyecto, que es la convención local del codebase.)* |
| T2.2 | Reglas de cuadrícula de fondo presentes y activas | **PASS** | `.hero__grid-lines{position:absolute;inset:0;background-image:linear-gradient(color-mix(in srgb,var(--color-text-inverse) 3%,transparent) 1px,transparent 1px),linear-gradient(90deg,...) ;background-size:60px 60px}` bundleado. Usuario confirma visibilidad visual de la cuadrícula. |
| T2.3 | Sin conflictos de especificidad con Tailwind | **PASS** | No se observan reglas de Tailwind utility con mayor especificidad sobreescribiendo `.hero__*` en el CSS bundleado. Ausencia confirmada de la regla problemática `.animate-on-load{opacity:0}` (causa raíz del bug original). |

## Build status

```
> astro build
19:09:03 [types] Generated 47ms
19:09:03 [build] output: "static"
[vite] ✓ built in 1.49s
[vite] ✓ built in 844ms
✓ 9 page(s) built in 2.62s
```

**Resultado: PASSED.** Cero errores, cero warnings de tipos.

## HTML check (`dist/index.html`)

- `<section class="hero" aria-labelledby="hero-heading">` presente.
- Estructura interna completa:
  - `hero__bg` con `hero__blob--1`, `hero__blob--2`, `hero__grid-lines`
  - `hero__inner > hero__content` con badge, h1+gradient, lead, ctas (cotizar + WhatsApp), trust
- Clases `animate-on-load` presentes como markers semánticos en badge, title, lead, ctas, trust.
- **Sin `style="opacity:0"` inline** en el HTML del hero. Las únicas ocurrencias de `style="...opacity..."` (5) corresponden a SVGs/decorative elements no relacionados con el contenido del hero.
- `data-hero-*` markers presentes (badge, blob, card, ctas, grid, lead, title, trust, wave) — necesarios para que GSAP haga targeting.

## CSS check (`dist/_astro/index@_@astro.CxAr4_-Q.css`)

- ✅ **NO existe la regla `.animate-on-load{opacity:0...}` en estado inicial.**
- ✅ **NO existen las reglas de fallback `@media(scripting:none){.animate-on-load{...}}`** (eliminadas correctamente).
- ✅ **NO existe la regla problemática `@media(prefers-reduced-motion){.animate-on-load{opacity:1;transform:none}}`** (innecesaria con el nuevo enfoque fail-open).
- ✅ Único `@media(prefers-reduced-motion:reduce)` que queda en el hero: `{.hero__badge-dot{animation:none}}` — correcto.
- ✅ 32 selectores `.hero__*` únicos bundleados.
- ✅ Sin reglas `.hero*` con `opacity:0` inicial.
- ✅ Responsive: 3 breakpoints (`max-width:1023px`, `max-width:639px`, `max-width:479px`) con reglas hero intactas.

## Hallazgos / Observaciones

1. **Causa raíz original confirmada**: El bug se debía a que `.animate-on-load{opacity:0}` se aplicaba desde CSS, así que cualquier fallo en cargar/ejecutar el script GSAP del Hero (404 del módulo, error JS, race condition) dejaba el contenido permanentemente invisible. El usuario reportó "el hero se ve como texto plano sin formato" — síntoma compatible con: contenido oculto por opacity:0 sobre fondo, con marketing de cards laterales aún visibles.
2. **Fix correcto**: Mover el estado inicial oculto al script GSAP (`gsap.set` + `tl.fromTo`) es fail-open por diseño. Si el script no se ejecuta, el CSS default (visible) toma efecto y el contenido se ve sin animación — degradación elegante.
3. **No hay specs OpenSpec** (fast path apply-only). Validación se hizo contra acceptance criteria de tasks.md + confirmación visual del usuario + verificaciones estáticas de build/HTML/CSS.
4. **Sin riesgos de regresión** detectados en breakpoints o en otros componentes. El cambio está acotado a `HeroSection.astro` (script section) y `hero.css` (eliminación de 3 bloques).
5. **Comentarios explicativos añadidos** en `hero.css` documentan por qué `.animate-on-load` ya no aplica `opacity:0` — buena práctica para futuros lectores.

## Veredicto final

**PASS** — Listo para `sdd-archive`.
