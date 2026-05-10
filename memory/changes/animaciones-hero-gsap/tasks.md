# Tasks: animaciones-hero-gsap

## Orden de ejecución

1. **Preparar estado inicial CSS** (Tarea 1) — debe completarse antes de cualquier animación
2. **Añadir data-attributes al markup** (Tarea 2) — necesario para que el script de GSAP seleccione elementos
3. **Implementar script GSAP de entrada** (Tarea 3) — depende de T1 y T2
4. **Implementar animaciones ambientales** (Tarea 4) — puede ejecutarse en paralelo lógico con T3, pero preferible después
5. **Añadir prefers-reduced-motion** (Tarea 5) — depende de T3 y T4, es la capa de accesibilidad
6. **Verificación manual y performance** (Tarea 6) — última, valida todo

---

## Spec: Animaciones de entrada escalonada en Hero

### Tarea 1: Añadir clase `.animate-on-load` y estados iniciales en CSS

- **Archivos**: `src/styles/sections/hero.css`
- **Qué hacer**: Crear clase `.animate-on-load` con `opacity: 0` y `transform: translateY(20px)` (variantes por elemento: 20px badge/lead, 30px título, 15px CTAs, 10px trust). Añadir media query `@media (prefers-reduced-motion: reduce)` que fuerce `opacity: 1` y `transform: none`.
- **Criterio de completado**: Los elementos con clase aparecen ocultos/ desplazados en el estado inicial; con prefers-reduced-motion aparecen en estado final.
- **Requiere**: Ninguna

- [ ] Añadir `.animate-on-load` con `opacity: 0` y `translateY` base de 20px
- [ ] Añadir variantes por elemento (`.animate-on-load--title: 30px`, etc.) o usar valores inline en el script
- [ ] Añadir `@media (prefers-reduced-motion: reduce) { .animate-on-load { opacity: 1; transform: none; } }`
- [ ] Añadir `@media (scripting: none) { .animate-on-load { opacity: 1; transform: none; } }` como fallback

### Tarea 2: Añadir data-attributes a elementos del Hero

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: Añadir `data-hero-badge`, `data-hero-title`, `data-hero-lead`, `data-hero-ctas`, `data-hero-trust` a los elementos correspondientes. Añadir `data-hero-card` (×3), `data-hero-blob` (×2), `data-hero-grid`, `data-hero-wave` a elementos decorativos.
- **Criterio de completado**: Todos los elementos animados tienen su data-attribute; el markup sigue siendo semántico y válido.
- **Requiere**: Ninguna

- [ ] Añadir `data-hero-badge` al contenedor del badge
- [ ] Añadir `data-hero-title` al `<h1>`
- [ ] Añadir `data-hero-lead` al párrafo lead
- [ ] Añadir `data-hero-ctas` al contenedor de botones
- [ ] Añadir `data-hero-trust` al contenedor de trust indicators
- [ ] Añadir `data-hero-card` a cada una de las 3 cards decorativas
- [ ] Añadir `data-hero-blob` a los 2 blobs de fondo
- [ ] Añadir `data-hero-grid` al contenedor de grid lines
- [ ] Añadir `data-hero-wave` al `<path>` del wave SVG

### Tarea 3: Implementar timeline de entrada escalonada

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: Añadir `<script>` inline al final del componente. Importar `gsap`. Crear `gsap.timeline()` que anime: badge (y:20→0, opacity:0→1), título (y:30→0, +0.15s), lead (y:20→0, +0.15s), CTAs (y:15→0, +0.15s), trust (y:10→0, +0.15s). Usar `power2.out`, duración ~0.6s por elemento. Total ~1.2s.
- **Criterio de completado**: Al cargar la página, los elementos aparecen secuencialmente en el orden correcto; la animación completa en <1.5s; los elementos son clickeables durante la animación.
- **Requiere**: Tarea 1, Tarea 2

- [ ] Importar `gsap` en script inline
- [ ] Seleccionar elementos vía `document.querySelector('[data-hero-...]')`
- [ ] Crear `gsap.timeline()` con defaults `{ ease: 'power2.out', duration: 0.6 }`
- [ ] Añadir tween para badge con `from({ y: 20, opacity: 0 })`
- [ ] Añadir tween para título con `from({ y: 30, opacity: 0 })` en `+=0.15`
- [ ] Añadir tween para lead con `from({ y: 20, opacity: 0 })` en `+=0.15`
- [ ] Añadir tween para CTAs con `from({ y: 15, opacity: 0 })` en `+=0.15`
- [ ] Añadir tween para trust con `from({ y: 10, opacity: 0 })` en `+=0.15`
- [ ] Verificar que duración total sea ~1.2s

---

## Spec: Animaciones ambientales continuas en Hero

### Tarea 4: Implementar animaciones ambientales continuas

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: En el mismo script inline (o en uno separado si es más claro), crear tweens independientes con `gsap.to(..., { repeat: -1, yoyo: true })`: cards flotantes (y: -10 a -15px, duraciones 2.8–3.5s), blobs (scale: 1.05–1.08, 4–5s), grid lines reveal (opacity 0→0.15, 2s, sin yoyo), wave SVG (alternar `attr.d` entre pathA y pathB, 4s, yoyo).
- **Criterio de completado**: Cards flotan suavemente de forma independiente; blobs pulsan sutilmente; grid lines se revelan; wave se anima continuamente; ninguna animación bloquea el main thread.
- **Requiere**: Tarea 2

- [ ] Animar Card 1: `gsap.to('[data-hero-card]:nth-child(1)', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })`
- [ ] Animar Card 2: similar con y: -15, duration: 3.5
- [ ] Animar Card 3: similar con y: -10, duration: 2.8
- [ ] Animar Blob 1: `gsap.to(..., { scale: 1.08, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })`
- [ ] Animar Blob 2: similar con scale: 1.05, duration: 5
- [ ] Revelar grid lines: `gsap.to('[data-hero-grid]', { opacity: 0.15, duration: 2, ease: 'power1.out' })` (una sola vez o muy lento)
- [ ] Animar wave SVG: definir pathA y pathB, usar `gsap.to(wavePath, { attr: { d: pathB }, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })`
- [ ] Asegurar que las animaciones ambientales comiencen DESPUÉS de la timeline de entrada (usar `timeline.then()` o delay apropiado)

### Tarea 5: Implementar detección de prefers-reduced-motion

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: Al inicio del script, detectar `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Si es true, usar `gsap.set()` para colocar todos los elementos en estado final (opacity: 1, transform: none, visibility: visible) y NO crear ningún tween ni timeline.
- **Criterio de completado**: Con prefers-reduced-motion activo, todos los elementos se ven estáticos e inmediatamente; sin prefers-reduced-motion, las animaciones funcionan normalmente.
- **Requiere**: Tarea 3, Tarea 4

- [ ] Detectar `prefers-reduced-motion` al inicio del script
- [ ] Si está activo: hacer `gsap.set()` en todos los elementos animados a su estado final
- [ ] Si está activo: retornar temprano del script (no registrar timelines ni tweens)
- [ ] Si no está activo: continuar con registro normal de animaciones
- [ ] Verificar en DevTools con emulation de prefers-reduced-motion

---

## Verificación

### Tarea 6: Verificación manual, accesibilidad y performance

- **Archivos**: N/A (verificación en browser)
- **Qué hacer**: Abrir la página en Chrome DevTools. Verificar secuencia de entrada con throttling lento. Activar prefers-reduced-motion y confirmar elementos estáticos. Usar Performance tab para confirmar 60fps y ausencia de layout thrashing. Verificar view-source para SSR correcto.
- **Criterio de completado**: Todos los acceptance criteria de ambas specs están cumplidos.
- **Requiere**: Tarea 3, Tarea 4, Tarea 5

- [ ] Verificar orden de entrada: badge → título → lead → CTAs → trust
- [ ] Verificar duración total < 1.5s
- [ ] Verificar que CTAs son clickeables durante animación
- [ ] Activar prefers-reduced-motion → elementos estáticos e inmediatos
- [ ] Verificar cards flotando con yoyo continuo
- [ ] Verificar blobs con escala pulsante
- [ ] Verificar grid lines reveladas
- [ ] Verificar wave SVG animado
- [ ] Performance tab: 60fps, sin layout thrashing
- [ ] Verificar SSR: view-source muestra HTML completo sin depender del script

---

## Notas para sdd-apply

- **No modificar** `src/pages/index.astro` ni `src/styles/global.css` — ya están correctos
- **GSAP ya está instalado** (ver package.json) — no reinstalar
- **No usar MorphSVGPlugin** — usar técnica de `attr.d` alternado como indica design.md
- **Script inline** va al final del componente Astro, antes de cerrar `</section>`
- **Selectores**: preferir `data-hero-*` sobre clases para robustez ante cambios de estilo
