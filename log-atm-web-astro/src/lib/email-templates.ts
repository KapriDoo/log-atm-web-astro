import { formatDateCL } from "./mailer";
import { SITE } from "./constants";

type Row = [label: string, value: string | undefined | null];

// Tokens de color de marca (hex inline — sin CSS vars, compatible con Gmail/Outlook)
const C = {
  headerBg:      "#112236",   // banda header (primary-900)
  sectionBg:     "#4A7BB5",   // banda encabezado de sección (primary-500)
  rowAlt:        "#eef4fb",   // fila par (primary-50)
  rowBase:       "#ffffff",   // fila impar
  pageBg:        "#f8f7f6",   // fondo de página (neutral-50)
  text:          "#211f1c",   // texto principal (neutral-900)
  textMuted:     "#6e6963",   // texto secundario / metadatos (neutral-600)
  border:        "#e1dedb",   // bordes y divisores (neutral-200)
  onDark:        "#ffffff",   // texto sobre banda oscura
  taglineOnDark: "#a9c2e0",   // tagline tenue sobre header azul marino
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renderiza filas con alternancia de fondo por índice visible
function renderRows(rows: Row[]): { html: string; text: string } {
  const visible = rows.filter(([, v]) => v != null && String(v).trim() !== "");
  const htmlRows = visible
    .map(([k, v], idx) => {
      const bg = idx % 2 === 0 ? C.rowBase : C.rowAlt;
      return `<tr bgcolor="${bg}" style="background:${bg};">` +
        `<td style="padding:8px 16px;border-bottom:1px solid ${C.border};font-weight:600;vertical-align:top;color:${C.text};font-size:13px;width:38%;">${escapeHtml(k)}</td>` +
        `<td style="padding:8px 16px;border-bottom:1px solid ${C.border};vertical-align:top;color:${C.text};font-size:13px;white-space:pre-wrap;">${escapeHtml(String(v))}</td>` +
        `</tr>`;
    })
    .join("");
  const html = htmlRows
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">${htmlRows}</table>`
    : "";
  const text = visible.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

// Renderiza una sección con encabezado de banda azul + filas alternadas
function renderSection(title: string, rows: Row[]): { html: string; text: string } {
  const { html: rowsHtml, text: rowsText } = renderRows(rows);
  if (!rowsHtml) return { html: "", text: "" };
  const html =
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;margin-bottom:4px;">` +
    `<tr><td colspan="2" bgcolor="${C.sectionBg}" style="background:${C.sectionBg};color:${C.onDark};font-weight:700;padding:10px 16px;font-size:13px;font-family:Arial,sans-serif;">${escapeHtml(title)}</td></tr>` +
    `</table>` +
    rowsHtml;
  const text = `\n=== ${title.toUpperCase()} ===\n${rowsText}`;
  return { html, text };
}

// Header de marca: banda #112236 con logo + wordmark de texto + tagline
function brandHeader(): string {
  return (
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">` +
    `<tr>` +
    `<td bgcolor="${C.headerBg}" style="background:${C.headerBg};padding:24px 32px;">` +
    `<img src="${SITE.url}/logo.png" alt="LOG ATM" width="140" style="display:block;border:0;outline:none;max-width:140px;height:auto;" />` +
    `<div style="font-family:Arial,sans-serif;font-weight:700;font-size:16px;color:${C.onDark};margin-top:6px;letter-spacing:0.05em;">LOG ATM</div>` +
    `<div style="font-family:Arial,sans-serif;font-size:11px;color:${C.taglineOnDark};margin-top:3px;letter-spacing:0.12em;">LOGÍSTICA A TU MEDIDA</div>` +
    `</td>` +
    `</tr>` +
    `</table>`
  );
}

// Footer corporativo: dirección, web y tagline de marca
function corporateFooter(): string {
  return (
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">` +
    `<tr>` +
    `<td align="center" style="padding:20px 32px;font-family:Arial,sans-serif;font-size:12px;color:${C.textMuted};text-align:center;">` +
    `<div>${escapeHtml(SITE.address)}</div>` +
    `<div style="margin-top:4px;"><a href="${SITE.url}" style="color:${C.textMuted};text-decoration:none;">logatm.com</a></div>` +
    `<div style="margin-top:4px;letter-spacing:0.08em;font-size:11px;">LOGÍSTICA A TU MEDIDA</div>` +
    `</td>` +
    `</tr>` +
    `</table>`
  );
}

type Meta = { ip: string; userAgent: string; formType: string; folio?: string };

// Metadatos técnicos del envío (sin banda de sección — son secundarios por jerarquía)
function techMeta(meta: Meta): { html: string; text: string } {
  const cuando = formatDateCL();
  const htmlRows =
    `<tr><td style="padding:5px 16px;font-size:11px;color:${C.textMuted};width:38%;font-family:Arial,sans-serif;font-weight:600;">Formulario</td>` +
    `<td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;">${escapeHtml(meta.formType)}</td></tr>` +
    `<tr><td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;font-weight:600;">Recibido</td>` +
    `<td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;">${escapeHtml(cuando)}</td></tr>` +
    `<tr><td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;font-weight:600;">IP</td>` +
    `<td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;">${escapeHtml(meta.ip)}</td></tr>` +
    `<tr><td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;font-weight:600;">User-Agent</td>` +
    `<td style="padding:5px 16px;font-size:11px;color:${C.textMuted};font-family:Arial,sans-serif;">${escapeHtml(meta.userAgent)}</td></tr>`;
  const html =
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid ${C.border};margin-top:8px;">` +
    htmlRows +
    `</table>`;
  const text = `Formulario: ${meta.formType}\nRecibido: ${cuando}\nIP: ${meta.ip}\nUser-Agent: ${meta.userAgent}`;
  return { html, text };
}

// Wrapper principal: ensambla header de marca + título + cuerpo + footer corporativo + metadatos técnicos
function wrap(
  title: string,
  bodyBlock: { html: string; text: string },
  meta: Meta,
): { html: string; text: string } {
  const tech = techMeta(meta);
  const html =
    `<!doctype html><html><body style="margin:0;padding:0;background:${C.pageBg};font-family:Arial,sans-serif;">` +
    `<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.pageBg};font-family:Arial,sans-serif;">` +
    `<tr><td align="center" style="padding:24px 16px;">` +
    `<table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:${C.rowBase};border-collapse:collapse;" align="center">` +
    `<tr><td>` +
    brandHeader() +
    `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">` +
    `<tr><td style="padding:24px 32px 16px;font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:${C.text};">${escapeHtml(title)}</td></tr>` +
    `</table>` +
    `<div style="padding:0 0 8px 0;">` +
    bodyBlock.html +
    `</div>` +
    corporateFooter() +
    tech.html +
    `</td></tr>` +
    `</table>` +
    `</td></tr>` +
    `</table>` +
    `</body></html>`;
  const text = `${title.toUpperCase()}\n\n${bodyBlock.text}\n\n---\n${tech.text}`;
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
  const secContacto = renderSection("Datos de contacto", [
    ["Nombre",   d.name],
    ["Empresa",  d.company],
    ["Email",    d.email],
    ["Teléfono", d.phone],
    ["Servicio", d.service],
    ["Ruta",     d.route],
    ["Mensaje",  d.message],
  ]);
  const bodyBlock = {
    html: secContacto.html,
    text: secContacto.text,
  };
  const { html, text } = wrap("Nuevo contacto desde el sitio", bodyBlock, meta);
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
  const secDetalle = renderSection("Detalle de envío", [
    ["Modalidad", d.mode],
    ["Origen",    d.origin],
    ["Destino",   d.destination],
    ["Volumen",   d.volume],
  ]);
  const secContacto = renderSection("Contacto", [
    ["Email",           d.email],
    ["Teléfono",        d.phone],
    ["Canal preferido", d.preference],
  ]);
  const bodyBlock = {
    html: secDetalle.html + secContacto.html,
    text: secDetalle.text + secContacto.text,
  };
  const { html, text } = wrap("Cotización rápida (60 seg)", bodyBlock, meta);
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
  const secDetalle = renderSection("Detalle de envío", [
    ["Folio",          meta.folio ?? null],
    ["Modalidad",      d.modality],
    ["Origen",         d.origin],
    ["Destino",        d.dest],
    ["Incoterm",       d.incoterm],
    ["Fecha estimada", d.date],
  ]);
  const secCarga = renderSection("Información de carga", [
    ["Tipo de carga",         d.cargoType],
    ["Volumen (m³)",          d.volume != null ? String(d.volume) : ""],
    ["Peso (kg)",             d.weight != null ? String(d.weight) : ""],
    ["N° contenedores",       d.containerCount != null ? String(d.containerCount) : ""],
    ["Tipo contenedor",       d.containerType],
    ["Servicios adicionales", servicesStr],
  ]);
  const secContacto = renderSection("Contacto", [
    ["Nombre",   d.name],
    ["Empresa",  d.company],
    ["Email",    d.email],
    ["Teléfono", d.phone],
    ["Notas",    d.notes],
  ]);
  const bodyBlock = {
    html: secDetalle.html + secCarga.html + secContacto.html,
    text: secDetalle.text + secCarga.text + secContacto.text,
  };
  const { html, text } = wrap("Cotización (4 pasos)", bodyBlock, meta);
  return { subject, html, text, replyTo: d.email };
}
