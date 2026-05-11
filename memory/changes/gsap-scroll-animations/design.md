---
type: design
change_name: "gsap-scroll-animations"
created: "2026-05-10"
updated: "2026-05-10"
tags: [design]
---

# Diseño Técnico — gsap-scroll-animations

## 1. Visión General de la Arquitectura

Arquitectura híbrida con dos capas:

1. **Capa genérica**: un script reutilizable (`scroll-animations.ts`) que descubre y anima elementos marcados con `data-scroll-*` attributes. Se carga globalmente desde `BaseLayout.astro`. Cubre ~80% de los casos (fade-up, fade-left, stagger).

2. **Capa especializada**: 4 scripts inline en componentes específicos para efectos que requieren lógica personalizada (contadores, clip-path, blobs ambient, 404 bounce). Cada uno importa gsap directamente y reutiliza la función centralizada de detección de `prefers-reduced-motion`.

```
BaseLayout.astro
  └── import scroll-animations.ts (global, auto-descubre data-scroll-*)
        ├── gsap + ScrollTrigger (registrados una sola vez)
        ├── prefersReducedMotion() centralizado
        ├── initScrollEntrances() — fade-up, fade-left via data-scroll-animate
        └── initBatchEntrances() — ScrollTrigger.batch() para grids grandes

StatsSection.astro     → inline <script> importa gsap, llama a ScrollTrigger
WhySection.astro       → inline <script> importa gsap para clip-path
CTASection.astro       → inline <script> importa gsap para blobs ambient
404.astro              → inline <script> importa gsap para bounce/glitch
```

### AD-01: ScrollTrigger registrado una sola vez en scroll-animations.ts

**Decisión**: `gsap.registerPlugin(ScrollTrigger)` se ejecuta únicamente en `scroll-animations.ts`. Los scripts inline de las 4 especializaciones NO registran ScrollTrigger de nuevo; importan `gsap` y `ScrollTrigger` directamente ya que Astro deduplica los módulos ES — al ser el mismo specifier (`gsap`, `gsap/ScrollTrigger`), el registro previo en `scroll-animations.ts` ya habrá ejecutado.

**Justificación**: Evita registros duplicados y garantiza que el plugin esté disponible globalmente una vez que el módulo principal se cargue. Astro procesa `<script>` tags como módulos ES con deduplicación automática.

**Alternativa descartada**: Registrar ScrollTrigger en cada script inline. Redundante e inconsistente.

### AD-02: prefers-reduced-motion centralizado con export

**Decisión**: `scroll-animations.ts` exporta una constante `prefersReducedMotion` y una función `getPrefersReducedMotion()`. El check se hace una vez al cargar el módulo con `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Los scripts especializados importan esta función desde `scroll-animations.ts`.

**Justificación**: DRY — un solo punto de verdad para la preferencia de accesibilidad. Consistente con el patrón de HeroSection pero centralizado.

**Alternativa descartada**: Cada script inline hace su propio `matchMedia` check. Duplicación innecesaria y riesgo de inconsistencia.

### AD-03: Estado inicial vía gsap.set() desde JS, no CSS

**Decisión**: El estado oculto (opacity: 0, y: 20) lo aplica `gsap.set()` desde JavaScript, NO desde CSS. Esto sigue el patrón de HeroSection (línea 107).

**Justificación**: Si JS no carga o falla, los elementos permanecen visibles en su posición natural — fallback no-JS automático sin necesidad de clases `.no-js` o `<noscript>`. Si GSAP carga correctamente, `gsap.set()` oculta los elementos antes de que el usuario los vea (el script se ejecuta antes del paint por ser un module en `<head>`).

**Alternativa descartada**: CSS `opacity: 0` + clase `.no-js` para fallback. Más complejo, requiere coordinar CSS con JS, y es exactamente el problema actual de servicios/industrias que estamos migrando.

### AD-04: ScrollTrigger.batch() para grids con ≥5 elementos

**Decisión**: Usar `ScrollTrigger.batch()` cuando un contenedor tiene 5 o más elementos marcados con `data-scroll-animate`. Para menos de 5, usar triggers individuales.

**Justificación**: `batch()` agrupa callbacks y reduce el número de ScrollTrigger instances. Las páginas de servicios (11 cards) e industrias (14 cards) se benefician significativamente. El umbral de 5 evita over-engineering en secciones pequeñas.

**Alternativa descartada**: Siempre usar `batch()`. Más complejo para secciones con 2-3 elementos donde triggers individuales son suficientes.

### AD-05: Scripts especializados como scripts inline de Astro

**Decisión**: Los 4 efectos especializados (counters, clip-path, blobs, 404) se implementan como `<script>` tags inline dentro de cada componente Astro, NO como archivos separados en `src/scripts/`.

**Justificación**: Cada efecto es único y acoplado a su componente. Astro procesa `<script>` dentro de componentes como módulos ES (deduplicados si el componente se usa en múltiples páginas — no es el caso aquí). Mantener el script junto al markup facilita la comprensión y mantenimiento. Sigue el patrón establecido por HeroSection.

**Alternativa descartada**: Archivos separados en `src/scripts/stats-counter.ts`, etc. Agrega indirección innecesaria para scripts que solo se usan en un componente.

---

## 2. API de Data Attributes

### Atributos del sistema genérico

| Atributo | Tipo | Requerido | Default | Descripción |
|----------|------|-----------|---------|-------------|
| `data-scroll-animate` | flag (sin valor) | Sí | — | Marca un elemento para animación de entrada por scroll |
| `data-scroll-type` | string | No | `"fade-up"` | Tipo de animación: `fade-up`, `fade-left`, `fade-right`, `scale-in` |
| `data-scroll-delay` | number (s) | No | `0` | Delay individual en segundos (e.g., `0.1`, `0.2`) |
| `data-scroll-duration` | number (s) | No | `0.8` | Duración de la animación en segundos |
| `data-scroll-batch` | flag (sin valor) | No | — | Colocado en el CONTENEDOR padre para indicar que sus hijos con `data-scroll-animate` deben usar `ScrollTrigger.batch()` |

### Atributos especializados (StatsSection)

| Atributo | Tipo | Requerido | Descripción |
|----------|------|-----------|-------------|
| `data-counter-target` | string | Sí | Valor numérico objetivo, e.g. `"20"`, `"70"`, `"98"` |
| `data-counter-suffix` | string | No | Sufijo a preservar, e.g. `"+"`, `"%"` |

### Uso declarativo — ejemplo HTML

```html
<!-- Entrada genérica fade-up -->
<div data-scroll-animate>Contenido</div>

<!-- Entrada con delay escalonado -->
<div data-scroll-animate data-scroll-delay="0.1">Card 1</div>
<div data-scroll-animate data-scroll-delay="0.2">Card 2</div>

<!-- Grid con batch -->
<div class="services__grid" data-scroll-batch>
  <div data-scroll-animate class="svc-card">...</div>
  <div data-scroll-animate class="svc-card">...</div>
  <!-- ... más cards -->
</div>

<!-- Contador (StatsSection) -->
<strong class="stats__value"
  data-counter-target="20"
  data-counter-suffix="+">20+</strong>
```

---

## 3. Diseño del módulo scroll-animations.ts

### Estructura del archivo

```typescript
// src/scripts/scroll-animations.ts

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Accesibilidad ---
export const prefersReducedMotion: boolean =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Constantes de animación ---
const DEFAULTS = {
  duration: 0.8,
  ease: 'power2.out',
  y: 30,             // desplazamiento vertical inicial (fade-up)
  x: 40,             // desplazamiento horizontal (fade-left/right)
  staggerBatch: 0.15, // stagger dentro de un batch
  triggerStart: 'top 85%',  // ScrollTrigger start
  triggerEnd: 'bottom 20%', // ScrollTrigger end (para batch)
} as const;

// --- Tipos de animación ---
type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';

function getFromVars(type: AnimationType): gsap.TweenVars {
  switch (type) {
    case 'fade-up':    return { opacity: 0, y: DEFAULTS.y };
    case 'fade-left':  return { opacity: 0, x: -DEFAULTS.x };
    case 'fade-right': return { opacity: 0, x: DEFAULTS.x };
    case 'scale-in':   return { opacity: 0, scale: 0.9 };
  }
}

function getToVars(type: AnimationType): gsap.TweenVars {
  // Todos los tipos convergen a la misma posición final
  return { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' };
}

// --- Inicialización ---
function init(): void {
  if (prefersReducedMotion) return; // Salir sin hacer nada

  initBatchContainers();
  initIndividualElements();
}

function initBatchContainers(): void {
  // Buscar contenedores marcados con data-scroll-batch
  const containers = document.querySelectorAll<HTMLElement>('[data-scroll-batch]');

  containers.forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('[data-scroll-animate]');
    if (items.length === 0) return;

    const type = (items[0].dataset.scrollType as AnimationType) || 'fade-up';
    const fromVars = getFromVars(type);

    // Aplicar estado inicial oculto
    gsap.set(items, fromVars);

    ScrollTrigger.batch(items, {
      start: DEFAULTS.triggerStart,
      onEnter: (batch) => {
        gsap.to(batch, {
          ...getToVars(type),
          duration: DEFAULTS.duration,
          ease: DEFAULTS.ease,
          stagger: DEFAULTS.staggerBatch,
        });
      },
      once: true,
    });
  });
}

function initIndividualElements(): void {
  // Elementos individuales NO dentro de un batch container
  const allAnimated = document.querySelectorAll<HTMLElement>('[data-scroll-animate]');

  allAnimated.forEach((el) => {
    // Omitir si ya está dentro de un batch container
    if (el.closest('[data-scroll-batch]')) return;

    const type = (el.dataset.scrollType as AnimationType) || 'fade-up';
    const delay = parseFloat(el.dataset.scrollDelay || '0');
    const duration = parseFloat(el.dataset.scrollDuration || String(DEFAULTS.duration));
    const fromVars = getFromVars(type);

    // Aplicar estado inicial oculto
    gsap.set(el, fromVars);

    gsap.fromTo(el, fromVars, {
      ...getToVars(type),
      duration,
      delay,
      ease: DEFAULTS.ease,
      scrollTrigger: {
        trigger: el,
        start: DEFAULTS.triggerStart,
        once: true,
      },
    });
  });
}

// Ejecutar al cargar
init();
```

### Puntos clave del diseño

1. **`gsap.set()` para estado inicial**: Se aplica desde JS, no CSS. Si JS falla, el contenido permanece visible.
2. **`clearProps: 'transform'`** en el `toVars`: Después de la animación de entrada, limpia los transforms inline para que los hover CSS (`transform: translateY(-4px)`) funcionen sin conflicto.
3. **`once: true`** en ScrollTrigger: Las animaciones se ejecutan una sola vez, no se re-disparan al hacer scroll arriba.
4. **Separación batch vs individual**: Los elementos dentro de `[data-scroll-batch]` se procesan con `ScrollTrigger.batch()`. Los que están fuera se procesan individualmente con `fromTo()`.

---

## 4. Diseño de Scripts Especializados

### 4.1 StatsSection — Contadores animados

```typescript
// Inline <script> en StatsSection.astro
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../scripts/scroll-animations';

if (!prefersReducedMotion) {
  const section = document.querySelector('.stats');
  const counters = document.querySelectorAll<HTMLElement>('[data-counter-target]');

  if (section && counters.length > 0) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        counters.forEach((el) => {
          const target = parseInt(el.dataset.counterTarget || '0', 10);
          const suffix = el.dataset.counterSuffix || '';
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            snap: { val: 1 },   // Siempre enteros
            onUpdate: () => {
              el.textContent = `${obj.val}${suffix}`;
            },
          });
        });
      },
    });
  }
}
```

**Notas de diseño**:
- Los valores target se leen de `data-counter-target` en el HTML, NO de las constantes TS (separation of concerns: el HTML es la fuente de verdad para el rendering).
- El cuarto stat (`STATS[3]`) tiene `value: ''` — no recibe `data-counter-target` y no se anima como contador. Solo recibe `data-scroll-animate` para la entrada genérica.
- `snap: { val: 1 }` garantiza que el valor mostrado siempre sea entero.
- `duration: 2` — lo suficientemente largo para ser perceptible pero no tedioso.
- `once: true` — no re-trigger al volver.

### 4.2 WhySection — Clip-path reveal

```typescript
// Inline <script> en WhySection.astro
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../scripts/scroll-animations';

if (!prefersReducedMotion) {
  const imgWrap = document.querySelector('.why__img-wrap');

  if (imgWrap) {
    // Estado inicial: recortado desde los bordes
    gsap.set(imgWrap, { clipPath: 'inset(15% 15% 15% 15%)' });

    gsap.to(imgWrap, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why',
        start: 'top 75%',
        once: true,
      },
    });
  }
}
```

**Notas de diseño**:
- `clipPath: inset()` es performante (no causa layout, solo paint).
- La sección `.why` es el trigger, no `.why__img-wrap`, para que la animación inicie cuando la sección entra.
- Los why items y textos usan el sistema genérico `data-scroll-animate` con delays escalonados — no necesitan script inline.

### 4.3 CTASection — Blobs ambient

```typescript
// Inline <script> en CTASection.astro
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../scripts/scroll-animations';

if (!prefersReducedMotion) {
  const blob1 = document.querySelector('.cta-section__blob--1');
  const blob2 = document.querySelector('.cta-section__blob--2');

  if (blob1) {
    gsap.to(blob1, {
      y: -20,
      scale: 1.08,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  if (blob2) {
    gsap.to(blob2, {
      y: 15,
      scale: 1.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });
  }
}
```

**Notas de diseño**:
- NO usa ScrollTrigger — es animación ambient continua que inicia al cargar la página.
- Sigue el mismo patrón de los blobs del Hero (líneas 128-129 de HeroSection.astro).
- `yoyo: true` + `repeat: -1` = loop continuo suave.
- Duraciones distintas (4s y 5s) + delay crean movimiento orgánico asimétrico.
- Los textos del CTA usan el sistema genérico `data-scroll-animate`.

### 4.4 Página 404 — Bounce one-shot

```typescript
// Inline <script> en 404.astro
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../scripts/scroll-animations';

if (!prefersReducedMotion) {
  const code = document.querySelector('.error-page__code');

  if (code) {
    gsap.fromTo(code,
      { scale: 0.5, opacity: 0, rotation: -5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }
    );
  }
}
```

**Notas de diseño**:
- Efecto bounce con `back.out(1.7)` — leve overshoot que crea sensación de rebote.
- `rotation: -5` → `0` agrega un sutil giro que refuerza el movimiento.
- One-shot: no usa `repeat`, se ejecuta una vez al cargar.
- NO usa ScrollTrigger — la página 404 es corta, el "404" está arriba. Se anima en page load.
- Se descartó el efecto "glitch" (requiere SplitText plugin o CSS complejo) a favor de bounce (más limpio, implementable solo con gsap core).

---

## 5. Estrategia de Migración CSS → GSAP (servicios/industrias)

### Estado actual (problema)

En `servicios.astro` y `industrias.astro`:

```css
.service-card {
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;  /* ← PROBLEMA: invisible sin JS */
}
```

- Los cards tienen `opacity: 0` en CSS — si JS no carga, quedan invisibles.
- `animation: fadeInUp` se ejecuta en page load, no en scroll.
- `var(--delay)` se establece vía `style="--delay: 0.1s"` inline.

### Plan de migración

1. **Remover** de CSS: `animation: fadeInUp`, `animation-delay: var(--delay)`, `opacity: 0`
2. **Remover** del CSS: el bloque `@keyframes fadeInUp { ... }`
3. **Remover** del HTML: el atributo inline `style="--delay: ..."` (ya no es necesario)
4. **Agregar** al HTML: `data-scroll-animate` en cada card
5. **Agregar** al contenedor de cards: `data-scroll-batch`
6. Las cards ahora visibles por defecto (opacity: 1 en CSS). GSAP las oculta vía `gsap.set()` al cargar → las anima con ScrollTrigger batch.
7. **Fallback no-JS**: Si JS no carga, las cards son visibles normalmente (sin animación pero no invisibles).

### Verificar que no hay otros usos de fadeInUp

Solo `servicios.astro` y `industrias.astro` usan `@keyframes fadeInUp` — están definidas localmente en `<style>` de cada página, no en global.css.

---

## 6. Integración en BaseLayout.astro

### Cambio requerido

Agregar un `<script>` import en el `<body>` de `BaseLayout.astro`:

```astro
<body>
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  <slot />
  <script>
    import '../scripts/scroll-animations';
  </script>
</body>
```

**Justificación**: Al colocarlo al final del `<body>` (después del `<slot />`), el DOM ya está presente cuando el script se ejecuta. Astro procesa este `<script>` como un módulo ES con deduplicación — se carga una sola vez por página.

**Alternativa descartada**: Importar en `<head>`. El DOM podría no estar listo al ejecutarse. Requeriría `DOMContentLoaded` listener.

**Nota**: El script es un módulo ES, se ejecuta con `defer` implícito. Los elementos del DOM ya estarán parseados cuando corra.

---

## 7. Timing y Easing

### Tabla de valores

| Animación | Duración | Easing | Delay/Stagger | ScrollTrigger Start |
|-----------|----------|--------|---------------|---------------------|
| Entrada genérica (fade-up) | 0.8s | `power2.out` | Por delay attr o batch 0.15s | `top 85%` |
| Entrada fade-left/right | 0.8s | `power2.out` | Por delay attr | `top 85%` |
| Contadores (Stats) | 2s | `power2.out` | Simultáneos | `top 80%` |
| Clip-path reveal (Why) | 1.2s | `power3.out` | — | `top 75%` |
| Blobs ambient (CTA) | 4s/5s | `sine.inOut` | 1s entre blobs | N/A (ambient) |
| Bounce 404 | 0.8s | `back.out(1.7)` | — | N/A (page load) |

### Justificación de valores

- **0.8s para entradas genéricas**: Balance entre perceptible y no tedioso. Consistente con el ecosistema web (Material Design recomienda 0.3-0.5s para micro; 0.8s es para entradas de contenido).
- **`power2.out` para entradas**: Desaceleración natural — rápido al inicio, suave al final. Estándar en motion design.
- **`power3.out` para clip-path**: Más dramatic easing para un efecto visual mayor.
- **`top 85%` para ScrollTrigger**: El elemento se anima cuando su top está al 85% del viewport — el usuario lo ve aparecer antes de llegar a él, creando anticipación.
- **`sine.inOut` para blobs**: Movimiento orgánico simétrico, ideal para loops yoyo.
- **`back.out(1.7)` para 404**: Leve overshoot (1.7 ≈ default) para efecto bounce sutil.
- **2s para contadores**: Suficiente para que el conteo sea perceptible pero no demasiado largo.
- **Batch stagger 0.15s**: Cada card aparece 150ms después de la anterior — rápido en cascada.

---

## 8. Fallback y Accesibilidad

### No-JS Fallback

- El estado oculto se aplica vía `gsap.set()` desde JS, NO desde CSS.
- Si JS no carga: todos los elementos son visibles en su posición natural.
- En servicios/industrias: se remueve el `opacity: 0` de CSS, eliminando el problema actual.

### prefers-reduced-motion

- `scroll-animations.ts` exporta `prefersReducedMotion`.
- Si es `true`, `init()` retorna inmediatamente sin crear ScrollTriggers ni aplicar `gsap.set()`.
- Los 4 scripts especializados importan `prefersReducedMotion` y envuelven su lógica en `if (!prefersReducedMotion)`.
- El CSS global ya anula `animation-duration` y `transition-duration` con `!important`, pero eso no afecta a GSAP — el check JS es obligatorio.

### clearProps para hover CSS

- Después de cada animación de entrada, `clearProps: 'transform'` limpia los inline transforms.
- Esto permite que los hover CSS (`transform: translateY(-4px)`) funcionen correctamente sin conflicto con transforms residuales de GSAP.

---

## 9. Output Expected — Archivos a crear/modificar

### Archivos a CREAR

| Archivo | Propósito | Líneas estimadas |
|---------|-----------|------------------|
| `src/scripts/scroll-animations.ts` | Utilidad genérica ScrollTrigger con data-attributes | ~90-110 |

### Archivos a MODIFICAR

| Archivo | Cambios | Spec |
|---------|---------|------|
| `src/layouts/BaseLayout.astro` | Agregar `<script>` import de scroll-animations al final del `<body>` | scroll-entrance-utility |
| `src/components/sections/StatsSection.astro` | Agregar `data-scroll-animate` a items + `data-counter-target`/`data-counter-suffix` a values + inline `<script>` para contadores | scroll-stats-counters |
| `src/components/sections/ServicesSection.astro` | Agregar `data-scroll-animate` a header elements + `data-scroll-batch` al grid + `data-scroll-animate` a cards | scroll-entrance-utility |
| `src/components/sections/WhySection.astro` | Agregar `data-scroll-animate` con delays a why items y textos + inline `<script>` para clip-path reveal | scroll-why-reveal |
| `src/components/sections/IndustriesSection.astro` | Agregar `data-scroll-animate` a header + `data-scroll-batch` al grid + `data-scroll-animate` a cards | scroll-entrance-utility |
| `src/components/sections/CTASection.astro` | Agregar `data-scroll-animate` a textos/actions + inline `<script>` para blobs ambient | scroll-cta-blobs |
| `src/pages/servicios.astro` | Remover CSS fadeInUp + opacity:0 + @keyframes, agregar `data-scroll-batch` al grid + `data-scroll-animate` a cards, remover `style="--delay"` inline | scroll-inner-pages |
| `src/pages/industrias.astro` | Remover CSS fadeInUp + opacity:0 + @keyframes, agregar `data-scroll-batch` al grid + `data-scroll-animate` a cards, remover `style="--delay"` inline | scroll-inner-pages |
| `src/pages/nosotros.astro` | Agregar `data-scroll-animate` a about-cards, quote | scroll-inner-pages |
| `src/pages/cotizar.astro` | Agregar `data-scroll-animate` a form sections | scroll-inner-pages |
| `src/pages/contacto.astro` | Agregar `data-scroll-animate` a contact sections | scroll-inner-pages |
| `src/pages/404.astro` | Agregar inline `<script>` para bounce del "404" | scroll-404-effect |
| `src/pages/servicios/carga-aerea.astro` | Agregar `data-scroll-animate` a feature-cards y hero content | scroll-inner-pages |
| `src/pages/servicios/carga-maritima.astro` | Agregar `data-scroll-animate` a feature-cards y hero content | scroll-inner-pages |

**Total**: 1 archivo nuevo + 14 archivos modificados.

---

## 10. Trade-offs y Alternativas Descartadas

### Alternativas descartadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **CSS Scroll-driven animations** (`animation-timeline: view()`) | Soporte de navegadores insuficiente (~72% global, sin Safari < 17.5). GSAP tiene 99%+ de soporte. |
| **Intersection Observer API nativa** | Más código boilerplate que GSAP ScrollTrigger para el mismo resultado. GSAP ya está instalado y ofrece `batch()`, easing nativo, y API declarativa superior. |
| **Framer Motion (ya instalado como `motion`)** | Requiere React components — el sitio usa Astro components (HTML server-rendered). Agregar islas React solo para animaciones sería over-engineering. |
| **Script separado por cada sección** | Duplicación masiva de lógica (reduced-motion check, ScrollTrigger setup). El hybrid approach es mejor: genérico donde se puede, especializado donde se necesita. |
| **CSS opacity:0 + clase .js/.no-js** | Requiere coordinar CSS con un script detector de JS. Más frágil que el approach `gsap.set()` que es autocontenido. Es exactamente el patrón problemático de servicios/industrias que estamos eliminando. |
| **Efecto glitch para 404 (SplitText)** | Requiere GSAP SplitText plugin (premium) o implementación CSS compleja con pseudo-elements. Bounce con `back.out()` logra un efecto igualmente llamativo con gsap core. |

### Trade-offs aceptados

| Trade-off | A favor | En contra | Mitigación |
|-----------|---------|-----------|------------|
| Script global en todas las páginas | Funciona en cualquier página sin config | Se carga incluso si la página no tiene data-scroll-animate | Script es ~3-4KB min+gzip. El init() retorna inmediatamente si no encuentra elementos. |
| Dos patrones (genérico + inline) | Cada caso se resuelve con la mejor herramienta | Dos estilos de código a mantener | Los 4 scripts inline son claramente distintos y autocontenidos. No hay ambigüedad sobre cuándo usar cada patrón. |
| `clearProps: 'transform'` post-animación | Hover CSS funciona sin conflicto | Breve reflow al limpiar props | El reflow es imperceptible — ocurre una sola vez cuando la animación termina. |
| `gsap.set()` antes del paint | Fallback no-JS perfecto | Flash potencial si el script tarda | Módulos ES en Astro tienen `defer` implícito pero se ejecutan antes de DOMContentLoaded en la mayoría de navegadores. El flash es imperceptible. |

---

## 11. Diagrama de Dependencias

```
scroll-entrance-utility (global)
  ├── scroll-stats-counters (importa prefersReducedMotion)
  ├── scroll-why-reveal (importa prefersReducedMotion)
  ├── scroll-inner-pages (consume data-scroll-animate)
  └── scroll-cta-blobs (importa prefersReducedMotion, NO usa ScrollTrigger)

scroll-404-effect (importa prefersReducedMotion, NO usa ScrollTrigger)
```

### Orden de implementación recomendado

1. `scroll-entrance-utility` — base para todo lo demás
2. `scroll-stats-counters` — alto impacto visual, depende de (1)
3. `scroll-inner-pages` — alto alcance (7 páginas), depende de (1)
4. `scroll-why-reveal` — impacto medio, depende de (1)
5. `scroll-cta-blobs` — independiente, puede hacerse en paralelo con (2-4)
6. `scroll-404-effect` — independiente, baja prioridad
