---
type: capability-spec
title: "Manifiesto de Nosotros sin cifras de retención por industria"
capability: "content-nosotros"
slug: "nosotros-manifesto-messaging"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["c960637"]
mr: ""
acceptance_criteria:
  - "[x] El manifiesto de Nosotros no menciona '12 industrias' ni '98% retención'"
  - "[x] El párrafo reemplazado transmite el mensaje de logística hecha a medida centrada en el cliente"
  - "[x] La frase 'La logística es una relación, no un commodity' es coherente con el resto del manifiesto ajustado"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/nosotros.astro"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Manifiesto de Nosotros sin cifras de retención por industria

## Purpose

El manifiesto de la página Nosotros incluye un párrafo con cifras de retención y cantidad de industrias que ya no se sostienen como afirmación pública. Esta spec reemplaza ese párrafo por un mensaje centrado en el valor que la empresa ofrece al cliente, y ajusta la frase de apertura del manifiesto para que quede coherente con el resto del contenido.

## Requirements

- El sistema SHALL no mostrar "12 industrias" ni "98% retención" en el manifiesto de Nosotros.
- El sistema SHALL mostrar en su lugar un mensaje que comunique que el objetivo de la empresa es que el cliente sienta la operación como propia, mediante una logística hecha a medida.
- El sistema SHALL mantener la frase "La logística es una relación, no un commodity." (o su equivalente traducido) ajustada para ser coherente con el párrafo reemplazado.
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee el manifiesto completo

**GIVEN** un visitante navega a la página Nosotros y llega al manifiesto
**WHEN** lee el párrafo sobre la relación con los clientes
**THEN** no encuentra cifras de retención ni cantidad de industrias, y en su lugar lee un mensaje centrado en una logística hecha a medida

### Scenario: Visitante evalúa la coherencia del manifiesto

**GIVEN** un visitante lee la frase de apertura del manifiesto junto con el párrafo reemplazado
**WHEN** compara ambos fragmentos
**THEN** percibe un mensaje coherente, sin cifras ni afirmaciones que ya no se mencionan en el párrafo reemplazado

## Acceptance Criteria

- [x] "12 industrias" y "98% retención" no aparecen en el manifiesto de Nosotros en ningún idioma
- [x] El párrafo reemplazado comunica el mensaje de logística hecha a medida centrada en el cliente
- [x] La frase de apertura del manifiesto es coherente con el párrafo reemplazado en los 3 idiomas
