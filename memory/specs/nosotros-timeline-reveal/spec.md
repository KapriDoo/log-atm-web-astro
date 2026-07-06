---
capability: nosotros-timeline-reveal
change_name: gsap-pr2-internal-pages
status: draft
created: "2026-05-19"
related: [internal-page-heroes]
supersedes: null
superseded_by: "[[content-nosotros/nosotros-no-timeline-section]]"
updated: "2026-07-05"
---

# Nosotros Timeline Reveal

## Propósito

Revelar progresivamente la línea de tiempo horizontal de la página `/nosotros` mediante una animación coordinada activada por scroll. La línea decorativa se extiende de izquierda a derecha primero, y los 5 hitos del recorrido histórico de la empresa aparecen en stagger ordenado reforzando la lectura cronológica izquierda→derecha. El efecto hace visible la narrativa de crecimiento de la empresa antes de que el usuario la lea.

## Alcance

### En scope
- Reveal animado del elemento `div.timeline__line` con `scaleX 0→1` desde `transform-origin: left`
- Reveal staggered de los 5 `div.timeline__item` con fade-up tras la línea
- ScrollTrigger con `start: top 70%` y `once: true`
- Orquestación con `gsap.timeline()` para garantizar secuencia línea + items sin silencios visuales
- Módulo encapsulado `src/scripts/gsap-timeline-reveal.ts` que exporta `initTimelineReveal(rootSelector)`
- Guard `prefersReducedMotion` antes de ejecutar cualquier animación
- Coordinación visual con `.timeline__dot` (position:absolute sobre los items)

### Fuera de scope
- Animaciones en viewport móvil ≤900px (orientación vertical — verificación visual solamente)
- Animación de texto dentro de los items (`.timeline__year`, `.timeline__milestone`, `.timeline__desc`)
- Efectos hover sobre los items
- ScrollSmoother o efectos de parallax
- Cambios en el markup HTML de la sección timeline

## Comportamientos requeridos

### Behavior 1 — Reveal de la línea decorativa

**Trigger**: el contenedor `.timeline__track` entra en viewport al 70% desde el top (ScrollTrigger `start: top 70%`)

**Comportamiento**:
- `div.timeline__line` inicia invisible con `scaleX: 0` y `transformOrigin: 'left'`
- Se anima a `scaleX: 1` con duración 0.6s y ease `power2.out`
- La animación parte desde el extremo izquierdo y se extiende hacia la derecha, revelando el recorrido temporal
- Al completarse, la línea ocupa su ancho natural (`left:0; right:0`)

**Acceptance criteria**:
- [ ] Al hacer scroll hasta la sección timeline en `/nosotros`, la línea `div.timeline__line` aparece creciendo de izquierda a derecha
- [ ] La duración del reveal de la línea es perceptiblemente ~0.6s
- [ ] El `transform-origin` está en el extremo izquierdo (la animación no crece desde el centro)
- [ ] La línea NO es visible antes de que el ScrollTrigger se dispare

### Behavior 2 — Reveal staggered de los timeline items

**Trigger**: mismo ScrollTrigger del Behavior 1. Los items comienzan a aparecer solapándose con el final del reveal de la línea (`'-=0.2'` en `gsap.timeline()`)

**Comportamiento**:
- Los 5 `div.timeline__item` parten con `opacity: 0` y `y: 20` (20px hacia abajo)
- Se animan a `opacity: 1` y `y: 0` en stagger de 0.1s entre items, 0.5s de duración por item, ease `power2.out`
- El stagger sigue el orden DOM (izquierda a derecha): 2003, 2009, 2014, 2020, 2024
- El inicio del stagger se produce 0.4s después del inicio de la línea (o con offset `-=0.2` respecto al final de la línea, lo que antes ocurra según configuración del `gsap.timeline()`)
- Los `.timeline__dot` dentro de cada item se mueven junto con su item padre (son hijos del DOM, no animados de forma independiente)

**Acceptance criteria**:
- [ ] Los 5 items aparecen uno tras otro de izquierda a derecha, no simultáneamente
- [ ] El primer item comienza a aparecer antes de que la línea haya terminado su reveal (solapamiento de 0.2s)
- [ ] Los `.timeline__dot` (círculos azules `position:absolute top:-8px`) se revelan junto con su item, sin artefactos de posición
- [ ] El efecto completo (línea + 5 items) termina en aproximadamente 1.5s desde el trigger
- [ ] La animación ocurre solo una vez por sesión de página (`once: true`); hacer scroll de vuelta no la repite

### Behavior 3 — ScrollTrigger y activación una sola vez

**Trigger**: scroll hasta que `.timeline__track` (contenedor padre) cruza el 70% del viewport desde arriba

**Comportamiento**:
- ScrollTrigger configurado con `start: 'top 70%'` y `once: true`
- El trigger se adjunta al contenedor `.timeline__track` como `trigger`
- `scrub: false` — la animación no sigue el scroll, se dispara y completa de forma independiente
- Al destruirse el componente (ViewTransitions de Astro), el ScrollTrigger se limpia correctamente

**Acceptance criteria**:
- [ ] Con viewport al 70% de la sección timeline, la animación se dispara
- [ ] La animación no se dispara si la sección no está en el 70% del viewport (por ejemplo, si se accede a la página con scroll al inicio)
- [ ] La animación se dispara al bajar por primera vez a la sección; scrollear hacia arriba y volver no repite la animación
- [ ] No hay errores en consola relacionados con ScrollTrigger al navegar entre páginas

### Behavior 4 — Guard prefers-reduced-motion

**Trigger**: usuario tiene `prefers-reduced-motion: reduce` configurado en su sistema

**Comportamiento**:
- `initTimelineReveal` verifica `prefersReducedMotion` antes de registrar cualquier tween o ScrollTrigger
- Si `prefersReducedMotion` es `true`, la función retorna sin ejecutar ninguna animación
- Todos los elementos de la timeline son visibles en su estado final sin haber pasado por `opacity:0` ni `y:20` inicial

**Acceptance criteria**:
- [ ] Con `prefers-reduced-motion: reduce`, la sección timeline se muestra completamente visible al cargar `/nosotros`
- [ ] Con `prefers-reduced-motion: reduce`, no se registran ScrollTriggers ni tweens para la timeline
- [ ] La sección timeline tiene apariencia idéntica a la versión sin JS cuando `prefersReducedMotion` es `true`

## Constraints transversales

- `prefers-reduced-motion`: la función `initTimelineReveal` debe verificar el guard antes de cualquier operación GSAP. Sin la guard, no se llama a `gsap.timeline()` ni a `ScrollTrigger.create()`.
- Performance: el ScrollTrigger debe limpiarse al destruir la vista (compatible con View Transitions de Astro). El módulo no debe registrar listeners globales persistentes.
- Accesibilidad: los textos de la timeline (años, milestones, descripciones) no se animan de forma individual — solo el contenedor `div.timeline__item`. El contenido permanece accesible para screen readers independientemente del estado de la animación.
- Compatibilidad: verificar visualmente en desktop (grid 5 columnas) que `scaleX` de la línea no produce artefactos con los `.timeline__dot` en `position:absolute top:-8px`. Si hay conflicto visual, el fallback es animar `width: 0 → 100%` en lugar de `scaleX`.
- Orientación móvil (≤900px): la timeline cambia a orientación vertical. La animación de `scaleX` podría no tener sentido en esta orientación. El Behavior 1 puede omitirse en breakpoints móviles o adaptarse; se define en diseño.

## Dependencias

- Plugins GSAP: core + ScrollTrigger (ya cargados por PR1)
- Módulos del proyecto:
  - `src/scripts/scroll-animations.ts` — provee `prefersReducedMotion` util
  - Nuevo: `src/scripts/gsap-timeline-reveal.ts` — encapsula `initTimelineReveal(rootSelector)`
- Archivos de markup: `src/pages/nosotros.astro` L69–88 (sección con `.timeline__track`, `div.timeline__line`, 5 `div.timeline__item`)
- Datos: `src/lib/constants.ts` L349–355 (array `TIMELINE` con los 5 hitos — no se modifica)
- Capabilities relacionadas: [[gsap-infrastructure]] del PR1 (provee ScrollTrigger registrado y utils de reduced motion)
