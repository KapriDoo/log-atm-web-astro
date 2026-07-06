import { formatDateCL } from "./mailer";

// ============================================================
// Utilidades base — conservar escapeHtml sin modificaciones
// ============================================================

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// Tipos internos — NO exportar
// ============================================================

type BadgeColor = "blue" | "green" | "amber";

type GridRow = {
  label: string;
  value: string | undefined | null;
  kind?: "text" | "email" | "tel" | "pill"; // default "text"
};

type RouteInput =
  | { mode: "pair"; origin?: string | null; dest?: string | null }
  | { mode: "free"; text?: string | null };

// Tipo exportado — conservar con los mismos campos
export type Meta = { ip: string; userAgent: string; formType: string; folio?: string };

// ============================================================
// Utilidad — sanitización de teléfono
// ============================================================

function cleanPhone(phone: string): string {
  const trimmed = phone.trim();
  const plus = trimmed.startsWith("+") ? "+" : "";
  return plus + trimmed.replace(/[^\d]/g, "");
}

// ============================================================
// BLOQUE 2 — Helpers de estructura base (header, footer, wrapper)
// ============================================================

/** Envuelve todas las secciones en el documento HTML completo */
function buildEmailWrapper(sections: string): string {
  return (
    `<!doctype html><html lang="es"><head><meta charset="UTF-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `</head><body style="margin:0;padding:0;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" ` +
    `style="background:#f8f7f6;font-family:'Inter',Arial,sans-serif;color:#211f1c;">` +
    `<tr><td align="center" style="padding:32px 16px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" ` +
    `style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;` +
    `box-shadow:0 4px 16px 0 rgba(74,123,181,.12);">` +
    sections +
    `</table></td></tr></table></body></html>`
  );
}

/** Produce la fila de encabezado con gradiente, logo textual y badge de formulario */
function buildEmailHeader(badge: { color: BadgeColor; label: string }): string {
  // Estilos del badge según color de formulario
  const badgeStyles: Record<BadgeColor, string> = {
    blue: `background:rgba(74,123,181,.18);border:1px solid rgba(135,170,229,.6);color:#9cc0ec;`,
    green: `background:rgba(62,185,120,.18);border:1px solid rgba(135,211,176,.6);color:#87d3b0;`,
    amber: `background:rgba(245,180,80,.18);border:1px solid rgba(245,200,130,.6);color:#f0c074;`,
  };

  return (
    `<tr><td style="background:#112236;background-image:linear-gradient(135deg,#112236 0%,#1c3554 100%);padding:32px 32px 28px;color:#ffffff;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">` +
    `<tr>` +
    // Logo textual — lado izquierdo
    `<td style="vertical-align:middle;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0">` +
    `<tr>` +
    `<td style="vertical-align:middle;padding-right:12px;">` +
    `<div style="width:40px;height:40px;background:#ffffff;border-radius:10px;display:inline-block;vertical-align:middle;line-height:40px;text-align:center;">` +
    `<span style="color:#4A7BB5;font-family:'Outfit',Arial,sans-serif;font-weight:900;font-size:18px;">A</span>` +
    `</div>` +
    `</td>` +
    `<td style="vertical-align:middle;">` +
    `<div style="font-family:'Outfit',Arial,sans-serif;font-weight:800;font-size:18px;color:#ffffff;line-height:1;">LOG ATM</div>` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#aec7e5;margin-top:3px;">Logística a tu medida</div>` +
    `</td>` +
    `</tr>` +
    `</table>` +
    `</td>` +
    // Badge — lado derecho
    `<td align="right" style="vertical-align:middle;">` +
    `<span style="display:inline-block;${badgeStyles[badge.color]}font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:9999px;">${badge.label}</span>` +
    `</td>` +
    `</tr>` +
    `</table>` +
    `</td></tr>`
  );
}

/** Produce la fila de pie de página con fondo oscuro y datos de la empresa */
function buildEmailFooter(): string {
  return (
    `<tr><td style="background:#0a1624;padding:24px 32px;color:#aec7e5;font-family:'Inter',Arial,sans-serif;font-size:13px;line-height:1.55;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">` +
    `<tr>` +
    `<td style="vertical-align:top;">` +
    `<div style="font-family:'Outfit',Arial,sans-serif;font-weight:700;font-size:15px;color:#ffffff;margin-bottom:4px;">LOG ATM</div>` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#658fc3;">Logística a tu medida</div>` +
    `</td>` +
    `<td align="right" style="vertical-align:top;font-size:12px;color:#658fc3;">` +
    `Av. Pdte Kennedy 5600, Of. 507<br>Vitacura &middot; Santiago &middot; Chile` +
    `</td>` +
    `</tr>` +
    `</table>` +
    `<div style="border-top:1px solid rgba(255,255,255,.08);margin-top:18px;padding-top:14px;font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.04em;color:#658fc3;text-align:center;">` +
    `Este correo se generó automáticamente desde logatm.com &middot; No respondas a esta dirección` +
    `</div>` +
    `</td></tr>`
  );
}

// ============================================================
// BLOQUE 3 — Helpers de sección de contenido
// ============================================================

/** Sección hero: kicker, título y subtítulo descriptivo */
function buildHeroSection(args: { kicker: string; title: string; subtitle: string }): string {
  return (
    `<tr><td style="padding:32px 32px 8px;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#339965;font-weight:600;margin-bottom:8px;">${args.kicker}</div>` +
    `<h1 style="font-family:'Outfit',Arial,sans-serif;font-weight:800;font-size:26px;line-height:1.15;letter-spacing:-.02em;color:#211f1c;margin:0 0 8px;">${args.title}</h1>` +
    `<p style="font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.55;color:#544f4a;margin:0;">${args.subtitle}</p>` +
    `</td></tr>`
  );
}

/** Sección de ruta: par origen→destino o texto libre. Retorna "" si no hay dato. */
function buildRouteSection(route: RouteInput): string {
  if (route.mode === "free") {
    // Texto libre (formulario de contacto)
    const text = route.text;
    if (text == null || String(text).trim() === "") return "";
    return (
      `<tr><td style="padding:24px 32px 8px;">` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eef4fb;border-radius:14px;padding:0;">` +
      `<tr><td style="padding:20px 24px;">` +
      `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#3b6497;margin-bottom:4px;">Ruta</div>` +
      `<div style="font-family:'Outfit',Arial,sans-serif;font-weight:700;font-size:18px;color:#112236;letter-spacing:-.01em;">${escapeHtml(String(text))}</div>` +
      `</td></tr>` +
      `</table>` +
      `</td></tr>`
    );
  }

  // Par origen→destino (cotizaciones)
  const { origin, dest } = route;
  const hasOrigin = origin != null && String(origin).trim() !== "";
  const hasDest = dest != null && String(dest).trim() !== "";
  if (!hasOrigin && !hasDest) return "";

  return (
    `<tr><td style="padding:24px 32px 8px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eef4fb;border-radius:14px;padding:0;">` +
    `<tr><td style="padding:20px 24px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">` +
    `<tr>` +
    // Origen
    `<td style="vertical-align:middle;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#3b6497;margin-bottom:4px;">Origen</div>` +
    `<div style="font-family:'Outfit',Arial,sans-serif;font-weight:700;font-size:18px;color:#112236;letter-spacing:-.01em;">${escapeHtml(hasOrigin ? String(origin) : "—")}</div>` +
    `</td>` +
    // Flecha central
    `<td align="center" style="vertical-align:middle;width:60px;">` +
    `<span style="color:#4A7BB5;font-size:24px;font-weight:600;">&rarr;</span>` +
    `</td>` +
    // Destino
    `<td align="right" style="vertical-align:middle;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#3b6497;margin-bottom:4px;">Destino</div>` +
    `<div style="font-family:'Outfit',Arial,sans-serif;font-weight:700;font-size:18px;color:#112236;letter-spacing:-.01em;">${escapeHtml(hasDest ? String(dest) : "—")}</div>` +
    `</td>` +
    `</tr>` +
    `</table>` +
    `</td></tr>` +
    `</table>` +
    `</td></tr>`
  );
}

/** Grilla de datos con label de sección, filas filtradas y links condicionales */
function buildDataGrid(args: { label: string; rows: GridRow[] }): string {
  // Filtrar filas vacías
  const visible = args.rows.filter(
    (r) => r.value != null && String(r.value).trim() !== "",
  );
  if (visible.length === 0) return "";

  const rowsHtml = visible
    .map((row, idx) => {
      const isLast = idx === visible.length - 1;
      const borderStyle = isLast ? "" : "border-bottom:1px solid #e1dedb;";
      const val = String(row.value);
      const kind = row.kind ?? "text";

      let valueHtml: string;
      if (kind === "email") {
        valueHtml = `<a href="mailto:${escapeHtml(val)}" style="color:#4A7BB5;text-decoration:none;font-weight:500;">${escapeHtml(val)}</a>`;
      } else if (kind === "tel") {
        valueHtml = `<a href="tel:${cleanPhone(val)}" style="color:#4A7BB5;text-decoration:none;font-weight:500;">${escapeHtml(val)}</a>`;
      } else if (kind === "pill") {
        valueHtml = `<span style="display:inline-block;background:#d7e4f4;color:#2b4e78;font-family:'JetBrains Mono','SF Mono',monospace;font-size:12px;font-weight:600;padding:4px 10px;border-radius:9999px;">${escapeHtml(val)}</span>`;
      } else {
        valueHtml = `<span style="font-weight:500;">${escapeHtml(val)}</span>`;
      }

      return (
        `<tr>` +
        `<td style="padding:14px 0;${borderStyle}width:140px;vertical-align:middle;">` +
        `<span style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6e6963;">${escapeHtml(row.label)}</span>` +
        `</td>` +
        `<td style="padding:14px 0;${borderStyle}font-family:'Inter',Arial,sans-serif;font-size:15px;color:#211f1c;">` +
        valueHtml +
        `</td>` +
        `</tr>`
      );
    })
    .join("");

  return (
    `<tr><td style="padding:24px 32px 8px;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6e6963;font-weight:600;margin-bottom:14px;">${escapeHtml(args.label)}</div>` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#211f1c;">` +
    rowsHtml +
    `</table>` +
    `</td></tr>`
  );
}

/** Bloque de mensaje/notas con borde izquierdo azul. Retorna "" si el mensaje está vacío. */
function buildMessageBlock(args: { label: string; message?: string | null }): string {
  const msg = args.message;
  if (msg == null || String(msg).trim() === "") return "";

  return (
    `<tr><td style="padding:8px 32px 24px;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6e6963;font-weight:600;margin-bottom:10px;">${escapeHtml(args.label)}</div>` +
    `<div style="background:#f8f7f6;border-left:3px solid #4A7BB5;padding:18px 22px;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.6;color:#37332f;border-radius:0 12px 12px 0;">` +
    escapeHtml(String(msg)) +
    `</div>` +
    `</td></tr>`
  );
}

/** Botones CTA condicionales (email y/o WhatsApp). Retorna "" si no hay ningún dato de contacto. */
function buildCTAButtons(args: {
  email?: string | null;
  phone?: string | null;
  mailSubject: string;
  waText: string;
}): string {
  const hasEmail = args.email != null && String(args.email).trim() !== "";
  const hasPhone = args.phone != null && String(args.phone).trim() !== "";
  if (!hasEmail && !hasPhone) return "";

  const btnStyle = `font-family:'Outfit',Arial,sans-serif;font-weight:700;font-size:15px;text-align:center;text-decoration:none;padding:14px 20px;border-radius:9999px;display:block;`;

  let buttonsHtml: string;

  if (hasEmail && hasPhone) {
    // Dos botones lado a lado — tabla de 2 columnas al 50%
    const waNumber = cleanPhone(String(args.phone)).replace(/^\+/, "");
    buttonsHtml =
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">` +
      `<tr>` +
      `<td style="padding-right:8px;width:50%;">` +
      `<a href="mailto:${escapeHtml(String(args.email))}?subject=${encodeURIComponent(args.mailSubject)}" style="${btnStyle}background:#4A7BB5;color:#ffffff;">Responder por email</a>` +
      `</td>` +
      `<td style="padding-left:8px;width:50%;">` +
      `<a href="https://wa.me/${waNumber}?text=${encodeURIComponent(args.waText)}" style="${btnStyle}background:#25D366;color:#ffffff;">WhatsApp</a>` +
      `</td>` +
      `</tr>` +
      `</table>`;
  } else if (hasEmail) {
    // Solo email — full width
    buttonsHtml =
      `<a href="mailto:${escapeHtml(String(args.email))}?subject=${encodeURIComponent(args.mailSubject)}" style="${btnStyle}background:#4A7BB5;color:#ffffff;">Responder por email</a>`;
  } else {
    // Solo WhatsApp — full width
    const waNumber = cleanPhone(String(args.phone)).replace(/^\+/, "");
    buttonsHtml =
      `<a href="https://wa.me/${waNumber}?text=${encodeURIComponent(args.waText)}" style="${btnStyle}background:#25D366;color:#ffffff;">WhatsApp</a>`;
  }

  return (
    `<tr><td style="padding:8px 32px 28px;">` +
    buttonsHtml +
    `<p style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#898580;text-align:center;margin:14px 0 0;letter-spacing:.04em;">SLA cliente &middot; responder a la brevedad</p>` +
    `</td></tr>`
  );
}

/** Caja de metadatos técnicos — siempre presente. Folio como primera fila si está disponible. */
function buildMetadataBox(meta: Meta): string {
  const folioRow =
    meta.folio
      ? `<tr><td style="width:90px;color:#898580;">Folio</td><td><strong style="color:#211f1c;">${escapeHtml(meta.folio)}</strong></td></tr>`
      : "";

  return (
    `<tr><td style="padding:0 32px 24px;">` +
    `<div style="background:#f8f7f6;border:1px solid #e1dedb;border-radius:12px;padding:16px 20px;">` +
    `<div style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#898580;margin-bottom:8px;">Metadatos técnicos</div>` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;color:#544f4a;line-height:1.7;">` +
    folioRow +
    `<tr><td style="width:90px;color:#898580;">Formulario</td><td>${escapeHtml(meta.formType)}</td></tr>` +
    `<tr><td style="color:#898580;">Recibido</td><td>${formatDateCL()}</td></tr>` +
    `<tr><td style="color:#898580;">IP</td><td>${escapeHtml(meta.ip)}</td></tr>` +
    `<tr><td style="vertical-align:top;color:#898580;">User-Agent</td><td>${escapeHtml(meta.userAgent)}</td></tr>` +
    `</table>` +
    `</div>` +
    `</td></tr>`
  );
}

// ============================================================
// BLOQUE 4 — Builders exportados (firmas exactas preservadas)
// ============================================================

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

  // Subtítulo del hero compuesto con partes escapadas
  const heroSubtitle =
    `Nuevo mensaje desde el formulario de contacto` +
    (d.service ? ` sobre <strong style="color:#211f1c;">${escapeHtml(d.service)}</strong>` : "") +
    (d.route ? ` para la ruta ${escapeHtml(d.route)}` : "");

  // Título del hero: nombre + empresa en azul opcional
  const heroTitle =
    escapeHtml(d.name) +
    (d.company
      ? ` &middot; <span style="color:#4A7BB5;font-family:'Outfit',Arial,sans-serif;">${escapeHtml(d.company)}</span>`
      : "");

  const sections =
    buildEmailHeader({ color: "blue", label: "● Nuevo mensaje" }) +
    buildHeroSection({
      kicker: "━━━ Nuevo contacto",
      title: heroTitle,
      subtitle: heroSubtitle,
    }) +
    buildRouteSection({ mode: "free", text: d.route }) +
    buildDataGrid({
      label: "Datos del contacto",
      rows: [
        { label: "Nombre", value: d.name },
        { label: "Empresa", value: d.company },
        { label: "Email", value: d.email, kind: "email" },
        { label: "Teléfono", value: d.phone, kind: "tel" },
        { label: "Servicio", value: d.service, kind: "pill" },
      ],
    }) +
    buildMessageBlock({ label: "Mensaje del cliente", message: d.message }) +
    buildCTAButtons({
      email: d.email,
      phone: d.phone,
      mailSubject: `Re: ${subject}`,
      waText: `Hola ${d.name}, vi tu mensaje en logatm.com`,
    }) +
    buildMetadataBox(meta) +
    buildEmailFooter();

  const html = buildEmailWrapper(sections);

  // Versión texto plano — sin etiquetas HTML
  const textLines: string[] = [
    `[Web · Contacto] ${d.name} — ${d.service || "sin servicio"}`,
    "",
    `Nuevo mensaje desde el formulario de contacto` +
      (d.service ? ` sobre ${d.service}` : "") +
      (d.route ? ` para la ruta ${d.route}` : ""),
    "",
  ];
  if (d.route && d.route.trim() !== "") {
    textLines.push(`— Ruta —`, d.route, "");
  }
  textLines.push(`— Datos del contacto —`);
  if (d.name) textLines.push(`Nombre: ${d.name}`);
  if (d.company) textLines.push(`Empresa: ${d.company}`);
  if (d.email) textLines.push(`Email: ${d.email}`);
  if (d.phone) textLines.push(`Teléfono: ${d.phone}`);
  if (d.service) textLines.push(`Servicio: ${d.service}`);
  textLines.push("");
  if (d.message && d.message.trim() !== "") {
    textLines.push(`— Mensaje —`, d.message, "");
  }
  textLines.push(
    `— Metadatos —`,
    `Formulario: ${meta.formType}`,
    `Recibido: ${formatDateCL()}`,
    `IP: ${meta.ip}`,
    `User-Agent: ${meta.userAgent}`,
  );

  const text = textLines.join("\n");

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

  // Subtítulo del hero
  const heroSubtitle =
    `Solicita una cotización` +
    (d.mode ? ` <strong style="color:#211f1c;">${escapeHtml(d.mode)}</strong>` : "") +
    (d.origin || d.destination
      ? ` en la ruta ${escapeHtml(d.origin || "—")} &rarr; ${escapeHtml(d.destination || "—")}`
      : "");

  const sections =
    buildEmailHeader({ color: "green", label: "● Nuevo lead" }) +
    buildHeroSection({
      kicker: "━━━ Cotización rápida",
      title: escapeHtml(d.mode || "Cotización rápida"),
      subtitle: heroSubtitle,
    }) +
    buildRouteSection({ mode: "pair", origin: d.origin, dest: d.destination }) +
    buildDataGrid({
      label: "Datos del lead",
      rows: [
        { label: "Modalidad", value: d.mode, kind: "pill" },
        { label: "Volumen", value: d.volume },
        { label: "Email", value: d.email, kind: "email" },
        { label: "Teléfono", value: d.phone, kind: "tel" },
        { label: "Canal preferido", value: d.preference },
      ],
    }) +
    // Sin buildMessageBlock (cotización rápida no tiene campo de mensaje)
    buildCTAButtons({
      email: d.email,
      phone: d.phone,
      mailSubject: `Re: ${subject}`,
      waText: `Hola, vi tu solicitud de cotización en logatm.com`,
    }) +
    buildMetadataBox(meta) +
    buildEmailFooter();

  const html = buildEmailWrapper(sections);

  // Versión texto plano
  const textLines: string[] = [
    `[Web · Cotización rápida] ${d.mode || "—"} · ${d.origin || "—"} → ${d.destination || "—"}`,
    "",
    `Solicita una cotización` +
      (d.mode ? ` ${d.mode}` : "") +
      (d.origin || d.destination ? ` en la ruta ${d.origin || "—"} → ${d.destination || "—"}` : ""),
    "",
  ];
  if ((d.origin && d.origin.trim() !== "") || (d.destination && d.destination.trim() !== "")) {
    textLines.push(`— Ruta —`, `${d.origin || "—"} → ${d.destination || "—"}`, "");
  }
  textLines.push(`— Datos del lead —`);
  if (d.mode) textLines.push(`Modalidad: ${d.mode}`);
  if (d.volume) textLines.push(`Volumen: ${d.volume}`);
  if (d.email) textLines.push(`Email: ${d.email}`);
  if (d.phone) textLines.push(`Teléfono: ${d.phone}`);
  if (d.preference) textLines.push(`Canal preferido: ${d.preference}`);
  textLines.push(
    "",
    `— Metadatos —`,
    `Formulario: ${meta.formType}`,
    `Recibido: ${formatDateCL()}`,
    `IP: ${meta.ip}`,
    `User-Agent: ${meta.userAgent}`,
  );

  const text = textLines.join("\n");

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
  // Lógica de servicesStr y coerciones numéricas — preservada del código original
  const servicesStr = Array.isArray(d.services)
    ? d.services.join(", ")
    : typeof d.services === "string"
      ? d.services
      : "";
  const folioSuffix = meta.folio ? ` — Folio ${meta.folio}` : "";
  const subject = `[Web · Cotización 4 pasos] ${d.name} — ${d.modality || "—"} · ${d.origin || "—"} → ${d.dest || "—"}${folioSuffix}`;

  // Subtítulo del hero
  const heroSubtitle =
    `Solicita una propuesta para <strong style="color:#211f1c;">${escapeHtml(d.modality || "su carga")}</strong>` +
    (d.origin || d.dest
      ? ` en la ruta ${escapeHtml(d.origin || "—")} &rarr; ${escapeHtml(d.dest || "—")}`
      : "") +
    `.`;

  // Título del hero: nombre + empresa en azul opcional
  const heroTitle =
    escapeHtml(d.name) +
    (d.company
      ? ` &middot; <span style="color:#4A7BB5;font-family:'Outfit',Arial,sans-serif;">${escapeHtml(d.company)}</span>`
      : "");

  const sections =
    buildEmailHeader({ color: "amber", label: "● Cotización completa" }) +
    buildHeroSection({
      kicker: "━━━ Solicitud de cotización",
      title: heroTitle,
      subtitle: heroSubtitle,
    }) +
    buildRouteSection({ mode: "pair", origin: d.origin, dest: d.dest }) +
    buildDataGrid({
      label: "Detalle de la cotización",
      rows: [
        { label: "Modalidad", value: d.modality, kind: "pill" },
        { label: "Incoterm", value: d.incoterm },
        { label: "Fecha estimada", value: d.date },
        { label: "Tipo de carga", value: d.cargoType },
        { label: "Volumen (m³)", value: d.volume != null ? String(d.volume) : "" },
        { label: "Peso (kg)", value: d.weight != null ? String(d.weight) : "" },
        { label: "N° contenedores", value: d.containerCount != null ? String(d.containerCount) : "" },
        { label: "Tipo contenedor", value: d.containerType },
        { label: "Servicios adicionales", value: servicesStr },
        { label: "Nombre", value: d.name },
        { label: "Empresa", value: d.company },
        { label: "Email", value: d.email, kind: "email" },
        { label: "Teléfono", value: d.phone, kind: "tel" },
      ],
    }) +
    buildMessageBlock({ label: "Notas del cliente", message: d.notes }) +
    buildCTAButtons({
      email: d.email,
      phone: d.phone,
      mailSubject: `Re: ${subject}`,
      waText: `Hola ${d.name}, vi tu solicitud de cotización en logatm.com`,
    }) +
    buildMetadataBox(meta) + // folio como primera fila cuando meta.folio presente
    buildEmailFooter();

  const html = buildEmailWrapper(sections);

  // Versión texto plano
  const textLines: string[] = [
    `[Web · Cotización 4 pasos] ${d.name} — ${d.modality || "—"} · ${d.origin || "—"} → ${d.dest || "—"}${folioSuffix}`,
    "",
    `Solicita una propuesta para ${d.modality || "su carga"}` +
      (d.origin || d.dest ? ` en la ruta ${d.origin || "—"} → ${d.dest || "—"}` : "") +
      `.`,
    "",
  ];
  if ((d.origin && d.origin.trim() !== "") || (d.dest && d.dest.trim() !== "")) {
    textLines.push(`— Ruta —`, `${d.origin || "—"} → ${d.dest || "—"}`, "");
  }
  textLines.push(`— Detalle de la cotización —`);
  if (d.modality) textLines.push(`Modalidad: ${d.modality}`);
  if (d.incoterm) textLines.push(`Incoterm: ${d.incoterm}`);
  if (d.date) textLines.push(`Fecha estimada: ${d.date}`);
  if (d.cargoType) textLines.push(`Tipo de carga: ${d.cargoType}`);
  if (d.volume != null && String(d.volume).trim() !== "") textLines.push(`Volumen (m³): ${d.volume}`);
  if (d.weight != null && String(d.weight).trim() !== "") textLines.push(`Peso (kg): ${d.weight}`);
  if (d.containerCount != null && String(d.containerCount).trim() !== "") textLines.push(`N° contenedores: ${d.containerCount}`);
  if (d.containerType) textLines.push(`Tipo contenedor: ${d.containerType}`);
  if (servicesStr) textLines.push(`Servicios adicionales: ${servicesStr}`);
  if (d.name) textLines.push(`Nombre: ${d.name}`);
  if (d.company) textLines.push(`Empresa: ${d.company}`);
  if (d.email) textLines.push(`Email: ${d.email}`);
  if (d.phone) textLines.push(`Teléfono: ${d.phone}`);
  textLines.push("");
  if (d.notes && d.notes.trim() !== "") {
    textLines.push(`— Notas del cliente —`, d.notes, "");
  }
  textLines.push(`— Metadatos —`);
  if (meta.folio) textLines.push(`Folio: ${meta.folio}`);
  textLines.push(
    `Formulario: ${meta.formType}`,
    `Recibido: ${formatDateCL()}`,
    `IP: ${meta.ip}`,
    `User-Agent: ${meta.userAgent}`,
  );

  const text = textLines.join("\n");

  return { subject, html, text, replyTo: d.email };
}
