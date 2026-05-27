---
type: capability-spec
title: "Botones CTA condicionales en correos de formulario"
capability: forms-email
slug: email-cta-conditional
domain: feature
delta_type: null
supersedes: null
superseded_by: null
status: verified
assigned_agent: sdd-apply
priority: high
depends_on:
  - "[[forms-email/email-section-structure]]"
change_ref: "[[redesign-email-templates-v2]]"
feature_branch: feature/redesign-email-templates-v2
commits:
  - 2d1a16d
worktree: .sdd/worktrees/redesign-email-templates-v2
acceptance_criteria:
  - "[x] El correo incluye el botón 'Responder por email' cuando el remitente proporcionó un email"
  - "[x] El correo incluye el botón 'WhatsApp' cuando el remitente proporcionó un número de teléfono"
  - "[x] El botón 'Responder por email' abre un email precompletado con el asunto correspondiente al hilo"
  - "[x] El botón 'WhatsApp' abre una conversación de WhatsApp con el número sanitizado del remitente"
  - "[x] Cuando no hay email ni teléfono, la sección de CTAs no aparece en el correo"
related:
  - "[[forms-email/spec]]"
affects:
  - "[[forms-email/email-form-differentiation]]"
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

## Purpose

El equipo comercial de Log ATM necesita poder responder rápidamente a las solicitudes recibidas por formulario. El rediseño incorpora botones de acción directa que permiten responder por email o iniciar una conversación de WhatsApp con un solo clic, con el contexto del hilo precargado. Estos botones son condicionales: solo se muestran cuando el dato necesario para la acción está disponible.

## Requirements

- **SHALL**: cuando el correo incluye el email del remitente, DEBE mostrar un botón "Responder por email" que al hacer clic abra el cliente de correo con el campo destinatario y el asunto del hilo precargados.
- **SHALL**: cuando el correo incluye el número de teléfono del remitente, DEBE mostrar un botón "WhatsApp" que al hacer clic abra una conversación de WhatsApp con el número sanitizado del remitente y un mensaje de contexto precargado.
- **MUST**: el número de teléfono usado en el enlace de WhatsApp DEBE estar sanitizado — sin espacios, guiones, paréntesis ni caracteres no numéricos distintos del signo "+" inicial para el código de país.
- **MUST**: si el remitente no proporcionó email, el botón "Responder por email" NO DEBE aparecer en el correo.
- **MUST**: si el remitente no proporcionó teléfono, el botón "WhatsApp" NO DEBE aparecer en el correo.
- **MUST**: si el remitente no proporcionó ni email ni teléfono, la sección de CTAs DEBE omitirse completamente del correo.
- **SHOULD**: la sección de CTAs DEBE incluir un texto de recordatorio del tiempo de respuesta esperado (SLA) como referencia para el equipo comercial.
- **SHOULD**: los botones DEBEN ser visualmente diferenciados por acción: el botón de email con color azul corporativo y el botón de WhatsApp con color verde, para reconocimiento inmediato.

## Scenarios

### Scenario 1: Remitente proporciona email y teléfono

GIVEN que el correo contiene tanto el email como el número de teléfono del remitente
WHEN el destinatario abre el correo
THEN ve dos botones de acción: uno azul "Responder por email" y uno verde "WhatsApp", ambos visibles antes de los metadatos técnicos

### Scenario 2: Clic en "Responder por email"

GIVEN que el destinatario hace clic en el botón "Responder por email"
WHEN el sistema operativo procesa el enlace
THEN se abre el cliente de correo con el email del remitente en el campo destinatario y el asunto del hilo original precargado

### Scenario 3: Clic en "WhatsApp"

GIVEN que el destinatario hace clic en el botón "WhatsApp"
WHEN el sistema operativo procesa el enlace
THEN se abre WhatsApp (o WhatsApp Web) con una conversación nueva hacia el número del remitente y un mensaje de contexto precargado — el número no contiene espacios ni caracteres especiales que invaliden el enlace

### Scenario 4: Teléfono con formato mixto (espacios, guiones, paréntesis)

GIVEN que el remitente ingresó su teléfono con formato "+56 9 1234-5678" o "(56) 912345678"
WHEN el correo construye el enlace de WhatsApp
THEN el enlace usa el número sanitizado "56912345678" sin caracteres no numéricos (preservando el código de país si estaba presente)

### Scenario 5: Remitente sin teléfono

GIVEN que el correo no contiene número de teléfono del remitente (campo vacío o ausente)
WHEN el destinatario abre el correo
THEN solo aparece el botón "Responder por email" (si hay email) — el botón de WhatsApp no existe en el correo

### Scenario 6: Remitente sin email ni teléfono

GIVEN que el correo no contiene ni email ni teléfono del remitente
WHEN el destinatario abre el correo
THEN la sección de botones CTA no aparece en el correo — no hay espacio vacío ni botones deshabilitados

## Acceptance Criteria

- El botón "Responder por email" aparece en el correo únicamente cuando el remitente proporcionó un email válido
- El botón "WhatsApp" aparece en el correo únicamente cuando el remitente proporcionó un número de teléfono
- El clic en "Responder por email" abre el cliente de correo con el email del remitente y el asunto precargado
- El clic en "WhatsApp" abre WhatsApp con el número sanitizado (sin caracteres no numéricos salvo el "+" del código de país)
- Cuando no hay ni email ni teléfono, la sección de CTAs está ausente del correo (sin espacio vacío)
- El texto de SLA de respuesta aparece en la sección de CTAs cuando hay al menos un botón visible
