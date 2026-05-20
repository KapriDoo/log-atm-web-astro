import { formatDateCL } from "./mailer";

type Row = [label: string, value: string | undefined | null];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRows(rows: Row[]): { html: string; text: string } {
  const visible = rows.filter(([, v]) => v != null && String(v).trim() !== "");
  const htmlRows = visible
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;vertical-align:top;">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(
          String(v),
        )}</td></tr>`,
    )
    .join("");
  const html = `<table style="border-collapse:collapse;font-family:Inter,system-ui,sans-serif;font-size:14px;color:#111827;width:100%;max-width:640px;">${htmlRows}</table>`;
  const text = visible.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

type Meta = { ip: string; userAgent: string; formType: string; folio?: string };

function wrap(
  title: string,
  rowsBlock: { html: string; text: string },
  meta: Meta,
): { html: string; text: string } {
  const when = formatDateCL();
  const footer: Row[] = [
    ["Formulario", meta.formType],
    ["Recibido", when],
    ["IP", meta.ip],
    ["User-Agent", meta.userAgent],
  ];
  const f = renderRows(footer);
  const html = `<!doctype html><html><body style="background:#f3f4f6;padding:24px;margin:0;font-family:Inter,system-ui,sans-serif;color:#111827;">
<div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
<h2 style="margin:0 0 16px 0;font-size:18px;color:#1f2937;">${escapeHtml(title)}</h2>
${rowsBlock.html}
<h3 style="margin:24px 0 8px 0;font-size:14px;color:#6b7280;">Metadatos</h3>
${f.html}
</div></body></html>`;
  const text = `${title}\n\n${rowsBlock.text}\n\n— Metadatos —\n${f.text}\n`;
  return { html, text };
}

// ============ Contacto ============
export function buildContactoEmail(
  d: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    service?: string;
    route?: string;
    message?: string;
  },
  meta: Meta,
): { subject: string; html: string; text: string; replyTo: string } {
  const subject = `[Web · Contacto] ${d.name} — ${d.service || "sin servicio"}`;
  const rows: Row[] = [
    ["Nombre", d.name],
    ["Empresa", d.company],
    ["Email", d.email],
    ["Teléfono", d.phone],
    ["Servicio", d.service],
    ["Ruta", d.route],
    ["Mensaje", d.message],
  ];
  const body = renderRows(rows);
  const { html, text } = wrap("Nuevo contacto desde el sitio", body, meta);
  return { subject, html, text, replyTo: d.email };
}

// ============ Cotización rápida ============
export function buildCotizacionRapidaEmail(
  d: {
    mode?: string;
    origin?: string;
    destination?: string;
    volume?: string;
    email?: string;
    phone?: string;
    preference?: string;
  },
  meta: Meta,
): { subject: string; html: string; text: string; replyTo?: string } {
  const subject = `[Web · Cotización rápida] ${d.mode || "—"} · ${d.origin || "—"} → ${d.destination || "—"}`;
  const rows: Row[] = [
    ["Modalidad", d.mode],
    ["Origen", d.origin],
    ["Destino", d.destination],
    ["Volumen", d.volume],
    ["Email", d.email],
    ["Teléfono", d.phone],
    ["Canal preferido", d.preference],
  ];
  const body = renderRows(rows);
  const { html, text } = wrap("Cotización rápida (60 seg)", body, meta);
  return { subject, html, text, replyTo: d.email || undefined };
}

// ============ Cotización 4 pasos ============
export function buildCotizacion4Email(
  d: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    notes?: string;
    modality?: string;
    origin?: string;
    dest?: string;
    incoterm?: string;
    date?: string;
    cargoType?: string;
    volume?: string | number;
    weight?: string | number;
    containerCount?: string | number;
    containerType?: string;
    services?: string[] | string;
  },
  meta: Meta,
): { subject: string; html: string; text: string; replyTo: string } {
  const folioSuffix = meta.folio ? ` — Folio ${meta.folio}` : "";
  const subject = `[Web · Cotización 4 pasos] ${d.name} — ${d.modality || "—"} · ${d.origin || "—"} → ${d.dest || "—"}${folioSuffix}`;
  const servicesStr = Array.isArray(d.services)
    ? d.services.join(", ")
    : typeof d.services === "string"
      ? d.services
      : "";
  const rows: Row[] = [
    ...(meta.folio ? [["Folio", meta.folio] as Row] : []),
    ["Modalidad", d.modality],
    ["Origen", d.origin],
    ["Destino", d.dest],
    ["Incoterm", d.incoterm],
    ["Fecha estimada", d.date],
    ["Tipo de carga", d.cargoType],
    ["Volumen (m³)", d.volume != null ? String(d.volume) : ""],
    ["Peso (kg)", d.weight != null ? String(d.weight) : ""],
    ["N° contenedores", d.containerCount != null ? String(d.containerCount) : ""],
    ["Tipo contenedor", d.containerType],
    ["Servicios adicionales", servicesStr],
    ["Nombre", d.name],
    ["Empresa", d.company],
    ["Email", d.email],
    ["Teléfono", d.phone],
    ["Notas", d.notes],
  ];
  const body = renderRows(rows);
  const { html, text } = wrap("Cotización (4 pasos)", body, meta);
  return { subject, html, text, replyTo: d.email };
}
