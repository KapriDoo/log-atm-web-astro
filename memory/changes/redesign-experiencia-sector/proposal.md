---
type: proposal
change_name: "redesign-experiencia-sector"
domain: "feature"
status: pending-approval
iteration: 1
created: "2026-05-10"
updated: "2026-05-10"
tags: [proposal]
---

# Propuesta: redesign-experiencia-sector

## Intent

Rediseñar la sección "Experiencia en tu sector" del sitio web para reemplazar los 14 iconos SVG actuales (Lucide) por imágenes fotográficas proporcionadas por el usuario. El objetivo es obtener un estilo visual más moderno, profesional y cercano al usuario final. Las imágenes deben integrarse de forma armoniosa en el diseño existente, manteniendo la responsividad, accesibilidad (WCAG 2.2 AA) y performance del sitio.

## Scope

**Incluye:**
- Adaptar `src/components/sections/IndustriesSection.astro` (home page) para mostrar imágenes fotográficas en lugar de iconos SVG
- Adaptar `src/pages/industrias.astro` (página dedicada) con el mismo reemplazo visual
- Agregar campo `image` a la estructura de datos `INDUSTRIES` en `src/lib/constants.ts`
- Crear directorio `public/industries/` para alojar las 14 imágenes optimizadas
- Actualizar estilos en `src/styles/sections/industries.css` para soportar cards con header image
- Optimizar imágenes (formato WebP/AVIF, lazy loading) usando Astro Image / Sharp
- Implementar `alt` text descriptivo y respetar `prefers-reduced-motion`
- Verificar responsividad en breakpoints 639px y 479px

**Excluye explícitamente:**
- No se modifica ninguna otra sección del sitio
- No se crean nuevas páginas ni rutas
- No se altera la estructura de navegación ni el menú principal
- No se modifica el contenido textual (nombres de industria, descripciones)
- No se rediseña el footer, header ni hero de la home

## Approach Propuesto

**Approach B: Imagen en la parte superior de la card (header image)**

Se adopta el patrón de card con imagen en la parte superior (header image), recomendado en la exploración por ofrecer el mejor balance entre impacto visual moderno, legibilidad de texto y mantenimiento de accesibilidad. Las tarjetas mantendrán su estructura actual pero reemplazarán el bloque de icono por una imagen fotográfica con `aspect-ratio` fijo, `object-fit: cover` y un gradiente sutil de overlay si el texto se posicionara sobre la imagen. En la página `/industrias`, las cards expandidas usarán el mismo patrón con mayor altura de imagen. Las imágenes se servirán desde `public/industries/` y se optimizarán en build time vía Astro Image.

## Esfuerzo Estimado

**S** — Cambio de UI acotado a dos componentes/ páginas, adaptación de estilos existentes, adición de campo a estructura de datos estática y optimización de assets. No involucra lógica de negocio ni cambios arquitectónicos.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Degradación de LCP por carga de 14 imágenes fotográficas | Media | Usar Astro Image/Sharp para generar WebP/AVIF responsive; implementar lazy loading (`loading="lazy"`) para imágenes fuera del viewport inicial; reservar espacio con `aspect-ratio` para evitar CLS |
| Texto ilegible sobre imagen sin tratamiento adecuado | Baja | Header image separada del bloque de texto (no overlap); si se requiere texto sobre imagen, aplicar overlay oscuro semi-transparente y verificar contraste WCAG AA |
| Fotos con estilos visuales inconsistentes entre sí | Media | Documentar requisitos de tratamiento visual en `clarifications.md` si el usuario entrega imágenes heterogéneas; aplicar filtro CSS uniforme (saturación, contraste) como último recurso |
| Responsive: imágenes se deforman o cortan mal en móvil | Baja | Usar `object-fit: cover` con `object-position: center`; definir alturas de header por breakpoint; probar en 639px y 479px |
| Accesibilidad: falta de `alt` descriptivo o elementos decorativos mal marcados | Baja | Cada imagen lleva `alt` con nombre de la industria; si es decorativa, usar `alt=""` + `role="presentation"`; mantener contraste de texto sobre fondo sólido |

## Trade-offs

- **A favor:** Mayor impacto visual y profesionalismo; las fotografías comunican mejor el contexto sectorial que los iconos abstractos; patrón header image es estándar y familiar para usuarios.
- **En contra:** Aumenta el peso total de la página (~14 imágenes vs. ~14 SVGs livianos); requiere gestión de assets adicionales (14 archivos de imagen); potencial impacto en LCP si no se optimizan adecuadamente; mayor complejidad de mantenimiento (cambiar una foto requiere reemplazar archivo físico).
