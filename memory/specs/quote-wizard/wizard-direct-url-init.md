---
type: capability-spec
title: "El wizard de cotización debe funcionar al acceder directamente a /cotizar/"
capability: "quote-wizard"
slug: "wizard-direct-url-init"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: critical
depends_on: []
change_ref: "[[fix-cotizar-wizard-init]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-cotizar-wizard-init"
feature_branch: "feature/fix-cotizar-wizard-init"
commits: ["adec814"]
mr: ""
updated: "2026-05-26"
acceptance_criteria:
  - "Al acceder directamente a /cotizar/ (sin navegar desde otra página del sitio), el usuario puede hacer clic en un tile de modalidad y ver la selección reflejada visualmente"
  - "Al acceder directamente a /cotizar/, el botón 'Siguiente' se habilita tras seleccionar una modalidad"
  - "Al acceder directamente a /cotizar/, el wizard avanza al paso 2 al hacer clic en 'Siguiente'"
  - "Al acceder directamente a /cotizar/, el flujo completo de los 4 pasos puede completarse hasta el envío del formulario"
  - "El resumen lateral de cotización se actualiza en tiempo real al avanzar por los pasos"

related:
  - "[[interactive-component-transitions/wizard-step-modality-selection]]"
  - "[[site-script-init/script-init-direct-url]]"
affects:
  - "src/scripts/wizard.ts"
  - "src/pages/cotizar.astro"
adrs: []
scope:
  - "log-atm-web-astro/src/scripts/wizard.ts"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: "2026-05-26"

created: "2026-05-26"
updated: "2026-05-26"
tags: [capability-spec]
---

# El wizard de cotización debe funcionar al acceder directamente a /cotizar/

## Purpose

El wizard de cotización de cuatro pasos en `/cotizar/` está completamente inerte cuando un usuario accede a esa URL directamente desde el navegador, un buscador o un enlace externo. Ninguna interacción responde: los tiles de modalidad no se pueden seleccionar, el botón "Siguiente" permanece deshabilitado, y el resumen de cotización no se actualiza. El wizard solo despierta si el usuario navega *desde otra página del mismo sitio*, condición que no se cumple en el acceso directo. Esta spec define el comportamiento correcto: el wizard debe estar completamente operativo desde el momento en que la página termina de cargar, independientemente de cómo llegó el usuario.

## Requirements

- El sistema SHALL inicializar el wizard de cotización en cualquier carga de la página `/cotizar/`, incluyendo el acceso directo por URL, recarga de página (F5), y apertura desde marcadores o enlaces externos.
- El sistema SHALL permitir al usuario seleccionar una modalidad de servicio en el paso 1 del wizard inmediatamente tras la carga de la página.
- El sistema SHALL habilitar el botón "Siguiente" en cuanto el usuario seleccione una modalidad válida en el paso 1.
- El sistema SHALL permitir al usuario completar los 4 pasos del wizard (modalidad → ruta → carga → contacto) y enviar el formulario de cotización, sin importar cómo accedió a la página.
- El sistema SHALL mantener el resumen lateral de cotización actualizado en tiempo real conforme el usuario avanza por los pasos.
- El sistema SHOULD inicializar el wizard de forma idempotente, de modo que una doble inicialización no duplique listeners ni produzca comportamiento inconsistente.

## Scenarios

### Scenario: Acceso directo a la página de cotización

**GIVEN** un usuario llega a la página de cotización directamente (desde un buscador, un marcador o un enlace externo), sin haber visitado ninguna otra página del sitio en esa sesión
**WHEN** la página termina de cargar
**THEN** el wizard muestra el paso 1 con los tiles de modalidad de servicio visibles y clicables, y el usuario puede iniciar el proceso de cotización de inmediato

### Scenario: Selección de modalidad en acceso directo

**GIVEN** un usuario accede directamente a la página de cotización y el wizard está en el paso 1
**WHEN** el usuario hace clic en un tile de modalidad de servicio (por ejemplo, "Aéreo")
**THEN** el tile seleccionado se resalta visualmente como activo y el botón "Siguiente" pasa de deshabilitado a habilitado

### Scenario: Flujo completo de cotización en acceso directo

**GIVEN** un usuario accedió directamente a la página de cotización
**WHEN** el usuario completa los 4 pasos del wizard (selecciona modalidad, define ruta, especifica carga y proporciona sus datos de contacto) y hace clic en "Enviar"
**THEN** el formulario se envía correctamente y el usuario ve la pantalla de confirmación de cotización

### Scenario: Resumen de cotización en tiempo real

**GIVEN** un usuario está navegando el wizard en acceso directo
**WHEN** el usuario selecciona o ingresa información en cualquier paso (modalidad, origen, destino, tipo de carga)
**THEN** el resumen lateral de cotización refleja la selección actual de forma inmediata, sin necesidad de avanzar al siguiente paso

### Scenario: Recarga de página sin perder operatividad

**GIVEN** un usuario está en la página de cotización y recarga la página con F5 o el botón de recarga del navegador
**WHEN** la página termina de cargar
**THEN** el wizard vuelve al paso 1 completamente operativo, listo para que el usuario inicie una nueva cotización

## Acceptance Criteria

- [ ] Al acceder directamente a /cotizar/ (sin navegar desde otra página del sitio), el usuario puede hacer clic en un tile de modalidad y ver la selección reflejada visualmente
- [ ] Al acceder directamente a /cotizar/, el botón 'Siguiente' se habilita tras seleccionar una modalidad
- [ ] Al acceder directamente a /cotizar/, el wizard avanza al paso 2 al hacer clic en 'Siguiente'
- [ ] Al acceder directamente a /cotizar/, el flujo completo de los 4 pasos puede completarse hasta el envío del formulario
- [ ] El resumen lateral de cotización se actualiza en tiempo real al avanzar por los pasos

## Related

- [[interactive-component-transitions/wizard-step-modality-selection]] — spec previa que documenta la selección de modalidad; esta spec extiende el alcance a la condición de acceso directo
- [[site-script-init/script-init-direct-url]] — patrón de inicialización del que depende esta spec para funcionar
