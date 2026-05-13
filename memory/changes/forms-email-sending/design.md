---
type: design
change_name: "forms-email-sending"
---

# Diseño técnico — forms-email-sending

## Decisión 1 — Astro output + adapter (REVISADA → Cloudflare)
Decisión original: `@astrojs/node` standalone. **Revisada**: el deploy es Cloudflare Pages, así que se usa `@astrojs/cloudflare` con `platformProxy: { enabled: true }` para que `astro dev` lea `.dev.vars` localmente vía miniflare. `output: 'static'` se mantiene; las API routes con `prerender = false` corren como Cloudflare Functions (workers).

## Decisión 2 — Cliente SMTP en Workers (REVISADA)
`nodemailer` no funciona en Cloudflare Workers (depende de `net`/`tls`/`dns`). Reemplazado por **`worker-mailer`** (v1.2.1, activo, 202⭐, mantenido 2025) que usa `cloudflare:sockets` para abrir conexión TCP a `mail.logatm.com:465` (SSL implícito). Mantiene SMTP de ioh → SPF/DKIM intactos.

**Trade-off**: cada request abre/cierra una conexión SMTP (no hay pooling cross-request en Workers). El costo es aceptable para volumen bajo de formularios.

## Decisión 3 — Lectura de env (REVISADA)
Astro 6 eliminó `Astro.locals.runtime.env`. Se usa `import { env } from "cloudflare:workers"` a nivel de módulo en `mailer.ts`. En prod lee bindings del worker; en dev con platformProxy lee `.dev.vars`.

## Decisión 11 — `nodejs_compat` flag
`worker-mailer` usa `Buffer` internamente, lo cual requiere `compatibility_flags = ["nodejs_compat"]` en `wrangler.toml`. Configurado.

## Decisión 4 — IP del cliente
Orden: `cf-connecting-ip` → `x-forwarded-for` (primer valor) → `x-real-ip` → `request` URL host. Si ninguno → "desconocida".

## Decisión 5 — Plantillas
Una función por form, retorna `{ subject, html, text, replyTo }`. El HTML es una tabla simple con `<table style="...">` inline (sin CSS externo, compat email clients).

## Decisión 6 — Honeypot
Input oculto via inline style + atributos. NO requiere CSS extra. El nombre `website` se elige por ser plausible para bots.

```html
<input type="text" name="website" tabindex="-1" autocomplete="off"
       style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"
       aria-hidden="true" />
```

## Decisión 7 — Wiring cotizar.astro
`cotizar.astro` no tiene `<form>` HTML. En `showSuccess()`, antes de mostrar el éxito:
```js
const payload = { ...state, website: form.querySelector('[name=website]')?.value ?? '' };
const r = await fetch('/api/cotizacion', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
if (!r.ok) { showError(...); return; }
showSuccess();
```

## Decisión 8 — CTASection rama Email
Conservar la lógica WhatsApp (`wa.me`). En la rama `channel === 'email'`, reemplazar `window.location.href = mailto:` por `fetch('/api/cotizacion-rapida', ...)` y mostrar estado en `#qq-status`.

## Decisión 9 — contacto.astro
El script actual solo hace `e.preventDefault()` + cambia label. Reemplazarlo por un handler que hace fetch al endpoint, gestiona estados (`enviando`/`éxito`/`error`) en un `<p aria-live="polite">` adyacente al botón, deshabilita el botón mientras envía, resetea el form al success.

## Decisión 10 — Deploy fuera de scope
El Dockerfile actual sirve `dist/` con nginx estático. Con adapter Node, la build produce `dist/client/` + `dist/server/entry.mjs`. Sirve solo local con `astro dev` o `node dist/server/entry.mjs`. El deploy productivo requiere otro cambio (proxy reverso nginx → Node, o reemplazar la imagen).
