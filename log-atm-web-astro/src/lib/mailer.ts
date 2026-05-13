import { WorkerMailer } from "worker-mailer";
import { env as cfEnv } from "cloudflare:workers";

export type MailEnv = {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_SECURE?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  MAIL_TO?: string;
};

/**
 * Resuelve env desde el runtime de Cloudflare via `cloudflare:workers`.
 * En dev con platformProxy lee `.dev.vars`. En prod lee bindings del worker.
 */
export function resolveMailEnv(): MailEnv {
  return cfEnv as unknown as MailEnv;
}

function require_(env: MailEnv, key: keyof MailEnv): string {
  const v = env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

export async function sendMail(
  env: MailEnv,
  opts: {
    subject: string;
    replyTo?: string;
    html: string;
    text: string;
  },
): Promise<void> {
  const host = require_(env, "SMTP_HOST");
  const user = require_(env, "SMTP_USER");
  const pass = require_(env, "SMTP_PASS");
  const to = require_(env, "MAIL_TO");
  const port = Number(env.SMTP_PORT ?? 465);
  const secure = String(env.SMTP_SECURE ?? "true") === "true";

  const mailer = await WorkerMailer.connect({
    credentials: { username: user, password: pass },
    authType: ["plain", "login"],
    host,
    port,
    secure,
  });

  try {
    await mailer.send({
      from: { name: "Formulario Web", email: user },
      to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
  } finally {
    try {
      // worker-mailer mantiene el socket; cerrarlo libera el conn.
      // En Workers, esto también permite que el isolate termine limpio.
      await (mailer as unknown as { close?: () => Promise<void> }).close?.();
    } catch {
      /* noop */
    }
  }
}

export function formatDateCL(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("es-CL", {
      timeZone: "America/Santiago",
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(d);
  } catch {
    return d.toISOString();
  }
}

export function clientIP(request: Request): string {
  const h = request.headers;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xr = h.get("x-real-ip");
  if (xr) return xr.trim();
  return "desconocida";
}
