---
type: apply-evidence
change_name: "fix-email-reply-to"
created: "2026-10-02"
---

# Apply evidence — fix-email-reply-to

Camino `apply-only`, sin specs (`spec_refs: []`) ni `design.md`. Ninguna tarea de `tasks.md` está marcada `[TDD]` y el perfil no declara suite de tests ni filtro de casos; la verificación de cada tarea es el type-check (`tsc --noEmit`, instalado con `--no-save` en el worktree porque el proyecto no trae `typescript`), la construcción MIME de `worker-mailer` sin envío y peticiones HTTP contra `astro dev`.

## T1 — `reply` en lugar de `replyTo` y objeto de envío tipado

Estado previo (HEAD sin el cambio): el type-check del proyecto sobre los archivos del cambio. El bloque siguiente muestra el error de tipos que el literal pasado a `mailer.send(...)` ya producía con `replyTo` y que nadie veía porque `astro build` no corre type-check.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"archivo","argv":null,"texto":"# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.\nout=$(npx tsc --noEmit -p . 2\u003e&1)\ncode=$?\necho \"tsc exit: $code\"\necho \"errores totales: $(printf '%s\\n' \"$out\" | grep -c 'error TS')\"\necho \"errores en src/lib/mailer.ts y src/pages/api/*.ts:\"\nprintf '%s\\n' \"$out\" | grep -E '^src/(lib/mailer\\.ts|pages/api/[a-z-]+\\.ts)' || echo \"(ninguno)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"479820a9c9a50cfdbd99a539771a484f6357cfd4","fecha":"2026-10-02T19:14:22-03:00","exit":0,"sha256":"83e1366d051ff9b0f87082ad841eb3a64e0140716194dd06d38fff63f9762ce9","lineas":5,"omitidas":0,"no_recomprobable":"estado previo al cambio: T1 y T2 modifican los archivos que mide"} -->
**Evidencia `apply-evidence.1`** · exit 0 · 5 líneas, 0 omitidas · HEAD `479820a9c9a5` · 2026-10-02T19:14:22-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: estado previo al cambio: T1 y T2 modifican los archivos que mide

```bash
# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.
out=$(npx tsc --noEmit -p . 2>&1)
code=$?
echo "tsc exit: $code"
echo "errores totales: $(printf '%s\n' "$out" | grep -c 'error TS')"
echo "errores en src/lib/mailer.ts y src/pages/api/*.ts:"
printf '%s\n' "$out" | grep -E '^src/(lib/mailer\.ts|pages/api/[a-z-]+\.ts)' || echo "(ninguno)"
```

```text
tsc exit: 2
errores totales: 5
errores en src/lib/mailer.ts y src/pages/api/*.ts:
src/lib/mailer.ts(2,30): error TS2307: Cannot find module 'cloudflare:workers' or its corresponding type declarations.
src/lib/mailer.ts(55,7): error TS2561: Object literal may only specify known properties, but 'replyTo' does not exist in type 'EmailOptions'. Did you mean to write 'reply'?
```
<!-- evidencia:fin apply-evidence.1 -->

Tras el cambio, mismo type-check:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"archivo","argv":null,"texto":"# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.\nout=$(npx tsc --noEmit -p . 2\u003e&1)\ncode=$?\necho \"tsc exit: $code\"\necho \"errores totales: $(printf '%s\\n' \"$out\" | grep -c 'error TS')\"\necho \"errores en src/lib/mailer.ts y src/pages/api/*.ts:\"\nprintf '%s\\n' \"$out\" | grep -E '^src/(lib/mailer\\.ts|pages/api/[a-z-]+\\.ts)' || echo \"(ninguno)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"479820a9c9a50cfdbd99a539771a484f6357cfd4","fecha":"2026-10-02T19:14:41-03:00","exit":0,"sha256":"c6aa42af2b9af9a1591c7a159558b2f9e7dff49f6f4d5463ea6cd1c260901580","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 4 líneas, 0 omitidas · HEAD `479820a9c9a5` · 2026-10-02T19:14:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`

```bash
# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.
out=$(npx tsc --noEmit -p . 2>&1)
code=$?
echo "tsc exit: $code"
echo "errores totales: $(printf '%s\n' "$out" | grep -c 'error TS')"
echo "errores en src/lib/mailer.ts y src/pages/api/*.ts:"
printf '%s\n' "$out" | grep -E '^src/(lib/mailer\.ts|pages/api/[a-z-]+\.ts)' || echo "(ninguno)"
```

```text
tsc exit: 2
errores totales: 4
errores en src/lib/mailer.ts y src/pages/api/*.ts:
src/lib/mailer.ts(2,30): error TS2307: Cannot find module 'cloudflare:workers' or its corresponding type declarations.
```
<!-- evidencia:fin apply-evidence.2 -->

Mutación (copia en temporales, no versionada): con `replyTo` reintroducido en el objeto `satisfies EmailOptions`, el type-check marca el campo inválido:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"archivo","argv":null,"texto":"# Mutación sobre una copia bajo el directorio de temporales: reintroduce `replyTo` en el objeto de envío.\nM=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mut.XXXXXXXX)\ncp -r src .astro tsconfig.json package.json \"$M\"/\nln -s \"$PWD/node_modules\" \"$M/node_modules\"\nsed -i 's/^      reply: opts.replyTo,$/      replyTo: opts.replyTo,/' \"$M/src/lib/mailer.ts\"\ngrep -n 'opts.replyTo' \"$M/src/lib/mailer.ts\"\n(cd \"$M\" && npx tsc --noEmit -p . 2\u003e&1) | grep -E '^src/lib/mailer\\.ts' || echo \"(sin errores en mailer.ts)\"\nrm -rf \"$M\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"479820a9c9a50cfdbd99a539771a484f6357cfd4","fecha":"2026-10-02T19:14:54-03:00","exit":0,"sha256":"2f03e349473c74c6b10f352a9b91ecc031703ee80be247bd4559d1789f778cb9","lineas":3,"omitidas":0,"no_recomprobable":"mutación sobre una copia temporal que el propio comando crea y borra"} -->
**Evidencia `apply-evidence.3`** · exit 0 · 3 líneas, 0 omitidas · HEAD `479820a9c9a5` · 2026-10-02T19:14:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: mutación sobre una copia temporal que el propio comando crea y borra

```bash
# Mutación sobre una copia bajo el directorio de temporales: reintroduce `replyTo` en el objeto de envío.
M=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mut.XXXXXXXX)
cp -r src .astro tsconfig.json package.json "$M"/
ln -s "$PWD/node_modules" "$M/node_modules"
sed -i 's/^      reply: opts.replyTo,$/      replyTo: opts.replyTo,/' "$M/src/lib/mailer.ts"
grep -n 'opts.replyTo' "$M/src/lib/mailer.ts"
(cd "$M" && npx tsc --noEmit -p . 2>&1) | grep -E '^src/lib/mailer\.ts' || echo "(sin errores en mailer.ts)"
rm -rf "$M"
```

```text
58:      replyTo: opts.replyTo,
src/lib/mailer.ts(2,30): error TS2307: Cannot find module 'cloudflare:workers' or its corresponding type declarations.
src/lib/mailer.ts(58,7): error TS2561: Object literal may only specify known properties, but 'replyTo' does not exist in type 'EmailOptions'. Did you mean to write 'reply'?
```
<!-- evidencia:fin apply-evidence.3 -->

Construcción MIME sin envío: `sendMail()` real de `src/lib/mailer.ts`, alimentado por los tres builders de `email-templates.ts`, con `worker-mailer` sustituido por un doble cuyo `send()` arma el mensaje con la clase `Email` real de la librería (`dist/index.mjs`, el build ESM que se empaqueta para Workers):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"archivo","argv":null,"texto":"# Ejercita sendMail() real de src/lib/mailer.ts con cada builder de email-templates.ts, sin red:\n# un hook de resolución sustituye `worker-mailer` por un doble cuyo send() arma el MIME con la\n# clase Email real de worker-mailer (dist/index.mjs) e imprime los headers relevantes.\nH=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mime.XXXXXXXX)\ncat \u003e \"$H/hooks.mjs\" <<JS\nconst STUBS = {\n  \"cloudflare:workers\": \"data:text/javascript,export const env = {};\",\n  \"cloudflare:sockets\": \"data:text/javascript,export const connect = () =\u003e { throw new Error('sin red'); };\",\n  \"worker-mailer\": \"file://$H/fake-mailer.mjs\",\n};\nexport async function resolve(spec, ctx, next) {\n  if (spec in STUBS && !(ctx.parentURL || \"\").endsWith(\"/fake-mailer.mjs\")) {\n    return { url: STUBS[spec], shortCircuit: true };\n  }\n  return next(spec, ctx);\n}\nJS\ncat \u003e \"$H/fake-mailer.mjs\" <<JS\nimport { Email } from \"$PWD/node_modules/worker-mailer/dist/index.mjs\";\nexport class WorkerMailer {\n  static async connect() { return new WorkerMailer(); }\n  async send(options) { globalThis.__mime = new Email(options).getEmailData(); }\n  async close() {}\n}\nJS\ncat \u003e \"$H/register.mjs\" <<JS\nimport { register } from \"node:module\";\nregister(\"file://$H/hooks.mjs\");\nJS\ncat \u003e \"$H/run.mts\" <<JS\nimport { sendMail } from \"$PWD/src/lib/mailer.ts\";\nimport { buildContactoEmail, buildCotizacionRapidaEmail, buildCotizacion4Email } from \"$PWD/src/lib/email-templates.ts\";\nconst env = { SMTP_HOST: \"h\", SMTP_USER: \"web@logatm.com\", SMTP_PASS: \"x\", MAIL_TO: \"contacto@logatm.com\" };\nconst meta = { ip: \"127.0.0.1\", userAgent: \"mime-check\", formType: \"PRUEBA\" };\nconst casos: [string, { subject: string; html: string; text: string; replyTo?: string }][] = [\n  [\"contacto con email\", buildContactoEmail({ name: \"PRUEBA\", email: \"cliente.prueba@example.com\" }, meta)],\n  [\"cotizacion-rapida con email\", buildCotizacionRapidaEmail({ origin: \"SCL\", email: \"cliente.prueba@example.com\" }, meta)],\n  [\"cotizacion-rapida sin email\", buildCotizacionRapidaEmail({ origin: \"SCL\", phone: \"+56 9 0000 0000\" }, meta)],\n  [\"cotizacion con email\", buildCotizacion4Email({ name: \"PRUEBA\", email: \"cliente.prueba@example.com\", modality: \"FCL\", origin: \"SCL\", dest: \"MIA\" }, { ...meta, folio: \"X\" })],\n];\nfor (const [label, mail] of casos) {\n  await sendMail(env, mail);\n  const head = String((globalThis as any).__mime).split(\"\\r\\n\\r\\n\")[0].split(\"\\r\\n\");\n  const reply = head.filter((l) =\u003e /^reply-to:/i.test(l));\n  console.log(label + \" -\u003e replyTo del builder: \" + JSON.stringify(mail.replyTo ?? null) + \" | \" + (reply.length ? reply.join(\" ; \") : \"(sin header Reply-To)\"));\n}\nJS\nnode --import tsx --import \"$H/register.mjs\" \"$H/run.mts\" 2\u003e&1\nrm -rf \"$H\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"479820a9c9a50cfdbd99a539771a484f6357cfd4","fecha":"2026-10-02T19:15:42-03:00","exit":0,"sha256":"db4988bc166f8ecd1465f1e4a024a5d30c8903f24bac17b5104505abbb833f95","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 4 líneas, 0 omitidas · HEAD `479820a9c9a5` · 2026-10-02T19:15:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`

```bash
# Ejercita sendMail() real de src/lib/mailer.ts con cada builder de email-templates.ts, sin red:
# un hook de resolución sustituye `worker-mailer` por un doble cuyo send() arma el MIME con la
# clase Email real de worker-mailer (dist/index.mjs) e imprime los headers relevantes.
H=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mime.XXXXXXXX)
cat > "$H/hooks.mjs" <<JS
const STUBS = {
  "cloudflare:workers": "data:text/javascript,export const env = {};",
  "cloudflare:sockets": "data:text/javascript,export const connect = () => { throw new Error('sin red'); };",
  "worker-mailer": "file://$H/fake-mailer.mjs",
};
export async function resolve(spec, ctx, next) {
  if (spec in STUBS && !(ctx.parentURL || "").endsWith("/fake-mailer.mjs")) {
    return { url: STUBS[spec], shortCircuit: true };
  }
  return next(spec, ctx);
}
JS
cat > "$H/fake-mailer.mjs" <<JS
import { Email } from "$PWD/node_modules/worker-mailer/dist/index.mjs";
export class WorkerMailer {
  static async connect() { return new WorkerMailer(); }
  async send(options) { globalThis.__mime = new Email(options).getEmailData(); }
  async close() {}
}
JS
cat > "$H/register.mjs" <<JS
import { register } from "node:module";
register("file://$H/hooks.mjs");
JS
cat > "$H/run.mts" <<JS
import { sendMail } from "$PWD/src/lib/mailer.ts";
import { buildContactoEmail, buildCotizacionRapidaEmail, buildCotizacion4Email } from "$PWD/src/lib/email-templates.ts";
const env = { SMTP_HOST: "h", SMTP_USER: "web@logatm.com", SMTP_PASS: "x", MAIL_TO: "contacto@logatm.com" };
const meta = { ip: "127.0.0.1", userAgent: "mime-check", formType: "PRUEBA" };
const casos: [string, { subject: string; html: string; text: string; replyTo?: string }][] = [
  ["contacto con email", buildContactoEmail({ name: "PRUEBA", email: "cliente.prueba@example.com" }, meta)],
  ["cotizacion-rapida con email", buildCotizacionRapidaEmail({ origin: "SCL", email: "cliente.prueba@example.com" }, meta)],
  ["cotizacion-rapida sin email", buildCotizacionRapidaEmail({ origin: "SCL", phone: "+56 9 0000 0000" }, meta)],
  ["cotizacion con email", buildCotizacion4Email({ name: "PRUEBA", email: "cliente.prueba@example.com", modality: "FCL", origin: "SCL", dest: "MIA" }, { ...meta, folio: "X" })],
];
for (const [label, mail] of casos) {
  await sendMail(env, mail);
  const head = String((globalThis as any).__mime).split("\r\n\r\n")[0].split("\r\n");
  const reply = head.filter((l) => /^reply-to:/i.test(l));
  console.log(label + " -> replyTo del builder: " + JSON.stringify(mail.replyTo ?? null) + " | " + (reply.length ? reply.join(" ; ") : "(sin header Reply-To)"));
}
JS
node --import tsx --import "$H/register.mjs" "$H/run.mts" 2>&1
rm -rf "$H"
```

```text
contacto con email -> replyTo del builder: "cliente.prueba@example.com" | Reply-To: cliente.prueba@example.com
cotizacion-rapida con email -> replyTo del builder: "cliente.prueba@example.com" | Reply-To: cliente.prueba@example.com
cotizacion-rapida sin email -> replyTo del builder: null | (sin header Reply-To)
cotizacion con email -> replyTo del builder: "cliente.prueba@example.com" | Reply-To: cliente.prueba@example.com
```
<!-- evidencia:fin apply-evidence.4 -->

Mutación (copia temporal, no versionada): con `replyTo` —el código de HEAD— la misma construcción MIME no emite `Reply-To` en ningún caso, que es el bug en producción:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"archivo","argv":null,"texto":"# Mutación en copia temporal: vuelve a `replyTo` en el objeto de envío (el bug original) y repite\n# la construcción MIME con el mismo doble de worker-mailer.\nM=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mutmime.XXXXXXXX)\ncp -r src package.json \"$M\"/\nln -s \"$PWD/node_modules\" \"$M/node_modules\"\nsed -i 's/^      reply: opts.replyTo,$/      replyTo: opts.replyTo,/' \"$M/src/lib/mailer.ts\"\ngrep -n 'opts.replyTo' \"$M/src/lib/mailer.ts\"\n(\ncd \"$M\" || exit 1\nH=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mime.XXXXXXXX)\ncat \u003e \"$H/hooks.mjs\" <<JS\nconst STUBS = {\n  \"cloudflare:workers\": \"data:text/javascript,export const env = {};\",\n  \"cloudflare:sockets\": \"data:text/javascript,export const connect = () =\u003e { throw new Error('sin red'); };\",\n  \"worker-mailer\": \"file://$H/fake-mailer.mjs\",\n};\nexport async function resolve(spec, ctx, next) {\n  if (spec in STUBS && !(ctx.parentURL || \"\").endsWith(\"/fake-mailer.mjs\")) {\n    return { url: STUBS[spec], shortCircuit: true };\n  }\n  return next(spec, ctx);\n}\nJS\ncat \u003e \"$H/fake-mailer.mjs\" <<JS\nimport { Email } from \"$PWD/node_modules/worker-mailer/dist/index.mjs\";\nexport class WorkerMailer {\n  static async connect() { return new WorkerMailer(); }\n  async send(options) { globalThis.__mime = new Email(options).getEmailData(); }\n  async close() {}\n}\nJS\ncat \u003e \"$H/register.mjs\" <<JS\nimport { register } from \"node:module\";\nregister(\"file://$H/hooks.mjs\");\nJS\ncat \u003e \"$H/run.mts\" <<JS\nimport { sendMail } from \"$PWD/src/lib/mailer.ts\";\nimport { buildContactoEmail, buildCotizacionRapidaEmail, buildCotizacion4Email } from \"$PWD/src/lib/email-templates.ts\";\nconst env = { SMTP_HOST: \"h\", SMTP_USER: \"web@logatm.com\", SMTP_PASS: \"x\", MAIL_TO: \"contacto@logatm.com\" };\nconst meta = { ip: \"127.0.0.1\", userAgent: \"mime-check\", formType: \"PRUEBA\" };\nconst casos: [string, { subject: string; html: string; text: string; replyTo?: string }][] = [\n  [\"contacto con email\", buildContactoEmail({ name: \"PRUEBA\", email: \"cliente.prueba@example.com\" }, meta)],\n  [\"cotizacion-rapida con email\", buildCotizacionRapidaEmail({ origin: \"SCL\", email: \"cliente.prueba@example.com\" }, meta)],\n  [\"cotizacion-rapida sin email\", buildCotizacionRapidaEmail({ origin: \"SCL\", phone: \"+56 9 0000 0000\" }, meta)],\n  [\"cotizacion con email\", buildCotizacion4Email({ name: \"PRUEBA\", email: \"cliente.prueba@example.com\", modality: \"FCL\", origin: \"SCL\", dest: \"MIA\" }, { ...meta, folio: \"X\" })],\n];\nfor (const [label, mail] of casos) {\n  await sendMail(env, mail);\n  const head = String((globalThis as any).__mime).split(\"\\r\\n\\r\\n\")[0].split(\"\\r\\n\");\n  const reply = head.filter((l) =\u003e /^reply-to:/i.test(l));\n  console.log(label + \" -\u003e replyTo del builder: \" + JSON.stringify(mail.replyTo ?? null) + \" | \" + (reply.length ? reply.join(\" ; \") : \"(sin header Reply-To)\"));\n}\nJS\nnode --import tsx --import \"$H/register.mjs\" \"$H/run.mts\" 2\u003e&1\nrm -rf \"$H\"\n)\nrm -rf \"$M\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"479820a9c9a50cfdbd99a539771a484f6357cfd4","fecha":"2026-10-02T19:16:03-03:00","exit":0,"sha256":"dbfaefaea46d0f40822c28f1b51d924866519f04aa0b1c6b3067fcb006722bfa","lineas":5,"omitidas":0,"no_recomprobable":"mutación sobre una copia temporal que el propio comando crea y borra"} -->
**Evidencia `apply-evidence.5`** · exit 0 · 5 líneas, 0 omitidas · HEAD `479820a9c9a5` · 2026-10-02T19:16:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: mutación sobre una copia temporal que el propio comando crea y borra

```bash
# Mutación en copia temporal: vuelve a `replyTo` en el objeto de envío (el bug original) y repite
# la construcción MIME con el mismo doble de worker-mailer.
M=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mutmime.XXXXXXXX)
cp -r src package.json "$M"/
ln -s "$PWD/node_modules" "$M/node_modules"
sed -i 's/^      reply: opts.replyTo,$/      replyTo: opts.replyTo,/' "$M/src/lib/mailer.ts"
grep -n 'opts.replyTo' "$M/src/lib/mailer.ts"
(
cd "$M" || exit 1
H=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/mime.XXXXXXXX)
cat > "$H/hooks.mjs" <<JS
const STUBS = {
  "cloudflare:workers": "data:text/javascript,export const env = {};",
  "cloudflare:sockets": "data:text/javascript,export const connect = () => { throw new Error('sin red'); };",
  "worker-mailer": "file://$H/fake-mailer.mjs",
};
export async function resolve(spec, ctx, next) {
  if (spec in STUBS && !(ctx.parentURL || "").endsWith("/fake-mailer.mjs")) {
    return { url: STUBS[spec], shortCircuit: true };
  }
  return next(spec, ctx);
}
JS
cat > "$H/fake-mailer.mjs" <<JS
import { Email } from "$PWD/node_modules/worker-mailer/dist/index.mjs";
export class WorkerMailer {
  static async connect() { return new WorkerMailer(); }
  async send(options) { globalThis.__mime = new Email(options).getEmailData(); }
  async close() {}
}
JS
cat > "$H/register.mjs" <<JS
import { register } from "node:module";
register("file://$H/hooks.mjs");
JS
cat > "$H/run.mts" <<JS
import { sendMail } from "$PWD/src/lib/mailer.ts";
import { buildContactoEmail, buildCotizacionRapidaEmail, buildCotizacion4Email } from "$PWD/src/lib/email-templates.ts";
const env = { SMTP_HOST: "h", SMTP_USER: "web@logatm.com", SMTP_PASS: "x", MAIL_TO: "contacto@logatm.com" };
const meta = { ip: "127.0.0.1", userAgent: "mime-check", formType: "PRUEBA" };
const casos: [string, { subject: string; html: string; text: string; replyTo?: string }][] = [
  ["contacto con email", buildContactoEmail({ name: "PRUEBA", email: "cliente.prueba@example.com" }, meta)],
  ["cotizacion-rapida con email", buildCotizacionRapidaEmail({ origin: "SCL", email: "cliente.prueba@example.com" }, meta)],
  ["cotizacion-rapida sin email", buildCotizacionRapidaEmail({ origin: "SCL", phone: "+56 9 0000 0000" }, meta)],
  ["cotizacion con email", buildCotizacion4Email({ name: "PRUEBA", email: "cliente.prueba@example.com", modality: "FCL", origin: "SCL", dest: "MIA" }, { ...meta, folio: "X" })],
];
for (const [label, mail] of casos) {
  await sendMail(env, mail);
  const head = String((globalThis as any).__mime).split("\r\n\r\n")[0].split("\r\n");
  const reply = head.filter((l) => /^reply-to:/i.test(l));
  console.log(label + " -> replyTo del builder: " + JSON.stringify(mail.replyTo ?? null) + " | " + (reply.length ? reply.join(" ; ") : "(sin header Reply-To)"));
}
JS
node --import tsx --import "$H/register.mjs" "$H/run.mts" 2>&1
rm -rf "$H"
)
rm -rf "$M"
```

```text
58:      replyTo: opts.replyTo,
contacto con email -> replyTo del builder: "cliente.prueba@example.com" | (sin header Reply-To)
cotizacion-rapida con email -> replyTo del builder: "cliente.prueba@example.com" | (sin header Reply-To)
cotizacion-rapida sin email -> replyTo del builder: null | (sin header Reply-To)
cotizacion con email -> replyTo del builder: "cliente.prueba@example.com" | (sin header Reply-To)
```
<!-- evidencia:fin apply-evidence.5 -->

Lectura de T1:

- `apply-evidence.1` muestra el error `TS2561` sobre `replyTo` en el estado previo; `apply-evidence.2` lo muestra resuelto, y `apply-evidence.3` muestra que reintroducir `replyTo` en el objeto `satisfies EmailOptions` vuelve a ser error de tipos (criterio «un nombre de campo inválido es error de tipos»).
- El error `TS2307` sobre `cloudflare:workers` (línea 2 de `mailer.ts`) aparece en los tres bloques y es previo al cambio: el proyecto no declara los tipos del runtime de Workers. Fuera del alcance de `tasks.md`; queda registrado en `observations.md`.
- `apply-evidence.4` muestra que el `sendMail()` corregido, alimentado por los tres builders, emite `Reply-To: <email>` cuando el builder entrega email y no emite el header sin email (único caso alcanzable: cotización rápida solo con teléfono). `apply-evidence.5` muestra que con `replyTo` (código de HEAD) ningún caso emite `Reply-To`.
- `apply-evidence.4` depende de que exista el directorio de temporales del despacho (su `mktemp` crea ahí el arnés): fuera de esta sesión, re-ejecutarlo puede no calzar por esa causa y no por el código.

## T2 — Validación anti header-injection en los campos interpolados en el Subject

Campos agregados (confirmados contra los `subject` de `email-templates.ts` en `buildContactoEmail`, `buildCotizacionRapidaEmail` y `buildCotizacion4Email`): `service` (contacto); `mode`, `origin`, `destination` (cotización rápida); `modality`, `origin`, `dest` (cotización 4 pasos). `name` y `email` ya estaban cubiertos; el folio lo genera el servidor.

Peticiones HTTP contra `astro dev` del worktree (`127.0.0.1:4391`, con el código de T2 sin commitear aún), un payload por campo, válido salvo el CR/LF:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"archivo","argv":null,"texto":"# Payloads por lo demás válidos con CR/LF en un campo interpolado en el Subject, contra astro dev.\nB=http://127.0.0.1:4391/api\npost() { printf '%-22s %-12s -\u003e ' \"$1\" \"$2\"; curl -s -w ' [HTTP %{http_code}]\\n' -H 'Content-Type: application/json' -d \"$3\" \"$B/$1\"; }\npost contacto service '{\"name\":\"PRUEBA SDD\",\"email\":\"cliente.prueba@example.com\",\"service\":\"Aereo\\r\\nBcc: x@example.com\"}'\npost cotizacion-rapida mode '{\"email\":\"cliente.prueba@example.com\",\"mode\":\"Aereo\\r\\nBcc: x@example.com\"}'\npost cotizacion-rapida origin '{\"email\":\"cliente.prueba@example.com\",\"origin\":\"SCL\\r\\nBcc: x@example.com\"}'\npost cotizacion-rapida destination '{\"email\":\"cliente.prueba@example.com\",\"destination\":\"MIA\\r\\nBcc: x@example.com\"}'\npost cotizacion modality '{\"name\":\"PRUEBA SDD\",\"email\":\"cliente.prueba@example.com\",\"modality\":\"FCL\\r\\nBcc: x@example.com\",\"origin\":\"SCL\",\"dest\":\"MIA\"}'\npost cotizacion origin '{\"name\":\"PRUEBA SDD\",\"email\":\"cliente.prueba@example.com\",\"modality\":\"FCL\",\"origin\":\"SCL\\r\\nBcc: x@example.com\",\"dest\":\"MIA\"}'\npost cotizacion dest '{\"name\":\"PRUEBA SDD\",\"email\":\"cliente.prueba@example.com\",\"modality\":\"FCL\",\"origin\":\"SCL\",\"dest\":\"MIA\\r\\nBcc: x@example.com\"}'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"c1a06be6f478f6313200724df59b8242d7baa661","fecha":"2026-10-02T19:17:11-03:00","exit":0,"sha256":"1966f714bdff673c184d9738a414682fa592832079f769d9a092e451ed891956","lineas":7,"omitidas":0,"no_recomprobable":"requiere el servidor astro dev que la fase levantó en 127.0.0.1:4391"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 7 líneas, 0 omitidas · HEAD `c1a06be6f478` · 2026-10-02T19:17:11-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: requiere el servidor astro dev que la fase levantó en 127.0.0.1:4391

```bash
# Payloads por lo demás válidos con CR/LF en un campo interpolado en el Subject, contra astro dev.
B=http://127.0.0.1:4391/api
post() { printf '%-22s %-12s -> ' "$1" "$2"; curl -s -w ' [HTTP %{http_code}]\n' -H 'Content-Type: application/json' -d "$3" "$B/$1"; }
post contacto service '{"name":"PRUEBA SDD","email":"cliente.prueba@example.com","service":"Aereo\r\nBcc: x@example.com"}'
post cotizacion-rapida mode '{"email":"cliente.prueba@example.com","mode":"Aereo\r\nBcc: x@example.com"}'
post cotizacion-rapida origin '{"email":"cliente.prueba@example.com","origin":"SCL\r\nBcc: x@example.com"}'
post cotizacion-rapida destination '{"email":"cliente.prueba@example.com","destination":"MIA\r\nBcc: x@example.com"}'
post cotizacion modality '{"name":"PRUEBA SDD","email":"cliente.prueba@example.com","modality":"FCL\r\nBcc: x@example.com","origin":"SCL","dest":"MIA"}'
post cotizacion origin '{"name":"PRUEBA SDD","email":"cliente.prueba@example.com","modality":"FCL","origin":"SCL\r\nBcc: x@example.com","dest":"MIA"}'
post cotizacion dest '{"name":"PRUEBA SDD","email":"cliente.prueba@example.com","modality":"FCL","origin":"SCL","dest":"MIA\r\nBcc: x@example.com"}'
```

```text
contacto               service      -> {"ok":false,"error":"validation","fields":{"service":"Caracteres no válidos."}} [HTTP 400]
cotizacion-rapida      mode         -> {"ok":false,"error":"validation","fields":{"mode":"Caracteres no válidos."}} [HTTP 400]
cotizacion-rapida      origin       -> {"ok":false,"error":"validation","fields":{"origin":"Caracteres no válidos."}} [HTTP 400]
cotizacion-rapida      destination  -> {"ok":false,"error":"validation","fields":{"destination":"Caracteres no válidos."}} [HTTP 400]
cotizacion             modality     -> {"ok":false,"error":"validation","fields":{"modality":"Caracteres no válidos."}} [HTTP 400]
cotizacion             origin       -> {"ok":false,"error":"validation","fields":{"origin":"Caracteres no válidos."}} [HTTP 400]
cotizacion             dest         -> {"ok":false,"error":"validation","fields":{"dest":"Caracteres no válidos."}} [HTTP 400]
```
<!-- evidencia:fin apply-evidence.6 -->

Lectura de T2: `apply-evidence.6` muestra 400 `validation` con `fields.{campo} = "Caracteres no válidos."` para cada uno de los siete campos, incluido el criterio explícito de `tasks.md` (`service` en contacto, `origin` en ambas cotizaciones). La respuesta de los payloads válidos queda cubierta por los envíos reales de T3. No se registra mutación de T2 contra el servidor: con la validación quitada, el mismo payload pasaría a enviar un correo real, fuera del máximo de un envío por endpoint del despacho.

## T3 — Verificación con envío real

`.dev.vars` copiado desde el repo principal al proyecto del worktree (gitignored, confirmado con `git check-ignore`; su contenido no se reproduce aquí). `astro dev` del worktree en `127.0.0.1:4391` sobre el código de los commits de T1 y T2. Un envío por endpoint, con contenido marcado «PRUEBA SDD fix-email-reply-to» y un email de remitente distinto por endpoint para distinguir el `Reply-To` esperado en el buzón:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"archivo","argv":null,"texto":"# Envío SMTP real: un payload válido por endpoint (marcado como prueba), contra astro dev con .dev.vars.\nB=http://127.0.0.1:4391/api\npost() { printf '%-18s -\u003e ' \"$1\"; curl -s -m 60 -w ' [HTTP %{http_code}]\\n' -H 'Content-Type: application/json' -d \"$2\" \"$B/$1\"; }\npost contacto '{\"name\":\"PRUEBA SDD fix-email-reply-to\",\"email\":\"prueba-sdd-contacto@example.com\",\"service\":\"PRUEBA\",\"message\":\"PRUEBA SDD fix-email-reply-to: verificar header Reply-To. Ignorar.\"}'\npost cotizacion-rapida '{\"mode\":\"PRUEBA\",\"origin\":\"PRUEBA SDD\",\"destination\":\"fix-email-reply-to\",\"email\":\"prueba-sdd-rapida@example.com\",\"preference\":\"email\"}'\npost cotizacion '{\"name\":\"PRUEBA SDD fix-email-reply-to\",\"email\":\"prueba-sdd-cotizacion@example.com\",\"modality\":\"PRUEBA\",\"origin\":\"PRUEBA SDD\",\"dest\":\"fix-email-reply-to\",\"notes\":\"PRUEBA SDD fix-email-reply-to: verificar header Reply-To. Ignorar.\"}'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"2490adc06501c580955cb92098710be9ad1673fa","fecha":"2026-10-02T19:17:32-03:00","exit":0,"sha256":"9e299a4cbf305d1b95f67f1ec7801d207107a4edaa1607078ce0d5f4f1aa41cb","lineas":3,"omitidas":0,"no_recomprobable":"envío SMTP real: re-ejecutarlo envía correos nuevos y requiere astro dev con .dev.vars"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 3 líneas, 0 omitidas · HEAD `2490adc06501` · 2026-10-02T19:17:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: envío SMTP real: re-ejecutarlo envía correos nuevos y requiere astro dev con .dev.vars

```bash
# Envío SMTP real: un payload válido por endpoint (marcado como prueba), contra astro dev con .dev.vars.
B=http://127.0.0.1:4391/api
post() { printf '%-18s -> ' "$1"; curl -s -m 60 -w ' [HTTP %{http_code}]\n' -H 'Content-Type: application/json' -d "$2" "$B/$1"; }
post contacto '{"name":"PRUEBA SDD fix-email-reply-to","email":"prueba-sdd-contacto@example.com","service":"PRUEBA","message":"PRUEBA SDD fix-email-reply-to: verificar header Reply-To. Ignorar."}'
post cotizacion-rapida '{"mode":"PRUEBA","origin":"PRUEBA SDD","destination":"fix-email-reply-to","email":"prueba-sdd-rapida@example.com","preference":"email"}'
post cotizacion '{"name":"PRUEBA SDD fix-email-reply-to","email":"prueba-sdd-cotizacion@example.com","modality":"PRUEBA","origin":"PRUEBA SDD","dest":"fix-email-reply-to","notes":"PRUEBA SDD fix-email-reply-to: verificar header Reply-To. Ignorar."}'
```

```text
contacto           -> {"ok":true} [HTTP 200]
cotizacion-rapida  -> {"ok":true} [HTTP 200]
cotizacion         -> {"ok":true,"folio":"LA-MURIXA59063B6C1E"} [HTTP 200]
```
<!-- evidencia:fin apply-evidence.7 -->

Log del servidor durante T2 y T3 (solo líneas de las rutas `/api/` y de errores):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["grep","-E","/api/|[Ee]rror","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/astro-dev.log"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"2490adc06501c580955cb92098710be9ad1673fa","fecha":"2026-10-02T19:17:38-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":"log del astro dev de esta sesión, en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.8`** · exit 1 · 0 líneas, 0 omitidas · HEAD `2490adc06501` · 2026-10-02T19:17:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`
No re-comprobable: log del astro dev de esta sesión, en el directorio de temporales del despacho

```text
grep -E '/api/|[Ee]rror' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-email-reply-to/sdd-apply-8yf51wnq/astro-dev.log
```

```text
```
<!-- evidencia:fin apply-evidence.8 -->

Lectura de T3:

- `apply-evidence.7` muestra HTTP 200 `{ok:true}` en los tres endpoints con payloads válidos: el servidor SMTP aceptó los tres envíos reales (el handler responde 200 solo después de que `sendMail` resuelve; ante una excepción responde 500 `server`). Esto cubre también el criterio de T2 «los payloads válidos siguen respondiendo como antes».
- `apply-evidence.8` no muestra líneas (grep sin coincidencias, exit 1): el log del servidor no registró errores de `/api/` durante T2 ni T3.
- **Verificación humana pendiente**: la fase no tiene acceso al buzón de `MAIL_TO`, así que no revisó los headers de los correos recibidos. Queda pendiente confirmar en ese buzón que los tres correos «PRUEBA SDD fix-email-reply-to» traen `Reply-To: prueba-sdd-contacto@example.com`, `Reply-To: prueba-sdd-rapida@example.com` y `Reply-To: prueba-sdd-cotizacion@example.com` respectivamente. La evidencia propia del header es la construcción MIME de T1 (`apply-evidence.4` y `apply-evidence.5`), que ejercita el mismo `sendMail()` y la misma clase `Email` de `worker-mailer` que arma el mensaje enviado.
- El rechazo 400 ante CR/LF en `service`/`origin` está en `apply-evidence.6` (T2).

## Cierre

El perfil no declara suite de tests ni lista de suites; la corrida de cierre es el mismo type-check sobre el árbol final (tras T2), que también cubre los tres endpoints modificados:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"archivo","argv":null,"texto":"# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.\nout=$(npx tsc --noEmit -p . 2\u003e&1)\ncode=$?\necho \"tsc exit: $code\"\necho \"errores totales: $(printf '%s\\n' \"$out\" | grep -c 'error TS')\"\necho \"errores en src/lib/mailer.ts y src/pages/api/*.ts:\"\nprintf '%s\\n' \"$out\" | grep -E '^src/(lib/mailer\\.ts|pages/api/[a-z-]+\\.ts)' || echo \"(ninguno)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro","head":"2490adc06501c580955cb92098710be9ad1673fa","fecha":"2026-10-02T19:17:55-03:00","exit":0,"sha256":"c6aa42af2b9af9a1591c7a159558b2f9e7dff49f6f4d5463ea6cd1c260901580","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.9`** · exit 0 · 4 líneas, 0 omitidas · HEAD `2490adc06501` · 2026-10-02T19:17:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-email-reply-to/log-atm-web-astro`

```bash
# Type-check del proyecto; muestra los errores en los archivos del cambio y el total de errores.
out=$(npx tsc --noEmit -p . 2>&1)
code=$?
echo "tsc exit: $code"
echo "errores totales: $(printf '%s\n' "$out" | grep -c 'error TS')"
echo "errores en src/lib/mailer.ts y src/pages/api/*.ts:"
printf '%s\n' "$out" | grep -E '^src/(lib/mailer\.ts|pages/api/[a-z-]+\.ts)' || echo "(ninguno)"
```

```text
tsc exit: 2
errores totales: 4
errores en src/lib/mailer.ts y src/pages/api/*.ts:
src/lib/mailer.ts(2,30): error TS2307: Cannot find module 'cloudflare:workers' or its corresponding type declarations.
```
<!-- evidencia:fin apply-evidence.9 -->

Lectura del cierre: `apply-evidence.9` coincide con `apply-evidence.2` y no muestra errores en `src/pages/api/*.ts`; el único error en los archivos del cambio es el `TS2307` previo sobre `cloudflare:workers`. Tras el envío real, la fase detuvo `astro dev` y borró la copia de `.dev.vars` del worktree.
