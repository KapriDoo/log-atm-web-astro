---
type: capability-spec
capability: forms-email
status: in-progress
change_refs: ["forms-email-sending"]
---

# Capability — forms-email

## Contrato

### Endpoints

| Endpoint | Método | Content-Type | Honeypot | Validación obligatoria |
|----------|--------|--------------|----------|------------------------|
| `POST /api/contacto` | POST | `application/json` | `website` | `name`, `email` |
| `POST /api/cotizacion-rapida` | POST | `application/json` | `website` | `email` OR `phone` |
| `POST /api/cotizacion` | POST | `application/json` | `website` | `name`, `email`, `modality`, `origin`, `dest` |

### Respuestas (todos)
- **200** `{ ok: true }` (incluye casos honeypot, descarte silencioso).
- **400** `{ ok: false, error: "validation", fields: { [k]: "msg" } }`.
- **405** `{ ok: false, error: "method" }` para no-POST.
- **415** `{ ok: false, error: "content-type" }`.
- **500** `{ ok: false, error: "server" }` (stack solo en consola).

### Comportamiento del mailer
- From: `"Formulario Web" <web@logatm.com>` (valor de `SMTP_USER`).
- To: `MAIL_TO` (env).
- Reply-To: `email` del usuario si está presente y válido.
- Asunto y cuerpo por plantilla.
- Footer técnico siempre: IP (`x-forwarded-for`/`x-real-ip`/`cf-connecting-ip`), UA, fecha CL, tipo de form.

### Anti-abuse
- Honeypot `name="website"` — si llega no-vacío, return 200 sin enviar.
- `hasHeaderInjection` rechaza `\r`/`\n` en `name`, `email`, `phone`, `company`.

## Scenarios

```gherkin
Scenario: Contacto válido
  Given POST /api/contacto con name="Juan", email="j@x.cl", message="hola"
  When el servidor procesa
  Then envía mail a MAIL_TO con Reply-To "j@x.cl"
  And responde 200 { ok: true }

Scenario: Honeypot disparado
  Given POST /api/contacto con name="Juan", email="j@x.cl", website="http://spam"
  When el servidor procesa
  Then NO envía mail
  And responde 200 { ok: true }

Scenario: Email inválido
  Given POST /api/contacto con name="Juan", email="not-an-email"
  When el servidor procesa
  Then responde 400 { ok:false, error:"validation", fields:{ email:"..." } }

Scenario: Cotización rápida sin contacto
  Given POST /api/cotizacion-rapida con email="" y phone=""
  When el servidor procesa
  Then responde 400 con fields conteniendo "email" o "phone"

Scenario: Header injection
  Given POST /api/contacto con name="Juan\r\nBcc: x@y"
  When el servidor procesa
  Then responde 400 con fields:{ name: "..." }
```
