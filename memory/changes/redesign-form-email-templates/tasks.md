# Tasks: redesign-form-email-templates

> Generado: 2026-05-26 | Fase: sdd-tasks | Modelo: sonnet
> Specs: [[forms-email/email-brand-identity]], [[forms-email/email-visual-hierarchy]]
> Diseño fuente: design.md (359 líneas)
> Archivo único a modificar: `log-atm-web-astro/src/lib/email-templates.ts`

---

## Orden de ejecución

```
T1 → T2 → T3 → T4a → T4b → T4c → T5 → T6
         ↑T1,T2    ↑T3        ↑T3       ↑T1..T4c  ↑T1..T5
```

---

## T1 — Imports y constantes de color

**Depende de:** (ninguna)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Añadir import `import { SITE } from "./constants";` al tope del archivo (junto al import existente de `formatDateCL`).
- [ ] Definir el objeto constante `C` con los tokens de color de marca:
  ```ts
  const C = {
    headerBg:     "#112236",
    sectionBg:    "#4A7BB5",
    rowAlt:       "#eef4fb",
    rowBase:      "#ffffff",
    pageBg:       "#f8f7f6",
    text:         "#211f1c",
    textMuted:    "#6e6963",
    border:       "#e1dedb",
    onDark:       "#ffffff",
    taglineOnDark:"#a9c2e0",
  } as const;
  ```
- [ ] Verificar que `escapeHtml(s)` permanece sin cambios (copiar/preservar la función existente exactamente).

### Criterio de completado

- `C` existe y todos sus 10 tokens coinciden con los valores hex de `design.md § Decisión 1`.
- `import { SITE }` presente; `import { formatDateCL }` conservado.
- `escapeHtml` sin modificaciones.
- Mapeo AC: `email-brand-identity` → AC "Todos los valores de texto ingresados por el usuario son escapados" (escapeHtml preservado).

---

## T2 — Helpers de presentación: `brandHeader`, `corporateFooter`, `techMeta`

**Depende de:** T1 (usa `C`, `SITE`, `formatDateCL`, `escapeHtml`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Implementar `function brandHeader(): string`:
  - Tabla de una fila, `background:${C.headerBg}`, `padding:24px 32px`.
  - Celda con `<img src="${SITE.url}/logo.png" alt="LOG ATM" width="140" style="display:block;border:0;outline:none;max-width:140px;height:auto;" />`.
  - Debajo del img: texto bold `LOG ATM` en blanco (`${C.onDark}`) como wordmark de respaldo.
  - Debajo: tagline `LOGÍSTICA A TU MEDIDA` en `${C.taglineOnDark}`, letter-spacing amplio, tamaño ~11px.
  - La rama `text` de `brandHeader` no existe (es HTML puro); `wrap` lo concatena solo al HTML.

- [ ] Implementar `function corporateFooter(): string`:
  - Bloque centrado, texto `${C.textMuted}`, `font-size:12px`, `padding:20px 32px`.
  - Incluir: `SITE.address`, link a `SITE.url` con texto `logatm.com`, tagline `LOGÍSTICA A TU MEDIDA`.
  - Los valores provienen de `constants.ts`; no hardcodear strings de dirección ni URL.
  - La rama text de `corporateFooter` no existe (HTML puro); `wrap` lo concatena solo al HTML.

- [ ] Implementar `function techMeta(meta: Meta): { html: string; text: string }`:
  - HTML: mini-tabla sin banda de sección (sin encabezado `#4A7BB5`), separada por `border-top:1px solid ${C.border}`, fuente ~11px, color `${C.textMuted}`.
  - Filas: `Formulario` → `escapeHtml(meta.formType)`, `Recibido` → `formatDateCL()` (llamada sin argumento, usa la fecha actual), `IP` → `escapeHtml(meta.ip)`, `User-Agent` → `escapeHtml(meta.userAgent)`.
  - Text: cuatro líneas `Formulario: X\nRecibido: X\nIP: X\nUser-Agent: X`.
  - No usar `renderSection` para `techMeta`; usar una mini-tabla directa para no emitir banda azul (design.md § Decisión 5).

### Criterio de completado

- `brandHeader()` retorna HTML con banda `#112236`, `<img alt="LOG ATM">`, wordmark texto blanco y tagline.
- `corporateFooter()` usa `SITE.address` y `SITE.url` (sin strings hardcodeados de dirección).
- `techMeta()` emite las 4 filas técnicas sin encabezado de banda azul; aplica `escapeHtml` en todos los valores de usuario.
- Mapeo AC:
  - `email-brand-identity` → AC "banda de encabezado #112236 con logotipo y tagline", AC "texto alternativo legible con nombre de empresa", AC "pie de página corporativo con dirección/web/tagline", AC "metadatos técnicos en el pie".

---

## T3 — Refactor de `renderRows` y nuevo `renderSection`

**Depende de:** T1 (usa `C`, `escapeHtml`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Modificar `renderRows(rows: Row[]): { html: string; text: string }`:
  - Mantener el filtro de filas vacías: `rows.filter(([, v]) => v != null && String(v).trim() !== "")`.
  - Calcular el índice visible (0, 1, 2…) de cada fila después del filtrado, no antes.
  - Cada `<tr>` recibe `style="background:${idx % 2 === 0 ? C.rowBase : C.rowAlt}"`.
  - Añadir atributo `bgcolor` en el `<tr>` o `<td>` como respaldo para Outlook: `bgcolor="${idx % 2 === 0 ? C.rowBase : C.rowAlt}"`.
  - Conservar `escapeHtml()` en label y value (sin excepción).
  - Conservar `white-space:pre-wrap` en la celda de value.
  - Texto plain: líneas `label: value` separadas por `\n`.

- [ ] Crear `function renderSection(title: string, rows: Row[]): { html: string; text: string }`:
  - Llamar a `renderRows(rows)` para obtener `{ html: rowsHtml, text: rowsText }`.
  - Si `rowsHtml` está vacío (sección sin filas visibles) → retornar `{ html: "", text: "" }` (omitir también el encabezado de banda).
  - HTML de la sección: tabla con:
    - Fila encabezado: `<td colspan="2" style="background:${C.sectionBg};color:${C.onDark};font-weight:700;padding:10px 16px;">${escapeHtml(title)}</td>`.
    - Seguida de las filas de `rowsHtml`.
  - Text: `\n=== TITLE ===\n` seguido de `rowsText`.

### Criterio de completado

- `renderRows` alterna `#ffffff`/`#eef4fb` por índice visible; el índice no incluye filas filtradas.
- Filas con valor `null`, `undefined` o string vacío/espacios no aparecen en el output.
- `renderSection` omite encabezado cuando no hay filas visibles.
- Encabezado de sección usa `escapeHtml(title)`.
- Mapeo AC:
  - `email-visual-hierarchy` → AC "encabezados de sección sobre banda azul (#4A7BB5)", AC "filas alternan fondo blanco (#ffffff) y azul claro (#eef4fb)", AC "La fila de folio respeta el esquema de colores alternados".

---

## T4a — Actualizar `buildContactoEmail`

**Depende de:** T3 (usa `renderSection`), T1 (usa `C`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Dentro de `buildContactoEmail(d, meta)`, componer el `bodyBlock` con 1 sección de negocio:
  ```ts
  const secContacto = renderSection("Datos de contacto", [
    ["Nombre",    d.name],
    ["Empresa",   d.company],
    ["Email",     d.email],
    ["Teléfono",  d.phone],
    ["Servicio",  d.service],
    ["Ruta",      d.route],
    ["Mensaje",   d.message],
  ]);
  const bodyBlock = {
    html: secContacto.html,
    text: secContacto.text,
  };
  ```
- [ ] Pasar `bodyBlock` a `wrap("Nuevo contacto desde el sitio", bodyBlock, meta)`.
- [ ] Mantener sin cambios: firma pública `(d, meta)`, `subject`, `replyTo: d.email`, tipo de retorno.

### Criterio de completado

- La firma pública `buildContactoEmail` es idéntica a la preexistente.
- El email genera 1 sección "Datos de contacto" con los 7 campos (omitiendo los opcionales vacíos).
- Mapeo AC:
  - `email-visual-hierarchy` → AC "Email de Contacto presenta campos con jerarquía visual de sección aunque con menor número de grupos".
  - `email-brand-identity` → AC "diseño visualmente consistente en los tres formularios".

---

## T4b — Actualizar `buildCotizacionRapidaEmail`

**Depende de:** T3 (usa `renderSection`), T1 (usa `C`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Dentro de `buildCotizacionRapidaEmail(d, meta)`, componer el `bodyBlock` con 2 secciones:
  ```ts
  const secDetalle = renderSection("Detalle de envío", [
    ["Modalidad",    d.mode],
    ["Origen",       d.origin],
    ["Destino",      d.destination],
    ["Volumen",      d.volume],
  ]);
  const secContacto = renderSection("Contacto", [
    ["Email",           d.email],
    ["Teléfono",        d.phone],
    ["Canal preferido", d.preference],
  ]);
  const bodyBlock = {
    html: secDetalle.html + secContacto.html,
    text: secDetalle.text + secContacto.text,
  };
  ```
- [ ] Pasar `bodyBlock` a `wrap("Cotización rápida (60 seg)", bodyBlock, meta)`.
- [ ] Mantener sin cambios: firma pública `(d, meta)`, `subject`, `replyTo`, tipo de retorno.

### Criterio de completado

- La firma pública `buildCotizacionRapidaEmail` es idéntica a la preexistente.
- El email genera hasta 2 secciones; si todos los campos de una sección son vacíos, esa sección no se emite.
- Mapeo AC:
  - `email-visual-hierarchy` → AC "Cotización rápida presenta campos con la misma jerarquía visual de sección aunque con menor número de grupos".
  - `email-brand-identity` → AC "diseño visualmente consistente en los tres formularios".

---

## T4c — Actualizar `buildCotizacion4Email`

**Depende de:** T3 (usa `renderSection`), T1 (usa `C`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Normalizar `servicesStr` antes de componer la sección (preservar lógica existente):
  ```ts
  const servicesStr = Array.isArray(d.services)
    ? d.services.join(", ")
    : typeof d.services === "string"
    ? d.services
    : "";
  ```
- [ ] Componer `bodyBlock` con 3 secciones de negocio:
  ```ts
  const secDetalle = renderSection("Detalle de envío", [
    ["Folio",            meta.folio ?? null],  // primera fila; se omite si folio no existe
    ["Modalidad",        d.modality],
    ["Origen",           d.origin],
    ["Destino",          d.dest],
    ["Incoterm",         d.incoterm],
    ["Fecha estimada",   d.date],
  ]);
  const secCarga = renderSection("Información de carga", [
    ["Tipo de carga",    d.cargoType],
    ["Volumen (m³)",     d.volume != null ? String(d.volume) : ""],
    ["Peso (kg)",        d.weight != null ? String(d.weight) : ""],
    ["N° contenedores",  d.containerCount != null ? String(d.containerCount) : ""],
    ["Tipo contenedor",  d.containerType],
    ["Servicios adicionales", servicesStr],
  ]);
  const secContacto = renderSection("Contacto", [
    ["Nombre",    d.name],
    ["Empresa",   d.company],
    ["Email",     d.email],
    ["Teléfono",  d.phone],
    ["Notas",     d.notes],
  ]);
  const bodyBlock = {
    html: secDetalle.html + secCarga.html + secContacto.html,
    text: secDetalle.text + secCarga.text + secContacto.text,
  };
  ```
- [ ] Pasar `bodyBlock` a `wrap("Cotización (4 pasos)", bodyBlock, meta)`.
- [ ] Mantener sin cambios: firma pública `(d, meta)`, `subject` (con suffix `Folio`), `replyTo: d.email`, tipo de retorno.

### Criterio de completado

- La firma pública `buildCotizacion4Email` es idéntica a la preexistente.
- La fila `Folio` aparece **solo** cuando `meta.folio` existe y es la **primera fila** de "Detalle de envío".
- `volume`, `weight`, `containerCount` se convierten a string (o string vacío) antes de pasarlos como `value`.
- `servicesStr` se normaliza igual que hoy.
- Los 3 secciones se emiten; cada sección sin filas visibles se omite.
- Mapeo AC:
  - `email-visual-hierarchy` → AC "organiza los 17 campos en tres secciones: Detalle de envío, Información de carga y Contacto", AC "cada sección contiene los campos que le corresponden", AC "la fila de folio aparece respetando el esquema de colores alternados".

---

## T5 — Refactor de `wrap` a nueva firma

**Depende de:** T1, T2 (usa `brandHeader`, `corporateFooter`, `techMeta`, `C`, `SITE`)
**File:** `log-atm-web-astro/src/lib/email-templates.ts`

### Acciones

- [ ] Cambiar la firma interna de `wrap` a:
  ```ts
  function wrap(
    title: string,
    bodyBlock: { html: string; text: string },
    meta: Meta,
  ): { html: string; text: string }
  ```
- [ ] Implementar el cuerpo de `wrap`:
  - Tabla externa centrada: `<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.pageBg};font-family:Arial,sans-serif;">` con celda interna de `max-width:680px`, `margin:0 auto`.
  - En el orden exacto del design.md § Decisión 2:
    1. `brandHeader()` (HTML puro, sin rama text separada).
    2. Fila de título: `<h1>`/`<td>` con `escapeHtml(title)`, color `${C.text}`, `padding:24px 32px 16px`, `font-size:22px`.
    3. `bodyBlock.html`.
    4. `corporateFooter()` (HTML puro).
    5. `techMeta(meta).html`.
  - Rama text: `title.toUpperCase() + \n\n + bodyBlock.text + \n\n---\n + techMeta(meta).text`.

### Criterio de completado

- `wrap` es una función interna (no exportada); la firma cambió de `(title, rowsBlock, meta)` a `(title, bodyBlock, meta)`.
- El HTML resultante ensambla: header → título → cuerpo → footer corporativo → metadatos técnicos.
- La tabla externa usa `max-width:680px` y está centrada (`margin:0 auto`).
- `escapeHtml(title)` se aplica al título del email.
- Mapeo AC:
  - `email-brand-identity` → AC "banda de encabezado en el email enviado al destinatario", AC "diseño visualmente consistente en los tres formularios".
  - `email-brand-identity` → AC "pie de página corporativo con dirección/web/tagline" y AC "metadatos técnicos en el pie".

---

## T6 — Verificación de invariantes y build

**Depende de:** T1, T2, T3, T4a, T4b, T4c, T5
**File:** `log-atm-web-astro/src/lib/email-templates.ts` (solo lectura/grep), terminal

### Checklist de invariantes (revisión de código)

- [ ] **escapeHtml sin regresión**: buscar en el archivo todo lugar donde se interpolen labels o values de usuario y confirmar que todos pasan por `escapeHtml()`. Grep: `String(v)` sin `escapeHtml` dentro de `renderRows` debe ser cero ocurrencias. Los títulos de sección y de email también se escapan.
- [ ] **Folio preservado**: en `buildCotizacion4Email`, la fila `["Folio", meta.folio ?? null]` es la primera de `secDetalle`. Confirmar que cuando `meta.folio` es `undefined` la regla de omisión la filtra correctamente.
- [ ] **Footer técnico en los 3 emails**: confirmar que `wrap` llama a `techMeta(meta)` y que los 3 `build*` delegan en `wrap`. Las 4 filas técnicas (Formulario, Recibido, IP, User-Agent) aparecen en todos.
- [ ] **Header de marca en los 3 emails**: confirmar que `wrap` llama a `brandHeader()` y que la banda `#112236` + logo + tagline es idéntica en los 3.
- [ ] **Firmas públicas intactas**: las 3 funciones `export function build*` mantienen exactamente los mismos parámetros y tipo de retorno `{ subject, html, text, replyTo }` que tenían antes del cambio. Comparar con la exploración o el código previo al merge.
- [ ] **Ningún campo no vacío omitido**: confirmar que la regla de omisión solo excluye valores `null`, `undefined` o string vacío/espacios, y no excluye valores válidos como `0`, `false` o cadenas con contenido.

### Checklist de verificación visual (sin test runner)

- [ ] **Build TypeScript exitoso**: ejecutar `npm run build` en el directorio `log-atm-web-astro/`. Cero errores de tipo. Esto valida que los endpoints que consumen las firmas `build*` no se rompieron.
- [ ] **Preview HTML — buildContactoEmail**: llamar manualmente a `buildContactoEmail` con datos de ejemplo (incluyendo al menos un campo con `<script>`) y abrir el `.html` generado en navegador. Verificar: banda azul marino, 1 sección "Datos de contacto", alternancia de filas, footer, metadatos técnicos.
- [ ] **Preview HTML — buildCotizacionRapidaEmail**: llamar con datos de ejemplo (algunos campos opcionales vacíos). Verificar: 2 secciones (o 1 si todos los campos de una sección son vacíos), alternancia de filas, header/footer idénticos al anterior.
- [ ] **Preview HTML — buildCotizacion4Email**: llamar con datos de ejemplo que incluyan `meta.folio`. Verificar: 3 secciones, folio como primera fila de "Detalle de envío" con color alternado correcto, todos los campos no vacíos presentes.
- [ ] **Fallback de imágenes bloqueadas**: en el preview del navegador, deshabilitar imágenes (o usar una URL inexistente para el logo). Verificar que el `alt="LOG ATM"` y el wordmark de texto son legibles y la estructura de la banda `#112236` se mantiene.

### Criterio de completado

- `npm run build` termina con exit code 0, sin errores de TypeScript.
- Los 5 checkboxes de invariantes marcados como verificados.
- Los 5 checkboxes de verificación visual marcados (incluyendo fallback de imagen).
- Mapeo AC (verificación final):
  - `email-brand-identity` → todos los 6 AC marcados.
  - `email-visual-hierarchy` → todos los 6 AC marcados.

---

## Resumen de dependencias

| Tarea | Depende de | Produce |
|-------|-----------|---------|
| T1 | — | `C`, imports actualizados, `escapeHtml` intacto |
| T2 | T1 | `brandHeader()`, `corporateFooter()`, `techMeta()` |
| T3 | T1 | `renderRows` (modificado), `renderSection` (nuevo) |
| T4a | T3 | `buildContactoEmail` (interno actualizado) |
| T4b | T3 | `buildCotizacionRapidaEmail` (interno actualizado) |
| T4c | T3 | `buildCotizacion4Email` (interno actualizado) |
| T5 | T1, T2 | `wrap` (firma interna modificada) |
| T6 | T1–T5 | Build verificado + checklist de invariantes |

> T4a, T4b, T4c son independientes entre sí y pueden ejecutarse en paralelo una vez T3 esté completo.
> T5 puede ejecutarse en paralelo con T4a/T4b/T4c si T1 y T2 están completos.

---

## Notas para sdd-apply

- **No hay test runner**: los criterios de verificación son compilación TS + inspección visual del HTML generado + checklist de invariantes (T6).
- **Archivo único**: solo `log-atm-web-astro/src/lib/email-templates.ts`. No modificar `mailer.ts`, endpoints, ni ningún otro archivo.
- **`constants.ts`**: leer el archivo antes de usar `SITE.url` / `SITE.address` / `SITE.name` para confirmar los nombres exactos de los campos exportados.
- **`formatDateCL()`**: importada desde `./mailer`; confirmar su firma actual (¿acepta argumento? ¿retorna string?). Si no acepta argumentos, llamar sin ellos en `techMeta`.
- **Folio en subject**: el subject con el suffix de folio en `buildCotizacion4Email` ya existe y no cambia; no tocar esa línea.
- **Prueba de XSS**: incluir `"<script>alert(1)</script>"` como valor de al menos un campo al generar el preview de cada email; verificar que se renderiza como texto literal.
