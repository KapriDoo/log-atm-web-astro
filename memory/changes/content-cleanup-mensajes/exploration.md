# Exploration — content-cleanup-mensajes

## 1. Estado actual — arquitectura de contenido

El proyecto usa un **modelo híbrido de SSOT** para contenido, distinto según si el
dato varía por idioma o no:

- **`src/lib/constants.ts`** — SSOT de: assets de imagen (`ImageMetadata` importados
  vía `astro:assets`), iconos (`lucide:*`), colores, hrefs, números/keys estructurales
  (`n`, `k`, `step`) y datos no traducibles (nombres de ciudades en `LIVE_ROUTES`,
  teléfono/email/dirección en `SITE`). [fuente: código `src/lib/constants.ts`]
- **`src/i18n/translations/{es,en,pt}.json`** — SSOT del **copy traducible**: títulos,
  descripciones, bullets, FAQ, timeline, certs, etc. Se leen con `t()` (strings),
  `tList()` (arrays) o `tObj()` (objetos) desde `src/i18n/utils.ts`. `es.json` es el
  master; si falta una clave en `en`/`pt`, `t()`/`tList()` hacen fallback silencioso a
  `es`. [fuente: código `src/i18n/utils.ts` L87-137]
- Las páginas que muestran listas mixtas (servicios, industrias, valores, "cómo
  trabajamos" en `/nosotros`) hacen **merge por índice**: `CONST_ARRAY.map((x, i) => ({
  ...x, ...tList(...)[i] }))`. El orden de los arrays en `constants.ts` y en el JSON
  **debe coincidir** o el merge desalinea contenido. [fuente: código
  `src/pages/servicios.astro` L31, `src/pages/industrias.astro` L24-30,
  `src/pages/nosotros.astro` L28-29]

### Hallazgo importante — divergencia entre la convención declarada y el código real

El `CLAUDE.md` del proyecto (inyectado en este prompt) y el spec-resolver asumen
"`constants.ts` es la SSOT del contenido". **Esto ya no es cierto para varios
arrays**: `FAQ`, `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `TIMELINE` y
`CERTS` existen en `constants.ts` pero **no los importa ningún `.astro`** — verificado
con grep exhaustivo (cero resultados). El contenido real y vigente de esas secciones
vive **solo** en `i18n/translations/*.json` (`servicios.faq.items`,
`servicios.process.steps`, `servicios.details.items`, `servicios.filters`,
`nosotros.timeline.items`, `nosotros.certs.items`). Los arrays en `constants.ts` son
**código muerto / copias obsoletas** (probablemente el JSON se generó a partir de
ellos y luego `constants.ts` no se depuró). [fuente: código — grep
`FAQ|PROCESS_STEPS|SERVICE_DETAILS|SERVICE_FILTERS|CERTS|TIMELINE` en `src/**/*.astro`
sin matches; confirmado import-por-import en `servicios.astro` (solo importa
`SERVICES`) y `nosotros.astro` (solo importa `VALUES, HOW_WE_WORK`)]

Consecuencia práctica: **cualquier edición de FAQ / proceso "Cómo trabajamos" (6
pasos) / detalles de servicio / timeline / certificaciones debe hacerse en los 3
JSON de `i18n/translations/`**, no en `constants.ts`. Editar solo `constants.ts` para
esas secciones **no tendría ningún efecto visible**. Se recomienda a `sdd-propose`
decidir si además se eliminan los arrays muertos de `constants.ts` (KISS/DRY) o se
dejan (fuera de alcance del pedido de contenido, pero es limpieza barata y coherente
con "eliminar del código" que pide el intent para varias secciones).

También son código muerto (no relacionados a i18n, comprobado por grep):
`NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY` y `STATS` en `constants.ts` — ninguno
se importa en ningún componente. `Navbar.astro` y `Footer.astro` tienen sus propias
listas hardcodeadas en JSX/Astro. No están en el alcance del intent pero se documentan
por si `sdd-propose` quiere incluir su remoción (YAGNI).

Las specs `content-services.md`, `content-industries.md`, `content-stats.md` en
`memory/specs/content/` están **stale**: describen 14 industrias y un `StatsSection`
con 4 stats que no existen en el código actual (hay 12 industrias, `STATS` es código
muerto, y las stats reales de home vienen de `WHY_ITEMS`/`HERO_STRIP_STATS`). No se
puede confiar en ellas para dimensionar el cambio; toda esta exploración se basó en
lectura directa del código. [fuente: spec `content/content-stats.md` vs código
`src/lib/constants.ts` L253-267, L90-94]

### Validador i18n (build-time)

`astro.config.mjs` ejecuta `scripts/validate-i18n.ts` en `astro:build:start`. El
validador **solo compara paridad de claves** (dot-notation) entre `en.json`/`pt.json`
contra `es.json` master — no valida contenido ni longitud de arrays. [fuente: código
`scripts/validate-i18n.ts` L43-64, `astro.config.mjs` L17-35]

**Implicación para el cambio**: es seguro eliminar secciones completas (FAQ,
Trayectoria/timeline, Certificaciones, carga-aerea/maritima) siempre que se borren
las claves correspondientes **simétricamente en los 3 archivos** (`es.json`,
`en.json`, `pt.json`). Si se borra en uno y no en los otros, el build falla. No hay
riesgo de que el validador rechace un array más corto (ej. `PROCESS_STEPS` de 6 a 5
items) — solo valida claves, no longitudes de array (aunque acortar un array sí
requiere ajustar el código Astro que itera por índice si asume una longitud fija,
p.ej. `services__grid` con `size` fijo por índice en `SERVICES`).

## 2. Tabla exhaustiva de ocurrencias por término objetivo

Leyenda de idioma: (es)/(en)/(pt) = archivo de traducción; (all) = mismo string
literal en `constants.ts` o en un `.astro`, sin variación por idioma.

| Término buscado | Archivo | Línea(s) | Idioma | Contexto |
|---|---|---|---|---|
| `OEA` | `src/lib/constants.ts` | 132, 318, 353, 366, 374, 397, 405, 421 | (all) | tag Aduana, badge servicio 03, FAQ despacho aduanero, PROCESS_STEPS paso "Aduana", TIMELINE 2014, CERTS, IND_TAGS_MAP Minería, SERVICES_PER_IND Minería — **la mayoría son arrays muertos (ver §1)**, solo importa a runtime lo que consumen las páginas |
| `OEA` | `src/i18n/translations/es.json` | 194, 212, 227, 238, 303, 335, 349, 387, 418 | es | tag servicio Aduana (`servicios.list[2].tag`), badge+feature detalle servicio 03, PROCESS_STEPS paso Aduana, FAQ despacho aduanero, spotlight authorDetail industrias, tags/servicesPer Minería, TIMELINE 2014, CERTS |
| `OEA` | `src/i18n/translations/pt.json` | 194, 212, 227, 238, 303, 335, 349, 387, 418 | pt | mismas claves que es, equivalentes en portugués |
| `Operador Económico Autorizado` | `en.json` (`Economic Operator`) no aparece literal; `es.json`/`pt.json` | 212 (`servicios.details.items[2].features[2]`), 397/418 (CERTS y `nosotros.certs.items`) | es/pt | bullet a eliminar y desc de cert OEA |
| `OEA` (literal hardcodeado, no i18n) | `src/pages/servicios.astro` | 58 | (all, 3 idiomas) | `<span class="v">OEA</span>` en `page-hero__meta` — **no pasa por `t()`**, hay que editar el `.astro` directamente |
| `OEA` (literal hardcodeado) | `src/pages/nosotros.astro` | 50 | (all, 3 idiomas) | `<span class="v">OEA</span>` en `page-hero__meta` de Nosotros |
| `48h` | `src/lib/constants.ts` | 110, 309, 438 | (all) | tag "Express · 48h" (SERVICES[0], muerto vía SERVICE_DETAILS pero SERVICES sí se usa → **tag en vivo**), feature detalle servicio 01 (muerto), QUOTE_MODES aéreo (¿se usa? ver nota abajo) |
| `48h` | `es.json`/`en.json`/`pt.json` | 192, 210, 253, 576 (aprox., mismas claves) | es/en/pt | `servicios.list[0].tag`, `servicios.details.items[0].features[0]`, `servicios.carga.aerea.features[0].title` ("48h garantizado"), `cotizar.modes[1].desc` |
| `24h` / `24 horas` | `constants.ts` | 347, 364 | (all) | FAQ cotización (muerto), PROCESS_STEPS paso "Cotización" (muerto pero clon vive en JSON) |
| `24h` / `24 horas` | `es.json`/`en.json`/`pt.json` | **Muy extendido**: 136, 225, 235, 259, 278, 428, 430, 432, 439, 492, 495, 497, 572, 601, 602 (es); equivalentes en en/pt | es/en/pt | Home CTA lead, `servicios.process.steps[2]`, FAQ, `servicios.carga.{aerea,maritima}.ctaDesc`, **toda la página `/contacto`** (`lead`, `heroEyebrow`, `heroLead`, `form.sub`), **toda la página `/cotizar`** (`lead`, `heroLead`, `chips`, `summary.sla`, `success.desc*`) |
| `24 h` (SLA) | `src/lib/email-templates.ts` | 301 | (all) | `"SLA cliente · responder antes de 24 h hábiles"` en el pie del email transaccional — **no está en el intent explícitamente pero es un compromiso de tiempo finito**; se marca como hallazgo adicional para que `sdd-propose` decida si entra en alcance |
| `Conocer más` | `es.json` L61 (`common.learnMore`), `en.json`/`pt.json` equiv. | 61 | es/en/pt | clave única usada en 2 lugares: `src/pages/servicios.astro` L95 (catálogo) y `src/components/sections/ServicesSection.astro` L60 (home) |
| `300+` (clientes) | `src/pages/industrias.astro` | 53 | (all, 3 idiomas) | `<span class="v">300<em>+</em></span>` hardcodeado — **NO existe la clave `t('industrias.metaClients')` con el número**, el número está fijo en el `.astro`, solo la label es traducible |
| `98%` | `src/pages/industrias.astro` | 55 | (all) | `<span class="v">98%</span>` hardcodeado, misma situación que 300+ |
| `98%` (retención, prosa) | `es.json`/`en.json`/`pt.json` `nosotros.manifesto.p3Html` | 379 (es) | es/en/pt | "Hoy operamos con clientes en 12 industrias y una retención del 98%..." — el párrafo completo a reescribir según intent |
| `12 industrias` (prosa Nosotros) | `nosotros.manifesto.p3Html` | 379 (es) + equiv. en/pt | es/en/pt | mismo párrafo que 98% — **distinto** del `12` legítimo en `/industrias` (que sí son 12 sectores reales, no se debe tocar) |
| `Trayectoria` | `nosotros.timeline.eyebrow` (JSON) L382; `src/pages/nosotros.astro` L70-90 (markup `<section class="timeline">`); `src/scripts/gsap-timeline-reveal.ts` (módulo dedicado); `src/styles/pages/shared.css` (selectores `.timeline*`) | ver detalle | es/en/pt + código | **No existe una "página" de Trayectoria separada** — es una sección dentro de `/nosotros`. El intent dice "eliminar apartado + páginas asociadas"; no hay páginas asociadas literales, solo la sección + su script GSAP dedicado + CSS. Ver spec `nosotros-timeline-reveal/spec.md` (describe la animación de esta sección) |
| `Certificaciones` | `nosotros.certs.*` (JSON); `src/pages/nosotros.astro` L148-164 (`<section>` con `.certs`) | ver detalle | es/en/pt + código | Apartado a eliminar completo (sección + claves i18n; `CERTS` en `constants.ts` ya es código muerto, se puede borrar igual) |
| `Sector destacado` | `industrias.spotlight.*` (JSON); `src/pages/industrias.astro` L61-94 (`<section>` spotlight) | ver detalle | es/en/pt + código | Apartado a eliminar; usa `industries[0]` (Minería) como protagonista — sin dependencias externas (no scripts) |
| `Última milla` | `constants.ts` (SERVICES[3].desc, IND_TAGS_MAP/SERVICES_PER_IND, PROCESS_STEPS[5] — todos muertos salvo SERVICES[3].desc); `es/en/pt.json` (`servicios.list[3].desc`, `industrias.tags/servicesPer` E-commerce, `industrias.spotlight.authorDetail`, `servicios.process.steps[5].desc`, `servicios.details.items[3].features[3]`) | ver detalle | es/en/pt | Mención en Almacenaje (servicio 04, "Bodegaje, fulfillment y última milla..." — a reemplazar por la nueva desc del intent), en tags de industrias ("Qué movemos en cada sector"), en spotlight, y en paso 06 de "Cómo trabajamos" (`servicios.process.steps[5]`) |
| `KPI` / `KPIs` | `constants.ts` (SERVICE_DETAILS[05], PROCESS_STEPS[5], VALUES[3] — VALUES SÍ es SSOT en vivo); `es/en/pt.json` (`servicios.details.items[4].features[3]` "KPI dashboard mensual", `servicios.process.steps[5].desc` "...cierre con KPIs", `nosotros.values.items[3].desc` "KPIs medibles y revisión trimestral...") | ver detalle | es/en/pt | `VALUES[3]` (4º valor, "Mejora continua") es el único de estos que sí se renderiza vía import real (`nosotros.astro` L28) — coincide con el pedido explícito del intent de reescribir ese valor |
| `B2B` | `src/pages/nosotros.astro` | 51 | (all, 3 idiomas) | `<span class="v">B2B</span>` hardcodeado en `page-hero__meta`, **no pasa por i18n** — mismo patrón que OEA/300+/98% (constante literal en el template, independiente del idioma) |
| `Hong Kong` / `Iquique` | `src/lib/constants.ts` | 274 | (all) | `LIVE_ROUTES[3] = { from: 'Hong Kong', to: 'Iquique', ... }` — **única ocurrencia**, sin duplicado en JSON (nombres de ciudad no se traducen) → cambio de 1 línea |
| `FCL/LCL` | `constants.ts` L120 (SERVICES[1].desc, en vivo), L313/421/427/431 (muertos o IND_TAGS/SERVICES_PER_IND); `es/en/pt.json` `servicios.list[1].desc` ("FCL y LCL a 80+ puertos...") | ver detalle | es/en/pt | El intent pide "FCL/LCL" → "FCL/FCL" "LCL/LCL" pero el texto real dice **"FCL y LCL"** (con "y", no con "/"). No hay ningún string literal `"FCL/LCL"` en el copy visible — sí aparece `"FCL/LCL a 80+ puertos"` en `servicios.details.items[1].features[0]` (detalle de servicio, muerto en constants pero **vivo** en JSON vía `servicios.details.items`). **Riesgo de ambigüedad**: aclarar con la usuaria si el target real es ese bullet de detalle o la desc corta del card |
| `Negociación de tarifas por contrato` | `constants.ts` L313 (muerto); `es.json` `servicios.details.items[1].features[3]` L211 | es | bullet a eliminar del detalle de Carga Marítima (en vivo vía JSON) |
| `Desde 2003` | `es/en/pt.json` `nosotros.heroEyebrow` | 368 | es/en/pt | "Nosotros · Desde 2003" → "Nosotros · Desde 2023" (y equivalentes en/pt) |
| `20+ años` | `es.json` `nosotros.heroTitleHtml` L369 ("20+ años conectando..."), `nosotros.timeline.title` L383 ("Hitos de 20+ años"), `home.hero.eyebrow` L95, `footer.brandDesc` L54, `meta.nosotros.description` L22 | es (equiv. en/pt) | El intent pide corregir solo el de Nosotros ("Profesionales 20+ años de experiencia") — hay **5+ ocurrencias adicionales de "20+ años"** en home/footer/meta que el intent no menciona explícitamente; podrían quedar inconsistentes con el nuevo "Desde 2023" si no se revisan todas. Riesgo de inconsistencia narrativa (ver §5) |
| `commodity` | `es/en/pt.json` `nosotros.manifesto.titleHtml` | 376 | es/en/pt | "La logística es una relación, no un commodity." — el intent pide "ajustar la descripción... acorde a las correcciones" (no necesariamente eliminar la frase, redactar mejor) |
| Teléfono `+56 9 4216 2739` / `56942162739` | `src/lib/constants.ts` L42-43,46; `src/layouts/BaseLayout.astro` L74 (JSON-LD, **hardcodeado, no importa `SITE`** — violación DRY preexistente); `README.md` L119 | (all) | 4 ocurrencias en código + 1 en README. `Footer.astro` y `contacto.astro` consumen `SITE.phone`/`SITE.phoneDisplay` correctamente (no hay que tocarlos, se actualizan solos al cambiar `constants.ts`) |
| Email `mpazrivera@logatm.com` | `src/lib/constants.ts` L44; `src/layouts/BaseLayout.astro` L75; `README.md` L119; `docs/project-brief.md` L17 | (all) | misma situación — `BaseLayout.astro` duplica el valor en vez de importar `SITE.email` |

## 3. Páginas a eliminar y referencias entrantes

### 3.1 Páginas de detalle de servicio (`/servicios/carga-aerea`, `/servicios/carga-maritima`)

Archivos a eliminar (4):
- `src/pages/servicios/carga-aerea.astro`
- `src/pages/servicios/carga-maritima.astro`
- `src/pages/[lang]/servicios/carga-aerea.astro` (delega al anterior vía `import RootPage`)
- `src/pages/[lang]/servicios/carga-maritima.astro` (ídem)

Referencias entrantes a romper si se borran sin ajustar:
- `src/lib/constants.ts` L114 y L125 — `SERVICES[0].href = '/servicios/carga-aerea'`,
  `SERVICES[1].href = '/servicios/carga-maritima'`. Estos hrefs alimentan **tanto**
  `ServicesSection.astro` (home, cards clicables) **como** `servicios.astro`
  (catálogo, cards clicables) — hay que redirigir a otro destino (`/servicios`,
  anchor, o `/cotizar`) para no dejar 404.
- `src/lib/constants.ts` L72-74 — `FOOTER_SERVICES` también apunta a esos hrefs, pero
  es **código muerto** (no se importa en `Footer.astro`), no genera 404 real.
- i18n: `meta.cargaAerea.*`, `meta.cargaMaritima.*`, `servicios.carga.aerea.*`,
  `servicios.carga.maritima.*` en los 3 JSON quedarían huérfanas (el validador de
  paridad no las marca como error mientras existan simétricamente en los 3 idiomas,
  pero es basura acumulada — YAGNI sugiere borrarlas).
- No hay `getStaticPaths` dinámico ni sitemap manual que las liste explícitamente;
  `@astrojs/sitemap` las descubre automáticamente por existir como archivo — al
  borrar el archivo, desaparecen solas del sitemap generado.
- Ningún componente de navegación (`Navbar.astro`) enlaza directamente a estas rutas.

### 3.2 "Trayectoria" (sección, no página)

No existe archivo de página dedicado. Elementos a remover si se elimina el apartado:
- Markup: `src/pages/nosotros.astro` L70-90 (`<section class="timeline">`)
- Datos: `TIMELINE` en `constants.ts` (ya código muerto, se puede borrar sin impacto)
  + claves `nosotros.timeline.*` en los 3 JSON (**estas sí están en vivo**, son las
  que realmente alimentan el markup vía `tList`)
- Script dedicado: `src/scripts/gsap-timeline-reveal.ts` + su import/uso en
  `nosotros.astro` L172-182 (`initTimelineReveal('.timeline__track')`) — quedaría
  código muerto si no se borra también
- CSS: reglas `.timeline*` en `src/styles/pages/shared.css`
- Spec relacionada (para contexto, no bloqueante): `nosotros-timeline-reveal/spec.md`
  documenta la animación de esta sección — quedaría obsoleta si se borra la sección

### 3.3 "Certificaciones" (sección)

- Markup: `src/pages/nosotros.astro` L148-164 (`<section>` con `.certs`)
- Datos: `CERTS` en `constants.ts` (muerto) + `nosotros.certs.*` en los 3 JSON (en vivo)
- CSS: reglas `.certs`/`.cert__*` en `shared.css` (a verificar si se comparten con
  otra sección antes de borrar)

### 3.4 "Sector destacado" (sección en `/industrias`)

- Markup: `src/pages/industrias.astro` L61-94 (`<section>` spotlight, usa
  `industries[0]`)
- Datos: `industrias.spotlight.*` en los 3 JSON
- CSS: reglas `.ind-spotlight*` en `shared.css`
- Sin dependencias de script — es puramente presentacional

### 3.5 FAQ (`/servicios`)

- Markup: `src/pages/servicios.astro` L155-170 (`<section>` con `.faq-list`,
  elemento `<details>`)
- Datos: `FAQ` en `constants.ts` (muerto) + `servicios.faq.*` en los 3 JSON (en vivo)
- CSS: reglas `.faq-*` en `shared.css`

## 4. Contraste "fuente negra sobre fondo negro" — localizado

**Ubicación exacta del bug**: la sección "Cómo trabajamos" en `/servicios`
(`.process-strip`, 6 pasos — `PROCESS_STEPS`/`servicios.process.steps`).

- `src/styles/global.css` L77-81: regla base `h1, h2, h3, h4, h5, h6 { color:
  var(--color-neutral-900); }` aplica a **todo heading del sitio**, incluido el
  `<h3 class="process-step__title">` de cada tarjeta de paso.
- `src/styles/pages/shared.css` L500-502: `.process-strip { background:
  var(--color-neutral-900); color: #fff; }` — fondo oscuro, con un `color: #fff`
  a nivel de contenedor que se **pierde** para el `h3` porque la regla de tipo
  `h3` (aplicada directamente al elemento) tiene precedencia sobre el valor
  heredado del ancestro (la herencia de `color` solo aplica cuando no hay regla
  que matchee el elemento mismo).
- `src/styles/tokens.css` L42/L174: `--color-neutral-900: #211f1c` — es el
  **mismo token** usado como color de texto principal global Y como fondo de
  `.process-strip`. Resultado: `<h3 class="process-step__title">` se pinta en
  `#211f1c` sobre un fondo `#211f1c` → texto invisible/ilegible.
- `.process-step__desc` (L535) sí define `color: var(--color-neutral-400)` (gris
  claro) explícitamente y **no** tiene el problema — solo el `<h3>` título del
  paso está afectado, porque es el único elemento del bloque que no sobreescribe
  el color heredado del selector genérico `h1..h6`.

Este bug es distinto del ya corregido en la spec `internal-page-heroes/hero-title-contrast.md` (que trataba el `<h1>` de los heroes de página, ya resuelto en PR #19). Es un hallazgo **nuevo**, no documentado en ninguna spec existente.

**Nota de ambigüedad**: el `.process-strip` (6 pasos, en `/servicios`) se comparte
también en `/nosotros`? — Se verificó: NO. `/nosotros` tiene su propia sección
"Cómo trabajamos" (`.howwork-grid`, 4 tarjetas, `HOW_WE_WORK`), completamente distinta
en markup/CSS del `.process-strip` de `/servicios`. **Hay dos secciones distintas
tituladas "Cómo trabajamos"**:
1. `/servicios` → `servicios.process.*` (6 pasos: Diagnóstico, Diseño de ruta,
   Cotización, Ejecución, Aduana, Entrega) — **esta es la que tiene los pasos 03/05/06
   que menciona el intent** y el bug de contraste.
2. `/nosotros` → `nosotros.how.*` (4 pasos: Ejecutivo dedicado, Diagnóstico
   operativo, Diseño de ruta a medida, Operación y reporte) — sección distinta,
   `.howwork-card__title` en `shared.css` L848 sí define color explícito propio
   (`var(--color-neutros-900)` — a confirmar visualmente si comparte el mismo bug;
   por estar sobre fondo claro/`section--alt` no debería tener el problema, pero no
   se descarta sin inspección visual del navegador).

`sdd-propose`/`sdd-design` deben confirmar con la usuaria a cuál de las dos secciones
se refiere si hay ambigüedad — aunque la numeración de pasos ("03", "05", "06") y los
textos citados en el intent ("OEA y revisión documental", "Última milla y cierre con
KPIs") coinciden inequívocamente con la sección de `/servicios` (6 pasos), no con la
de `/nosotros` (4 pasos).

## 5. Riesgos identificados

1. **Enlaces rotos**: `SERVICES[0].href`/`SERVICES[1].href` deben redirigirse antes o
   junto con el borrado de las páginas de detalle — de lo contrario los cards de
   "Carga Aérea"/"Carga Marítima" en home y catálogo apuntan a rutas 404 (afecta 3
   idiomas × 2 rutas = 6 URLs muertas, más el sitemap generado que ya no las
   contendría pero los `<a href>` seguirían apuntando ahí).
2. **Paridad i18n**: cualquier borrado de clave debe hacerse simétricamente en
   `es.json`, `en.json`, `pt.json` o el build falla (`validate-i18n.ts`). Alto
   volumen de ediciones (≈15+ claves a tocar × 3 idiomas).
3. **Desalineación de arrays por índice**: si se acorta un array en el JSON (p.ej.
   quitar un bullet de `servicios.details.items[i].features`) sin acortar el array
   paralelo en `constants.ts` cuando ambos se usan en el mismo `.map((x,i) => ...)`,
   el merge por índice puede desalinear título/desc con el contenido incorrecto.
   Mitigación: `SERVICES`, `INDUSTRIES`, `VALUES`, `HOW_WE_WORK`, `WHY_ITEMS` son los
   únicos arrays realmente mergeados por índice — verificar longitud tras cada edición.
4. **Confusión "Cómo trabajamos" (dos secciones homónimas)** — ver §4. Riesgo de
   editar la sección equivocada (4 pasos de `/nosotros` en vez de los 6 de
   `/servicios`, o viceversa).
5. **"20+ años" disperso** — al menos 5 ocurrencias fuera del alcance explícito del
   intent (`home.hero.eyebrow`, `footer.brandDesc`, `meta.nosotros.description`,
   `nosotros.heroTitleHtml`, `nosotros.timeline.title`) quedarían diciendo "20+ años"
   mientras `nosotros.heroEyebrow` pasa a "Desde 2023" — contradicción narrativa
   (2023 + "20+ años" no cuadra). Requiere decisión de `sdd-propose`: ¿se ajustan
   todas o se acepta la inconsistencia temporalmente?
6. **Literales hardcodeados fuera de `t()`**: `OEA` (2×), `B2B`, `300+`, `98%` en
   `industrias.astro`/`nosotros.astro` **no pasan por el sistema i18n** — son iguales
   en los 3 idiomas porque están fijos en el `.astro`, no en el JSON. Hay que
   editarlos directamente en el `.astro` (1 sola vez, no ×3), pero es fácil pasarlos
   por alto si solo se busca en los JSON.
7. **Dead code en `constants.ts`** (`FAQ`, `PROCESS_STEPS`, `SERVICE_DETAILS`,
   `SERVICE_FILTERS`, `TIMELINE`, `CERTS`, `STATS`, `NAV_LINKS`, `FOOTER_SERVICES`,
   `FOOTER_COMPANY`) — editarlos no tiene efecto visible; hay riesgo de que
   `sdd-apply` "corrija" el array muerto pensando que resuelve el pedido, y el sitio
   siga mostrando el contenido viejo del JSON.
8. **`BaseLayout.astro` duplica teléfono/email** en el JSON-LD (`schemaLocalBusiness`)
   en vez de importar `SITE` de `constants.ts` — si se actualiza solo `constants.ts`,
   el schema.org seguiría anunciando el teléfono/email viejos. Debe tocarse en ambos
   lugares (o mejor, corregir la violación DRY importando `SITE` en `BaseLayout.astro`
   — decisión de diseño).
9. **SLA en email transaccional** (`src/lib/email-templates.ts` L301, "responder antes
   de 24 h hábiles") no está mencionado en el intent explícitamente pero es un
   compromiso de tiempo finito — a decidir si entra en alcance ("GLOBAL: quitar...
   cualquier compromiso de tiempo finito" sugiere que sí).
10. **Ambigüedad "FCL/LCL"**: el texto real es "FCL y LCL" (no hay un string literal
    "FCL/LCL" visible al usuario salvo en el bullet de detalle de servicio, que es la
    sección de detalle que el intent pide reescribir de todos modos). Confirmar con
    la usuaria si el pedido aplica al bullet de detalle o a la desc corta del card.

## 6. Approaches posibles

### Approach A — Editar solo `i18n/translations/*.json` + literales hardcodeados en `.astro`, dejar `constants.ts` dead arrays intactos

- **Qué implica**: tocar únicamente las claves JSON que realmente renderizan (según
  §1) más los strings literales fuera de `t()` (`OEA`, `B2B`, `300+`, `98%` en
  `industrias.astro`/`nosotros.astro`), más los arrays de `constants.ts` que sí están
  en vivo (`SITE`, `SERVICES`, `INDUSTRIES`, `LIVE_ROUTES`, `VALUES`, `HOW_WE_WORK`,
  `WHY_ITEMS`, `IND_TAGS_MAP`, `SERVICES_PER_IND`).
- **Pros**: menor superficie de cambio, más rápido, no toca código "que no se ve".
- **Contras**: deja arrays muertos con contenido contradictorio en `constants.ts`
  (ej. `FAQ` seguiría mencionando "OEA" aunque la FAQ ya no exista en pantalla) —
  viola DRY/KISS de forma silenciosa; riesgo de que un futuro desarrollador reactive
  ese array pensando que es la fuente vigente.
- **Esfuerzo**: medio (≈15-20 archivos/claves × 3 idiomas para las ediciones de
  copy, + 4 archivos a borrar + ajustes de href).

### Approach B — Igual que A, más eliminar los arrays/constantes muertas de `constants.ts` detectadas en §1

- **Qué implica**: A + borrar `FAQ`, `PROCESS_STEPS`, `SERVICE_DETAILS`,
  `SERVICE_FILTERS`, `TIMELINE`, `CERTS`, `STATS`, `NAV_LINKS`, `FOOTER_SERVICES`,
  `FOOTER_COMPANY` de `constants.ts` (o al menos las que correspondan a secciones que
  se eliminan: `FAQ`, `TIMELINE`, `CERTS`; las demás son limpieza oportunista fuera
  del intent original).
- **Pros**: coherente con "eliminar del código" que pide el intent para varias
  secciones; elimina la trampa de edición-sin-efecto (riesgo #7); deja `constants.ts`
  como SSOT real de lo que efectivamente usa.
- **Contras**: incrementa el diff más allá de lo pedido textualmente (aunque el
  intent sí dice explícitamente "eliminar del código" para Trayectoria, Certificaciones
  y Sector destacado, lo que ya empuja hacia limpiar sus constantes asociadas).
- **Esfuerzo**: medio-alto (mismo que A + limpieza dirigida de 3-6 arrays muertos
  directamente relacionados con las secciones eliminadas).

### Recomendación

**Approach B, acotado**: aplicar todas las ediciones de copy en los 3 JSON +
literales hardcodeados (igual que A), **y** eliminar de `constants.ts` únicamente los
arrays cuyo contenido queda huérfano por la eliminación explícita de sección
(`FAQ`, `TIMELINE`, `CERTS` — las 3 secciones que el intent pide "eliminar del
código"). Dejar `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `STATS`,
`NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY` fuera de este cambio salvo que
`sdd-propose` decida incluir la limpieza completa de dead code como parte del
alcance (razón: no fueron mencionados por el intent y su remoción no es necesaria
para cumplir el pedido de contenido — YAGNI apunta a no tocarlos ahora, pero se
documentan para que la usuaria decida con información completa).

Es indispensable que `sdd-design`/`sdd-tasks` resuelvan explícitamente, antes de
implementar, los 3 puntos de ambigüedad marcados arriba: (a) destino de los hrefs de
`SERVICES[0]`/`SERVICES[1]` tras borrar las páginas de detalle, (b) alcance de "20+
años" (¿todas las ocurrencias o solo Nosotros?), (c) si el SLA de
`email-templates.ts` entra en el alcance de "quitar compromisos de tiempo finito".
