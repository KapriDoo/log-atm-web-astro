---
type: capability-spec
title: "Estructura de secciones jerárquicas en correos de formulario"
capability: forms-email
slug: email-section-structure
domain: feature
delta_type: null
supersedes: null
superseded_by: null
status: verified
assigned_agent: sdd-apply
priority: high
depends_on:
  - "[[forms-email/email-brand-identity]]"
change_ref: "[[redesign-email-templates-v2]]"
feature_branch: feature/redesign-email-templates-v2
commits:
  - 2d1a16d
worktree: .sdd/worktrees/redesign-email-templates-v2
acceptance_criteria:
  - "[x] El correo presenta las secciones en el orden: encabezado → hero → ruta visual → datos clave → mensaje/notas → metadatos técnicos → pie de página"
  - "[x] Cada sección opcional se omite del correo cuando el dato correspondiente no está presente"
  - "[x] La sección de metadatos técnicos siempre aparece antes del pie de página con IP, User-Agent, fecha y tipo de formulario"
  - "[x] Los datos del remitente y los metadatos técnicos están en secciones visualmente separadas"
  - "[x] El correo tiene un ancho máximo de 600 px y es legible en dispositivos móviles"
related:
  - "[[forms-email/spec]]"
  - "[[forms-email/quote-email-delivery]]"
  - "[[forms-email/quote-folio-server-generated]]"
affects:
  - "[[forms-email/email-cta-conditional]]"
  - "[[forms-email/email-form-differentiation]]"
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-05-26"
---

## Purpose

Los correos actuales presentan todos los datos del formulario en una tabla plana sin jerarquía, mezclando datos del remitente con metadatos técnicos. El rediseño establece una estructura de secciones con jerarquía visual clara que ayuda al equipo comercial de Log ATM a identificar de inmediato los datos de contacto y la solicitud, y a encontrar los metadatos técnicos en una zona separada al final.

## Requirements

- **SHALL**: cada correo de formulario DEBE presentar su contenido en el siguiente orden de secciones: (1) encabezado de marca, (2) hero con identificación del remitente y descripción de la solicitud, (3) ruta visual cuando aplique, (4) grilla de datos clave del remitente, (5) bloque de mensaje o notas cuando el campo esté presente, (6) caja de metadatos técnicos, (7) pie de página.
- **SHALL**: la grilla de datos clave DEBE mostrar los campos con jerarquía de lista, usando filas separadas por divisores visuales, no una tabla con bordes en caja.
- **SHALL**: la sección de metadatos técnicos DEBE estar visualmente separada del contenido principal mediante una caja con fondo diferenciado, y DEBE incluir siempre: IP del remitente, User-Agent, fecha y hora de recepción en formato local Chile, y tipo de formulario.
- **MUST**: las secciones opcionales (ruta visual, mensaje/notas) DEBEN omitirse completamente del HTML cuando el dato correspondiente no esté presente — no deben dejar espacios vacíos ni elementos sin contenido.
- **MUST**: el correo DEBE respetar un ancho máximo de 600 px compatible con clientes de escritorio y móvil.
- **MUST**: el layout del correo DEBE construirse exclusivamente con tablas HTML y estilos CSS inline, sin uso de flexbox, grid ni hojas de estilo externas.
- **SHOULD**: los campos opcionales dentro de la grilla de datos clave (empresa, teléfono, servicio) DEBEN omitirse de la grilla cuando su valor esté vacío o no definido.
- **SHOULD**: el correo DEBE incluir una versión en texto plano (`text`) que preserve todos los datos del formulario en formato legible, como alternativa para clientes que no soporten HTML.

## Scenarios

### Scenario 1: Correo con todos los campos completados

GIVEN que el remitente completó todos los campos del formulario incluyendo mensaje y ruta
WHEN el destinatario abre el correo
THEN ve el correo con todas las secciones presentes en orden: encabezado → hero con nombre y empresa → caja de ruta con origen y destino → grilla de datos → bloque de mensaje → caja de metadatos → pie de página

### Scenario 2: Correo con campos opcionales ausentes

GIVEN que el remitente envió el formulario con solo los campos obligatorios (sin mensaje, sin ruta)
WHEN el destinatario abre el correo
THEN el correo muestra el encabezado, el hero, la grilla de datos clave y los metadatos técnicos, sin mostrar secciones vacías ni espacios en blanco adicionales donde irían las secciones omitidas

### Scenario 3: Datos del remitente visibles antes que los metadatos técnicos

GIVEN que el destinatario abre el correo
WHEN escanea visualmente el correo
THEN los datos del remitente (nombre, empresa, email, teléfono) aparecen en la parte superior del cuerpo, y la IP, User-Agent y fecha quedan agrupados en la caja gris cerca del final, claramente diferenciados del contenido principal

### Scenario 4: Correo en cliente móvil

GIVEN que el destinatario abre el correo en un dispositivo móvil con pantalla menor a 400 px de ancho
WHEN el correo renderiza
THEN el contenido es legible sin necesidad de hacer zoom horizontal — el ancho máximo del correo se ajusta al ancho disponible

### Scenario 5: Versión texto plano disponible

GIVEN que el cliente de correo del destinatario no soporta HTML o el usuario prefiere texto plano
WHEN el cliente muestra la versión texto plano del correo
THEN todos los datos del formulario son legibles en texto plano sin etiquetas HTML ni elementos rotos

## Acceptance Criteria

- El correo muestra las secciones en el orden correcto: encabezado → hero → ruta (si aplica) → datos → mensaje (si aplica) → metadatos → pie de página
- Las secciones de ruta y mensaje no aparecen en el correo cuando los datos correspondientes están ausentes
- La caja de metadatos técnicos siempre contiene IP, User-Agent, fecha CL y tipo de formulario
- Datos del remitente y metadatos técnicos están en zonas visualmente diferenciadas
- El correo no supera 600 px de ancho y es legible en móvil sin scroll horizontal
- El correo tiene versión texto plano con todos los datos del formulario
