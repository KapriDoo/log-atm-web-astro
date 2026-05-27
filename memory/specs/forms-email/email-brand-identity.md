---
type: capability-spec
title: "Identidad de marca en correos de formulario"
capability: forms-email
slug: email-brand-identity
domain: feature
delta_type: null
supersedes: null
superseded_by: null
status: completed
mr: https://github.com/KapriDoo/log-atm-web-astro/pull/24
updated: 2026-05-26
assigned_agent: sdd-apply
priority: high
depends_on: []
change_ref: "[[redesign-email-templates-v2]]"
feature_branch: feature/redesign-email-templates-v2
commits:
  - 2d1a16d
worktree: .sdd/worktrees/redesign-email-templates-v2
acceptance_criteria:
  - "[x] El encabezado de cada correo muestra el logo textual de LOG ATM sobre fondo azul corporativo"
  - "[x] El pie de página de cada correo muestra el nombre de la empresa y la dirección sobre fondo oscuro"
  - "[x] El aviso automático aparece centrado al final del pie de página"
  - "[x] Los tres correos comparten la misma identidad visual de encabezado y pie de página"
related:
  - "[[forms-email/spec]]"
  - "[[forms-email/quote-email-delivery]]"
affects:
  - "[[forms-email/email-section-structure]]"
  - "[[forms-email/email-form-differentiation]]"
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

## Purpose

Los correos transaccionales de los formularios de Log ATM deben proyectar la identidad de marca corporativa desde el primer vistazo. El rediseño introduce un encabezado azul corporativo con el logotipo textual de la empresa y un pie de página oscuro con información institucional, reemplazando el diseño genérico actual que carece de identidad de marca.

## Requirements

- **SHALL**: cada correo de formulario DEBE tener un encabezado con fondo en gradiente azul corporativo donde se muestre el logotipo textual de la empresa compuesto por la inicial "A" destacada y el nombre "LOG ATM".
- **SHALL**: el encabezado DEBE incluir un tagline en tipografía monoespaciada que refuerce la identidad de marca.
- **SHALL**: cada correo DEBE tener un pie de página con fondo oscuro que muestre el nombre completo de la empresa y la dirección física.
- **MUST**: el pie de página DEBE incluir un aviso centrado que indique que el correo fue generado automáticamente y que no debe responderse directamente a esa dirección.
- **MUST**: el logotipo textual NO DEBE depender de imágenes externas — DEBE ser completamente textual para garantizar compatibilidad universal con clientes de correo que bloquean imágenes.
- **SHOULD**: la identidad de encabezado y pie de página DEBE ser idéntica en los tres correos de formulario (contacto, cotización rápida, cotización 4 pasos) — la diferenciación visual por formulario se maneja en el badge, no en el encabezado base.

## Scenarios

### Scenario 1: Correo recibido en cliente que bloquea imágenes

GIVEN que el destinatario abre un correo de formulario en un cliente de correo con bloqueo de imágenes activado
WHEN el correo carga
THEN el encabezado muestra el logotipo textual completo ("A" + "LOG ATM") sobre el fondo azul corporativo sin ningún elemento roto o placeholder de imagen faltante

### Scenario 2: Correo recibido — encabezado visible

GIVEN que el destinatario recibe un correo proveniente de cualquiera de los tres formularios
WHEN el destinatario abre el correo
THEN el primer elemento visible es el encabezado azul corporativo con la identidad de marca de LOG ATM

### Scenario 3: Correo recibido — pie de página completo

GIVEN que el destinatario lee el correo hasta el final
WHEN el destinatario llega al pie de página
THEN ve el nombre de la empresa, la dirección física y el aviso de correo automático sobre el fondo oscuro institucional

### Scenario 4: Degradación en Outlook Win

GIVEN que el destinatario abre el correo en Outlook para Windows
WHEN el correo renderiza
THEN el encabezado y pie de página muestran su contenido textual completo con los colores de fondo correctos aunque sin redondeo de esquinas ni sombras del contenedor externo

## Acceptance Criteria

- El encabezado de los tres correos muestra el logotipo textual de LOG ATM sobre fondo azul corporativo
- El pie de página de los tres correos muestra nombre, dirección y aviso automático sobre fondo oscuro
- El correo es completamente legible en clientes con bloqueo de imágenes (sin elementos rotos)
- En Outlook Win el contenido de encabezado y pie de página es visible aunque la decoración (bordes redondeados, sombra) no se aplique
