---
type: capability-spec
title: "Contraste del título en heroes de páginas internas"
capability: "internal-page-heroes"
slug: "hero-title-contrast"
domain: "fix"
delta_type: "behavior-correction"
supersedes: null
superseded_by: null
status: review
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["2b35b92"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] El título h1 del hero en /industrias, /nosotros, /contacto y /cotizar se muestra en color blanco sobre el fondo de imagen"
  - "[x] El contraste del título contra el fondo de imagen del hero cumple WCAG AA (ratio ≥ 4.5:1)"
  - "[x] Ninguna regla de cascada posterior sobreescribe el color del título a oscuro en estas páginas"
  - "[x] El comportamiento de animación de entrada del hero definido en la spec base de internal-page-heroes no se altera"
related: ["[[internal-page-heroes/spec]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/global.css"
verified_at: null
---

## Purpose

El título principal (`h1`) de los heroes en las páginas internas se muestra en color negro en lugar de blanco, lo que lo hace ilegible sobre las imágenes de fondo del hero. La corrección debe garantizar que el título sea siempre blanco con contraste WCAG AA cuando existe una imagen de fondo en el hero.

## Requirements

- **SHALL**: el elemento `.page-hero__title` DEBE renderizarse en color blanco en todos los heroes de páginas internas que tienen imagen de fondo.
- **MUST**: el color blanco DEBE tener suficiente contraste con las imágenes de fondo del hero para cumplir WCAG AA (ratio ≥ 4.5:1 medido contra la zona más clara de la imagen base).
- **MUST**: la corrección DEBE sobrevivir a la cascada de Tailwind v4 con `@layer components`, es decir, la regla de color blanco DEBE tener precedencia sobre cualquier reset de color aplicado por la capa base del framework.
- **SHOULD**: si el hero no tiene imagen de fondo, el color del título DEBE seguir siendo legible según el contexto visual de la página.

## Scenarios

### Scenario 1: Título visible sobre imagen de fondo

GIVEN que el usuario navega a cualquier página interna con hero (`/industrias`, `/nosotros`, `/contacto`)
WHEN la página carga y el hero se muestra con su imagen de fondo
THEN el título h1 del hero aparece en color blanco, claramente legible sobre la imagen

### Scenario 2: Contraste suficiente para accesibilidad

GIVEN que el hero muestra una imagen de fondo con zonas de alto brillo
WHEN el usuario o una herramienta de accesibilidad mide el contraste del título
THEN el ratio de contraste del texto blanco contra el área de fondo es ≥ 4.5:1 (WCAG AA)

### Scenario 3: Color persiste tras View Transitions

GIVEN que el usuario navega de una página a otra usando View Transitions del navegador
WHEN la página interna destino termina de cargar su hero
THEN el título del hero sigue siendo blanco, sin flash de color oscuro durante la transición

## Acceptance Criteria

- [ ] En `/industrias`, `/nosotros` y `/contacto`, el título h1 del hero se muestra en color blanco
- [ ] En `/cotizar`, el título del quote-hero se muestra en color blanco (si aplica imagen de fondo)
- [ ] El contraste texto-fondo supera ratio 4.5:1 (WCAG AA) según herramienta de medición en browser
- [ ] Ningún navegador moderno (Chrome, Firefox, Safari) muestra el título en color oscuro al cargar la página
