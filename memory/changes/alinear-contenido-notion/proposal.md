---
type: proposal
change_name: "alinear-contenido-notion"
created: "2026-05-08"
---

# Propuesta — alinear-contenido-notion

## Intent

Alinear el contenido del sitio web LOG ATM con las anotaciones de la usuaria en Notion, actualizando servicios, industrias, estadísticas y navegación.

## Scope

- `src/lib/constants.ts` — arrays SERVICES, INDUSTRIES, STATS
- `src/components/ui/Navbar.astro` — dropdown de navegación
- `src/components/sections/ServicesSection.astro` — renderizado de servicios
- `src/components/sections/IndustriesSection.astro` — renderizado de industrias
- `src/components/sections/StatsSection.astro` — renderizado de stats

## Approach

1. **Contenido**: Extender arrays en constants.ts con los valores indicados por la usuaria
2. **Navbar**: Implementar dropdown nativo (JS vanilla + ARIA) para agrupar 11 servicios y 14 industrias, evitando saturar la barra de navegación
3. **Secciones**: No requieren cambios de código; consumirán los arrays ampliados automáticamente

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Dropdown no cierra correctamente en móvil | Baja | Medio | Testear toggle entre drawer y desktop |
| StatsSection layout se rompe con texto largo | Baja | Bajo | Verificar "Atendemos de manera personalizada" no overflowea |

## Esfuerzo estimado

**S** — Cambios de contenido directos + dropdown CSS/JS simple.
