# Exploration — redesign-form-email-templates

> Generado: 2026-05-26 | Fase: sdd-explore | Modelo: sonnet

---

## 1. Estado actual

El sitio LOG ATM cuenta con **3 formularios** que envían email. El código de generación de HTML vive íntegramente en `src/lib/email-templates.ts` (165 líneas), apoyado por `src/lib/mailer.ts` (92 líneas, transporte SMTP con `worker-mailer`). El diseño actual es funcional pero sin identidad de marca: tabla cruda con fondo gris claro, fuente genérica, sin logo, sin color corporativo, sin jerarquía visual. El receptor ve un bloque de datos tabulares sin ningún elemento que lo identifique con LOG ATM.

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts`]
[fuente: código `log-atm-web-astro/src/lib/mailer.ts`]

---

## 2. Archivos afectados (scope del rediseño)

| Archivo | Rol |
|---------|-----|
| `log-atm-web-astro/src/lib/email-templates.ts` | **Archivo principal** — contiene las 3 funciones build* y los helpers `renderRows()` + `wrap()`. Este es el único archivo a modificar para el rediseño. |
| `log-atm-web-astro/src/lib/mailer.ts` | Transporte SMTP. **Sin cambios** — la interfaz `sendMail(env, { subject, html, text, replyTo })` ya es apropiada. |
| `log-atm-web-astro/src/pages/api/contacto.ts` | Endpoint — sin cambios en el rediseño. |
| `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts` | Endpoint — sin cambios en el rediseño. |
| `log-atm-web-astro/src/pages/api/cotizacion.ts` | Endpoint — sin cambios en el rediseño. |
| `log-atm-web-astro/src/lib/constants.ts` | Provee `SITE.url = 'https://logatm.com'` y `SITE.name = 'LOG ATM'` — útil para el header del email y el link al logo. |

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts`]
[fuente: código `log-atm-web-astro/src/lib/constants.ts`]

---

## 3. Inventario de formularios y plantillas

### 3.1 Formularios que envían email

**Todos los formularios confirman envío de email** via `sendMail()` en su bloque `try`.

| # | Endpoint | Función build* | Tipo de Formulario | Folio |
|---|----------|---------------|--------------------|-------|
| 1 | `POST /api/contacto` | `buildContactoEmail()` | Formulario de contacto general | No |
| 2 | `POST /api/cotizacion-rapida` | `buildCotizacionRapidaEmail()` | Cotización rápida (60 seg, hero/CTA) | No |
| 3 | `POST /api/cotizacion` | `buildCotizacion4Email()` | Cotización 4 pasos (wizard `/cotizar`) | Sí — generado server-side `LA-{ts}{rand}` |

[fuente: código `log-atm-web-astro/src/pages/api/contacto.ts` (l.68-70)]
[fuente: código `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts` (l.64-69)]
[fuente: código `log-atm-web-astro/src/pages/api/cotizacion.ts` (l.86-94)]

### 3.2 Plantillas HTML actuales

El código tiene **1 plantilla base `wrap()`** reutilizada por las 3 funciones, y **1 helper `renderRows()`** para la tabla de datos.

#### Estructura actual (identificada en email-templates.ts)

```
wrap(title, rowsBlock, meta)
  └── <!doctype html><html><body style="background:#f3f4f6;padding:24px;...">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
          <h2 style="...color:#1f2937;">{title}</h2>
          {renderRows(filas-de-negocio)}
          <h3 style="...color:#6b7280;">Metadatos</h3>
          {renderRows([Formulario, Recibido, IP, User-Agent])}
        </div>
      </body></html>
```

**Por qué es "soso"** (evidencia en código):
- Línea 46-53: cuerpo en gris `#f3f4f6`, sin header de marca, sin logo
- Línea 47: `<div>` plano, sin separación visual entre secciones
- Línea 48: `<h2>` en negro genérico `#1f2937`, sin ningún color de marca
- Línea 19-21: cada fila `<tr>` con fondo `#f9fafb` y borde `#e5e7eb` — tabla de datos pura
- Sin banner superior, sin firma corporativa, sin enlace al sitio, sin CTA de respuesta
- Sin tipografía de marca (usa `Inter,system-ui` pero sin estilo bold/display)
- Sin diferenciación visual entre sección principal y sección de metadatos

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` (l.19-55)]

---

## 4. Datos disponibles por plantilla

### 4.1 `buildContactoEmail(d, meta)`

**Payload de negocio** (campos del formulario):
- `name` (required), `company?`, `email` (required), `phone?`, `service?`, `route?`, `message?`

**Meta** (server-generated):
- `ip`, `userAgent`, `formType: "Contacto"`, `folio: undefined`

**Subject**: `[Web · Contacto] {name} — {service || "sin servicio"}`
**Reply-To**: `d.email`

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` (l.58-83)]
[fuente: código `log-atm-web-astro/src/pages/api/contacto.ts` (l.39-47)]

### 4.2 `buildCotizacionRapidaEmail(d, meta)`

**Payload de negocio**:
- `mode?`, `origin?`, `destination?`, `volume?`, `email?`, `phone?`, `preference?`

**Meta**: `ip`, `userAgent`, `formType: "Cotización rápida (60 seg)"`, `folio: undefined`

**Subject**: `[Web · Cotización rápida] {mode} · {origin} → {destination}`
**Reply-To**: `d.email` si existe

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` (l.86-111)]
[fuente: código `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts` (l.39-46)]

### 4.3 `buildCotizacion4Email(d, meta)`

**Payload de negocio** (todos los pasos del wizard):
- `name` (required), `company?`, `email` (required), `phone?`, `notes?`
- `modality?`, `origin?`, `dest?`, `incoterm?`, `date?`
- `cargoType?`, `volume?`, `weight?`, `containerCount?`, `containerType?`
- `services?: string[] | string` (servicios adicionales multi-select)

**Meta**: `ip`, `userAgent`, `formType: "Cotización (4 pasos)"`, `folio: "LA-{ts}{rand}"` (server-generated via `generateFolio()`)

**Subject**: `[Web · Cotización 4 pasos] {name} — {modality} · {origin} → {dest} — Folio {folio}`
**Reply-To**: `d.email`

Esta es la plantilla más rica: 17 campos de negocio + folio. Los datos se organizan en grupos lógicos: logísticos (modalidad, ruta, incoterm, fecha), de carga (tipo, volumen, peso, contenedores, servicios adicionales), y de contacto (nombre, empresa, email, teléfono, notas).

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` (l.114-164)]
[fuente: código `log-atm-web-astro/src/pages/api/cotizacion.ts` (l.50-67)]

---

## 5. Specs previas relevantes (forms-email/)

### 5.1 Specs vigentes (superseded_by: null, status != cancelled)

| Slug | Status | Relevancia para rediseño HTML |
|------|--------|-------------------------------|
| `forms-email/spec.md` | `in-progress` | Capability spec general. Define el contrato de endpoints, respuestas, comportamiento del mailer y anti-abuse. **El rediseño no altera ninguno de estos contratos.** |
| `forms-email/quote-email-delivery.md` | `completed` | Spec de entrega del email de cotización. AC verifica que el email **incluye los datos** (modalidad, origen, destino, carga, contacto). El rediseño debe preservar esos datos — constraint explícito. |
| `forms-email/quote-folio-server-generated.md` | `completed` | Folio generado por el servidor, incluido en email y en respuesta JSON. **El rediseño debe preservar el folio** en el cuerpo del email y en el subject. |
| `forms-email/wizard-modality-tap-ios.md` | `completed` | Fix iOS del wizard — no afecta templates de email. Sin relación directa. |
| `forms-email/wizard-responsive-mobile-v2.md` | `completed` | Fix de stepper mobile — no afecta templates de email. Sin relación directa. |

### 5.2 Constraints que el rediseño DEBE respetar

1. **Folio incluido en email** [fuente: spec `[[quote-folio-server-generated]]`]: La fila de Folio DEBE estar en el cuerpo del email cuando existe (cotización 4 pasos). Ya incluida en código: `...(meta.folio ? [["Folio", meta.folio] as Row] : [])`.
2. **Datos completos** [fuente: spec `[[quote-email-delivery]]`]: El email DEBE contener modalidad, origen, destino, datos de carga y datos de contacto. El rediseño solo cambia presentación, no elimina datos.
3. **Footer técnico** [fuente: spec `[[forms-email/spec]]`]: IP, UA, fecha CL, tipo de formulario — siempre presentes.
4. **Reply-To** [fuente: spec `[[forms-email/spec]]`]: Preservar `replyTo: d.email` en mailer — no se toca en email-templates.ts.
5. **Anti-abuse** [fuente: spec `[[forms-email/spec]]`]: La función `escapeHtml()` DEBE aplicarse en todos los valores renderizados. El rediseño no puede eliminarla.

[fuente: spec `[[forms-email/quote-email-delivery]]`]
[fuente: spec `[[forms-email/quote-folio-server-generated]]`]
[fuente: spec `[[forms-email/spec]]`]

---

## 6. Restricciones técnicas para email HTML moderno

### 6.1 Compatibilidad con clientes de correo

- **Gmail (web y app)**: soporta tablas + inline CSS. Elimina `<style>` externas y bloquea imágenes externas por defecto. Soporta `<table>`, `<tr>`, `<td>` con `style=""` inline. **No soporta** CSS variables, flexbox ni grid.
- **Outlook (Win)**: renderizado con Word HTML. Requiere `border-collapse:collapse` en tablas, ignora muchas propiedades CSS modernas, no soporta `border-radius` en tablas. El `<div>` wrapper con `border-radius` actual en l.47 puede fallar en Outlook — consideración importante.
- **Apple Mail / iOS Mail**: soporta mejor el CSS moderno; menos restrictivo.

**Regla de oro para email HTML**: tablas + inline CSS. El diseño actual ya usa tablas (renderRows), pero el wrapper es un `<div>`, lo cual es subóptimo para Outlook.

### 6.2 Imágenes y logo

El logo de LOG ATM existe en `public/logo.svg` y `public/logo.png`. En email HTML, las imágenes externas se bloquean por defecto en la mayoría de clientes (Gmail, Outlook). Para incluir el logo se puede:
- Referenciar `https://logatm.com/logo.png` — funciona una vez que el destinatario habilita imágenes.
- Usar SVG inline — **no compatible con Gmail** (lo stripea).
- Usar logo en texto ("LOG ATM") con estilo bold + color — funciona en todos los clientes, cero dependencias externas.

La opción más robusta para máxima compatibilidad es combinar: `<img src="https://logatm.com/logo.png">` con `alt="LOG ATM"` y un fallback de texto. El `logo.png` es el asset más compatible para email.

[fuente: código `log-atm-web-astro/public/` — archivos: `logo.png`, `logo.svg`]
[fuente: código `log-atm-web-astro/src/lib/constants.ts` (l.7 — `SITE.url = 'https://logatm.com'`)]

### 6.3 Runtime Cloudflare Workers y `worker-mailer`

El runtime es Cloudflare Workers con `worker-mailer ^1.2.1`. La función `sendMail()` acepta `{ html, text }` como strings planos. **No hay restricción** sobre el contenido del string HTML — puede ser tan complejo como se quiera siempre que sea un string válido.

No hay template engine disponible en Workers (no Handlebars, no Nunjucks). El patrón actual de template literals TypeScript (string interpolation + funciones) **es el enfoque correcto y debe mantenerse**. Introducir un helper/builder de templates no agrega valor real: la complejidad del HTML de email no lo justifica (3 plantillas simples, no dinámicas).

[fuente: código `log-atm-web-astro/src/lib/mailer.ts` (l.1-2, l.52-54)]
[fuente: código `log-atm-web-astro/astro.config.mjs` (l.68-77 — noExternal worker-mailer)]

### 6.4 `escapeHtml()` — mantener obligatoriamente

La función `escapeHtml()` (l.5-12) escapa `&`, `<`, `>`, `"`, `'`. Es la defensa principal contra XSS en el cuerpo del email. El rediseño DEBE preservar todas las llamadas a `escapeHtml()` en valores de usuario.

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` (l.5-12, l.19-25)]

---

## 7. Branding disponible para emails

[fuente: código `log-atm-web-astro/src/styles/tokens.css`]
[fuente: código `log-atm-web-astro/DESIGN.md`]
[fuente: código `log-atm-web-astro/docs/project-brief.md`]

### 7.1 Tokens de color (hex hardcoded para inline email CSS)

| Token | Hex | Uso en email |
|-------|-----|--------------|
| `primary-500` | `#4A7BB5` | Color de marca — header, acentos, labels |
| `primary-700` | `#2b4e78` | Dark variant — hover/active en botones |
| `primary-900` | `#112236` | Fondo header oscuro |
| `primary-50` | `#eef4fb` | Fondos tenues, fila alterna |
| `accent-500` | `#3EB978` | CTA principal — botón de respuesta |
| `accent-600` | `#339965` | CTA hover |
| `neutral-50` | `#f8f7f6` | Fondo de página — email background |
| `neutral-900` | `#211f1c` | Texto principal |
| `neutral-600` | `#6e6963` | Texto secundario / metadatos |
| `neutral-200` | `#e1dedb` | Bordes y divisores |
| `neutral-100` | `#efedeb` | Fondos de sección alternos |

### 7.2 Tipografía

- **Display/headings**: `'Outfit', system-ui, sans-serif` (weight 600-900) — para el título del email
- **Body**: `'Inter', system-ui, sans-serif` — para el cuerpo (ya en uso)
- Ambas fuentes web son referenciales en email (no se cargan), pero el fallback `system-ui, sans-serif` es apropiado

### 7.3 Logo

- `public/logo.png` — logo monocolor azul (ancla + grúa + "ATM LOG"), disponible en `https://logatm.com/logo.png`
- `public/logo-white.svg` — variante blanca para fondo oscuro (usar en header azul `#112236`)
- En emails: usar `<img src="https://logatm.com/logo.png" alt="LOG ATM">` como fallback primario

### 7.4 Identidad

- **Empresa**: LOG ATM
- **Tagline**: "LOGÍSTICA A TU MEDIDA"
- **CEO**: Maria Paz Rivera Zapata
- **Web**: https://logatm.com
- **Dirección**: Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile
- **Personalidad de diseño**: "Corporativo confiable con calidez humana" — azul sólido `#4A7BB5` + verde CTA `#3EB978`

---

## 8. Approaches posibles para el rediseño

### Approach A — Wrapper con header de marca + table-based layout (RECOMENDADO)

**Descripción**: Rediseñar `wrap()` para que incluya:
1. Header de banda superior con fondo `#112236`, logo `logo.png` y nombre "LOG ATM"
2. Bandas de color `#4A7BB5` delgadas como separadores de sección
3. Cuerpo de datos: tabla con headers de sección (color primario), filas con fondo alternado `#eef4fb`/`#ffffff`
4. Footer de marca: dirección, web, tagline — en gris suave
5. Sección de metadatos: colapsada visualmente en el footer (sin header de sección prominente)

Para la cotización 4 pasos (buildCotizacion4Email): crear un `wrapCotizacion()` que agrupe las filas en secciones visuales (Detalle de envío / Información de carga / Contacto) dentro del HTML usando subtablas o filas de sección.

**Pros**:
- Compatible con Gmail + Outlook (tablas + inline CSS)
- Impacto visual máximo para el receptor
- Reutiliza la estructura `renderRows()` con mínimos cambios
- Sin nuevas dependencias
- Logo incluido (con fallback graceful cuando imágenes bloqueadas)
- Alta coherencia con identidad LOG ATM

**Contras**:
- Requiere HTML más extenso (~3x del actual)
- Outlook puede ignorar `border-radius` del wrapper (aceptable)
- El logo externo no se muestra si el destinatario no habilita imágenes (mitigado con alt text)

**Esfuerzo**: M — ~3-4 horas. Modificar `email-templates.ts` únicamente. No tocar endpoints ni mailer.

### Approach B — Mejora mínima del wrapper actual

**Descripción**: Agregar solo el color de marca al `<h2>` de título (`color: #4A7BB5`), cambiar el fondo de `#f3f4f6` a blanco, y agregar una línea de firma al final con el nombre de empresa.

**Pros**: Cambio de 5 líneas, riesgo cero

**Contras**: No resuelve el problema declarado ("muy soso"). Sin logo, sin header, sin jerarquía. No justifica un cambio SDD.

**Esfuerzo**: XS — 30 min

### Approach C — Plantillas separadas por formulario (sin wrapper compartido)

**Descripción**: Eliminar `wrap()` genérico y crear HTML completamente independiente para cada uno de los 3 formularios, con personalización máxima.

**Pros**: Máxima flexibilidad por formulario

**Contras**: 3x el código a mantener. El footer técnico y el header de marca son idénticos en los 3 — viola DRY. La diferencia entre cotización rápida y contacto no justifica plantillas completamente independientes.

**Esfuerzo**: L — 6-8 horas

---

## 9. Recomendación

**Approach A** con variante para cotización 4 pasos.

**Justificación**: La estructura actual de `wrap()` + `renderRows()` es sólida y reutilizable. El rediseño solo requiere:
1. Actualizar `wrap()` para incluir header de marca (banda `#112236` + logo + "LOG ATM")  
2. Actualizar `renderRows()` para alternar fondos `#eef4fb`/`#ffffff` y añadir separador de sección como argumento opcional
3. Crear `wrapCotizacion()` (o parámetro de sección en `wrap()`) para agrupar los 17 campos de la cotización 4 pasos en 3 secciones visuales
4. Footer técnico: reducir visualmente a tamaño pequeño en gris suave

**Restricciones a honrar en la implementación**:
- Preservar `escapeHtml()` en todos los valores de usuario
- Preservar la fila de Folio cuando `meta.folio` está presente
- Preservar el footer técnico (IP, UA, fecha, tipo de form) — puede estar colapsado visualmente pero DEBE estar presente
- No modificar contratos de endpoints ni mailer
- Usar tablas para layout principal (no flexbox/grid) para compatibilidad con Outlook
- Logo: `<img src="https://logatm.com/logo.png" alt="LOG ATM" width="120">` con fallback de texto

**Scope de cambio**: solo `src/lib/email-templates.ts` — 1 archivo, sin cambios en runtime ni contratos.
