---
capability: internal-page-heroes
change_name: gsap-pr2-internal-pages
status: draft
created: "2026-05-19"
related: [nosotros-timeline-reveal, interactive-component-transitions]
---

# Internal Page Heroes

## Propósito

Animar consistentemente los heroes de las 5 páginas internas del sitio reutilizando `animatePageHero` ya exportada por PR1. El módulo global `scroll-animations.ts` detecta automáticamente `.page-hero` y `.quote-hero` al cargar, eliminando scripts duplicados por página (Opción B aprobada en HITL). El usuario percibe el mismo lenguaje de entrada staggered en todas las páginas internas.

## Alcance

### En scope
- Auto-init en `scroll-animations.ts`: detectar `.page-hero` y `.quote-hero` al cargar el módulo y llamar `animatePageHero` si existen
- Atributo `data-hero-animate` aplicado a los elementos internos del hero en 4 páginas con `.page-hero`: eyebrow, H1, lead, meta-items
- Atributo `data-hero-animate` aplicado a los elementos internos del `.quote-hero` en `/cotizar`: H1, lead, chips
- Guard `prefersReducedMotion` heredado de la implementación de PR1 en `animatePageHero`
- Páginas cubiertas: `/servicios`, `/industrias`, `/nosotros`, `/contacto` (via `.page-hero`) y `/cotizar` (via `.quote-hero`)

### Fuera de scope
- Crear un componente `PageHero.astro` compartido (deuda técnica separada)
- Scripts inline individuales por página (Opción A descartada en HITL)
- Animaciones en elementos fuera del hero (formularios, cards, secciones de contenido)
- Páginas de sub-ruta como `/servicios/carga-aerea.astro` (ya tienen `data-scroll-animate` propios)

## Comportamientos requeridos

### Behavior 1 — Auto-init global en scroll-animations.ts

**Trigger**: carga del módulo `scroll-animations.ts` en cualquier página del sitio (via `BaseLayout.astro` L189)

**Comportamiento**:
- Al inicializar el módulo, verificar si existe `.page-hero` en el documento actual
- Si existe, invocar `animatePageHero('.page-hero')` con los defaults de PR1 (eyebrow → H1 → lead → meta-items, stagger 80ms, opacity 0→1, y 16→0, 450ms por elemento)
- Verificar si existe `.quote-hero` en el documento actual
- Si existe, invocar `animatePageHero('.quote-hero')` con selectores adaptados al markup de `/cotizar`
- Si ninguno de los dos selectores existe en la página, no ejecutar ninguna acción (comportamiento idempotente)
- El guard `prefersReducedMotion` dentro de `animatePageHero` aplica automáticamente en ambas invocaciones

**Acceptance criteria**:
- [ ] Al navegar a `/servicios`, `/industrias`, `/nosotros` o `/contacto`, los elementos del `.page-hero` aparecen con la animación staggered al cargar la página
- [ ] Al navegar a `/cotizar`, los elementos del `.quote-hero` aparecen con la misma animación staggered al cargar la página
- [ ] En páginas sin `.page-hero` ni `.quote-hero` (por ejemplo `/`), el módulo no lanza errores ni efectos secundarios
- [ ] Con `prefers-reduced-motion: reduce` activo, los elementos son visibles inmediatamente sin animación en todas las páginas

### Behavior 2 — Markup data-hero-animate en páginas con .page-hero

**Trigger**: presencia del atributo `data-hero-animate` en elementos hijos del `.page-hero` en `/servicios`, `/industrias`, `/nosotros` y `/contacto`

**Comportamiento**:
- El atributo `data-hero-animate` se aplica a los siguientes elementos en las 4 páginas:
  - `.page-hero__eyebrow` — primer elemento en animar
  - `.page-hero__title` — segundo elemento (H1)
  - `.page-hero__lead` — tercer elemento
  - Cada `.page-hero__meta-item` — animados en stagger tras lead
- Los elementos con `data-hero-animate` son detectados por `animatePageHero` como targets de la animación
- El orden DOM determina el orden de aparición en el stagger

**Acceptance criteria**:
- [ ] `servicios.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 4 meta-items de su `.page-hero`
- [ ] `industrias.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 4 meta-items de su `.page-hero`
- [ ] `nosotros.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 4 meta-items de su `.page-hero`
- [ ] `contacto.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 4 meta-items de su `.page-hero`
- [ ] Los elementos aparecen uno tras otro con stagger visible (no simultáneamente)
- [ ] Ningún elemento hero permanece invisible si JS no carga (fallback CSS sin opacity:0 inicial above-the-fold)

### Behavior 3 — Markup data-hero-animate en .quote-hero de /cotizar

**Trigger**: presencia del atributo `data-hero-animate` en elementos hijos del `.quote-hero` en `cotizar.astro`

**Comportamiento**:
- El atributo `data-hero-animate` se aplica a:
  - `.quote-hero__title` — H1 de la página de cotización
  - `.quote-hero__lead` — subtítulo/descripción
  - `.quote-hero__chips` — contenedor de chips de selección de servicio, o cada `.quote-chip` individualmente (según implementación de `animatePageHero`)
- La variante de `animatePageHero('.quote-hero')` utiliza los selectores correspondientes al markup de `/cotizar`

**Acceptance criteria**:
- [ ] Al cargar `/cotizar`, el H1 y el lead del `.quote-hero` aparecen con fade-up staggered
- [ ] Los chips del `.quote-hero` aparecen animados tras el lead
- [ ] El stepper de pasos (fuera del `.quote-hero`) no se ve afectado por esta animación
- [ ] La animación del hero no interfiere con el estado inicial del stepper (paso 0 visible, pasos 1-3 con `hidden`)

## Constraints transversales

- `prefers-reduced-motion`: `animatePageHero` ya implementa este guard en PR1. Con `reduce` activo, los elementos deben ser visibles sin animación desde el instante de carga. No se puede aplicar `gsap.set({ opacity:0 })` a elementos above-the-fold sin este guard.
- Performance: el auto-init es un `querySelector` simple ejecutado una vez al cargar. Costo despreciable. No se crean ScrollTriggers (los heroes se animan al cargar, no al hacer scroll).
- Accesibilidad: los elementos H1 y el eyebrow son content above-the-fold. No pueden quedar ocultos si JS falla. La animación parte de `opacity:0` via GSAP (no CSS), lo que garantiza que sin JS los elementos son visibles.
- Compatibilidad: el auto-init NO debe convivir con scripts inline que también llamen `animatePageHero` en la misma página. Mutuamente excluyentes. Si se añade auto-init global, no se añaden scripts inline individuales.

## Dependencias

- Plugins GSAP: solo core (ya cargado por PR1). `animatePageHero` no usa ScrollTrigger.
- Módulos del proyecto: `src/scripts/scroll-animations.ts` — contiene `animatePageHero` exportada, `prefersReducedMotion` util, y el punto de entrada para el auto-init
- Archivos de markup: `src/pages/servicios.astro`, `src/pages/industrias.astro`, `src/pages/nosotros.astro`, `src/pages/contacto.astro`, `src/pages/cotizar.astro`
- Capabilities relacionadas: [[gsap-infrastructure]] del PR1 (provee `animatePageHero`, `prefersReducedMotion`, carga global via `BaseLayout`)
