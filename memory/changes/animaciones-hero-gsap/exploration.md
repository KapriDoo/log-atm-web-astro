# Exploración: animaciones-hero-gsap

## Estado Actual

El HeroSection (`src/components/sections/HeroSection.astro`) es un componente Astro puro con markup estático y estilos CSS. Actualmente cuenta con una única animación: el badge-dot tiene un pulso CSS vía `@keyframes hero-badge-pulse`. No hay animaciones de entrada, ni efectos en las cards flotantes, ni morphing de blobs, ni reveal de grid lines, ni animación del wave SVG.

El proyecto no tiene componentes React (.tsx/.jsx) en `src/components/`. El patrón de scripts cliente es inline `<script>` dentro de archivos `.astro`, como se observa en `Navbar.astro` (línea 467-581).

GSAP 3.14.2 está instalado en `package.json` pero no se utiliza en ningún archivo del proyecto.

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| `src/components/sections/HeroSection.astro` | Componente principal del Hero | Requiere script GSAP inline o isla React para animaciones |
| `src/styles/sections/hero.css` | Estilos del Hero | Posible ajuste de estados iniciales para animaciones (opacity:0, transforms) |
| `src/styles/global.css` | Estilos globales | Ya tiene soporte `prefers-reduced-motion` — extender al nuevo script |
| `src/pages/index.astro` | Página home | No requiere cambios si las animaciones son self-contained en HeroSection |

## Approaches Posibles

### Approach A: Inline script con GSAP vanilla (patrón Navbar)
- **Pros**: Consistente con convención actual del proyecto. Sin overhead de islas React. GSAP se carga solo donde se usa. Acceso directo al DOM.
- **Contras**: Menos estructurado para timelines complejos. Sin TypeScript en el script inline (a menos que se use un archivo `.ts` separado).
- **Esfuerzo**: S

### Approach B: Isla React con GSAP
- **Pros**: Mejor DX con TypeScript. Reutilizable si se extrae a componente. GSAP plugins (MorphSVG, DrawSVG) más fáciles de integrar.
- **Contras**: Rompe convención actual (no hay React en components/). Overhead de hidratación. Client directive necesaria.
- **Esfuerzo**: M

### Approach C: Componente Astro + script `.ts` importado
- **Pros**: Mantiene el componente Astro puro. Script en archivo separado con tipos. Reutilizable.
- **Contras**: Requiere configurar imports de GSAP en Astro (posiblemente via `vite.ssr.noExternal`).
- **Esfuerzo**: M

## Recomendación

**Approach recomendado**: **A** (inline script con GSAP vanilla)
**Justificación**: El proyecto no usa React en components/ y el patrón establecido es inline scripts en Astro. Las animaciones solicitadas (stagger entrance, yoyo, morphing, reveal, path) son manejables con GSAP vanilla en un script inline. Se puede extraer a un archivo `.ts` importado si el script crece.

## Riesgos Identificados

1. **Accesibilidad**: Nuevas animaciones deben respetar `prefers-reduced-motion`. El global.css ya tiene la media query base; el script debe detectarla y skippear.
2. **Performance**: GSAP es ~90KB. Cargar en home page es aceptable si se usa `requestIdleCallback` o `DOMContentLoaded`. No usar `client:load` ya que no es isla.
3. **SSR/SSG**: Astro genera HTML estático. El script inline corre en cliente sin problema.
4. **Ecosistema**: No hay ejemplos previos de GSAP en el repo. El desarrollador debe conocer la API de GSAP.

## Observaciones

- No se detectó deuda técnica relevante para promover.
- El wave SVG path actual es estático: `M0,60 C240,20 480,80 720,40 C960,0 1200,60 1440,40 L1440,80 L0,80 Z`. GSAP puede animar el atributo `d` vía `gsap.to()`.
- Los blobs son `<div>` con border-radius. Morphing requiere convertirlos a `<svg>` con paths o usar plugin `MorphSVG` (premium). Alternativa: animar scale/opacity/position con GSAP sin morphing verdadero.
- Las grid lines son un pseudo-elemento vía background-image. Para reveal, se puede animar opacity o clip-path del contenedor.
