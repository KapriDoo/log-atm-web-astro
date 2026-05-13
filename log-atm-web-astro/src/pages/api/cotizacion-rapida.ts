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
import { buildCotizacionRapidaEmail } from "../../lib/email-templates";

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

  if (clean(raw.website, 200)) return json(200, { ok: true });

  const data = {
    mode: clean(raw.mode, LIMITS.short),
    origin: clean(raw.origin, LIMITS.short),
    destination: clean(raw.destination, LIMITS.short),
    volume: clean(raw.volume, LIMITS.short),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    preference: clean(raw.preference, LIMITS.short),
  };

  const fields: FieldErrors = {};
  if (!data.email && !data.phone) {
    fields.email = "Indica email o teléfono.";
    fields.phone = "Indica email o teléfono.";
  }
  if (data.email && !isEmail(data.email)) fields.email = "Formato inválido.";
  if (data.email && hasHeaderInjection(data.email))
    fields.email = "Caracteres no válidos.";
  if (data.phone && hasHeaderInjection(data.phone))
    fields.phone = "Caracteres no válidos.";

  if (Object.keys(fields).length > 0) {
    return json(400, { ok: false, error: "validation", fields });
  }

  try {
    const meta = {
      ip: clientIP(request),
      userAgent: request.headers.get("user-agent") ?? "desconocido",
      formType: "Cotización rápida (60 seg)",
    };
    const mail = buildCotizacionRapidaEmail(data, meta);
    await sendMail(resolveMailEnv(), mail);
    return json(200, { ok: true });
  } catch (err) {
    console.error("[/api/cotizacion-rapida] error:", err);
    return json(500, { ok: false, error: "server" });
  }
};

export const ALL: APIRoute = () => json(405, { ok: false, error: "method" });
