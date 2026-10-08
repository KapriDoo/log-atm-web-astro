---
type: capability-spec
title: "Opciones del cotizador: extras sin «Última milla» y origen «Otro» traducido"
capability: "quote-wizard"
slug: "quote-extras-and-origin-options"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[debt-copy-tokens-ssot]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot"
feature_branch: "feature/debt-copy-tokens-ssot"
mr: ""
acceptance_criteria:
  - "[ ] El paso de extras del cotizar ofrece 4 opciones (Aduana, Seguro de carga, Almacenaje destino e Inspección origen o su traducción) en es, en y pt, sin «Última milla», «Last mile» ni «Última milha»"
  - "[ ] La opción de origen «Otro» se muestra como «Otro» en español, «Other» en inglés y «Outro» en portugués, y el valor que recibe el operador sigue siendo «Otro» en los tres idiomas"
  - "[ ] La cotización enviada por la API se acepta con cualquier servicio de texto, con o sin «Última milla», y la API no cambia"
  - "[ ] npm run validate-i18n termina en exit 0"
  - "[ ] Las únicas diferencias del texto visible de cotizar respecto del anterior son la ausencia de «Última milla» en los tres idiomas y las etiquetas «Other» y «Outro» en /en/cotizar y /pt/cotizar"

related:
  - "[[copy-single-source]]"
  - "[[quote-email-delivery]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/cotizar.astro"
  - "log-atm-web-astro/src/lib/constants.ts"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec]
---

# Opciones del cotizador: extras sin «Última milla» y origen «Otro» traducido

## Purpose

El cotizador ofrece solo servicios adicionales que la empresa presta, y cada visitante ve las opciones del formulario en su idioma. «Última milla» no es un servicio que la empresa ofrezca como extra, y la opción de origen «Otro» aparece en el idioma de cada página, también en inglés y portugués.

## Requirements

- El sistema SHALL ofrecer en el paso de servicios adicionales del cotizador exactamente cuatro opciones: aduana, seguro de carga, almacenaje en destino e inspección en origen, en español, inglés y portugués.
- El sistema SHALL NOT ofrecer «Última milla» como servicio adicional en ningún idioma.
- El sistema SHALL mostrar la opción de origen «Otro» en el idioma de la página: «Otro» en español, «Other» en inglés y «Outro» en portugués.
- El sistema SHALL enviar al operador el valor «Otro» para esa opción en los tres idiomas, sin cambio en el contenido del correo ni de la solicitud.
- El sistema SHALL seguir aceptando cualquier texto como servicio en una cotización recibida, de modo que la API no cambia.

## Scenarios

### Scenario: Cliente elige servicios adicionales

**GIVEN** un cliente en el paso de servicios adicionales del cotizador en cualquier idioma
**WHEN** revisa las opciones
**THEN** ve cuatro opciones y ninguna es «Última milla»

### Scenario: Cliente de habla inglesa elige un origen no listado

**GIVEN** un cliente en la página de cotizar en inglés
**WHEN** abre el selector de origen
**THEN** ve la opción «Other» entre los orígenes
**AND** al elegirla, el operador recibe «Otro» como origen

### Scenario: Cliente de habla portuguesa elige un origen no listado

**GIVEN** un cliente en la página de cotizar en portugués
**WHEN** abre el selector de origen
**THEN** ve la opción «Outro»
**AND** al elegirla, el operador recibe «Otro» como origen

## Acceptance Criteria

- [ ] El paso de extras del cotizar ofrece 4 opciones (Aduana, Seguro de carga, Almacenaje destino e Inspección origen o su traducción) en es, en y pt, sin «Última milla», «Last mile» ni «Última milha»
- [ ] La opción de origen «Otro» se muestra como «Otro» en español, «Other» en inglés y «Outro» en portugués, y el valor que recibe el operador sigue siendo «Otro» en los tres idiomas
- [ ] La cotización enviada por la API se acepta con cualquier servicio de texto, con o sin «Última milla», y la API no cambia
- [ ] npm run validate-i18n termina en exit 0
- [ ] Las únicas diferencias del texto visible de cotizar respecto del anterior son la ausencia de «Última milla» en los tres idiomas y las etiquetas «Other» y «Outro» en /en/cotizar y /pt/cotizar

## Related

- [[copy-single-source]] — el texto visible de las opciones sale solo del i18n
- [[quote-email-delivery]] — entrega del correo de cotización al operador
