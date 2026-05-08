# Exploration — alinear-contenido-notion

## Estado actual

El sitio web LOG ATM (Astro 6.1.5 + Tailwind v4) centraliza su contenido en `src/lib/constants.ts` y lo consume mediante componentes Astro puros en `src/components/sections/` y `src/components/ui/`.

Actualmente:
- **SERVICES** tiene 5 items [fuente: código /src/lib/constants.ts:67-108]
- **INDUSTRIES** tiene 6 items [fuente: código /src/lib/constants.ts:143-150]
- **STATS** tiene 4 items incluyendo "5.000+ Envíos por año" [fuente: código /src/lib/constants.ts:59-64]
- **NAV_LINKS** tiene 6 links directos, sin dropdowns [fuente: código /src/lib/constants.ts:31-38]
- **Navbar.astro** itera NAV_LINKS en un `<ul>` plano [fuente: código /src/components/ui/Navbar.astro:14-22]
- **ServicesSection.astro** itera SERVICES en grid [fuente: código /src/components/sections/ServicesSection.astro:19-37]
- **IndustriesSection.astro** itera INDUSTRIES en grid [fuente: código /src/components/sections/IndustriesSection.astro:13-23]
- **StatsSection.astro** itera STATS [fuente: código /src/components/sections/StatsSection.astro:8-16]

## Archivos afectados

1. `src/lib/constants.ts` — agregar 6 servicios, 8 industrias, corregir stats
2. `src/components/ui/Navbar.astro` — implementar dropdown para Servicios e Industrias
3. `src/components/sections/ServicesSection.astro` — consumirá SERVICES ampliado (sin cambios de código)
4. `src/components/sections/IndustriesSection.astro` — consumirá INDUSTRIES ampliado (sin cambios de código)
5. `src/components/sections/StatsSection.astro` — consumirá STATS corregido (sin cambios de código)

## Approaches posibles

### Approach A — Dropdown CSS-only con `<details>`/`<summary>`
- Pros: Sin JS, accesible nativamente, mínimo impacto
- Contras: Estilización limitada en Safari, cierre al click outside requiere hack
- Esfuerzo: S

### Approach B — Dropdown con JS + ARIA (recomendado)
- Pros: Control total de comportamiento, accesibilidad ARIA completa, animaciones suaves, cierra al click outside y Escape
- Contras: Requiere ~80 líneas de JS inline en el componente Astro
- Esfuerzo: S

### Approach C — React island para navbar
- Pros: Reutilizable, estado manejado con hooks
- Contras: Overkill para un solo dropdown, agrega bundle de React a la navbar (siempre visible)
- Esfuerzo: M

## Recomendación

**Approach B** — Extender Navbar.astro con un dropdown nativo (no React) usando JS vanilla + ARIA. Es el más idiomático para Astro (componentes estáticos con JS progresivo) y mantiene el bundle ligero.

El cambio es de **contenido + UI menor**, sin decisiones arquitectónicas significativas.
