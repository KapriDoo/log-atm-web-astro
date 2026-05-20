---
type: capability-spec
title: "Folio de cotización generado por el servidor"
capability: "forms-email"
slug: "quote-folio-server-generated"
domain: "fix"
delta_type: "behavior-correction"
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["9696674", "b4ab389"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] El paso de confirmación del wizard muestra un folio recibido en la respuesta del servidor, no generado en el cliente"
  - "[x] El folio tiene el formato LA-{cadena alfanumérica} reconocible como identificador de la cotización"
  - "[x] El folio es único por envío (dos envíos simultáneos no producen el mismo folio)"
  - "[x] El folio nunca es generado por lógica en el navegador del usuario"
related: ["[[forms-email/spec]]"]
affects: ["[[forms-email/quote-email-delivery]]"]
adrs: []
scope:
  - "log-atm-web-astro/src/pages/api/cotizacion.ts"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: "2026-05-19"
mr: ""
updated: "2026-05-20"
---

## Purpose

Cuando el usuario completa y envía el formulario de cotización, el sistema le presenta un folio de referencia para dar seguimiento a su solicitud. Este folio debe ser producido por el servidor en el momento de procesar la solicitud, de modo que sea trazable y no dependa del estado del navegador del usuario. El folio se muestra en el paso de confirmación del wizard.

## Requirements

- **SHALL**: el folio de la cotización DEBE ser generado en el servidor al momento de procesar el envío del formulario.
- **SHALL**: el servidor DEBE incluir el folio en la respuesta JSON del endpoint de cotización (`folio` como campo en la respuesta `{ ok: true, folio: "..." }`).
- **MUST**: el wizard DEBE mostrar en el paso de confirmación el folio recibido en la respuesta del servidor.
- **MUST**: el folio NO DEBE ser calculado ni derivado de ninguna operación en el código que se ejecuta en el navegador.
- **SHOULD**: el formato del folio DEBE ser reconocible como un identificador de la empresa (prefijo `LA-` seguido de cadena alfanumérica).

## Scenarios

### Scenario 1: Usuario completa el wizard y recibe folio

GIVEN que el usuario ha completado todos los pasos del wizard de cotización con datos válidos
WHEN el usuario envía el formulario en el último paso
THEN el paso de confirmación muestra un folio en formato `LA-XXXXXXXX` que fue proporcionado por el servidor en la respuesta, no calculado en el navegador

### Scenario 2: Dos usuarios envían cotizaciones simultáneamente

GIVEN que dos usuarios envían formularios de cotización al mismo tiempo
WHEN ambas solicitudes son procesadas por el servidor
THEN cada usuario recibe un folio distinto en su paso de confirmación

### Scenario 3: Error del servidor — folio no presente

GIVEN que el servidor responde con un error al procesar la cotización
WHEN el wizard recibe la respuesta de error
THEN el wizard muestra el estado de error al usuario (no el paso de confirmación), y no intenta mostrar un folio inexistente

## Acceptance Criteria

- [ ] Al enviar una cotización exitosa, el paso de confirmación muestra un folio con prefijo `LA-`
- [ ] El folio mostrado coincide con el campo `folio` de la respuesta JSON del servidor
- [ ] El código del wizard no contiene lógica de generación de folio en el cliente (sin `Date.now()` ni funciones similares para el folio)
- [ ] Envíos sucesivos producen folios distintos
