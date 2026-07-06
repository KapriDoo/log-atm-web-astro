# Design: content-cleanup-mensajes

> Plan de implementación preciso y verificable para la limpieza de contenido transversal
> (Servicios, Home, Industrias, Nosotros, Contacto/Cotizar) en es/en/pt, borrado de páginas
> y secciones, corrección de contacto global, fix de contraste y SLA del email.
>
> Fuente técnica: `exploration.md` (tabla de ocurrencias + inventario real re-verificado en
> esta fase contra el código y los 3 JSON). Approach aprobado: **B acotado** (`proposal.md`),
> con las 6 decisiones HITL (a–f) ya resueltas.

## Modelo de contenido (recordatorio arquitectónico)

- **SSOT del copy traducible** = `src/i18n/translations/{es,en,pt}.json`. Es lo que renderiza.
  `es.json` es master; el validador build-time (`scripts/validate-i18n.ts`, ADR-0003) exige
  **paridad de claves** entre los 3 (no valida contenido ni longitud de arrays).
- **`src/lib/constants.ts`** = SSOT de datos no-traducibles (assets, `href`, `SITE`, rutas) y
  **arrays fallback**. En los arrays que se mergean con JSON (`SERVICES`, `VALUES`,
  `INDUSTRIES`, `HOW_WE_WORK`, `WHY_ITEMS`), los campos `title/desc/tag` de constants son
  **fallback muerto**: el JSON siempre los sobrescribe (`{...s, ...(copies[i] ?? fallback)}`),
  así que editarlos no tiene efecto visible. Arrays 100% muertos (no importados): `FAQ`,
  `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `TIMELINE`, `CERTS`, `STATS`,
  `NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY`.
- **Merge por índice vs. por clave**:
  - `servicios.list` ↔ `SERVICES` → **por índice** (11 ítems). No reordenar; mantener longitud.
  - `servicios.details.items` → **por campo `n`** (`.find(d => d.n === s.n)`), NO por índice.
    ⇒ las `features[]` de cada detalle pueden **cambiar de longitud libremente** (se iteran con
    `.map`), sin desalinear nada.
  - `nosotros.values.items` ↔ `VALUES` → por índice (4). `industrias.names/tags/servicesPer`
    ↔ `INDUSTRIES` → por índice; `tags/servicesPer` son `string[]` internos iterados con `.map`
    ⇒ acortar un array interno es seguro.

---

## Decisiones Técnicas

### D1 — Cards de servicio no-clicables + retiro de "Conocer más" (decisión a)

**Contexto**: hoy cada card es `<a href={s.href}>` que envuelve media+body, con un CTA textual
`.svc-card__cta` = `t('common.learnMore')` ("Conocer más"). Afecta a `servicios.astro` (catálogo,
11 cards) y `ServicesSection.astro` (home, 6 featured, incluye Aérea idx0 y Marítima idx1). Las
páginas de detalle de Aérea/Marítima se eliminan (D2) ⇒ sus `href` quedarían 404.

**Decisión**:
1. En `constants.ts`: `SERVICES[0].href` y `SERVICES[1].href` (Aérea, Marítima) pasan de la ruta
   de detalle a **`null`**. El tipo de `href` queda `string | null`.
2. En **ambos** `.astro`, el wrapper de card se hace condicional: `<a>` cuando `s.href` es truthy,
   `<div>` cuando es `null`. Patrón Astro (tag dinámico por variable capitalizada):
   ```astro
   {services.map((s) => {
     const isLink = Boolean(s.href);
     const CardTag = isLink ? 'a' : 'div';
     return (
       <CardTag
         class:list={['svc-card', `svc-card--${s.size}`, { 'svc-card--static': !isLink }]}
         href={isLink ? s.href : undefined}
         /* home: conservar data-scroll-animate / data-scroll-type */
       >
         … (sin el bloque .svc-card__cta) …
       </CardTag>
     );
   })}
   ```
   Resultado: Aérea/Marítima → `<div>` (sin `href`, sin cursor pointer de enlace); el resto de
   cards conserva su enlace actual (`/servicios`, `/cotizar`) → **sin regresión** (la spec exige
   mantener el comportamiento del resto).
3. **Retiro de "Conocer más"**: eliminar el bloque `<span class="svc-card__cta">…learnMore…</span>`
   en `servicios.astro` (L94-97) y `ServicesSection.astro` (L59-62). Tras esto, la clave
   `common.learnMore` queda huérfana en los 3 JSON → **borrarla simétrica** (es/en/pt).
4. **Afford visual de hover** (la spec cita "cursor, hover de enlace"): quitar `<a>` ya elimina el
   cursor pointer. Para eliminar también el lift de `.svc-card:hover`, añadir en
   `styles/sections/services.css`:
   ```css
   .svc-card--static { cursor: default; }
   .svc-card--static:hover { transform: none; box-shadow: none; }
   ```

**Justificación**: cambio local, sin lógica nueva; honra la spec (Aérea/Marítima no interactivas,
resto igual) y la decisión a ("sin redirección, cero 404"). El tag dinámico evita duplicar el
markup de la card.

**Alternativas descartadas**: (i) redirigir los `href` a `/servicios`/`/cotizar` → contradice
decisión a ("sin redirección"). (ii) volver **todas** las cards `<div>` → viola "mantener el resto
con comportamiento habitual" de la spec y elimina el acceso a `/cotizar` desde Consultoría/Medio
Oriente. (iii) conservar la clave `common.learnMore` sin uso → deja basura i18n (DRY).

### D2 — Borrado de las 4 páginas de detalle + claves i18n huérfanas

**Decisión**: eliminar los 4 archivos:
`src/pages/servicios/carga-aerea.astro`, `…/carga-maritima.astro`,
`src/pages/[lang]/servicios/carga-aerea.astro`, `…/carga-maritima.astro`
(los `[lang]/*` solo delegan `import RootPage` → se van con el root). El estilo de esas páginas es
`<style>` scoped inline ⇒ no deja CSS huérfano en `global.css`/`shared.css`. El directorio
`src/pages/[lang]/servicios/` queda vacío (aceptable en Astro).

Borrar simétrico en los 3 JSON los subárboles huérfanos: `meta.cargaAerea.*`,
`meta.cargaMaritima.*`, `servicios.carga.aerea.*`, `servicios.carga.maritima.*`.

**Sitemap**: `@astrojs/sitemap` descubre rutas por archivo (ADR-0002) ⇒ al borrar los archivos las
URLs desaparecen solas del sitemap; no hay lista manual que tocar.

**Justificación**: ADR-0002 (routing `[lang]/`) y ADR-0003 (paridad i18n) cubren el patrón; el
borrado simétrico evita romper el build.

### D3 — Eliminación de 4 secciones (markup + i18n vivas + CSS + dead code acotado)

Para cada una: quitar el `<section>`, borrar sus claves i18n vivas simétricas, remover el CSS
propio (verificado que no se comparte con secciones vivas) y, si aplica, el dead code de
`constants.ts` (decisión d: solo `FAQ`, `TIMELINE`, `CERTS`).

| Sección | Markup a quitar | i18n vivo a borrar (×3) | CSS a borrar | Dead code / script |
|---|---|---|---|---|
| **FAQ** (`/servicios`) | `servicios.astro` L155-170 (`<section class="section--alt section--narrow">`) + const `faqItems` (L29), type `FaqItem` (L22) | `servicios.faq.{eyebrow,title,items}` | `shared.css` L537-566 (`.faq-list`, `.faq-item*`) | `FAQ` array en `constants.ts` L344-358 |
| **Trayectoria** (`/nosotros`) | `nosotros.astro` L70-90 (`<section class="timeline">`) + const `timeline` (L23), type `TimelineItem` (L18) + **bloque `<script>` L172-182** completo (solo inicia el timeline) | `nosotros.timeline.{eyebrow,title,items}` | `shared.css` L702-738 (`.timeline*`) | `TIMELINE` array en `constants.ts` L370-377 + **borrar archivo** `src/scripts/gsap-timeline-reveal.ts` |
| **Certificaciones** (`/nosotros`) | `nosotros.astro` L148-164 (`<section>` `.certs`) + const `certs` (L26), type `CertItem` (L21) | `nosotros.certs.{eyebrow,title,items}` | `shared.css` L892-915 (`.certs`, `.cert*`) | `CERTS` array en `constants.ts` L395-401 |
| **Sector destacado** (`/industrias`) | `industrias.astro` L61-94 (`<section>` spotlight). **NO** borrar `const spotlight = industries[0]` (L32): se reusa en la sección directorio (L124-127) | `industrias.spotlight.*` (eyebrow, title, caseLabel, panelEyebrow, quote, authorTitle, authorDetail) | `shared.css` L569-623 (`.ind-spotlight*`) | — (sin dead array; sin script) |

**Verificación de no-compartición de CSS** (hecha en esta fase):
- `.process-strip` (L499 comentario dice "used in servicios + nosotros") es **stale**: `/nosotros`
  usa `.howwork-grid` (L767+), no `.process-strip`. `.process-strip` solo vive en `/servicios`
  (relevante para D7).
- `.ind-spotlight*` (L569-623) es exclusivo de la sección spotlight; `.ind-services*` (L625+,
  tabla "Qué movemos") y `.ind-directory*` son independientes y **se conservan**.
- `.timeline*`, `.certs/.cert*`, `.faq*` no aparecen en ningún otro `.astro` (grep) → seguros.

**`gsap-timeline-reveal.ts`**: único consumidor es `nosotros.astro` (import + `initTimelineReveal`).
Al borrar la sección se borra el archivo y el `<script>`. La spec `nosotros-timeline-reveal/spec`
queda **deprecada** (ya declarado `supersedes` en `nosotros-no-timeline-section`); su código se
elimina (reflejado en Output Expected).

### D4 — Ediciones de copy por servicio (spec services-descriptions-bullets)

Todo en los 3 JSON. `servicios.details.items` es por-`n` ⇒ cambiar longitud de `features` es seguro.

| Servicio (n) | Clave | Acción |
|---|---|---|
| Aérea (01) | `servicios.list.0.desc` | → "Courier internacional y chárter aéreo, carga general, vuelo pasajero." (quita "Express … tiempos garantizados") |
| Aérea (01) | `servicios.list.0.tag` | quitar "48h" (p. ej. "Aéreo") — también fallback `SERVICES[0].tag` en constants (ver D8) |
| Aérea (01) | `servicios.details.items.0.features` | **reemplazar** por los 5 exactos: `["Courier internacional","Chárter aéreo","Cadena de frío y dangerous goods","Carga general","Vuelo pasajero"]` (4→5 ítems) |
| Marítima (02) | `servicios.details.items.1.features.0` | "FCL/LCL a 80+ puertos" → "FCL/FCL, LCL/LCL a 80+ puertos" (decisión e) |
| Marítima (02) | `servicios.details.items.1.features.2` | "Reefer y open-top disponibles" → "Carga general, Reefer y open-top disponibles" |
| Marítima (02) | `servicios.details.items.1.features.3` | **eliminar** "Negociación de tarifas por contrato" (4→3) |
| Aduana (03) | `servicios.list.2.tag` | "OEA Chile" → sin OEA (p. ej. "Aduana Chile") |
| Aduana (03) | `servicios.details.items.2.badge` | "OEA · Aduanas Chile" → "Aduanas Chile" |
| Aduana (03) | `servicios.details.items.2.features.1` | "DUS, certificados de origen, fumigación" → "DUS, DIN, certificados de origen, fumigación" |
| Aduana (03) | `servicios.details.items.2.features.2` | **eliminar** "Operador Económico Autorizado" (4→3) |
| Almacenaje (04) | `servicios.list.3.desc` | → "Bodegaje de carga general." (quita "fulfillment y última milla…") |
| Almacenaje (04) | `servicios.details.items.3.features` | **reemplazar** por: `["Bodegaje","Desconsolidado","Consolidado de contenedores"]` (4→3) |
| Consultoría (05) | `servicios.details.items.4.features.3` | **eliminar** "KPI dashboard mensual" (4→3) |
| Medio Oriente (11) | `servicios.details.items.5.features` | **reemplazar** por: `["Llevamos tu negocio al medio oriente","Servicio Broker"]` (4→2) |

Traducir fielmente a en/pt (mantener el mismo nº de ítems por array en los 3 idiomas — el validador
exige paridad de la clave-índice; los ítems de un array cuentan como claves `…features.N`).

> **Nota "Ruta Medio Oriente"**: no es una sección aparte; vive como detalle `n=11` en
> `servicios.details.items`. Los "bullets" a reemplazar son sus `features`.

### D5 — Proceso "Cómo trabajamos" (/servicios) (spec services-how-we-work-process)

| Clave | Acción |
|---|---|
| `servicios.process.steps.2.desc` | "Propuesta clara y desglosada en 24h." → sin plazo (p. ej. "Propuesta clara y desglosada.") |
| `servicios.process.steps.4.desc` | "OEA y revisión documental anticipada." → sin OEA (p. ej. "Revisión documental anticipada.") |
| `servicios.process.steps.5.desc` | → **exacto**: "Entrega de carga en bodega y cierre documental del proceso aduanero." |
| `servicios.process.desc` | "De la cotización al cierre con KPIs…" → quitar "con KPIs" (spec: ninguna mención KPI en la sección) |

`servicios.process.steps` se itera con `.map` (título por `p.title`, numeración por índice del
render `String(i+1)`) — cambiar textos no altera longitud. En/pt equivalentes.

### D6 — Industrias (spec industries-page-content)

- **Hero meta** (`industrias.astro`): eliminar el meta-item `300+` (L53) y el `98%` (L55). Quedan
  `12` sectores (L52) y `20+` experiencia (L54) — **se conservan** (`12` es factual: hay 12 sectores;
  `20+` se reinterpreta como experiencia del equipo, coherente con D9). Las claves
  `industrias.metaClients` y `industrias.metaRetention` quedan huérfanas → **borrar simétrico**.
- **Sector destacado**: sección eliminada en D3.
- **"Qué movemos en cada sector"**: quitar "OEA" y "Última milla" de las etiquetas visibles. Aparecen
  en dos arrays vivos (ambos renderizan): eliminar el elemento correspondiente de
  `industrias.tags.0` (idx 2 "OEA", 3→2) y `industrias.tags.4` (idx 2 "Última milla", 3→2), y de
  `industrias.servicesPer.0` (idx 2 "OEA") y `industrias.servicesPer.4` (idx 2 "Última milla"). Son
  `string[]` iterados con `.map` ⇒ acortar es seguro; hacerlo simétrico en los 3 idiomas.
- **NO tocar** `industrias.desc` ni `home.industries.desc` ("12 industrias"): son afirmaciones
  factuales de cobertura, distintas del reclamo "12 industrias + 98% retención" del manifiesto
  (D9). La spec exige "mantener el listado completo sin alterar su cantidad".

### D7 — Fix de contraste `.process-step__title` (decisión f, spec ui-contrast)

**Contexto**: `global.css` L77-81 aplica `h1..h6 { color: var(--color-neutral-900) }` (#211f1c). El
`<h3 class="process-step__title">` no declara color propio ⇒ toma neutral-900 sobre el fondo
`.process-strip { background: var(--color-neutral-900) }` ⇒ texto invisible (mismo token
`#211f1c`). `.process-step__desc` no sufre porque ya declara `color: var(--color-neutral-400)`.

**Decisión**: añadir **una** declaración de color claro a `.process-step__title` en
`shared.css` (bloque L531-534):
```css
.process-step__title {
  font-family: var(--font-display); font-weight: 600;
  font-size: 1.0625rem; line-height: 1.2; margin: 0 0 0.5rem;
  color: var(--color-text-inverse); /* #ffffff — vence h1..h6{color:neutral-900} */
}
```
`--color-text-inverse` = `#ffffff` (tokens.css L76). Contraste #fff sobre #211f1c ≈ 15:1 ≫ 4.5:1 (AA).
La regla de tipo (selector de clase) gana en especificidad al selector `h1..h6`, y como el
contenedor `.process-strip` ya usa `color:#fff`, el resultado es consistente.

**Alcance**: solo `/servicios` (única página con `.process-strip`, ver D3). **NO** se toca
`global.css` (cambiarlo afectaría todos los headings del sitio). `/nosotros` (`.howwork-card__title`
sobre fondo claro, ya declara `color:neutral-900`) se **verifica visualmente en sdd-verify** sin fix
especulativo (decisión f).

**Alternativas descartadas**: (i) editar la regla `h1..h6` global → regresión masiva. (ii)
`color: inherit` → funciona pero es menos explícito que el token; se prefiere el token para claridad.

### D8 — Literales hardcodeados en `.astro` (fuera de `t()`)

Editar directamente en el template (1 vez, iguales en los 3 idiomas):
- `servicios.astro` L58: `<span class="v">OEA</span>` → eliminar ese `page-hero__meta-item` (y su
  clave `servicios.metaCustoms` queda huérfana → borrar simétrico). Quedan 11/24-7 como meta.
- `nosotros.astro` L50 `<span class="v">OEA</span>` y L51 `<span class="v">B2B</span>` → eliminar
  ambos `page-hero__meta-item` (claves huérfanas `nosotros.metaCert`, `nosotros.metaFocus` → borrar
  simétrico). Quedan `20+` (metaYears) y `CL` (metaCapital).
- `industrias.astro` L53 `300+` y L55 `98%` → eliminar esos dos meta-items (D6).

> Al eliminar meta-items hardcodeados cuyo label sí es i18n, **sus claves label quedan huérfanas** y
> deben borrarse simétricas para no dejar basura (paridad no falla por sobrantes, pero DRY/YAGNI):
> `servicios.metaCustoms`, `nosotros.metaCert`, `nosotros.metaFocus`, `industrias.metaClients`,
> `industrias.metaRetention`.

### D9 — Armonización "20+ años" / "Desde 2023" (decisión b, spec years-experience-narrative)

Regla: donde "20+ años" implica **antigüedad de la empresa**, reformular a **experiencia del
equipo/profesionales** (coherente con "Profesionales 20+ años de experiencia" + "Desde 2023"). No
se elimina "20+ años"; se reencuadra.

| Clave | De | A (regla; wording fino en apply) |
|---|---|---|
| `nosotros.heroEyebrow` | "Nosotros · Desde 2003" | "Nosotros · Desde 2023" |
| `nosotros.heroTitleHtml` | "20+ años conectando <em>Chile con el mundo</em>." | "Profesionales <em>20+ años de experiencia</em>." (intent literal) |
| `home.hero.eyebrow` | "Operador logístico chileno · 20+ años" | reencuadrar a experiencia de equipo (p. ej. "…· Profesionales con 20+ años de experiencia") |
| `footer.brandDesc` | "Operador logístico chileno con 20+ años de experiencia…" | reencuadrar sujeto a equipo/profesionales (p. ej. "…con profesionales con 20+ años de experiencia…") |
| `meta.nosotros.description` | "…con 20+ años de experiencia…" | mismo reencuadre, coherente con "Desde 2023" |
| `nosotros.timeline.title` "Hitos de 20+ años" | — | N/A: se elimina con la sección Trayectoria (D3) |

En/pt equivalentes. `industrias`/`nosotros` hero `20+` (metaExpertise/metaYears) se conservan (ya
leen como experiencia).

### D10 — Manifiesto y 4º valor de Nosotros

- `nosotros.manifesto.p3Html`: reemplazar "Hoy operamos con clientes en 12 industrias y una retención
  del 98%…" por mensaje centrado en el cliente / logística a medida (intent: "Nuestro objetivo: que
  el cliente sienta que esta operación es suya, ofreciendo una logística hecha a medida" — redactar
  mejor). Sin cifras "12 industrias"/"98%".
- `nosotros.manifesto.titleHtml` "La logística es una <em>relación</em>, no un commodity.": conservar
  la frase, revisar coherencia con el p3 reescrito (spec pide "ajustada para ser coherente"); cambio
  mínimo o nulo si ya encaja.
- `nosotros.values.items.3.desc`: "KPIs medibles y revisión trimestral con cada cliente." → "Nos
  preocupamos del feedback de nuestros clientes." (array por índice, longitud 4 intacta). En/pt equiv.

### D11 — Contacto / Cotizar sin plazo finito (spec contact-no-time-commitment)

Reemplazar cada plazo en horas por término general (p. ej. "rápido" / "a la brevedad" / "lo antes
posible"), consistente en ambas páginas, en los 3 idiomas:

`contacto.lead`, `contacto.heroEyebrow` ("Respuesta en 24h"), `contacto.heroLead`,
`contacto.form.sub`; `cotizar.lead`, `cotizar.heroLead`, `cotizar.chips.0` ("Respuesta < 24h"),
`cotizar.summary.sla` ("Respuesta garantizada en < 24h hábiles"), `cotizar.success.desc`,
`cotizar.success.descPersonal`.

### D12 — Home CTA + Cotizar modes (fuera de spec dedicada, incluidos por intent GLOBAL)

Estas ocurrencias de tiempo finito no están cubiertas por una spec dedicada pero el intent GLOBAL
("quitar de toda la página 48h/24h") las alcanza; se incluyen para no dejar contradicción:
- `home.cta.lead`: "Cotiza en menos de 24 horas…" → sin plazo en horas. (No hay spec content-home
  para esto; ver observación registrada.)
- `cotizar.modes.1.desc`: "Express 48h–7d. Ideal para urgencias…" → quitar el numérico "48h–7d"
  (p. ej. "Ideal para urgencias y alto valor.").

**Se dejan intactos** (no son compromiso de tiempo ni cifra prohibida): `cotizar.modes.0.desc`
("FCL/LCL, 80+ puertos" — abreviatura legítima de modalidad, distinta del bullet de detalle de D4),
`cotizar.extras.3` ("Última milla" — opción de servicio real del wizard, no un reclamo de copy).

### D13 — Contacto global: teléfono/email (spec site-global-contact-details)

Reemplazos: `+56 9 4216 2739`/`+56942162739` → `+56 9 8270 8492`/`+56982708492`;
`mpazrivera@logatm.com` → `contacto@logatm.com`.

| Archivo | Línea(s) | Acción |
|---|---|---|
| `src/lib/constants.ts` | 42 `phone`, 43 `phoneDisplay`, 44 `email`, **46 `whatsappUrl`** (contiene el nº viejo) | actualizar los 4 valores en `SITE` |
| `src/layouts/BaseLayout.astro` | 74 `telephone`, 75 `email` (JSON-LD hardcodeado) | **sustituir los literales** por los nuevos valores |
| `README.md` | 119 | actualizar email + teléfono en la línea de contacto |
| `docs/project-brief.md` | 15 (`Teléfono | +569 421 62739`), 17 (`Email … mpazrivera@…`) | actualizar ambos |

`Footer.astro` y `contacto.astro` ya consumen `SITE.phone/phoneDisplay/email` ⇒ se actualizan solos.

**JSON-LD — decisión (DRY)**: se **sustituye el literal** en `BaseLayout.astro` (no se refactoriza
para importar `SITE`). Razón: acota el riesgo del cambio (BaseLayout es el layout raíz de todo el
sitio; introducir un import y reestructurar el objeto schema agranda la superficie sin beneficio
para el intent). Queda **deuda DRY conocida y documentada**: el JSON-LD duplica teléfono/email de
`SITE`. Ver D-ADR (no se crea ADR; justificación abajo).

### D14 — SLA del email transaccional (decisión c, spec email-sla-no-finite-commitment)

`src/lib/email-templates.ts` L301: `"SLA cliente · responder antes de 24 h hábiles"` →
reemplazar "antes de 24 h hábiles" por término general, conservando el recordatorio de SLA para el
equipo comercial. Resultado sugerido: `"SLA cliente · responder a la brevedad"`. Es un literal en el
template HTML del correo (no i18n), 1 sola edición.

---

## Arquitectura (flujo de contenido afectado)

```mermaid
flowchart LR
  subgraph SSOT_copy["i18n/*.json (SSOT copy, x3 idiomas — paridad ADR-0003)"]
    JSON[[servicios/nosotros/industrias/home/contacto/cotizar]]
  end
  subgraph CONST["constants.ts"]
    SITE[SITE contacto]:::edit
    SERV[SERVICES href/tag]:::edit
    ROUTE[LIVE_ROUTES]:::edit
    DEAD[FAQ/TIMELINE/CERTS]:::del
  end
  JSON -->|tList/t merge| PAGES[.astro pages]
  SERV -->|merge por índice| PAGES
  SITE --> Footer & Contacto
  SITE -.duplicado (deuda DRY).-> JSONLD[BaseLayout JSON-LD]:::edit
  PAGES --> CSS[shared.css / global.css]
  DELPAGES[4 páginas detalle]:::del -.borradas.-> SITEMAP[(sitemap auto ADR-0002)]
  SCRIPT[gsap-timeline-reveal.ts]:::del
  classDef edit fill:#cfe;stroke:#093;
  classDef del fill:#fcc;stroke:#900;
```

## Output Expected (exhaustivo)

### Eliminar (7 archivos)
- `src/pages/servicios/carga-aerea.astro`
- `src/pages/servicios/carga-maritima.astro`
- `src/pages/[lang]/servicios/carga-aerea.astro`
- `src/pages/[lang]/servicios/carga-maritima.astro`
- `src/scripts/gsap-timeline-reveal.ts`
- (queda vacío el dir `src/pages/[lang]/servicios/` — sin acción requerida)

### Modificar
| Archivo | Cambios |
|---|---|
| `src/i18n/translations/es.json` | D2 (borrar `meta.cargaAerea`, `meta.cargaMaritima`, `servicios.carga.*`), D3 (borrar `servicios.faq.*`, `nosotros.timeline.*`, `nosotros.certs.*`, `industrias.spotlight.*`), D4 (editar `servicios.list.{0,2,3}`, `servicios.details.items.{0,1,2,3,4,5}`), D5 (`servicios.process.desc`+`steps.{2,4,5}`), D6 (borrar `industrias.metaClients`,`metaRetention`; acortar `industrias.tags.{0,4}`,`servicesPer.{0,4}`), D8 (borrar `servicios.metaCustoms`,`nosotros.metaCert`,`nosotros.metaFocus`), D9 (`nosotros.heroEyebrow`,`heroTitleHtml`,`home.hero.eyebrow`,`footer.brandDesc`,`meta.nosotros.description`), D10 (`nosotros.manifesto.p3Html`,`titleHtml`,`nosotros.values.items.3.desc`), D11 (`contacto.*`,`cotizar.*` plazos), D12 (`home.cta.lead`,`cotizar.modes.1.desc`), D1 (borrar `common.learnMore`) |
| `src/i18n/translations/en.json` | **idéntico a es.json** (mismas claves, textos traducidos; paridad obligatoria) |
| `src/i18n/translations/pt.json` | **idéntico a es.json** (mismas claves, textos traducidos) |
| `src/pages/servicios.astro` | D1 (wrapper condicional card + quitar `.svc-card__cta`), D3-FAQ (quitar `<section>` L155-170, const `faqItems`, type `FaqItem`), D8 (quitar meta-item OEA L58) |
| `src/components/sections/ServicesSection.astro` | D1 (wrapper condicional card + quitar `.svc-card__cta`) |
| `src/pages/nosotros.astro` | D3-Trayectoria (quitar `<section class="timeline">` L70-90, const `timeline`, type `TimelineItem`, `<script>` L172-182), D3-Certs (quitar `<section>` L148-164, const `certs`, type `CertItem`), D8 (quitar meta-items OEA L50 y B2B L51) |
| `src/pages/industrias.astro` | D3-Spotlight (quitar `<section>` L61-94; conservar `const spotlight`), D6/D8 (quitar meta-items 300+ L53 y 98% L55) |
| `src/lib/constants.ts` | D1 (`SERVICES[0].href`,`[1].href` → `null`), D4/D8 (`SERVICES[0].tag` quitar "48h"), Home routes (`LIVE_ROUTES[3]` Hong Kong→Iquique ⇒ **Manzanillo→Valparaíso**, `mode:'sea'`), D13 (`SITE.phone`,`phoneDisplay`,`email`,`whatsappUrl`), D3 (borrar arrays `FAQ` L344-358, `TIMELINE` L370-377, `CERTS` L395-401) |
| `src/styles/pages/shared.css` | D3 (borrar `.faq*` L537-566, `.ind-spotlight*` L569-623, `.timeline*` L702-738, `.certs/.cert*` L892-915), D7 (añadir `color: var(--color-text-inverse)` a `.process-step__title` L531-534) |
| `src/styles/sections/services.css` | D1 (añadir `.svc-card--static` + `.svc-card--static:hover`) |
| `src/layouts/BaseLayout.astro` | D13 (sustituir literales `telephone` L74, `email` L75 en JSON-LD) |
| `src/lib/email-templates.ts` | D14 (L301 SLA sin plazo finito) |
| `README.md` | D13 (L119 email+teléfono) |
| `docs/project-brief.md` | D13 (L15 teléfono, L17 email) |

### Crear
- Ninguno (cambio de limpieza; sin archivos nuevos, sin ADR nuevo, sin `tech-context.md` —
  no hay libs externas nuevas).

### No tocar (decisión explícita)
- `global.css` regla `h1..h6` (D7). `industrias.desc` / `home.industries.desc` "12 industrias" (D6,
  factual). `cotizar.modes.0.desc`, `cotizar.extras.3` (D12). Dead code no relacionado:
  `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `STATS`, `NAV_LINKS`, `FOOTER_SERVICES`
  (referencia rutas de detalle pero es dead code no importado → sin 404), `FOOTER_COMPANY`
  (decisión d limita el borrado a FAQ/TIMELINE/CERTS). Fallbacks muertos en `constants.ts`
  (`SERVICES[i].desc`, `VALUES[3].desc` con "KPIs", `IND_TAGS_MAP`/`SERVICES_PER_IND` con
  OEA/última milla): **nunca renderizan** (JSON master gana); se dejan por YAGNI/decisión d — la
  spec exige ausencia en lo que el visitante ve, no en fallbacks muertos.

---

## ADRs

**No se crea ningún ADR nuevo.** Justificación por decisión candidata:
- **Cards de servicio sin página de detalle (D1/D2)**: es una decisión de contenido/markup local
  reversible, no un patrón arquitectónico transversal. El patrón de routing ya está en **ADR-0002**;
  la paridad i18n del borrado de claves en **ADR-0003**. No aporta un ADR nuevo.
- **Sustitución de literal en JSON-LD (D13)**: se elige explícitamente **no** refactorizar (deuda DRY
  conocida). Es un cambio local sin decisión arquitectónica nueva; se documenta la deuda en
  `observations.md`, no amerita ADR (un ADR de "no refactorizar" sería ruido).
- **Fix de contraste (D7)**: corrección CSS local de especificidad; sin decisión arquitectónica.
- **Contexto de email (ADR-0004, ADR-0005)**: la edición del SLA (D14) es textual, no cambia la
  estructura de secciones/helpers que esos ADR describen → solo se referencian.

Spec deprecada: `nosotros-timeline-reveal/spec` (superseded_by `content-nosotros/nosotros-no-timeline-section`).

---

## Estrategia de Verificación

1. **Paridad i18n (build-time, ADR-0003)**: `npm run build` corre `validate-i18n.ts` en
   `astro:build:start`. Todo borrado/edición de claves debe ser **simétrico es/en/pt** (incluye los
   ítems de array como `…features.N`, `…tags.N`). Estrategia: aplicar cada bloque de borrado en los 3
   JSON a la vez y correr `npm run build` tras cada bloque grande. (Ejecutar desde
   `…/content-cleanup-mensajes/log-atm-web-astro/`; `npm install` si `node_modules` no existe — ver
   observación optimize-images-webp.)
2. **Cero 404 / build de rutas**: tras borrar las 4 páginas, `npm run build` no debe fallar por
   imports colgantes; confirmar que ningún `href` activo apunta a `carga-aerea|carga-maritima`
   (`grep -rn 'carga-aerea\|carga-maritima' src` debe dejar solo `FOOTER_SERVICES` dead-code). Cards
   Aérea/Marítima renderizan como `<div>` sin `href`.
3. **Dead code / imports huérfanos**: `grep -rn 'gsap-timeline-reveal\|initTimelineReveal\|FAQ\|TIMELINE\|CERTS' src`
   no debe devolver referencias vivas tras el borrado (salvo palabras en copy no relacionadas).
   TypeScript del build valida que `constants.ts` sin `FAQ/TIMELINE/CERTS` no rompe consumidores
   (no hay ninguno).
4. **Contraste (D7)**: revisión visual en `/servicios` (los 6 títulos de "Cómo trabajamos" legibles
   sobre fondo oscuro); medir ratio ≥ 4.5:1 (#fff/#211f1c ≈ 15:1). Confirmar **no regresión** en
   `/nosotros` (`.howwork-card__title`) y en heroes internos (ADR previo hero-title-contrast).
5. **Barrido de términos prohibidos (rendered)**: tras el build, `grep -riE '48h|24 ?h|\bOEA\b|300\+|98%|Negociación de tarifas|Conocer más|carga-aerea'`
   sobre `dist/` debe dar **cero** en superficies afectadas (permitido lo excluido en D12/D6:
   "12 industrias" factual, "FCL/LCL" en modes, "Última milla" extra del wizard).
6. **Contacto global**: `grep -rnE '4216 ?2739|56942162739|mpazrivera'` en `src` + `README.md` +
   `docs/` debe dar **cero**; el JSON-LD del `dist/` anuncia el teléfono/email nuevos.
7. **Sin tests unitarios** en el proyecto (observación previa): la validación automatizada es el hook
   i18n + build TS; el resto es revisión visual multi-idioma (es/en/pt) en las 5 páginas.
