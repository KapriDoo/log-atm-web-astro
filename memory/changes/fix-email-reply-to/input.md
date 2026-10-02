---
type: external-input
domain: fix
change_name: fix-email-reply-to
fast_path: apply-only
priority: P0
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 01 — El header Reply-To de los correos de formulario nunca se envía

**Despacho:** `sdd new fix-email-reply-to --domain fix --path apply-only --input-file .sdd/briefs/auditoria-2026-10/01-fix-email-reply-to.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: validación de auditoría (`/home/kapridoo/projects/log-atm-web-astro/memory/validacion-auditoria-2026-10-02.md`, hallazgos N1 y D10).

## Problema

`src/lib/mailer.ts:55` pasa la opción `replyTo: opts.replyTo` a `worker-mailer@1.2.1`, pero la librería solo reconoce `reply`:

- Tipo: `node_modules/worker-mailer/dist/index.d.ts:9` → `reply?: string | User`
- Runtime: `node_modules/worker-mailer/dist/index.js` → `typeof e.reply=="string"?this.reply={email:e.reply}:this.reply=e.reply` y `resolveReply()` solo arma `Reply-To` si `this.reply` existe.

**Efecto:** en los 3 formularios (contacto, cotización rápida, cotización 4 pasos), responder el correo recibido responde a `web@logatm.com` (`SMTP_USER`) en vez de al cliente. Incumple `memory/specs/forms-email/spec.md:30,44` ("Reply-To: email del usuario si está presente y válido").

No se detectó porque `astro build` no hace type-check (ver brief 10).

## Alcance secundario (defensa en profundidad)

`hasHeaderInjection` solo valida `name`, `email`, `phone`, `company`, pero el Subject interpola además:

- `service` (contacto), `mode/origin/destination` (cotización rápida), `modality/origin/dest` (cotización) — `src/lib/email-templates.ts:346,439,540`.

Hoy no es explotable porque `worker-mailer` codifica el Subject en Q-encoding (siempre contiene caracteres no-ASCII como "·"/"—", y CR/LF se vuelven `=0D/=0A`). Es una defensa accidental: si cambia el copy o la librería, queda expuesto.

## Criterios de aceptación

- [ ] Un correo enviado por cada uno de los 3 endpoints (`/api/contacto`, `/api/cotizacion-rapida`, `/api/cotizacion`) incluye el header `Reply-To` con el email del remitente cuando este es válido.
- [ ] Sin email válido del remitente, el correo no incluye `Reply-To` (comportamiento vigente de la spec).
- [ ] Todo campo interpolado en el Subject o en headers rechaza CR/LF con el mismo mecanismo de `hasHeaderInjection` (respuesta 400 `validation`).
- [ ] El objeto pasado a `mailer.send(...)` queda tipado contra las opciones de `worker-mailer` (p. ej. `satisfies` del tipo exportado), de modo que un nombre de campo inválido sea error de tipos.

## Tareas sugeridas (para `tasks.md`)

1. `src/lib/mailer.ts:55`: `replyTo:` → `reply:` y tipar el objeto con el tipo de opciones de `worker-mailer`.
2. Extender la validación de header-injection a los campos interpolados en el Subject de cada endpoint (`src/pages/api/*.ts`).
3. Verificación con envío real (ver abajo).

## Verificación

- Envío real en local: `.dev.vars` con `SMTP_PASS` (gitignored), `npm run dev`, enviar los 3 formularios y revisar los headers del correo recibido en `contacto@logatm.com` (`MAIL_TO`): debe aparecer `Reply-To: <email del remitente>`.
- Probar un payload con `\r\n` en `service`/`origin` → 400.

## Fuera de alcance

- Cambios de plantilla o copy de los correos.
- Documentación del contrato de la API (`folio`, `invalid-json`, `invalid-payload`) → brief 09.
