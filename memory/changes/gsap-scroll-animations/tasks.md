---
type: tasks
change_name: "gsap-scroll-animations"
created: "2026-05-10"
updated: "2026-05-10"
tags: [tasks]
---

# Tareas de Implementación — gsap-scroll-animations

## Orden de ejecución

```
T1 → T2 → T3 (depende de T1+T2)
              T4 (depende de T1+T2)
              T5 (depende de T1+T2)
              T6 (depende de T1+T2)
              T7 (depende de T1+T2)
T3-T7 pueden ejecutarse en paralelo entre sí.
```

---

## Spec: scroll-entrance-utility

### T1: Crear src/scripts/scroll-animations.ts

**Archivos**: `src/scripts/scroll-animations.ts` (CREAR)

**Qué hacer**:
- [ ] Importar `gsap` y `ScrollTrigger` desde `gsap/ScrollTrigger`
- [ ] Registrar `gsap.registerPlugin(ScrollTrigger)` una sola vez (AD-01)
- [ ] Exportar constante `prefersReducedMotion` usando `window.matchMedia('(prefers-reduced-motion: reduce)').matches` (AD-02)
- [ ] Definir objeto `DEFAULTS` con: `duration: 0.8`, `ease: 'power2.out'`, `y: 30`, `x: 40`, `staggerBatch: 0.15`, `triggerStart: 'top 85%'`
- [ ] Definir tipo `AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in'`
- [ ] Implementar `getFromVars(type)` que retorna las props iniciales según tipo de animación
- [ ] Implementar `getToVars(type)` que retorna `{ opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' }`
- [ ] Implementar `initBatchContainers()`: buscar `[data-scroll-batch]`, aplicar `gsap.set()` a hijos con `[data-scroll-animate]`, usar `ScrollTrigger.batch()` con `once: true` (AD-03, AD-04)
- [ ] Implementar `initIndividualElements()`: buscar `[data-scroll-animate]` no dentro de `[data-scroll-batch]`, aplicar `gsap.set()`, usar `gsap.fromTo()` con ScrollTrigger individual (AD-03)
- [ ] Implementar `init()` que sale inmediatamente si `prefersReducedMotion`, de lo contrario llama a `initBatchContainers()` y luego `initIndividualElements()`
- [ ] Invocar `init()` al final del módulo

**Criterio de completado**: El archivo existe, compila sin errores, exporta `prefersReducedMotion`, y el init descubre y anima automáticamente cualquier elemento con `data-scroll-animate`.

### T2: Integrar scroll-animations en BaseLayout.astro

**Archivos**: `src/layouts/BaseLayout.astro` (MODIFICAR)

**Qué hacer**:
- [ ] Agregar `<script>import '../scripts/scroll-animations';</script>` dentro del `<body>`, después del `<slot />`

**Criterio de completado**: El import existe en BaseLayout, se carga como módulo ES en todas las páginas.

---

## Spec: scroll-stats-counters

### T3: Agregar data-attributes y script de contadores a StatsSection

**Archivos**: `src/components/sections/StatsSection.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer**:
- [ ] Agregar `data-scroll-animate` a los elementos de entrada genérica de la sección (título, contenedor de stats)
- [ ] Agregar `data-counter-target="X"` a cada elemento `<strong>` de valor numérico (donde X es el valor objetivo: 20, 70, 98, etc.)
- [ ] Agregar `data-counter-suffix="+"` o `data-counter-suffix="%"` donde corresponda
- [ ] NO agregar `data-counter-target` al cuarto stat si su valor es texto libre (no numérico)
- [ ] Agregar inline `<script>` al componente con la lógica de contadores:
  - Importar `gsap`, `ScrollTrigger` desde `gsap/ScrollTrigger`, y `prefersReducedMotion` desde `../scripts/scroll-animations`
  - Envolver toda la lógica en `if (!prefersReducedMotion)`
  - Usar `ScrollTrigger.create()` con trigger `.stats`, start `top 80%`, `once: true`
  - En `onEnter`: iterar `[data-counter-target]`, crear `gsap.to(obj, { val: target, duration: 2, ease: 'power2.out', snap: { val: 1 } })` actualizando `el.textContent`

**Criterio de completado**: Los números se animan de 0 al valor target al scroll. Los sufijos se preservan. `once: true` impide re-trigger.

---

## Spec: scroll-why-reveal

### T4: Agregar data-attributes y script de clip-path a WhySection

**Archivos**: `src/components/sections/WhySection.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer**:
- [ ] Agregar `data-scroll-animate` con `data-scroll-delay` escalonado a los why items y textos (título, párrafos, argumentos)
- [ ] Agregar inline `<script>` al componente con la lógica de clip-path reveal:
  - Importar `gsap`, `ScrollTrigger`, y `prefersReducedMotion` desde `../scripts/scroll-animations`
  - Envolver toda la lógica en `if (!prefersReducedMotion)`
  - Seleccionar `.why__img-wrap` y aplicar `gsap.set(imgWrap, { clipPath: 'inset(15% 15% 15% 15%)' })`
  - Animar con `gsap.to(imgWrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' })` con ScrollTrigger en `.why`, start `top 75%`, `once: true`

**Criterio de completado**: La imagen se revela con clip-path al scroll. Los textos entran con fade-up escalonado via el sistema genérico.

---

## Spec: scroll-cta-blobs

### T5: Agregar data-attributes y script de blobs ambient a CTASection

**Archivos**: `src/components/sections/CTASection.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer**:
- [ ] Agregar `data-scroll-animate` a los elementos de contenido de la sección (título, texto, botones/actions)
- [ ] Agregar inline `<script>` al componente con la lógica de blobs ambient:
  - Importar `gsap` y `prefersReducedMotion` desde `../scripts/scroll-animations`
  - NO necesita ScrollTrigger (es animación ambient continua)
  - Envolver en `if (!prefersReducedMotion)`
  - Seleccionar `.cta-section__blob--1` y `.cta-section__blob--2`
  - Blob 1: `gsap.to(blob1, { y: -20, scale: 1.08, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })`
  - Blob 2: `gsap.to(blob2, { y: 15, scale: 1.05, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })`

**Criterio de completado**: Los blobs flotan continuamente con movimiento orgánico. Los textos del CTA entran con el sistema genérico.

---

## Spec: scroll-inner-pages

### T6: Migrar servicios e industrias (remover CSS, agregar data-attributes)

**Archivos**: `src/pages/servicios.astro`, `src/pages/industrias.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer en cada archivo**:
- [ ] **servicios.astro** — Remover del `<style>`: la regla `opacity: 0` de las cards, `animation: fadeInUp ...`, `animation-delay: var(--delay)`, y el bloque `@keyframes fadeInUp { ... }`
- [ ] **servicios.astro** — Remover del HTML: los atributos inline `style="--delay: ..."` de cada card
- [ ] **servicios.astro** — Agregar `data-scroll-batch` al contenedor grid de cards
- [ ] **servicios.astro** — Agregar `data-scroll-animate` a cada card dentro del grid
- [ ] **servicios.astro** — Agregar `data-scroll-animate` a elementos de header de la página (título, subtítulo)
- [ ] **industrias.astro** — Remover del `<style>`: la regla `opacity: 0` de las cards, `animation: fadeInUp ...`, `animation-delay: var(--delay)`, y el bloque `@keyframes fadeInUp { ... }`
- [ ] **industrias.astro** — Remover del HTML: los atributos inline `style="--delay: ..."` de cada card
- [ ] **industrias.astro** — Agregar `data-scroll-batch` al contenedor grid de cards
- [ ] **industrias.astro** — Agregar `data-scroll-animate` a cada card dentro del grid
- [ ] **industrias.astro** — Agregar `data-scroll-animate` a elementos de header de la página (título, subtítulo)

**Criterio de completado**: No queda CSS `fadeInUp` ni `opacity: 0` en estas páginas. Las cards usan el sistema genérico con batch. Contenido visible sin JS.

### T7: Agregar data-attributes a las 5 páginas internas restantes

**Archivos**: `src/pages/nosotros.astro`, `src/pages/cotizar.astro`, `src/pages/contacto.astro`, `src/pages/servicios/carga-aerea.astro`, `src/pages/servicios/carga-maritima.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer**:
- [ ] **nosotros.astro** — Agregar `data-scroll-animate` a about-cards/secciones de contenido, quote/citas
- [ ] **cotizar.astro** — Agregar `data-scroll-animate` a las secciones del formulario y contenido asociado
- [ ] **contacto.astro** — Agregar `data-scroll-animate` a las secciones de contacto (info, formulario, mapa)
- [ ] **carga-aerea.astro** — Agregar `data-scroll-animate` a feature-cards y hero content. Agregar `data-scroll-batch` si hay grid con ≥5 cards
- [ ] **carga-maritima.astro** — Agregar `data-scroll-animate` a feature-cards y hero content. Agregar `data-scroll-batch` si hay grid con ≥5 cards

**Criterio de completado**: Cada página muestra entradas scroll-triggered consistentes con el homepage.

---

## Spec: scroll-entrance-utility (homepage sections — data-attributes)

### T8: Agregar data-attributes a ServicesSection e IndustriesSection del homepage

**Archivos**: `src/components/sections/ServicesSection.astro`, `src/components/sections/IndustriesSection.astro` (MODIFICAR)

**Dependencias**: T1, T2

**Qué hacer**:
- [ ] **ServicesSection.astro** — Agregar `data-scroll-animate` a los elementos de header (título, subtítulo)
- [ ] **ServicesSection.astro** — Agregar `data-scroll-batch` al grid de cards de servicios
- [ ] **ServicesSection.astro** — Agregar `data-scroll-animate` a cada card de servicio dentro del grid
- [ ] **IndustriesSection.astro** — Agregar `data-scroll-animate` a los elementos de header (título, subtítulo)
- [ ] **IndustriesSection.astro** — Agregar `data-scroll-batch` al grid de cards de industrias
- [ ] **IndustriesSection.astro** — Agregar `data-scroll-animate` a cada card de industria dentro del grid

**Criterio de completado**: Ambas secciones del homepage muestran entradas por scroll con batch en sus grids.

---

## Spec: scroll-404-effect

### T9: Agregar script bounce a la página 404

**Archivos**: `src/pages/404.astro` (MODIFICAR)

**Dependencias**: T1 (para `prefersReducedMotion`)

**Qué hacer**:
- [ ] Agregar inline `<script>` al componente:
  - Importar `gsap` y `prefersReducedMotion` desde `../scripts/scroll-animations`
  - NO necesita ScrollTrigger (animación en page load)
  - Envolver en `if (!prefersReducedMotion)`
  - Seleccionar `.error-page__code` (o selector equivalente del "404")
  - Animar con `gsap.fromTo(code, { scale: 0.5, opacity: 0, rotation: -5 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' })`

**Criterio de completado**: El "404" aparece con bounce al cargar. One-shot, no se repite. Respeta reduced-motion.

---

## T10: Verificación final — build y revisión visual

**Dependencias**: T1-T9

**Qué hacer**:
- [ ] Ejecutar `npm run build` (o equivalente) y verificar que no hay errores de compilación
- [ ] Verificar en dev server que las animaciones se disparan correctamente en cada sección
- [ ] Verificar que `prefers-reduced-motion: reduce` desactiva todas las animaciones
- [ ] Verificar que servicios/industrias no tienen restos de CSS fadeInUp
- [ ] Verificar que sin JS el contenido es visible (no hay opacity:0 en CSS)

**Criterio de completado**: Build exitoso, animaciones funcionando, accesibilidad respetada, migración CSS completa.
