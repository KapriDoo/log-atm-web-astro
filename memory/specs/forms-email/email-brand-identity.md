---
type: capability-spec
title: "Identidad de marca LOG ATM en emails de formularios"
capability: "forms-email"
slug: "email-brand-identity"
domain: "feature"
delta_type: "ADD"
supersedes: null
superseded_by: null
status: review
assigned_agent: null
priority: high
depends_on: []
change_ref: "[[redesign-form-email-templates]]"
feature_branch: "feature/redesign-form-email-templates"
commits:
  - "c5433e5"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/redesign-form-email-templates"
acceptance_criteria:
  - "[x] El email enviado al destinatario muestra una banda de encabezado en color azul marino corporativo (#112236) con el logotipo de LOG ATM y el tagline 'LOGÍSTICA A TU MEDIDA'"
  - "[x] Cuando la imagen del logotipo no puede cargarse, se muestra un texto alternativo legible con el nombre de la empresa"
  - "[x] El email contiene un pie de página corporativo con la dirección de la empresa, el sitio web y el tagline corporativo"
  - "[x] El pie de página incluye metadatos técnicos del envío (IP, agente de usuario, fecha en horario de Chile, tipo de formulario)"
  - "[x] El diseño del email es visualmente consistente en los tres formularios: Contacto, Cotización rápida y Cotización 4 pasos"
  - "[x] Todos los valores de texto ingresados por el usuario son escapados para prevenir inyección de HTML"
related:
  - "[[forms-email/quote-email-delivery]]"
  - "[[forms-email/quote-folio-server-generated]]"
  - "[[forms-email/email-visual-hierarchy]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

# Identidad de marca LOG ATM en emails de formularios

## Purpose

Los correos electrónicos generados por los formularios del sitio web de LOG ATM representan el primer punto de contacto digital con potenciales clientes. Un email sin identidad visual de marca transmite desconfianza y dificulta que el equipo comercial reconozca rápidamente el origen de la solicitud. Esta spec define la presentación de marca que aplica uniformemente a los tres formularios para que cada email refleje la identidad corporativa de LOG ATM.

## Requirements

- El sistema SHALL incluir en todos los emails un encabezado con banda de color azul marino corporativo (#112236) que contenga el logotipo de la empresa y el tagline "LOGÍSTICA A TU MEDIDA".
- El sistema SHALL implementar un fallback de texto con el nombre de la empresa cuando el logotipo no puede ser renderizado por el cliente de correo del destinatario.
- El sistema SHALL incluir en todos los emails un pie de página corporativo con la dirección física de la empresa, el sitio web oficial y el tagline corporativo.
- El sistema SHALL incluir en el pie de página los metadatos técnicos del envío: dirección IP del remitente, agente de usuario del navegador, fecha y hora en horario de Chile, y el tipo de formulario que originó el envío.
- El sistema MUST aplicar escape de HTML a todos los valores proporcionados por el usuario antes de incluirlos en el cuerpo del email, sin excepción.
- El sistema SHOULD mantener la fila de folio en el cuerpo del email cuando el servidor incluye un número de folio en los metadatos del envío.
- El sistema MUST aplicar el mismo encabezado y pie de página corporativo a los emails de los tres formularios: Contacto, Cotización rápida y Cotización 4 pasos.

## Scenarios

### Scenario: Destinatario recibe email de cotización con identidad de marca completa

**GIVEN** que un usuario ha enviado el formulario de cotización con datos válidos
**WHEN** el destinatario del negocio abre el email en su cliente de correo
**THEN** el email muestra en la parte superior una banda azul marino con el logotipo de LOG ATM y el tagline corporativo, y en la parte inferior aparece el pie de página con la información corporativa y los datos técnicos del envío

### Scenario: Cliente de correo no carga la imagen del logotipo

**GIVEN** que el cliente de correo del destinatario bloquea la carga de imágenes externas
**WHEN** el destinatario abre el email
**THEN** en el lugar del logotipo aparece un texto alternativo legible con el nombre de la empresa, sin que el encabezado pierda su estructura ni su color de banda

### Scenario: Destinatario recibe email de contacto con las mismas características de marca

**GIVEN** que un visitante ha enviado el formulario de contacto del sitio
**WHEN** el destinatario del negocio abre el email
**THEN** el email presenta el mismo encabezado de marca y el mismo pie de página corporativo que los emails de cotización, con la diferencia solo en el contenido del cuerpo del mensaje

### Scenario: Identificación del tipo de formulario en el pie técnico

**GIVEN** que el destinatario recibe múltiples emails de diferentes formularios del sitio
**WHEN** el destinatario revisa el pie técnico de cada email
**THEN** puede identificar claramente cuál formulario originó cada email (Contacto, Cotización rápida o Cotización 4 pasos) sin necesidad de leer el cuerpo completo

### Scenario: Valor de campo con caracteres especiales HTML

**GIVEN** que un usuario ingresó texto con caracteres como `<`, `>` o `"` en algún campo del formulario
**WHEN** el destinatario abre el email
**THEN** los caracteres especiales se muestran como texto literal sin alterar la estructura HTML del email ni representar un riesgo de inyección

## Acceptance Criteria

- [x] El email enviado al destinatario muestra una banda de encabezado en color azul marino corporativo (#112236) con el logotipo de LOG ATM y el tagline "LOGÍSTICA A TU MEDIDA"
- [x] Cuando la imagen del logotipo no puede cargarse, se muestra un texto alternativo legible con el nombre de la empresa
- [x] El email contiene un pie de página corporativo con la dirección de la empresa, el sitio web y el tagline corporativo
- [x] El pie de página incluye metadatos técnicos del envío (IP, agente de usuario, fecha en horario de Chile, tipo de formulario)
- [x] El diseño del email es visualmente consistente en los tres formularios: Contacto, Cotización rápida y Cotización 4 pasos
- [x] Todos los valores de texto ingresados por el usuario son escapados para prevenir inyección de HTML

## Related

- [[forms-email/quote-email-delivery]] — define qué datos de cotización deben incluirse en el email; esta spec define cómo se presenta el contenedor visual
- [[forms-email/quote-folio-server-generated]] — el folio generado por el servidor se preserva en el cuerpo del email dentro del diseño de marca
