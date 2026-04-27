---
type: proposal
change_name: "centralizar-estilos"
domain: "refactoring"
status: pending-approval
iteration: 1
created: "2026-04-26"
updated: "2026-04-26"
tags: [proposal]
---

# Propuesta: centralizar-estilos

## Intent

Centralizar todos los tokens de diseño (colores, espaciados, tipografía, opacidades, sombras) en un único archivo fuente de verdad (`tokens.css`), eliminar la duplicación entre `global.css` y `tokens.css`, y reemplazar todos los valores hardcodeados en componentes y estilos por referencias a tokens. Esto reduce la deuda técnica y permite cambiar el sistema de diseño desde un solo lugar.

## Scope

**Incluye:**
- Consolidar tokens en `src/styles/tokens.css` como única fuente de verdad
- Eliminar duplicación de tokens en `src/styles/global.css` (mantener solo imports y clases utilitarias)
- Crear tokens semánticos para opacidades, sombras, border-radius y espaciados
- Reemplazar rgba/opacidades literales en `hero.css`, `services.css`, `cta.css`, `why.css`, `industries.css`
- Reemplazar colores inline en `HeroSection.astro`, `WhySection.astro`, `Navbar.astro`, `Footer.astro`
- Evaluar y migrar colores de industrias desde `src/lib/constants.ts`
- Añadir comentarios/documentación sobre convención "no hardcodear"

**Excluye explícitamente:**
- Rediseño visual o cambios de branding (solo centralización)
- Implementación de dark mode (preparar tokens facilita el trabajo futuro, pero no se implementa)
- Cambios en la arquitectura de componentes Astro/React
- Migración de Tailwind v4 a otra versión

## Approach Propuesto

1. **Auditar y consolidar tokens**: Expandir `tokens.css` con tokens semánticos funcionales (opacidades, sombras, border-radius) usando `@theme` de Tailwind v4 y variables CSS en `:root`.
2. **Limpiar global.css**: Convertirlo en un archivo de importación puro (`@import './tokens.css'`) más clases utilitarias globales, sin definición duplicada de tokens.
3. **Reemplazo mecánico**: Identificar todos los literales hardcodeados (colores hex, rgba, px fijos) y sustituirlos por `var(--token)` o clases de Tailwind que referencien los tokens.
4. **Validación visual**: Comparar screenshots o inspección manual para confirmar que no hay regresiones visuales tras el reemplazo.

## Esfuerzo Estimado

M — Cambios mecánicos pero extensos en ~12 archivos. Requiere validación visual cuidadosa para evitar regresiones.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Regresiones visuales por error en reemplazo de rgba/opacidades | Media | Revisión visual manual archivo por archivo; comparar antes/después |
| Incompatibilidad entre tokens `@theme` y variables `:root` en Tailwind v4 | Media | Validar que Tailwind v4 resuelve correctamente los tokens en build |
| Tokens de industrias en constants.ts requieren lógica JS, no solo CSS | Baja | Evaluar si crear un mapa de tokens en JS o mantener en constants.ts con referencias a CSS vars |

## Trade-offs

- **A favor**: Mantenimiento simplificado, consistencia visual garantizada, facilita futuro dark mode, reduce deuda técnica en nuevos componentes
- **En contra**: Inversión de tiempo en refactorización sin cambio funcional visible para usuarios finales, riesgo de regresiones visuales menores
