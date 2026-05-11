---
type: proposal
change_name: "gsap-scroll-animations"
status: approved
effort: "M"
created: "2026-05-10"
---

# Propuesta — gsap-scroll-animations

## Intent

Agregar animaciones scroll-triggered con GSAP ScrollTrigger a todo el sitio LOG ATM. Las 5 secciones del homepage y las 8 páginas internas actualmente carecen de animaciones de entrada por scroll (solo HeroSection tiene GSAP, sin ScrollTrigger). El objetivo es dar vida al sitio con entradas progresivas mientras el usuario hace scroll, más 4 efectos especializados: contadores animados, clip-path reveal, blobs flotantes y efecto 404.

## Scope

**1 archivo nuevo** + **14 archivos modificados**:

| Archivo | Acción |
|---------|--------|
| `src/scripts/scroll-animations.ts` | Crear — utilidad reutilizable data-attribute driven |
| `src/layouts/BaseLayout.astro` | Modificar — importar la utilidad |
| `src/components/sections/StatsSection.astro` | Modificar — data-attrs + script contadores |
| `src/components/sections/ServicesSection.astro` | Modificar — data-attrs entrance |
| `src/components/sections/WhySection.astro` | Modificar — data-attrs + script clip-path |
| `src/components/sections/IndustriesSection.astro` | Modificar — data-attrs entrance |
| `src/components/sections/CTASection.astro` | Modificar — data-attrs + script blobs |
| `src/pages/servicios.astro` | Modificar — data-attrs + remover CSS fadeInUp |
| `src/pages/industrias.astro` | Modificar — data-attrs + remover CSS fadeInUp |
| `src/pages/nosotros.astro` | Modificar — data-attrs |
| `src/pages/cotizar.astro` | Modificar — data-attrs |
| `src/pages/contacto.astro` | Modificar — data-attrs |
| `src/pages/404.astro` | Modificar — script bounce/glitch |
| `src/pages/servicios/carga-aerea.astro` | Modificar — data-attrs |
| `src/pages/servicios/carga-maritima.astro` | Modificar — data-attrs |

## Approach

**Híbrido (Approach C)**: utilidad genérica + scripts especializados.

1. **Utilidad reutilizable** (`scroll-animations.ts`): registra ScrollTrigger, busca elementos con `data-scroll-animate`, aplica fade-up/stagger con `ScrollTrigger.batch()`. Respeta `prefers-reduced-motion` centralizadamente. Se carga desde `BaseLayout.astro` para funcionar en todas las páginas.

2. **Scripts especializados** (inline en 4 componentes):
   - **StatsSection**: contadores animados con `gsap.to()` + `snap` para interpolar valores numéricos.
   - **WhySection**: `clipPath` reveal progresivo en la imagen.
   - **CTASection**: blobs con animación ambient continua (scaling/floating loop).
   - **404**: bounce/glitch one-shot en el texto "404".

3. **Migración CSS→GSAP** en servicios.astro e industrias.astro: remover `@keyframes fadeInUp` y `opacity: 0` initial, reemplazar con data-attrs para que la utilidad ScrollTrigger los maneje. Agregar fallback `<noscript>` o CSS class para evitar contenido invisible si JS falla.

4. **Patrón**: `data-scroll-animate`, `data-scroll-delay`, `data-scroll-type` — consistente con el patrón `data-*` ya usado en HeroSection.

## Trade-offs

| Decisión | A favor | En contra |
|----------|---------|-----------|
| Utilidad data-attribute vs scripts inline por componente | DRY, escalable, un solo punto de mantenimiento | Menos control granular para casos edge |
| Híbrido (genérico + 4 scripts especiales) vs todo genérico | Cada caso especial tiene lógica única que no cabe en attrs | Dos patrones a mantener (mitigado: los 4 scripts son claramente distintos) |
| `ScrollTrigger.batch()` para grids grandes | Mejor performance con 11-14 cards | API ligeramente distinta al trigger individual |
| Remover CSS fadeInUp en servicios/industrias | Elimina conflicto opacity dual | Requiere fallback para no-JS (cards invisibles) |
| Cargar utilidad globalmente en BaseLayout | Funciona en todas las páginas sin config adicional | Carga el script incluso en páginas sin animaciones (mitigado: tree-shaking + tamaño mínimo) |

## Risks

1. **CSS fadeInUp conflict (Medio)**: servicios.astro e industrias.astro tienen `opacity: 0` + CSS animation. Si no se remueve al migrar a GSAP, habrá doble control del opacity. **Mitigación**: remover la CSS animation y agregar class `.no-js` fallback.

2. **Performance con muchos triggers (Bajo)**: usar `ScrollTrigger.batch()` en grids de 11-14 cards en vez de triggers individuales.

3. **prefers-reduced-motion inconsistente (Medio)**: CSS global anula `animation-duration` pero no afecta GSAP (JS runtime). **Mitigación**: la utilidad centralizada verifica `matchMedia` y los 4 scripts especiales replican el check.

4. **Astro script deduplication (Bajo)**: Astro procesa `<script>` tags de componentes una sola vez por módulo. No es problema para esta arquitectura ya que cada componente es único.

## Estimated Effort

**M (Medium)** — 2-3 días de desarrollo.

- 1 archivo nuevo (utilidad ~80-120 líneas)
- 14 archivos modificados (mayoría solo agregan data-attributes, 4 con scripts inline de 15-30 líneas cada uno)
- 2 archivos requieren migración CSS→GSAP (servicios, industrias)
- Sin tests que mantener (no hay framework de testing)
