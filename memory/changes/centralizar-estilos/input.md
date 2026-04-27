---
type: external-input
domain: refactoring
---
# Input externo para centralizar-estilos

## Estado actual

### Colores hardcodeados en componentes Astro
- `HeroSection.astro:47` — colores avatar inline: `#658fc3`, `#3b6497`, `#4A7BB5`
- `WhySection.astro:12` — rect SVG placeholder: `#aec7e5`, `#2b4e78`
- `constants.ts:140-145` — colores industrias hardcodeados en array INDUSTRIES

### Valores hardcodeados en CSS sections
- `hero.css` — múltiples valores rgba(`255,255,255`, 0.x), px fijos (`600px`, `400px`, etc.), opacidades literales (`0.25`, `0.15`)
- `services.css` — sombras con rgba hardcodeado: `rgba(74,123,181,0.14)`, overlay gradient con `rgba(74,123,181,0.92)` y `rgba(204,118,20,0.92)`
- `cta.css` — sombras con rgba: `rgba(62,185,120,0.40)`
- `why.css` — sombras con rgba: `rgba(74,123,181,0.18)`, `rgba(0,0,0,0.10)`, border-radius `24px` hardcodeado
- `industries.css` — fallback color hardcodeado `#4A7BB5` en `color-mix()`

### Estilos inline en componentes con `<style>`
- `Footer.astro:214` — color WhatsApp hardcodeado `#128C7E`
- `Footer.astro:223` — hover WhatsApp hardcodeado `#1da851`
- `Navbar.astro` — múltiples valores px/rgba hardcodeados en estilos inline (`rgba(255,255,255,0.92)`, `rgba(74,123,181,0.10)`, tamaños fijos)

### Duplicación de tokens
- `global.css` duplica completamente los tokens de `tokens.css` (ambos definen la misma paleta `@theme`)
- `tokens.css` define tokens en `:root` y luego en `@theme`, duplicando valores
- Los tokens funcionales en `:root` usan `var()` pero en `@theme` repiten los hex literales

## Estado deseado

1. **Unificar fuente de verdad**: Consolidar todos los tokens en `tokens.css` y eliminar duplicación
2. **Crear tokens para opacidades**: Reemplazar rgba literales con `color-mix()` o tokens de opacidad
3. **Crear tokens de dimensión**: Extraer valores repetidos como border-radius, sombras, espaciados a tokens
4. **Eliminar colores inline**: Mover colores de industrias a tokens semánticos o usar tokens existentes
5. **Limpiar global.css**: Importar tokens sin duplicar definiciones
6. **Documentar reglas**: Añadir comentarios claros sobre "no hardcodear"

## Archivos/módulos afectados

- `src/styles/tokens.css` — consolidar y expandir tokens
- `src/styles/global.css` — eliminar duplicación de tokens, mantener solo imports y clases utilitarias
- `src/styles/sections/hero.css` — reemplazar rgba/opacidades por tokens
- `src/styles/sections/services.css` — reemplazar rgba/opacidades por tokens
- `src/styles/sections/cta.css` — reemplazar rgba/opacidades por tokens
- `src/styles/sections/why.css` — reemplazar rgba/opacidades por tokens
- `src/styles/sections/industries.css` — reemplazar fallback color por tokens
- `src/components/sections/HeroSection.astro` — reemplazar colores inline por tokens
- `src/components/sections/WhySection.astro` — reemplazar colores SVG por tokens
- `src/components/ui/Navbar.astro` — reemplazar valores hardcodeados por tokens
- `src/components/ui/Footer.astro` — reemplazar colores WhatsApp por tokens semánticos
- `src/lib/constants.ts` — evaluar si colores de industrias deben moverse a tokens

## Justificación de prioridad

- **Alta**: Cada nuevo componente aumenta la deuda técnica al copiar valores literales
- **Alta**: Cambiar el color de marca requiere edits en 15+ archivos actualmente
- **Media**: Riesgo de inconsistencias visuales cuando se actualizan tokens pero no los hardcodeos
- **Media**: Dificulta la implementación de dark mode futura
