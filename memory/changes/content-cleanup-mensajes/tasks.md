# Tasks: content-cleanup-mensajes

> Ejecutar desde `.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro/` (raíz del
> proyecto en el worktree). Todas las rutas de archivo son relativas a esa raíz.
> Fuente: `design.md` (decisiones D1–D14 + tabla Output Expected). NO-TDD: cambio de
> contenido/CSS/i18n sin lógica testeable unitariamente; la verificación es
> `npm run build` (valida paridad i18n vía `scripts/validate-i18n.ts`, ADR-0003) +
> revisión visual.
>
> **Regla transversal i18n** (aplica a toda tarea que toque claves de
> `src/i18n/translations/*.json`): el cambio debe aplicarse **simétrico** en
> `es.json` (master), `en.json` y `pt.json` — mismas claves, mismo largo de arrays
> (incl. ítems `…features.N`, `…tags.N`). Tras cada grupo, correr `npm run build` y
> confirmar que `validate-i18n.ts` no reporta asimetría.

---

## Grupo 1 — Borrado de páginas de detalle + cards de servicio no-clicables

Depende de: nada (primer grupo). Bloquea: Grupo 3 (D4 edita `servicios.details.items`
de servicios cuyas páginas de detalle desaparecen aquí, pero las claves i18n de detalle
en sí NO se borran, solo `meta.cargaAerea/cargaMaritima` y `servicios.carga.*`) — por
eso el borrado de claves huérfanas de D2 se agrupa aquí, junto al borrado de archivos.

- [x] **T1.1 — Borrar las 4 páginas de detalle de servicio.**
  Archivos a eliminar:
  - `src/pages/servicios/carga-aerea.astro`
  - `src/pages/servicios/carga-maritima.astro`
  - `src/pages/[lang]/servicios/carga-aerea.astro`
  - `src/pages/[lang]/servicios/carga-maritima.astro`
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: los 4 archivos no existen; `src/pages/[lang]/servicios/`
  puede quedar vacío (no requiere acción); `grep -rn 'carga-aerea\|carga-maritima' src`
  solo devuelve el array muerto `FOOTER_SERVICES` en `constants.ts` (dead code fuera de
  alcance, ver "No tocar" en design.md).

- [x] **T1.2 — Borrar claves i18n huérfanas de las páginas de detalle eliminadas.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Borrar subárboles: `meta.cargaAerea.*`, `meta.cargaMaritima.*`,
  `servicios.carga.aerea.*`, `servicios.carga.maritima.*`.
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: las 4 claves no existen en ninguno de los 3 JSON;
  `npm run build` pasa validación de paridad i18n.

- [x] **T1.3 — `SERVICES[0].href` y `SERVICES[1].href` → `null` (Aérea, Marítima).**
  Archivo: `src/lib/constants.ts`. Ajustar el tipo de `href` a `string | null` en la
  definición del array `SERVICES` si está tipado explícitamente.
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: `SERVICES[0].href === null` y `SERVICES[1].href === null`;
  el resto de `href` de `SERVICES` queda intacto; TypeScript compila sin error de tipo.

- [x] **T1.4 — Wrapper condicional `<a>`/`<div>` en `servicios.astro` (catálogo, 11 cards).**
  Archivo: `src/pages/servicios.astro`.
  Reemplazar el `<a>` fijo de cada card por tag dinámico (`isLink = Boolean(s.href)`,
  `CardTag = isLink ? 'a' : 'div'`), añadiendo `class:list={['svc-card', ..., {
  'svc-card--static': !isLink }]}` y `href={isLink ? s.href : undefined}` según el
  patrón exacto de design.md §D1. Quitar el bloque `<span class="svc-card__cta">…
  learnMore…</span>` (L94-97 aprox.).
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: cards Aérea/Marítima renderizan como `<div class="svc-card
  svc-card--static ...">` sin `href` ni CTA "Conocer más"; el resto de las 9 cards
  conserva `<a href="...">` funcional (`/servicios`, `/cotizar` según corresponda) sin
  CTA textual "Conocer más" tampoco (se retira en las 11).

- [x] **T1.5 — Wrapper condicional `<a>`/`<div>` en `ServicesSection.astro` (home, 6 featured).**
  Archivo: `src/components/sections/ServicesSection.astro`.
  Mismo patrón que T1.4, conservando los atributos `data-scroll-animate` /
  `data-scroll-type` existentes en el wrapper. Quitar el bloque
  `.svc-card__cta` (L59-62 aprox.).
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: en home, la card Aérea (idx0) y Marítima (idx1) renderizan
  como `<div>` sin `href`; las demás cards featured conservan su `<a>` funcional; sin
  CTA "Conocer más" en ninguna.

- [x] **T1.6 — Borrar clave i18n huérfana `common.learnMore`.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: `common.learnMore` no existe en ninguno de los 3 JSON;
  `grep -rn 'learnMore' src` no devuelve referencias vivas.

- [x] **T1.7 — CSS `.svc-card--static` (sin cursor pointer, sin hover lift).**
  Archivo: `src/styles/sections/services.css`.
  Añadir:
  ```css
  .svc-card--static { cursor: default; }
  .svc-card--static:hover { transform: none; box-shadow: none; }
  ```
  Spec: `content-services/services-catalog-cta-and-detail-pages`.
  Criterio de completado: al hacer hover sobre las cards Aérea/Marítima (en `/servicios`
  y home) no hay elevación ni cambio de cursor a pointer; el resto de cards conserva su
  hover habitual.

- [x] **T1.8 — Build de verificación del grupo 1.**
  Comando: `npm run build`.
  Criterio de completado: build limpio (sin error de paridad i18n, sin TS error, sin
  import colgante hacia las páginas borradas).

---

## Grupo 2 — Eliminación de secciones FAQ / Trayectoria / Certificaciones / Sector destacado

Depende de: Grupo 1 (build limpio previo facilita aislar errores). Independiente en
contenido de Grupo 1.

- [x] **T2.1 — Eliminar sección FAQ de `/servicios` (markup + dead code).**
  Archivo: `src/pages/servicios.astro`. Quitar `<section class="section--alt
  section--narrow">` (L155-170 aprox.), la const `faqItems` (L29 aprox.) y el type
  `FaqItem` (L22 aprox.).
  Archivo: `src/lib/constants.ts`. Borrar el array `FAQ` (L344-358 aprox.).
  Spec: `content-services/services-no-faq-section`.
  Criterio de completado: `/servicios` no renderiza la sección de preguntas frecuentes;
  `grep -rn 'FaqItem\|faqItems\|\bFAQ\b' src` no devuelve referencias vivas.

- [x] **T2.2 — Borrar claves i18n `servicios.faq.*` (es/en/pt).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Borrar subárbol `servicios.faq.{eyebrow,title,items}`.
  Spec: `content-services/services-no-faq-section`.
  Criterio de completado: `servicios.faq` no existe en ninguno de los 3 JSON.

- [x] **T2.3 — Borrar CSS `.faq-list`, `.faq-item*` de `shared.css`.**
  Archivo: `src/styles/pages/shared.css` (L537-566 aprox.).
  Spec: `content-services/services-no-faq-section`.
  Criterio de completado: las reglas `.faq-list`/`.faq-item*` no existen; `grep -rn
  'faq-list\|faq-item' src` no devuelve coincidencias.

- [x] **T2.4 — Eliminar sección Trayectoria de `/nosotros` (markup + script + dead code).**
  Archivo: `src/pages/nosotros.astro`. Quitar `<section class="timeline">` (L70-90
  aprox.), la const `timeline` (L23 aprox.), el type `TimelineItem` (L18 aprox.) y el
  bloque `<script>` (L172-182 aprox.) que inicializa el timeline (import +
  `initTimelineReveal`).
  Archivo: `src/scripts/gsap-timeline-reveal.ts` — **eliminar el archivo completo**
  (único consumidor era `nosotros.astro`).
  Archivo: `src/lib/constants.ts`. Borrar el array `TIMELINE` (L370-377 aprox.).
  Spec: `content-nosotros/nosotros-no-timeline-section`.
  Criterio de completado: `/nosotros` no renderiza la sección "Trayectoria";
  `src/scripts/gsap-timeline-reveal.ts` no existe; `grep -rn
  'gsap-timeline-reveal\|initTimelineReveal\|TimelineItem\|\bTIMELINE\b' src` no
  devuelve referencias vivas.

- [x] **T2.5 — Borrar claves i18n `nosotros.timeline.*` (es/en/pt).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Borrar subárbol `nosotros.timeline.{eyebrow,title,items}`.
  Spec: `content-nosotros/nosotros-no-timeline-section`.
  Criterio de completado: `nosotros.timeline` no existe en ninguno de los 3 JSON.

- [x] **T2.6 — Borrar CSS `.timeline*` de `shared.css`.**
  Archivo: `src/styles/pages/shared.css` (L702-738 aprox.).
  Spec: `content-nosotros/nosotros-no-timeline-section`.
  Criterio de completado: reglas `.timeline*` no existen; `grep -rn 'class="timeline'
  src` no devuelve coincidencias en `.astro`.

- [x] **T2.7 — Eliminar sección Certificaciones de `/nosotros` (markup + dead code).**
  Archivo: `src/pages/nosotros.astro`. Quitar `<section>` `.certs` (L148-164 aprox.),
  const `certs` (L26 aprox.), type `CertItem` (L21 aprox.).
  Archivo: `src/lib/constants.ts`. Borrar el array `CERTS` (L395-401 aprox.).
  Spec: `content-nosotros/nosotros-no-certifications-section`.
  Criterio de completado: `/nosotros` no renderiza la sección "Certificaciones";
  `grep -rn 'CertItem\|\bCERTS\b' src` no devuelve referencias vivas.

- [x] **T2.8 — Borrar claves i18n `nosotros.certs.*` (es/en/pt).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Borrar subárbol `nosotros.certs.{eyebrow,title,items}`.
  Spec: `content-nosotros/nosotros-no-certifications-section`.
  Criterio de completado: `nosotros.certs` no existe en ninguno de los 3 JSON.

- [x] **T2.9 — Borrar CSS `.certs`, `.cert*` de `shared.css`.**
  Archivo: `src/styles/pages/shared.css` (L892-915 aprox.).
  Spec: `content-nosotros/nosotros-no-certifications-section`.
  Criterio de completado: reglas `.certs`/`.cert*` no existen.

- [x] **T2.10 — Eliminar sección Sector destacado de `/industrias`.**
  Archivo: `src/pages/industrias.astro`. Quitar `<section>` spotlight (L61-94 aprox.).
  **NO borrar** `const spotlight = industries[0]` (L32 aprox.) — se reutiliza en la
  sección directorio (L124-127 aprox.).
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: `/industrias` no renderiza la sección "Sector destacado"; la
  sección directorio sigue funcionando (usa `spotlight` sin error de referencia).

- [x] **T2.11 — Borrar claves i18n `industrias.spotlight.*` (es/en/pt).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Borrar subárbol `industrias.spotlight.{eyebrow,title,caseLabel,panelEyebrow,quote,
  authorTitle,authorDetail}`.
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: `industrias.spotlight` no existe en ninguno de los 3 JSON.

- [x] **T2.12 — Borrar CSS `.ind-spotlight*` de `shared.css`.**
  Archivo: `src/styles/pages/shared.css` (L569-623 aprox.).
  Conservar `.ind-services*` y `.ind-directory*` (independientes, en uso).
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: reglas `.ind-spotlight*` no existen; `.ind-services*` e
  `.ind-directory*` siguen presentes y funcionales.

- [x] **T2.13 — Build de verificación del grupo 2.**
  Comando: `npm run build`.
  Criterio de completado: build limpio; `grep -rn
  'gsap-timeline-reveal\|initTimelineReveal\|FaqItem\|faqItems\|TimelineItem\|CertItem\|
  \bFAQ\b\|\bTIMELINE\b\|\bCERTS\b' src` no devuelve referencias vivas.

---

## Grupo 3 — Ediciones de copy de servicios (D4, D5) en los 3 JSON

Depende de: Grupo 1 (las claves de detalle que se editan aquí ya no incluyen las de
Aérea/Marítima borradas, pero sí sus `features`, que se mantienen y editan).

- [x] **T3.1 — Carga Aérea (n=01): desc, tag, features.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `servicios.list.0.desc` → "Courier internacional y chárter aéreo, carga general,
    vuelo pasajero." (quitar mención "Express … tiempos garantizados"). Traducir a
    en/pt manteniendo el mismo sentido.
  - `servicios.list.0.tag` → quitar "48h" (p. ej. "Aéreo").
  - `servicios.details.items.0.features` (encontrado por `n===1`, ver design.md nota)
    → reemplazar por exactamente 5 ítems: `["Courier internacional","Chárter aéreo",
    "Cadena de frío y dangerous goods","Carga general","Vuelo pasajero"]` (antes 4).
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON tienen el mismo array de 5 features (traducido)
  para Aérea; `servicios.list.0.desc`/`.tag` sin "48h"/"Express…tiempos garantizados"
  en los 3 idiomas.

- [x] **T3.2 — Carga Marítima (n=02): features.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `servicios.details.items.1.features.0`: "FCL/LCL a 80+ puertos" → "FCL/FCL,
    LCL/LCL a 80+ puertos".
  - `servicios.details.items.1.features.2`: "Reefer y open-top disponibles" → "Carga
    general, Reefer y open-top disponibles".
  - `servicios.details.items.1.features.3`: **eliminar** "Negociación de tarifas por
    contrato" (array pasa de 4 a 3 ítems).
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON tienen el mismo array de 3 features (traducido)
  para Marítima, sin mención a "Negociación de tarifas por contrato".

- [x] **T3.3 — Aduana y Documentación (n=03): tag, badge, features (quitar OEA).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `servicios.list.2.tag`: "OEA Chile" → sin OEA (p. ej. "Aduana Chile").
  - `servicios.details.items.2.badge`: "OEA · Aduanas Chile" → "Aduanas Chile".
  - `servicios.details.items.2.features.1`: "DUS, certificados de origen, fumigación"
    → "DUS, DIN, certificados de origen, fumigación".
  - `servicios.details.items.2.features.2`: **eliminar** "Operador Económico
    Autorizado" (array pasa de 4 a 3 ítems).
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON no contienen "OEA" ni "Operador Económico
  Autorizado" en ninguna clave de Aduana; feature "DUS, DIN, certificados de origen,
  fumigación" presente en los 3 idiomas.

- [x] **T3.4 — Almacenaje (n=04): desc, features.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `servicios.list.3.desc` → "Bodegaje de carga general." (quitar "fulfillment y
    última milla…").
  - `servicios.details.items.3.features` → reemplazar por exactamente 3 ítems:
    `["Bodegaje","Desconsolidado","Consolidado de contenedores"]` (antes 4).
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON tienen el mismo array de 3 features (traducido)
  para Almacenaje; `servicios.list.3.desc` sin mención a "fulfillment"/"última milla"
  en los 3 idiomas.

- [x] **T3.5 — Consultoría Logística (n=05): quitar "KPI dashboard mensual".**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  `servicios.details.items.4.features.3`: **eliminar** "KPI dashboard mensual" (array
  pasa de 4 a 3 ítems).
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON tienen el array de Consultoría con 3 ítems, sin
  mención a "KPI".

- [x] **T3.6 — Ruta Medio Oriente (n=11): reemplazar features.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  `servicios.details.items.5.features` → reemplazar por exactamente 2 ítems:
  `["Llevamos tu negocio al medio oriente","Servicio Broker"]` (antes 4). Traducir
  fielmente a en/pt.
  Spec: `content-services/services-descriptions-bullets`.
  Criterio de completado: los 3 JSON tienen el mismo array de 2 features (traducido)
  para Medio Oriente.

- [x] **T3.7 — "Cómo trabajamos" (/servicios): pasos 03/05/06 + desc general.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `servicios.process.steps.2.desc`: "Propuesta clara y desglosada en 24h." → sin
    plazo (p. ej. "Propuesta clara y desglosada.").
  - `servicios.process.steps.4.desc`: "OEA y revisión documental anticipada." → sin
    OEA (p. ej. "Revisión documental anticipada.").
  - `servicios.process.steps.5.desc` → texto exacto: "Entrega de carga en bodega y
    cierre documental del proceso aduanero." (traducir a en/pt manteniendo el
    sentido).
  - `servicios.process.desc`: "De la cotización al cierre con KPIs…" → quitar "con
    KPIs".
  Spec: `content-services/services-how-we-work-process`.
  Criterio de completado: los 3 JSON no contienen "24h", "OEA" ni "KPI" en
  `servicios.process.*`; el paso 06 (índice 5) coincide con el texto exacto
  especificado en es.json.

- [x] **T3.8 — Build de verificación del grupo 3.**
  Comando: `npm run build`.
  Criterio de completado: build limpio (paridad i18n incluyendo largos de arrays
  `features`/`steps` iguales en los 3 idiomas).

---

## Grupo 4 — Home: rutas frecuentes

Depende de: nada (independiente de los grupos anteriores).

- [x] **T4.1 — `LIVE_ROUTES[3]`: Hong Kong → Iquique ⇒ Manzanillo → Valparaíso.**
  Archivo: `src/lib/constants.ts`.
  Actualizar el ítem de `LIVE_ROUTES` en índice 3: origen "Hong Kong" → "Manzanillo",
  destino "Iquique" → "Valparaíso"; ajustar `mode: 'sea'` si el campo existe y no
  coincide ya (ruta marítima).
  Spec: `content-home/home-frequent-routes`.
  Criterio de completado: en la sección "Rutas frecuentes" de home, el ítem 4 muestra
  "Manzanillo → Valparaíso"; `grep -rn 'Hong Kong\|Iquique' src` no devuelve
  referencias vivas en `LIVE_ROUTES`.

- [x] **T4.2 — Build de verificación del grupo 4.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 5 — Industrias: meta-items y tags

Depende de: Grupo 2 (T2.10-T2.12 ya eliminaron la sección spotlight de la misma
página `industrias.astro`; conviene aplicar ambos cambios sobre el archivo en
secuencia para evitar conflictos de merge manual, aunque son ediciones
independientes).

- [x] **T5.1 — Quitar meta-items "300+" y "98%" del hero de `/industrias`.**
  Archivo: `src/pages/industrias.astro` (L53 y L55 aprox.).
  Eliminar los dos `page-hero__meta-item` correspondientes a "300+" y "98%". Conservar
  "12" (sectores) y "20+" (experiencia).
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: el hero de `/industrias` no muestra "300+" ni "98%"; sigue
  mostrando "12" y "20+".

- [x] **T5.2 — Borrar claves i18n huérfanas `industrias.metaClients` / `metaRetention`.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: `industrias.metaClients` y `industrias.metaRetention` no
  existen en ninguno de los 3 JSON.

- [x] **T5.3 — Quitar "OEA" y "Última milla" de "Qué movemos en cada sector".**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `industrias.tags.0`: eliminar el ítem "OEA" (índice 2; array pasa de 3 a 2).
  - `industrias.tags.4`: eliminar el ítem "Última milla" (índice 2; array pasa de 3 a
    2).
  - `industrias.servicesPer.0`: eliminar el ítem "OEA" (índice 2).
  - `industrias.servicesPer.4`: eliminar el ítem "Última milla" (índice 2).
  Estos son `string[]` internos iterados con `.map` — acortar es seguro, no requiere
  paridad de longitud entre distintos índices de `tags`/`servicesPer`, solo entre
  es/en/pt para el mismo índice.
  Spec: `content-industries/industries-page-content`.
  Criterio de completado: en `/industrias`, la sección "Qué movemos en cada sector" no
  muestra "OEA" ni "Última milla" en ningún sector, en los 3 idiomas.

- [x] **T5.4 — Build de verificación del grupo 5.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 6 — Nosotros: copy (hero, manifiesto, valores) + armonización "20+ años"

Depende de: Grupo 2 (T2.4-T2.9 ya modificaron `nosotros.astro` eliminando Trayectoria
y Certificaciones; aplicar después para evitar tocar el mismo archivo dos veces con
contexto desalineado).

- [x] **T6.1 — Hero de `/nosotros`: "Desde 2023" + "Profesionales 20+ años".**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `nosotros.heroEyebrow`: "Nosotros · Desde 2003" → "Nosotros · Desde 2023".
  - `nosotros.heroTitleHtml`: "20+ años conectando <em>Chile con el mundo</em>." →
    "Profesionales <em>20+ años de experiencia</em>." (mantener marcado `<em>`).
  Spec: `content-nosotros/nosotros-hero-identity`.
  Criterio de completado: el hero de `/nosotros` muestra "Desde 2023" y "Profesionales
  20+ años de experiencia" (con énfasis) en los 3 idiomas.

- [x] **T6.2 — Quitar meta-items "OEA" y "B2B" del hero de `/nosotros`.**
  Archivo: `src/pages/nosotros.astro` (L50-51 aprox.).
  Eliminar los dos `page-hero__meta-item` ("OEA" y "B2B"). Conservar `20+`
  (metaYears/metaExpertise) y `CL` (metaCapital).
  Spec: `content-nosotros/nosotros-hero-identity`.
  Criterio de completado: el hero de `/nosotros` no muestra "OEA" ni "B2B"; conserva
  "20+" y "CL".

- [x] **T6.3 — Borrar claves i18n huérfanas `nosotros.metaCert` / `nosotros.metaFocus`.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Spec: `content-nosotros/nosotros-hero-identity`.
  Criterio de completado: `nosotros.metaCert` y `nosotros.metaFocus` no existen en
  ninguno de los 3 JSON.

- [x] **T6.4 — Manifiesto: quitar cifras "12 industrias" / "98% retención" + reescribir.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `nosotros.manifesto.p3Html`: reemplazar el párrafo que contiene "Hoy operamos con
    clientes en 12 industrias y una retención del 98%…" por un mensaje centrado en el
    cliente (intent: "Nuestro objetivo: que el cliente sienta que esta operación es
    suya, ofreciendo una logística hecha a medida" — redactar con buena ortografía y
    fluidez, sin cifras).
  - `nosotros.manifesto.titleHtml` ("La logística es una <em>relación</em>, no un
    commodity."): revisar coherencia con el `p3Html` reescrito; ajuste mínimo o nulo
    si ya encaja semánticamente.
  Spec: `content-nosotros/nosotros-manifesto-messaging`.
  Criterio de completado: `nosotros.manifesto.p3Html` no contiene "12 industrias" ni
  "98%" en ningún idioma; el mensaje nuevo está centrado en el cliente/logística a
  medida; `titleHtml` es coherente con el párrafo reescrito.

- [x] **T6.5 — 4º valor: reemplazar "KPIs medibles y revisión trimestral".**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  `nosotros.values.items.3.desc`: "KPIs medibles y revisión trimestral con cada
  cliente." → "Nos preocupamos del feedback de nuestros clientes." (array por índice,
  longitud 4 intacta; traducir a en/pt).
  Spec: `content-nosotros/nosotros-values-feedback`.
  Criterio de completado: el 4º valor de `/nosotros` muestra el nuevo texto sin
  mención a "KPI" en los 3 idiomas.

- [x] **T6.6 — Armonizar TODAS las ocurrencias de "20+ años" (reencuadre a experiencia de equipo).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `home.hero.eyebrow`: "Operador logístico chileno · 20+ años" → reencuadrar a
    experiencia de equipo (p. ej. "Operador logístico chileno · Profesionales con 20+
    años de experiencia").
  - `footer.brandDesc`: "Operador logístico chileno con 20+ años de experiencia…" →
    reencuadrar sujeto a equipo/profesionales (p. ej. "Operador logístico chileno con
    profesionales con 20+ años de experiencia…").
  - `meta.nosotros.description`: "…con 20+ años de experiencia…" → mismo reencuadre,
    coherente con "Desde 2023".
  No tocar `industrias`/`nosotros` hero `20+` (metaExpertise/metaYears): ya leen como
  experiencia de equipo, no de antigüedad de empresa.
  Spec: `content-nosotros/years-experience-narrative-consistency`.
  Criterio de completado: `grep -riE '20\+ años' src/i18n/translations/es.json` solo
  devuelve ocurrencias que hablan de experiencia del equipo/profesionales, ninguna que
  implique antigüedad de la empresa ("Desde 2023" es la única cifra de antigüedad); el
  mismo criterio aplica revisando en/pt manualmente (equivalente semántico).

- [x] **T6.7 — Build de verificación del grupo 6.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 7 — Contacto / Cotizar: quitar compromisos de tiempo finito

Depende de: nada (independiente).

- [x] **T7.1 — `/contacto`: reemplazar plazos por término general.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Claves: `contacto.lead`, `contacto.heroEyebrow` ("Respuesta en 24h"),
  `contacto.heroLead`, `contacto.form.sub`. Reemplazar cada mención de plazo en horas
  por un término general consistente (p. ej. "rápido" / "a la brevedad" / "lo antes
  posible") — usar la misma expresión en todas las ocurrencias de la página para
  consistencia.
  Spec: `content-contact/contact-no-time-commitment`.
  Criterio de completado: ninguna de las 4 claves contiene "24h"/"24 h" ni cifra de
  horas en ningún idioma.

- [x] **T7.2 — `/cotizar`: reemplazar plazos por término general.**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  Claves: `cotizar.lead`, `cotizar.heroLead`, `cotizar.chips.0` ("Respuesta < 24h"),
  `cotizar.summary.sla` ("Respuesta garantizada en < 24h hábiles"),
  `cotizar.success.desc`, `cotizar.success.descPersonal`. Mismo término general que
  T7.1 para consistencia entre ambas páginas.
  Spec: `content-contact/contact-no-time-commitment`.
  Criterio de completado: ninguna de las 6 claves contiene "24h"/"24 h" ni cifra de
  horas en ningún idioma; el término usado es consistente con `/contacto`.

- [x] **T7.3 — Home CTA y modo Express de Cotizar (intent GLOBAL sin spec dedicada).**
  Archivos: `src/i18n/translations/{es,en,pt}.json`.
  - `home.cta.lead`: "Cotiza en menos de 24 horas…" → sin plazo en horas.
  - `cotizar.modes.1.desc`: "Express 48h–7d. Ideal para urgencias…" → quitar el
    numérico "48h–7d" (p. ej. "Ideal para urgencias y alto valor.").
  **No tocar**: `cotizar.modes.0.desc` ("FCL/LCL, 80+ puertos" — abreviatura de
  modalidad, no plazo) ni `cotizar.extras.3` ("Última milla" — opción real del
  wizard).
  Cubierto por el intent global de la propuesta (registrado en observations.md, sin
  spec dedicada — ver design.md §D12).
  Criterio de completado: `home.cta.lead` y `cotizar.modes.1.desc` sin cifras de horas
  en ningún idioma; `cotizar.modes.0.desc` y `cotizar.extras.3` sin cambios.

- [x] **T7.4 — Build de verificación del grupo 7.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 8 — Datos de contacto globales (teléfono/email) + JSON-LD + docs

Depende de: nada (independiente).

- [x] **T8.1 — Actualizar `SITE` en `constants.ts`.**
  Archivo: `src/lib/constants.ts` (L42-46 aprox.).
  - `phone`: `+56 9 4216 2739` → `+56 9 8270 8492`.
  - `phoneDisplay`: mismo valor en formato de despliegue nuevo.
  - `email`: `mpazrivera@logatm.com` → `contacto@logatm.com`.
  - `whatsappUrl`: contiene el nº viejo (`56942162739`) → actualizar a
    `56982708492`.
  Spec: `site-contact-info/site-global-contact-details`.
  Criterio de completado: los 4 campos de `SITE` reflejan los valores nuevos;
  `Footer.astro` y `contacto.astro` (que consumen `SITE.phone/phoneDisplay/email`) se
  actualizan automáticamente sin edición propia.

- [x] **T8.2 — Sustituir literales de JSON-LD en `BaseLayout.astro`.**
  Archivo: `src/layouts/BaseLayout.astro` (L74-75 aprox., `telephone`/`email` del
  schema `LocalBusiness`).
  Sustituir los literales hardcodeados por los nuevos valores de teléfono/email
  (decisión de diseño: **no** refactorizar para importar `SITE` — se documenta como
  deuda DRY conocida en observations.md, no se crea ADR).
  Spec: `site-contact-info/site-global-contact-details`.
  Criterio de completado: el JSON-LD embebido en el HTML renderizado (`dist/` tras
  build) contiene el teléfono y email nuevos.

- [x] **T8.3 — Actualizar `README.md`.**
  Archivo: `README.md` (L119 aprox.).
  Actualizar email y teléfono en la línea de contacto a los valores nuevos.
  Spec: `site-contact-info/site-global-contact-details`.
  Criterio de completado: `README.md` no contiene el teléfono ni email viejos.

- [x] **T8.4 — Actualizar `docs/project-brief.md`.**
  Archivo: `docs/project-brief.md` (L15 `Teléfono`, L17 `Email`).
  Actualizar ambos valores.
  Spec: `site-contact-info/site-global-contact-details`.
  Criterio de completado: `docs/project-brief.md` no contiene el teléfono ni email
  viejos (incl. formato `+569 421 62739`).

- [x] **T8.5 — Build de verificación del grupo 8.**
  Comando: `npm run build`.
  Verificación adicional: `grep -rnE '4216 ?2739|56942162739|mpazrivera'` sobre `src`,
  `README.md`, `docs/` debe dar cero resultados.
  Criterio de completado: build limpio; grep anterior sin coincidencias.

---

## Grupo 9 — SLA del email transaccional

Depende de: nada (independiente, edición puntual de 1 línea).

- [x] **T9.1 — Reemplazar SLA finito en `email-templates.ts`.**
  Archivo: `src/lib/email-templates.ts` (L301 aprox.).
  `"SLA cliente · responder antes de 24 h hábiles"` → término general, conservando el
  recordatorio de SLA para el equipo comercial. Resultado sugerido: `"SLA cliente ·
  responder a la brevedad"`. Literal en template HTML, no i18n — no requiere cambio en
  los 3 JSON.
  Spec: `forms-email/email-sla-no-finite-commitment`.
  Criterio de completado: `email-templates.ts` no contiene "24 h" ni "24h" en el SLA;
  conserva la mención "SLA cliente" como recordatorio interno.

- [x] **T9.2 — Build de verificación del grupo 9.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 10 — Fix de contraste `.process-step__title`

Depende de: Grupo 3 (T3.7 edita el copy de los pasos de la misma sección "Cómo
trabajamos" de `/servicios`; aplicar el fix de CSS después evita reabrir el mismo
contexto visual dos veces, aunque los cambios son técnicamente independientes).

- [x] **T10.1 — Añadir color de texto claro a `.process-step__title`.**
  Archivo: `src/styles/pages/shared.css` (bloque L531-534 aprox.).
  Añadir la declaración `color: var(--color-text-inverse);` dentro de la regla
  `.process-step__title` existente (no crear una regla nueva; no tocar `global.css`).
  Spec: `ui-contrast/services-process-step-title-contrast`.
  Criterio de completado: en `/servicios`, los 6 títulos de "Cómo trabajamos" son
  legibles sobre el fondo oscuro `.process-strip` (contraste ≈15:1, blanco sobre
  `#211f1c`); `/nosotros` (`.howwork-card__title`) no sufre regresión (sigue con
  `color: neutral-900` sobre fondo claro, sin tocar).

- [x] **T10.2 — Build de verificación del grupo 10.**
  Comando: `npm run build`.
  Criterio de completado: build limpio.

---

## Grupo 11 — Verificación integral final

Depende de: Grupos 1-10 completos.

- [x] **T11.1 — Build limpio end-to-end.**
  Comando: `npm run build` (desde cero si es posible, o al menos como último paso).
  Criterio de completado: build completo sin errores, sin warnings de paridad i18n
  (`validate-i18n.ts` en `astro:build:start`), sin error TypeScript.

- [x] **T11.2 — Barrido de términos prohibidos sobre `dist/` (rendered).**
  Comando:
  ```
  grep -riE '48h|24 ?h|\bOEA\b|300\+|98%|Negociación de tarifas|Conocer más|carga-aerea|carga-maritima' dist/
  ```
  Excepciones permitidas (no son violaciones): "12 industrias" (factual, D6),
  "FCL/LCL" en `cotizar.modes.0.desc`, "Última milla" en `cotizar.extras.3`.
  Criterio de completado: cero coincidencias fuera de las excepciones documentadas.

- [x] **T11.3 — Barrido de dead code / referencias huérfanas en `src/`.**
  Comando:
  ```
  grep -rn 'gsap-timeline-reveal\|initTimelineReveal\|FaqItem\|faqItems\|TimelineItem\|CertItem\|\bFAQ\b\|\bTIMELINE\b\|\bCERTS\b\|learnMore' src
  ```
  Criterio de completado: cero referencias vivas (dead code no relacionado —
  `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `STATS`, `NAV_LINKS`,
  `FOOTER_SERVICES`, `FOOTER_COMPANY` — queda fuera de alcance por decisión d,
  documentado en design.md "No tocar").

- [x] **T11.4 — Cero 404 en cards de servicio.**
  Verificación manual o `npm run build` + inspección: confirmar que las cards Aérea y
  Marítima (en `/servicios` y en home) renderizan como `<div>` sin atributo `href`, y
  que ningún enlace activo del sitio apunta a `/servicios/carga-aerea` o
  `/servicios/carga-maritima`.
  Criterio de completado: sin 404s; `grep -rn 'carga-aerea\|carga-maritima' src`
  limitado a `FOOTER_SERVICES` dead-code (documentado, sin impacto).

- [x] **T11.5 — Contacto global: cero referencias a datos viejos.**
  Comando: `grep -rnE '4216 ?2739|56942162739|mpazrivera' src README.md docs/`.
  Criterio de completado: cero coincidencias; el JSON-LD en `dist/` anuncia teléfono y
  email nuevos (re-confirmar tras build completo).

- [x] **T11.6 — Revisión visual multi-idioma del contraste y de las 5 páginas afectadas.**
  Revisar en navegador (o build preview) `/servicios`, `/nosotros`, `/industrias`,
  `/contacto`, `/cotizar` y home, en es/en/pt:
  - Los 6 títulos de "Cómo trabajamos" en `/servicios` son legibles (T10.1).
  - No aparecen las secciones eliminadas (FAQ, Trayectoria, Certificaciones, Sector
    destacado).
  - Cards Aérea/Marítima sin cursor de enlace ni CTA "Conocer más"; resto de cards
    intacto.
  - Copy de servicios, industrias, nosotros, contacto/cotizar refleja las ediciones
    de los Grupos 3, 5, 6, 7 en los 3 idiomas, sin errores de ortografía.
  Criterio de completado: revisión visual sin hallazgos; cualquier desviación se
  registra en observations.md antes de pasar a sdd-apply/sdd-verify.
