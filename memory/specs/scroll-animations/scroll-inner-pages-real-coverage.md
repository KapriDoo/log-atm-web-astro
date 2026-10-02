---
type: capability-spec
title: "Cobertura real de animaciones de entrada en las páginas internas"
capability: "scroll-animations"
slug: "scroll-inner-pages-real-coverage"
domain: "fix"
delta_type: "MODIFY"
supersedes: "[[scroll-animations/scroll-inner-pages]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[scroll-entrance-utility]]"
change_ref: "[[fix-internal-heroes-animation]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation"
feature_branch: "feature/fix-internal-heroes-animation"
commits: ["3cb43dc"]
mr: ""
acceptance_criteria:
  - "Las 5 páginas internas (servicios, industrias, nosotros, contacto y cotizar), en es/en/pt, muestran la entrada escalonada del hero al cargar la página"
  - "Las secciones de llamada a la acción (servicios, industrias y nosotros) y el pie de página (las 5 páginas) aparecen con animación de entrada al hacer scroll"
  - "El contenido de las páginas internas es visible sin JavaScript"
  - "La preferencia de movimiento reducido se respeta en las 5 páginas internas"
related:
  - "[[scroll-animations/scroll-inner-pages]]"
  - "[[internal-page-heroes/spec]]"
  - "[[scroll-entrance-utility]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/scripts/scroll-animations.ts"
  - "log-atm-web-astro/src/components/sections/CTASection.astro"
  - "log-atm-web-astro/src/components/ui/Footer.astro"
verified_at: null
created: "2026-10-02"
updated: "2026-10-02"
tags: [capability-spec]
---

# Cobertura real de animaciones de entrada en las páginas internas

## Purpose

La spec base declara entradas por scroll en las secciones de contenido de 7 páginas internas. El sitio tiene 5 páginas internas (servicios, industrias, nosotros, contacto y cotizar, en español, inglés y portugués) y sus secciones de contenido no llevan entradas por scroll propias. Esta spec fija la cobertura vigente: la entrada escalonada del hero en las 5 páginas (`animatePageHero`) y las entradas por scroll de la sección de llamada a la acción (`CTASection`) y del pie de página (`Footer`).

## Requirements

- El sistema SHALL animar la entrada del hero de las 5 páginas internas (servicios, industrias, nosotros, contacto y cotizar), en sus tres idiomas, una vez por carga de la página y con aparición escalonada de sus elementos.
- El sistema SHALL animar por scroll la entrada de la sección de llamada a la acción en las páginas internas que la incluyen (servicios, industrias y nosotros) y la del pie de página en las 5 páginas internas.
- El sistema SHALL NOT exigir entradas por scroll en las demás secciones de contenido de las páginas internas.
- El sistema SHALL garantizar que el contenido de las páginas internas es visible cuando JavaScript no está disponible.
- El sistema SHALL respetar la preferencia de movimiento reducido: con ella activa, el contenido es visible de inmediato y sin animaciones de entrada.

## Scenarios

### Scenario: Entrada del hero al abrir una página interna

**GIVEN** un visitante abre directamente la URL de una de las 5 páginas internas, en cualquiera de los tres idiomas
**WHEN** la página termina de cargar
**THEN** los elementos del hero aparecen uno tras otro con una entrada suave, una sola vez

### Scenario: Entrada por scroll de la llamada a la acción y del pie de página

**GIVEN** un visitante está en una página interna
**WHEN** hace scroll hasta la sección de llamada a la acción o hasta el pie de página
**THEN** esos bloques aparecen con su animación de entrada al entrar en pantalla

### Scenario: Página interna sin JavaScript

**GIVEN** un visitante abre una página interna con JavaScript deshabilitado
**WHEN** la página termina de cargar
**THEN** todo el contenido, incluido el hero, es visible en su posición final

### Scenario: Movimiento reducido

**GIVEN** un visitante con preferencia de movimiento reducido abre una página interna
**WHEN** la página carga y el visitante hace scroll
**THEN** todo el contenido es visible de inmediato, sin animaciones de entrada

## Acceptance Criteria

- [ ] Las 5 páginas internas (servicios, industrias, nosotros, contacto y cotizar), en es/en/pt, muestran la entrada escalonada del hero al cargar la página
- [ ] Las secciones de llamada a la acción (servicios, industrias y nosotros) y el pie de página (las 5 páginas) aparecen con animación de entrada al hacer scroll
- [ ] El contenido de las páginas internas es visible sin JavaScript
- [ ] La preferencia de movimiento reducido se respeta en las 5 páginas internas

## Related

- [[scroll-animations/scroll-inner-pages]] — spec base que esta delta modifica (cobertura de 7 páginas con entradas en el contenido)
- [[internal-page-heroes/spec]] — define la entrada escalonada del hero de las páginas internas
- [[scroll-entrance-utility]] — utilidad base de las entradas por scroll
