---
type: capability-spec
title: "Entrega de email al enviar cotización"
capability: "forms-email"
slug: "quote-email-delivery"
domain: "fix"
delta_type: "behavior-correction"
supersedes: null
superseded_by: null
status: review
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["b4ab389", "059ee81"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: high
depends_on: ["[[forms-email/quote-folio-server-generated]]"]
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] Al enviar el formulario de cotización con datos válidos, el servidor entrega un email al destinatario configurado del negocio"
  - "[x] La respuesta del servidor indica éxito (ok: true) cuando el email fue enviado correctamente"
  - "[x] Cuando las credenciales SMTP no están configuradas en el entorno, el endpoint documenta claramente el error sin romper el flujo del wizard"
  - "[x] El email incluye los datos de la cotización enviada (modalidad, origen, destino, datos del contacto)"
related: ["[[forms-email/spec]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/api/cotizacion.ts"
  - "log-atm-web-astro/src/lib/mailer.ts"
verified_at: null
---

## Purpose

Cuando un usuario envía el formulario de cotización de Log ATM, el equipo comercial debe recibir un email con los datos de la solicitud para poder dar seguimiento. El envío de email es el comportamiento de negocio central del wizard de cotización; sin él, las cotizaciones no llegan al equipo y la conversión se pierde. El entorno de prueba usa un servicio SMTP de prueba cuando las credenciales reales no están disponibles.

## Requirements

- **SHALL**: al recibir una solicitud de cotización válida, el servidor DEBE intentar enviar un email al destinatario configurado en `MAIL_TO`.
- **SHALL**: el email entregado DEBE incluir los datos relevantes de la cotización: modalidad de servicio, origen, destino, datos de carga y datos del contacto.
- **MUST**: si el envío de email falla por error del servidor de correo, el endpoint DEBE registrar el error internamente y retornar un código de error al cliente (no un éxito falso).
- **MUST**: las variables de entorno necesarias para SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`) DEBEN estar documentadas en el proyecto como requerimiento de despliegue.
- **SHOULD**: en entornos sin credenciales SMTP reales, el sistema DEBE poder utilizarse con un servicio SMTP de prueba (como Ethereal) para verificar el comportamiento sin afectar producción.

## Scenarios

### Scenario 1: Cotización enviada con éxito

GIVEN que el entorno tiene las variables SMTP configuradas correctamente
WHEN el usuario envía el formulario de cotización con todos los campos válidos
THEN el destinatario en `MAIL_TO` recibe un email con los datos de la cotización, y el wizard muestra el paso de confirmación con el folio

### Scenario 2: SMTP no configurado en entorno de prueba

GIVEN que el entorno no tiene variables SMTP de producción
AND se usa un servicio SMTP de prueba (Ethereal u equivalente)
WHEN el equipo de QA envía una cotización de prueba
THEN el endpoint procesa la solicitud y el email es capturable en la bandeja del servicio de prueba, confirmando que el flujo de envío funciona correctamente

### Scenario 3: Error de conexión SMTP

GIVEN que el servidor SMTP está inaccesible en el momento del envío
WHEN el usuario envía el formulario de cotización
THEN el endpoint retorna un error explícito (no `ok: true`), el wizard muestra el estado de error al usuario, y el error queda registrado en los logs del servidor

### Scenario 4: Email contiene datos completos de la cotización

GIVEN que el usuario ha completado todos los pasos del wizard con datos válidos
WHEN el destinatario abre el email recibido
THEN el email muestra la modalidad de servicio, ruta (origen-destino), tipo y dimensiones de carga, nombre del contacto, y email de respuesta

## Acceptance Criteria

- [ ] Con SMTP configurado, el destinatario en `MAIL_TO` recibe el email al enviar una cotización válida
- [ ] El email incluye: modalidad, origen, destino, carga, nombre del solicitante y email de contacto
- [ ] Con Ethereal como SMTP de prueba, el email es capturado y verificable en la interfaz de Ethereal
- [ ] Si el envío falla, la respuesta del endpoint no es `{ ok: true }` — el wizard refleja el error al usuario
- [ ] Las variables de entorno SMTP están listadas en la documentación del proyecto (`.dev.vars.example` o equivalente)
