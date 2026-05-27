---
type: capability-spec
title: "Jerarquía visual y agrupación de campos en emails de formularios"
capability: "forms-email"
slug: "email-visual-hierarchy"
domain: "feature"
delta_type: "ADD"
supersedes: null
superseded_by: null
status: completed
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/23"
updated: "2026-05-26"
assigned_agent: null
priority: high
depends_on:
  - "[[forms-email/email-brand-identity]]"
change_ref: "[[redesign-form-email-templates]]"
feature_branch: "feature/redesign-form-email-templates"
commits:
  - "c5433e5"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/redesign-form-email-templates"
acceptance_criteria:
  - "[x] El cuerpo del email muestra los campos agrupados en secciones con encabezados de sección sobre banda azul (#4A7BB5)"
  - "[x] Las filas de campos dentro de cada sección alternan fondo blanco (#ffffff) y azul claro (#eef4fb)"
  - "[x] El email de cotización 4 pasos organiza los 17 campos en tres secciones: 'Detalle de envío', 'Información de carga' y 'Contacto'"
  - "[x] Cada sección del email de cotización 4 pasos contiene los campos que le corresponden según la agrupación definida"
  - "[x] El email de Contacto y el de Cotización rápida presentan sus campos con la misma jerarquía visual de sección aunque con menor número de grupos"
  - "[x] La fila de folio aparece en el email de cotización 4 pasos cuando el servidor la incluye, respetando el esquema de colores alternados"
related:
  - "[[forms-email/email-brand-identity]]"
  - "[[forms-email/quote-email-delivery]]"
  - "[[forms-email/quote-folio-server-generated]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

# Jerarquía visual y agrupación de campos en emails de formularios

## Purpose

El email generado por el formulario de cotización de 4 pasos concentra 17 campos de datos que, presentados como una lista plana, son difíciles de leer y procesar por el equipo comercial. Esta spec establece la estructura visual de secciones con encabezados destacados y filas alternadas para que el destinatario pueda localizar rápidamente los datos que necesita al gestionar una solicitud. La agrupación semántica en secciones diferenciadas acelera la lectura y reduce los errores en el seguimiento comercial.

## Requirements

- El sistema SHALL organizar el cuerpo del email en secciones con un encabezado visible por sección. Cada encabezado de sección SHALL presentarse sobre una banda de color azul medio (#4A7BB5) con texto contrastante.
- El sistema SHALL mostrar las filas de campos dentro de cada sección con fondos alternados: fila impar en blanco (#ffffff) y fila par en azul muy claro (#eef4fb).
- El sistema SHALL agrupar los campos del formulario de cotización 4 pasos en exactamente tres secciones:
  - **Detalle de envío**: contiene modalidad, origen y destino.
  - **Información de carga**: contiene tipo de mercancía, dimensiones (largo, ancho, alto), peso, cantidad de bultos, temperatura especial (si aplica) y aduana (si aplica).
  - **Contacto**: contiene nombre, empresa (si aplica), email y teléfono (si aplica).
- El sistema SHALL preservar la fila de folio en el email de cotización 4 pasos cuando el servidor incluye el número de folio, ubicándola dentro del esquema de colores alternados correspondiente.
- El sistema SHALL aplicar jerarquía visual de sección al email de Cotización rápida y al email de Contacto, adaptando el número de secciones a los campos disponibles en cada formulario.
- El sistema MUST incluir en el email de cotización 4 pasos todos los campos capturados durante los 4 pasos del wizard: ningún campo de usuario puede omitirse del cuerpo del email.
- El sistema MUST mantener la legibilidad de las secciones en clientes de correo que no soportan CSS avanzado, usando atributos HTML de tabla como respaldo.

## Scenarios

### Scenario: Destinatario identifica la ruta de la cotización al abrir el email

**GIVEN** que el equipo comercial recibe un email de una cotización de 4 pasos
**WHEN** el destinatario abre el email y escanea visualmente el cuerpo
**THEN** puede leer de inmediato la sección "Detalle de envío" con origen y destino en las primeras filas, sin necesidad de desplazarse por todos los campos

### Scenario: Diferenciación visual entre secciones

**GIVEN** que el destinatario está revisando los datos de carga de una cotización
**WHEN** el destinatario lee el email de cotización 4 pasos
**THEN** la sección "Información de carga" aparece claramente delimitada por su encabezado sobre banda azul, diferenciada visualmente de la sección anterior "Detalle de envío" y de la siguiente sección "Contacto"

### Scenario: Filas alternadas facilitan la lectura de múltiples campos

**GIVEN** que la sección "Información de carga" contiene varios campos con valores
**WHEN** el destinatario lee los datos de carga en el email
**THEN** las filas alternan entre fondo blanco y fondo azul muy claro, permitiendo seguir cada fila horizontalmente sin confundir etiqueta con valor de otra fila

### Scenario: Email de Contacto mantiene jerarquía visual

**GIVEN** que un visitante envía el formulario de contacto general del sitio
**WHEN** el destinatario del negocio abre el email de contacto
**THEN** el cuerpo del email presenta los campos organizados con la misma estructura visual de secciones y filas alternadas, aunque con un único grupo de campos de contacto y mensaje

### Scenario: Folio aparece en el email de cotización 4 pasos

**GIVEN** que el servidor generó un número de folio al procesar la solicitud de cotización
**WHEN** el destinatario lee el email de cotización 4 pasos
**THEN** el folio aparece visible en el cuerpo del email respetando el esquema de colores alternados, permitiendo al equipo comercial identificar la referencia de la solicitud

### Scenario: Todos los campos del wizard están presentes en el email

**GIVEN** que un usuario completó los 4 pasos del wizard con datos en todos los campos opcionales (empresa, teléfono, temperatura especial, aduana)
**WHEN** el destinatario abre el email
**THEN** el email contiene los datos de los 4 pasos completos organizados en sus secciones correspondientes, sin que ningún campo quede ausente del cuerpo del mensaje

### Scenario: Cliente de correo con soporte limitado de estilos

**GIVEN** que el cliente de correo del destinatario no soporta hojas de estilo CSS en línea
**WHEN** el destinatario abre el email
**THEN** la estructura de secciones y filas sigue siendo legible gracias a los atributos de tabla HTML, aunque sin los colores de fondo alternados

## Acceptance Criteria

- [x] El cuerpo del email muestra los campos agrupados en secciones con encabezados de sección sobre banda azul (#4A7BB5)
- [x] Las filas de campos dentro de cada sección alternan fondo blanco (#ffffff) y azul claro (#eef4fb)
- [x] El email de cotización 4 pasos organiza los 17 campos en tres secciones: "Detalle de envío", "Información de carga" y "Contacto"
- [x] Cada sección del email de cotización 4 pasos contiene los campos que le corresponden según la agrupación definida
- [x] El email de Contacto y el de Cotización rápida presentan sus campos con la misma jerarquía visual de sección aunque con menor número de grupos
- [x] La fila de folio aparece en el email de cotización 4 pasos cuando el servidor la incluye, respetando el esquema de colores alternados

## Related

- [[forms-email/email-brand-identity]] — la jerarquía visual se aplica dentro del contenedor de marca definido en esa spec
- [[forms-email/quote-email-delivery]] — define los campos de cotización que esta spec agrupa visualmente en secciones
- [[forms-email/quote-folio-server-generated]] — el folio generado por el servidor se integra en la jerarquía visual de esta spec
