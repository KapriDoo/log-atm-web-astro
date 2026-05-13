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
import { buildCotizacion4Email } from "../../lib/email-templates";

export const prerender = false;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

function normServices(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => clean(x, 60)).filter(Boolean);
  if (typeof v === "object" && v !== null) {
    return Object.entries(v as Record<string, unknown>)
      .filter(([, val]) => val === true || val === "true")
      .map(([k]) => k);
  }
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

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
    name: clean(raw.name, LIMITS.name),
    company: clean(raw.company, LIMITS.company),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    notes: clean(raw.notes, LIMITS.notes),
    modality: clean(raw.modality, LIMITS.short),
    origin: clean(raw.origin, LIMITS.short),
    dest: clean(raw.dest, LIMITS.short),
    incoterm: clean(raw.incoterm, LIMITS.short),
    date: clean(raw.date, LIMITS.short),
    cargoType: clean(raw.cargoType, LIMITS.short),
    volume: clean(raw.volume, LIMITS.short),
    weight: clean(raw.weight, LIMITS.short),
    containerCount: clean(raw.containerCount, LIMITS.short),
    containerType: clean(raw.containerType, LIMITS.short),
    services: normServices(raw.services),
  };

  const fields: FieldErrors = {};
  if (!data.name) fields.name = "Requerido.";
  else if (hasHeaderInjection(data.name)) fields.name = "Caracteres no válidos.";
  if (!data.email) fields.email = "Requerido.";
  else if (!isEmail(data.email)) fields.email = "Formato inválido.";
  else if (hasHeaderInjection(data.email)) fields.email = "Caracteres no válidos.";
  if (!data.modality) fields.modality = "Requerido.";
  if (!data.origin) fields.origin = "Requerido.";
  if (!data.dest) fields.dest = "Requerido.";
  if (hasHeaderInjection(data.phone)) fields.phone = "Caracteres no válidos.";
  if (hasHeaderInjection(data.company)) fields.company = "Caracteres no válidos.";

  if (Object.keys(fields).length > 0) {
    return json(400, { ok: false, error: "validation", fields });
  }

  try {
    const meta = {
      ip: clientIP(request),
      userAgent: request.headers.get("user-agent") ?? "desconocido",
      formType: "Cotización (4 pasos)",
    };
    const mail = buildCotizacion4Email(data, meta);
    await sendMail(resolveMailEnv(), mail);
    return json(200, { ok: true });
  } catch (err) {
    console.error("[/api/cotizacion] error:", err);
    return json(500, { ok: false, error: "server" });
  }
};

export const ALL: APIRoute = () => json(405, { ok: false, error: "method" });
