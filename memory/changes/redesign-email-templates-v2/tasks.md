# Tasks — redesign-email-templates-v2

> Fase: sdd-tasks · Tier: standard · Modelo: sonnet
> Fecha: 2026-05-26
> Archivo objetivo: `log-atm-web-astro/src/lib/email-templates.ts`
> **SCOPE FIJO**: Solo se toca el archivo anterior. 0 cambios en endpoints, mailer, folio ni validate.

---

## Restricciones globales (aplicar a toda la implementación)

- **NO tocar**: `src/pages/api/contacto.ts`, `src/pages/api/cotizacion-rapida.ts`, `src/pages/api/cotizacion.ts`, `src/lib/mailer.ts`, `src/lib/folio.ts`, `src/lib/validate.ts`.
- **Conservar** la importación `import { formatDateCL } from "./mailer"` tal como está.
- **Conservar** la función `escapeHtml` sin modificaciones (misma lógica, mismos reemplazos).
- **Conservar** el tipo exportado `Meta` con los mismos campos (`ip`, `userAgent`, `formType`, `folio?`).
- **Conservar** las 3 firmas exportadas exactas (parámetros `d` con sus tipos, retorno `{ subject, html, text, replyTo }`).
- **Conservar** los patrones de `subject` literalmente, incluyendo `folioSuffix` en cotización 4.
- Layout HTML 100% tablas con `role="presentation"`, CSS 100% inline. Sin `<style>` en `<head>`.

---

## BLOQUE 1 — Tipos e infraestructura base

### TAREA 1 — Añadir tipos compartidos y `cleanPhone`

**Qué hacer**: Después del `import` y de `escapeHtml` (que se conserva sin cambios), declarar los tipos internos compartidos y la nueva función utilitaria `cleanPhone`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Detalle de implementación**:
```ts
// Tipos internos — NO exportar
type BadgeColor = "blue" | "green" | "amber";
type GridRow = {
  label: string;
  value: string | undefined | null;
  kind?: "text" | "email" | "tel" | "pill"; // default "text"
};
type RouteInput =
  | { mode: "pair"; origin?: string | null; dest?: string | null }
  | { mode: "free"; text?: string | null };

function cleanPhone(phone: string): string {
  const trimmed = phone.trim();
  const plus = trimmed.startsWith("+") ? "+" : "";
  return plus + trimmed.replace(/[^\d]/g, "");
}
```

**Eliminar**: el tipo `type Row = [label: string, value: string | undefined | null]` (reemplazado por `GridRow`).

**Criterio de completado**: El archivo compila sin errores TS; `cleanPhone("+56 9 1234-5678")` produce `"+56912345678"`; `cleanPhone("(56) 912345678")` produce `"56912345678"`. `BadgeColor`, `GridRow`, `RouteInput` usables por los helpers.

**Specs relacionadas**: [[email-cta-conditional]] (sanitización de teléfono), [[email-form-differentiation]] (diferenciación por color de badge).

---

## BLOQUE 2 — Helpers de estructura base (header, footer, wrapper)

### TAREA 2 — Implementar `buildEmailWrapper`

**Qué hacer**: Crear la función interna `buildEmailWrapper(sections: string): string` que produce el documento HTML completo con la tabla outer y la tabla inner.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Tokens aplicados**:
- Outer: `background:#f8f7f6`, padding `32px 16px`, `font-family:'Inter',Arial,sans-serif`, `color:#211f1c`
- Inner: `max-width:600px`, `background:#ffffff`, `border-radius:20px`, `overflow:hidden`, `box-shadow:0 4px 16px 0 rgba(74,123,181,.12)`
- `<meta charset="UTF-8">` + `<meta name="viewport" content="width=device-width,initial-scale=1">` en `<head>`

**Reemplaza**: la función `wrap` actual (que se elimina).

**Criterio de completado**: El string retornado abre con `<!doctype html>`, incluye las dos tablas anidadas, y el parámetro `sections` queda concatenado dentro de la tabla inner. `max-width:600px` presente. Sin `<style>` en `<head>`.

**Specs relacionadas**: [[email-section-structure]] (ancho 600px, tablas, CSS inline), [[email-brand-identity]] (fondo general `#f8f7f6`).

---

### TAREA 3 — Implementar `buildEmailHeader`

**Qué hacer**: Crear la función interna `buildEmailHeader(badge: { color: BadgeColor; label: string }): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Especificación visual**:
- `<td>` con `padding:32px 32px 28px`, fondo gradiente `background:#112236;background-image:linear-gradient(135deg,#112236 0%,#1c3554 100%)`
- Tabla 100% dentro: celda izquierda = logo textual, celda derecha `align="right"` = badge
- Logo: div `40×40px` `background:#ffffff` `border-radius:10px`, letra "A" `color:#4A7BB5` Outfit 900 18px + "LOG ATM" Outfit 800 18px `#ffffff` + tagline `'JetBrains Mono','SF Mono',monospace` 10px `letter-spacing:.16em` uppercase `#aec7e5` (`Logística a tu medida`)
- Badge por color (`BadgeColor`):
  - `blue`: bg `rgba(74,123,181,.18)`, borde `1px solid rgba(135,170,229,.6)`, texto `#9cc0ec`, label `● Nuevo mensaje`
  - `green`: bg `rgba(62,185,120,.18)`, borde `1px solid rgba(135,211,176,.6)`, texto `#87d3b0`, label `● Nuevo lead`
  - `amber`: bg `rgba(245,180,80,.18)`, borde `1px solid rgba(245,200,130,.6)`, texto `#f0c074`, label `● Cotización completa`
- Badge: `padding:6px 12px`, `border-radius:9999px`, monoespaciada 11px 600
- El parámetro `badge.label` siempre coincide con el label por color (el builder lo pasa explícitamente)

**Criterio de completado**: El HTML producido muestra gradiente azul oscuro, logo textual visible (no `<img>`), y badge con el color correcto según `BadgeColor`. Inspeccionado visualmente en un navegador.

**Specs relacionadas**: [[email-brand-identity]] (logo textual, fondo azul, Outlook degradation), [[email-form-differentiation]] (badge azul/verde/ámbar por formulario).

---

### TAREA 4 — Implementar `buildEmailFooter`

**Qué hacer**: Crear la función interna `buildEmailFooter(): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Especificación visual**:
- `<td>` con `padding:24px 32px`, `background:#0a1624`
- Tabla 2 columnas: izq = "LOG ATM" Outfit 700 15px `#ffffff` + tagline mono 10px `letter-spacing:.12em` uppercase `#658fc3` (`Logística a tu medida`); der `align="right"` dirección 12px `#658fc3` (`Av. Pdte Kennedy 5600, Of. 507` / `Vitacura · Santiago · Chile`)
- Aviso: div con `border-top:1px solid rgba(255,255,255,.08)` `margin-top:18px` `padding-top:14px`, mono 10px `#658fc3` `text-align:center`: `Este correo se generó automáticamente desde logatm.com · No respondas a esta dirección`

**Criterio de completado**: Footer con fondo `#0a1624` visible. Nombre empresa, dirección y aviso automático presentes. Inspeccionado visualmente.

**Specs relacionadas**: [[email-brand-identity]] (pie de página oscuro, nombre, dirección, aviso automático).

---

## BLOQUE 3 — Helpers de sección de contenido

### TAREA 5 — Implementar `buildHeroSection`

**Qué hacer**: Crear la función interna `buildHeroSection(args: { kicker: string; title: string; subtitle: string }): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Especificación visual**:
- `<td>` con `padding:32px 32px 8px`
- Kicker: texto mono 11px `letter-spacing:.14em` uppercase 600, color `#339965` (verde uniforme), `margin-bottom:12px`
- h1: Outfit 800 26px `line-height:1.15` `letter-spacing:-.02em` `color:#211f1c` `margin:0 0 8px`; `title` puede contener `<span>` y `<strong>` controlados (pasado como HTML seguro por el builder)
- p: Inter 15px `line-height:1.55` `color:#544f4a`; `subtitle` también puede contener `<strong>` controlados

**Criterio de completado**: Kicker, título y subtítulo visibles con los estilos correctos. No aplica `escapeHtml` al `title`/`subtitle` (el builder ya los compone con HTML controlado y escapa los valores dinámicos antes de pasarlos).

**Specs relacionadas**: [[email-section-structure]] (sección hero en el orden correcto), [[email-form-differentiation]] (kicker adaptado por formulario).

---

### TAREA 6 — Implementar `buildRouteSection`

**Qué hacer**: Crear la función interna `buildRouteSection(route: RouteInput): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Comportamiento**:
- Retorna `""` si no hay dato (`mode:"free"` con `text` vacío/nulo; `mode:"pair"` con ambos `origin` y `dest` vacíos/nulos).
- Modo `pair`: caja con 3 columnas — origen (label "Origen" mono 10px `#3b6497` + valor Outfit 700 18px `#112236`) / flecha `→` `#4A7BB5` 24px centrada / destino `align="right"` (label "Destino" + valor). Fondo `#eef4fb` `border-radius:14px`, `<td>` interior `padding:20px 24px`.
- Modo `free`: caja con una sola celda. Label "Ruta" mono 10px `#3b6497`. Valor = texto libre Outfit 700 18px `#112236`. Mismos colores de fondo y radios.
- `<td>` exterior con `padding:24px 32px 8px`.
- Los valores de ruta pasan por `escapeHtml`.

**Criterio de completado**: Con `mode:"pair"` y ambos valores presentes → caja de 3 columnas visible. Con `mode:"pair"` y ambos vacíos → retorna `""` (sección omitida). Con `mode:"free"` y texto → caja con texto libre. Con `mode:"free"` y texto vacío → retorna `""`.

**Specs relacionadas**: [[email-section-structure]] (sección opcional omitida si vacía), [[email-form-differentiation]] (ruta libre para contacto, par origin→dest para cotizaciones).

---

### TAREA 7 — Implementar `buildDataGrid`

**Qué hacer**: Crear la función interna `buildDataGrid(args: { label: string; rows: GridRow[] }): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Comportamiento**:
- Filtra filas con valor vacío/nulo: `v == null || String(v).trim() === ""`.
- `<td>` exterior con `padding:24px 32px 8px`.
- Label de sección: mono 11px `letter-spacing:.14em` uppercase 600 `color:#6e6963` `margin-bottom:14px`.
- Tabla 100% Inter 15px. Cada fila `<tr>`:
  - `<td width:140px padding:14px 0 border-bottom:1px solid #e1dedb>` — label inner: mono 11px uppercase `#6e6963`
  - `<td padding:14px 0 border-bottom:1px solid #e1dedb font-weight:500>` — valor según `kind`:
    - `"text"` (default): texto plano escapado
    - `"email"`: `<a href="mailto:{val}" style="color:#4A7BB5;text-decoration:none;">{val escapado}</a>`
    - `"tel"`: `<a href="tel:{cleanPhone(val)}" style="color:#4A7BB5;text-decoration:none;">{val escapado}</a>`
    - `"pill"`: `<span style="background:#d7e4f4;color:#2b4e78;font-family:'JetBrains Mono','SF Mono',monospace;font-size:12px;font-weight:600;padding:4px 10px;border-radius:9999px;">{val escapado}</span>`
- **Última fila visible**: sin `border-bottom` en ambas celdas.
- **Reemplaza** la función `renderRows` (que se elimina).

**Criterio de completado**: Filas con valor nulo/vacío omitidas. Links de email y tel con estilos correctos. Pill con fondo azul claro y texto oscuro. Última fila sin separador. Inspeccionado visualmente con datos de las 3 plantillas.

**Specs relacionadas**: [[email-section-structure]] (grilla con divisores, campos opcionales omitidos), [[email-form-differentiation]] (modalidad/servicio como pill), [[email-cta-conditional]] (email y tel como links).

---

### TAREA 8 — Implementar `buildMessageBlock`

**Qué hacer**: Crear la función interna `buildMessageBlock(args: { label: string; message?: string | null }): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Comportamiento**:
- Retorna `""` si `message` es nulo, vacío o solo espacios.
- `<td>` exterior con `padding:8px 32px 24px`.
- Label: mono 11px uppercase 600 `#6e6963` `margin-bottom:10px`.
- Bloque mensaje: `background:#f8f7f6` `border-left:3px solid #4A7BB5` `padding:18px 22px` Inter 15px `line-height:1.6` `color:#37332f` `border-radius:0 12px 12px 0`.
- El texto del mensaje pasa por `escapeHtml` antes de insertarse.

**Criterio de completado**: Con mensaje presente → bloque visible con borde izquierdo azul. Con mensaje vacío/nulo → retorna `""` (sin `<tr>` en el correo).

**Specs relacionadas**: [[email-section-structure]] (bloque mensaje/notas, omitido si vacío).

---

### TAREA 9 — Implementar `buildCTAButtons`

**Qué hacer**: Crear la función interna `buildCTAButtons(args: { email?: string | null; phone?: string | null; mailSubject: string; waText: string }): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Comportamiento**:
- Retorna `""` si no hay email ni phone (ambos vacíos/nulos).
- `<td>` exterior con `padding:8px 32px 28px`.
- Botón Email (solo si `email` presente):
  - `href="mailto:{escapeHtml(email)}?subject={encodeURIComponent(mailSubject)}"`
  - `background:#4A7BB5` `color:#ffffff` Outfit 700 15px `padding:14px 20px` `border-radius:9999px` `display:block` `text-align:center`
  - Texto del botón: `Responder por email`
- Botón WhatsApp (solo si `phone` presente):
  - `href="https://wa.me/{cleanPhone(phone).replace(/^\+/, "")}?text={encodeURIComponent(waText)}"`
  - `background:#25D366` `color:#ffffff` mismo estilo visual
  - Texto del botón: `WhatsApp`
- Layout de botones:
  - **2 botones**: tabla 2 col `width:50%`; celda email `padding-right:8px`, celda WA `padding-left:8px`
  - **1 solo botón**: `<td width:100%>` (sin split)
- SLA: `<p style="font-family:'JetBrains Mono',...;font-size:11px;color:#898580;text-align:center;margin:14px 0 0;letter-spacing:.04em;">SLA cliente · responder antes de 24 h hábiles</p>`

**Criterio de completado**: Con email y phone → 2 botones lado a lado. Con solo email → 1 botón azul full-width. Con solo phone → 1 botón verde full-width. Sin ninguno → retorna `""`. El enlace WA no contiene `+` (solo dígitos). SLA visible bajo los botones.

**Specs relacionadas**: [[email-cta-conditional]] (todos los ACs de la spec), [[email-section-structure]] (sección CTA omitida si sin datos).

---

### TAREA 10 — Implementar `buildMetadataBox`

**Qué hacer**: Crear la función interna `buildMetadataBox(meta: Meta): string`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Comportamiento**:
- `<td>` exterior con `padding:0 32px 24px`.
- Caja: `background:#f8f7f6` `border:1px solid #e1dedb` `border-radius:12px` `padding:16px 20px`.
- Título: mono 10px `letter-spacing:.14em` uppercase `#898580` `margin-bottom:8px`: `METADATOS TÉCNICOS`.
- Tabla mono 11px `color:#544f4a` `line-height:1.7`. Columnas: `<td width:90px color:#898580>` label / `<td>` valor.
- Filas en orden:
  1. **Folio** (solo si `meta.folio`): label `Folio`, valor `<strong style="color:#211f1c;">{meta.folio}</strong>` — PRIMERA fila
  2. Formulario: `meta.formType` (escapado)
  3. Recibido: `formatDateCL()` (sin escapar, es fecha generada internamente)
  4. IP: `meta.ip` (escapado)
  5. User-Agent: `meta.userAgent` (escapado, `<td vertical-align:top>`)

**Criterio de completado**: Folio en negrita como primera fila cuando `meta.folio` está presente; ausente cuando no. IP, UA, fecha y formType siempre presentes. Caja con fondo gris diferenciado visualmente del contenido principal.

**Specs relacionadas**: [[email-section-structure]] (caja metadatos siempre presente, visualmente separada), [[email-form-differentiation]] (folio solo en cotización 4).

---

## BLOQUE 4 — Reescritura de los 3 builders exportados

> Estas tareas conservan las firmas exactas y los patrones de `subject`. Solo cambia el cuerpo interno de cada función.

### TAREA 11 — Reescribir `buildContactoEmail`

**Qué hacer**: Reemplazar el cuerpo de `buildContactoEmail` usando los helpers del Bloque 2 y 3. Conservar la firma exportada intacta.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Composición de `sections`**:
```
buildEmailHeader({ color: "blue", label: "● Nuevo mensaje" })
+ buildHeroSection({
    kicker: "━━━ Nuevo contacto",
    title: `${escapeHtml(d.name)}${d.company ? ` · <span style="color:#4A7BB5;font-family:'Outfit',Arial,sans-serif;">${escapeHtml(d.company)}</span>` : ""}`,
    subtitle: `Nuevo mensaje desde el formulario de contacto${d.service ? ` sobre <strong>${escapeHtml(d.service)}</strong>` : ""}${d.route ? ` para la ruta ${escapeHtml(d.route)}` : ""}`
  })
+ buildRouteSection({ mode: "free", text: d.route })
+ buildDataGrid({ label: "Datos del contacto", rows: [
    { label: "Nombre", value: d.name },
    { label: "Empresa", value: d.company },
    { label: "Email", value: d.email, kind: "email" },
    { label: "Teléfono", value: d.phone, kind: "tel" },
    { label: "Servicio", value: d.service, kind: "pill" },
  ]})
+ buildMessageBlock({ label: "Mensaje del cliente", message: d.message })
+ buildCTAButtons({
    email: d.email, phone: d.phone,
    mailSubject: `Re: ${subject}`,
    waText: `Hola ${escapeHtml(d.name)}, vi tu mensaje en logatm.com`
  })
+ buildMetadataBox(meta)
+ buildEmailFooter()
```
`html = buildEmailWrapper(sections)`

**Versión `text`**: Construida de los datos crudos siguiendo la estructura definida en design.md §1.7 (título, hero subtitle plano, — Ruta — si aplica, — Datos del contacto —, — Mensaje — si aplica, — Metadatos —).

**`replyTo`**: `d.email` (sin cambios).
**`subject`**: Patrón preservado literalmente.

**Criterio de completado**: Badge azul, hero con nombre + empresa en azul, ruta libre visible (o ausente si vacía), grid con 5 campos (vacíos omitidos), mensaje (o ausente), CTAs, metadata sin folio, footer. Versión text sin etiquetas HTML. Build sin errores TS.

**Specs relacionadas**: [[email-brand-identity]], [[email-section-structure]], [[email-cta-conditional]], [[email-form-differentiation]].

---

### TAREA 12 — Reescribir `buildCotizacionRapidaEmail`

**Qué hacer**: Reemplazar el cuerpo de `buildCotizacionRapidaEmail` usando los helpers. Conservar firma exportada intacta.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Composición de `sections`**:
```
buildEmailHeader({ color: "green", label: "● Nuevo lead" })
+ buildHeroSection({
    kicker: "━━━ Cotización rápida",
    title: escapeHtml(d.mode || "Cotización rápida"),
    subtitle: `Solicita una cotización${d.mode ? ` <strong>${escapeHtml(d.mode)}</strong>` : ""}${(d.origin || d.destination) ? ` en la ruta ${escapeHtml(d.origin || "—")} → ${escapeHtml(d.destination || "—")}` : ""}`
  })
+ buildRouteSection({ mode: "pair", origin: d.origin, dest: d.destination })
+ buildDataGrid({ label: "Datos del lead", rows: [
    { label: "Modalidad", value: d.mode, kind: "pill" },
    { label: "Volumen", value: d.volume },
    { label: "Email", value: d.email, kind: "email" },
    { label: "Teléfono", value: d.phone, kind: "tel" },
    { label: "Canal preferido", value: d.preference },
  ]})
// SIN buildMessageBlock (no aplica)
+ buildCTAButtons({
    email: d.email, phone: d.phone,
    mailSubject: `Re: ${subject}`,
    waText: `Hola, vi tu solicitud de cotización en logatm.com`
  })
+ buildMetadataBox(meta)
+ buildEmailFooter()
```

**Nota importante**: `origin`/`destination` van en la caja de ruta, **no** se repiten en el DataGrid.

**Versión `text`**: Estructura §1.7 adaptada: sin bloque de mensaje.

**`replyTo`**: `d.email || undefined` (sin cambios).
**`subject`**: Patrón preservado literalmente.

**Criterio de completado**: Badge verde, hero con modo de cotización, ruta par origin→dest (o ausente si ambos vacíos), grid sin fila de origen/destino, sin sección de mensaje, CTAs condicionales, metadata sin folio, footer. Build sin errores TS.

**Specs relacionadas**: [[email-brand-identity]], [[email-section-structure]], [[email-cta-conditional]], [[email-form-differentiation]].

---

### TAREA 13 — Reescribir `buildCotizacion4Email`

**Qué hacer**: Reemplazar el cuerpo de `buildCotizacion4Email` usando los helpers. Conservar firma exportada intacta, incluyendo la lógica de `servicesStr` y coerciones numéricas.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Lógica a preservar** (igual que el código actual):
```ts
const servicesStr = Array.isArray(d.services)
  ? d.services.join(", ")
  : typeof d.services === "string" ? d.services : "";
const folioSuffix = meta.folio ? ` — Folio ${meta.folio}` : "";
```
Coerciones: `d.volume != null ? String(d.volume) : ""`, idem `weight`, `containerCount`.

**Composición de `sections`**:
```
buildEmailHeader({ color: "amber", label: "● Cotización completa" })
+ buildHeroSection({
    kicker: "━━━ Solicitud de cotización",
    title: `${escapeHtml(d.name)}${d.company ? ` · <span style="color:#4A7BB5;...">${escapeHtml(d.company)}</span>` : ""}`,
    subtitle: `Solicita una propuesta para <strong>${escapeHtml(d.modality || "su carga")}</strong>${(d.origin || d.dest) ? ` en la ruta ${escapeHtml(d.origin || "—")} → ${escapeHtml(d.dest || "—")}` : ""}.`
  })
+ buildRouteSection({ mode: "pair", origin: d.origin, dest: d.dest })
+ buildDataGrid({ label: "Detalle de la cotización", rows: [
    { label: "Modalidad", value: d.modality, kind: "pill" },
    { label: "Incoterm", value: d.incoterm },
    { label: "Fecha estimada", value: d.date },
    { label: "Tipo de carga", value: d.cargoType },
    { label: "Volumen (m³)", value: d.volume != null ? String(d.volume) : "" },
    { label: "Peso (kg)", value: d.weight != null ? String(d.weight) : "" },
    { label: "N° contenedores", value: d.containerCount != null ? String(d.containerCount) : "" },
    { label: "Tipo contenedor", value: d.containerType },
    { label: "Servicios adicionales", value: servicesStr },
    { label: "Nombre", value: d.name },
    { label: "Empresa", value: d.company },
    { label: "Email", value: d.email, kind: "email" },
    { label: "Teléfono", value: d.phone, kind: "tel" },
  ]})
+ buildMessageBlock({ label: "Notas del cliente", message: d.notes })
+ buildCTAButtons({
    email: d.email, phone: d.phone,
    mailSubject: `Re: ${subject}`,
    waText: `Hola ${escapeHtml(d.name)}, vi tu solicitud de cotización en logatm.com`
  })
+ buildMetadataBox(meta)  // folio como primera fila cuando meta.folio presente
+ buildEmailFooter()
```

**Versión `text`**: Estructura §1.7 completa con bloque Folio como primera línea de — Metadatos — cuando `meta.folio` está presente.

**`replyTo`**: `d.email` (sin cambios).
**`subject`**: Patrón preservado literalmente con `folioSuffix`.

**Criterio de completado**: Badge ámbar, hero con nombre + empresa en azul, ruta par, grid completo con todos los campos de cotización (vacíos omitidos), notas (o ausentes), CTAs, folio como **primera fila** de metadata en negrita, footer. Build sin errores TS.

**Specs relacionadas**: [[email-brand-identity]], [[email-section-structure]], [[email-cta-conditional]], [[email-form-differentiation]].

---

## BLOQUE 5 — Limpieza y versión text

### TAREA 14 — Eliminar funciones obsoletas y verificar exports

**Qué hacer**: Eliminar del archivo las funciones `renderRows` y `wrap` que quedan sin uso tras las tareas anteriores. Confirmar que las 3 funciones exportadas (`buildContactoEmail`, `buildCotizacionRapidaEmail`, `buildCotizacion4Email`) son los únicos exports del archivo.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Criterio de completado**: Ninguna referencia a `renderRows` ni `wrap` en el archivo. Solo 3 `export function`. El tipo `Row` también eliminado (reemplazado por `GridRow`). Sin errores TS por referencias huérfanas.

**Specs relacionadas**: [[email-section-structure]] (contrato de retorno mantenido).

---

### TAREA 15 — Auditar versiones `text` planas de los 3 builders

**Qué hacer**: Revisar que cada builder produzca una versión `text` completa siguiendo la estructura de design.md §1.7. La versión `text` se construye a partir de los datos crudos (no del HTML). Verificar que:
- No contiene etiquetas HTML.
- Incluye todos los campos con valor (misma lógica de filtro que el HTML).
- Secciones opcionales se omiten cuando no hay dato.
- Folio incluido en la sección — Metadatos — solo para cotización 4.
- Contiene: `Formulario: {meta.formType}`, `Recibido: {formatDateCL()}`, `IP: {meta.ip}`, `User-Agent: {meta.userAgent}`.

**En qué archivo**: `log-atm-web-astro/src/lib/email-templates.ts`

**Criterio de completado**: Inspección manual del valor de `text` retornado — ninguna etiqueta `<...>` presente; todos los datos del formulario presentes en formato legible.

**Specs relacionadas**: [[email-section-structure]] AC "El correo tiene versión texto plano con todos los datos del formulario".

---

## BLOQUE 6 — Verificación

### TAREA 16 — Build de TypeScript + verificación de contratos

**Qué hacer**: Ejecutar `npm run build` desde `log-atm-web-astro/` y confirmar que compila sin errores.

**Comandos**:
```bash
cd log-atm-web-astro && npm run build
```

**Criterio de completado**:
- [ ] `npm run build` termina sin errores ni warnings de tipo TS.
- [ ] Las 3 funciones exportadas conservan sus firmas exactas (parámetros y tipo de retorno).
- [ ] Sin imports rotos ni referencias a `renderRows`/`wrap`/`Row` eliminados.
- [ ] Ningún archivo fuera de `email-templates.ts` fue modificado.

**Specs relacionadas**: todas (compilación sin errores es prerequisito de cualquier AC).

---

### TAREA 17 — Inspección visual 1:1 de las 3 plantillas

**Qué hacer**: Generar el HTML de las 3 plantillas con datos de prueba e inspeccionar en un navegador comparando con la referencia visual `/home/kapridoo/projects/log-atm-finally/project/correo-rediseno.html`.

**Checklist de inspección** (marcar cada punto por plantilla):

**`buildContactoEmail` (badge azul):**
- [ ] Header: gradiente azul oscuro, logo textual ("A" + "LOG ATM"), badge azul `● Nuevo mensaje`
- [ ] Hero: kicker `━━━ Nuevo contacto` verde, nombre en h1, empresa en azul (si presente), subtítulo con servicio/ruta
- [ ] Ruta: caja `#eef4fb` con texto libre visible; ausente si `route` vacío
- [ ] Grid "Datos del contacto": 5 campos máx, vacíos omitidos, email/tel como links, servicio como pill
- [ ] Mensaje del cliente: bloque con borde izquierdo azul; ausente si `message` vacío
- [ ] CTAs: botón azul email + botón verde WA (si phone); SLA visible
- [ ] Metadata: sin fila Folio; IP/UA/fecha/formType presentes
- [ ] Footer: fondo `#0a1624`, nombre + dirección + aviso automático

**`buildCotizacionRapidaEmail` (badge verde):**
- [ ] Header: badge verde `● Nuevo lead`
- [ ] Hero: kicker `━━━ Cotización rápida`, modo en h1
- [ ] Ruta: par origin→dest; ausente si ambos vacíos
- [ ] Grid "Datos del lead": sin filas de origin/dest; modalidad como pill; email/tel como links
- [ ] Sin sección de mensaje
- [ ] CTAs condicionales (email puede faltar)
- [ ] Metadata: sin fila Folio
- [ ] Footer idéntico a los otros

**`buildCotizacion4Email` (badge ámbar):**
- [ ] Header: badge ámbar `● Cotización completa`
- [ ] Hero: kicker `━━━ Solicitud de cotización`, nombre + empresa
- [ ] Ruta: par origin→dest; ausente si ambos vacíos
- [ ] Grid "Detalle de la cotización": todos los campos de cotización; modalidad como pill; vacíos omitidos
- [ ] Notas del cliente: presentes/ausentes según dato
- [ ] CTAs: botón email + WA (si phone)
- [ ] Metadata: **Folio en primera fila, negrita** (solo si `meta.folio` presente)
- [ ] Footer idéntico

**Criterio de completado general**: Todas las casillas marcadas. El HTML producido es visualmente equivalente a la referencia `correo-rediseno.html` en secciones, colores y estructura.

**Specs relacionadas**: todas.

---

## Orden de ejecución y dependencias

```
TAREA 1 (tipos + cleanPhone)
  ↓
TAREA 2 (buildEmailWrapper) — paralela con TAREA 3, 4
TAREA 3 (buildEmailHeader)  — paralela con TAREA 2, 4
TAREA 4 (buildEmailFooter)  — paralela con TAREA 2, 3
  ↓
TAREA 5 (buildHeroSection)    — requiere tipos de T1
TAREA 6 (buildRouteSection)   — requiere escapeHtml + tipos de T1
TAREA 7 (buildDataGrid)       — requiere escapeHtml + cleanPhone + tipos de T1
TAREA 8 (buildMessageBlock)   — requiere escapeHtml + tipos de T1
TAREA 9 (buildCTAButtons)     — requiere escapeHtml + cleanPhone + tipos de T1
TAREA 10 (buildMetadataBox)   — requiere formatDateCL + escapeHtml + Meta + tipos de T1
  ↓
TAREA 11 (buildContactoEmail)      — requiere T2..T10
TAREA 12 (buildCotizacionRapidaEmail) — requiere T2..T10
TAREA 13 (buildCotizacion4Email)   — requiere T2..T10
  ↓
TAREA 14 (limpieza obsoletos)  — requiere T11..T13
TAREA 15 (auditar text plano)  — requiere T11..T13
  ↓
TAREA 16 (npm run build)       — requiere T14 + T15
  ↓
TAREA 17 (inspección visual)   — requiere T16
```

---

## Archivos NO modificados (confirmado)

- `src/pages/api/contacto.ts`
- `src/pages/api/cotizacion-rapida.ts`
- `src/pages/api/cotizacion.ts`
- `src/lib/mailer.ts`
- `src/lib/folio.ts`
- `src/lib/validate.ts`
