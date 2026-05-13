import type { APIRoute } from "astro";
import { clientIP, resolveMailEnv, sendMail } from "../../lib/mailer";
import {
  clean,
  hasHeaderInjection,
  isEmail,
  isPlainObject,
  LIMITS,
  type FieldErrors,
} from "../../lib/validate";
import { buildContactoEmail } from "../../lib/email-templates";

export const prerender = false;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, error: "content-type" });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid-json" });
  }
  if (!isPlainObject(raw)) {
    return json(400, { ok: false, error: "invalid-payload" });
  }

  // Honeypot — descarte silencioso
  if (clean(raw.website, 200)) return json(200, { ok: true });

  const data = {
    name: clean(raw.name, LIMITS.name),
    company: clean(raw.company, LIMITS.company),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    service: clean(raw.service, LIMITS.service),
    route: clean(raw.route, LIMITS.route),
    message: clean(raw.message, LIMITS.message),
  };

  const fields: FieldErrors = {};
  if (!data.name) fields.name = "Requerido.";
  else if (hasHeaderInjection(data.name)) fields.name = "Caracteres no válidos.";
  if (!data.email) fields.email = "Requerido.";
  else if (!isEmail(data.email)) fields.email = "Formato inválido.";
  else if (hasHeaderInjection(data.email)) fields.email = "Caracteres no válidos.";
  if (hasHeaderInjection(data.phone)) fields.phone = "Caracteres no válidos.";
  if (hasHeaderInjection(data.company)) fields.company = "Caracteres no válidos.";

  if (Object.keys(fields).length > 0) {
    return json(400, { ok: false, error: "validation", fields });
  }

  try {
    const meta = {
      ip: clientIP(request),
      userAgent: request.headers.get("user-agent") ?? "desconocido",
      formType: "Contacto",
    };
    const mail = buildContactoEmail(data, meta);
    await sendMail(resolveMailEnv(), mail);
    return json(200, { ok: true });
  } catch (err) {
    console.error("[/api/contacto] error:", err);
    return json(500, { ok: false, error: "server" });
  }
};

export const ALL: APIRoute = () => json(405, { ok: false, error: "method" });
