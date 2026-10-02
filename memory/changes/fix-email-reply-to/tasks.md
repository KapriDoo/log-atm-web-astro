---
type: tasks
change_name: "fix-email-reply-to"
created: "2026-10-02"
---

# Tasks — fix-email-reply-to

> Brief de origen: `.sdd/briefs/auditoria-2026-10/01-fix-email-reply-to.md` (copiado como `input.md` del cambio). Rutas `src/...` relativas a `log-atm-web-astro/`.

## T1 — Pasar el Reply-To con el nombre de opción que reconoce worker-mailer y tipar el objeto de envío

**File**: `log-atm-web-astro/src/lib/mailer.ts`
**Líneas/ocurrencias**: línea 55 (`replyTo: opts.replyTo`) y el objeto literal pasado a `mailer.send(...)` (líneas 52–59)
**Acción**: reemplazar `replyTo: opts.replyTo` por `reply: opts.replyTo` y tipar el objeto pasado a `mailer.send(...)` contra el tipo de opciones exportado por `worker-mailer@1.2.1` (p. ej. `satisfies` del tipo exportado en `node_modules/worker-mailer/dist/index.d.ts`), de modo que un nombre de campo inválido sea error de tipos. Si `opts.replyTo` es `undefined`, no debe emitirse `Reply-To`.
**Justificación**: `worker-mailer@1.2.1` solo reconoce `reply?: string | User` (`dist/index.d.ts:9`) y `resolveReply()` solo arma `Reply-To` si `this.reply` existe; hoy la opción `replyTo` se ignora y la respuesta va a `SMTP_USER`. Cambio de un campo, sin tocar plantillas.

**Acceptance**:
- [ ] `mailer.send(...)` recibe `reply` con el email del remitente cuando existe y es válido; sin email no se emite `Reply-To`.
- [ ] El objeto de envío queda tipado contra las opciones de `worker-mailer`; `npx tsc --noEmit` (o `astro check`) marca error si se reintroduce `replyTo`.

## T2 — Extender la validación anti header-injection a los campos interpolados en el Subject

**File**: `log-atm-web-astro/src/pages/api/contacto.ts`, `log-atm-web-astro/src/pages/api/cotizacion-rapida.ts`, `log-atm-web-astro/src/pages/api/cotizacion.ts`
**Líneas/ocurrencias**: bloques de validación que hoy llaman `hasHeaderInjection` (contacto.ts:51–56, cotizacion-rapida.ts:54–56, cotizacion.ts:71–79); campos interpolados en el Subject según `src/lib/email-templates.ts:346,439,540`
**Acción**: aplicar `hasHeaderInjection` (mismo mecanismo, respuesta 400 `validation` con `fields.{campo} = "Caracteres no válidos."`) a todo campo interpolado en el Subject o en headers: `service` (contacto), `mode`/`origin`/`destination` (cotización rápida), `modality`/`origin`/`dest` (cotización 4 pasos), además de los ya cubiertos. Confirmar los nombres exactos contra el código de cada endpoint y de `email-templates.ts`.
**Justificación**: hoy la protección depende de que `worker-mailer` codifique el Subject en Q-encoding; es defensa accidental. Reutiliza el validador existente (`src/lib/validate.ts:25`), sin cambiar copy ni plantillas.

**Acceptance**:
- [ ] Un payload con `\r\n` en `service` (contacto), `origin` (cotización rápida) u `origin` (cotización) responde 400 `validation`.
- [ ] Los payloads válidos de los 3 endpoints siguen respondiendo como antes.

## T3 — Verificación con envío real

**File**: — (verificación; sin cambios de código)
**Líneas/ocurrencias**: —
**Acción**: con `.dev.vars` que contenga `SMTP_PASS` (gitignored), `npm run dev`, enviar los 3 formularios y revisar los headers del correo recibido en `MAIL_TO`: debe aparecer `Reply-To: <email del remitente>`. Probar un payload con `\r\n` en `service`/`origin` → 400. Si no hay credenciales SMTP disponibles en el entorno, registrarlo explícitamente en la evidencia como «no verificado con envío real» en vez de darlo por verificado.
**Justificación**: criterio de aceptación del brief; `astro build` no hace type-check, así que la verificación estática no basta para el comportamiento SMTP.

**Acceptance**:
- [ ] Evidencia de headers del correo recibido con `Reply-To` correcto para los 3 endpoints, o declaración explícita de que no hubo credenciales para el envío real.
- [ ] Evidencia de la respuesta 400 ante `\r\n` en los campos del Subject.
