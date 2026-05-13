---
type: proposal
change_name: "forms-email-sending"
domain: "feature"
effort: "M"
status: pending-approval
created: "2026-05-12"
---

# Propuesta — forms-email-sending

## Problema

Los 3 formularios del sitio (`contacto.astro`, `CTASection.astro`, `cotizar.astro`) capturan datos pero no los envían a ningún sistema. El usuario perdió leads porque el envío nunca se implementó.

## Objetivo

Implementar envío de correos transaccionales vía nodemailer + SMTP de ioh para que cada submit llegue a `contacto@logatm.com` con `Reply-To` = email del usuario. Probado localmente en WSL2 con `astro dev`. Despliegue a producción **fuera de scope** (lo aborda otro cambio).

## Scope

### Infraestructura
- Instalar `@astrojs/node`, `nodemailer`, `@types/nodemailer`.
- `astro.config.mjs` → `output: 'hybrid'` + adapter `node({ mode: 'standalone' })`.
- Crear `log-atm-web-astro/.env.example` con las 6 claves SMTP (sin valores). `.env` real lo crea el usuario.

### Código nuevo (src/lib/)
- `mailer.ts` — `getTransport()` + `sendMail()` + `formatDateCL()`.
- `validate.ts` — `isEmail`, `clean`, `hasHeaderInjection`, límites por campo.
- `email-templates.ts` — 3 builders (`contacto`, `cotizacion-rapida`, `cotizacion`) → `{ subject, html, text }`.

### API routes (src/pages/api/)
- `contacto.ts` — POST JSON, valida `name`+`email` req, descarta honeypot, devuelve `{ok:true}|{ok:false,error,fields?}`.
- `cotizacion-rapida.ts` — POST JSON, requiere `email||phone`, honeypot.
- `cotizacion.ts` — POST JSON, valida paso 4 (name+email), honeypot.

Todos con `prerender = false`, `Content-Type: application/json`, timeouts SMTP 10s.

### Wiring cliente (modificaciones mínimas)
- `contacto.astro`: agregar `<input name="website">` honeypot oculto; reemplazar el handler actual (que solo muestra "Recibido") por `fetch('/api/contacto')` con estados `aria-live` y reset del form al success.
- `CTASection.astro`: agregar honeypot; en la rama `channel === 'email'`, cambiar `mailto:` por `fetch('/api/cotizacion-rapida')`. **Rama WhatsApp queda intacta**.
- `cotizar.astro`: agregar honeypot en paso 4; en `showSuccess()`, hacer `fetch('/api/cotizacion')` antes de mostrar el ID. Si falla → mostrar error, no avanzar. Reset al estado paso 1 al success.

## Out of scope
- Cambios al deploy Docker/nginx para servir SSR en producción (requiere reverse-proxy a Node).
- Rate limiting (queda como `[pre-adr]` en observations si llega spam real).
- Captcha / Turnstile (honeypot por ahora).
- Persistencia en DB de los submits (solo correo).

## Riesgos

| ID | Descripción | Probabilidad | Mitigación |
|----|-------------|--------------|------------|
| R1 | Adapter hybrid rompe la build Docker actual (nginx solo sirve estáticos) | Media | Documentar en observations; deploy es otro cambio. En dev local con `astro dev` funciona sin Docker. |
| R2 | SMTP de ioh requiere autenticación distinta a la asumida (STARTTLS vs SSL) | Baja | Variables `SMTP_PORT=465` + `SMTP_SECURE=true` ya alineadas con SSL implícito. |
| R3 | Header injection vía email/name | Media | `hasHeaderInjection()` rechaza `\r`/`\n` en campos cortos. |
| R4 | El usuario no creó `.env` antes de probar → 500 en primer curl | Alta | Documentar en verify; fail-fast con mensaje claro al levantar el server. |

**Esfuerzo**: M (3 archivos lib + 3 endpoints + 3 wirings + adapter swap + verificación local).
**Probabilidad alta**: ninguna (R4 es operacional, no técnica). → NO high-risk → skip `sdd-judgment`.

## Plan de validación
1. `npm i` los nuevos paquetes.
2. Usuario crea `.env` con `SMTP_PASS`.
3. `npm run dev` (o `astro dev`).
4. 3× `curl` a los endpoints con payload mínimo válido.
5. Verificar recepción en webmail ioh (`contacto@logatm.com`).
6. Probar honeypot enviando `website="bot"` → debe responder 200 sin email.
7. Probar validación enviando email inválido → debe responder 400.

## Archivos afectados

**Nuevos** (8):
- `log-atm-web-astro/.env.example`
- `log-atm-web-astro/src/lib/mailer.ts`
- `log-atm-web-astro/src/lib/validate.ts`
- `log-atm-web-astro/src/lib/email-templates.ts`
- `log-atm-web-astro/src/pages/api/contacto.ts`
- `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts`
- `log-atm-web-astro/src/pages/api/cotizacion.ts`
- (memory artefactos SDD)

**Modificados** (5):
- `log-atm-web-astro/package.json` (+ `package-lock.json`)
- `log-atm-web-astro/astro.config.mjs`
- `log-atm-web-astro/src/pages/contacto.astro`
- `log-atm-web-astro/src/components/sections/CTASection.astro`
- `log-atm-web-astro/src/pages/cotizar.astro`
