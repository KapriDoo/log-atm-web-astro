---
status: accepted
date: 2026-05-26
deciders: sdd-design
consulted: exploration.md, proposal.md, clarifications.md, specs forms-email/email-brand-identity, email-section-structure, email-cta-conditional, email-form-differentiation
informed: sdd-apply, sdd-verify
capability: forms-email
tags: [adr, forms, email, templates, branding, html-email]
---

# ADR 0005: Arquitectura de helpers de sección y logo textual para plantillas de correo

## Contexto

El rediseño `redesign-email-templates-v2` reemplaza el HTML genérico actual de
`src/lib/email-templates.ts` por un diseño con identidad de marca LOG ATM (header
azul corporativo, hero, ruta visual, grilla de datos, mensaje, CTAs, metadatos y
footer oscuro), alineado 1:1 con la referencia `correo-rediseno.html`.

Restricciones del entorno:

- **Runtime**: Cloudflare Workers. No hay filesystem en runtime (no se pueden
  cargar archivos `.html` con placeholders en tiempo de ejecución).
- **Sin preprocesador de email**: no hay MJML, Maizzle ni juice. El HTML se
  construye con template literals TypeScript.
- **Sin test runner ni linter**: TS strict es la única red de seguridad.
- **3 builders exportados** (`buildContactoEmail`, `buildCotizacionRapidaEmail`,
  `buildCotizacion4Email`) consumidos por 3 endpoints. Sus firmas no deben cambiar.
- **Compatibilidad email-client**: Gmail bloquea `<style>` en `<head>` para muchos
  clientes; Outlook Win usa el motor de Word (no soporta `border-radius`,
  `box-shadow`, `overflow:hidden`, flexbox, grid).
- Las 3 plantillas comparten header, footer, ruta visual, CTAs y caja de metadatos;
  solo cambian los valores dinámicos y el color del badge.

Decisiones de diseño ya aprobadas por el usuario (clarifications.md): logo textual,
ruta de contacto como texto libre, degradación graceful en Outlook, CTAs
condicionales, pills de color por formulario.

## Decisión

### D1 — Arquitectura: helpers internos de sección + wrapper compositor (Approach B)

Mantener `email-templates.ts` como único archivo, sin nuevas dependencias ni cambios
en firmas exportadas. Extraer cada sección del diseño a un **helper interno puro**
que retorna un fragmento HTML (`string`). Cada builder compone su correo llamando a
los helpers que aplican y delega el wrapper externo + ensamblado en
`buildEmailWrapper`.

Helpers internos previstos:

| Helper | Rol |
|--------|-----|
| `escapeHtml(s)` | Sanitización (se conserva del código actual) |
| `cleanPhone(phone)` | Sanitiza teléfono para `wa.me`/`tel:` |
| `buildEmailHeader(badge)` | Header azul + logo textual + badge de color |
| `buildHeroSection({ kicker, title, subtitle })` | Kicker mono + h1 + descripción |
| `buildRouteSection(...)` | Caja azul de ruta (par o texto libre) |
| `buildDataGrid(rows)` | Grilla tipo lista (reemplaza `renderRows`) |
| `buildMessageBlock({ label, message })` | Blockquote con borde izq azul |
| `buildCTAButtons({ email, phone, subject })` | Botones email/WhatsApp condicionales |
| `buildMetadataBox(meta)` | Caja gris de metadatos técnicos |
| `buildEmailFooter()` | Footer oscuro estático |
| `buildEmailWrapper(sectionsHtml)` | Doc HTML completo + tabla outer/inner |

**Justificación** (KISS + DRY + SRP):

- Header, footer, ruta, CTAs y metadata son idénticos en estructura en las 3
  plantillas — extraerlos evita 3× duplicación de ~80 líneas de HTML.
- Sin dependencias nuevas ni paso de compilación (descarta MJML/Maizzle por YAGNI;
  el HTML de referencia ya es email-safe).
- Compatible con Workers (no requiere filesystem; descarta archivos `.html` con
  placeholders).
- Las firmas exportadas no cambian → 0 modificaciones en endpoints/mailer.
- Cada helper tiene una sola responsabilidad y se prueba/lee de forma aislada.

### D2 — Logo textual (sin imágenes)

El logo del header se construye 100% con HTML/CSS: un `<div>` blanco 40×40px con la
letra "A" en color brand (`#4A7BB5`, Outfit/Arial) + el texto "LOG ATM" + tagline en
monospace. **No se usa `<img>`** (ni URL pública ni base64).

**Justificación**:

- Robusto ante clientes que bloquean imágenes externas (Gmail, Outlook por defecto).
- Evita el clipping de Gmail por tamaño (~100KB) que provoca base64.
- Sin dependencia de un CDN ni de un asset accesible públicamente.
- Es exactamente lo que hace la referencia `correo-rediseno.html`.
- El proyecto tiene `logo.svg`/`logo-white.svg` en `public/`, pero usarlos
  introduce los riesgos anteriores sin beneficio para email transaccional interno.

### D3 — Degradación graceful en Outlook Windows

Se usan `border-radius`, `box-shadow` y `overflow:hidden` solo en el wrapper externo
y en cajas decorativas. En Outlook Win/Classic estas propiedades se ignoran
(esquinas rectas, sin sombra) pero el contenido textual y los colores de fondo
permanecen íntegros. **No se añaden hacks VML/MSO** (condicionales `<!--[if mso]>`,
`v:roundrect`, etc.).

**Justificación**: el contenido queda legible; los hacks añaden complejidad
desproporcionada para clientes internos del equipo comercial. Aprobado en
clarifications.md punto 3.

## Consecuencias

### Positivas

- Cambio acotado a un archivo; 0 impacto en endpoints, mailer, folio, validación.
- Código mantenible: añadir/ajustar una sección es local a su helper.
- Identidad de marca consistente en las 3 plantillas (header/footer compartidos).
- Compatibilidad universal por logo textual + tablas + CSS inline.
- Versión `text` plana preservada y regenerada desde los mismos datos.

### Negativas

- Los template literals con HTML inline siguen siendo verbosos (~mismo volumen que
  la referencia); sin separación física entre estructura y datos. Aceptado: es la
  opción más simple y portable para Workers.
- En Outlook Win el diseño se ve sin redondeo ni sombra (degradación aceptada).

## Alternativas descartadas

- **Reescritura directa sin helpers (Approach A)**: triplicaría header/footer/ruta;
  viola DRY.
- **MJML/Maizzle (Approach C)**: dependencia + paso de compilación; over-engineering
  para 3 templates estables; el HTML de referencia ya es email-safe.
- **Archivos `.html` con placeholders (Approach D)**: Workers no lee filesystem en
  runtime; complica el escaping; templating adhoc con superficie de bugs.
- **Logo como imagen (URL/base64)**: riesgo de bloqueo de imágenes y clipping de
  Gmail; sin valor sobre el logo textual.
- **Hacks VML/MSO para Outlook**: complejidad desproporcionada para audiencia interna.

## Estado

**Accepted** — 2026-05-26

No supersede ningún ADR previo. Complementa ADR-0004 (folio): el folio sigue
generándose server-side y se muestra ahora en la caja de metadatos del correo de
cotización 4 pasos.
