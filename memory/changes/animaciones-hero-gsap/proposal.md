---
type: proposal
change_name: "animaciones-hero-gsap"
domain: "feature"
status: approved
iteration: 1
created: "2026-05-10"
updated: "2026-05-10"
tags: [proposal]
---

# Propuesta: animaciones-hero-gsap

## Intent

Agregar animaciones GSAP al HeroSection para mejorar la experiencia visual de entrada: stagger progresivo de elementos de contenido, movimiento continuo de cards flotantes, efectos decorativos en blobs y grid lines, y animación del wave SVG.

## Scope

**Incluye:**
- Animación stagger de entrada para: badge, título, lead, CTAs, trust indicators
- Animación yoyo/flotante para las 3 cards decorativas
- Animación de morphing/scale para los 2 blobs de fondo
- Reveal progresivo de grid lines
- Animación del path SVG del wave
- Soporte obligatorio `prefers-reduced-motion`

**Excluye explícitamente:**
- Animaciones en otras secciones (Stats, Services, etc.)
- Cambios de diseño visual o layout
- Refactor de arquitectura del componente

## Approach Propuesto

Inline script con GSAP vanilla dentro de `HeroSection.astro`, siguiendo el patrón existente en `Navbar.astro`. Las animaciones se registran con `gsap.timeline()` para el stagger de entrada, y `gsap.to()` con `yoyo:true` para las cards. El script detecta `prefers-reduced-motion` y hace `gsap.set()` con estados finales en ese caso. No se introduce React para mantener consistencia con el codebase actual.

## Esfuerzo Estimado

S — ~2-3 horas. El componente es estático, GSAP ya está instalado, y el approach es inline script consistente con el patrón del proyecto.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Accesibilidad: animaciones sin respetar `prefers-reduced-motion` | Baja | Script detecta la media query y hace skip de animaciones |
| Performance: FOUC si los elementos empiezan en `opacity:0` y GSAP falla | Baja | Fallback CSS con `opacity:1` por defecto, GSAP sobreescribe |
| Morphing de blobs sin plugin premium: limitado a scale/position | Media | Usar scale/rotate/position en lugar de morph SVG path verdadero |

## Trade-offs

- **A favor**: Consistencia con convención actual, sin overhead de React, implementación rápida
- **En contra**: Sin TypeScript en script inline, menos reutilizable que un componente extraído
