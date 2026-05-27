---
type: proposal
change_name: "redesign-form-email-templates"
domain: feature
status: approved
iteration: 1
created: "2026-05-26"
updated: "2026-05-26"
effort: S
risks:
  - descripcion: "El cliente de correo bloquea el logo externo (https://logatm.com/logo.png) por defecto; el receptor ve un hueco hasta habilitar imágenes."
    probabilidad: Media
    impacto: "Bajo — el alt text 'LOG ATM' y un wordmark de texto bold como fallback preservan la identidad sin la imagen."
  - descripcion: "Outlook (Word HTML) ignora border-radius en tablas y degrada gradientes/sombras; el header puede verse con esquinas cuadradas."
    probabilidad: Media
    impacto: "Bajo — degradación puramente estética; el layout table-based con CSS inline se mantiene legible y la jerarquía visual sobrevive."
  - descripcion: "Una regresión al refactorizar wrap()/renderRows() podría romper el escape XSS o eliminar datos obligatorios (folio, footer técnico)."
    probabilidad: Baja
    impacto: "Alto — incumpliría specs vigentes (escapeHtml, quote-folio, quote-email-delivery). Mitigado verificando preservación de escapeHtml() y filas obligatorias en sdd-verify."
tags: [proposal]
---

# Propuesta: redesign-form-email-templates

## Intent

Rediseñar el HTML de los correos que generan los 3 formularios del sitio LOG ATM para reemplazar la presentación actual "sosa" (tabla cruda sobre fondo gris, sin marca) por un diseño moderno con identidad corporativa: header de marca, jerarquía visual por secciones y footer corporativo. El objetivo es que el receptor identifique de inmediato el correo con LOG ATM y lea los datos con mayor claridad. El cambio es puramente de presentación: no altera datos, contratos ni transporte.

## Scope

**Incluye:**
- Rediseño de `wrap()` en `src/lib/email-templates.ts`: header de marca, bandas de sección, footer corporativo.
- Rediseño de `renderRows()`: filas con fondo alternado y soporte de encabezados de sección.
- Agrupación de los 17 campos de la cotización 4 pasos en 3 secciones visuales (Detalle de envío / Información de carga / Contacto).
- Manejo del logo con `<img src="https://logatm.com/logo.png" alt="LOG ATM">` + fallback de texto.

**Excluye explícitamente:**
- `src/lib/mailer.ts` (transporte SMTP) — sin cambios.
- Endpoints `api/contacto.ts`, `api/cotizacion-rapida.ts`, `api/cotizacion.ts` — sin cambios de contrato.
- Lógica de negocio: validación, anti-abuse, generación de folio, reply-To — intactos.
- Introducir template engine o builder (no justificado: 3 plantillas estáticas en Workers).

## Approach Propuesto

**Approach A** de la exploración: rediseñar la plantilla base `wrap()` (tablas + CSS inline para compatibilidad Gmail/Outlook) con tres zonas. (1) **Header de marca**: banda superior `#112236` con logo `logo.png` (alt + fallback de texto) y nombre "LOG ATM" + tagline "LOGÍSTICA A TU MEDIDA". (2) **Cuerpo con jerarquía**: título de sección sobre banda `#4A7BB5`, datos en tabla con filas de fondo alternado (`#eef4fb` / `#ffffff`); para la cotización 4 pasos se agrupan los campos en 3 secciones con encabezado propio. (3) **Footer corporativo**: dirección (Vitacura, Santiago), web `logatm.com` y tagline en gris suave; los metadatos técnicos (IP, UA, fecha CL, tipo de form) se conservan colapsados visualmente al pie. Paleta de marca hardcodeada en hex (sin CSS vars). `renderRows()` gana un fondo alternado y un parámetro opcional de encabezado de sección.

## Esfuerzo Estimado

**S** — 1 solo archivo (`src/lib/email-templates.ts`), estructura de funciones ya conocida y reutilizable, sin cambios en runtime ni contratos ni dependencias. La exploración estimó M (~3-4h) por la extensión del HTML; el cambio se mantiene en S porque la superficie es acotada y los riesgos altos están mitigados por verificación, no por complejidad de implementación.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Logo externo bloqueado por el cliente de correo | Media | `alt="LOG ATM"` + wordmark de texto bold como fallback; la identidad no depende de la imagen. |
| Outlook degrada border-radius / gradientes en tablas | Media | Layout 100% table-based con CSS inline; degradación solo estética, jerarquía preservada. |
| Regresión que rompa escape XSS o elimine datos obligatorios | Baja | Preservar todas las llamadas a `escapeHtml()`, la fila Folio (`meta.folio`) y el footer técnico; verificar en sdd-verify contra specs forms-email. |

## Trade-offs

- **A favor**: máximo impacto visual y de marca con cambio acotado a 1 archivo; reutiliza `wrap()`/`renderRows()`; cero dependencias nuevas; respeta todas las specs vigentes.
- **En contra**: HTML ~3x más extenso que el actual; degradación estética inevitable en Outlook; el logo no se muestra hasta que el receptor habilita imágenes (mitigado con fallback de texto).
