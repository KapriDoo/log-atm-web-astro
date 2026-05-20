---
type: capability-spec
title: "Ícono oficial de WhatsApp en canal de contacto"
capability: "components/contacto-channels"
slug: "contact-channels-whatsapp-icon"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["a1748e0"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] El bloque del canal WhatsApp en /contacto muestra el logo reconocible de WhatsApp"
  - "[x] El ícono de WhatsApp es semánticamente identificado para lectores de pantalla (alt o aria-label presente)"
  - "[x] No se instala ninguna dependencia nueva de paquetes de íconos para implementar este ícono"
  - "[x] El ícono se ve correctamente en los principales navegadores de escritorio y móvil"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/contacto.astro"
verified_at: "2026-05-19"
mr: ""
updated: "2026-05-20"
---

## Purpose

El bloque de canal de WhatsApp en la página `/contacto` debe mostrar el logo reconocible de la plataforma para que el usuario identifique inmediatamente la vía de comunicación disponible. El ícono genérico de círculo de mensaje actualmente utilizado no comunica de forma clara que se trata de WhatsApp, lo que reduce la confianza del usuario en el canal.

## Requirements

- **SHALL**: el bloque del canal de WhatsApp DEBE mostrar el logo oficial de WhatsApp, reconocible por cualquier usuario familiar con la plataforma.
- **MUST**: el ícono DEBE tener un atributo de texto alternativo o etiqueta accesible (`aria-label`, `aria-hidden` + texto adyacente, o `alt` si es `img`) para ser interpretado correctamente por lectores de pantalla.
- **MUST**: la implementación DEBE usar inline SVG del logo oficial de WhatsApp, sin añadir nuevas dependencias de paquetes de terceros al proyecto.
- **SHOULD**: el ícono DEBE heredar el color del texto del contenedor o tener el color verde de marca de WhatsApp según el contexto visual del bloque.

## Scenarios

### Scenario 1: Usuario identifica el canal de WhatsApp

GIVEN que el usuario navega a la página `/contacto`
WHEN observa el listado de canales de contacto disponibles
THEN reconoce visualmente el logo de WhatsApp en el bloque correspondiente y comprende que puede contactar al equipo por esa vía

### Scenario 2: Usuario con lector de pantalla

GIVEN que un usuario utiliza un lector de pantalla en la página `/contacto`
WHEN el lector de pantalla llega al ícono del canal de WhatsApp
THEN el ícono es anunciado con un texto descriptivo que identifica a WhatsApp como el canal (no silenciado si no hay texto alternativo)

## Acceptance Criteria

- [ ] En `/contacto`, el bloque del canal WhatsApp muestra el logo verde de WhatsApp reconocible
- [ ] El ícono tiene un atributo accesible (`aria-label` o texto alternativo) que identifica WhatsApp
- [ ] El `package.json` del proyecto no tiene dependencias nuevas de paquetes de íconos tras el cambio
- [ ] El ícono se renderiza correctamente en Chrome, Firefox y Safari (escritorio y móvil)
