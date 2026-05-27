---
type: capability-spec
title: "Diferenciación visual por tipo de formulario en correos"
capability: forms-email
slug: email-form-differentiation
domain: feature
delta_type: null
supersedes: null
superseded_by: null
status: completed
mr: https://github.com/KapriDoo/log-atm-web-astro/pull/24
updated: 2026-05-26
assigned_agent: sdd-apply
priority: medium
depends_on:
  - "[[forms-email/email-brand-identity]]"
  - "[[forms-email/email-section-structure]]"
  - "[[forms-email/email-cta-conditional]]"
change_ref: "[[redesign-email-templates-v2]]"
feature_branch: feature/redesign-email-templates-v2
commits:
  - 2d1a16d
worktree: .sdd/worktrees/redesign-email-templates-v2
acceptance_criteria:
  - "[x] El correo de contacto muestra un badge azul en el encabezado"
  - "[x] El correo de cotización rápida muestra un badge verde en el encabezado"
  - "[x] El correo de cotización 4 pasos muestra un badge ámbar en el encabezado"
  - "[x] El correo de contacto adapta el campo 'route' (texto libre) a la sección de ruta visual"
  - "[x] El correo de cotización 4 pasos muestra el folio en la caja de metadatos cuando está disponible"
  - "[x] Los datos específicos de cada formulario aparecen correctamente en la grilla de datos clave"
related:
  - "[[forms-email/spec]]"
  - "[[forms-email/quote-email-delivery]]"
  - "[[forms-email/quote-folio-server-generated]]"
affects: []
adrs:
  - "[[adrs/0004-folio-server-generated]]"
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

## Purpose

Los tres formularios del sitio de Log ATM (contacto general, cotización rápida y cotización de 4 pasos) representan niveles de intención diferentes. El rediseño diferencia visualmente estos correos mediante un badge de color en el encabezado y adapta el contenido de cada sección a los campos específicos de cada formulario, manteniendo la misma estructura base de secciones.

## Requirements

- **SHALL**: el correo del formulario de contacto DEBE mostrar un badge "● Nuevo mensaje" en el encabezado con color azul.
- **SHALL**: el correo del formulario de cotización rápida DEBE mostrar un badge "● Nuevo lead" en el encabezado con color verde.
- **SHALL**: el correo del formulario de cotización de 4 pasos DEBE mostrar un badge "● Cotización completa" en el encabezado con color ámbar.
- **SHALL**: el correo de cotización 4 pasos DEBE incluir el folio de seguimiento en la caja de metadatos cuando el servidor lo proporciona, con el prefijo "LA-" como identificador reconocible.
- **MUST**: la sección de ruta visual del correo de contacto DEBE mostrar el valor del campo `route` (texto libre como "Shanghai → San Antonio") en la caja visual de ruta cuando ese campo está presente — NO inventar un par origen/destino separado.
- **MUST**: la sección de ruta visual del correo de cotización rápida DEBE mostrar los campos `origin` y `destination` como par origen→destino separado dentro de la caja visual.
- **MUST**: la sección de ruta visual del correo de cotización 4 pasos DEBE mostrar los campos `origin` y `dest` como par origen→destino separado dentro de la caja visual.
- **MUST**: la grilla de datos clave de cada formulario DEBE mostrar únicamente los campos relevantes para ese tipo de formulario, omitiendo campos que no aplican.
- **SHOULD**: el hero de cada correo DEBE incluir una descripción contextual adaptada al tipo de solicitud para ayudar al destinatario a entender de qué se trata antes de leer los datos.
- **SHOULD**: el campo de modalidad o servicio en la grilla de datos DEBE mostrarse como una etiqueta (pill) visualmente destacada cuando está presente.

## Scenarios

### Scenario 1: Distinción rápida por tipo de formulario

GIVEN que el equipo comercial recibe correos de los tres formularios en su bandeja de entrada
WHEN el destinatario escanea los correos antes de abrirlos o al abrirlos
THEN puede identificar visualmente el tipo de solicitud por el color del badge en el encabezado: azul para contacto, verde para cotización rápida, ámbar para cotización completa

### Scenario 2: Correo de contacto con ruta de texto libre

GIVEN que el remitente llenó el formulario de contacto incluyendo el campo de ruta con el valor "Shanghai → San Antonio"
WHEN el destinatario abre el correo
THEN la sección de ruta visual muestra ese texto completo dentro de la caja visual de ruta, sin intentar dividirlo en origen y destino separados

### Scenario 3: Correo de contacto sin campo de ruta

GIVEN que el remitente llenó el formulario de contacto sin indicar una ruta
WHEN el destinatario abre el correo
THEN la sección de ruta visual no aparece en el correo

### Scenario 4: Correo de cotización rápida con par origen-destino

GIVEN que el remitente completó el formulario de cotización rápida con `origin` "Valparaíso" y `destination` "Lima"
WHEN el destinatario abre el correo
THEN la sección de ruta visual muestra "Valparaíso → Lima" como par en la caja visual

### Scenario 5: Correo de cotización 4 pasos con folio

GIVEN que el servidor procesó exitosamente el formulario de cotización 4 pasos y generó el folio "LA-ABC12345"
WHEN el destinatario abre el correo
THEN la caja de metadatos muestra el folio "LA-ABC12345" como primer elemento, identificable como número de referencia de la cotización

### Scenario 6: Grilla de datos específica por formulario

GIVEN que el destinatario abre el correo de cotización 4 pasos
WHEN escanea la grilla de datos clave
THEN ve los campos propios de ese formulario (modalidad, incoterm, tipo de carga, volumen, peso, etc.) además de los datos de contacto — sin filas vacías de campos que no aplican al formulario de contacto o cotización rápida

### Scenario 7: Modalidad o servicio como etiqueta destacada

GIVEN que el correo de cotización incluye el campo de modalidad con valor "Marítimo FCL"
WHEN el destinatario ve la grilla de datos
THEN el valor de modalidad aparece visualmente destacado como una etiqueta (pill) diferenciada de las demás filas de texto plano

## Acceptance Criteria

- El correo de contacto tiene badge azul en el encabezado
- El correo de cotización rápida tiene badge verde en el encabezado
- El correo de cotización 4 pasos tiene badge ámbar en el encabezado
- El correo de contacto muestra el campo `route` (texto libre) en la caja de ruta visual cuando está presente
- El correo de contacto no muestra la sección de ruta cuando `route` está vacío o ausente
- Los correos de cotización rápida y cotización 4 pasos muestran el par origen→destino en la caja de ruta visual
- El folio "LA-..." aparece en la caja de metadatos del correo de cotización 4 pasos cuando el servidor lo provee
- La grilla de datos de cada formulario muestra solo los campos del formulario correspondiente (sin campos vacíos de otros formularios)
- El campo de modalidad o servicio se muestra como etiqueta visual cuando está presente
