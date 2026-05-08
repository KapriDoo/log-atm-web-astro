---
type: design
change_name: "alinear-contenido-notion"
created: "2026-05-08"
---

# Diseño técnico — alinear-contenido-notion

## Decisiones arquitectónicas

Ninguna decisión arquitectónica significativa. El cambio es de contenido + UI menor.

## Output Expected

### Archivos a modificar

1. `src/lib/constants.ts`
   - Extender `SERVICES` con 6 items nuevos (n: 06-11)
   - Extender `INDUSTRIES` con 8 items nuevos
   - Reemplazar `STATS` con 4 items corregidos
   - Extender `NAV_LINKS` para soportar estructura de dropdown

2. `src/components/ui/Navbar.astro`
   - Agregar dropdown nativo para "Servicios" e "Industrias"
   - JS vanilla para toggle, click-outside, Escape, focus trap
   - ARIA roles y atributos
   - Adaptar drawer mobile para mostrar grupos

### Archivos sin cambios (consumo automático)

- `src/components/sections/ServicesSection.astro` — itera SERVICES
- `src/components/sections/IndustriesSection.astro` — itera INDUSTRIES
- `src/components/sections/StatsSection.astro` — itera STATS

## Referencias a ADRs

Ninguna — no aplica.

## Alternativas descartadas

- React island para dropdown: descartado por overkill y bundle innecesario.
- CSS-only con `<details>`: descartado por limitaciones de UX (cierre click-outside, animaciones).
