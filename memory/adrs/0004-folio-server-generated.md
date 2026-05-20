---
status: accepted
date: 2026-05-19
deciders: sdd-design
consulted: exploration.md, proposal.md, spec forms-email/quote-folio-server-generated
informed: sdd-apply, sdd-verify
capability: forms-email
tags: [adr, forms, identifiers, traceability]
---

# ADR 0004: Folio de cotización generado server-side sin persistencia en BD

## Contexto

El sitio LOG ATM tiene un wizard de cotización en `/cotizar` que culmina con un paso de confirmación mostrando un "folio" al usuario como referencia de su solicitud. La implementación actual genera el folio en el cliente con `'LA-' + String(Date.now()).slice(-6)`, lo que produce identificadores no únicos (dos navegadores con el mismo timestamp colisionan), no trazables (el equipo comercial no puede correlacionar el folio mostrado al usuario con el email recibido), y manipulables por cualquier consumidor del JS del cliente.

El stack del proyecto:

- **Runtime**: Cloudflare Workers (vía `@astrojs/cloudflare`).
- **Sin BD**: el proyecto no tiene capa de persistencia (ni D1, ni KV, ni Durable Objects configurados).
- **Email transport**: `worker-mailer` SMTP (`src/lib/mailer.ts`).
- **API actual**: `POST /api/cotizacion` retorna `{ ok: true }` sin folio.

Las opciones de diseño son:

1. **Folio server-generated efímero (sin persistencia)**: el endpoint genera un folio aleatorio en memoria al procesar el request, lo incluye en el email enviado al equipo y lo retorna en el JSON de respuesta. El folio no se almacena en ninguna BD; vive solo en (a) el email enviado y (b) la respuesta HTTP devuelta al cliente.
2. **Folio server-generated con persistencia (BD)**: el endpoint genera el folio, lo persiste en una tabla `quotes` y lo retorna. Permite búsqueda futura por folio.
3. **Folio cliente con `Date.now()` + entropía adicional (status quo mejorado)**: mantener generación en cliente pero con entropía mayor (`crypto.randomUUID().slice(0, 8)`).

## Decisión

Implementar **Opción 1: folio server-generated efímero sin persistencia**.

El folio se genera dentro del handler de `POST /api/cotizacion` justo después de la validación de payload y antes del intento de envío de email. Formato:

```
LA-{base36(Date.now())}{8-hex-chars-from-randomUUID}
```

Ejemplos:

- `LA-LX9K2A3F4B1C2D9E`
- `LA-LX9K30B7C8D9E0F1`

El folio se incluye en el cuerpo del email enviado al equipo (para que `buildCotizacion4Email` pueda referenciarlo en el asunto o cuerpo) y se devuelve al cliente en la respuesta JSON como `{ ok: true, folio: "LA-..." }`. El cliente lo lee del response y lo pinta en el paso de confirmación del wizard.

## Consecuencias

### Positivas

- **Unicidad efectiva**: `Date.now()` (ms) + 32 bits de entropía de UUID dan ~10^12+ combinaciones; colisión despreciable incluso con envíos simultáneos al pico esperado del negocio.
- **Trazabilidad fin-a-fin**: el folio mostrado al usuario es el mismo que aparece en el email del equipo comercial. Si el usuario contacta soporte mencionando "mi folio LA-X", el equipo puede buscar el email correspondiente.
- **Cero JS de generación en cliente**: el wizard no contiene `Date.now()` ni funciones de generación de folio, cumpliendo el AC de la spec `quote-folio-server-generated`.
- **Sin nueva infraestructura**: no requiere BD, KV, Durable Objects ni dependencias nuevas. Usa `crypto.randomUUID()` y `Date.now()` (stdlib del runtime Workers).
- **Backward-compat de la API**: response añade campo opcional `folio`; consumidores antiguos que ignoren campos extras no se rompen.
- **Patrón replicable**: el mismo helper `generateFolio()` puede reutilizarse en otros endpoints (`/api/contacto`, `/api/cotizacion-rapida`) sin modificación.

### Negativas

- **No hay búsqueda por folio**: el equipo solo puede ver el folio en el email recibido; no hay endpoint para "lookup by folio" porque no hay persistencia. Si en el futuro se requiere (ej. dashboard interno), habrá que añadir persistencia y este ADR sería supersedido por uno que documente la migración.
- **Folio "perdido" si email no llega**: si el SMTP falla, el folio se generó pero nunca se persistió ni envió. Para el usuario es transparente (verá error en el wizard, no folio); para el equipo no hay registro. Esto se acepta porque no hay alternativa sin BD.
- **Folio no es predecible ni recuperable**: si el usuario cierra el navegador antes de copiar el folio, no puede recuperarlo. Mitigación: el folio también aparece en el email automático de confirmación (si el sistema enviara uno al cliente, lo cual no está en scope hoy).

### Riesgos mitigados

- **Colisión simultánea**: mitigado por `crypto.randomUUID()` (32 bits efectivos de entropía + timestamp).
- **Manipulación cliente**: mitigado al mover toda generación al servidor.
- **Confianza del usuario**: el folio se ve técnico y único (`LA-LX9K2A3F4B1C2D9E`), comunicando seriedad vs. el `LA-123456` previo.

## Alternativas descartadas

### Opción 2: Persistencia en BD (Cloudflare D1 o KV)

Generar folio + persistir en `D1.quotes` con metadata completa (timestamp, datos, email, status).

**Descartada porque**:

- Requiere provisionar D1 o KV en Cloudflare, configurar bindings en `wrangler.toml`, definir esquema, migraciones, etc. Out-of-scope del fix.
- El stack actual no tiene BD; introducir una para un caso de uso es desproporcionado (YAGNI).
- Los emails recibidos por el equipo ya sirven como "log" de cotizaciones; no hay requisito de negocio de búsqueda por folio en este momento.
- Si el negocio en el futuro necesita dashboard de cotizaciones, este ADR se supersederá por uno que documente la persistencia (path natural: D1 + folio como PK).

### Opción 3: Folio cliente con `crypto.randomUUID`

Mantener generación en cliente pero con `crypto.randomUUID().slice(0, 8).toUpperCase()` para mayor entropía.

**Descartada porque**:

- Viola explícitamente el AC de la spec `quote-folio-server-generated` ("El código del wizard no contiene lógica de generación de folio en el cliente").
- No resuelve la trazabilidad: el folio en cliente no llega al email del equipo (a menos que se envíe en el payload, lo que crea otra ambigüedad: ¿confiar en lo que el cliente envía?).
- Mantiene la asimetría confiable cliente-vs-servidor: el servidor es la fuente de verdad de cualquier identificador con valor de negocio.

### Opción 4: Folio secuencial server-side

Contador atómico server-side (`LA-000001`, `LA-000002`).

**Descartada porque**:

- Requiere persistencia atómica (Durable Object o similar) para evitar colisión en concurrencia. Mismo overhead que Opción 2.
- Folios secuenciales filtran volumen del negocio (un competidor puede inferir cuántas cotizaciones se procesan).

## Notas de implementación

```ts
// src/lib/folio.ts
export function generateFolio(): string {
  const ts = Date.now().toString(36).toUpperCase();
  // crypto.randomUUID() está disponible en runtime Workers, Node 22+, y todos los navegadores modernos.
  // Tomamos el primer segmento (8 hex chars) y lo mayúsculizamos para legibilidad uniforme.
  const rand = crypto.randomUUID().split('-')[0].toUpperCase();
  return `LA-${ts}${rand}`;
}
```

Uso en endpoint:

```ts
// src/pages/api/cotizacion.ts
import { generateFolio } from "../../lib/folio";

// ... dentro del POST handler, tras validación ...

const folio = generateFolio();
const mail = buildCotizacion4Email(data, { ...meta, folio });
await sendMail(resolveMailEnv(), mail);
return json(200, { ok: true, folio });
```

En el cliente:

```ts
// src/pages/cotizar.astro (extracto del script del wizard)
const r = await fetch('/api/cotizacion', { method: 'POST', body: JSON.stringify(payload) });
const res = await r.json();
if (r.ok && res.ok && res.folio) {
  state.folio = res.folio;
  showSuccess(); // usa state.folio en lugar de Date.now()
} else {
  showError(res.error || 'unknown', res.fields);
}
```

## Estado

**Accepted** — 2026-05-19

No supersede ningún ADR previo.

**Path de supersesión potencial**: si en el futuro se introduce BD para cotizaciones, este ADR será supersedido por uno que documente la persistencia (folio como PK de tabla `quotes`).
