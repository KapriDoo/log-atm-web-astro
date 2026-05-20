---
capability: interactive-component-transitions
change_name: gsap-pr2-internal-pages
status: draft
created: "2026-05-19"
related: [internal-page-heroes, nosotros-timeline-reveal]
---

# Interactive Component Transitions

## Propósito

Reemplazar las transiciones CSS del directorio de industrias (`/industrias`) y las transiciones abruptas del stepper de cotización (`/cotizar`) con animaciones GSAP controladas con precisión. El ind-directory elimina el desface visual entre `opacity 0.6s` y `scale 1.2s` de CSS y corrige el bug de `clearInterval`. El stepper de cotización añade la metáfora de avance slide que guía al usuario a través del flujo de conversión más importante del sitio.

## Alcance

### En scope
- **ind-directory** (`/industrias`): migración de CSS transitions a tweens GSAP para el crossfade entre slides; fix del bug `clearInterval`; coordinación con autorotación y eventos `mouseenter`/`mouseleave`
- **Stepper** (`/cotizar`): refactor de `renderStep()` para coordinar el atributo `hidden` con tweens GSAP OUT→IN; flag `isAnimating` para proteger la ventana de transición
- Dos nuevos módulos encapsulados: `src/scripts/gsap-ind-directory.ts` y `src/scripts/gsap-stepper.ts`
- Eliminación de las declaraciones `transition` de `.ind-directory__slide` en `shared.css`
- Mantenimiento intacto de `classList.toggle('is-active', ...)` como marcador de estado (fallback sin JS)
- Mantenimiento intacto de la lógica de `canAdvance()` y `btnNext.disabled` en el stepper

### Fuera de scope
- GSAP Flip plugin (descartado en HITL — slides con `position:absolute inset:0` fijos no requieren Flip)
- Animación de la pantalla de éxito `#quote-success` (aplazada a PR3)
- Hover effects GSAP en los botones del directorio de industrias
- Validación del formulario de cotización (no se toca)
- Animaciones en el formulario de contacto (`/contacto`)
- Cambios en la estructura HTML del ind-directory o del stepper más allá de lo necesario para la animación

## Comportamientos requeridos

### Behavior A1 — Crossfade GSAP-controlled en ind-directory (slide saliente)

**Trigger**: el usuario hace hover, foco o click en un `.ind-directory__item` con `data-item=N`, o la autorotación llama a `next()` cada 3500ms

**Comportamiento**:
- Antes de iniciar el crossfade: `gsap.killTweensOf(slides)` cancela cualquier tween en curso en todos los slides
- El slide con `.is-active` (saliente) recibe: `gsap.to(saliente, { opacity: 0, scale: 1.06, duration: 0.5, ease: 'power2.in' })`
- El tween OUT reduce opacity a 0 y escala ligeramente hacia arriba (zoom-out sutil que refuerza la sensación de salida)
- `classList.toggle('is-active', idx === i)` se actualiza como marcador de estado para el fallback sin JS; no controla la animación visualmente

**Acceptance criteria**:
- [ ] Al seleccionar una industria diferente, el slide activo se desvanece con un zoom-out sutil en ~0.5s
- [ ] `gsap.killTweensOf(slides)` se ejecuta antes de cada crossfade (verificable observando que cambios rápidos no acumulan tweens)
- [ ] El slide saliente tiene `opacity: 0` al completarse el tween OUT
- [ ] El scale del saliente llega a `1.06` al completarse el tween OUT

### Behavior A2 — Crossfade GSAP-controlled en ind-directory (slide entrante)

**Trigger**: inmediatamente después del inicio del tween OUT (tweens OUT e IN se inician en paralelo)

**Comportamiento**:
- El slide entrante (índice `i`) recibe: `gsap.fromTo(entrante, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })`
- El estado inicial del tween (`fromTo`) garantiza que el entrante parte siempre desde `opacity:0 scale:1.06`, independientemente del estado previo de los tweens
- El tween IN hace zoom-in desde `1.06 → 1` mientras aparece, reforzando la sensación de entrada en foco
- Ambos tweens (OUT 0.5s + IN 0.6s) corren en paralelo; el crossfade total dura ~0.6s

**Acceptance criteria**:
- [ ] El slide entrante aparece con un zoom-in de escala de `1.06 → 1` sincronizado con el fade-in de `0 → 1`
- [ ] La duración del tween IN es ~0.6s con ease `power2.out`
- [ ] El crossfade completo (saliente + entrante) se percibe como una transición fluida sin parpadeo ni salto visual
- [ ] Transiciones rápidas entre industrias (clicks consecutivos rápidos) no producen slides visibles en estado inconsistente

### Behavior A3 — Fix bug clearInterval y coordinación con autorotación

**Trigger**: el usuario interactúa con el directorio (hover, click) mientras la autorotación está activa; o el componente se desmonta

**Comportamiento**:
- La variable `timer` (retorno de `setInterval`) se guarda correctamente y se llama `clearInterval(timer)` cuando corresponda:
  - Al recibir `mouseenter` en `#ind-directory` (la pausa vía `paused = true` no es suficiente si el interval sigue activo)
  - Al destruir el componente / navegar fuera (cleanup de ViewTransitions)
- La autorotación se reanuda con un nuevo `setInterval` tras `mouseleave` si `prefersReducedMotion` no está activo
- El flag `paused` permanece como control semántico de estado (pausa lógica vs limpieza del timer)

**Acceptance criteria**:
- [ ] Después de una interacción manual, la autorotación no dispara múltiples timers simultáneos (verificable en DevTools: un solo interval activo)
- [ ] Al hacer `mouseenter` en el componente, la autorotación se detiene; al hacer `mouseleave`, se reanuda
- [ ] No hay console warnings de timers no limpiados al navegar entre páginas con ViewTransitions
- [ ] Con `prefers-reduced-motion: reduce`, la autorotación nunca arranca (`!mq.matches` guard existente)

### Behavior A4 — Fallback sin JS para ind-directory

**Trigger**: JavaScript no disponible o bloqueado en el navegador

**Comportamiento**:
- Los slides mantienen `classList.toggle('is-active', ...)` como marcador de estado
- En `shared.css`, se elimina `transition: opacity, transform` de `.ind-directory__slide`, pero `.ind-directory__slide.is-active` conserva `opacity:1; transform:scale(1)` como estado visual estático
- El slide inicial (`data-slide=0`) tiene `.is-active` en el HTML; es visible sin JS
- Sin JS, no hay crossfade; el slide inicial permanece visible estáticamente

**Acceptance criteria**:
- [ ] Con JS deshabilitado, `/industrias` muestra el primer slide del directorio visible sin animación
- [ ] Con JS deshabilitado, no hay elementos visualmente rotos (ningún slide queda en `opacity:0` permanente)
- [ ] La eliminación de `transition` en CSS no afecta otros elementos de `shared.css`

### Behavior B1 — Stepper: tween OUT del panel saliente

**Trigger**: el usuario hace click en "Siguiente" (`#btn-next`) cuando `canAdvance()` es `true`, o en "Atrás" (`#btn-back`), o en un bullet de paso anterior en el stepper — y `isAnimating` es `false`

**Comportamiento**:
- Determinar dirección: `avanzar` si `newStep > currentStep`, `retroceder` si `newStep < currentStep`
- Si `isAnimating` es `true`, ignorar el evento de click completamente (retornar sin ejecutar)
- Establecer `isAnimating = true`
- `gsap.killTweensOf(stepPanels)` para cancelar tweens pendientes
- **Avanzar**: `gsap.to(panelSaliente, { x: 40, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: ocultarYMostrar })`
- **Retroceder**: `gsap.to(panelSaliente, { x: -40, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: ocultarYMostrar })`
- El desplazamiento de 40px refuerza la dirección de avance/retroceso sin ser disruptivo

**Acceptance criteria**:
- [ ] Al avanzar un paso, el panel actual se desliza y desvanece hacia la derecha (x: 0→40px) en ~0.25s
- [ ] Al retroceder un paso, el panel actual se desliza y desvanece hacia la izquierda (x: 0→-40px) en ~0.25s
- [ ] Durante la animación OUT, los botones de navegación no responden a nuevos clicks (`isAnimating = true`)
- [ ] `canAdvance()` y `btnNext.disabled` continúan funcionando exactamente como antes del refactor

### Behavior B2 — Stepper: coordinación hidden + tween IN del panel entrante

**Trigger**: `onComplete` del tween OUT del panel saliente

**Comportamiento**:
- En el callback `onComplete` del tween OUT:
  1. Aplicar `panelSaliente.setAttribute('hidden', '')` — lo oculta con `display:none`
  2. Aplicar `panelEntrante.removeAttribute('hidden')` — lo hace `display:block` pero aún `opacity:0`
  3. Iniciar tween IN del panel entrante:
     - **Avanzar**: `gsap.fromTo(panelEntrante, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'power2.out', onComplete: liberarAnimating })`
     - **Retroceder**: `gsap.fromTo(panelEntrante, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'power2.out', onComplete: liberarAnimating })`
- En `onComplete` del tween IN: `isAnimating = false`
- El `fromTo` garantiza que el entrante parte siempre desde el estado inicial correcto

**Acceptance criteria**:
- [ ] Al avanzar, el panel entrante aparece deslizándose desde la izquierda (x: -40→0) con fade-in en ~0.25s
- [ ] Al retroceder, el panel entrante aparece deslizándose desde la derecha (x: 40→0) con fade-in en ~0.25s
- [ ] El atributo `hidden` se aplica al panel saliente únicamente cuando el tween OUT ha terminado (no antes)
- [ ] El panel entrante nunca tiene `hidden` activo mientras se está animando (el `removeAttribute` ocurre antes del tween IN)
- [ ] Tras completar el tween IN, `isAnimating` vuelve a `false` y los botones de navegación responden nuevamente
- [ ] La transición total (OUT 0.25s + IN 0.25s) dura ~0.5s

### Behavior B3 — Stepper: guard prefers-reduced-motion y flag isAnimating

**Trigger A (reduced motion)**: usuario tiene `prefers-reduced-motion: reduce` configurado

**Comportamiento reduced motion**:
- Con `prefersReducedMotion` activo, `renderStep()` ejecuta el comportamiento original: `removeAttribute('hidden')` al panel entrante y `setAttribute('hidden', '')` a los demás, sin ningún tween
- `isAnimating` no se activa en el path de reduced motion (el swap es instantáneo)
- La función de navegación permanece completamente funcional

**Trigger B (isAnimating)**: usuario hace click rápido en navegación durante una transición activa

**Comportamiento isAnimating**:
- Si `isAnimating === true` al recibir un evento de navegación, el evento se ignora completamente
- El botón `#btn-next` puede tener `pointer-events: none` o similar como refuerzo visual durante `isAnimating`
- `isAnimating` se restablece a `false` en `onComplete` del tween IN (o inmediatamente si se usa el path de reduced motion)

**Acceptance criteria**:
- [ ] Con `prefers-reduced-motion: reduce`, navegar entre pasos es instantáneo (sin animación) y completamente funcional
- [ ] Hacer click rápido en "Siguiente" durante una transición no produce pasos saltados ni estados inconsistentes del stepper
- [ ] El estado visual del stepper (bullet activo, progreso) siempre refleja el paso correcto tras cualquier secuencia de navegación
- [ ] La validación de formulario (`canAdvance()`) y `btnNext.disabled` funcionan sin cambios — la validación NO se toca

### Behavior B4 — Stepper: preservación de lógica de negocio

**Trigger**: cualquier interacción con el stepper (avanzar, retroceder, submit, validación de campos)

**Comportamiento**:
- La función `canAdvance()` (L427–433 en `cotizar.astro`) permanece idéntica: verifica `state.mode`, `state.origin`, `state.dest`, `state.cargo`, `state.volume`/`state.weight`, `state.name`, `state.email`
- `btnNext.disabled` se actualiza idéntico a antes en respuesta a cambios de estado
- `submitQuote()` (paso 3 → pantalla de éxito) permanece sin cambios; la pantalla `#quote-success` no se anima (fuera de scope)
- El click en bullets del stepper para retroceder (solo permite `i <= state.step`) permanece sin cambios
- El módulo `gsap-stepper.ts` solo encapsula la capa de animación; no contiene lógica de validación ni de estado

**Acceptance criteria**:
- [ ] No se puede avanzar del paso 0 sin seleccionar un modo de servicio (`state.mode !== ''`)
- [ ] No se puede avanzar del paso 1 sin seleccionar origen y destino
- [ ] No se puede avanzar del paso 2 sin carga y (volumen o peso)
- [ ] No se puede avanzar del paso 3 sin nombre y email
- [ ] El submit del formulario funciona correctamente tras la animación de transición al paso 3
- [ ] Hacer click en bullets anteriores del stepper retrocede al paso correcto con la animación de retroceso

## Constraints transversales

- `prefers-reduced-motion`: ambos componentes (ind-directory y stepper) verifican el guard antes de iniciar tweens. El ind-directory ya tiene `!mq.matches` para la autorotación. El stepper debe verificar `prefersReducedMotion` al inicio de la lógica de animación en `renderStep`.
- Performance: `gsap.killTweensOf(targets)` es obligatorio antes de cada crossfade/transición. Sin esto, los tweens se acumulan en clicks rápidos y producen estados visuales inconsistentes.
- Accesibilidad: el atributo `hidden` (→ `display:none`) garantiza que los paneles no visibles no sean tab-focusable. Este comportamiento debe preservarse tras el refactor — los paneles no visibles siguen teniendo `hidden` aplicado.
- Compatibilidad: la clase `.is-active` en ind-directory se mantiene como marcador de estado para posibles selectores CSS o tests futuros. No debe eliminarse aunque ya no controle la animación visualmente.
- Compatibilidad: el stepper de `cotizar.astro` usa `<script define:vars>` con variables Astro inyectadas en el scope. El módulo `gsap-stepper.ts` debe recibir los elementos DOM como parámetros para no depender de los `define:vars` del script de Astro.

## Dependencias

- Plugins GSAP: solo core (ya cargado por PR1). No se requiere ScrollTrigger para ninguno de estos dos componentes.
- Módulos del proyecto:
  - `src/scripts/scroll-animations.ts` — provee `prefersReducedMotion` util
  - Nuevo: `src/scripts/gsap-ind-directory.ts` — encapsula `initIndDirectory(rootSelector)` con todo el crossfade logic
  - Nuevo: `src/scripts/gsap-stepper.ts` — encapsula `initStepperTransitions({ panelSelector, stepPanels, getCurrentStep })` con el slide transition logic
- Archivos de markup:
  - `src/pages/industrias.astro` L101–141 (HTML) y L186–237 (JS) — ind-directory
  - `src/pages/cotizar.astro` L92–255 (HTML) y L347–640 (JS) — stepper
- Estilos:
  - `src/styles/pages/shared.css` L66–76 — eliminar `transition` de `.ind-directory__slide`
- Capabilities relacionadas: [[gsap-infrastructure]] del PR1 (provee GSAP core registrado, `prefersReducedMotion`, y la convención de módulos especializados por componente)
