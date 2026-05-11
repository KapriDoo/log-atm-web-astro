# Exploration — gsap-scroll-animations

**Fecha**: 2026-05-10
**Cambio**: Implementar animaciones GSAP ScrollTrigger en todo el sitio LOG ATM

---

## 1. Estado actual de GSAP

### Dependencia
- `gsap: ^3.14.2` instalado en `package.json` — **ScrollTrigger viene incluido** como plugin bundled (no necesita instalación adicional, solo importar y registrar).
- `motion: ^12.38.0` también instalado pero no se usa actualmente en ningún componente.

### Uso actual (único)
**HeroSection.astro** (`src/components/sections/HeroSection.astro:94-141`):
- Inline `<script>` dentro del componente Astro.
- Detecta `prefers-reduced-motion` con `window.matchMedia`.
- Si no hay reduced-motion:
  - `gsap.set('.animate-on-load', { opacity: 0, y: 20 })` — oculta elementos.
  - Timeline secuencial `gsap.timeline()` con `fromTo()` para badge, title, lead, CTAs, trust.
  - Animaciones ambientales post-entrada: cards floating, blobs scaling, grid-lines fade, wave path morph.
- **No usa ScrollTrigger en ninguna parte del codebase.**
- **Patrón clave**: usa `data-*` attributes como selectores (data-hero-badge, data-hero-title, etc.).

### Patrón prefers-reduced-motion
- CSS global en `global.css:79-86`: anula `animation-duration`, `transition-duration` y `scroll-behavior` con `!important`.
- Hero script: verifica `window.matchMedia('(prefers-reduced-motion: reduce)').matches` y omite todas las animaciones.
- Cada CSS de sección tiene su propio bloque `@media (prefers-reduced-motion: reduce)`.

---

## 2. Secciones del Homepage — Estado y selectores

### StatsSection (`src/components/sections/StatsSection.astro`)
- **Estructura**: `<section class="stats">` > `.container.stats__inner` > `.stats__item` (x4)
- **Cada item**: `.stats__icon-wrap` + `.stats__value` + `.stats__label`
- **Animaciones CSS existentes**: `globe-spin`, `sparkles-pulse`, `award-rock`, `package-bounce` en iconos
- **Contadores**: valores estáticos en HTML ("20+", "70+", "98%", ""). No hay animación de conteo.
- **Selectores disponibles**: `.stats__item`, `.stats__value`, `.stats__icon-wrap`
- **Oportunidad**: Scroll-triggered entrance + contadores animados con `gsap.to()` usando `snap`.

### ServicesSection (`src/components/sections/ServicesSection.astro`)
- **Estructura**: `<section class="services">` > `.container` > `.section-header` + `.services__grid`
- **Grid items**: `.svc-card` (x5 cards, link `<a>`)
- **Animaciones CSS existentes**: hover transitions (border, shadow, transform), overlay slide-up, line scaleX
- **Selectores disponibles**: `.section-header`, `.eyebrow`, `.section-title`, `.section-lead`, `.svc-card`
- **Oportunidad**: Scroll-triggered staggered entrance para header + cards.

### WhySection (`src/components/sections/WhySection.astro`)
- **Estructura**: `<section class="why">` > `.container.why__inner` > `.why__visual` + `.why__content`
- **Visual**: `.why__img-wrap` > `.why__img-ph` (SVG placeholder) + `.why__badge`
- **Content**: eyebrow + title + lead + `.why__list` con `.why__item` (x items) + `.why__btn`
- **Animaciones CSS existentes**: `pin-pulse` en icon, hover scale en icons
- **Selectores disponibles**: `.why__img-wrap`, `.why__badge`, `.why__item`, `.why__btn`
- **Oportunidad**: Clip-path reveal en imagen, staggered entrance en why items.

### IndustriesSection (`src/components/sections/IndustriesSection.astro`)
- **Estructura**: `<section class="industries">` > `.container` > `.section-header` + `.industries__grid`
- **Grid items**: `.ind-card` (x6) con `--ind-color` CSS var
- **Animaciones CSS existentes**: hover glow, scale, translateY, arrow translateX
- **Selectores disponibles**: `.section-header`, `.ind-card`
- **Oportunidad**: ScrollTrigger batch para cards staggered.

### CTASection (`src/components/sections/CTASection.astro`)
- **Estructura**: `<section class="cta-section">` > `.cta-section__bg` (blobs) + `.cta-section__inner` (text + actions)
- **Blobs**: `.cta-section__blob--1`, `.cta-section__blob--2` — estáticos, sin animación
- **Selectores disponibles**: `.cta-section__blob`, `.cta-section__title`, `.cta-section__desc`, `.cta-section__actions`
- **Oportunidad**: Blobs animados (floating/scaling) + text entrance on scroll.

---

## 3. Páginas internas — Estado y estructura

### servicios.astro (`src/pages/servicios.astro`)
- Secciones: hero (inline), services grid, CTA
- **Cards**: `.service-card` con CSS animation `fadeInUp` + `animation-delay: var(--delay)` — **se ejecuta en load, no en scroll**
- **Selectores**: `.service-card`, `.hero__content`, `.cta__container`
- **Oportunidad**: Reemplazar fadeInUp CSS con ScrollTrigger batch. Problema: la animación CSS actual fuerza `opacity: 0` en initial state sin fallback JS.

### industrias.astro (`src/pages/industrias.astro`)
- Misma estructura que servicios: hero, industry grid, CTA
- **Cards**: `.industry-card` con CSS animation `fadeInUp` + delay — misma observación que servicios.
- **Selectores**: `.industry-card`, `.hero__content`, `.cta__container`

### nosotros.astro (`src/pages/nosotros.astro`)
- Secciones: `.page-hero`, `.about-section` (`.about-card` x4), `.quote-section`
- **Sin animaciones** actualmente.
- **Selectores**: `.about-card`, `.quote`, `.quote__text`

### cotizar.astro (`src/pages/cotizar.astro`)
- Secciones: `.page-hero`, `.quote-section` (sidebar + form)
- **Sin animaciones** actualmente.
- **Selectores**: `.quote-info`, `.quote-form-wrap`, `.quote-features li`

### contacto.astro (`src/pages/contacto.astro`)
- Secciones: `.page-hero`, `.contact-section` (info + form)
- **Sin animaciones** actualmente.
- **Selectores**: `.contact-info`, `.contact-form-wrap`, `.contact-method`

### 404.astro (`src/pages/404.astro`)
- Sección única: `.error-page` con `.error-page__code` (404), title, lead, CTA
- **Sin animaciones** actualmente.
- **Selectores**: `.error-page__code`, `.error-page__title`, `.error-page__lead`, `.error-page__cta`
- **Oportunidad**: Bounce/glitch effect en "404".

### servicios/carga-aerea.astro (`src/pages/servicios/carga-aerea.astro`)
- Secciones: `.service-hero`, `.service-features` (`.feature-card` x4), `.service-cta`
- **Sin animaciones de entrada** (solo hover transitions en cards).
- **Selectores**: `.feature-card`, `.service-hero__content`, `.service-cta__inner`

### servicios/carga-maritima.astro (`src/pages/servicios/carga-maritima.astro`)
- Estructura idéntica a carga-aerea.
- **Selectores**: `.feature-card`, `.service-hero__content`, `.service-cta__inner`

---

## 4. Test coverage

- **No hay tests** — no existen archivos `.test.*` ni `.spec.*` en el proyecto.
- No hay framework de testing configurado (no vitest, no playwright, no jest en package.json).

---

## 5. Dependencias y conflictos potenciales

| Aspecto | Estado | Riesgo |
|---------|--------|--------|
| GSAP ScrollTrigger | Bundled con gsap@3.14.2, solo importar y registrar | Ninguno |
| CSS `fadeInUp` en servicios/industrias | `opacity: 0` en initial state sin JS fallback — si GSAP reemplaza esto, hay que eliminar la CSS animation | Medio — si no se remueve la CSS animation habrá conflicto |
| global.css `prefers-reduced-motion` | Anula `animation-duration` y `transition-duration` pero **no afecta GSAP** (JS runtime) | Medio — GSAP debe verificar `prefers-reduced-motion` explícitamente en cada script |
| CSS hover transitions en cards | Coexisten con GSAP entrance — no hay conflicto siempre que GSAP opere sobre `opacity`/`y` y CSS hover sobre `transform`/`shadow` | Bajo — usar `clearProps` tras animación de entrada |
| `motion` library | Instalada pero no usada — irrelevante para este cambio | Ninguno |
| Hero GSAP existente | Patrón de referencia, no hay que modificarlo | Ninguno |

---

## 6. Approaches recomendados

### Approach A: Utilidad reutilizable con data-attributes (Recomendado)

**Descripción**: Crear un script reutilizable `src/scripts/scroll-animations.ts` que auto-descubre elementos con `data-scroll-*` attributes y les aplica ScrollTrigger.

**Mecanismo**:
- `data-scroll-animate` → marca un elemento para entrance animation
- `data-scroll-delay` → delay escalonado (0, 0.1, 0.2...)
- `data-scroll-type` → tipo de animación (fade-up, fade-left, clip-reveal, counter, bounce, glitch)
- El script se importa en `BaseLayout.astro` para funcionar en todas las páginas.
- Respeta `prefers-reduced-motion` centralizadamente.
- Para contadores: `data-scroll-counter="20"` con suffix.

**Pros**:
- DRY: una sola implementación para todo el sitio
- Escalable: nuevos componentes solo necesitan data-attributes
- Separation of concerns: HTML declara la intención, JS ejecuta
- Sigue el patrón de data-attributes ya establecido en HeroSection
- Fácil de desactivar por componente

**Contras**:
- Requiere agregar data-attributes a cada componente
- Puede ser menos granular para animaciones muy customizadas (CTA blobs, 404 glitch)

**Esfuerzo**: Medio (2-3 días)

### Approach B: Scripts inline por componente

**Descripción**: Agregar `<script>` inline en cada componente/página que necesite animaciones, similar al patrón actual de HeroSection.

**Pros**:
- Máximo control por componente
- Cada sección es autocontenida
- Fácil de entender en aislamiento

**Contras**:
- Mucha duplicación (prefers-reduced-motion check, ScrollTrigger setup)
- Cada nuevo componente necesita reimplementar la lógica
- Más propenso a inconsistencias

**Esfuerzo**: Medio-alto (3-4 días por la repetición)

### Approach C: Híbrido — Utilidad genérica + scripts especializados

**Descripción**: Approach A para el 80% (entrances genéricas) + scripts inline para casos especiales (contadores animados en Stats, clip-path en Why, blobs en CTA, bounce/glitch en 404).

**Pros**:
- Lo mejor de ambos mundos
- Genérico donde se puede, específico donde se necesita
- Los casos especiales (contadores, clip-path, 404) se benefician de control granular
- La utilidad genérica cubre las entradas repetitivas

**Contras**:
- Dos patrones a mantener (aunque limitados y claros)

**Esfuerzo**: Medio (2-3 días)

---

## 7. Recomendación

**Approach C (Híbrido)** es el más adecuado por:

1. La utilidad `data-scroll-animate` cubre el ~80% de los casos (fade-up staggered en cards, section headers, form elements).
2. Los 4 casos especiales justifican scripts dedicados:
   - **Stats counters**: requiere lógica de parsing de números y `gsap.to` con `snap`
   - **Why clip-path reveal**: requiere `clipPath` animation específica
   - **CTA blobs**: requiere animación ambient continua (scaling/floating)
   - **404 bounce/glitch**: efecto único, una sola página
3. Se alinea con KISS/DRY sin sacrificar la capacidad de hacer cosas específicas.

### Archivos a crear/modificar

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/scripts/scroll-animations.ts` | **Crear** | Utilidad reutilizable ScrollTrigger con data-attributes |
| `src/layouts/BaseLayout.astro` | **Modificar** | Importar scroll-animations.ts |
| `src/components/sections/StatsSection.astro` | **Modificar** | Agregar data-attributes + inline script para contadores |
| `src/components/sections/ServicesSection.astro` | **Modificar** | Agregar data-attributes para scroll entrance |
| `src/components/sections/WhySection.astro` | **Modificar** | data-attributes + inline script para clip-path reveal |
| `src/components/sections/IndustriesSection.astro` | **Modificar** | Agregar data-attributes para scroll entrance |
| `src/components/sections/CTASection.astro` | **Modificar** | Agregar data-attributes + inline script para blobs |
| `src/pages/servicios.astro` | **Modificar** | data-attributes en cards + remover CSS fadeInUp animation |
| `src/pages/industrias.astro` | **Modificar** | data-attributes en cards + remover CSS fadeInUp animation |
| `src/pages/nosotros.astro` | **Modificar** | data-attributes en about-cards y quote |
| `src/pages/cotizar.astro` | **Modificar** | data-attributes en form section |
| `src/pages/contacto.astro` | **Modificar** | data-attributes en contact section |
| `src/pages/404.astro` | **Modificar** | Inline script para bounce/glitch en "404" |
| `src/pages/servicios/carga-aerea.astro` | **Modificar** | data-attributes en feature-cards |
| `src/pages/servicios/carga-maritima.astro` | **Modificar** | data-attributes en feature-cards |

### Riesgos identificados

1. **CSS fadeInUp conflict**: Las páginas servicios.astro e industrias.astro usan CSS `animation: fadeInUp` con `opacity: 0` initial. Si GSAP reemplaza esto, **hay que remover la CSS animation** para evitar conflicto de estado. Si JS falla, las cards quedan invisibles → necesita fallback.
2. **Performance con muchas cards**: Las páginas servicios (11 cards) e industrias (14 cards) necesitan `ScrollTrigger.batch()` en vez de triggers individuales para evitar overhead.
3. **prefers-reduced-motion**: Cada script inline debe respetar la preferencia. La utilidad centralizada lo maneja pero los scripts especiales deben hacerlo también.
4. **Astro island hydration**: Los scripts se ejecutan en el cliente; Astro procesa `<script>` tags de componentes una sola vez por módulo. Scripts inline en componentes que se repiten (e.g., si el mismo componente se usa en varias páginas) comparten el mismo módulo → ok para esta arquitectura.
