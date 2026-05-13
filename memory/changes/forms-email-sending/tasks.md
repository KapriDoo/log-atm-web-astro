---
type: tasks
change_name: "forms-email-sending"
---

# Tasks — forms-email-sending

- [ ] T1 — Instalar deps: `@astrojs/node`, `nodemailer`, `@types/nodemailer` en `log-atm-web-astro/`.
- [ ] T2 — Editar `astro.config.mjs`: importar adapter Node y agregar `adapter: node({ mode: 'standalone' })`.
- [ ] T3 — Crear `log-atm-web-astro/.env.example` con claves SMTP vacías.
- [ ] T4 — Verificar `.gitignore` ignora `.env` (ya confirmado en explore).
- [ ] T5 — Crear `src/lib/mailer.ts`.
- [ ] T6 — Crear `src/lib/validate.ts`.
- [ ] T7 — Crear `src/lib/email-templates.ts` con 3 builders.
- [ ] T8 — Crear `src/pages/api/contacto.ts`.
- [ ] T9 — Crear `src/pages/api/cotizacion-rapida.ts`.
- [ ] T10 — Crear `src/pages/api/cotizacion.ts`.
- [ ] T11 — Modificar `src/pages/contacto.astro`: honeypot + handler fetch.
- [ ] T12 — Modificar `src/components/sections/CTASection.astro`: honeypot + rama Email → fetch.
- [ ] T13 — Modificar `src/pages/cotizar.astro`: honeypot en paso 4 + fetch en showSuccess.
- [ ] T14 — Verify: `npm run dev` + 3 curl + lectura del webmail ioh.

## Acceptance
- [ ] Los 3 endpoints responden 200 en happy path.
- [ ] Honeypot retorna 200 sin enviar correo (verificar en bandeja).
- [ ] Email inválido retorna 400 con `fields.email`.
- [ ] Header injection retorna 400.
- [ ] Sin `.env`: el server retorna 500 con log claro en consola.
- [ ] `wa.me` sigue funcionando en CTASection cuando el canal es WhatsApp.
