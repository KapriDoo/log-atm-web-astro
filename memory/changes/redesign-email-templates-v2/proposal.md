---
type: proposal
change_name: redesign-email-templates-v2
status: approved
domain: feature
fast_path: full
effort: M
created: "2026-05-26"
updated: "2026-05-26"
risks:
  - descripcion: "Outlook Win/Classic ignora border-radius, box-shadow y overflow:hidden en el wrapper; el header con gradiente no se clipa y el contenedor no se redondea. Degradación visual graceful, contenido íntegro."
    probabilidad: Media
  - descripcion: "buildContactoEmail usa `route` como texto libre (no par origen/destino); la sección ROUTE VISUAL debe adaptarse y puede no calzar 1:1 con la referencia para esta plantilla."
    probabilidad: Media
  - descripcion: "El CTA WhatsApp requiere helper `cleanPhone()` para construir `wa.me`; teléfonos con formatos inesperados podrían producir enlaces inválidos si no se sanitizan bien."
    probabilidad: Baja
  - descripcion: "Reescritura completa de las 3 plantillas sin test runner ni linter en el proyecto; regresiones de campos dinámicos solo detectables por inspección manual / QA."
    probabilidad: Media
---

# Propuesta — redesign-email-templates-v2

## Intent

Rediseñar las plantillas de correo HTML de los formularios para coincidir **1:1** con la propuesta de Claude Design en `correo-rediseno.html` (header azul corporativo, hero, ruta visual, data grid, mensaje, CTAs email+WhatsApp, metadata box, footer oscuro). El rediseño previo (`feature/redesign-form-email-templates`) se descarta; se parte de `main`. **Solo cambia la presentación** — campos dinámicos y lógica de envío intactos.

## Scope

**Entra:**
- Reescritura completa de `log-atm-web-astro/src/lib/email-templates.ts` (164 líneas) aplicando el diseño de referencia a los 3 builders.
- Extracción de helpers internos de sección (DRY), nuevo helper `cleanPhone()`.
- CSS 100% inline, layout por tablas, fuentes con fallbacks web-safe. Sin nuevas dependencias.

**NO entra (0 cambios):**
- Endpoints `/api/contacto`, `/api/cotizacion-rapida`, `/api/cotizacion` — firmas y contratos intactos.
- `mailer.ts` (transport SMTP `worker-mailer`), `folio.ts` (`generateFolio()`), `validate.ts` (validación/honeypot).
- Firmas exportadas de los 3 builders (`build*Email(d, meta) → {subject, html, text, replyTo?}`) — sin cambios.
- Patrones de asunto y la presencia del folio (solo en cotizacion4).

## Approach — B (recomendado por explore)

Mantener los 3 builders en `email-templates.ts` y extraer las secciones repetidas a helpers internos, reutilizados por los 3 builders:

`buildEmailHeader` (logo + badge por color) · `buildHeroSection` · `buildRouteSection` (reemplaza fila de ruta) · `buildDataGrid` (**reemplaza `renderRows`**, estilo lista) · `buildMessageBlock` (blockquote) · `buildCTAButtons` (email + WhatsApp, vía `cleanPhone`) · `buildMetadataBox` · `buildEmailFooter` · `buildEmailWrapper` (**reemplaza `wrap`**). Se conserva `escapeHtml`.

Justificación: DRY sobre ~80 líneas de header/footer/CTA comunes, KISS frente a introducir MJML/Maizzle (Approach C, over-engineering para 3 plantillas estables y con restricciones de filesystem en Cloudflare Workers), preserva todos los contratos de specs y ADR-0004.

## Trade-offs / Decisiones abiertas (recomendación por defecto)

1. **Logo**: textual ("A" + "LOG ATM") como la referencia. → **Recomendado: textual** (máxima compatibilidad, sin riesgo de bloqueo de imágenes).
2. **ROUTE VISUAL en contacto** (`route` es texto libre): caja visual con el texto / fila plana / omitir. → **Recomendado: caja visual mostrando el texto libre completo** (mantiene la identidad visual sin forzar un split origen→destino artificial).
3. **Outlook Win**: degradación graceful de `border-radius`/`box-shadow`/`overflow:hidden`. → **Recomendado: aceptar** (contenido íntegro; no vale la pena VML/MSO hacks).
4. **CTA WhatsApp / botones condicionales**: omitir botón email si no hay email; omitir WhatsApp si no hay teléfono. → **Recomendado: condicionar ambos botones a la presencia del dato**.
5. **Pills de color por formulario**: azul (contacto) · verde (cotización rápida) · ámbar (cotización 4 pasos). → **Recomendado: adoptar el esquema azul/verde/ámbar** de la nota de la referencia.

## Esfuerzo estimado

**M (1–2 días).** Scope acotado a 1 archivo (~164 líneas reescritas). El HTML de referencia ya está probado y es email-safe; el trabajo es adaptar campos dinámicos, crear los helpers de sección y validar manualmente las 3 variantes (sin test runner/linter). Sin riesgos Alta y sin esfuerzo L/XL.

## Riesgos

Ver frontmatter `risks`. Resumen: degradación visual en Outlook Win (Media, aceptable), adaptación de ruta en contacto (Media), enlaces `wa.me` mal formados (Baja), regresiones sin tooling automatizado (Media). Ningún riesgo de probabilidad Alta.
