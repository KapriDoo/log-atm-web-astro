# Exploración: redesign-experiencia-sector

## Estado Actual

La sección "Experiencia en tu sector" se presenta en dos lugares del sitio:

1. **Home page** (`src/pages/index.astro`): usa el componente `IndustriesSection.astro` que renderiza una grid de 14 tarjetas con iconos SVG de Lucide (`lucide:*`), nombre de la industria, subtítulo corto y color distintivo. Cada tarjeta tiene efectos hover (elevación, glow difuminado, escala de icono). [fuente: código src/components/sections/IndustriesSection.astro]

2. **Página /industrias** (`src/pages/industrias.astro`): renderiza el mismo listado de 14 industrias pero en formato expandido — tarjetas más grandes con descripción detallada, lista de especialidades y el mismo icono Lucide. Los estilos están embebidos en la página. [fuente: código src/pages/industrias.astro]

Los datos de las 14 industrias (icono, nombre, subtítulo/descripción, color) están centralizados en `src/lib/constants.ts` bajo la constante `INDUSTRIES`. [fuente: código src/lib/constants.ts]

Los estilos de la sección en la home viven en `src/styles/sections/industries.css` y aplican un diseño card-based con glow de fondo, border-radius, transiciones y responsive. [fuente: código src/styles/sections/industries.css]

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| `src/components/sections/IndustriesSection.astro` | Componente de la home page | Alta — debe cambiar de icono SVG a imagen fotográfica; potencialmente reestructurar markup para soportar imágenes |
| `src/pages/industrias.astro` | Página dedicada de industrias | Alta — mismo cambio de iconos a fotografías; estilos embebidos a ajustar |
| `src/lib/constants.ts` | Fuente de datos centralizada | Media — agregar campo `image` (o similar) a cada industria; mantener backward compat si otros usan `icon` |
| `src/styles/sections/industries.css` | Estilos de la sección en home | Media — adaptar estilos para imágenes (obj-fit, aspect-ratio, overlay, etc.) |
| `public/industries/` (nuevo) | Directorio de assets fotográficos | Nuevo — alojar 14 imágenes; idealmente optimizadas (Sharp/WebP) |
| `DESIGN.md` (posible) | Tokens de diseño | Baja — verificar si hay reglas visuales para cards con imágenes |

## Approaches Posibles

### Approach A: Imagen como background de la card
- **Pros**: Fácil de implementar, mantiene layout existente, imagen cubre toda la card
- **Contras**: Puede afectar legibilidad del texto sin overlay cuidadoso; menos control sobre posicionamiento de la imagen; accesibilidad requiere `alt` aunque sea decorativa
- **Esfuerzo**: S

### Approach B: Imagen en la parte superior de la card (header image)
- **Pros**: Patrón común y profesional, texto siempre legible sobre fondo sólido, fácilmente responsive
- **Contras**: Cambia la proporción visual de la card, requiere ajustar altura mínima
- **Esfuerzo**: S

### Approach C: Imagen circular/rounded como reemplazo directo del icono
- **Pros**: Menor cambio estructural, mantiene el layout actual casi intacto, las fotos actúan como "iconos grandes"
- **Contras**: Fotos pequeñas pueden perder impacto visual; 14 fotos circulares pueden verse repetitivas
- **Esfuerzo**: XS

## Recomendación

**Approach recomendado**: B (Imagen en header de la card)
**Justificación**: Ofrece el mejor balance entre impacto visual moderno, legibilidad de texto y mantenimiento de accesibilidad. Permite mostrar las fotografías con buen tamaño sin comprometer la información textual. Se alinea con el objetivo de un "estilo visual más moderno y profesional".

## Riesgos Identificados

- **Performance**: 14 imágenes fotográficas pueden afectar LCP si no están optimizadas. Mitigación: usar Astro Image/Sharp para generar WebP/AVIF responsive, implementar lazy loading.
- **Accesibilidad**: Las imágenes deben tener `alt` descriptivo. Si son decorativas, usar `alt=""` con `role="presentation"`. Mantener contraste WCAG 2.2 AA en texto sobre imagen.
- **Responsive**: Fotos en grid deben adaptarse bien en móvil. Mitigación: usar `object-fit: cover` con aspect-ratio consistente, probar breakpoints 639px y 479px.
- **Preferencias de movimiento**: Las transiciones hover actuales deben respetar `prefers-reduced-motion`.
- **Consistencia visual**: Las 14 fotos deben tener tratamiento visual uniforme (iluminación, estilo, color) para no romper la armonía del diseño.
