---
type: tasks
change_name: "fix-hero-styles"
created: "2026-05-10"
---

# Tasks — fix-hero-styles

## T1 — Restaurar estilos perdidos en HeroSection tras animaciones GSAP

**File**: `src/components/sections/HeroSection.astro`
**Líneas/ocurrencias**: Todo el componente — revisar estructura HTML y clases CSS
**Acción**: Verificar que las clases de Tailwind y estilos personalizados no fueron eliminados o sobrescritos al integrar GSAP. Restaurar la cuadrícula de fondo y el formato visual del contenido.
**Justificación**: El contenido se muestra como texto plano sin formato, indicando que los estilos CSS (probablemente clases de Tailwind o imports de hoja de estilos) se perdieron durante la implementación de animaciones.

**Acceptance**:
- [x] El HeroSection muestra el fondo con cuadrícula correctamente
- [x] El contenido (títulos, subtítulos, botones) tiene formato visual aplicado
- [x] Las animaciones GSAP siguen funcionando
- [x] No hay regresiones visuales en otros breakpoints

## T2 — Verificar hoja de estilos hero.css

**File**: `src/styles/sections/hero.css`
**Líneas/ocurrencias**: Revisar archivo completo
**Acción**: Confirmar que la hoja de estilos existe y está siendo importada correctamente en HeroSection.astro. Restaurar cualquier regla CSS necesaria para la cuadrícula de fondo.
**Justificación**: El archivo puede haberse desvinculado o sus reglas pueden haberse sobrescrito.

**Acceptance**:
- [x] hero.css está importado en HeroSection.astro (vía sections.css desde pages/index.astro)
- [x] Las reglas de cuadrícula de fondo están presentes y activas (.hero__grid-lines con linear-gradient)
- [x] No hay conflictos de especificidad con Tailwind

## Notas de diagnóstico (sdd-apply)

**Causa raíz**: Tras el commit `91d819e feat(hero): implementar animaciones GSAP`, se introdujo la
regla CSS `.animate-on-load { opacity: 0; transform: translateY(20px); }` que oculta el
contenido del hero antes de que el JS de GSAP cargue. Si el script falla, tarda en cargar,
o se produce cualquier error de timing, los elementos `[data-hero-badge|title|lead|ctas|trust]`
quedan invisibles permanentemente — produciendo la apariencia de "texto plano sin formato"
reportada (el navegador solo muestra los pocos elementos sin la clase, en flujo vertical).

**Fix aplicado**:
1. `src/styles/sections/hero.css`: removida la regla `.animate-on-load { opacity:0 }` y sus
   fallbacks (`@media prefers-reduced-motion` y `@media scripting: none`). Ahora el contenido
   es **visible por defecto** — fail-safe ante cualquier fallo de JS.
2. `src/components/sections/HeroSection.astro`: el script GSAP ahora aplica `gsap.set()` para
   ocultar inicialmente los elementos y usa `fromTo()` (en lugar de `from()`) para no depender
   del estado computed del DOM. Si el script no corre, los elementos permanecen visibles.

**Build**: `npm run build` pasa sin errores (3.10s, 9 páginas, 32 clases `hero__*` en CSS).
