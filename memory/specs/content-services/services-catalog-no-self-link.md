---
type: capability-spec
title: "Las tarjetas del catálogo no enlazan a la propia página"
capability: "content-services"
slug: "services-catalog-no-self-link"
domain: "fix"
delta_type: ADD
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-i18n-links-and-404]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404"
feature_branch: "feature/fix-i18n-links-and-404"
commits: ["ca35054"]
mr: ""
acceptance_criteria:
  - "En el catálogo de servicios, ninguna tarjeta enlaza al propio catálogo, en español, inglés y portugués."
  - "Las tarjetas sin destino distinto al catálogo se muestran como contenido no interactivo, sin cursor de enlace ni efecto de hover de tarjeta-enlace."
  - "La tarjeta de consultoría conserva su enlace al formulario de cotización en el idioma de la página."
  - "En la home, las tarjetas de servicios que llevan al catálogo siguen siendo enlaces al catálogo en el idioma de la página."
related:
  - "[[services-catalog-cta-and-detail-pages]]"
  - "[[i18n-internal-links-keep-language]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/servicios.astro"
  - "log-atm-web-astro/src/components/sections/ServicesSection.astro"
verified_at: null
created: "2026-10-02"
updated: "2026-10-02"
tags: [capability-spec, services]
---

# Las tarjetas del catálogo no enlazan a la propia página

## Purpose

En el catálogo de servicios, varias tarjetas llevan al mismo catálogo en el que el visitante ya está, lo que recarga la página sin aportar nada y sugiere un detalle que no existe. Esta spec fija que esas tarjetas se presentan como contenido informativo, mientras que las tarjetas con un destino real conservan su enlace.

## Requirements

- El sistema SHALL presentar como contenido no interactivo, sin enlace, cursor de puntero ni efecto de hover de tarjeta-enlace, toda tarjeta del catálogo de servicios cuyo destino sería el propio catálogo.
- El sistema SHALL mantener la tarjeta de consultoría del catálogo como enlace al formulario de cotización, en el idioma de la página.
- El sistema SHALL mantener en la home los enlaces de las tarjetas de servicios hacia el catálogo, en el idioma de la página.
- El sistema SHALL aplicar estas reglas en español, inglés y portugués.
- El sistema SHALL mantener las tarjetas de carga aérea y carga marítima como contenido no interactivo, tal como establece la spec vigente del catálogo.

## Scenarios

### Scenario: Visitante recorre el catálogo de servicios

**GIVEN** un visitante en el catálogo de servicios en cualquiera de los tres idiomas
**WHEN** pasa el cursor por una tarjeta que no tiene destino propio
**THEN** la tarjeta no se comporta como enlace y no hay efecto de hover de tarjeta-enlace

### Scenario: Visitante usa la tarjeta de consultoría

**GIVEN** un visitante en el catálogo de servicios en inglés
**WHEN** hace clic en la tarjeta de consultoría
**THEN** llega al formulario de cotización en inglés

### Scenario: Visitante explora servicios desde la home

**GIVEN** un visitante en la home en portugués
**WHEN** hace clic en una tarjeta de servicio destacada
**THEN** llega al catálogo de servicios en portugués

## Acceptance Criteria

- [ ] Ninguna tarjeta del catálogo enlaza al propio catálogo en es, en y pt.
- [ ] Las tarjetas sin destino distinto al catálogo no muestran affordance de enlace.
- [ ] La tarjeta de consultoría conserva su enlace a la cotización en el idioma de la página.
- [ ] Las tarjetas de la home siguen enlazando al catálogo en el idioma de la página.

## Related

- [[services-catalog-cta-and-detail-pages]] — define las tarjetas de carga aérea y marítima como no interactivas; esta spec extiende ese tratamiento a las tarjetas con destino igual al catálogo
- [[i18n-internal-links-keep-language]] — los enlaces que sí existen conservan el idioma
