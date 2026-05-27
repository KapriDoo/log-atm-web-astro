# Exploration — redesign-email-templates-v2

> Modo: normal (full path)
> Fase: sdd-explore
> Fecha: 2026-05-26
> Worktree base: main

---

## 1. Estado actual de las plantillas

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts`]

El archivo `email-templates.ts` expone **3 funciones exportadas**, sin clases ni componentes. La estructura interna se compone de dos helpers internos y tres builders públicos:

### Helpers internos

| Función | Líneas | Rol |
|---------|--------|-----|
| `escapeHtml(s)` | L5–11 | Sanitiza strings antes de insertar en HTML |
| `renderRows(rows)` | L14–29 | Renderiza un array `[label, value]` como tabla HTML y texto plano |
| `wrap(title, rowsBlock, meta)` | L33–55 | Envuelve el bloque de filas en un contenedor HTML completo + bloque de metadatos técnicos |

### Builders exportados

#### `buildContactoEmail(d, meta)` — L58–83
Plantilla para el formulario de contacto (`POST /api/contacto`).

**Parámetros de datos (`d`):**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| `name` | `string` | Sí |
| `company` | `string \| undefined` | No |
| `email` | `string` | Sí |
| `phone` | `string \| undefined` | No |
| `service` | `string \| undefined` | No |
| `route` | `string \| undefined` | No |
| `message` | `string \| undefined` | No |

**Retorna:** `{ subject, html, text, replyTo: d.email }`
**Asunto patrón:** `[Web · Contacto] {name} — {service || "sin servicio"}`

---

#### `buildCotizacionRapidaEmail(d, meta)` — L86–111
Plantilla para el widget de cotización rápida de 60 segundos (`POST /api/cotizacion-rapida`).

**Parámetros de datos (`d`):**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| `mode` | `string \| undefined` | No |
| `origin` | `string \| undefined` | No |
| `destination` | `string \| undefined` | No |
| `volume` | `string \| undefined` | No |
| `email` | `string \| undefined` | No |
| `phone` | `string \| undefined` | No |
| `preference` | `string \| undefined` | No |

**Retorna:** `{ subject, html, text, replyTo?: d.email }`
**Asunto patrón:** `[Web · Cotización rápida] {mode || "—"} · {origin || "—"} → {destination || "—"}`

---

#### `buildCotizacion4Email(d, meta)` — L114–164
Plantilla para el wizard de 4 pasos (`POST /api/cotizacion`).

**Parámetros de datos (`d`):**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| `name` | `string` | Sí |
| `company` | `string \| undefined` | No |
| `email` | `string` | Sí |
| `phone` | `string \| undefined` | No |
| `notes` | `string \| undefined` | No |
| `modality` | `string \| undefined` | No |
| `origin` | `string \| undefined` | No |
| `dest` | `string \| undefined` | No |
| `incoterm` | `string \| undefined` | No |
| `date` | `string \| undefined` | No |
| `cargoType` | `string \| undefined` | No |
| `volume` | `string \| number \| undefined` | No |
| `weight` | `string \| number \| undefined` | No |
| `containerCount` | `string \| number \| undefined` | No |
| `containerType` | `string \| undefined` | No |
| `services` | `string[] \| string \| undefined` | No |

**Retorna:** `{ subject, html, text, replyTo: d.email }`
**Asunto patrón:** `[Web · Cotización 4 pasos] {name} — {modality || "—"} · {origin || "—"} → {dest || "—"}[ — Folio {folio}]`

---

### Tipo `Meta` (compartido por los 3 builders)

```ts
type Meta = { ip: string; userAgent: string; formType: string; folio?: string }
```

Solo `buildCotizacion4Email` usa `meta.folio` (los otros dos no lo reciben desde el endpoint aunque el tipo lo admite).

---

### HTML actual generado por `wrap()`

El wrapper actual produce un HTML muy básico:
- Fondo gris neutro `#f3f4f6`, contenedor blanco `#ffffff`
- Sin logo ni identidad de marca
- Un `<h2>` con el título del formulario
- Tabla con bordes grises uniformes en todas las filas (datos + metadatos mezclados)
- Sin CTAs, sin jerarquía visual de información
- Fuente: `Inter, system-ui, sans-serif`
- Max-width: 680px en el contenedor; tablas hasta 640px

[fuente: código `log-atm-web-astro/src/lib/email-templates.ts` L46–55]

---

## 2. Lógica de envío y endpoints

[fuente: código `log-atm-web-astro/src/pages/api/`]

### Infraestructura SMTP

[fuente: código `log-atm-web-astro/src/lib/mailer.ts`]

- **Transport**: `worker-mailer` (Worker-native SMTP, no Resend)
- **From**: `"Formulario Web" <web@logatm.com>` (valor de `SMTP_USER`)
- **To**: env var `MAIL_TO` (actualmente `contacto@logatm.com` en `wrangler.toml`)
- **Reply-To**: email del usuario cuando presente
- **Entorno**: Cloudflare Workers; vars en `wrangler.toml` y secrets en dashboard CF
- **Credenciales SMTP**: host `mail.logatm.com`, puerto 465, secure=true

### Mapa de endpoints → plantillas

| Endpoint | Archivo | Builder | Folio |
|----------|---------|---------|-------|
| `POST /api/contacto` | `src/pages/api/contacto.ts` | `buildContactoEmail` | No |
| `POST /api/cotizacion-rapida` | `src/pages/api/cotizacion-rapida.ts` | `buildCotizacionRapidaEmail` | No |
| `POST /api/cotizacion` | `src/pages/api/cotizacion.ts` | `buildCotizacion4Email` | Sí — `generateFolio()` de `src/lib/folio.ts` |

### Contrato de datos por endpoint

**`/api/contacto`** recibe (post-`clean()`):
`name`, `company`, `email`, `phone`, `service`, `route`, `message`

**`/api/cotizacion-rapida`** recibe:
`mode`, `origin`, `destination`, `volume`, `email`, `phone`, `preference`

**`/api/cotizacion`** recibe:
`name`, `company`, `email`, `phone`, `notes`, `modality`, `origin`, `dest`, `incoterm`, `date`, `cargoType`, `volume`, `weight`, `containerCount`, `containerType`, `services[]`

La función `sendMail()` en `mailer.ts` recibe `{ subject, html, text, replyTo? }` — **no sabe nada de los datos del formulario**, solo del email ya construido.

---

## 3. Referencia de diseño 1:1

[fuente: código `/home/kapridoo/projects/log-atm-finally/project/correo-rediseno.html`]

El archivo de referencia existe y es un HTML válido que simula una bandeja de entrada con el correo rediseñado dentro. La **sección email-safe** (el correo real, no el chrome de la página) va de la línea 52 a la 215.

### Estructura del email de referencia

```
OUTER: table[role=presentation] — background:#f8f7f6, fondo general
  WRAPPER: table[max-width:600px] — background:#ffffff, border-radius:20px, shadow
    ├── HEADER         (fondo gradiente #112236→#1c3554)
    │     ├── Logo: div blanco 40×40px con "A" en color brand + "LOG ATM" + tagline monospace
    │     └── Badge: pill verde "● Nuevo lead" (fondo rgba verde, borde verde)
    ├── HERO           (padding 32px 32px 8px)
    │     ├── Label monospace uppercase: "━━━ Solicitud de cotización" (verde #339965)
    │     ├── h1: "{nombre} · <span color:#4A7BB5>{empresa}</span>"
    │     └── p: texto descriptivo del pedido
    ├── ROUTE VISUAL   (padding 24px 32px 8px)
    │     └── tabla en caja azul claro #eef4fb: Origen → (flecha azul) → Destino
    ├── KEY DATA GRID  (padding 24px 32px 8px)
    │     └── tabla estilo lista: Nombre / Empresa / Email (link mailto) / Teléfono (link tel) / Servicio (pill azul)
    ├── MESSAGE        (padding 8px 32px 24px)
    │     └── cita con borde izq azul #4A7BB5, fondo #f8f7f6, border-radius
    ├── CTA BUTTONS    (padding 8px 32px 28px)
    │     ├── Botón azul 50%: "Responder por email →" (mailto pre-cargado)
    │     ├── Botón verde 50%: "WhatsApp →" (wa.me link)
    │     └── p monospace: "SLA cliente · responder antes de 24 h hábiles"
    ├── METADATA BOX   (padding 0 32px 24px)
    │     └── caja gris #f8f7f6 border #e1dedb: Folio / Formulario / Recibido / IP / User-Agent
    └── FOOTER         (fondo #0a1624)
          ├── Izq: "LOG ATM" bold + "Logística a tu medida" monospace
          ├── Der: dirección física
          └── Aviso automático centrado
```

### Paleta y tipografía de referencia

| Token | Valor |
|-------|-------|
| Header fondo | `#112236` → `#1c3554` (gradiente 135°) |
| Footer fondo | `#0a1624` |
| Brand azul | `#4A7BB5` |
| Texto principal | `#211f1c` |
| Texto secundario | `#544f4a` |
| Texto muted | `#6e6963`, `#898580` |
| Separadores | `#e1dedb` |
| Fondo cuerpo | `#f8f7f6` |
| Caja ruta | `#eef4fb` |
| Badge verde | `rgba(62,185,120,.18)` + borde `rgba(135,211,176,.6)` |
| Fuente display | `'Outfit', Arial, sans-serif` (900/800/700) |
| Fuente cuerpo | `'Inter', Arial, sans-serif` |
| Fuente mono | `'JetBrains Mono', 'SF Mono', monospace` |
| Max-width | 600px |
| Border-radius contenedor | 20px |
| Shadow | `0 4px 16px 0 rgba(74,123,181,.12)` |

### Compatibilidad declarada por el autor

El archivo `correo-rediseno.html` L30 declara explícitamente: _"Email-safe (tablas + estilos inline) y compatible con Gmail/Outlook/Apple Mail"_. La sección de "Qué cambia" (L222–237) confirma:
- 100% tablas + estilos inline
- Tipografías con fallbacks web-safe (Outfit/Inter/JetBrains Mono → Arial/system)
- Botón WhatsApp pre-carga texto por parámetro `?text=`

### Delta observable vs. template actual (comparación correo-original.html)

[fuente: código `/home/kapridoo/projects/log-atm-finally/project/correo-original.html`]

| Aspecto | Template actual | Rediseño |
|---------|----------------|---------|
| Identidad de marca | Ninguna (gris genérico) | Header azul corporativo, logo textual, badge |
| Jerarquía | Tabla plana | Hero nombre+empresa → ruta visual → datos → mensaje → CTAs → metadata |
| CTAs | Ninguno | Responder por email + WhatsApp (pre-cargados) |
| Metadatos | Mezclados con datos | Colapsados al final en caja separada |
| Fuente | Inter only | Outfit (display) + Inter (cuerpo) + JetBrains Mono (labels/código) |
| Max-width | 680px | 600px |
| Ruta | Campo de texto plano | Widget visual con caja azul Origen → Destino |
| SLA | Sin mención | "SLA cliente · responder antes de 24 h hábiles" |

---

## 4. Mapeo referencia → 3 plantillas

[fuente: código `/home/kapridoo/projects/log-atm-finally/project/correo-rediseno.html` L233–237]

El propio HTML de referencia documenta en su nota final (L234–237):

> _"esta misma estructura aplica para los 3 tipos de correo del repo — `buildContactoEmail`, `buildCotizacionRapidaEmail` (60 seg desde Home), y `buildCotizacion4Email` (wizard de 4 pasos en /cotizar). Cada una con su pill de color (azul · verde · ámbar) y campos respectivos."_

Por tanto, el diseño de referencia **aplica a las 3 plantillas** con variaciones menores:

### Diferenciación por formulario

| Plantilla | Pill/Badge color | Sección ROUTE | Sección MESSAGE | Sección DATA GRID | Folio |
|-----------|-----------------|---------------|-----------------|-------------------|-------|
| `buildContactoEmail` | Azul (contacto) | Usa campo `route` (texto libre) | Usa campo `message` | name, company, email, phone, service | No |
| `buildCotizacionRapidaEmail` | Verde (60 seg/lead rápido) | Usa `origin` + `destination` | — (no hay mensaje) | mode, origin, destination, volume, email, phone, preference | No |
| `buildCotizacion4Email` | Ámbar (cotización completa) | Usa `origin` + `dest` | Usa campo `notes` | name, company, email, phone + modality, incoterm, date, cargoType, volume, weight, containerCount, containerType, services | Sí |

### Huecos dinámicos en el HTML de referencia (para cada plantilla)

**HERO section:**
- `h1`: `{d.name} · <span color:brand>{d.company}</span>` (contacto/cotiz4) o `{d.mode}` (cotiz-rapida)
- `p` descripción: texto libre generado con interpolación de campos clave

**ROUTE VISUAL section:**
- `Origen`: `{d.origin}` (todos)
- `Destino`: `{d.destination}` o `{d.dest}` (contacto usa `d.route` que es texto libre, no par origen/destino — requiere adaptación)
- Flecha central: estática `→`

**KEY DATA GRID section:**
- Filas condicionales: omitir si valor null/empty (ya implementado en `renderRows`)
- Email: enlace `mailto:` con el valor de `d.email`
- Teléfono: enlace `tel:` con el valor de `d.phone`
- Servicio/Modalidad: pill con background azul

**MESSAGE/NOTES section:**
- Solo renderizar si el campo existe y no es vacío
- Blockquote con borde izquierdo azul

**CTA BUTTONS section:**
- "Responder por email": `mailto:{d.email}?subject=Re:...`
- "WhatsApp": `https://wa.me/{d.phone|cleaned}?text=...`
- Condición: si no hay email, omitir botón email; si no hay teléfono, omitir botón WhatsApp

**METADATA BOX section:**
- Folio: `{meta.folio}` (solo si existe; solo en buildCotizacion4Email)
- Formulario: `{meta.formType}`
- Recibido: `{formatDateCL()}`
- IP: `{meta.ip}`
- User-Agent: `{meta.userAgent}`

**FOOTER:**
- Estático (logo textual, dirección, aviso automático)

---

## 5. Conocimiento previo en specs y ADRs

[fuente: spec `[[forms-email/spec]]`]

La capability-spec `forms-email/spec.md` (status: in-progress, no superseded) establece:
- Los 3 endpoints y sus contratos de validación y respuesta deben preservarse intactos
- Footer técnico SIEMPRE: IP, UA, fecha CL, tipo de formulario
- Reply-To = email del usuario si está presente y válido
- Anti-abuse honeypot `name="website"` debe mantenerse (es responsabilidad del endpoint, no del template)

[fuente: spec `[[forms-email/quote-email-delivery]]` (status: completed)]

- El email DEBE incluir datos relevantes: modalidad, origen, destino, datos de carga, contacto
- Si el envío falla → endpoint retorna error, no éxito silencioso

[fuente: spec `[[forms-email/quote-folio-server-generated]]` (status: completed)]

- Folio generado server-side por `generateFolio()` en `src/lib/folio.ts`
- Folio incluido en `meta.folio` para `buildCotizacion4Email`
- Folio aparece en asunto del email y en cuerpo (metadata box)

[fuente: ADR 0004 `memory/adrs/0004-folio-server-generated.md`]

- Patrón `LA-{base36(ts)}{8hex-UUID}` aceptado y estable
- Folio es efímero (sin BD); vive en email + respuesta HTTP
- `buildContactoEmail` y `buildCotizacionRapidaEmail` no reciben folio por diseño actual (ADR no lo prohíbe para el futuro, pero no es un requisito presente)

---

## 6. Consideraciones de email HTML

### Compatibilidad con clientes

El diseño de referencia usa exclusivamente:
- `<table role="presentation">` para layout
- Estilos 100% inline
- Sin `flexbox`, sin `grid`, sin CSS externo

Esto es correcto para:
- **Gmail** (web y app): soporta tablas e inline CSS; bloquea `<style>` en `<head>` para la mayoría de clientes Gmail
- **Outlook** (Win)**: el mayor problema es el modelo de caja (usa Word rendering engine) — las tablas son la solución correcta; `border-radius`, `box-shadow` y `overflow:hidden` en tablas no se respetan en Outlook Win. El diseño usa estas propiedades solo en el wrapper externo.
- **Apple Mail**: soporte completo de CSS moderno, pero tablas son más seguras cross-client

**Riesgo identificado [pre-adr]:** `border-radius:20px` y `box-shadow` en el `<table>` contenedor externo no se renderizan en Outlook Win/Classic. El efecto visual degrada gracefully (tabla sin redondear, sin sombra) pero el contenido es legible.

**Riesgo identificado [pre-adr]:** `overflow:hidden` en `<table>` no funciona en Outlook. El header con gradiente puede verse sin clip. Impacto bajo — solo afecta las esquinas superiores del header.

### CSS inline vs. `<style>`

La arquitectura actual de `renderRows()` + `wrap()` usa **CSS 100% inline**. El rediseño debe mantener esta estrategia. No existe preprocesador de email (no hay MJML, no hay juice). El HTML se construye con template literals TypeScript directamente.

### Logo y assets

[fuente: código `log-atm-web-astro/public/`]

El proyecto tiene en `public/`:
- `logo.svg` — SVG del logo completo
- `logo.png` — PNG del logo
- `logo-white.svg` — Logo en blanco (útil para header oscuro)

**El rediseño de referencia NO usa imágenes** — usa un div textual con "A" como proxy del logo. Esta es la opción más segura para email:
- **URL pública**: funciona si la imagen está en un CDN accesible (ej. `https://logatm.com/logo.png`), pero puede fallar en clientes con bloqueo de imágenes externas y en previsualizaciones sin internet
- **Base64 inline**: aumenta dramáticamente el tamaño del email; Gmail en particular puede clipear el email si supera ~100KB
- **Logo textual (como en referencia)**: robusto, sin dependencias externas, compatible universal

**Recomendación de assets:** mantener el enfoque textual del diseño de referencia (iniciales "A" + "LOG ATM" en tipografía) para máxima compatibilidad. Se puede añadir `alt` en el `<img>` si en el futuro se usa imagen.

### Dark mode

El diseño de referencia no incluye media query `@media (prefers-color-scheme: dark)`. Ignorarlo es aceptable: los fondos del header (#112236) y footer (#0a1624) son oscuros nativamente, y el cuerpo blanco con texto #211f1c es legible en modo claro. En clientes con forced dark mode (Apple Mail), los colores pueden invertirse parcialmente, pero es un caso edge no crítico para este proyecto.

### Ancho máximo

La referencia usa `max-width:600px`. El template actual usa 680px. La referencia es más estándar para email (600px es el consensus de la industria).

### Tipografías web en email

Outlook no soporta `@font-face`. La referencia usa stacks con fallbacks seguros:
- `'Outfit', Arial, sans-serif` → Outlook renderiza Arial
- `'Inter', Arial, sans-serif` → Outlook renderiza Arial
- `'JetBrains Mono', 'SF Mono', monospace` → Outlook renderiza Courier New

El efecto visual degrada aceptablemente.

---

## 7. Approaches para el rediseño 1:1

### Approach A — Reescritura directa de template literals en email-templates.ts

**Descripción:** Reescribir `wrap()`, `renderRows()` y los 3 builders directamente en TypeScript, adaptando el HTML de referencia con interpolaciones de las variables dinámicas. Mantener la misma firma de funciones. Posiblemente crear helpers especializados para secciones repetidas (header, footer, route-visual).

**Pros:**
- Mínimo overhead: no cambia la arquitectura del módulo ni sus exports
- Todos los consumers (`/api/contacto`, `/api/cotizacion-rapida`, `/api/cotizacion`) siguen funcionando sin modificación
- Cero nuevas dependencias
- Consistente con el patrón actual (template literals TS)
- Más fácil de versionar y revisar en diff

**Contras:**
- Los template literals con HTML complejo se vuelven verbosos (el HTML de referencia tiene ~160 líneas por email)
- Sin separación visual clara entre "estructura HTML" y "lógica de datos"
- Difícil de previsualizar sin renderizar

**Esfuerzo:** M (1–2 días). El HTML de referencia ya está probado; el trabajo es adaptar los campos dinámicos y crear variantes por plantilla.

---

### Approach B — Extraer secciones a funciones helper

**Descripción:** Mantener los builders en `email-templates.ts` pero extraer secciones del HTML a funciones helper internas (`buildHeader()`, `buildRouteSection()`, `buildDataGrid()`, `buildCTAs()`, `buildFooter()`). Cada builder llama a los helpers con sus parámetros específicos.

**Pros:**
- Código más mantenible y testeable por sección
- Evita repetición del header/footer en los 3 builders (DRY)
- Misma interfaz externa, sin cambios en consumers

**Contras:**
- Más funciones internas para mantener
- Los helpers de sección siguen siendo strings HTML inline; misma legibilidad que A

**Esfuerzo:** M+ (1–2.5 días). Requiere diseñar la API de cada helper además de escribir el HTML.

---

### Approach C — Sistema de componentes de email (MJML o Maizzle)

**Descripción:** Introducir MJML o Maizzle como sistema de plantillas de email, compilar los templates en build time a HTML compatible, y usar el output como string en las funciones TypeScript.

**Pros:**
- Abstracción de compatibilidad email (MJML maneja Outlook automáticamente)
- Templates más legibles

**Contras:**
- Nueva dependencia significativa (MJML o Maizzle)
- Requiere paso de compilación adicional; integrar con build de Astro/Cloudflare Workers
- El HTML de referencia ya está probado y es email-safe — MJML no añade valor sobre lo ya resuelto
- Over-engineering (YAGNI): el proyecto tiene 3 templates que no cambian frecuentemente
- Cloudflare Workers tiene limitaciones de filesystem en runtime; el HTML compilado debe inlinearse

**Esfuerzo:** L (3–5 días incluyendo setup, aprendizaje y pruebas).

---

### Approach D — Archivos .html separados con placeholder markers

**Descripción:** Crear archivos `.html` en `src/lib/email-templates/` con el HTML de referencia y markers `{{NOMBRE}}`, `{{EMPRESA}}`, etc. Al build time o en runtime, cargar el string y reemplazar los markers.

**Pros:**
- Los archivos HTML son más fáciles de editar visualmente

**Contras:**
- Cloudflare Workers no puede leer archivos del filesystem en runtime (sin Durable Objects/KV)
- Requeriría inlinar los archivos en el bundle o pre-compilarlos — misma complejidad que A/B sin beneficio
- El escaping de HTML se complica (deben aplicarse `escapeHtml` antes de la sustitución)
- Introduce un sistema de templating adhoc con superficie de bugs

**Esfuerzo:** M–L (más riesgo técnico).

---

## 8. Recomendación

**Approach B — Extraer secciones a funciones helper internas** es la opción óptima.

**Justificación:**
1. **Sin cambios en consumers**: las 3 firmas exportadas (`buildContactoEmail`, `buildCotizacionRapidaEmail`, `buildCotizacion4Email`) permanecen idénticas; los 3 endpoints no requieren modificación.
2. **DRY obligatorio**: header, footer, route-visual y CTA-buttons son idénticos en estructura para las 3 plantillas; solo cambian los valores dinámicos. Extraerlos a helpers evita 3× duplicación de ~80 líneas de HTML.
3. **KISS sobre Approach C**: no introduce dependencias ni pasos de compilación. El HTML de referencia ya es email-safe.
4. **El helper `renderRows()` actual se descarta**: el nuevo diseño tiene una tabla de datos con estilo completamente diferente (separadores tipo lista, no bordes en caja). El helper se reemplaza o specializa.
5. **Preserva todos los contratos documentados** en specs `[[forms-email/spec]]`, `[[forms-email/quote-email-delivery]]`, `[[forms-email/quote-folio-server-generated]]` y ADR-0004.

### Estructura propuesta del módulo refactorizado

```
email-templates.ts
  // Helpers internos de secciones
  escapeHtml(s)                     // mantener
  buildEmailHeader()                // nuevo — logo + badge
  buildHeroSection(title, subtitle) // nuevo
  buildRouteSection(origin, dest)   // nuevo — caja azul visual
  buildDataGrid(rows)               // nuevo — reemplaza renderRows (estilo lista)
  buildMessageBlock(message)        // nuevo — blockquote con borde izq
  buildCTAButtons(email, phone)     // nuevo — botones email + WhatsApp
  buildMetadataBox(meta, folio?)    // nuevo — caja gris colapsada
  buildEmailFooter()                // nuevo — footer oscuro
  buildEmailWrapper(sections)       // nuevo — reemplaza wrap()

  // Exports públicos (sin cambio de firma)
  buildContactoEmail(d, meta)       // refactorizado — usa helpers
  buildCotizacionRapidaEmail(d, meta) // refactorizado
  buildCotizacion4Email(d, meta)    // refactorizado
```

### Riesgos residuales

1. **Outlook Win**: `border-radius` y `box-shadow` en el wrapper no se renderizan. Impacto: visual degradado (tabla sin redondear), contenido íntegro. Aceptable.
2. **Outlook Win**: `overflow:hidden` en tablas ignorado. Header con gradiente no se clipa en esquinas. Aceptable.
3. **WhatsApp CTA**: el número de teléfono debe limpiarse de espacios y guiones antes de construir el link `wa.me`. Requiere helper `cleanPhone(phone)`.
4. **Diferencia de campos entre plantillas**: `buildContactoEmail` usa `route` (texto libre tipo "Shanghai → San Antonio") — no es un par origen/destino separado. La sección ROUTE VISUAL debe degradar graciosamente: si no hay par separado, mostrar el campo `route` como texto plano o omitir la sección.
5. **Folio en asunto**: solo `buildCotizacion4Email` tiene folio. Los otros dos no cambian su patrón de asunto.

---

## Archivos afectados

| Archivo | Rol | Acción |
|---------|-----|--------|
| `log-atm-web-astro/src/lib/email-templates.ts` (L1–165) | Plantillas de correo | **Reescritura completa** (única acción de código) |
| `log-atm-web-astro/src/pages/api/contacto.ts` | Endpoint | Sin cambios |
| `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts` | Endpoint | Sin cambios |
| `log-atm-web-astro/src/pages/api/cotizacion.ts` | Endpoint | Sin cambios |
| `log-atm-web-astro/src/lib/mailer.ts` | Transport SMTP | Sin cambios |
| `log-atm-web-astro/src/lib/folio.ts` | Generación folio | Sin cambios |
| `log-atm-web-astro/src/lib/validate.ts` | Validación inputs | Sin cambios |

**Scope del cambio: 1 archivo, 165 líneas a reescribir.**
